import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'clinic_config' })
export class ClinicConfig {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column({ type: 'varchar', unique: true })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'varchar', default: 'string' })
  valueType: 'string' | 'number' | 'boolean' | 'json';

  @Column({ type: 'boolean', default: false })
  isSecret: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
