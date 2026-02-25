import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class LabItem {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ default: true })
  isActive: boolean;
}
