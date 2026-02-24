import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    createWithAutoPassword(dto: CreateUserDto): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string | undefined;
            role: string;
            isActive: boolean;
            createdAt: Date;
        };
        generatedPassword: string;
    }>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    setRefreshTokenHash(userId: string, tokenHash: string | null): Promise<void>;
    setOtp(userId: string, otpHash: string | null, expiresAt: Date | null): Promise<void>;
    setPasswordHash(userId: string, passwordHash: string): Promise<void>;
    toResponse(user: User): {
        id: string;
        email: string;
        fullName: string | undefined;
        role: string;
        isActive: boolean;
        createdAt: Date;
    };
}
