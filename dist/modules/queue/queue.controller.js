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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const queue_service_1 = require("./queue.service");
const queue_dto_1 = require("./queue.dto");
let QueueController = class QueueController {
    queue;
    constructor(queue) {
        this.queue = queue;
    }
    list() {
        return this.queue.listQueueResponse();
    }
    pause(visitId) {
        return this.queue.pause(visitId);
    }
    resume(visitId) {
        return this.queue.resume(visitId);
    }
    remove(visitId) {
        return this.queue.remove(visitId);
    }
    reorder(dto) {
        return this.queue.reorder(dto.visitIds);
    }
};
exports.QueueController = QueueController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get queue',
        description: 'Returns queued visits ordered by position.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: queue_dto_1.QueueItemResponseDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':visitId/pause'),
    (0, swagger_1.ApiOperation)({
        summary: 'Pause visit in queue',
        description: 'Paused visits should not be visible to doctors.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "pause", null);
__decorate([
    (0, common_1.Patch)(':visitId/resume'),
    (0, swagger_1.ApiOperation)({ summary: 'Resume visit in queue' }),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "resume", null);
__decorate([
    (0, common_1.Patch)(':visitId/remove'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove visit from queue' }),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reorder queue',
        description: 'Provide visitIds list in the desired order.',
    }),
    (0, swagger_1.ApiBody)({ type: queue_dto_1.ReorderQueueDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Updated queue items with new positions.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queue_dto_1.ReorderQueueDto]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "reorder", null);
exports.QueueController = QueueController = __decorate([
    (0, common_1.Controller)('queue'),
    (0, swagger_1.ApiTags)('Queue'),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
//# sourceMappingURL=queue.controller.js.map