import { QueueStatus, VisitStage } from '../../common/enums/visit.enums';
export declare class QueueItem {
    id: string;
    visitId: string;
    patientId: string;
    patientName: string;
    stage: VisitStage;
    queueStatus: QueueStatus;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}
