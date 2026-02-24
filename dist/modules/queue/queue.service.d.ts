import { Repository } from 'typeorm';
import { QueueItem } from './queue-item.entity';
import { Visit } from '../visit/visit.entity';
import { Patient } from '../patient/patient.entity';
import { VisitStage } from '../../common/enums/visit.enums';
import { QueueItemResponseDto } from './queue.dto';
export declare class QueueService {
    private readonly queueRepo;
    private readonly visitRepo;
    private readonly patientRepo;
    constructor(queueRepo: Repository<QueueItem>, visitRepo: Repository<Visit>, patientRepo: Repository<Patient>);
    addVisitToQueue(visitId: string): Promise<QueueItem>;
    listQueue(): Promise<QueueItem[]>;
    listQueueResponse(): Promise<QueueItemResponseDto[]>;
    pause(visitId: string): Promise<QueueItem>;
    resume(visitId: string): Promise<QueueItem>;
    remove(visitId: string): Promise<QueueItem>;
    reorder(visitIds: string[]): Promise<QueueItem[]>;
    updateStageIfQueued(visitId: string, stage: VisitStage): Promise<void>;
}
