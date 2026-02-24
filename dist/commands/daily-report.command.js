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
exports.DailyReportCommand = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const visit_entity_1 = require("../modules/visit/visit.entity");
const payment_entity_1 = require("../modules/payment/payment.entity");
const lab_request_entity_1 = require("../modules/laboratory/lab-request.entity");
const queue_item_entity_1 = require("../modules/queue/queue-item.entity");
const smtp_service_1 = require("../integrations/smtp/smtp.service");
let DailyReportCommand = class DailyReportCommand {
    visitRepo;
    paymentRepo;
    labRequestRepo;
    queueRepo;
    smtp;
    constructor(visitRepo, paymentRepo, labRequestRepo, queueRepo, smtp) {
        this.visitRepo = visitRepo;
        this.paymentRepo = paymentRepo;
        this.labRequestRepo = labRequestRepo;
        this.queueRepo = queueRepo;
        this.smtp = smtp;
    }
    async run(options = {}) {
        const target = options.date ?? new Date();
        const start = new Date(target);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        const visitsCreated = await this.visitRepo
            .createQueryBuilder('v')
            .where('v.createdAt >= :start AND v.createdAt < :end', { start, end })
            .getCount();
        const visitsCompleted = await this.visitRepo
            .createQueryBuilder('v')
            .where('v.completedAt IS NOT NULL')
            .andWhere('v.completedAt >= :start AND v.completedAt < :end', {
            start,
            end,
        })
            .getCount();
        const queueAdded = await this.queueRepo
            .createQueryBuilder('q')
            .where('q.createdAt >= :start AND q.createdAt < :end', { start, end })
            .getCount();
        const paidPayments = await this.paymentRepo
            .createQueryBuilder('p')
            .where('UPPER(p.status) = :paid', { paid: 'PAID' })
            .getMany();
        const paidAmountTotal = paidPayments.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
        const labRequests = await this.labRequestRepo.find();
        const labPaidCount = labRequests.filter((r) => String(r.paymentStatus).toUpperCase() === 'PAID').length;
        const dateLabel = start.toISOString().slice(0, 10);
        const lines = [
            `Daily Report (${dateLabel})`,
            `- Visits created: ${visitsCreated}`,
            `- Visits completed: ${visitsCompleted}`,
            `- Queue items added: ${queueAdded}`,
            `- Payments (PAID) count: ${paidPayments.length}`,
            `- Payments (PAID) total: ${paidAmountTotal}`,
            `- Lab requests (PAID): ${labPaidCount}`,
        ];
        const text = lines.join('\n');
        if (options.emailTo) {
            await this.smtp.sendMail(options.emailTo, `Daily Report ${dateLabel}`, text);
        }
        return { text };
    }
};
exports.DailyReportCommand = DailyReportCommand;
exports.DailyReportCommand = DailyReportCommand = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(2, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __param(3, (0, typeorm_1.InjectRepository)(queue_item_entity_1.QueueItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        smtp_service_1.SmtpService])
], DailyReportCommand);
//# sourceMappingURL=daily-report.command.js.map