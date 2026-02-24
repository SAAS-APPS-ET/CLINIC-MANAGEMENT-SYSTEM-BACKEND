"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const user_service_1 = require("../../modules/user/user.service");
const smtp_service_1 = require("../../integrations/smtp/smtp.service");
let AuthService = class AuthService {
    users;
    jwt;
    config;
    smtp;
    constructor(users, jwt, config, smtp) {
        this.users = users;
        this.jwt = jwt;
        this.config = config;
        this.smtp = smtp;
    }
    async signTokens(user) {
        const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role }, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
        });
        const refreshToken = await this.jwt.signAsync({ sub: user.id }, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
        });
        return { accessToken, refreshToken };
    }
    async login(email, password) {
        const user = await this.users.findByEmail(email);
        if (!user || !user.isActive)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const tokens = await this.signTokens(user);
        const refreshHash = await bcrypt_1.default.hash(tokens.refreshToken, 10);
        await this.users.setRefreshTokenHash(user.id, refreshHash);
        return {
            user: this.users.toResponse(user),
            ...tokens,
        };
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = await this.jwt.verifyAsync(refreshToken, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const userId = payload.sub;
        const user = await this.users.findById(userId);
        if (!user.refreshTokenHash)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const ok = await bcrypt_1.default.compare(refreshToken, user.refreshTokenHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const tokens = await this.signTokens(user);
        const refreshHash = await bcrypt_1.default.hash(tokens.refreshToken, 10);
        await this.users.setRefreshTokenHash(user.id, refreshHash);
        return { ...tokens };
    }
    async forgetPassword(email) {
        const user = await this.users.findByEmail(email);
        if (!user) {
            return { message: 'If the account exists, OTP was sent' };
        }
        const otp = String((0, crypto_1.randomInt)(100000, 999999));
        const otpHash = await bcrypt_1.default.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await this.users.setOtp(user.id, otpHash, expiresAt);
        await this.smtp.sendMail(user.email, 'Password reset OTP', `Your OTP is ${otp}. It expires in 10 minutes.`);
        return { message: 'If the account exists, OTP was sent' };
    }
    async verifyOtp(email, otp) {
        const user = await this.users.findByEmail(email);
        if (!user || !user.otpCodeHash || !user.otpExpiresAt) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        if (user.otpExpiresAt.getTime() < Date.now()) {
            throw new common_1.BadRequestException('OTP expired');
        }
        const ok = await bcrypt_1.default.compare(otp, user.otpCodeHash);
        if (!ok)
            throw new common_1.BadRequestException('Invalid OTP');
        return { verified: true };
    }
    async changePassword(email, otp, newPassword) {
        const user = await this.users.findByEmail(email);
        if (!user || !user.otpCodeHash || !user.otpExpiresAt) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        if (user.otpExpiresAt.getTime() < Date.now()) {
            throw new common_1.BadRequestException('OTP expired');
        }
        const ok = await bcrypt_1.default.compare(otp, user.otpCodeHash);
        if (!ok)
            throw new common_1.BadRequestException('Invalid OTP');
        const passwordHash = await bcrypt_1.default.hash(newPassword, 10);
        await this.users.setPasswordHash(user.id, passwordHash);
        await this.users.setOtp(user.id, null, null);
        await this.users.setRefreshTokenHash(user.id, null);
        return { changed: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        smtp_service_1.SmtpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map