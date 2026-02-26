import { VitalService } from './vital.service';
import { CreateVitalDto } from './vital.dto';
export declare class VitalController {
    private readonly vitalService;
    constructor(vitalService: VitalService);
    record(visitId: string, dto: CreateVitalDto): Promise<import("./vital.entity").Vital>;
    get(visitId: string): Promise<import("./vital.entity").Vital>;
}
