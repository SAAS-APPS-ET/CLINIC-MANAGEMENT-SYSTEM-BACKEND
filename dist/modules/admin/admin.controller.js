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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    createUser(dto) {
        return this.adminService.createUser(dto);
    }
    listUsers() {
        return this.adminService.listUsers();
    }
    createLabItem(dto) {
        return this.adminService.createLabItem(dto);
    }
    listLabItems() {
        return this.adminService.listLabItems();
    }
    updateLabItem(id, dto) {
        return this.adminService.updateLabItem(id, dto);
    }
    listClinicConfig() {
        return this.adminService.listClinicConfig();
    }
    upsertClinicConfig(dto) {
        return this.adminService.upsertClinicConfig(dto);
    }
    deleteClinicConfig(key) {
        return this.adminService.deleteClinicConfig(key);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('users'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create clinic user',
        description: 'Creates a staff user for this clinic (admin scope).',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminCreateUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({
        summary: 'List clinic users',
        description: 'Lists staff users for this clinic (admin scope).',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Post)('lab-items'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create lab item',
        description: 'Creates a lab test/item that can be requested.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminCreateLabItemDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createLabItem", null);
__decorate([
    (0, common_1.Get)('lab-items'),
    (0, swagger_1.ApiOperation)({
        summary: 'List lab items',
        description: 'Lists all lab tests/items (admin scope).',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listLabItems", null);
__decorate([
    (0, common_1.Patch)('lab-items/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'a3f67507-6d8c-4b0a-bf58-8f9f2a2660e4' }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update lab item',
        description: 'Updates lab item name/price/active flag.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.AdminUpdateLabItemDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateLabItem", null);
__decorate([
    (0, common_1.Get)('clinic-config'),
    (0, swagger_1.ApiOperation)({ summary: 'List clinic configuration' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listClinicConfig", null);
__decorate([
    (0, common_1.Post)('clinic-config'),
    (0, swagger_1.ApiOperation)({
        summary: 'Upsert clinic configuration',
        description: 'Creates or updates a config entry by key.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.AdminUpsertClinicConfigDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "upsertClinicConfig", null);
__decorate([
    (0, common_1.Delete)('clinic-config/:key'),
    (0, swagger_1.ApiParam)({ name: 'key', example: 'CLINIC_NAME' }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete clinic configuration key' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteClinicConfig", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('Admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map