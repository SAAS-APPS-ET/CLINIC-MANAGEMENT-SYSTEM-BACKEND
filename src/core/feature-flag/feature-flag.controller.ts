import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enums';
import { Public } from '../../common/decorators/public.decorator';
import { FeatureKeys, type FeatureKey } from './feature-keys';
import { FeatureFlagService } from './feature-flag.service';

type FeatureFlagConfigItem = { key: FeatureKey; enabled: boolean };

class SetFeatureFlagDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  enabled: boolean;
}

@Controller('feature-flags')
@ApiTags('Feature Flags')
export class FeatureFlagController {
  constructor(private readonly flags: FeatureFlagService) {}

  @Get('enabled')
  @Public()
  @ApiOperation({
    summary: 'List enabled feature flags',
    description: 'Public endpoint returning only enabled=true flags.',
  })
  async listEnabled() {
    const all = await this.flags.list();
    return all.filter((f) => f.enabled);
  }

  @Get('keys')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'List all feature keys (SUPER_ADMIN only)',
    description: 'Returns the supported feature keys from FeatureKeys.',
  })
  listKeys() {
    return Object.values(FeatureKeys);
  }

  @Get('config')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'List feature flags configuration (SUPER_ADMIN only)',
    description: 'Returns all supported feature keys with their enabled value.',
  })
  async listConfig(): Promise<FeatureFlagConfigItem[]> {
    const keys = Object.values(FeatureKeys) as FeatureKey[];
    const enabledSet = new Set(
      (await this.flags.list()).filter((f) => f.enabled).map((f) => f.key),
    );
    return keys.map((key) => ({ key, enabled: enabledSet.has(key) }));
  }

  @Patch(':key/enable')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Enable feature flag (SUPER_ADMIN only)' })
  @ApiParam({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' })
  enable(@Param('key') key: string) {
    return this.flags.set(key, true);
  }

  @Patch(':key/disable')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Disable feature flag (SUPER_ADMIN only)' })
  @ApiParam({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' })
  disable(@Param('key') key: string) {
    return this.flags.set(key, false);
  }

  @Patch(':key')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Set feature flag enabled state (SUPER_ADMIN only)',
  })
  @ApiParam({ name: 'key', example: 'ENABLE_DOCTOR_MODULE' })
  set(@Param('key') key: string, @Body() dto: SetFeatureFlagDto) {
    return this.flags.set(key, dto.enabled);
  }
}
