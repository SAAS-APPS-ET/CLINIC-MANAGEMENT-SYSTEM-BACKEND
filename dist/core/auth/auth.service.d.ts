import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../modules/user/user.service';
import { SmtpService } from '../../integrations/smtp/smtp.service';
import { type AppEnv } from '../config/app.config';
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    private readonly config;
    private readonly smtp;
    constructor(users: UserService, jwt: JwtService, config: ConfigService<AppEnv, true>, smtp: SmtpService);
    private signTokens;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            fullName: string | undefined;
            role: string;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    forgetPassword(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        verified: boolean;
    }>;
    changePassword(email: string, otp: string, newPassword: string): Promise<{
        changed: boolean;
    }>;
}
