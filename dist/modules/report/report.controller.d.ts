import { ReportService } from './report.service';
import { ReportDateRangeQueryDto } from './report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    health(): {
        ok: boolean;
        now: string;
        note: string;
    };
    daily(q: ReportDateRangeQueryDto): Promise<{
        range: {
            from: string;
            to: string;
        };
        visitsCreated: number;
        visitsCompleted: number;
        queue: {
            added: number;
            activeNow: number;
        };
        vitalsRecordedTotal: number;
        diagnosesTotal: number;
        lab: {
            requestsTotal: number;
            reportsTotal: number;
        };
        payments: {
            paidCount: number;
            paidTotal: number;
        };
    }>;
    visitsByStage(q: ReportDateRangeQueryDto): Promise<{
        range: {
            from: string;
            to: string;
        };
        breakdown: {
            stage: string;
            count: number;
        }[];
    }>;
    visitsByStatus(q: ReportDateRangeQueryDto): Promise<{
        range: {
            from: string;
            to: string;
        };
        breakdown: {
            status: string;
            count: number;
        }[];
    }>;
    recentVisits(q: ReportDateRangeQueryDto): Promise<{
        page: number;
        limit: number;
        total: number;
        items: import("../visit/visit.entity").Visit[];
    }>;
    queueByStage(): Promise<{
        breakdown: {
            stage: string;
            count: number;
        }[];
    }>;
    queueList(q: ReportDateRangeQueryDto): Promise<{
        page: number;
        limit: number;
        total: number;
        items: import("../queue/queue-item.entity").QueueItem[];
    }>;
    paymentsByTypeStatus(): Promise<{
        breakdown: {
            type: string;
            status: string;
            count: number;
            amount: number;
        }[];
    }>;
    labRequestsByStatus(): Promise<{
        breakdown: {
            paymentStatus: string;
            labStatus: string;
            count: number;
        }[];
    }>;
}
