export declare class DispenseDto {
    dispensedBy?: string;
}
export declare class CreatePrescriptionDto {
    medicineName: string;
    dosage: string;
    duration: string;
    instructions?: string;
    sendToPharmacy: boolean;
}
