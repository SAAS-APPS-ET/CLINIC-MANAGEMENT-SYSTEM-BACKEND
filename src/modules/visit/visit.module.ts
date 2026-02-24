import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { Visit } from './visit.entity';
import { Patient } from '../patient/patient.entity';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Patient]), QueueModule],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
