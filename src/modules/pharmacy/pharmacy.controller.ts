import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Feature } from '../../core/feature-flag/feature.decorator';
import { PHARMACY_FEATURE_KEY } from './pharmacy.feature';
import { PharmacyService } from './pharmacy.service';

@Controller('pharmacy')
@ApiTags('Pharmacy')
@Feature(PHARMACY_FEATURE_KEY)
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('queue')
  @ApiOperation({
    summary: 'Pharmacy queue',
    description:
      'Returns queue items currently waiting for pharmacy. Requires pharmacy module enabled.',
  })
  queue() {
    return this.pharmacyService.queue();
  }

  @Post(':visitId/dispense')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Dispense',
    description:
      'Dispense medication for a visit that has prescriptions sent to pharmacy. Marks visit completed (simplified).',
  })
  dispense(@Param('visitId') visitId: string) {
    return this.pharmacyService.dispense(visitId);
  }
}
