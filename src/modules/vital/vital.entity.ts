import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Vital {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  visitId: string;

  @Column({ nullable: true })
  bloodPressure?: string;

  @Column({ nullable: true })
  bloodSugar?: string;

  @Column({ nullable: true })
  weight?: string;

  @Column({ nullable: true })
  temperature?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  recordedBy?: string;
}
