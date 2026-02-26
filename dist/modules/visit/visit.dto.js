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
exports.UpdateVisitStageDto = exports.CompleteVisitDto = exports.CreateVisitDto = void 0;
const visit_enums_1 = require("../../common/enums/visit.enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVisitDto {
    patientId;
    status;
    queueStatus;
    currentStage;
}
exports.CreateVisitDto = CreateVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
        description: 'Patient id to create the visit for.',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: visit_enums_1.VisitStatus,
        example: visit_enums_1.VisitStatus.ACTIVE,
        description: 'Visit status. Defaults to ACTIVE.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(visit_enums_1.VisitStatus),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: visit_enums_1.QueueStatus,
        example: visit_enums_1.QueueStatus.ACTIVE,
        description: 'Queue status. Defaults to ACTIVE.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(visit_enums_1.QueueStatus),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "queueStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: visit_enums_1.VisitStage,
        example: visit_enums_1.VisitStage.WAITING,
        description: 'Current stage. Defaults to WAITING.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(visit_enums_1.VisitStage),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "currentStage", void 0);
class CompleteVisitDto {
    completedAt;
}
exports.CompleteVisitDto = CompleteVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-02-21T12:00:00.000Z',
        description: 'Timestamp when the visit was completed. Defaults to now when omitted by the server logic.',
    }),
    __metadata("design:type", Date)
], CompleteVisitDto.prototype, "completedAt", void 0);
class UpdateVisitStageDto {
    currentStage;
}
exports.UpdateVisitStageDto = UpdateVisitStageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: visit_enums_1.VisitStage,
        example: visit_enums_1.VisitStage.WAITING_FOR_DOCTOR,
        description: 'New currentStage value for the visit.',
    }),
    (0, class_validator_1.IsEnum)(visit_enums_1.VisitStage),
    __metadata("design:type", String)
], UpdateVisitStageDto.prototype, "currentStage", void 0);
//# sourceMappingURL=visit.dto.js.map