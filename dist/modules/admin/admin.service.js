"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("../user/user.entity");
const lab_item_entity_1 = require("../laboratory/lab-item.entity");
const clinic_config_entity_1 = require("./clinic-config.entity");
let AdminService = class AdminService {
    userRepo;
    labItemRepo;
    clinicConfigRepo;
    constructor(userRepo, labItemRepo, clinicConfigRepo) {
        this.userRepo = userRepo;
        this.labItemRepo = labItemRepo;
        this.clinicConfigRepo = clinicConfigRepo;
    }
    async createUser(dto) {
        const existing = await this.userRepo.findOne({
            where: { email: dto.email },
        });
        if (existing)
            throw new common_1.BadRequestException('User already exists');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({
            email: dto.email,
            fullName: dto.fullName,
            role: dto.role,
            passwordHash,
            isActive: true,
        });
        const saved = await this.userRepo.save(user);
        return {
            id: saved.id,
            email: saved.email,
            fullName: saved.fullName,
            role: saved.role,
            isActive: saved.isActive,
            createdAt: saved.createdAt,
        };
    }
    async listUsers() {
        const users = await this.userRepo.find({
            where: {
                role: (0, typeorm_2.Not)((0, typeorm_2.In)(['ADMIN', 'SUPER_ADMIN'])),
            },
            order: { createdAt: 'DESC' },
        });
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            fullName: u.fullName,
            role: u.role,
            isActive: u.isActive,
            createdAt: u.createdAt,
        }));
    }
    async createLabItem(dto) {
        const item = this.labItemRepo.create({
            name: dto.name,
            price: dto.price,
            isActive: dto.isActive ?? true,
        });
        return this.labItemRepo.save(item);
    }
    async listLabItems() {
        return this.labItemRepo.find({ order: { name: 'ASC' } });
    }
    async updateLabItem(id, dto) {
        const item = await this.labItemRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Lab item not found');
        Object.assign(item, dto);
        return this.labItemRepo.save(item);
    }
    async listClinicConfig() {
        return this.clinicConfigRepo.find({ order: { key: 'ASC' } });
    }
    async upsertClinicConfig(dto) {
        const existing = await this.clinicConfigRepo.findOne({
            where: { key: dto.key },
        });
        const record = existing
            ? Object.assign(existing, {
                value: dto.value,
                valueType: dto.valueType ?? existing.valueType,
                isSecret: dto.isSecret ?? existing.isSecret,
            })
            : this.clinicConfigRepo.create({
                key: dto.key,
                value: dto.value,
                valueType: dto.valueType ?? 'string',
                isSecret: dto.isSecret ?? false,
            });
        return this.clinicConfigRepo.save(record);
    }
    async deleteClinicConfig(key) {
        const existing = await this.clinicConfigRepo.findOne({ where: { key } });
        if (!existing)
            throw new common_1.NotFoundException('Config key not found');
        await this.clinicConfigRepo.remove(existing);
        return { deleted: true, key };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(lab_item_entity_1.LabItem)),
    __param(2, (0, typeorm_1.InjectRepository)(clinic_config_entity_1.ClinicConfig)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map