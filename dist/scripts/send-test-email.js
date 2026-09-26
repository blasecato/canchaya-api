"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const config_1 = require("@nestjs/config");
const mail_config_1 = require("../src/mail/mail.config");
const mail_service_1 = require("../src/mail/mail.service");
const password_reset_code_template_1 = require("../src/mail/templates/password-reset-code.template");
const welcome_template_1 = require("../src/mail/templates/welcome.template");
async function main() {
    const args = process.argv.slice(2);
    const previewOnly = args.includes('--preview');
    const isWelcome = args.includes('--welcome');
    const recipient = args.find((value) => !value.startsWith('--'))?.trim();
    const configService = new config_1.ConfigService(process.env);
    const settings = (0, mail_config_1.getMailSettings)(configService);
    if (previewOnly) {
        const common = {
            appName: settings.appName,
            supportEmail: settings.supportEmail,
            contactPhone: settings.contactPhone || '+57 320 000 0000',
            websiteUrl: settings.websiteUrl,
            logoSrc: '../src/mail/assets/asprofutpi-logo.png',
            fullName: 'Sebastián Calderón',
        };
        const { html } = isWelcome
            ? (0, welcome_template_1.renderWelcomeEmail)(common)
            : (0, password_reset_code_template_1.renderPasswordResetCodeEmail)({
                ...common,
                code: '482913',
                expiresInMinutes: 10,
            });
        const output = (0, node_path_1.resolve)(process.cwd(), isWelcome ? 'tmp/welcome-preview.html' : 'tmp/password-reset-preview.html');
        await (0, promises_1.writeFile)(output, html, 'utf8');
        console.log(`✔ Vista previa escrita en ${output}`);
        return;
    }
    if (!recipient) {
        throw new Error('Indica el destinatario: npm run mail:test -- tucorreo@dominio.com');
    }
    if (!settings.enabled) {
        throw new Error('Faltan MAIL_HOST, MAIL_USER o MAIL_PASSWORD en el archivo .env.');
    }
    console.log(`Enviando desde ${settings.from} vía ${settings.host}:${settings.port}…`);
    const mailService = new mail_service_1.MailService(configService);
    if (isWelcome) {
        await mailService.sendWelcome({
            to: recipient,
            fullName: 'Prueba de envío',
        });
    }
    else {
        await mailService.sendPasswordResetCode({
            to: recipient,
            fullName: 'Prueba de envío',
            code: '482913',
            expiresInMinutes: 10,
        });
    }
    console.log(`✔ Correo enviado a ${recipient}.`);
    console.log('Revisa la bandeja de entrada y la carpeta de spam.');
}
main().catch((error) => {
    console.error('✖ Falló el envío:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
//# sourceMappingURL=send-test-email.js.map