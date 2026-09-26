import { ConfigService } from '@nestjs/config';
export interface WelcomeEmail {
    to: string;
    fullName: string;
}
export interface PasswordResetCodeEmail {
    to: string;
    fullName: string;
    code: string;
    expiresInMinutes: number;
}
export declare class MailService {
    private readonly logger;
    private readonly settings;
    private transporter?;
    constructor(configService: ConfigService);
    sendPasswordResetCode(message: PasswordResetCodeEmail): Promise<void>;
    sendWelcome(message: WelcomeEmail): Promise<void>;
    private resolveLogo;
    private send;
    private getTransporter;
}
