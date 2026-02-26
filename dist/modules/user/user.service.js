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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("./user.entity");
const role_enums_1 = require("../../common/enums/role.enums");
function generatePassword(length = 12) {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    const chars = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
    return chars.join('');
}
let UserService = class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createWithAutoPassword(dto) {
        const email = dto.email?.trim().toLowerCase();
        if (!email)
            throw new common_1.BadRequestException('email is required');
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing)
            throw new common_1.BadRequestException('email already exists');
        const plainPassword = generatePassword();
        const passwordHash = await bcrypt_1.default.hash(plainPassword, 10);
        const user = this.userRepo.create({
            email,
            fullName: dto.fullName?.trim(),
            role: dto.role ?? role_enums_1.Role.RECEPTIONIST,
            passwordHash,
            isActive: true,
        });
        const saved = await this.userRepo.save(user);
        return {
            user: this.toResponse(saved),
            generatedPassword: plainPassword,
        };
    }
    async findByEmail(email) {
        const e = email.trim().toLowerCase();
        return this.userRepo.findOne({ where: { email: e } });
    }
    async findById(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async setRefreshTokenHash(userId, tokenHash) {
        await this.userRepo.update({ id: userId }, {
            refreshTokenHash: tokenHash ?? undefined,
            updatedAt: new Date(),
        });
    }
    async setOtp(userId, otpHash, expiresAt) {
        await this.userRepo.update({ id: userId }, {
            otpCodeHash: otpHash ?? undefined,
            otpExpiresAt: expiresAt ?? undefined,
            updatedAt: new Date(),
        });
    }
    async setPasswordHash(userId, passwordHash) {
        await this.userRepo.update({ id: userId }, {
            passwordHash,
            updatedAt: new Date(),
        });
    }
    toResponse(user) {
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map