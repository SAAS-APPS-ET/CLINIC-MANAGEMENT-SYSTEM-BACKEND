import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { CreateVisitDto, UpdateVisitStageDto } from './visit.dto';
import { Patient } from '../patient/patient.entity';
import { QueueService } from '../queue/queue.service';
export declare class VisitService {
    private readonly visitRepo;
    private readonly patientRepo;
    private readonly queue;
    constructor(visitRepo: Repository<Visit>, patientRepo: Repository<Patient>, queue: QueueService);
    createVisit(dto: CreateVisitDto): Promise<Visit>;
    getVisit(id: string): Promise<Visit>;
    completeVisit(id: string): Promise<Visit>;
    updateCurrentStage(id: string, dto: UpdateVisitStageDto): Promise<Visit>;
}
