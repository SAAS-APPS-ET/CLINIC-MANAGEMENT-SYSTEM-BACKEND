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
exports.UpdatePatientDto = exports.CreateChildPatientDto = exports.CreateMainPatientDto = exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const phoneRegex = /^(07|09)\d{8}$/;
class CreatePatientDto {
    fullName;
    phoneNumber;
    dateOfBirth;
    gender;
    customerCardNumber;
    region;
    subCity;
    wereda;
    kebela;
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '07012345678',
        description: '10 digits starting with 07 or 09 (can be duplicated)',
    }),
    (0, class_validator_1.Matches)(phoneRegex, {
        message: 'phoneNumber must be 10 digits starting with 07 or 09',
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-31' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', enum: ['MALE', 'FEMALE'] }),
    (0, class_validator_1.IsIn)(['MALE', 'FEMALE']),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CARD-00001234' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 64),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "customerCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Addis Ababa' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bole' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "subCity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '08' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "wereda", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kebele 12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 40),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "kebela", void 0);
class CreateMainPatientDto extends CreatePatientDto {
}
exports.CreateMainPatientDto = CreateMainPatientDto;
class CreateChildPatientDto {
    fullName;
    dateOfBirth;
    gender;
    customerCardNumber;
    region;
    subCity;
    wereda;
    kebela;
    phoneNumber;
    parentId;
}
exports.CreateChildPatientDto = CreateChildPatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2018-05-14' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FEMALE', enum: ['MALE', 'FEMALE'] }),
    (0, class_validator_1.IsIn)(['MALE', 'FEMALE']),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CARD-00004567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 64),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "customerCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Addis Ababa' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bole' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "subCity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '08' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "wereda", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kebele 12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 40),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "kebela", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '07012345678',
        description: 'Parent phone number (10 digits starting with 07 or 09). Required when parentId is not provided.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(phoneRegex, {
        message: 'phoneNumber must be 10 digits starting with 07 or 09',
    }),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChildPatientDto.prototype, "parentId", void 0);
class UpdatePatientDto {
    fullName;
    phoneNumber;
    dateOfBirth;
    gender;
    customerCardNumber;
    region;
    subCity;
    wereda;
    kebela;
}
exports.UpdatePatientDto = UpdatePatientDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '09012345678',
        description: '10 digits starting with 07 or 09',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(phoneRegex, {
        message: 'phoneNumber must be 10 digits starting with 07 or 09',
    }),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1990-01-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MALE', enum: ['MALE', 'FEMALE'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['MALE', 'FEMALE']),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CARD-00001234' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 64),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "customerCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Addis Ababa' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bole' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 80),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "subCity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '08' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "wereda", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kebele 12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 40),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "kebela", void 0);
//# sourceMappingURL=patient.dto.js.map