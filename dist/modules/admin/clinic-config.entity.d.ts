export declare class ClinicConfig {
    id: string;
    key: string;
    value: string;
    valueType: 'string' | 'number' | 'boolean' | 'json';
    isSecret: boolean;
    createdAt: Date;
    updatedAt: Date;
}
