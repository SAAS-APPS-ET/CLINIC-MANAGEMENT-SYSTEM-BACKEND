import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { QueueStatus, VisitStage } from '../../common/enums/visit.enums';

export type MainQueueKey =
  | 'Waiting'
  | 'Vitals'
  | 'Doctor'
  | 'Labratory'
  | 'Pharmacy'
  | 'Other';

export class QueueItemResponseDto {
  @ApiProperty({ example: 'c0d8ea9a-7a55-4c5a-b343-0d2c32b2a3d6' })
  id: string;

  @ApiProperty({ example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' })
  visitId: string;

  @ApiProperty({ example: 'e9f4f9fd-6405-4b69-8e7b-4a65c2db1e1c' })
  patientId: string;

  @ApiProperty({ example: 'John Doe' })
  patientName: string;

  @ApiProperty({ enum: VisitStage, example: VisitStage.WAITING_FOR_DOCTOR })
  stage: VisitStage;

  @ApiProperty({
    description: 'High-level queue category derived from stage.',
    example: 'Doctor',
  })
  mainQueue: MainQueueKey;

  @ApiProperty({ enum: QueueStatus, example: QueueStatus.ACTIVE })
  queueStatus: QueueStatus;

  @ApiProperty({ example: 1 })
  position: number;

  @ApiProperty({ example: '2026-02-22T10:55:41.645Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-02-22T10:55:41.645Z' })
  updatedAt: Date;
}

export class ReorderQueueDto {
  @ApiProperty({
    description: 'Array of visitIds in the desired order (first = position 1).',
    example: [
      'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
      'f0f1d2d3-1111-4a4a-9b9b-222222222222',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  visitIds: string[];
}
