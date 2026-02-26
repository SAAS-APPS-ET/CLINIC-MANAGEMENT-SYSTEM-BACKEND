import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './payment.dto';
import { Visit } from '../visit/visit.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
export declare class PaymentService {
    private readonly paymentRepo;
    private readonly visitRepo;
    private readonly labRequestRepo;
    constructor(paymentRepo: Repository<Payment>, visitRepo: Repository<Visit>, labRequestRepo: Repository<LabRequest>);
    create(dto: CreatePaymentDto): Promise<Payment>;
    getByVisit(visitId: string): Promise<Payment[]>;
}
