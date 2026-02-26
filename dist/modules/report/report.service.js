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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const visit_entity_1 = require("../visit/visit.entity");
const queue_item_entity_1 = require("../queue/queue-item.entity");
const payment_entity_1 = require("../payment/payment.entity");
const lab_request_entity_1 = require("../laboratory/lab-request.entity");
const lab_report_entity_1 = require("../laboratory/lab-report.entity");
const vital_entity_1 = require("../vital/vital.entity");
const doctor_diagnosis_entity_1 = require("../doctor/doctor-diagnosis.entity");
function startOfTodayUtc() {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
}
function addDays(date, days) {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() + days);
    return d;
}
function parseRange(from, to) {
    const defaultFrom = startOfTodayUtc();
    const defaultTo = addDays(defaultFrom, 1);
    const parsedFrom = from ? new Date(from) : defaultFrom;
    const parsedTo = to ? new Date(to) : defaultTo;
    return { from: parsedFrom, to: parsedTo };
}
let ReportService = class ReportService {
    visitRepo;
    queueRepo;
    paymentRepo;
    labRequestRepo;
    labReportRepo;
    vitalRepo;
    diagnosisRepo;
    constructor(visitRepo, queueRepo, paymentRepo, labRequestRepo, labReportRepo, vitalRepo, diagnosisRepo) {
        this.visitRepo = visitRepo;
        this.queueRepo = queueRepo;
        this.paymentRepo = paymentRepo;
        this.labRequestRepo = labRequestRepo;
        this.labReportRepo = labReportRepo;
        this.vitalRepo = vitalRepo;
        this.diagnosisRepo = diagnosisRepo;
    }
    health() {
        return {
            ok: true,
            now: new Date().toISOString(),
            note: 'Report module is up',
        };
    }
    async dailySummary(from, to) {
        const range = parseRange(from, to);
        const visitsCreated = await this.visitRepo
            .createQueryBuilder('v')
            .where('v.createdAt >= :from AND v.createdAt < :to', range)
            .getCount();
        const visitsCompleted = await this.visitRepo
            .createQueryBuilder('v')
            .where('v.completedAt IS NOT NULL')
            .andWhere('v.completedAt >= :from AND v.completedAt < :to', range)
            .getCount();
        const queueAdded = await this.queueRepo
            .createQueryBuilder('q')
            .where('q.createdAt >= :from AND q.createdAt < :to', range)
            .getCount();
        const queueActive = await this.queueRepo
            .createQueryBuilder('q')
            .where('q.queueStatus = :status', { status: 'ACTIVE' })
            .getCount();
        const vitalsRecorded = await this.vitalRepo
            .createQueryBuilder('vt')
            .where('vt.id IS NOT NULL')
            .getCount();
        const diagnosesCount = await this.diagnosisRepo
            .createQueryBuilder('d')
            .where('d.id IS NOT NULL')
            .getCount();
        const labRequestsTotal = await this.labRequestRepo
            .createQueryBuilder('lr')
            .where('lr.id IS NOT NULL')
            .getCount();
        const labReportsTotal = await this.labReportRepo
            .createQueryBuilder('lrep')
            .where('lrep.id IS NOT NULL')
            .getCount();
        const paidPayments = await this.paymentRepo
            .createQueryBuilder('p')
            .where('UPPER(p.status) = :paid', { paid: 'PAID' })
            .getMany();
        const totalRevenuePaid = paidPayments.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
        return {
            range: { from: range.from.toISOString(), to: range.to.toISOString() },
            visitsCreated,
            visitsCompleted,
            queue: { added: queueAdded, activeNow: queueActive },
            vitalsRecordedTotal: vitalsRecorded,
            diagnosesTotal: diagnosesCount,
            lab: { requestsTotal: labRequestsTotal, reportsTotal: labReportsTotal },
            payments: { paidCount: paidPayments.length, paidTotal: totalRevenuePaid },
        };
    }
    async visitsByStage(from, to) {
        const range = parseRange(from, to);
        const rows = await this.visitRepo
            .createQueryBuilder('v')
            .select('v.currentStage', 'stage')
            .addSelect('COUNT(*)', 'count')
            .where('v.createdAt >= :from AND v.createdAt < :to', range)
            .groupBy('v.currentStage')
            .orderBy('count', 'DESC')
            .getRawMany();
        return {
            range: { from: range.from.toISOString(), to: range.to.toISOString() },
            breakdown: rows.map((r) => ({ stage: r.stage, count: Number(r.count) })),
        };
    }
    async visitsByStatus(from, to) {
        const range = parseRange(from, to);
        const rows = await this.visitRepo
            .createQueryBuilder('v')
            .select('v.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .where('v.createdAt >= :from AND v.createdAt < :to', range)
            .groupBy('v.status')
            .orderBy('count', 'DESC')
            .getRawMany();
        return {
            range: { from: range.from.toISOString(), to: range.to.toISOString() },
            breakdown: rows.map((r) => ({
                status: r.status,
                count: Number(r.count),
            })),
        };
    }
    async queueByStage() {
        const rows = await this.queueRepo
            .createQueryBuilder('q')
            .select('q.stage', 'stage')
            .addSelect('COUNT(*)', 'count')
            .where('q.queueStatus = :active', { active: 'ACTIVE' })
            .groupBy('q.stage')
            .orderBy('count', 'DESC')
            .getRawMany();
        return {
            breakdown: rows.map((r) => ({ stage: r.stage, count: Number(r.count) })),
        };
    }
    async paymentsByTypeAndStatus() {
        const rows = await this.paymentRepo
            .createQueryBuilder('p')
            .select('p.type', 'type')
            .addSelect('p.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(p.amount)', 'amount')
            .groupBy('p.type')
            .addGroupBy('p.status')
            .orderBy('count', 'DESC')
            .getRawMany();
        return {
            breakdown: rows.map((r) => ({
                type: r.type,
                status: r.status,
                count: Number(r.count),
                amount: Number(r.amount ?? 0),
            })),
        };
    }
    async labRequestsByStatus() {
        const rows = await this.labRequestRepo
            .createQueryBuilder('lr')
            .select('lr.paymentStatus', 'paymentStatus')
            .addSelect('lr.labStatus', 'labStatus')
            .addSelect('COUNT(*)', 'count')
            .groupBy('lr.paymentStatus')
            .addGroupBy('lr.labStatus')
            .orderBy('count', 'DESC')
            .getRawMany();
        return {
            breakdown: rows.map((r) => ({
                paymentStatus: r.paymentStatus,
                labStatus: r.labStatus,
                count: Number(r.count),
            })),
        };
    }
    async listRecentVisits(page = 1, limit = 50) {
        const take = Math.min(Math.max(limit, 1), 200);
        const skip = (Math.max(page, 1) - 1) * take;
        const [items, total] = await this.visitRepo.findAndCount({
            order: { createdAt: 'DESC' },
            take,
            skip,
        });
        return {
            page: Math.max(page, 1),
            limit: take,
            total,
            items,
        };
    }
    async listQueue(page = 1, limit = 50) {
        const take = Math.min(Math.max(limit, 1), 200);
        const skip = (Math.max(page, 1) - 1) * take;
        const [items, total] = await this.queueRepo.findAndCount({
            order: { position: 'ASC' },
            take,
            skip,
        });
        return {
            page: Math.max(page, 1),
            limit: take,
            total,
            items,
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(1, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(3, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __param(4, (0, typeorm_1.InjectRepository)(lab_report_entity_1.LabReport)),
    __param(5, (0, typeorm_1.InjectRepository)(vital_entity_1.Vital)),
    __param(6, (0, typeorm_1.InjectRepository)(doctor_diagnosis_entity_1.DoctorDiagnosis)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportService);
//# sourceMappingURL=report.service.js.map