import { ConfigService } from '@nestjs/config';
import { type AppEnv } from '../../core/config/app.config';
export declare class SmtpService {
    private readonly config;
    constructor(config: ConfigService<AppEnv, true>);
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
