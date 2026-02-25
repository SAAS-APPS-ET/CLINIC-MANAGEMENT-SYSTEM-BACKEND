import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Prescription {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  visitId: string;

  @Column()
  medicineName: string;

  @Column()
  dosage: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  instructions?: string;

  @Column({ default: false })
  sendToPharmacy: boolean;
}
