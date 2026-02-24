import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { ReportDateRangeQueryDto } from './report.dto';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('health')
  @ApiOperation({ summary: 'Report module health' })
  health() {
    return this.reportService.health();
  }

  @Get('daily')
  @ApiOperation({
    summary: 'Daily summary report',
    description:
      'High-level KPIs for the chosen date range (defaults to today UTC).',
  })
  daily(@Query() q: ReportDateRangeQueryDto) {
    return this.reportService.dailySummary(q.from, q.to);
  }

  @Get('visits/by-stage')
  @ApiOperation({ summary: 'Visits breakdown by stage (range)' })
  visitsByStage(@Query() q: ReportDateRangeQueryDto) {
    return this.reportService.visitsByStage(q.from, q.to);
  }

  @Get('visits/by-status')
  @ApiOperation({ summary: 'Visits breakdown by status (range)' })
  visitsByStatus(@Query() q: ReportDateRangeQueryDto) {
    return this.reportService.visitsByStatus(q.from, q.to);
  }

  @Get('visits/recent')
  @ApiOperation({ summary: 'Recent visits (paged)' })
  recentVisits(@Query() q: ReportDateRangeQueryDto) {
    return this.reportService.listRecentVisits(q.page, q.limit);
  }

  @Get('queue/by-stage')
  @ApiOperation({ summary: 'Active queue breakdown by stage' })
  queueByStage() {
    return this.reportService.queueByStage();
  }

  @Get('queue/list')
  @ApiOperation({ summary: 'Queue list (paged)' })
  queueList(@Query() q: ReportDateRangeQueryDto) {
    return this.reportService.listQueue(q.page, q.limit);
  }

  @Get('payments/by-type-status')
  @ApiOperation({ summary: 'Payments breakdown by type and status' })
  paymentsByTypeStatus() {
    return this.reportService.paymentsByTypeAndStatus();
  }

  @Get('lab/requests/by-status')
  @ApiOperation({ summary: 'Lab requests breakdown by payment and lab status' })
  labRequestsByStatus() {
    return this.reportService.labRequestsByStatus();
  }
}
