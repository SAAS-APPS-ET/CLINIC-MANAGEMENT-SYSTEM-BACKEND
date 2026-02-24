import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReportCommand } from './daily-report.command';
import { Visit } from '../modules/visit/visit.entity';
import { Payment } from '../modules/payment/payment.entity';
import { LabRequest } from '../modules/laboratory/lab-request.entity';
import { QueueItem } from '../modules/queue/queue-item.entity';
import { SmtpModule } from '../integrations/smtp/smtp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit, Payment, LabRequest, QueueItem]),
    SmtpModule,
  ],
  providers: [DailyReportCommand],
  exports: [DailyReportCommand],
})
export class CommandsModule {}
