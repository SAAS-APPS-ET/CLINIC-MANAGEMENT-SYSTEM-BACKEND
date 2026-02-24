import { Repository } from 'typeorm';
import { LabRequest } from './lab-request.entity';
import { LabReport } from './lab-report.entity';
import { CreateLabReportDto } from './laboratory.dto';
import { Visit } from '../visit/visit.entity';
export declare class LaboratoryService {
    private readonly labRequestRepo;
    private readonly labReportRepo;
    private readonly visitRepo;
    constructor(labRequestRepo: Repository<LabRequest>, labReportRepo: Repository<LabReport>, visitRepo: Repository<Visit>);
    listRequests(): Promise<LabRequest[]>;
    createReport(labRequestId: string, dto: CreateLabReportDto): Promise<LabReport>;
}
