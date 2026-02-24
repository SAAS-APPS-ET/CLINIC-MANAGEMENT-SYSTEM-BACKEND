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
exports.VitalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vital_entity_1 = require("./vital.entity");
const visit_entity_1 = require("../visit/visit.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
let VitalService = class VitalService {
    vitalRepo;
    visitRepo;
    constructor(vitalRepo, visitRepo) {
        this.vitalRepo = vitalRepo;
        this.visitRepo = visitRepo;
    }
    async recordVital(visitId, dto) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can record vitals');
        }
        visit.currentStage = visit_enums_1.VisitStage.VITAL_IN_PROGRESS;
        await this.visitRepo.save(visit);
        const existing = await this.vitalRepo.findOne({ where: { visitId } });
        if (existing) {
            Object.assign(existing, dto);
            return this.vitalRepo.save(existing);
        }
        const created = this.vitalRepo.create({
            visitId,
            ...dto,
        });
        const saved = await this.vitalRepo.save(created);
        visit.currentStage = visit_enums_1.VisitStage.WAITING_FOR_DOCTOR;
        await this.visitRepo.save(visit);
        return saved;
    }
    async getVital(visitId) {
        const vital = await this.vitalRepo.findOne({ where: { visitId } });
        if (!vital)
            throw new common_1.NotFoundException('Vital not found');
        return vital;
    }
};
exports.VitalService = VitalService;
exports.VitalService = VitalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vital_entity_1.Vital)),
    __param(1, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VitalService);
//# sourceMappingURL=vital.service.js.map