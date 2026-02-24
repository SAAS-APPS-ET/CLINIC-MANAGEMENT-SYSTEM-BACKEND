import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDiagnosis } from './doctor-diagnosis.entity';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { Category } from '../category/category.entity';
import {
  QueueStatus,
  VisitStage,
  VisitStatus,
} from '../../common/enums/visit.enums';
import {
  RequestLabDto,
  WriteDiagnosisDto,
  WritePrescriptionDto,
} from './doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(QueueItem)
    private readonly queueRepo: Repository<QueueItem>,
    @InjectRepository(DoctorDiagnosis)
    private readonly diagnosisRepo: Repository<DoctorDiagnosis>,
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async viewQueue(): Promise<QueueItem[]> {
    return this.queueRepo.find({
      order: { position: 'ASC' },
    });
  }

  async startVisit(visitId: string): Promise<Visit> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be started');
    }

    const queueItem = await this.queueRepo.findOne({ where: { visitId } });
    if (!queueItem) throw new BadRequestException('Visit is not in queue');
    if (queueItem.queueStatus !== QueueStatus.ACTIVE) {
      throw new BadRequestException('Queue item is not ACTIVE');
    }

    visit.currentStage = VisitStage.DOCTOR_IN_PROGRESS;
    await this.visitRepo.save(visit);

    queueItem.stage = VisitStage.DOCTOR_IN_PROGRESS;
    queueItem.updatedAt = new Date();
    await this.queueRepo.save(queueItem);

    return visit;
  }

  async writeDiagnosis(
    visitId: string,
    dto: WriteDiagnosisDto,
    user?: unknown,
  ): Promise<DoctorDiagnosis> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be diagnosed');
    }

    const createdBy = this.getCreatedByFromUser(user);

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) throw new BadRequestException('Invalid categoryId');
    }

    const diagnosis = this.diagnosisRepo.create({
      visitId,
      categoryId: dto.categoryId,
      diagnosisText: dto.diagnosisText,
      notes: dto.notes,
      createdBy,
    });
    return this.diagnosisRepo.save(diagnosis);
  }

  private getCreatedByFromUser(user: unknown): string {
    if (!user || typeof user !== 'object') {
      throw new BadRequestException('Missing authenticated user');
    }
    const record = user as Record<string, unknown>;

    const email = record.email;
    if (typeof email === 'string' && email.trim()) return email.trim();

    const sub = record.sub;
    if (typeof sub === 'string' && sub.trim()) return sub.trim();

    throw new BadRequestException('Invalid authenticated user payload');
  }

  async writePrescription(
    visitId: string,
    dto: WritePrescriptionDto,
  ): Promise<Visit> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be prescribed');
    }

    visit.prescriptionText = dto.lines.join('\n');
    visit.prescriptionCreatedBy = dto.createdBy;
    return this.visitRepo.save(visit);
  }

  async requestLab(visitId: string, dto: RequestLabDto): Promise<LabRequest> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can request lab');
    }

    const req = this.labRequestRepo.create({
      visitId,
      labItemId: dto.labItemId,
      paymentStatus: 'UNPAID',
      labStatus: 'REQUESTED',
    });
    const saved = await this.labRequestRepo.save(req);

    visit.currentStage = VisitStage.WAITING_FOR_LAB;
    await this.visitRepo.save(visit);

    const queueItem = await this.queueRepo.findOne({ where: { visitId } });
    if (queueItem) {
      queueItem.stage = VisitStage.WAITING_FOR_LAB;
      queueItem.updatedAt = new Date();
      await this.queueRepo.save(queueItem);
    }

    return saved;
  }
}
