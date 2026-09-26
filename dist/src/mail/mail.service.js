"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
const mail_config_1 = require("./mail.config");
const password_reset_code_template_1 = require("./templates/password-reset-code.template");
const welcome_template_1 = require("./templates/welcome.template");
const LOGO_CONTENT_ID = 'asprofutpi-logo';
const LOGO_FILENAME = 'asprofutpi-logo.png';
let MailService = MailService_1 = class MailService {
    logger = new common_1.Logger(MailService_1.name);
    settings;
    transporter;
    constructor(configService) {
        this.settings = (0, mail_config_1.getMailSettings)(configService);
        if (this.settings.enabled) {
            this.logger.log(`Correo activo: ${this.settings.from} vía ${this.settings.host}:${this.settings.port} ` +
                `(logo ${this.settings.logoUrl ? 'remoto' : 'adjunto'}).`);
        }
        else {
            this.logger.warn('SMTP sin configurar: los correos se registrarán en consola en lugar de enviarse.');
        }
    }
    async sendPasswordResetCode(message) {
        const logo = this.resolveLogo();
        const { subject, html, text } = (0, password_reset_code_template_1.renderPasswordResetCodeEmail)({
            appName: this.settings.appName,
            supportEmail: this.settings.supportEmail,
            contactPhone: this.settings.contactPhone,
            websiteUrl: this.settings.websiteUrl,
            logoSrc: logo.src,
            fullName: message.fullName,
            code: message.code,
            expiresInMinutes: message.expiresInMinutes,
        });
        await this.send({
            to: message.to,
            subject,
            html,
            text,
            attachments: logo.attachment ? [logo.attachment] : undefined,
        });
    }
    async sendWelcome(message) {
        const logo = this.resolveLogo();
        const { subject, html, text } = (0, welcome_template_1.renderWelcomeEmail)({
            appName: this.settings.appName,
            supportEmail: this.settings.supportEmail,
            contactPhone: this.settings.contactPhone,
            websiteUrl: this.settings.websiteUrl,
            logoSrc: logo.src,
            fullName: message.fullName,
        });
        await this.send({
            to: message.to,
            subject,
            html,
            text,
            attachments: logo.attachment ? [logo.attachment] : undefined,
        });
    }
    resolveLogo() {
        if (this.settings.logoUrl)
            return { src: this.settings.logoUrl };
        const path = (0, node_path_1.join)(__dirname, 'assets', LOGO_FILENAME);
        if (!(0, node_fs_1.existsSync)(path)) {
            this.logger.warn(`No se encontró el logo del correo en ${path}.`);
            return { src: `${this.settings.websiteUrl}/images/logo.png` };
        }
        return {
            src: `cid:${LOGO_CONTENT_ID}`,
            attachment: { filename: LOGO_FILENAME, path, cid: LOGO_CONTENT_ID },
        };
    }
    async send(message) {
        if (!this.settings.enabled) {
            this.logger.log(`Correo simulado para ${message.to}: ${message.subject}\n${message.text}`);
            return;
        }
        try {
            await this.getTransporter().sendMail({
                from: this.settings.from,
                to: message.to,
                subject: message.subject,
                html: message.html,
                text: message.text,
                attachments: message.attachments,
            });
        }
        catch (error) {
            this.logger.error(`No fue posible enviar "${message.subject}" a ${message.to}.`, error instanceof Error ? error.stack : undefined);
            throw error;
        }
    }
    getTransporter() {
        this.transporter ??= (0, nodemailer_1.createTransport)({
            host: this.settings.host,
            port: this.settings.port,
            secure: this.settings.secure,
            auth: { user: this.settings.user, pass: this.settings.password },
        });
        return this.transporter;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map