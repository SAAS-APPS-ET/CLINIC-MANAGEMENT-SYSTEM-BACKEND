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
exports.LaboratoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lab_request_entity_1 = require("./lab-request.entity");
const lab_report_entity_1 = require("./lab-report.entity");
const visit_entity_1 = require("../visit/visit.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
let LaboratoryService = class LaboratoryService {
    labRequestRepo;
    labReportRepo;
    visitRepo;
    constructor(labRequestRepo, labReportRepo, visitRepo) {
        this.labRequestRepo = labRequestRepo;
        this.labReportRepo = labReportRepo;
        this.visitRepo = visitRepo;
    }
    async listRequests() {
        return this.labRequestRepo.find({
            order: { id: 'DESC' },
        });
    }
    async createReport(labRequestId, dto) {
        const req = await this.labRequestRepo.findOne({
            where: { id: labRequestId },
        });
        if (!req)
            throw new common_1.NotFoundException('Lab request not found');
        const visit = await this.visitRepo.findOne({ where: { id: req.visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be processed');
        }
        if ((req.paymentStatus ?? '').toUpperCase() !== 'PAID') {
            throw new common_1.BadRequestException('Lab request must be PAID before reporting');
        }
        visit.currentStage = visit_enums_1.VisitStage.LAB_IN_PROGRESS;
        await this.visitRepo.save(visit);
        const report = this.labReportRepo.create({
            labRequestId,
            resultText: dto.resultText,
            attachmentUrl: dto.attachmentUrl,
            createdBy: dto.createdBy,
        });
        const saved = await this.labReportRepo.save(report);
        req.labStatus = 'COMPLETED';
        await this.labRequestRepo.save(req);
        visit.currentStage = visit_enums_1.VisitStage.WAITING_FOR_DOCTOR_REVIEW;
        await this.visitRepo.save(visit);
        return saved;
    }
};
exports.LaboratoryService = LaboratoryService;
exports.LaboratoryService = LaboratoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(lab_report_entity_1.LabReport)),
    __param(2, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LaboratoryService);
//# sourceMappingURL=laboratory.service.js.map