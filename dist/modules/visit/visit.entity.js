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
exports.Visit = void 0;
const typeorm_1 = require("typeorm");
const visit_enums_1 = require("../../common/enums/visit.enums");
let Visit = class Visit {
    id;
    patientId;
    status;
    queueStatus;
    currentStage;
    createdAt;
    completedAt;
    prescriptionText;
    prescriptionCreatedBy;
};
exports.Visit = Visit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Visit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Visit.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_enums_1.VisitStatus }),
    __metadata("design:type", String)
], Visit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_enums_1.QueueStatus }),
    __metadata("design:type", String)
], Visit.prototype, "queueStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_enums_1.VisitStage }),
    __metadata("design:type", String)
], Visit.prototype, "currentStage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Visit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Visit.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Visit.prototype, "prescriptionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Visit.prototype, "prescriptionCreatedBy", void 0);
exports.Visit = Visit = __decorate([
    (0, typeorm_1.Entity)()
], Visit);
//# sourceMappingURL=visit.entity.js.map