import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, IsString, Min } from 'class-validator';

export class ReportDateRangeQueryDto {
  @ApiPropertyOptional({
    example: '2026-02-21T00:00:00.000Z',
    description: 'ISO start datetime (inclusive). Defaults to start of today.',
  })
  @IsOptional()
  @IsISO8601()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-02-22T00:00:00.000Z',
    description: 'ISO end datetime (exclusive). Defaults to start of tomorrow.',
  })
  @IsOptional()
  @IsISO8601()
  to?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Pagination page (1-based).',
  })
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 50, description: 'Pagination page size.' })
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(1)
  limit?: number;
}

export class ReportStatusBreakdownQueryDto extends ReportDateRangeQueryDto {
  @ApiPropertyOptional({
    example: 'WAITING_FOR_VITAL',
    description: 'Filter by stage/status string (best-effort).',
  })
  @IsOptional()
  @IsString()
  value?: string;
}
