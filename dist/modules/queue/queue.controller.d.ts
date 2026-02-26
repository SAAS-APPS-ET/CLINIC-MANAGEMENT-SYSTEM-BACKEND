import { QueueService } from './queue.service';
import { QueueItemResponseDto, ReorderQueueDto } from './queue.dto';
export declare class QueueController {
    private readonly queue;
    constructor(queue: QueueService);
    list(): Promise<QueueItemResponseDto[]>;
    pause(visitId: string): Promise<import("./queue-item.entity").QueueItem>;
    resume(visitId: string): Promise<import("./queue-item.entity").QueueItem>;
    remove(visitId: string): Promise<import("./queue-item.entity").QueueItem>;
    reorder(dto: ReorderQueueDto): Promise<import("./queue-item.entity").QueueItem[]>;
}
