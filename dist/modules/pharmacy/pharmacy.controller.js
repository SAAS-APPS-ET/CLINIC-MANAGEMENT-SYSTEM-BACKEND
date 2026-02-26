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
exports.PharmacyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feature_decorator_1 = require("../../core/feature-flag/feature.decorator");
const pharmacy_feature_1 = require("./pharmacy.feature");
const pharmacy_service_1 = require("./pharmacy.service");
let PharmacyController = class PharmacyController {
    pharmacyService;
    constructor(pharmacyService) {
        this.pharmacyService = pharmacyService;
    }
    queue() {
        return this.pharmacyService.queue();
    }
    dispense(visitId) {
        return this.pharmacyService.dispense(visitId);
    }
};
exports.PharmacyController = PharmacyController;
__decorate([
    (0, common_1.Get)('queue'),
    (0, swagger_1.ApiOperation)({
        summary: 'Pharmacy queue',
        description: 'Returns queue items currently waiting for pharmacy. Requires pharmacy module enabled.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "queue", null);
__decorate([
    (0, common_1.Post)(':visitId/dispense'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Dispense',
        description: 'Dispense medication for a visit that has prescriptions sent to pharmacy. Marks visit completed (simplified).',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PharmacyController.prototype, "dispense", null);
exports.PharmacyController = PharmacyController = __decorate([
    (0, common_1.Controller)('pharmacy'),
    (0, swagger_1.ApiTags)('Pharmacy'),
    (0, feature_decorator_1.Feature)(pharmacy_feature_1.PHARMACY_FEATURE_KEY),
    __metadata("design:paramtypes", [pharmacy_service_1.PharmacyService])
], PharmacyController);
//# sourceMappingURL=pharmacy.controller.js.map