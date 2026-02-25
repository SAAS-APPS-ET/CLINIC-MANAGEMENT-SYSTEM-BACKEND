import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class LabRequest {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  visitId: string;

  @Column()
  labItemId: string;

  @Column()
  paymentStatus: string;

  @Column()
  labStatus: string;
}
