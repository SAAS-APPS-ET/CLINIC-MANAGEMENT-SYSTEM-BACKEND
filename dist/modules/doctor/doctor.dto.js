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
exports.LabReportAttachmentDto = exports.ContinueVisitDto = exports.RequestLabDto = exports.WritePrescriptionDto = exports.WriteDiagnosisDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class WriteDiagnosisDto {
    categoryId;
    diagnosisText;
    notes;
}
exports.WriteDiagnosisDto = WriteDiagnosisDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '8a8f5ac9-5d35-4f33-95fc-8fcb8c1e63d4',
        required: false,
        description: 'HMIS category reference (Category.id).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WriteDiagnosisDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Malaria',
        description: 'Doctor diagnosis (primary).',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], WriteDiagnosisDto.prototype, "diagnosisText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Patient looks dehydrated; advised oral fluids.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WriteDiagnosisDto.prototype, "notes", void 0);
class WritePrescriptionDto {
    lines;
    createdBy;
}
exports.WritePrescriptionDto = WritePrescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            'Paracetamol 500mg - 1 tab tds x 3 days',
            'ORS - after each stool',
        ],
        description: 'Free-text prescription lines.',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], WritePrescriptionDto.prototype, "lines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'doctor_123',
        description: 'Identifier of the clinician recording the prescription.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], WritePrescriptionDto.prototype, "createdBy", void 0);
class RequestLabDto {
    labItemId;
    createdBy;
}
exports.RequestLabDto = RequestLabDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a3f67507-6d8c-4b0a-bf58-8f9f2a2660e4',
        description: 'Lab item to request (LabItem.id).',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestLabDto.prototype, "labItemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'doctor_123',
        description: 'Identifier of the clinician requesting the lab.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], RequestLabDto.prototype, "createdBy", void 0);
class ContinueVisitDto {
    nextStage;
    createdBy;
}
exports.ContinueVisitDto = ContinueVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DOCTOR',
        required: false,
        description: 'Optional hint; currently unused but reserved for future workflow branching.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContinueVisitDto.prototype, "nextStage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'doctor_123',
        required: false,
        description: 'Identifier of the clinician continuing the visit.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContinueVisitDto.prototype, "createdBy", void 0);
class LabReportAttachmentDto {
    attachmentUrl;
}
exports.LabReportAttachmentDto = LabReportAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/report.pdf',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], LabReportAttachmentDto.prototype, "attachmentUrl", void 0);
//# sourceMappingURL=doctor.dto.js.map