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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enums_1 = require("../../common/enums/role.enums");
const visit_enums_1 = require("../../common/enums/visit.enums");
const feature_flag_service_1 = require("../../core/feature-flag/feature-flag.service");
const feature_keys_1 = require("../../core/feature-flag/feature-keys");
let ConfigurationController = class ConfigurationController {
    featureFlags;
    constructor(featureFlags) {
        this.featureFlags = featureFlags;
    }
    async listRoles() {
        const enabledMap = new Map();
        const requiredFeatureByRole = {
            [role_enums_1.Role.RECEPTIONIST]: feature_keys_1.FeatureKeys.ENABLE_RECEPTION_MODULE,
            [role_enums_1.Role.DOCTOR]: feature_keys_1.FeatureKeys.ENABLE_DOCTOR_MODULE,
            [role_enums_1.Role.VITAL_TECH]: feature_keys_1.FeatureKeys.ENABLE_VITAL_MODULE,
            [role_enums_1.Role.LAB_TECH]: feature_keys_1.FeatureKeys.ENABLE_LAB_MODULE,
            [role_enums_1.Role.PHARMACIST]: feature_keys_1.FeatureKeys.ENABLE_PHARMACY_MODULE,
        };
        const roles = Object.values(role_enums_1.Role).filter((role) => role !== role_enums_1.Role.SUPER_ADMIN);
        const allowed = [];
        for (const role of roles) {
            if (role === role_enums_1.Role.ADMIN) {
                allowed.push(role);
                continue;
            }
            const requiredFeature = requiredFeatureByRole[role];
            if (!requiredFeature)
                continue;
            const cached = enabledMap.get(requiredFeature);
            const enabled = cached ?? (await this.featureFlags.isEnabled(requiredFeature));
            enabledMap.set(requiredFeature, enabled);
            if (enabled)
                allowed.push(role);
        }
        return allowed;
    }
    async listFeatureFlags() {
        const result = {};
        const keys = Object.values(feature_keys_1.FeatureKeys);
        for (const key of keys) {
            result[key] = await this.featureFlags.isEnabled(key);
        }
        return result;
    }
    async listVisitStageCategories() {
        const enabledByKey = await this.listFeatureFlags();
        const result = [];
        if (enabledByKey[feature_keys_1.FeatureKeys.ENABLE_RECEPTION_MODULE]) {
            result.push({
                key: 'Waiting',
                stages: [visit_enums_1.VisitStage.WAITING],
            });
        }
        if (enabledByKey[feature_keys_1.FeatureKeys.ENABLE_VITAL_MODULE]) {
            result.push({
                key: 'Vitals',
                stages: [visit_enums_1.VisitStage.WAITING_FOR_VITAL, visit_enums_1.VisitStage.VITAL_IN_PROGRESS],
            });
        }
        if (enabledByKey[feature_keys_1.FeatureKeys.ENABLE_DOCTOR_MODULE]) {
            result.push({
                key: 'Doctor',
                stages: [
                    visit_enums_1.VisitStage.WAITING_FOR_DOCTOR,
                    visit_enums_1.VisitStage.DOCTOR_IN_PROGRESS,
                    visit_enums_1.VisitStage.WAITING_FOR_DOCTOR_REVIEW,
                    visit_enums_1.VisitStage.DOCTOR_REVIEW_IN_PROGRESS,
                ],
            });
        }
        if (enabledByKey[feature_keys_1.FeatureKeys.ENABLE_LAB_MODULE]) {
            result.push({
                key: 'Labratory',
                stages: [
                    visit_enums_1.VisitStage.WAITING_FOR_LAB,
                    visit_enums_1.VisitStage.LAB_IN_PROGRESS,
                    visit_enums_1.VisitStage.WAITING_FOR_LAB_REPORT,
                ],
            });
        }
        if (enabledByKey[feature_keys_1.FeatureKeys.ENABLE_PHARMACY_MODULE]) {
            result.push({
                key: 'Pharmacy',
                stages: [
                    visit_enums_1.VisitStage.WAITING_FOR_PHARMACY,
                    visit_enums_1.VisitStage.PHARMACY_IN_PROGRESS,
                ],
            });
        }
        return result;
    }
};
exports.ConfigurationController = ConfigurationController;
__decorate([
    (0, common_1.Get)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'List available roles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigurationController.prototype, "listRoles", null);
__decorate([
    (0, common_1.Get)('feature-flags'),
    (0, swagger_1.ApiOperation)({
        summary: 'List feature flags configuration',
        description: 'Returns all supported feature keys and their enabled/disabled value.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigurationController.prototype, "listFeatureFlags", null);
__decorate([
    (0, common_1.Get)('visit-stages'),
    (0, swagger_1.ApiOperation)({
        summary: 'List visit stages categories',
        description: 'Returns visit stage categories based on enabled feature flags.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigurationController.prototype, "listVisitStageCategories", null);
exports.ConfigurationController = ConfigurationController = __decorate([
    (0, common_1.Controller)('configuration'),
    (0, swagger_1.ApiTags)('Configuration'),
    __metadata("design:paramtypes", [feature_flag_service_1.FeatureFlagService])
], ConfigurationController);
//# sourceMappingURL=configuration.controller.js.map