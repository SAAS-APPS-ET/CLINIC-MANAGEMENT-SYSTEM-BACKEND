import { Repository } from 'typeorm';
import { Visit } from '../modules/visit/visit.entity';
import { Payment } from '../modules/payment/payment.entity';
import { LabRequest } from '../modules/laboratory/lab-request.entity';
import { QueueItem } from '../modules/queue/queue-item.entity';
import { SmtpService } from '../integrations/smtp/smtp.service';
type DailyReportOptions = {
    date?: Date;
    emailTo?: string;
};
export declare class DailyReportCommand {
    private readonly visitRepo;
    private readonly paymentRepo;
    private readonly labRequestRepo;
    private readonly queueRepo;
    private readonly smtp;
    constructor(visitRepo: Repository<Visit>, paymentRepo: Repository<Payment>, labRequestRepo: Repository<LabRequest>, queueRepo: Repository<QueueItem>, smtp: SmtpService);
    run(options?: DailyReportOptions): Promise<{
        text: string;
    }>;
}
export {};
