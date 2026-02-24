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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_diagnosis_entity_1 = require("./doctor-diagnosis.entity");
const visit_entity_1 = require("../visit/visit.entity");
const queue_item_entity_1 = require("../queue/queue-item.entity");
const lab_request_entity_1 = require("../laboratory/lab-request.entity");
const category_entity_1 = require("../category/category.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
let DoctorService = class DoctorService {
    visitRepo;
    queueRepo;
    diagnosisRepo;
    labRequestRepo;
    categoryRepo;
    constructor(visitRepo, queueRepo, diagnosisRepo, labRequestRepo, categoryRepo) {
        this.visitRepo = visitRepo;
        this.queueRepo = queueRepo;
        this.diagnosisRepo = diagnosisRepo;
        this.labRequestRepo = labRequestRepo;
        this.categoryRepo = categoryRepo;
    }
    async viewQueue() {
        return this.queueRepo.find({
            order: { position: 'ASC' },
        });
    }
    async startVisit(visitId) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be started');
        }
        const queueItem = await this.queueRepo.findOne({ where: { visitId } });
        if (!queueItem)
            throw new common_1.BadRequestException('Visit is not in queue');
        if (queueItem.queueStatus !== visit_enums_1.QueueStatus.ACTIVE) {
            throw new common_1.BadRequestException('Queue item is not ACTIVE');
        }
        visit.currentStage = visit_enums_1.VisitStage.DOCTOR_IN_PROGRESS;
        await this.visitRepo.save(visit);
        queueItem.stage = visit_enums_1.VisitStage.DOCTOR_IN_PROGRESS;
        queueItem.updatedAt = new Date();
        await this.queueRepo.save(queueItem);
        return visit;
    }
    async writeDiagnosis(visitId, dto, user) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be diagnosed');
        }
        const createdBy = this.getCreatedByFromUser(user);
        if (dto.categoryId) {
            const category = await this.categoryRepo.findOne({
                where: { id: dto.categoryId },
            });
            if (!category)
                throw new common_1.BadRequestException('Invalid categoryId');
        }
        const diagnosis = this.diagnosisRepo.create({
            visitId,
            categoryId: dto.categoryId,
            diagnosisText: dto.diagnosisText,
            notes: dto.notes,
            createdBy,
        });
        return this.diagnosisRepo.save(diagnosis);
    }
    getCreatedByFromUser(user) {
        if (!user || typeof user !== 'object') {
            throw new common_1.BadRequestException('Missing authenticated user');
        }
        const record = user;
        const email = record.email;
        if (typeof email === 'string' && email.trim())
            return email.trim();
        const sub = record.sub;
        if (typeof sub === 'string' && sub.trim())
            return sub.trim();
        throw new common_1.BadRequestException('Invalid authenticated user payload');
    }
    async writePrescription(visitId, dto) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be prescribed');
        }
        visit.prescriptionText = dto.lines.join('\n');
        visit.prescriptionCreatedBy = dto.createdBy;
        return this.visitRepo.save(visit);
    }
    async requestLab(visitId, dto) {
        const visit = await this.visitRepo.findOne({ where: { id: visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can request lab');
        }
        const req = this.labRequestRepo.create({
            visitId,
            labItemId: dto.labItemId,
            paymentStatus: 'UNPAID',
            labStatus: 'REQUESTED',
        });
        const saved = await this.labRequestRepo.save(req);
        visit.currentStage = visit_enums_1.VisitStage.WAITING_FOR_LAB;
        await this.visitRepo.save(visit);
        const queueItem = await this.queueRepo.findOne({ where: { visitId } });
        if (queueItem) {
            queueItem.stage = visit_enums_1.VisitStage.WAITING_FOR_LAB;
            queueItem.updatedAt = new Date();
            await this.queueRepo.save(queueItem);
        }
        return saved;
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(1, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_diagnosis_entity_1.DoctorDiagnosis)),
    __param(3, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __param(4, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map