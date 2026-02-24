import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsUUID,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class WriteDiagnosisDto {
  @ApiProperty({
    example: '8a8f5ac9-5d35-4f33-95fc-8fcb8c1e63d4',
    required: false,
    description: 'HMIS category reference (Category.id).',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    example: 'Malaria',
    description: 'Doctor diagnosis (primary).',
  })
  @IsString()
  @MinLength(2)
  diagnosisText: string;

  @ApiProperty({
    example: 'Patient looks dehydrated; advised oral fluids.',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class WritePrescriptionDto {
  @ApiProperty({
    example: [
      'Paracetamol 500mg - 1 tab tds x 3 days',
      'ORS - after each stool',
    ],
    description: 'Free-text prescription lines.',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  lines: string[];

  @ApiProperty({
    example: 'doctor_123',
    description: 'Identifier of the clinician recording the prescription.',
  })
  @IsString()
  @MinLength(2)
  createdBy: string;
}

export class RequestLabDto {
  @ApiProperty({
    example: 'a3f67507-6d8c-4b0a-bf58-8f9f2a2660e4',
    description: 'Lab item to request (LabItem.id).',
  })
  @IsString()
  labItemId: string;

  @ApiProperty({
    example: 'doctor_123',
    description: 'Identifier of the clinician requesting the lab.',
  })
  @IsString()
  @MinLength(2)
  createdBy: string;
}

export class ContinueVisitDto {
  @ApiProperty({
    example: 'DOCTOR',
    required: false,
    description:
      'Optional hint; currently unused but reserved for future workflow branching.',
  })
  @IsOptional()
  @IsString()
  nextStage?: string;

  @ApiProperty({
    example: 'doctor_123',
    required: false,
    description: 'Identifier of the clinician continuing the visit.',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;
}

export class LabReportAttachmentDto {
  @ApiProperty({
    example: 'https://example.com/report.pdf',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;
}
