export declare class WriteDiagnosisDto {
    categoryId?: string;
    diagnosisText: string;
    notes?: string;
}
export declare class WritePrescriptionDto {
    lines: string[];
    createdBy: string;
}
export declare class RequestLabDto {
    labItemId: string;
    createdBy: string;
}
export declare class ContinueVisitDto {
    nextStage?: string;
    createdBy?: string;
}
export declare class LabReportAttachmentDto {
    attachmentUrl?: string;
}
