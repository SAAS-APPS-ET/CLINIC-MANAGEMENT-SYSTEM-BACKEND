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
exports.FeatureFlagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enums_1 = require("../../common/enums/role.enums");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const feature_keys_1 = require("./feature-keys");
const feature_flag_service_1 = require("./feature-flag.service");
class SetFeatureFlagDto {
    enabled;
}
__decorate([
    (0, swagger_2.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SetFeatureFlagDto.prototype, "enabled", void 0);
let FeatureFlagController = class FeatureFlagController {
    flags;
    constructor(flags) {
        this.flags = flags;
    }
    async listEnabled() {
        const all = await this.flags.list();
        return all.filter((f) => f.enabled);
    }
    listKeys() {
        return Object.values(feature_keys_1.FeatureKeys);
    }
    async listConfig() {
        const keys = Object.values(feature_keys_1.FeatureKeys);
        const enabledSet = new Set((await this.flags.list()).filter((f) => f.enabled).map((f) => f.key));
        return keys.map((key) => ({ key, enabled: enabledSet.has(key) }));
    }
    enable(key) {
        return this.flags.set(key, true);
    }
    disable(key) {
        return this.flags.set(key, false);
    }
    set(key, dto) {
        return this.flags.set(key, dto.enabled);
    }
};
exports.FeatureFlagController = FeatureFlagController;
__decorate([
    (0, common_1.Get)('enabled'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List enabled feature flags',
        description: 'Public endpoint returning only enabled=true flags.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureFlagController.prototype, "listEnabled", null);
__decorate([
    (0, common_1.Get)('keys'),
    (0, roles_decorator_1.Roles)(role_enums_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'List all feature keys (SUPER_ADMIN only)',
        description: 'Returns the supported feature keys from FeatureKeys.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeatureFlagController.prototype, "listKeys", null);
__decorate([
    (0, common_1.Get)('config'),
    (0, roles_decorator_1.Roles)(role_enums_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'List feature flags configuration (SUPER_ADMIN only)',
        description: 'Returns all supported feature keys with their enabled value.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureFlagController.prototype, "listConfig", null);
__decorate([
    (0, common_1.Patch)(':key/enable'),
    (0, roles_decorator_1.Roles)(role_enums_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Enable feature flag (SUPER_ADMIN only)' }),
    (0, swagger_1.ApiParam)({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeatureFlagController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':key/disable'),
    (0, roles_decorator_1.Roles)(role_enums_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Disable feature flag (SUPER_ADMIN only)' }),
    (0, swagger_1.ApiParam)({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeatureFlagController.prototype, "disable", null);
__decorate([
    (0, common_1.Patch)(':key'),
    (0, roles_decorator_1.Roles)(role_enums_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Set feature flag enabled state (SUPER_ADMIN only)',
    }),
    (0, swagger_1.ApiParam)({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' }),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SetFeatureFlagDto]),
    __metadata("design:returntype", void 0)
], FeatureFlagController.prototype, "set", null);
exports.FeatureFlagController = FeatureFlagController = __decorate([
    (0, common_1.Controller)('feature-flags'),
    (0, swagger_1.ApiTags)('Feature Flags'),
    __metadata("design:paramtypes", [feature_flag_service_1.FeatureFlagService])
], FeatureFlagController);
//# sourceMappingURL=feature-flag.controller.js.map