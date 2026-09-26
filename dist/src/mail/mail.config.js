"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailSettings = getMailSettings;
const DEFAULT_APP_NAME = 'ASPROFUTPI';
const DEFAULT_FROM = 'ASPROFUTPI <no-reply@asprofutpitorneos.com>';
const DEFAULT_SUPPORT_EMAIL = 'soporte@asprofutpitorneos.com';
const DEFAULT_WEBSITE_URL = 'https://asprofutpitorneos.com';
function getMailSettings(configService) {
    const host = configService.get('MAIL_HOST')?.trim() ?? '';
    const user = configService.get('MAIL_USER')?.trim() ?? '';
    const password = configService.get('MAIL_PASSWORD') ?? '';
    const port = Number(configService.get('MAIL_PORT') ?? 587);
    const secureValue = configService.get('MAIL_SECURE')?.trim();
    return {
        enabled: Boolean(host && user && password),
        host,
        port: Number.isSafeInteger(port) && port > 0 ? port : 587,
        secure: secureValue ? secureValue === 'true' : port === 465,
        user,
        password,
        from: configService.get('MAIL_FROM')?.trim() || DEFAULT_FROM,
        appName: configService.get('APP_NAME')?.trim() || DEFAULT_APP_NAME,
        supportEmail: configService.get('MAIL_SUPPORT_ADDRESS')?.trim() ||
            DEFAULT_SUPPORT_EMAIL,
        contactPhone: configService.get('MAIL_CONTACT_PHONE')?.trim() ?? '',
        websiteUrl: configService.get('APP_PUBLIC_URL')?.trim() ||
            DEFAULT_WEBSITE_URL,
        logoUrl: configService.get('MAIL_LOGO_URL')?.trim() ?? '',
    };
}
//# sourceMappingURL=mail.config.js.map