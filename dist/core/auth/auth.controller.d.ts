import { ChangePasswordDto, ForgetPasswordDto, LoginDto, RefreshTokenDto, VerifyOtpDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
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
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    forgetPassword(dto: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        verified: boolean;
    }>;
    changePassword(dto: ChangePasswordDto): Promise<{
        changed: boolean;
    }>;
}
