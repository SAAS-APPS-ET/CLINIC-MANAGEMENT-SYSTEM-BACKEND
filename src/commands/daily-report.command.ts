import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from '../modules/visit/visit.entity';
import { Payment } from '../modules/payment/payment.entity';
import { LabRequest } from '../modules/laboratory/lab-request.entity';
import { QueueItem } from '../modules/queue/queue-item.entity';
import { SmtpService } from '../integrations/smtp/smtp.service';

type DailyReportOptions = {
  date?: Date;
  emailTo?: string;
};

@Injectable()
export class DailyReportCommand {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
    @InjectRepository(QueueItem)
    private readonly queueRepo: Repository<QueueItem>,
    private readonly smtp: SmtpService,
  ) {}

  async run(options: DailyReportOptions = {}): Promise<{ text: string }> {
    const target = options.date ?? new Date();

    const start = new Date(target);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const visitsCreated = await this.visitRepo
      .createQueryBuilder('v')
      .where('v.createdAt >= :start AND v.createdAt < :end', { start, end })
      .getCount();

    const visitsCompleted = await this.visitRepo
      .createQueryBuilder('v')
      .where('v.completedAt IS NOT NULL')
      .andWhere('v.completedAt >= :start AND v.completedAt < :end', {
        start,
        end,
      })
      .getCount();

    const queueAdded = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.createdAt >= :start AND q.createdAt < :end', { start, end })
      .getCount();

    // Payment entity currently has no createdAt column in this codebase.
    // So we report overall payment totals (optionally refine later if you add createdAt).
    const paidPayments = await this.paymentRepo
      .createQueryBuilder('p')
      .where('UPPER(p.status) = :paid', { paid: 'PAID' })
      .getMany();

    const paidAmountTotal = paidPayments.reduce(
      (sum, p) => sum + Number(p.amount ?? 0),
      0,
    );

    const labRequests = await this.labRequestRepo.find();
    const labPaidCount = labRequests.filter(
      (r) => String(r.paymentStatus).toUpperCase() === 'PAID',
    ).length;

    const dateLabel = start.toISOString().slice(0, 10);
    const lines = [
      `Daily Report (${dateLabel})`,
      `- Visits created: ${visitsCreated}`,
      `- Visits completed: ${visitsCompleted}`,
      `- Queue items added: ${queueAdded}`,
      `- Payments (PAID) count: ${paidPayments.length}`,
      `- Payments (PAID) total: ${paidAmountTotal}`,
      `- Lab requests (PAID): ${labPaidCount}`,
    ];

    const text = lines.join('\n');

    if (options.emailTo) {
      await this.smtp.sendMail(
        options.emailTo,
        `Daily Report ${dateLabel}`,
        text,
      );
    }

    return { text };
  }
}
