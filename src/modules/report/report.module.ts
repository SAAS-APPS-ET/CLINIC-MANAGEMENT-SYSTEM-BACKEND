import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { Payment } from '../payment/payment.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';
import { Vital } from '../vital/vital.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Visit,
      QueueItem,
      Payment,
      LabRequest,
      LabReport,
      Vital,
      DoctorDiagnosis,
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
