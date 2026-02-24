export declare class AppLogger {
    private readonly logger;
    withContext(context: string): {
        log: (message: unknown) => void;
        error: (message: unknown, trace?: string) => void;
        warn: (message: unknown) => void;
        debug: (message: unknown) => void;
        verbose: (message: unknown) => void;
    };
    log(message: unknown): void;
    error(message: unknown, trace?: string): void;
    warn(message: unknown): void;
    debug(message: unknown): void;
    verbose(message: unknown): void;
}
