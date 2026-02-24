import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { VisitService } from './visit.service';
import { CreateVisitDto, UpdateVisitStageDto } from './visit.dto';

@Controller('visits')
@ApiTags('Visits')
export class VisitController {
  constructor(private readonly visits: VisitService) {}

  @Post()
  @ApiOperation({
    summary: 'Create visit',
    description:
      'Creates a new visit for a patient. Default values: status=ACTIVE, queueStatus=ACTIVE, currentStage=WAITING.',
  })
  @ApiBody({ type: CreateVisitDto })
  @ApiOkResponse({
    description: 'Visit created.',
    schema: {
      example: {
        success: true,
        data: {
          id: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
          patientId: '0e6d2df0-9c8b-4e8b-a823-6c7691b0aa00',
          status: 'ACTIVE',
          queueStatus: 'ACTIVE',
          currentStage: 'WAITING',
          createdAt: '2026-02-21T10:00:00.000Z',
          completedAt: null,
        },
      },
    },
  })
  create(@Body() dto: CreateVisitDto) {
    return this.visits.createVisit(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get visit', description: 'Fetch a visit by id.' })
  @ApiParam({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' })
  getOne(@Param('id') id: string) {
    return this.visits.getVisit(id);
  }

  @Patch(':id/complete')
  @ApiOperation({
    summary: 'Complete visit',
    description:
      'Marks an ACTIVE visit as COMPLETED, sets stage=COMPLETED, and removes from queue.',
  })
  @ApiParam({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' })
  complete(@Param('id') id: string) {
    return this.visits.completeVisit(id);
  }

  @Patch(':id/stage')
  @ApiOperation({
    summary: 'Update visit stage',
    description:
      'Updates visit.currentStage when patient moves between stages. Keeps queue item stage in sync when the visit is queued.',
  })
  @ApiParam({ name: 'id', example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f' })
  @ApiBody({ type: UpdateVisitStageDto })
  updateStage(@Param('id') id: string, @Body() dto: UpdateVisitStageDto) {
    return this.visits.updateCurrentStage(id, dto);
  }
}
