import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { DoctorService } from './doctor.service';
import {
  RequestLabDto,
  WriteDiagnosisDto,
  WritePrescriptionDto,
} from './doctor.dto';

type RequestWithUser = Request & { user?: unknown };

@Controller('doctor')
@ApiTags('Doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('queue')
  @ApiOperation({
    summary: 'View queue',
    description: 'Returns the current visit queue ordered by position.',
  })
  viewQueue() {
    return this.doctorService.viewQueue();
  }

  @Post(':visitId/start')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Start visit',
    description: 'Moves a queued ACTIVE visit into DOCTOR stage.',
  })
  startVisit(@Param('visitId') visitId: string) {
    return this.doctorService.startVisit(visitId);
  }

  @Post(':visitId/diagnosis')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Write diagnosis',
    description: 'Creates a DoctorDiagnosis entry for a visit.',
  })
  writeDiagnosis(
    @Param('visitId') visitId: string,
    @Body() dto: WriteDiagnosisDto,
    @Req() req: Request,
  ) {
    return this.doctorService.writeDiagnosis(
      visitId,
      dto,
      (req as RequestWithUser).user,
    );
  }

  @Post(':visitId/prescription')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Write prescription',
    description:
      'Stores prescription lines on the visit record (temporary design).',
  })
  writePrescription(
    @Param('visitId') visitId: string,
    @Body() dto: WritePrescriptionDto,
  ) {
    return this.doctorService.writePrescription(visitId, dto);
  }

  @Post(':visitId/request-lab')
  @ApiParam({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
  })
  @ApiOperation({
    summary: 'Request lab',
    description: 'Creates a LabRequest and moves the visit stage to LAB.',
  })
  requestLab(@Param('visitId') visitId: string, @Body() dto: RequestLabDto) {
    return this.doctorService.requestLab(visitId, dto);
  }
}
