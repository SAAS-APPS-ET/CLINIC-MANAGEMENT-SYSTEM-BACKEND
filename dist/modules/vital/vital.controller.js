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
exports.VitalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feature_decorator_1 = require("../../core/feature-flag/feature.decorator");
const vital_feature_1 = require("./vital.feature");
const vital_service_1 = require("./vital.service");
const vital_dto_1 = require("./vital.dto");
let VitalController = class VitalController {
    vitalService;
    constructor(vitalService) {
        this.vitalService = vitalService;
    }
    record(visitId, dto) {
        return this.vitalService.recordVital(visitId, dto);
    }
    get(visitId) {
        return this.vitalService.getVital(visitId);
    }
};
exports.VitalController = VitalController;
__decorate([
    (0, common_1.Post)(':visitId'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Record vitals',
        description: 'Creates or updates vitals for a visit. Requires VITALS feature flag enabled.',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vital_dto_1.CreateVitalDto]),
    __metadata("design:returntype", void 0)
], VitalController.prototype, "record", null);
__decorate([
    (0, common_1.Get)(':visitId'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get vitals',
        description: 'Fetches recorded vitals for a visit.',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VitalController.prototype, "get", null);
exports.VitalController = VitalController = __decorate([
    (0, common_1.Controller)('vitals'),
    (0, swagger_1.ApiTags)('Vitals'),
    (0, feature_decorator_1.Feature)(vital_feature_1.VITAL_FEATURE_KEY),
    __metadata("design:paramtypes", [vital_service_1.VitalService])
], VitalController);
//# sourceMappingURL=vital.controller.js.map