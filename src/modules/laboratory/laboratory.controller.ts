import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LaboratoryService } from './laboratory.service';
import { CreateLabReportDto } from './laboratory.dto';

@Controller('lab')
@ApiTags('Laboratory')
export class LaboratoryController {
  constructor(private readonly labService: LaboratoryService) {}

  @Get('requests')
  @ApiOperation({
    summary: 'List lab requests',
    description: 'Returns all lab requests (newest first).',
  })
  listRequests() {
    return this.labService.listRequests();
  }

  @Post(':labRequestId/report')
  @ApiParam({
    name: 'labRequestId',
    example: 'b290e8a6-3b7c-4f63-8a41-b23f94f7af13',
  })
  @ApiOperation({
    summary: 'Create lab report',
    description:
      'Creates a report for a PAID lab request and marks it as COMPLETED; also moves the visit stage to BACK_TO_DOCTOR.',
  })
  createReport(
    @Param('labRequestId') labRequestId: string,
    @Body() dto: CreateLabReportDto,
  ) {
    return this.labService.createReport(labRequestId, dto);
  }
}
