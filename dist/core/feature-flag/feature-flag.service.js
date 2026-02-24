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
exports.FeatureFlagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feature_flag_entity_1 = require("./feature-flag.entity");
let FeatureFlagService = class FeatureFlagService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async isEnabled(key) {
        const flag = await this.repo.findOne({ where: { key } });
        return flag?.enabled ?? false;
    }
    async list() {
        return this.repo.find({ order: { key: 'ASC' } });
    }
    async set(key, enabled) {
        const existing = await this.repo.findOne({ where: { key } });
        if (existing) {
            existing.enabled = enabled;
            return this.repo.save(existing);
        }
        return this.repo.save(this.repo.create({ key, enabled }));
    }
};
exports.FeatureFlagService = FeatureFlagService;
exports.FeatureFlagService = FeatureFlagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feature_flag_entity_1.FeatureFlag)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeatureFlagService);
//# sourceMappingURL=feature-flag.service.js.map