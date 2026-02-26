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
exports.CreateLabReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLabReportDto {
    resultText;
    attachmentUrl;
    createdBy;
}
exports.CreateLabReportDto = CreateLabReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hb: 13.5 g/dL; WBC: 6.2 x10^9/L',
        description: 'Result text / interpretation for the lab request.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "resultText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/attachments/lab-123.pdf',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "attachmentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'lab_tech_001',
        description: 'Identifier of the user creating the report.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateLabReportDto.prototype, "createdBy", void 0);
//# sourceMappingURL=laboratory.dto.js.map