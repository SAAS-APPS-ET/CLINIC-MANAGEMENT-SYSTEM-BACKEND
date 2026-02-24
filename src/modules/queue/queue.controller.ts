import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueueService } from './queue.service';
import { QueueItemResponseDto, ReorderQueueDto } from './queue.dto';

@Controller('queue')
@ApiTags('Queue')
export class QueueController {
  constructor(private readonly queue: QueueService) {}

  @Get()
  @ApiOperation({
    summary: 'Get queue',
    description: 'Returns queued visits ordered by position.',
  })
  @ApiOkResponse({ type: QueueItemResponseDto, isArray: true })
  list() {
    return this.queue.listQueueResponse();
  }

  @Patch(':visitId/pause')
  @ApiOperation({
    summary: 'Pause visit in queue',
    description: 'Paused visits should not be visible to doctors.',
  })
  @ApiParam({
    name: 'visitId',
    example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
  })
  pause(@Param('visitId') visitId: string) {
    return this.queue.pause(visitId);
  }

  @Patch(':visitId/resume')
  @ApiOperation({ summary: 'Resume visit in queue' })
  @ApiParam({
    name: 'visitId',
    example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
  })
  resume(@Param('visitId') visitId: string) {
    return this.queue.resume(visitId);
  }

  @Patch(':visitId/remove')
  @ApiOperation({ summary: 'Remove visit from queue' })
  @ApiParam({
    name: 'visitId',
    example: 'f6b5c0c7-2db2-4ddf-8c1a-0d0c387b2e2f',
  })
  remove(@Param('visitId') visitId: string) {
    return this.queue.remove(visitId);
  }

  @Patch('reorder')
  @ApiOperation({
    summary: 'Reorder queue',
    description: 'Provide visitIds list in the desired order.',
  })
  @ApiBody({ type: ReorderQueueDto })
  @ApiOkResponse({ description: 'Updated queue items with new positions.' })
  reorder(@Body() dto: ReorderQueueDto) {
    return this.queue.reorder(dto.visitIds);
  }
}
