import { Repository } from 'typeorm';
import { Visit } from '../visit/visit.entity';
import { QueueItem } from '../queue/queue-item.entity';
import { Payment } from '../payment/payment.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';
import { Vital } from '../vital/vital.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';
export declare class ReportService {
    private readonly visitRepo;
    private readonly queueRepo;
    private readonly paymentRepo;
    private readonly labRequestRepo;
    private readonly labReportRepo;
    private readonly vitalRepo;
    private readonly diagnosisRepo;
    constructor(visitRepo: Repository<Visit>, queueRepo: Repository<QueueItem>, paymentRepo: Repository<Payment>, labRequestRepo: Repository<LabRequest>, labReportRepo: Repository<LabReport>, vitalRepo: Repository<Vital>, diagnosisRepo: Repository<DoctorDiagnosis>);
    health(): {
        ok: boolean;
        now: string;
        note: string;
    };
    dailySummary(from?: string, to?: string): Promise<{
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
    visitsByStage(from?: string, to?: string): Promise<{
        range: {
            from: string;
            to: string;
        };
        breakdown: {
            stage: string;
            count: number;
        }[];
    }>;
    visitsByStatus(from?: string, to?: string): Promise<{
        range: {
            from: string;
            to: string;
        };
        breakdown: {
            status: string;
            count: number;
        }[];
    }>;
    queueByStage(): Promise<{
        breakdown: {
            stage: string;
            count: number;
        }[];
    }>;
    paymentsByTypeAndStatus(): Promise<{
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
    listRecentVisits(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        total: number;
        items: Visit[];
    }>;
    listQueue(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        total: number;
        items: QueueItem[];
    }>;
}
