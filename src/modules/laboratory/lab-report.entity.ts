import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class LabReport {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  labRequestId: string;

  @Column()
  resultText: string;

  @Column({ nullable: true })
  attachmentUrl?: string;

  @Column()
  createdBy: string;
}
