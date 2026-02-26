import type { Request } from 'express';
import { DoctorService } from './doctor.service';
import { RequestLabDto, WriteDiagnosisDto, WritePrescriptionDto } from './doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    viewQueue(): Promise<import("../queue/queue-item.entity").QueueItem[]>;
    startVisit(visitId: string): Promise<import("../visit/visit.entity").Visit>;
    writeDiagnosis(visitId: string, dto: WriteDiagnosisDto, req: Request): Promise<import("./doctor-diagnosis.entity").DoctorDiagnosis>;
    writePrescription(visitId: string, dto: WritePrescriptionDto): Promise<import("../visit/visit.entity").Visit>;
    requestLab(visitId: string, dto: RequestLabDto): Promise<import("../laboratory/lab-request.entity").LabRequest>;
}
