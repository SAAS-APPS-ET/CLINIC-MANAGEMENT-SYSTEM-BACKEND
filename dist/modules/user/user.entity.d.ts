export declare class User {
    id: string;
    email: string;
    fullName?: string;
    role: string;
    passwordHash: string;
    refreshTokenHash?: string;
    otpCodeHash?: string;
    otpExpiresAt?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
