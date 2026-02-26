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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("./doctor.service");
const doctor_dto_1 = require("./doctor.dto");
let DoctorController = class DoctorController {
    doctorService;
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    viewQueue() {
        return this.doctorService.viewQueue();
    }
    startVisit(visitId) {
        return this.doctorService.startVisit(visitId);
    }
    writeDiagnosis(visitId, dto, req) {
        return this.doctorService.writeDiagnosis(visitId, dto, req.user);
    }
    writePrescription(visitId, dto) {
        return this.doctorService.writePrescription(visitId, dto);
    }
    requestLab(visitId, dto) {
        return this.doctorService.requestLab(visitId, dto);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)('queue'),
    (0, swagger_1.ApiOperation)({
        summary: 'View queue',
        description: 'Returns the current visit queue ordered by position.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "viewQueue", null);
__decorate([
    (0, common_1.Post)(':visitId/start'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Start visit',
        description: 'Moves a queued ACTIVE visit into DOCTOR stage.',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "startVisit", null);
__decorate([
    (0, common_1.Post)(':visitId/diagnosis'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Write diagnosis',
        description: 'Creates a DoctorDiagnosis entry for a visit.',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.WriteDiagnosisDto, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "writeDiagnosis", null);
__decorate([
    (0, common_1.Post)(':visitId/prescription'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Write prescription',
        description: 'Stores prescription lines on the visit record (temporary design).',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.WritePrescriptionDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "writePrescription", null);
__decorate([
    (0, common_1.Post)(':visitId/request-lab'),
    (0, swagger_1.ApiParam)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Request lab',
        description: 'Creates a LabRequest and moves the visit stage to LAB.',
    }),
    __param(0, (0, common_1.Param)('visitId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.RequestLabDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "requestLab", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    (0, swagger_1.ApiTags)('Doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map