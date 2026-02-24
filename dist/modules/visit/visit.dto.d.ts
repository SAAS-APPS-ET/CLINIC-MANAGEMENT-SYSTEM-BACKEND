import { VisitStatus, QueueStatus, VisitStage } from '../../common/enums/visit.enums';
export declare class CreateVisitDto {
    patientId: string;
    status?: VisitStatus;
    queueStatus?: QueueStatus;
    currentStage?: VisitStage;
}
export declare class CompleteVisitDto {
    completedAt: Date;
}
export declare class UpdateVisitStageDto {
    currentStage: VisitStage;
}
