import { CreatePaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(dto: CreatePaymentDto): Promise<import("./payment.entity").Payment>;
    getByVisit(visitId: string): Promise<import("./payment.entity").Payment[]>;
}
