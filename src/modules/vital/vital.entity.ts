import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
