export declare class AdminCreateUserDto {
    email: string;
    fullName?: string;
    role: string;
    password: string;
}
export declare class AdminCreateLabItemDto {
    name: string;
    price: number;
    isActive?: boolean;
}
export declare class AdminUpdateLabItemDto {
    name?: string;
    price?: number;
    isActive?: boolean;
}
export declare class AdminUpsertClinicConfigDto {
    key: string;
    value: string;
    valueType?: 'string' | 'number' | 'boolean' | 'json';
    isSecret?: boolean;
}
