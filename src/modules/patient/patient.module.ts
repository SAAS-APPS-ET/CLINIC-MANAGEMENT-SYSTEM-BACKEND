import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { Visit } from '../visit/visit.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';
import { Vital } from '../vital/vital.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      Visit,
      DoctorDiagnosis,
      Vital,
      LabRequest,
      LabReport,
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
