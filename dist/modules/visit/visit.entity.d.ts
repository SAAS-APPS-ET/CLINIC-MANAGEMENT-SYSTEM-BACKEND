import { VisitStatus, QueueStatus, VisitStage } from '../../common/enums/visit.enums';
export declare class Visit {
    id: string;
    patientId: string;
    status: VisitStatus;
    queueStatus: QueueStatus;
    currentStage: VisitStage;
    createdAt: Date;
    completedAt?: Date;
    prescriptionText?: string;
    prescriptionCreatedBy?: string;
}
