import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
