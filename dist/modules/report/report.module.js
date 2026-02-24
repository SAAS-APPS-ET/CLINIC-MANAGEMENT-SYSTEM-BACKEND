"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const visit_entity_1 = require("../visit/visit.entity");
const queue_item_entity_1 = require("../queue/queue-item.entity");
const payment_entity_1 = require("../payment/payment.entity");
const lab_request_entity_1 = require("../laboratory/lab-request.entity");
const lab_report_entity_1 = require("../laboratory/lab-report.entity");
const vital_entity_1 = require("../vital/vital.entity");
const doctor_diagnosis_entity_1 = require("../doctor/doctor-diagnosis.entity");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                visit_entity_1.Visit,
                queue_item_entity_1.QueueItem,
                payment_entity_1.Payment,
                lab_request_entity_1.LabRequest,
                lab_report_entity_1.LabReport,
                vital_entity_1.Vital,
                doctor_diagnosis_entity_1.DoctorDiagnosis,
            ]),
        ],
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService],
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map