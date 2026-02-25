import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../category/category.entity';

@Entity()
export class DoctorDiagnosis {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  visitId: string;

  @Column({ nullable: true })
  categoryId?: string;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  category?: Category;

  @Column()
  diagnosisText: string;

  @Column({ nullable: true })
  notes?: string;

  @Column()
  createdBy: string;
}
