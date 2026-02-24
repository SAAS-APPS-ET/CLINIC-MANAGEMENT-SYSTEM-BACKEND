import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { VisitStage, VisitStatus } from '../../common/enums/visit.enums';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(Prescription)
    private readonly rxRepo: Repository<Prescription>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(QueueItem)
    private readonly queueRepo: Repository<QueueItem>,
  ) {}

  async queue(): Promise<QueueItem[]> {
    return this.queueRepo.find({
      where: { stage: VisitStage.WAITING_FOR_PHARMACY },
      order: { position: 'ASC' },
    });
  }

  async dispense(
    visitId: string,
  ): Promise<{ visitId: string; status: string }> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be dispensed');
    }

    const rxCount = await this.rxRepo.count({
      where: { visitId, sendToPharmacy: true },
    });
    if (!rxCount) {
      throw new BadRequestException(
        'No prescription sent to pharmacy for this visit',
      );
    }

    visit.currentStage = VisitStage.PHARMACY_IN_PROGRESS;
    await this.visitRepo.save(visit);

    const item = await this.queueRepo.findOne({ where: { visitId } });
    if (item) {
      item.stage = VisitStage.PHARMACY_IN_PROGRESS;
      item.updatedAt = new Date();
      await this.queueRepo.save(item);
    }

    // Mark dispensed as completed for pharmacy stage
    visit.currentStage = VisitStage.COMPLETED;
    visit.status = VisitStatus.COMPLETED;
    visit.completedAt = new Date();
    await this.visitRepo.save(visit);

    if (item) {
      item.stage = VisitStage.COMPLETED;
      item.updatedAt = new Date();
      await this.queueRepo.save(item);
    }

    return { visitId, status: 'DISPENSED' };
  }
}
