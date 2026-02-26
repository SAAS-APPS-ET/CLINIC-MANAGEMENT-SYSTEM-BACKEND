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
exports.AdminUpsertClinicConfigDto = exports.AdminUpdateLabItemDto = exports.AdminCreateLabItemDto = exports.AdminCreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AdminCreateUserDto {
    email;
    fullName;
    role;
    password;
}
exports.AdminCreateUserDto = AdminCreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'staff1@clinic.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminCreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Staff One', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminCreateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DOCTOR' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], AdminCreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'P@ssw0rd!',
        description: 'Plain password (will be hashed).',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], AdminCreateUserDto.prototype, "password", void 0);
class AdminCreateLabItemDto {
    name;
    price;
    isActive;
}
exports.AdminCreateLabItemDto = AdminCreateLabItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Blood Count' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], AdminCreateLabItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminCreateLabItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminCreateLabItemDto.prototype, "isActive", void 0);
class AdminUpdateLabItemDto {
    name;
    price;
    isActive;
}
exports.AdminUpdateLabItemDto = AdminUpdateLabItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Blood Count', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], AdminUpdateLabItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminUpdateLabItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateLabItemDto.prototype, "isActive", void 0);
class AdminUpsertClinicConfigDto {
    key;
    value;
    valueType;
    isSecret;
}
exports.AdminUpsertClinicConfigDto = AdminUpsertClinicConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CLINIC_NAME' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], AdminUpsertClinicConfigDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mango Clinic',
        description: 'Stored as string. Caller decides encoding for json (send JSON.stringify(...)).',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpsertClinicConfigDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'string',
        required: false,
        enum: ['string', 'number', 'boolean', 'json'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpsertClinicConfigDto.prototype, "valueType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpsertClinicConfigDto.prototype, "isSecret", void 0);
//# sourceMappingURL=admin.dto.js.map