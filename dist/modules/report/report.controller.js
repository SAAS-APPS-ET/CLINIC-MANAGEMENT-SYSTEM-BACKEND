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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_service_1 = require("./report.service");
const report_dto_1 = require("./report.dto");
let ReportController = class ReportController {
    reportService;
    constructor(reportService) {
        this.reportService = reportService;
    }
    health() {
        return this.reportService.health();
    }
    daily(q) {
        return this.reportService.dailySummary(q.from, q.to);
    }
    visitsByStage(q) {
        return this.reportService.visitsByStage(q.from, q.to);
    }
    visitsByStatus(q) {
        return this.reportService.visitsByStatus(q.from, q.to);
    }
    recentVisits(q) {
        return this.reportService.listRecentVisits(q.page, q.limit);
    }
    queueByStage() {
        return this.reportService.queueByStage();
    }
    queueList(q) {
        return this.reportService.listQueue(q.page, q.limit);
    }
    paymentsByTypeStatus() {
        return this.reportService.paymentsByTypeAndStatus();
    }
    labRequestsByStatus() {
        return this.reportService.labRequestsByStatus();
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Report module health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "health", null);
__decorate([
    (0, common_1.Get)('daily'),
    (0, swagger_1.ApiOperation)({
        summary: 'Daily summary report',
        description: 'High-level KPIs for the chosen date range (defaults to today UTC).',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "daily", null);
__decorate([
    (0, common_1.Get)('visits/by-stage'),
    (0, swagger_1.ApiOperation)({ summary: 'Visits breakdown by stage (range)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "visitsByStage", null);
__decorate([
    (0, common_1.Get)('visits/by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Visits breakdown by status (range)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "visitsByStatus", null);
__decorate([
    (0, common_1.Get)('visits/recent'),
    (0, swagger_1.ApiOperation)({ summary: 'Recent visits (paged)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "recentVisits", null);
__decorate([
    (0, common_1.Get)('queue/by-stage'),
    (0, swagger_1.ApiOperation)({ summary: 'Active queue breakdown by stage' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "queueByStage", null);
__decorate([
    (0, common_1.Get)('queue/list'),
    (0, swagger_1.ApiOperation)({ summary: 'Queue list (paged)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "queueList", null);
__decorate([
    (0, common_1.Get)('payments/by-type-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Payments breakdown by type and status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "paymentsByTypeStatus", null);
__decorate([
    (0, common_1.Get)('lab/requests/by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Lab requests breakdown by payment and lab status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "labRequestsByStatus", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, swagger_1.ApiTags)('Report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map