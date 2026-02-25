import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { QueueStatus, VisitStage } from '../../common/enums/visit.enums';

@Entity()
@Index(['visitId'], { unique: true })
export class QueueItem {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  visitId: string;

  @Column()
  patientId: string;

  @Column()
  patientName: string;

  @Column({ type: 'enum', enum: VisitStage })
  stage: VisitStage;

  @Column({ type: 'enum', enum: QueueStatus })
  queueStatus: QueueStatus;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
