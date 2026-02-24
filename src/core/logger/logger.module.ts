import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppLogger } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.printf((info) => {
              const rawTs = info.timestamp;
              const timestamp =
                typeof rawTs === 'string'
                  ? rawTs
                  : typeof rawTs === 'number'
                    ? new Date(rawTs).toISOString()
                    : rawTs instanceof Date
                      ? rawTs.toISOString()
                      : '';
              const level = String(info.level ?? '');
              const context =
                typeof info.context === 'string' ? info.context : undefined;
              const stack =
                typeof info.stack === 'string' ? info.stack : undefined;
              const message =
                typeof info.message === 'string'
                  ? info.message
                  : JSON.stringify(info.message);

              const ctx = context ? ` [${context}]` : '';
              const err = stack ? `\n${stack}` : '';
              return `${timestamp} ${level.toUpperCase()}${ctx}: ${message}${err}`;
            }),
          ),
        }),
      ],
    }),
  ],
  providers: [AppLogger],
  exports: [WinstonModule, AppLogger],
})
export class LoggerModule {}
