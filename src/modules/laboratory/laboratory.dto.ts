import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateLabReportDto {
  @ApiProperty({
    example: 'Hb: 13.5 g/dL; WBC: 6.2 x10^9/L',
    description: 'Result text / interpretation for the lab request.',
  })
  @IsString()
  @MinLength(2)
  resultText: string;

  @ApiProperty({
    example: 'https://example.com/attachments/lab-123.pdf',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;

  @ApiProperty({
    example: 'lab_tech_001',
    description: 'Identifier of the user creating the report.',
  })
  @IsString()
  @MinLength(2)
  createdBy: string;
}
