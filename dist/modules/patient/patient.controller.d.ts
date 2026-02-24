import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    searchByPhone(phone: string): Promise<import("./patient.entity").Patient[]>;
    register(dto: CreatePatientDto): Promise<import("./patient.entity").Patient>;
    updatePatient(id: string, dto: UpdatePatientDto): Promise<import("./patient.entity").Patient>;
    getPatientHistory(id: string): Promise<{
        visits: {
            diagnoses: import("../doctor/doctor-diagnosis.entity").DoctorDiagnosis[];
            id: string;
            patientId: string;
            status: import("../../common/enums/visit.enums").VisitStatus;
            queueStatus: import("../../common/enums/visit.enums").QueueStatus;
            currentStage: import("../../common/enums/visit.enums").VisitStage;
            createdAt: Date;
            completedAt?: Date;
            prescriptionText?: string;
            prescriptionCreatedBy?: string;
        }[];
    }>;
    getCurrentDetail(patientId: string, visitId: string): Promise<{
        patient: import("./patient.entity").Patient;
        visit: import("../visit/visit.entity").Visit;
        diagnoses: import("../doctor/doctor-diagnosis.entity").DoctorDiagnosis[];
        vitals: import("../vital/vital.entity").Vital[];
        labRequests: import("../laboratory/lab-request.entity").LabRequest[];
        labReports: import("../laboratory/lab-report.entity").LabReport[];
    }>;
}
