import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { Visit } from '../visit/visit.entity';
import { LabRequest } from '../laboratory/lab-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Visit, LabRequest])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
