import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURE_KEY } from './feature.decorator';
import { FeatureFlagService } from './feature-flag.service';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly flags: FeatureFlagService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const feature = this.reflector.get<string>(
      FEATURE_KEY,
      context.getHandler(),
    );
    if (!feature) return true;

    const enabled = await this.flags.isEnabled(feature);
    if (!enabled) {
      throw new ForbiddenException(`Feature disabled: ${feature}`);
    }
    return true;
  }
}
