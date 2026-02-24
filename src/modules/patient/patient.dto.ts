import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

const phoneRegex = /^(07|09)\d{8}$/;

export class CreatePatientDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(2, 120)
  fullName: string;

  @ApiProperty({
    example: '07012345678',
    description: '10 digits starting with 07 or 09 (can be duplicated)',
  })
  @Matches(phoneRegex, {
    message: 'phoneNumber must be 10 digits starting with 07 or 09',
  })
  phoneNumber: string;

  @ApiProperty({ example: '1990-01-31' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'MALE', enum: ['MALE', 'FEMALE'] })
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @ApiPropertyOptional({ example: 'CARD-00001234' })
  @IsOptional()
  @IsString()
  @Length(2, 64)
  customerCardNumber?: string;

  @ApiPropertyOptional({ example: 'Addis Ababa' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  region?: string;

  @ApiPropertyOptional({ example: 'Bole' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  subCity?: string;

  @ApiPropertyOptional({ example: '08' })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  wereda?: string;

  @ApiPropertyOptional({ example: 'Kebele 12' })
  @IsOptional()
  @IsString()
  @Length(1, 40)
  kebela?: string;
}

// Backwards compatible exports (in case other parts still import these)
export class CreateMainPatientDto extends CreatePatientDto {}

export class CreateChildPatientDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @Length(2, 120)
  fullName: string;

  @ApiProperty({ example: '2018-05-14' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'FEMALE', enum: ['MALE', 'FEMALE'] })
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @ApiPropertyOptional({ example: 'CARD-00004567' })
  @IsOptional()
  @IsString()
  @Length(2, 64)
  customerCardNumber?: string;

  @ApiPropertyOptional({ example: 'Addis Ababa' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  region?: string;

  @ApiPropertyOptional({ example: 'Bole' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  subCity?: string;

  @ApiPropertyOptional({ example: '08' })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  wereda?: string;

  @ApiPropertyOptional({ example: 'Kebele 12' })
  @IsOptional()
  @IsString()
  @Length(1, 40)
  kebela?: string;

  @ApiPropertyOptional({
    example: '07012345678',
    description:
      'Parent phone number (10 digits starting with 07 or 09). Required when parentId is not provided.',
  })
  @IsOptional()
  @Matches(phoneRegex, {
    message: 'phoneNumber must be 10 digits starting with 07 or 09',
  })
  phoneNumber?: string;

  @ApiProperty({ example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00' })
  @IsOptional()
  @IsString()
  parentId?: string;
}

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @Length(2, 120)
  fullName?: string;

  @ApiPropertyOptional({
    example: '09012345678',
    description: '10 digits starting with 07 or 09',
  })
  @IsOptional()
  @Matches(phoneRegex, {
    message: 'phoneNumber must be 10 digits starting with 07 or 09',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '1990-01-31' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'MALE', enum: ['MALE', 'FEMALE'] })
  @IsOptional()
  @IsIn(['MALE', 'FEMALE'])
  gender?: string;

  @ApiPropertyOptional({ example: 'CARD-00001234' })
  @IsOptional()
  @IsString()
  @Length(2, 64)
  customerCardNumber?: string;

  @ApiPropertyOptional({ example: 'Addis Ababa' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  region?: string;

  @ApiPropertyOptional({ example: 'Bole' })
  @IsOptional()
  @IsString()
  @Length(2, 80)
  subCity?: string;

  @ApiPropertyOptional({ example: '08' })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  wereda?: string;

  @ApiPropertyOptional({ example: 'Kebele 12' })
  @IsOptional()
  @IsString()
  @Length(1, 40)
  kebela?: string;
}
