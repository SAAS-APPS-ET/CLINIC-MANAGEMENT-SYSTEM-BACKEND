import { Repository } from 'typeorm';
import { FeatureFlag } from './feature-flag.entity';
export declare class FeatureFlagService {
    private readonly repo;
    constructor(repo: Repository<FeatureFlag>);
    isEnabled(key: string): Promise<boolean>;
    list(): Promise<FeatureFlag[]>;
    set(key: string, enabled: boolean): Promise<FeatureFlag>;
}
