import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './payment.dto';
import { Visit } from '../visit/visit.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { VisitStage, VisitStatus } from '../../common/enums/visit.enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const visit = await this.visitRepo.findOne({ where: { id: dto.visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be paid for');
    }

    const payment = this.paymentRepo.create({
      visitId: dto.visitId,
      amount: dto.amount,
      type: dto.type,
      method: dto.method,
      status: dto.status,
    });
    const saved = await this.paymentRepo.save(payment);

    // If lab payment is PAID, mark pending lab requests as PAID
    if (dto.type === 'LAB' && dto.status === 'PAID') {
      const reqs = await this.labRequestRepo.find({
        where: { visitId: dto.visitId },
      });
      for (const r of reqs) {
        r.paymentStatus = 'PAID';
        if ((r.labStatus ?? '').toUpperCase() === 'REQUESTED') {
          r.labStatus = 'PENDING';
        }
      }
      if (reqs.length) await this.labRequestRepo.save(reqs);

      visit.currentStage = VisitStage.WAITING_FOR_LAB;
      await this.visitRepo.save(visit);
    }

    // Consultation or pharmacy payments can be used later; basic stage nudge only.
    if (dto.type === 'PHARMACY' && dto.status === 'PAID') {
      visit.currentStage = VisitStage.WAITING_FOR_PHARMACY;
      await this.visitRepo.save(visit);
    }

    return saved;
  }

  async getByVisit(visitId: string): Promise<Payment[]> {
    return this.paymentRepo.find({ where: { visitId }, order: { id: 'DESC' } });
  }
}
