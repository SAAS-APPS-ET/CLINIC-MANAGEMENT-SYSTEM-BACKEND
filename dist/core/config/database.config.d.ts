import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { type ConfigService } from '@nestjs/config';
import { type AppEnv } from './app.config';
export declare function createTypeOrmOptions(config: ConfigService<AppEnv, true>): TypeOrmModuleOptions;
