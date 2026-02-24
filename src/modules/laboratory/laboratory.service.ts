import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabRequest } from './lab-request.entity';
import { LabReport } from './lab-report.entity';
import { CreateLabReportDto } from './laboratory.dto';
import { Visit } from '../visit/visit.entity';
import { VisitStage, VisitStatus } from '../../common/enums/visit.enums';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
    @InjectRepository(LabReport)
    private readonly labReportRepo: Repository<LabReport>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
  ) {}

  async listRequests(): Promise<LabRequest[]> {
    return this.labRequestRepo.find({
      order: { id: 'DESC' },
    });
  }

  async createReport(
    labRequestId: string,
    dto: CreateLabReportDto,
  ): Promise<LabReport> {
    const req = await this.labRequestRepo.findOne({
      where: { id: labRequestId },
    });
    if (!req) throw new NotFoundException('Lab request not found');

    const visit = await this.visitRepo.findOne({ where: { id: req.visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can be processed');
    }

    if ((req.paymentStatus ?? '').toUpperCase() !== 'PAID') {
      throw new BadRequestException(
        'Lab request must be PAID before reporting',
      );
    }

    visit.currentStage = VisitStage.LAB_IN_PROGRESS;
    await this.visitRepo.save(visit);

    const report = this.labReportRepo.create({
      labRequestId,
      resultText: dto.resultText,
      attachmentUrl: dto.attachmentUrl,
      createdBy: dto.createdBy,
    });
    const saved = await this.labReportRepo.save(report);

    req.labStatus = 'COMPLETED';
    await this.labRequestRepo.save(req);

    visit.currentStage = VisitStage.WAITING_FOR_DOCTOR_REVIEW;
    await this.visitRepo.save(visit);

    return saved;
  }
}
