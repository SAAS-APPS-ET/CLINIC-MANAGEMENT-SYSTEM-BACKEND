import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: '3a9f9a7b-1f01-4b3c-8023-8b5a4c2f9f5b' })
  @IsString()
  visitId: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'LAB', enum: ['LAB', 'CONSULTATION', 'PHARMACY'] })
  @IsString()
  @IsIn(['LAB', 'CONSULTATION', 'PHARMACY'])
  type: string;

  @ApiProperty({ example: 'CASH' })
  @IsString()
  @MinLength(2)
  method: string;

  @ApiProperty({ example: 'PAID', enum: ['PENDING', 'PAID', 'FAILED'] })
  @IsString()
  @IsIn(['PENDING', 'PAID', 'FAILED'])
  status: string;
}
