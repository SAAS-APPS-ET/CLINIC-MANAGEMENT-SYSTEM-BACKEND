import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureFlagService } from './feature-flag.service';
export declare class FeatureGuard implements CanActivate {
    private readonly reflector;
    private readonly flags;
    constructor(reflector: Reflector, flags: FeatureFlagService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
