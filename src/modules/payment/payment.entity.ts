import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  visitId: string;

  @Column('decimal')
  amount: number;

  @Column()
  type: string; // LAB | CONSULTATION | PHARMACY

  @Column()
  method: string;

  @Column()
  status: string;
}
