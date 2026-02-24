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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
const visit_entity_1 = require("../visit/visit.entity");
const lab_request_entity_1 = require("../laboratory/lab-request.entity");
const visit_enums_1 = require("../../common/enums/visit.enums");
let PaymentService = class PaymentService {
    paymentRepo;
    visitRepo;
    labRequestRepo;
    constructor(paymentRepo, visitRepo, labRequestRepo) {
        this.paymentRepo = paymentRepo;
        this.visitRepo = visitRepo;
        this.labRequestRepo = labRequestRepo;
    }
    async create(dto) {
        const visit = await this.visitRepo.findOne({ where: { id: dto.visitId } });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        if (visit.status !== visit_enums_1.VisitStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only ACTIVE visits can be paid for');
        }
        const payment = this.paymentRepo.create({
            visitId: dto.visitId,
            amount: dto.amount,
            type: dto.type,
            method: dto.method,
            status: dto.status,
        });
        const saved = await this.paymentRepo.save(payment);
        if (dto.type === 'LAB' && dto.status === 'PAID') {
            const reqs = await this.labRequestRepo.find({
                where: { visitId: dto.visitId },
            });
            for (const r of reqs) {
                r.paymentStatus = 'PAID';
                if ((r.labStatus ?? '').toUpperCase() === 'REQUESTED') {
                    r.labStatus = 'PENDING';
                }
            }
            if (reqs.length)
                await this.labRequestRepo.save(reqs);
            visit.currentStage = visit_enums_1.VisitStage.WAITING_FOR_LAB;
            await this.visitRepo.save(visit);
        }
        if (dto.type === 'PHARMACY' && dto.status === 'PAID') {
            visit.currentStage = visit_enums_1.VisitStage.WAITING_FOR_PHARMACY;
            await this.visitRepo.save(visit);
        }
        return saved;
    }
    async getByVisit(visitId) {
        return this.paymentRepo.find({ where: { visitId }, order: { id: 'DESC' } });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(2, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map