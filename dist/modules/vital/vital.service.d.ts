import { Repository } from 'typeorm';
import { Vital } from './vital.entity';
import { CreateVitalDto } from './vital.dto';
import { Visit } from '../visit/visit.entity';
export declare class VitalService {
    private readonly vitalRepo;
    private readonly visitRepo;
    constructor(vitalRepo: Repository<Vital>, visitRepo: Repository<Visit>);
    recordVital(visitId: string, dto: CreateVitalDto): Promise<Vital>;
    getVital(visitId: string): Promise<Vital>;
}
