import { type FeatureKey } from './feature-keys';
import { FeatureFlagService } from './feature-flag.service';
type FeatureFlagConfigItem = {
    key: FeatureKey;
    enabled: boolean;
};
declare class SetFeatureFlagDto {
    enabled: boolean;
}
export declare class FeatureFlagController {
    private readonly flags;
    constructor(flags: FeatureFlagService);
    listEnabled(): Promise<import("./feature-flag.entity").FeatureFlag[]>;
    listKeys(): ("ENABLE_RECEPTION_MODULE" | "ENABLE_DOCTOR_MODULE" | "ENABLE_VITAL_MODULE" | "ENABLE_LAB_MODULE" | "ENABLE_PHARMACY_MODULE")[];
    listConfig(): Promise<FeatureFlagConfigItem[]>;
    enable(key: string): Promise<import("./feature-flag.entity").FeatureFlag>;
    disable(key: string): Promise<import("./feature-flag.entity").FeatureFlag>;
    set(key: string, dto: SetFeatureFlagDto): Promise<import("./feature-flag.entity").FeatureFlag>;
}
export {};
