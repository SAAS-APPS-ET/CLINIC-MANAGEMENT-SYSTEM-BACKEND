import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateVitalDto {
  @ApiProperty({ example: '120/80', required: false })
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @ApiProperty({ example: '95 mg/dL', required: false })
  @IsOptional()
  @IsString()
  bloodSugar?: string;

  @ApiProperty({ example: '70 kg', required: false })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiProperty({ example: '36.7 C', required: false })
  @IsOptional()
  @IsString()
  temperature?: string;

  @ApiProperty({ example: 'Patient stable', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 'nurse_456', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  recordedBy?: string;
}
