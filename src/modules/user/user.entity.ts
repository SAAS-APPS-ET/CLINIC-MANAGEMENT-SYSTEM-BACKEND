import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string = uuidv4();

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshTokenHash?: string;

  @Column({ nullable: true })
  otpCodeHash?: string;

  @Column({ type: 'timestamptz', nullable: true })
  otpExpiresAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
