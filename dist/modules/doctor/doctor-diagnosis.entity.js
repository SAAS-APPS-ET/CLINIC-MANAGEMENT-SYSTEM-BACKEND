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
exports.DoctorDiagnosis = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const category_entity_1 = require("../category/category.entity");
let DoctorDiagnosis = class DoctorDiagnosis {
    id = (0, uuid_1.v4)();
    visitId;
    categoryId;
    category;
    diagnosisText;
    notes;
    createdBy;
};
exports.DoctorDiagnosis = DoctorDiagnosis;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "visitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", category_entity_1.Category)
], DoctorDiagnosis.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "diagnosisText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorDiagnosis.prototype, "createdBy", void 0);
exports.DoctorDiagnosis = DoctorDiagnosis = __decorate([
    (0, typeorm_1.Entity)()
], DoctorDiagnosis);
//# sourceMappingURL=doctor-diagnosis.entity.js.map