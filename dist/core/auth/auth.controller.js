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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
class LoginResponseDto {
    accessToken;
    refreshToken;
    user;
}
class RefreshResponseDto {
    accessToken;
    refreshToken;
}
class MessageResponseDto {
    message;
}
class VerifyOtpResponseDto {
    verified;
}
class ChangePasswordResponseDto {
    changed;
}
let AuthController = class AuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    login(dto) {
        return this.auth.login(dto.email, dto.password);
    }
    refresh(dto) {
        return this.auth.refresh(dto.refreshToken);
    }
    forgetPassword(dto) {
        return this.auth.forgetPassword(dto.email);
    }
    verifyOtp(dto) {
        return this.auth.verifyOtp(dto.email, dto.otp);
    }
    changePassword(dto) {
        return this.auth.changePassword(dto.email, dto.otp, dto.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Login',
        description: 'Validates email/password and returns access + refresh tokens.',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tokens issued successfully.',
        type: LoginResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid credentials.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh tokens',
        description: 'Rotates refresh token and returns a new access + refresh token pair.',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tokens refreshed successfully.',
        type: RefreshResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid refresh token.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Request password reset OTP',
        description: 'Sends a 6-digit OTP to the email address if the account exists.',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.ForgetPasswordDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Always returns a generic message to avoid leaking account existence.',
        type: MessageResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify OTP',
        description: 'Verifies that the provided OTP is correct and not expired.',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.VerifyOtpDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'OTP verified.', type: VerifyOtpResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid or expired OTP.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Change password using OTP',
        description: 'Changes password if OTP is valid, then clears OTP and revokes refresh tokens.',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.ChangePasswordDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password changed.',
        type: ChangePasswordResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid or expired OTP.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map