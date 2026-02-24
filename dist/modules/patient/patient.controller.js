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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_service_1 = require("./patient.service");
const patient_dto_1 = require("./patient.dto");
let PatientController = class PatientController {
    patientService;
    constructor(patientService) {
        this.patientService = patientService;
    }
    searchByPhone(phone) {
        return this.patientService.searchByPhone(phone);
    }
    register(dto) {
        return this.patientService.registerPatient(dto);
    }
    updatePatient(id, dto) {
        return this.patientService.updatePatient(id, dto);
    }
    getPatientHistory(id) {
        return this.patientService.getPatientHistory(id);
    }
    getCurrentDetail(patientId, visitId) {
        return this.patientService.getCurrentDetail(patientId, visitId);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search patients by phone',
        description: 'Performs a case-insensitive search by phone substring and returns up to 20 matches.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'phone',
        example: '07012345678',
        description: 'Phone number (10 digits) starting with 07 or 09.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Array of matching patients (max 20).',
        schema: {
            example: {
                success: true,
                data: [
                    {
                        id: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
                        fullName: 'John Doe',
                        phone: '+2348012345678',
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "searchByPhone", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Register patient',
        description: 'Creates a new patient record. Phone number is required and may be duplicated.',
    }),
    (0, swagger_1.ApiBody)({ type: patient_dto_1.CreatePatientDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "register", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update patient',
        description: 'Partially updates a patient record by id.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' }),
    (0, swagger_1.ApiBody)({ type: patient_dto_1.UpdatePatientDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "updatePatient", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get patient history',
        description: 'Returns a patient and related history aggregates (placeholder arrays for now).',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "getPatientHistory", null);
__decorate([
    (0, common_1.Get)('current/detail'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current patient detail',
        description: 'Returns patient info plus a specific visit with diagnosis, vitals, and lab report.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'patientId',
        example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'visitId',
        example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
        required: true,
    }),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('visitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "getCurrentDetail", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.Controller)('patients'),
    (0, swagger_1.ApiTags)('Patients'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map