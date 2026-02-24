"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmOptions = createTypeOrmOptions;
function createTypeOrmOptions(config) {
    const sslEnabled = config.get('DB_SSL') ?? false;
    return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
        synchronize: config.get('DB_SYNCHRONIZE') ?? false,
        logging: config.get('DB_LOGGING') ?? false,
        autoLoadEntities: true,
    };
}
//# sourceMappingURL=database.config.js.map