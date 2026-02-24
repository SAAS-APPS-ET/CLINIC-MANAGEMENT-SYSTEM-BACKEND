import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vital } from './vital.entity';
import { CreateVitalDto } from './vital.dto';
import { Visit } from '../visit/visit.entity';
import { VisitStage, VisitStatus } from '../../common/enums/visit.enums';

@Injectable()
export class VitalService {
  constructor(
    @InjectRepository(Vital)
    private readonly vitalRepo: Repository<Vital>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
  ) {}

  async recordVital(visitId: string, dto: CreateVitalDto): Promise<Vital> {
    const visit = await this.visitRepo.findOne({ where: { id: visitId } });
    if (!visit) throw new NotFoundException('Visit not found');
    if (visit.status !== VisitStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE visits can record vitals');
    }

    visit.currentStage = VisitStage.VITAL_IN_PROGRESS;
    await this.visitRepo.save(visit);

    const existing = await this.vitalRepo.findOne({ where: { visitId } });
    if (existing) {
      Object.assign(existing, dto);
      return this.vitalRepo.save(existing);
    }

    const created = this.vitalRepo.create({
      visitId,
      ...dto,
    });
    const saved = await this.vitalRepo.save(created);

    visit.currentStage = VisitStage.WAITING_FOR_DOCTOR;
    await this.visitRepo.save(visit);

    return saved;
  }

  async getVital(visitId: string): Promise<Vital> {
    const vital = await this.vitalRepo.findOne({ where: { visitId } });
    if (!vital) throw new NotFoundException('Vital not found');
    return vital;
  }
}
