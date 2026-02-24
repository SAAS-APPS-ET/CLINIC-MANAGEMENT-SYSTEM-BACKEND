export type NodeEnv = 'development' | 'test' | 'production';

export type AppEnv = {
  NODE_ENV: NodeEnv;
  PORT: number;

  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  DB_SSL: boolean;
  DB_SYNCHRONIZE: boolean;
  DB_LOGGING: boolean;

  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
  SMTP_SECURE: boolean;
};

function parseBoolean(value: unknown, defaultValue: boolean): boolean {
  if (value === undefined || value === null || value === '')
    return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string' && typeof value !== 'number')
    return defaultValue;
  const str = String(value).trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(str)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(str)) return false;
  return defaultValue;
}

function parseNumber(value: unknown, defaultValue: number): number {
  if (value === undefined || value === null || value === '')
    return defaultValue;
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

export function validateEnv(config: Record<string, unknown>): AppEnv {
  const nodeEnvRaw = (config.NODE_ENV ?? 'development') as string;
  const nodeEnv: NodeEnv =
    nodeEnvRaw === 'production' || nodeEnvRaw === 'test'
      ? nodeEnvRaw
      : 'development';

  const port = parseNumber(config.PORT, 3000);

  const jwtAccessSecret =
    typeof config.JWT_ACCESS_SECRET === 'string'
      ? config.JWT_ACCESS_SECRET
      : 'change-me-access';
  const jwtAccessExpiresIn =
    typeof config.JWT_ACCESS_EXPIRES_IN === 'string'
      ? config.JWT_ACCESS_EXPIRES_IN
      : '15m';
  const jwtRefreshSecret =
    typeof config.JWT_REFRESH_SECRET === 'string'
      ? config.JWT_REFRESH_SECRET
      : 'change-me-refresh';
  const jwtRefreshExpiresIn =
    typeof config.JWT_REFRESH_EXPIRES_IN === 'string'
      ? config.JWT_REFRESH_EXPIRES_IN
      : '7d';

  const dbHost =
    typeof config.DB_HOST === 'string' ? config.DB_HOST : 'pimms.hostns.io';
  const dbPort = parseNumber(config.DB_PORT, 2083);
  const dbUsername =
    typeof config.DB_USERNAME === 'string'
      ? config.DB_USERNAME
      : 'feyeabkz_user';
  const dbPassword =
    typeof config.DB_PASSWORD === 'string'
      ? config.DB_PASSWORD
      : 'DB_@=@^%$*1990';
  const dbName =
    typeof config.DB_NAME === 'string'
      ? config.DB_NAME
      : 'feyeabkz_meditech_DB';

  const smtpHost =
    typeof config.SMTP_HOST === 'string' ? config.SMTP_HOST : 'pimms.hostns.io';
  const smtpPort = parseNumber(config.SMTP_PORT, 465);
  const smtpUser =
    typeof config.SMTP_USER === 'string'
      ? config.SMTP_USER
      : 'otp@feyeaberamediumclinic.com';
  const smtpPass =
    typeof config.SMTP_PASS === 'string' ? config.SMTP_PASS : 'DB_@=@^%$*1990';
  const smtpFrom =
    typeof config.SMTP_FROM === 'string'
      ? config.SMTP_FROM
      : 'Feye Abera Medium Clinic <no-reply@feyeaberamediumclinic.com>';
  const smtpSecure = parseBoolean(config.SMTP_SECURE, true);

  if (!dbHost)
    throw new Error('Invalid environment configuration: DB_HOST required');
  if (!dbUsername)
    throw new Error('Invalid environment configuration: DB_USERNAME required');
  if (!dbName)
    throw new Error('Invalid environment configuration: DB_NAME required');

  return {
    NODE_ENV: nodeEnv,
    PORT: port,

    JWT_ACCESS_SECRET: jwtAccessSecret,
    JWT_ACCESS_EXPIRES_IN: jwtAccessExpiresIn,
    JWT_REFRESH_SECRET: jwtRefreshSecret,
    JWT_REFRESH_EXPIRES_IN: jwtRefreshExpiresIn,

    DB_HOST: dbHost,
    DB_PORT: dbPort,
    DB_USERNAME: dbUsername,
    DB_PASSWORD: dbPassword,
    DB_NAME: dbName,

    DB_SSL: parseBoolean(config.DB_SSL, false),
    DB_SYNCHRONIZE: parseBoolean(config.DB_SYNCHRONIZE, false),
    DB_LOGGING: parseBoolean(config.DB_LOGGING, false),

    SMTP_HOST: smtpHost,
    SMTP_PORT: smtpPort,
    SMTP_USER: smtpUser,
    SMTP_PASS: smtpPass,
    SMTP_FROM: smtpFrom,
    SMTP_SECURE: smtpSecure,
  };
}
