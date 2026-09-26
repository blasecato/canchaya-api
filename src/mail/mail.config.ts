import { ConfigService } from '@nestjs/config';

export interface MailSettings {
  /** Cuando es falso el servicio solo registra el correo en consola. */
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
  /** Si está vacío se incrusta el logo local como adjunto embebido. */
  logoUrl: string;
}

const DEFAULT_APP_NAME = 'ASPROFUTPI';
const DEFAULT_FROM = 'ASPROFUTPI <no-reply@asprofutpitorneos.com>';
const DEFAULT_SUPPORT_EMAIL = 'soporte@asprofutpitorneos.com';
const DEFAULT_WEBSITE_URL = 'https://asprofutpitorneos.com';

export function getMailSettings(configService: ConfigService): MailSettings {
  const host = configService.get<string>('MAIL_HOST')?.trim() ?? '';
  const user = configService.get<string>('MAIL_USER')?.trim() ?? '';
  const password = configService.get<string>('MAIL_PASSWORD') ?? '';
  const port = Number(configService.get<string>('MAIL_PORT') ?? 587);
  const secureValue = configService.get<string>('MAIL_SECURE')?.trim();

  return {
    enabled: Boolean(host && user && password),
    host,
    port: Number.isSafeInteger(port) && port > 0 ? port : 587,
    secure: secureValue ? secureValue === 'true' : port === 465,
    user,
    password,
    from: configService.get<string>('MAIL_FROM')?.trim() || DEFAULT_FROM,
    appName: configService.get<string>('APP_NAME')?.trim() || DEFAULT_APP_NAME,
    supportEmail:
      configService.get<string>('MAIL_SUPPORT_ADDRESS')?.trim() ||
      DEFAULT_SUPPORT_EMAIL,
    contactPhone: configService.get<string>('MAIL_CONTACT_PHONE')?.trim() ?? '',
    websiteUrl:
      configService.get<string>('APP_PUBLIC_URL')?.trim() ||
      DEFAULT_WEBSITE_URL,
    logoUrl: configService.get<string>('MAIL_LOGO_URL')?.trim() ?? '',
  };
}
