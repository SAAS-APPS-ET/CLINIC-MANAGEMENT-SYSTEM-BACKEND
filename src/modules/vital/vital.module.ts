import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalController } from './vital.controller';
import { VitalService } from './vital.service';
import { Vital } from './vital.entity';
import { Visit } from '../visit/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vital, Visit])],
  controllers: [VitalController],
  providers: [VitalService],
})
export class VitalModule {}
