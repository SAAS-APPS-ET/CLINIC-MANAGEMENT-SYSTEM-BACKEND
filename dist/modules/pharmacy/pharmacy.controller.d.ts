import { PharmacyService } from './pharmacy.service';
export declare class PharmacyController {
    private readonly pharmacyService;
    constructor(pharmacyService: PharmacyService);
    queue(): Promise<import("../queue/queue-item.entity").QueueItem[]>;
    dispense(visitId: string): Promise<{
        visitId: string;
        status: string;
    }>;
}
