import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { Patient } from './patient.entity';
import { Visit } from '../visit/visit.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';
import { Vital } from '../vital/vital.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';
export declare class PatientService {
    private readonly patientRepo;
    private readonly visitRepo;
    private readonly diagnosisRepo;
    private readonly vitalRepo;
    private readonly labRequestRepo;
    private readonly labReportRepo;
    constructor(patientRepo: Repository<Patient>, visitRepo: Repository<Visit>, diagnosisRepo: Repository<DoctorDiagnosis>, vitalRepo: Repository<Vital>, labRequestRepo: Repository<LabRequest>, labReportRepo: Repository<LabReport>);
    searchByPhone(phone: string): Promise<Patient[]>;
    registerPatient(dto: CreatePatientDto): Promise<Patient>;
    updatePatient(id: string, dto: UpdatePatientDto): Promise<Patient>;
    getPatientHistory(id: string): Promise<{
        visits: {
            diagnoses: DoctorDiagnosis[];
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
        patient: Patient;
        visit: Visit;
        diagnoses: DoctorDiagnosis[];
        vitals: Vital[];
        labRequests: LabRequest[];
        labReports: LabReport[];
    }>;
}
