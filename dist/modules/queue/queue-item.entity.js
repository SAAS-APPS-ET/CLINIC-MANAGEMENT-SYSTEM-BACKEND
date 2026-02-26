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
exports.QueueItem = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const visit_enums_1 = require("../../common/enums/visit.enums");
let QueueItem = class QueueItem {
    id = (0, uuid_1.v4)();
    visitId;
    patientId;
    patientName;
    stage;
    queueStatus;
    position;
    createdAt;
    updatedAt;
};
exports.QueueItem = QueueItem;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], QueueItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QueueItem.prototype, "visitId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QueueItem.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QueueItem.prototype, "patientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_enums_1.VisitStage }),
    __metadata("design:type", String)
], QueueItem.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_enums_1.QueueStatus }),
    __metadata("design:type", String)
], QueueItem.prototype, "queueStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], QueueItem.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QueueItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QueueItem.prototype, "updatedAt", void 0);
exports.QueueItem = QueueItem = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['visitId'], { unique: true })
], QueueItem);
//# sourceMappingURL=queue-item.entity.js.map