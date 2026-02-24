import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Feature } from '../../core/feature-flag/feature.decorator';
import { PAYMENT_FEATURE_KEY } from './payment.feature';
import { CreatePaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payments')
@ApiTags('Payments')
@Feature(PAYMENT_FEATURE_KEY)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({
    summary: 'Create payment',
    description:
      'Creates a payment record. When type=LAB and status=PAID, lab requests for the visit are marked PAID.',
  })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Get(':visitId')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Get payments by visit',
    description: 'Returns all payment records for a given visit.',
  })
  getByVisit(@Param('visitId') visitId: string) {
    return this.paymentService.getByVisit(visitId);
  }
}
