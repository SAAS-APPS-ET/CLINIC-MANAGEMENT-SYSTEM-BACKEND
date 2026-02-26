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
exports.PharmacyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prescription_entity_1 = require("./prescription.entity");
const visit_entity_1 = require("../visit/visit.entity");
const queue_item_entity_1 = require("../queue/queue-item.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
let PharmacyService = class PharmacyService {
    rxRepo;
    visitRepo;
    queueRepo;
    constructor(rxRepo, visitRepo, queueRepo) {
        this.rxRepo = rxRepo;
        this.visitRepo = visitRepo;
        this.queueRepo = queueRepo;
    }
    async queue() {
        return this.queueRepo.find({
            where: { stage: visit_enums_1.VisitStage.WAITING_FOR_PHARMACY },
            order: { position: 'ASC' },
        });
    }
    async dispense(visitId) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be dispensed');
        }
        const rxCount = await this.rxRepo.count({
            where: { visitId, sendToPharmacy: true },
        });
        if (!rxCount) {
            throw new common_1.BadRequestException('No prescription sent to pharmacy for this visit');
        }
        visit.currentStage = visit_enums_1.VisitStage.PHARMACY_IN_PROGRESS;
        await this.visitRepo.save(visit);
        const item = await this.queueRepo.findOne({ where: { visitId } });
        if (item) {
            item.stage = visit_enums_1.VisitStage.PHARMACY_IN_PROGRESS;
            item.updatedAt = new Date();
            await this.queueRepo.save(item);
        }
        visit.currentStage = visit_enums_1.VisitStage.COMPLETED;
        visit.status = visit_enums_1.VisitStatus.COMPLETED;
        visit.completedAt = new Date();
        await this.visitRepo.save(visit);
        if (item) {
            item.stage = visit_enums_1.VisitStage.COMPLETED;
            item.updatedAt = new Date();
            await this.queueRepo.save(item);
        }
        return { visitId, status: 'DISPENSED' };
    }
};
exports.PharmacyService = PharmacyService;
exports.PharmacyService = PharmacyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prescription_entity_1.Prescription)),
    __param(1, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(2, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PharmacyService);
//# sourceMappingURL=pharmacy.service.js.map