import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LabItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ default: true })
  isActive: boolean;
}
