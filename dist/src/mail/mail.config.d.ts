import { ConfigService } from '@nestjs/config';
export interface MailSettings {
    enabled: boolean;
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from: string;
    appName: string;
    supportEmail: string;
    contactPhone: string;
    websiteUrl: string;
    logoUrl: string;
}
export declare function getMailSettings(configService: ConfigService): MailSettings;
