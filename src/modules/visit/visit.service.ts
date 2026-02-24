import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { CreateVisitDto, UpdateVisitStageDto } from './visit.dto';
import {
  QueueStatus,
  VisitStage,
  VisitStatus,
} from '../../common/enums/visit.enums';
import { Patient } from '../patient/patient.entity';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    private readonly queue: QueueService,
  ) {}

  async createVisit(dto: CreateVisitDto): Promise<Visit> {
    const patient = await this.patientRepo.findOne({
      where: { id: dto.patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const visit = this.visitRepo.create({
      patientId: dto.patientId,
      status: dto.status ?? VisitStatus.ACTIVE,
      queueStatus: dto.queueStatus ?? QueueStatus.ACTIVE,
      currentStage: dto.currentStage ?? VisitStage.WAITING_FOR_VITAL,
    });

    const saved = await this.visitRepo.save(visit);
    await this.queue.addVisitToQueue(saved.id);
    return saved;
  }

  async getVisit(id: string): Promise<Visit> {
    const visit = await this.visitRepo.findOne({ where: { id } });
    if (!visit) throw new NotFoundException('Visit not found');
    return visit;
  }

  async completeVisit(id: string): Promise<Visit> {
    const visit = await this.getVisit(id);
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only active visits can be completed');
    }

    visit.status = VisitStatus.COMPLETED;
    visit.currentStage = VisitStage.COMPLETED;
    visit.queueStatus = QueueStatus.REMOVED;
    visit.completedAt = new Date();
    return this.visitRepo.save(visit);
  }

  async updateCurrentStage(
    id: string,
    dto: UpdateVisitStageDto,
  ): Promise<Visit> {
    const visit = await this.getVisit(id);
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only active visits can change stage');
    }

    visit.currentStage = dto.currentStage;
    const saved = await this.visitRepo.save(visit);

    await this.queue.updateStageIfQueued(saved.id, saved.currentStage);
    return saved;
  }
}
