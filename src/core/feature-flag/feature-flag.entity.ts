import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FeatureFlag {
  @PrimaryColumn()
  key: string;

  @Column({ default: false })
  enabled: boolean;
}
