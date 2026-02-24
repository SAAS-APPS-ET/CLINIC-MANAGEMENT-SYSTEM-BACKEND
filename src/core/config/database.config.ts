import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { type ConfigService } from '@nestjs/config';
import { type AppEnv } from './app.config';

export function createTypeOrmOptions(
  config: ConfigService<AppEnv, true>,
): TypeOrmModuleOptions {
  const sslEnabled = config.get<boolean>('DB_SSL') ?? false;

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST') ?? 'localhost',
    port: config.get<number>('DB_PORT') ?? 5432,
    username: config.get<string>('DB_USERNAME') ?? 'postgres',
    password: config.get<string>('DB_PASSWORD') ?? 'postgres',
    database: config.get<string>('DB_NAME') ?? 'clinic_db',
    ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
    synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? false,
    logging: config.get<boolean>('DB_LOGGING') ?? false,
    autoLoadEntities: true,
  };
}
