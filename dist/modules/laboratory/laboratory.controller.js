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
exports.LaboratoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const laboratory_service_1 = require("./laboratory.service");
const laboratory_dto_1 = require("./laboratory.dto");
let LaboratoryController = class LaboratoryController {
    labService;
    constructor(labService) {
        this.labService = labService;
    }
    listRequests() {
        return this.labService.listRequests();
    }
    createReport(labRequestId, dto) {
        return this.labService.createReport(labRequestId, dto);
    }
};
exports.LaboratoryController = LaboratoryController;
__decorate([
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({
        summary: 'List lab requests',
        description: 'Returns all lab requests (newest first).',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LaboratoryController.prototype, "listRequests", null);
__decorate([
    (0, common_1.Post)(':labRequestId/report'),
    (0, swagger_1.ApiParam)({
        name: 'labRequestId',
        example: 'b290e8a6-3b7c-4f63-8a41-b23f94f7af13',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Create lab report',
        description: 'Creates a report for a PAID lab request and marks it as COMPLETED; also moves the visit stage to BACK_TO_DOCTOR.',
    }),
    __param(0, (0, common_1.Param)('labRequestId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, laboratory_dto_1.CreateLabReportDto]),
    __metadata("design:returntype", void 0)
], LaboratoryController.prototype, "createReport", null);
exports.LaboratoryController = LaboratoryController = __decorate([
    (0, common_1.Controller)('lab'),
    (0, swagger_1.ApiTags)('Laboratory'),
    __metadata("design:paramtypes", [laboratory_service_1.LaboratoryService])
], LaboratoryController);
//# sourceMappingURL=laboratory.controller.js.map