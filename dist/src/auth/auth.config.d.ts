import { ConfigService } from '@nestjs/config';
export declare const JWT_ALGORITHM: "HS256";
export interface AuthSettings {
    audience: string;
    expiresInSeconds: number;
    issuer: string;
    rememberMeExpiresInSeconds: number;
    secret: string;
}
export declare function getAuthSettings(configService: ConfigService): AuthSettings;
