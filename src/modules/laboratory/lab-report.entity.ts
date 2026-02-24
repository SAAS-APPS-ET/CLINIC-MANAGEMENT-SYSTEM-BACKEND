import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LabReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  labRequestId: string;

  @Column()
  resultText: string;

  @Column({ nullable: true })
  attachmentUrl?: string;

  @Column()
  createdBy: string;
}
