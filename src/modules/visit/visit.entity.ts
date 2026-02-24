import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  VisitStatus,
  QueueStatus,
  VisitStage,
} from '../../common/enums/visit.enums';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ type: 'enum', enum: VisitStatus })
  status: VisitStatus;

  @Column({ type: 'enum', enum: QueueStatus })
  queueStatus: QueueStatus;

  @Column({ type: 'enum', enum: VisitStage })
  currentStage: VisitStage;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ type: 'text', nullable: true })
  prescriptionText?: string;

  @Column({ nullable: true })
  prescriptionCreatedBy?: string;
}
