import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { type AppEnv } from '../../core/config/app.config';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwt;
    private readonly config;
    private readonly reflector;
    constructor(jwt: JwtService, config: ConfigService<AppEnv, true>, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
