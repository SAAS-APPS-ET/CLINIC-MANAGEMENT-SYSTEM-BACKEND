import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Payment {
  @PrimaryColumn()
  id: string = uuidv4();

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
