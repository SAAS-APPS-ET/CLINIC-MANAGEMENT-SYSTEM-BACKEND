import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class AdminCreateUserDto {
  @ApiProperty({ example: 'staff1@clinic.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Staff One', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'DOCTOR' })
  @IsString()
  @MinLength(2)
  role: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Plain password (will be hashed).',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AdminCreateLabItemDto {
  @ApiProperty({ example: 'Full Blood Count' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AdminUpdateLabItemDto {
  @ApiProperty({ example: 'Full Blood Count', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ example: 5000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AdminUpsertClinicConfigDto {
  @ApiProperty({ example: 'CLINIC_NAME' })
  @IsString()
  @MinLength(2)
  key: string;

  @ApiProperty({
    example: 'Mango Clinic',
    description:
      'Stored as string. Caller decides encoding for json (send JSON.stringify(...)).',
  })
  @IsString()
  value: string;

  @ApiProperty({
    example: 'string',
    required: false,
    enum: ['string', 'number', 'boolean', 'json'],
  })
  @IsOptional()
  @IsString()
  valueType?: 'string' | 'number' | 'boolean' | 'json';

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isSecret?: boolean;
}
