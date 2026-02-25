import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Patient {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column({ nullable: true })
  customerCardNumber?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  subCity?: string;

  @Column({ nullable: true })
  wereda?: string;

  @Column({ nullable: true })
  kebela?: string;

  // parentId removed: all patients are registered uniformly

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
