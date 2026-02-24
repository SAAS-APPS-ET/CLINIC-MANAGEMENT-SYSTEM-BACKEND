import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { Payment } from '../payment/payment.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';
import { Vital } from '../vital/vital.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';

function startOfTodayUtc(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function parseRange(from?: string, to?: string): { from: Date; to: Date } {
  const defaultFrom = startOfTodayUtc();
  const defaultTo = addDays(defaultFrom, 1);

  const parsedFrom = from ? new Date(from) : defaultFrom;
  const parsedTo = to ? new Date(to) : defaultTo;

  return { from: parsedFrom, to: parsedTo };
}

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Visit) private readonly visitRepo: Repository<Visit>,
    @InjectRepository(QueueItem)
    private readonly queueRepo: Repository<QueueItem>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
    @InjectRepository(LabReport)
    private readonly labReportRepo: Repository<LabReport>,
    @InjectRepository(Vital) private readonly vitalRepo: Repository<Vital>,
    @InjectRepository(DoctorDiagnosis)
    private readonly diagnosisRepo: Repository<DoctorDiagnosis>,
  ) {}

  health() {
    return {
      ok: true,
      now: new Date().toISOString(),
      note: 'Report module is up',
    };
  }

  async dailySummary(from?: string, to?: string) {
    const range = parseRange(from, to);

    const visitsCreated = await this.visitRepo
      .createQueryBuilder('v')
      .where('v.createdAt >= :from AND v.createdAt < :to', range)
      .getCount();

    const visitsCompleted = await this.visitRepo
      .createQueryBuilder('v')
      .where('v.completedAt IS NOT NULL')
      .andWhere('v.completedAt >= :from AND v.completedAt < :to', range)
      .getCount();

    const queueAdded = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.createdAt >= :from AND q.createdAt < :to', range)
      .getCount();

    const queueActive = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.queueStatus = :status', { status: 'ACTIVE' })
      .getCount();

    const vitalsRecorded = await this.vitalRepo
      .createQueryBuilder('vt')
      .where('vt.id IS NOT NULL')
      .getCount();

    const diagnosesCount = await this.diagnosisRepo
      .createQueryBuilder('d')
      .where('d.id IS NOT NULL')
      .getCount();

    const labRequestsTotal = await this.labRequestRepo
      .createQueryBuilder('lr')
      .where('lr.id IS NOT NULL')
      .getCount();

    const labReportsTotal = await this.labReportRepo
      .createQueryBuilder('lrep')
      .where('lrep.id IS NOT NULL')
      .getCount();

    const paidPayments = await this.paymentRepo
      .createQueryBuilder('p')
      .where('UPPER(p.status) = :paid', { paid: 'PAID' })
      .getMany();

    const totalRevenuePaid = paidPayments.reduce(
      (sum, p) => sum + Number(p.amount ?? 0),
      0,
    );

    return {
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      visitsCreated,
      visitsCompleted,
      queue: { added: queueAdded, activeNow: queueActive },
      vitalsRecordedTotal: vitalsRecorded,
      diagnosesTotal: diagnosesCount,
      lab: { requestsTotal: labRequestsTotal, reportsTotal: labReportsTotal },
      payments: { paidCount: paidPayments.length, paidTotal: totalRevenuePaid },
    };
  }

  async visitsByStage(from?: string, to?: string) {
    const range = parseRange(from, to);

    const rows = await this.visitRepo
      .createQueryBuilder('v')
      .select('v.currentStage', 'stage')
      .addSelect('COUNT(*)', 'count')
      .where('v.createdAt >= :from AND v.createdAt < :to', range)
      .groupBy('v.currentStage')
      .orderBy('count', 'DESC')
      .getRawMany<{ stage: string; count: string }>();

    return {
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      breakdown: rows.map((r) => ({ stage: r.stage, count: Number(r.count) })),
    };
  }

  async visitsByStatus(from?: string, to?: string) {
    const range = parseRange(from, to);

    const rows = await this.visitRepo
      .createQueryBuilder('v')
      .select('v.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('v.createdAt >= :from AND v.createdAt < :to', range)
      .groupBy('v.status')
      .orderBy('count', 'DESC')
      .getRawMany<{ status: string; count: string }>();

    return {
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      breakdown: rows.map((r) => ({
        status: r.status,
        count: Number(r.count),
      })),
    };
  }

  async queueByStage() {
    const rows = await this.queueRepo
      .createQueryBuilder('q')
      .select('q.stage', 'stage')
      .addSelect('COUNT(*)', 'count')
      .where('q.queueStatus = :active', { active: 'ACTIVE' })
      .groupBy('q.stage')
      .orderBy('count', 'DESC')
      .getRawMany<{ stage: string; count: string }>();

    return {
      breakdown: rows.map((r) => ({ stage: r.stage, count: Number(r.count) })),
    };
  }

  async paymentsByTypeAndStatus() {
    const rows = await this.paymentRepo
      .createQueryBuilder('p')
      .select('p.type', 'type')
      .addSelect('p.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(p.amount)', 'amount')
      .groupBy('p.type')
      .addGroupBy('p.status')
      .orderBy('count', 'DESC')
      .getRawMany<{
        type: string;
        status: string;
        count: string;
        amount: string;
      }>();

    return {
      breakdown: rows.map((r) => ({
        type: r.type,
        status: r.status,
        count: Number(r.count),
        amount: Number(r.amount ?? 0),
      })),
    };
  }

  async labRequestsByStatus() {
    const rows = await this.labRequestRepo
      .createQueryBuilder('lr')
      .select('lr.paymentStatus', 'paymentStatus')
      .addSelect('lr.labStatus', 'labStatus')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lr.paymentStatus')
      .addGroupBy('lr.labStatus')
      .orderBy('count', 'DESC')
      .getRawMany<{
        paymentStatus: string;
        labStatus: string;
        count: string;
      }>();

    return {
      breakdown: rows.map((r) => ({
        paymentStatus: r.paymentStatus,
        labStatus: r.labStatus,
        count: Number(r.count),
      })),
    };
  }

  async listRecentVisits(page = 1, limit = 50) {
    const take = Math.min(Math.max(limit, 1), 200);
    const skip = (Math.max(page, 1) - 1) * take;

    const [items, total] = await this.visitRepo.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
    });

    return {
      page: Math.max(page, 1),
      limit: take,
      total,
      items,
    };
  }

  async listQueue(page = 1, limit = 50) {
    const take = Math.min(Math.max(limit, 1), 200);
    const skip = (Math.max(page, 1) - 1) * take;

    const [items, total] = await this.queueRepo.findAndCount({
      order: { position: 'ASC' },
      take,
      skip,
    });

    return {
      page: Math.max(page, 1),
      limit: take,
      total,
      items,
    };
  }
}
