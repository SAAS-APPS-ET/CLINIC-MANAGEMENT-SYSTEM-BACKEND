import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
