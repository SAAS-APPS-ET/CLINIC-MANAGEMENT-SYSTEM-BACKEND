import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { Prescription } from './prescription.entity';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, Visit, QueueItem])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
