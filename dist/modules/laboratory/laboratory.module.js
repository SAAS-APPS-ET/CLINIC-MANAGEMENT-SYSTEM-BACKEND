"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const laboratory_controller_1 = require("./laboratory.controller");
const laboratory_service_1 = require("./laboratory.service");
const lab_item_entity_1 = require("./lab-item.entity");
const lab_request_entity_1 = require("./lab-request.entity");
const lab_report_entity_1 = require("./lab-report.entity");
const visit_entity_1 = require("../visit/visit.entity");
let LaboratoryModule = class LaboratoryModule {
};
exports.LaboratoryModule = LaboratoryModule;
exports.LaboratoryModule = LaboratoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lab_item_entity_1.LabItem, lab_request_entity_1.LabRequest, lab_report_entity_1.LabReport, visit_entity_1.Visit])],
        controllers: [laboratory_controller_1.LaboratoryController],
        providers: [laboratory_service_1.LaboratoryService],
    })
], LaboratoryModule);
//# sourceMappingURL=laboratory.module.js.map