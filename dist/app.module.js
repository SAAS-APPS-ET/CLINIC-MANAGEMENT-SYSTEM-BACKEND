"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("./core/config/config.module");
const database_module_1 = require("./core/database/database.module");
const logger_module_1 = require("./core/logger/logger.module");
const auth_module_1 = require("./core/auth/auth.module");
const feature_flag_module_1 = require("./core/feature-flag/feature-flag.module");
const patient_module_1 = require("./modules/patient/patient.module");
const user_module_1 = require("./modules/user/user.module");
const visit_module_1 = require("./modules/visit/visit.module");
const queue_module_1 = require("./modules/queue/queue.module");
const doctor_module_1 = require("./modules/doctor/doctor.module");
const vital_module_1 = require("./modules/vital/vital.module");
const laboratory_module_1 = require("./modules/laboratory/laboratory.module");
const pharmacy_module_1 = require("./modules/pharmacy/pharmacy.module");
const payment_module_1 = require("./modules/payment/payment.module");
const admin_module_1 = require("./modules/admin/admin.module");
const report_module_1 = require("./modules/report/report.module");
const configuration_module_1 = require("./modules/configuration/configuration.module");
const category_module_1 = require("./modules/category/category.module");
const commands_module_1 = require("./commands/commands.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            logger_module_1.LoggerModule,
            database_module_1.DatabaseModule,
            feature_flag_module_1.FeatureFlagModule,
            auth_module_1.AuthModule,
            patient_module_1.PatientModule,
            user_module_1.UserModule,
            visit_module_1.VisitModule,
            queue_module_1.QueueModule,
            doctor_module_1.DoctorModule,
            vital_module_1.VitalModule,
            laboratory_module_1.LaboratoryModule,
            pharmacy_module_1.PharmacyModule,
            payment_module_1.PaymentModule,
            admin_module_1.AdminModule,
            report_module_1.ReportModule,
            configuration_module_1.ConfigurationModule,
            category_module_1.CategoryModule,
            commands_module_1.CommandsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map