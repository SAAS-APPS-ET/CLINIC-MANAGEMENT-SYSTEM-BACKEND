import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureFlag } from './feature-flag.entity';

@Injectable()
export class FeatureFlagService {
  constructor(
    @InjectRepository(FeatureFlag)
    private readonly repo: Repository<FeatureFlag>,
  ) {}

  async isEnabled(key: string): Promise<boolean> {
    const flag = await this.repo.findOne({ where: { key } });
    return flag?.enabled ?? false;
  }

  async list(): Promise<FeatureFlag[]> {
    return this.repo.find({ order: { key: 'ASC' } });
  }

  async set(key: string, enabled: boolean): Promise<FeatureFlag> {
    const existing = await this.repo.findOne({ where: { key } });
    if (existing) {
      existing.enabled = enabled;
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create({ key, enabled }));
  }
}
