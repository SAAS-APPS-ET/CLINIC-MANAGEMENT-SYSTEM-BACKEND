import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
export declare class PharmacyService {
    private readonly rxRepo;
    private readonly visitRepo;
    private readonly queueRepo;
    constructor(rxRepo: Repository<Prescription>, visitRepo: Repository<Visit>, queueRepo: Repository<QueueItem>);
    queue(): Promise<QueueItem[]>;
    dispense(visitId: string): Promise<{
        visitId: string;
        status: string;
    }>;
}
