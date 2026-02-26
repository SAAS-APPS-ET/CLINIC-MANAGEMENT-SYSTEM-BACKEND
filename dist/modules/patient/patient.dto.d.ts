export declare class CreatePatientDto {
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    customerCardNumber?: string;
    region?: string;
    subCity?: string;
    wereda?: string;
    kebela?: string;
}
export declare class CreateMainPatientDto extends CreatePatientDto {
}
export declare class CreateChildPatientDto {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    customerCardNumber?: string;
    region?: string;
    subCity?: string;
    wereda?: string;
    kebela?: string;
    phoneNumber?: string;
    parentId?: string;
}
export declare class UpdatePatientDto {
    fullName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    customerCardNumber?: string;
    region?: string;
    subCity?: string;
    wereda?: string;
    kebela?: string;
}
