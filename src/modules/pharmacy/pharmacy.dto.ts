import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class DispenseDto {
  @ApiProperty({
    example: 'pharmacist_001',
    description: 'Identifier of the pharmacist dispensing medicines.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  dispensedBy?: string;
}

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'Amoxicillin 500mg' })
  @IsString()
  @MinLength(2)
  medicineName: string;

  @ApiProperty({ example: '1 capsule twice daily' })
  @IsString()
  @MinLength(2)
  dosage: string;

  @ApiProperty({ example: '5 days' })
  @IsString()
  @MinLength(1)
  duration: string;

  @ApiProperty({ example: 'After meals', required: false })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  sendToPharmacy: boolean;
}
