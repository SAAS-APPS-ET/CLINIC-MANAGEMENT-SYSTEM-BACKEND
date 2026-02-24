import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryController } from './laboratory.controller';
import { LaboratoryService } from './laboratory.service';
import { LabItem } from './lab-item.entity';
import { LabRequest } from './lab-request.entity';
import { LabReport } from './lab-report.entity';
import { Visit } from '../visit/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabItem, LabRequest, LabReport, Visit])],
  controllers: [LaboratoryController],
  providers: [LaboratoryService],
})
export class LaboratoryModule {}
