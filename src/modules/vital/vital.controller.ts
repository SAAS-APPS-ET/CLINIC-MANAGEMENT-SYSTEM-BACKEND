import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Feature } from '../../core/feature-flag/feature.decorator';
import { VITAL_FEATURE_KEY } from './vital.feature';
import { VitalService } from './vital.service';
import { CreateVitalDto } from './vital.dto';

@Controller('vitals')
@ApiTags('Vitals')
@Feature(VITAL_FEATURE_KEY)
export class VitalController {
  constructor(private readonly vitalService: VitalService) {}

  @Post(':visitId')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Record vitals',
    description:
      'Creates or updates vitals for a visit. Requires VITALS feature flag enabled.',
  })
  record(@Param('visitId') visitId: string, @Body() dto: CreateVitalDto) {
    return this.vitalService.recordVital(visitId, dto);
  }

  @Get(':visitId')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Get vitals',
    description: 'Fetches recorded vitals for a visit.',
  })
  get(@Param('visitId') visitId: string) {
    return this.vitalService.getVital(visitId);
  }
}
