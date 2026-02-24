import { LaboratoryService } from './laboratory.service';
import { CreateLabReportDto } from './laboratory.dto';
export declare class LaboratoryController {
    private readonly labService;
    constructor(labService: LaboratoryService);
    listRequests(): Promise<import("./lab-request.entity").LabRequest[]>;
    createReport(labRequestId: string, dto: CreateLabReportDto): Promise<import("./lab-report.entity").LabReport>;
}
