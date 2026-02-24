import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LabRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  visitId: string;

  @Column()
  labItemId: string;

  @Column()
  paymentStatus: string;

  @Column()
  labStatus: string;
}
