/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  AdminCreateLabItemDto,
  AdminCreateUserDto,
  AdminUpsertClinicConfigDto,
  AdminUpdateLabItemDto,
} from './admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users')
  @ApiOperation({
    summary: 'Create clinic user',
    description: 'Creates a staff user for this clinic (admin scope).',
  })
  createUser(@Body() dto: AdminCreateUserDto) {
    return this.adminService.createUser(dto);
  }

  @Get('users')
  @ApiOperation({
    summary: 'List clinic users',
    description: 'Lists staff users for this clinic (admin scope).',
  })
  listUsers() {
    return this.adminService.listUsers();
  }

  @Post('lab-items')
  @ApiOperation({
    summary: 'Create lab item',
    description: 'Creates a lab test/item that can be requested.',
  })
  createLabItem(@Body() dto: AdminCreateLabItemDto) {
    return this.adminService.createLabItem(dto);
  }

  @Get('lab-items')
  @ApiOperation({
    summary: 'List lab items',
    description: 'Lists all lab tests/items (admin scope).',
  })
  listLabItems() {
    return this.adminService.listLabItems();
  }

  @Patch('lab-items/:id')
  @ApiParam({ name: 'id', example: 'a3f67507-6d8c-4b0a-bf58-8f9f2a2660e4' })
  @ApiOperation({
    summary: 'Update lab item',
    description: 'Updates lab item name/price/active flag.',
  })
  updateLabItem(@Param('id') id: string, @Body() dto: AdminUpdateLabItemDto) {
    return this.adminService.updateLabItem(id, dto);
  }

  @Get('clinic-config')
  @ApiOperation({ summary: 'List clinic configuration' })
  listClinicConfig() {
    return this.adminService.listClinicConfig();
  }

  @Post('clinic-config')
  @ApiOperation({
    summary: 'Upsert clinic configuration',
    description: 'Creates or updates a config entry by key.',
  })
  upsertClinicConfig(@Body() dto: AdminUpsertClinicConfigDto) {
    return this.adminService.upsertClinicConfig(dto);
  }

  @Delete('clinic-config/:key')
  @ApiParam({ name: 'key', example: 'CLINIC_NAME' })
  @ApiOperation({ summary: 'Delete clinic configuration key' })
  deleteClinicConfig(@Param('key') key: string) {
    return this.adminService.deleteClinicConfig(key);
  }
}
