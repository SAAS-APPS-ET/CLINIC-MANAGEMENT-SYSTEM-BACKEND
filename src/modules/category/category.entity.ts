import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Category {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column({ unique: true })
  code: string;

  @Column()
  disease: string;
}
