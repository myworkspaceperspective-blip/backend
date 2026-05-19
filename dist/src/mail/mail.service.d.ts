import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private config;
    private readonly logger;
    private transporter;
    constructor(config: ConfigService);
    sendVerificationEmail(to: string, name: string, token: string): Promise<void>;
    sendPasswordResetEmail(to: string, name: string, token: string): Promise<void>;
}
