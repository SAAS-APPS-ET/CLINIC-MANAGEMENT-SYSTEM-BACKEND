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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportStatusBreakdownQueryDto = exports.ReportDateRangeQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ReportDateRangeQueryDto {
    from;
    to;
    page;
    limit;
}
exports.ReportDateRangeQueryDto = ReportDateRangeQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-02-21T00:00:00.000Z',
        description: 'ISO start datetime (inclusive). Defaults to start of today.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], ReportDateRangeQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-02-22T00:00:00.000Z',
        description: 'ISO end datetime (exclusive). Defaults to start of tomorrow.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], ReportDateRangeQueryDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Pagination page (1-based).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === undefined ? undefined : Number(value))),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReportDateRangeQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50, description: 'Pagination page size.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === undefined ? undefined : Number(value))),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReportDateRangeQueryDto.prototype, "limit", void 0);
class ReportStatusBreakdownQueryDto extends ReportDateRangeQueryDto {
    value;
}
exports.ReportStatusBreakdownQueryDto = ReportStatusBreakdownQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'WAITING_FOR_VITAL',
        description: 'Filter by stage/status string (best-effort).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReportStatusBreakdownQueryDto.prototype, "value", void 0);
//# sourceMappingURL=report.dto.js.map