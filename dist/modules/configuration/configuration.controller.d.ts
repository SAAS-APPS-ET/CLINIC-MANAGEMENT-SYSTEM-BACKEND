import { Role } from '../../common/enums/role.enums';
import { VisitStage } from '../../common/enums/visit.enums';
import { FeatureFlagService } from '../../core/feature-flag/feature-flag.service';
import { type FeatureKey } from '../../core/feature-flag/feature-keys';
type VisitStageCategoryKey = 'Waiting' | 'Vitals' | 'Doctor' | 'Labratory' | 'Pharmacy';
type VisitStageCategory = {
    key: VisitStageCategoryKey;
    stages: VisitStage[];
};
export declare class ConfigurationController {
    private readonly featureFlags;
    constructor(featureFlags: FeatureFlagService);
    listRoles(): Promise<Role[]>;
    listFeatureFlags(): Promise<Record<FeatureKey, boolean>>;
    listVisitStageCategories(): Promise<VisitStageCategory[]>;
}
export {};
