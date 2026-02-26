import { QueueStatus, VisitStage } from '../../common/enums/visit.enums';
export type MainQueueKey = 'Waiting' | 'Vitals' | 'Doctor' | 'Labratory' | 'Pharmacy' | 'Other';
export declare class QueueItemResponseDto {
    id: string;
    visitId: string;
    patientId: string;
    patientName: string;
    stage: VisitStage;
    mainQueue: MainQueueKey;
    queueStatus: QueueStatus;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ReorderQueueDto {
    visitIds: string[];
}
