import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'A01', description: 'HMIS category code.' })
  @IsString()
  @MinLength(1)
  code: string;

  @ApiProperty({ example: 'Typhoid fever', description: 'Disease name/label.' })
  @IsString()
  @MinLength(2)
  disease: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'A01', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  code?: string;

  @ApiProperty({ example: 'Typhoid fever', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  disease?: string;
}
