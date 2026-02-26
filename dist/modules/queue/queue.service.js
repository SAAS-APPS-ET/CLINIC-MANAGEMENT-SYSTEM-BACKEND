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
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const queue_item_entity_1 = require("./queue-item.entity");
const visit_entity_1 = require("../visit/visit.entity");
const patient_entity_1 = require("../patient/patient.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
function getMainQueue(stage) {
    switch (stage) {
        case visit_enums_1.VisitStage.WAITING:
            return 'Waiting';
        case visit_enums_1.VisitStage.WAITING_FOR_VITAL:
        case visit_enums_1.VisitStage.VITAL_IN_PROGRESS:
            return 'Vitals';
        case visit_enums_1.VisitStage.WAITING_FOR_DOCTOR:
        case visit_enums_1.VisitStage.DOCTOR_IN_PROGRESS:
        case visit_enums_1.VisitStage.WAITING_FOR_DOCTOR_REVIEW:
        case visit_enums_1.VisitStage.DOCTOR_REVIEW_IN_PROGRESS:
            return 'Doctor';
        case visit_enums_1.VisitStage.WAITING_FOR_LAB:
        case visit_enums_1.VisitStage.LAB_IN_PROGRESS:
        case visit_enums_1.VisitStage.WAITING_FOR_LAB_REPORT:
            return 'Labratory';
        case visit_enums_1.VisitStage.WAITING_FOR_PHARMACY:
        case visit_enums_1.VisitStage.PHARMACY_IN_PROGRESS:
            return 'Pharmacy';
        default:
            return 'Other';
    }
}
function toQueueItemResponse(item) {
    return {
        id: item.id,
        visitId: item.visitId,
        patientId: item.patientId,
        patientName: item.patientName,
        stage: item.stage,
        mainQueue: getMainQueue(item.stage),
        queueStatus: item.queueStatus,
        position: item.position,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
}
let QueueService = class QueueService {
    queueRepo;
    visitRepo;
    patientRepo;
    constructor(queueRepo, visitRepo, patientRepo) {
        this.queueRepo = queueRepo;
        this.visitRepo = visitRepo;
        this.patientRepo = patientRepo;
    }
    async addVisitToQueue(visitId) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be queued');
        }
        const patient = await this.patientRepo.findOne({
            where: { id: visit.patientId },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const existing = await this.queueRepo.findOne({ where: { visitId } });
        if (existing)
            return existing;
        const last = await this.queueRepo.find({
            order: { position: 'DESC' },
            take: 1,
        });
        const nextPos = last.length ? last[0].position + 1 : 1;
        const item = this.queueRepo.create({
            visitId: visit.id,
            patientId: patient.id,
            patientName: patient.fullName,
            stage: visit.currentStage ?? visit_enums_1.VisitStage.WAITING_FOR_VITAL,
            queueStatus: visit.queueStatus,
            position: nextPos,
            updatedAt: new Date(),
        });
        return this.queueRepo.save(item);
    }
    async listQueue() {
        const items = await this.queueRepo.find({
            order: { position: 'ASC' },
        });
        return items;
    }
    async listQueueResponse() {
        const items = await this.queueRepo.find({
            order: { position: 'ASC' },
        });
        return items.map(toQueueItemResponse);
    }
    async pause(visitId) {
        const item = await this.queueRepo.findOne({ where: { visitId } });
        if (!item)
            throw new common_1.NotFoundException('Queue item not found');
        item.queueStatus = visit_enums_1.QueueStatus.PAUSED;
        item.updatedAt = new Date();
        await this.visitRepo.update({ id: visitId }, { queueStatus: visit_enums_1.QueueStatus.PAUSED });
        return this.queueRepo.save(item);
    }
    async resume(visitId) {
        const item = await this.queueRepo.findOne({ where: { visitId } });
        if (!item)
            throw new common_1.NotFoundException('Queue item not found');
        item.queueStatus = visit_enums_1.QueueStatus.ACTIVE;
        item.updatedAt = new Date();
        await this.visitRepo.update({ id: visitId }, { queueStatus: visit_enums_1.QueueStatus.ACTIVE });
        return this.queueRepo.save(item);
    }
    async remove(visitId) {
        const item = await this.queueRepo.findOne({ where: { visitId } });
        if (!item)
            throw new common_1.NotFoundException('Queue item not found');
        item.queueStatus = visit_enums_1.QueueStatus.REMOVED;
        item.updatedAt = new Date();
        await this.visitRepo.update({ id: visitId }, { queueStatus: visit_enums_1.QueueStatus.REMOVED });
        return this.queueRepo.save(item);
    }
    async reorder(visitIds) {
        if (!visitIds.length)
            throw new common_1.BadRequestException('visitIds required');
        const items = await this.queueRepo.find({
            where: { visitId: (0, typeorm_2.In)(visitIds) },
        });
        if (items.length !== visitIds.length) {
            throw new common_1.BadRequestException('Some visitIds are not in queue');
        }
        const byVisit = new Map(items.map((i) => [i.visitId, i]));
        for (let idx = 0; idx < visitIds.length; idx += 1) {
            const item = byVisit.get(visitIds[idx]);
            if (!item)
                continue;
            item.position = idx + 1;
            item.updatedAt = new Date();
        }
        return this.queueRepo.save(Array.from(byVisit.values()));
    }
    async updateStageIfQueued(visitId, stage) {
        const item = await this.queueRepo.findOne({ where: { visitId } });
        if (!item)
            return;
        item.stage = stage;
        item.updatedAt = new Date();
        await this.queueRepo.save(item);
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __param(1, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(2, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QueueService);
//# sourceMappingURL=queue.service.js.map