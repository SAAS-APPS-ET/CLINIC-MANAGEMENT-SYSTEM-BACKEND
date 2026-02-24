import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Controller('patients')
@ApiTags('Patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Search patients by phone',
    description:
      'Performs a case-insensitive search by phone substring and returns up to 20 matches.',
  })
  @ApiQuery({
    name: 'phone',
    example: '07012345678',
    description: 'Phone number (10 digits) starting with 07 or 09.',
  })
  @ApiOkResponse({
    description: 'Array of matching patients (max 20).',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
            fullName: 'John Doe',
            phone: '+2348012345678',
          },
        ],
      },
    },
  })
  searchByPhone(@Query('phone') phone: string) {
    return this.patientService.searchByPhone(phone);
  }

  @Post()
  @ApiOperation({
    summary: 'Register patient',
    description:
      'Creates a new patient record. Phone number is required and may be duplicated.',
  })
  @ApiBody({ type: CreatePatientDto })
  register(@Body() dto: CreatePatientDto) {
    return this.patientService.registerPatient(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update patient',
    description: 'Partially updates a patient record by id.',
  })
  @ApiParam({ name: 'id', example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' })
  @ApiBody({ type: UpdatePatientDto })
  updatePatient(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService.updatePatient(id, dto);
  }

  @Get(':id/history')
  @ApiOperation({
    summary: 'Get patient history',
    description:
      'Returns a patient and related history aggregates (placeholder arrays for now).',
  })
  @ApiParam({ name: 'id', example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' })
  getPatientHistory(@Param('id') id: string) {
    return this.patientService.getPatientHistory(id);
  }

  @Get('current/detail')
  @ApiOperation({
    summary: 'Get current patient detail',
    description:
      'Returns patient info plus a specific visit with diagnosis, vitals, and lab report.',
  })
  @ApiQuery({
    name: 'patientId',
    example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
    required: true,
  })
  @ApiQuery({
    name: 'visitId',
    example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b',
    required: true,
  })
  getCurrentDetail(
    @Query('patientId') patientId: string,
    @Query('visitId') visitId: string,
  ) {
    return this.patientService.getCurrentDetail(patientId, visitId);
  }
}
