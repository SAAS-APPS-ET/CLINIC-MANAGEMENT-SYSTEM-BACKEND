import { Repository } from 'typeorm';
import { DoctorDiagnosis } from './doctor-diagnosis.entity';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { Category } from '../category/category.entity';
import { RequestLabDto, WriteDiagnosisDto, WritePrescriptionDto } from './doctor.dto';
export declare class DoctorService {
    private readonly visitRepo;
    private readonly queueRepo;
    private readonly diagnosisRepo;
    private readonly labRequestRepo;
    private readonly categoryRepo;
    constructor(visitRepo: Repository<Visit>, queueRepo: Repository<QueueItem>, diagnosisRepo: Repository<DoctorDiagnosis>, labRequestRepo: Repository<LabRequest>, categoryRepo: Repository<Category>);
    viewQueue(): Promise<QueueItem[]>;
    startVisit(visitId: string): Promise<Visit>;
    writeDiagnosis(visitId: string, dto: WriteDiagnosisDto, user?: unknown): Promise<DoctorDiagnosis>;
    private getCreatedByFromUser;
    writePrescription(visitId: string, dto: WritePrescriptionDto): Promise<Visit>;
    requestLab(visitId: string, dto: RequestLabDto): Promise<LabRequest>;
}
