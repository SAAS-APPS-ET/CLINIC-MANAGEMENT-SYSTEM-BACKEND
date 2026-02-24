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
exports.ReorderQueueDto = exports.QueueItemResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const visit_enums_1 = require("../../common/enums/visit.enums");
class QueueItemResponseDto {
    id;
    visitId;
    patientId;
    patientName;
    stage;
    mainQueue;
    queueStatus;
    position;
    createdAt;
    updatedAt;
}
exports.QueueItemResponseDto = QueueItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c0d8ea9a-7a55-4c5a-b343-0d2c32b2a3d6' }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "visitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'e9f4f9fd-6405-4b69-8e7b-4a65c2db1e1c' }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "patientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: visit_enums_1.VisitStage, example: visit_enums_1.VisitStage.WAITING_FOR_DOCTOR }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "stage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'High-level queue category derived from stage.',
        example: 'Doctor',
    }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "mainQueue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: visit_enums_1.QueueStatus, example: visit_enums_1.QueueStatus.ACTIVE }),
    __metadata("design:type", String)
], QueueItemResponseDto.prototype, "queueStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], QueueItemResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-22T10:55:41.645Z' }),
    __metadata("design:type", Date)
], QueueItemResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-22T10:55:41.645Z' }),
    __metadata("design:type", Date)
], QueueItemResponseDto.prototype, "updatedAt", void 0);
class ReorderQueueDto {
    visitIds;
}
exports.ReorderQueueDto = ReorderQueueDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of visitIds in the desired order (first = position 1).',
        example: [
            'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
            'f0f1d2d3-1111-4a4a-9b9b-222222222222',
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], ReorderQueueDto.prototype, "visitIds", void 0);
//# sourceMappingURL=queue.dto.js.map