import { VisitService } from './visit.service';
import { CreateVisitDto, UpdateVisitStageDto } from './visit.dto';
export declare class VisitController {
    private readonly visits;
    constructor(visits: VisitService);
    create(dto: CreateVisitDto): Promise<import("./visit.entity").Visit>;
    getOne(id: string): Promise<import("./visit.entity").Visit>;
    complete(id: string): Promise<import("./visit.entity").Visit>;
    updateStage(id: string, dto: UpdateVisitStageDto): Promise<import("./visit.entity").Visit>;
}
