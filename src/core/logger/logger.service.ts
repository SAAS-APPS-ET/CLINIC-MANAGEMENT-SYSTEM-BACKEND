import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private readonly logger = new Logger('App');

  withContext(context: string) {
    const child = new Logger(context);
    return {
      log: (message: unknown) => child.log(message as any),
      error: (message: unknown, trace?: string) =>
        child.error(message as any, trace),
      warn: (message: unknown) => child.warn(message as any),
      debug: (message: unknown) => child.debug(message as any),
      verbose: (message: unknown) => child.verbose(message as any),
    };
  }

  log(message: unknown) {
    this.logger.log(message as any);
  }
  error(message: unknown, trace?: string) {
    this.logger.error(message as any, trace);
  }
  warn(message: unknown) {
    this.logger.warn(message as any);
  }
  debug(message: unknown) {
    this.logger.debug(message as any);
  }
  verbose(message: unknown) {
    this.logger.verbose(message as any);
  }
}
