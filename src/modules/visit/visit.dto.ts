import {
  VisitStatus,
  QueueStatus,
  VisitStage,
} from '../../common/enums/visit.enums';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({
    example: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
    description: 'Patient id to create the visit for.',
  })
  @IsUUID()
  patientId: string;

  @ApiPropertyOptional({
    enum: VisitStatus,
    example: VisitStatus.ACTIVE,
    description: 'Visit status. Defaults to ACTIVE.',
  })
  @IsOptional()
  @IsEnum(VisitStatus)
  status?: VisitStatus;

  @ApiPropertyOptional({
    enum: QueueStatus,
    example: QueueStatus.ACTIVE,
    description: 'Queue status. Defaults to ACTIVE.',
  })
  @IsOptional()
  @IsEnum(QueueStatus)
  queueStatus?: QueueStatus;

  @ApiPropertyOptional({
    enum: VisitStage,
    example: VisitStage.WAITING,
    description: 'Current stage. Defaults to WAITING.',
  })
  @IsOptional()
  @IsEnum(VisitStage)
  currentStage?: VisitStage;
}

export class CompleteVisitDto {
  @ApiProperty({
    example: '2026-02-21T12:00:00.000Z',
    description:
      'Timestamp when the visit was completed. Defaults to now when omitted by the server logic.',
  })
  completedAt: Date;
}

export class UpdateVisitStageDto {
  @ApiProperty({
    enum: VisitStage,
    example: VisitStage.WAITING_FOR_DOCTOR,
    description: 'New currentStage value for the visit.',
  })
  @IsEnum(VisitStage)
  currentStage: VisitStage;
}
