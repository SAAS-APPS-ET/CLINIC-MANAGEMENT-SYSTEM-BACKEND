import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { QueueStatus, VisitStage } from '../../common/enums/visit.enums';

@Entity()
@Index(['visitId'], { unique: true })
export class QueueItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
