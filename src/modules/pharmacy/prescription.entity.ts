import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
