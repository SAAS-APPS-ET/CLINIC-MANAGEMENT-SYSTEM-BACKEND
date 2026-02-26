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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./patient.entity");
const visit_entity_1 = require("../visit/visit.entity");
const doctor_diagnosis_entity_1 = require("../doctor/doctor-diagnosis.entity");
const vital_entity_1 = require("../vital/vital.entity");
const lab_request_entity_1 = require("../laboratory/lab-request.entity");
const lab_report_entity_1 = require("../laboratory/lab-report.entity");
let PatientService = class PatientService {
    patientRepo;
    visitRepo;
    diagnosisRepo;
    vitalRepo;
    labRequestRepo;
    labReportRepo;
    constructor(patientRepo, visitRepo, diagnosisRepo, vitalRepo, labRequestRepo, labReportRepo) {
        this.patientRepo = patientRepo;
        this.visitRepo = visitRepo;
        this.diagnosisRepo = diagnosisRepo;
        this.vitalRepo = vitalRepo;
        this.labRequestRepo = labRequestRepo;
        this.labReportRepo = labReportRepo;
    }
    async searchByPhone(phone) {
        const trimmed = (phone ?? '').trim();
        if (!/^(07|09)\d{8}$/.test(trimmed)) {
            throw new common_1.BadRequestException('phone must be 10 digits and start with 07 or 09');
        }
        return this.patientRepo.find({
            where: { phoneNumber: trimmed },
            order: { createdAt: 'DESC' },
            take: 20,
        });
    }
    async registerPatient(dto) {
        if (!dto.fullName?.trim()) {
            throw new common_1.BadRequestException('fullName is required');
        }
        const phoneNumber = dto.phoneNumber?.trim();
        if (!phoneNumber) {
            throw new common_1.BadRequestException('phoneNumber is required');
        }
        const patient = this.patientRepo.create({
            fullName: dto.fullName.trim(),
            phoneNumber,
            dateOfBirth: new Date(dto.dateOfBirth),
            gender: dto.gender,
            customerCardNumber: dto.customerCardNumber?.trim(),
            region: dto.region?.trim(),
            subCity: dto.subCity?.trim(),
            wereda: dto.wereda?.trim(),
            kebela: dto.kebela?.trim(),
        });
        return this.patientRepo.save(patient);
    }
    async updatePatient(id, dto) {
        const patient = await this.patientRepo.findOne({ where: { id } });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        if (dto.fullName !== undefined)
            patient.fullName = dto.fullName.trim();
        if (dto.phoneNumber !== undefined)
            patient.phoneNumber = dto.phoneNumber?.trim();
        if (dto.dateOfBirth !== undefined)
            patient.dateOfBirth = new Date(dto.dateOfBirth);
        if (dto.gender !== undefined)
            patient.gender = dto.gender;
        if (dto.customerCardNumber !== undefined)
            patient.customerCardNumber = dto.customerCardNumber?.trim();
        if (dto.region !== undefined)
            patient.region = dto.region?.trim();
        if (dto.subCity !== undefined)
            patient.subCity = dto.subCity?.trim();
        if (dto.wereda !== undefined)
            patient.wereda = dto.wereda?.trim();
        if (dto.kebela !== undefined)
            patient.kebela = dto.kebela?.trim();
        patient.updatedAt = new Date();
        return this.patientRepo.save(patient);
    }
    async getPatientHistory(id) {
        const patient = await this.patientRepo.findOne({ where: { id } });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const visits = await this.visitRepo.find({
            where: { patientId: id },
            order: { createdAt: 'DESC' },
        });
        const visitIds = visits.map((v) => v.id);
        const diagnoses = visitIds.length
            ? await this.diagnosisRepo.find({
                where: visitIds.map((visitId) => ({ visitId })),
                relations: { category: true },
            })
            : [];
        const diagnosesByVisitId = new Map();
        for (const d of diagnoses) {
            const list = diagnosesByVisitId.get(d.visitId) ?? [];
            list.push(d);
            diagnosesByVisitId.set(d.visitId, list);
        }
        return {
            visits: visits.map((v) => ({
                ...v,
                diagnoses: diagnosesByVisitId.get(v.id) ?? [],
            })),
        };
    }
    async getCurrentDetail(patientId, visitId) {
        const pid = (patientId ?? '').trim();
        const vid = (visitId ?? '').trim();
        if (!pid)
            throw new common_1.BadRequestException('patientId is required');
        if (!vid)
            throw new common_1.BadRequestException('visitId is required');
        const patient = await this.patientRepo.findOne({ where: { id: pid } });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const visit = await this.visitRepo.findOne({
            where: { id: vid, patientId: pid },
        });
        if (!visit)
            throw new common_1.NotFoundException('Visit not found');
        const diagnoses = await this.diagnosisRepo.find({
            where: { visitId: vid },
            relations: { category: true },
            order: { id: 'DESC' },
        });
        const vitals = await this.vitalRepo.find({
            where: { visitId: vid },
            order: { id: 'DESC' },
        });
        const labRequests = await this.labRequestRepo.find({
            where: { visitId: vid },
            order: { id: 'DESC' },
        });
        const labRequestIds = labRequests.map((r) => r.id);
        const labReports = labRequestIds.length
            ? await this.labReportRepo.find({
                where: labRequestIds.map((labRequestId) => ({ labRequestId })),
                order: { id: 'DESC' },
            })
            : [];
        return {
            patient,
            visit,
            diagnoses,
            vitals,
            labRequests,
            labReports,
        };
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(1, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_diagnosis_entity_1.DoctorDiagnosis)),
    __param(3, (0, typeorm_1.InjectRepository)(vital_entity_1.Vital)),
    __param(4, (0, typeorm_1.InjectRepository)(lab_request_entity_1.LabRequest)),
    __param(5, (0, typeorm_1.InjectRepository)(lab_report_entity_1.LabReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PatientService);
//# sourceMappingURL=patient.service.js.map