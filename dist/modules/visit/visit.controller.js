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
exports.VisitController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const visit_service_1 = require("./visit.service");
const visit_dto_1 = require("./visit.dto");
let VisitController = class VisitController {
    visits;
    constructor(visits) {
        this.visits = visits;
    }
    create(dto) {
        return this.visits.createVisit(dto);
    }
    getOne(id) {
        return this.visits.getVisit(id);
    }
    complete(id) {
        return this.visits.completeVisit(id);
    }
    updateStage(id, dto) {
        return this.visits.updateCurrentStage(id, dto);
    }
};
exports.VisitController = VisitController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create visit',
        description: 'Creates a new visit for a patient. Default values: status=ACTIVE, queueStatus=ACTIVE, currentStage=WAITING.',
    }),
    (0, swagger_1.ApiBody)({ type: visit_dto_1.CreateVisitDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Visit created.',
        schema: {
            example: {
                success: true,
                data: {
                    id: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
                    patientId: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
                    status: 'ACTIVE',
                    queueStatus: 'ACTIVE',
                    currentStage: 'WAITING',
                    createdAt: '2026-02-21T10:00:00.000Z',
                    completedAt: null,
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [visit_dto_1.CreateVisitDto]),
    __metadata("design:returntype", void 0)
], VisitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get visit', description: 'Fetch a visit by id.' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({
        summary: 'Complete visit',
        description: 'Marks an ACTIVE visit as COMPLETED, sets stage=COMPLETED, and removes from queue.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitController.prototype, "complete", null);
__decorate([
    (0, common_1.Patch)(':id/stage'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update visit stage',
        description: 'Updates visit.currentStage when patient moves between stages. Keeps queue item stage in sync when the visit is queued.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' }),
    (0, swagger_1.ApiBody)({ type: visit_dto_1.UpdateVisitStageDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, visit_dto_1.UpdateVisitStageDto]),
    __metadata("design:returntype", void 0)
], VisitController.prototype, "updateStage", null);
exports.VisitController = VisitController = __decorate([
    (0, common_1.Controller)('visits'),
    (0, swagger_1.ApiTags)('Visits'),
    __metadata("design:paramtypes", [visit_service_1.VisitService])
], VisitController);
//# sourceMappingURL=visit.controller.js.map