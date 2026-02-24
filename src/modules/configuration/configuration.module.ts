import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { FeatureFlagModule } from '../../core/feature-flag/feature-flag.module';

@Module({
  imports: [FeatureFlagModule],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
