import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { type ConfigService } from '@nestjs/config';
import { type AppEnv } from './app.config';

export function createTypeOrmOptions(
  config: ConfigService<AppEnv, true>,
): TypeOrmModuleOptions {
  const sslEnabled = config.get<boolean>('DB_SSL') ?? false;

  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
    synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? true,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsTableName: 'typeorm_migrations',
    logger: 'file',
    logging: config.get<boolean>('DB_LOGGING') ?? true,
    autoLoadEntities: true,
  };
}
