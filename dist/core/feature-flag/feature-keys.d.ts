export declare const FeatureKeys: {
    readonly ENABLE_RECEPTION_MODULE: "ENABLE_RECEPTION_MODULE";
    readonly ENABLE_DOCTOR_MODULE: "ENABLE_DOCTOR_MODULE";
    readonly ENABLE_VITAL_MODULE: "ENABLE_VITAL_MODULE";
    readonly ENABLE_LAB_MODULE: "ENABLE_LAB_MODULE";
    readonly ENABLE_PHARMACY_MODULE: "ENABLE_PHARMACY_MODULE";
};
export type FeatureKey = (typeof FeatureKeys)[keyof typeof FeatureKeys];
