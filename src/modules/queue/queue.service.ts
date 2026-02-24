import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QueueItem } from './queue-item.entity';
import { Visit } from '../visit/visit.entity';
import { Patient } from '../patient/patient.entity';
import {
  QueueStatus,
  VisitStage,
  VisitStatus,
} from '../../common/enums/visit.enums';
import { type MainQueueKey, QueueItemResponseDto } from './queue.dto';

function getMainQueue(stage: VisitStage): MainQueueKey {
  switch (stage) {
    case VisitStage.WAITING:
      return 'Waiting';

    case VisitStage.WAITING_FOR_VITAL:
    case VisitStage.VITAL_IN_PROGRESS:
      return 'Vitals';

    case VisitStage.WAITING_FOR_DOCTOR:
    case VisitStage.DOCTOR_IN_PROGRESS:
    case VisitStage.WAITING_FOR_DOCTOR_REVIEW:
    case VisitStage.DOCTOR_REVIEW_IN_PROGRESS:
      return 'Doctor';

    case VisitStage.WAITING_FOR_LAB:
    case VisitStage.LAB_IN_PROGRESS:
    case VisitStage.WAITING_FOR_LAB_REPORT:
      return 'Labratory';

    case VisitStage.WAITING_FOR_PHARMACY:
    case VisitStage.PHARMACY_IN_PROGRESS:
      return 'Pharmacy';

    default:
      return 'Other';
  }
}

function toQueueItemResponse(item: QueueItem): QueueItemResponseDto {
  return {
    id: item.id,
    visitId: item.visitId,
    patientId: item.patientId,
    patientName: item.patientName,
    stage: item.stage,
    mainQueue: getMainQueue(item.stage),
    queueStatus: item.queueStatus,
    position: item.position,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueItem)
    private readonly queueRepo: Repository<QueueItem>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async addVisitToQueue(visitId: string): Promise<QueueItem> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be queued');
    }

    const patient = await this.patientRepo.findOne({
      where: { id: visit.patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const existing = await this.queueRepo.findOne({ where: { visitId } });
    if (existing) return existing;

    const last = await this.queueRepo.find({
      order: { position: 'DESC' },
      take: 1,
    });
    const nextPos = last.length ? last[0].position + 1 : 1;

    const item = this.queueRepo.create({
      visitId: visit.id,
      patientId: patient.id,
      patientName: patient.fullName,
      stage: visit.currentStage ?? VisitStage.WAITING_FOR_VITAL,
      queueStatus: visit.queueStatus,
      position: nextPos,
      updatedAt: new Date(),
    });
    return this.queueRepo.save(item);
  }

  async listQueue(): Promise<QueueItem[]> {
    const items = await this.queueRepo.find({
      order: { position: 'ASC' },
    });
    return items;
  }

  async listQueueResponse(): Promise<QueueItemResponseDto[]> {
    const items = await this.queueRepo.find({
      order: { position: 'ASC' },
    });
    return items.map(toQueueItemResponse);
  }

  async pause(visitId: string): Promise<QueueItem> {
    const item = await this.queueRepo.findOne({ where: { visitId } });
    if (!item) throw new NotFoundException('Queue item not found');
    item.queueStatus = QueueStatus.PAUSED;
    item.updatedAt = new Date();
    await this.visitRepo.update(
      { id: visitId },
      { queueStatus: QueueStatus.PAUSED },
    );
    return this.queueRepo.save(item);
  }

  async resume(visitId: string): Promise<QueueItem> {
    const item = await this.queueRepo.findOne({ where: { visitId } });
    if (!item) throw new NotFoundException('Queue item not found');
    item.queueStatus = QueueStatus.ACTIVE;
    item.updatedAt = new Date();
    await this.visitRepo.update(
      { id: visitId },
      { queueStatus: QueueStatus.ACTIVE },
    );
    return this.queueRepo.save(item);
  }

  async remove(visitId: string): Promise<QueueItem> {
    const item = await this.queueRepo.findOne({ where: { visitId } });
    if (!item) throw new NotFoundException('Queue item not found');
    item.queueStatus = QueueStatus.REMOVED;
    item.updatedAt = new Date();
    await this.visitRepo.update(
      { id: visitId },
      { queueStatus: QueueStatus.REMOVED },
    );
    return this.queueRepo.save(item);
  }

  async reorder(visitIds: string[]): Promise<QueueItem[]> {
    if (!visitIds.length) throw new BadRequestException('visitIds required');

    const items = await this.queueRepo.find({
      where: { visitId: In(visitIds) },
    });
    if (items.length !== visitIds.length) {
      throw new BadRequestException('Some visitIds are not in queue');
    }

    const byVisit = new Map(items.map((i) => [i.visitId, i] as const));
    for (let idx = 0; idx < visitIds.length; idx += 1) {
      const item = byVisit.get(visitIds[idx]);
      if (!item) continue;
      item.position = idx + 1;
      item.updatedAt = new Date();
    }
    return this.queueRepo.save(Array.from(byVisit.values()));
  }

  async updateStageIfQueued(visitId: string, stage: VisitStage): Promise<void> {
    const item = await this.queueRepo.findOne({ where: { visitId } });
    if (!item) return;
    item.stage = stage;
    item.updatedAt = new Date();
    await this.queueRepo.save(item);
  }
}
