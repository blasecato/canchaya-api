import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, type Transporter } from 'nodemailer';
import { getMailSettings, type MailSettings } from './mail.config';
import { renderPasswordResetCodeEmail } from './templates/password-reset-code.template';
import { renderWelcomeEmail } from './templates/welcome.template';

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

const LOGO_CONTENT_ID = 'asprofutpi-logo';
const LOGO_FILENAME = 'asprofutpi-logo.png';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly settings: MailSettings;
  private transporter?: Transporter;

  constructor(configService: ConfigService) {
    this.settings = getMailSettings(configService);

    if (this.settings.enabled) {
      this.logger.log(
        `Correo activo: ${this.settings.from} vía ${this.settings.host}:${this.settings.port} ` +
          `(logo ${this.settings.logoUrl ? 'remoto' : 'adjunto'}).`,
      );
    } else {
      this.logger.warn(
        'SMTP sin configurar: los correos se registrarán en consola en lugar de enviarse.',
      );
    }
  }

  async sendPasswordResetCode(message: PasswordResetCodeEmail): Promise<void> {
    const logo = this.resolveLogo();
    const { subject, html, text } = renderPasswordResetCodeEmail({
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

  async sendWelcome(message: WelcomeEmail): Promise<void> {
    const logo = this.resolveLogo();
    const { subject, html, text } = renderWelcomeEmail({
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

  /**
   * Prefiere una URL pública cuando está configurada; si no, incrusta el
   * archivo local para que el escudo se vea aunque no haya CDN.
   */
  private resolveLogo(): {
    src: string;
    attachment?: { filename: string; path: string; cid: string };
  } {
    if (this.settings.logoUrl) return { src: this.settings.logoUrl };

    const path = join(__dirname, 'assets', LOGO_FILENAME);
    if (!existsSync(path)) {
      this.logger.warn(`No se encontró el logo del correo en ${path}.`);
      return { src: `${this.settings.websiteUrl}/images/logo.png` };
    }

    return {
      src: `cid:${LOGO_CONTENT_ID}`,
      attachment: { filename: LOGO_FILENAME, path, cid: LOGO_CONTENT_ID },
    };
  }

  private async send(message: {
    to: string;
    subject: string;
    html: string;
    text: string;
    attachments?: Array<{ filename: string; path: string; cid: string }>;
  }): Promise<void> {
    if (!this.settings.enabled) {
      // En desarrollo el contenido va al log para poder probar el flujo completo.
      this.logger.log(
        `Correo simulado para ${message.to}: ${message.subject}\n${message.text}`,
      );
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
    } catch (error: unknown) {
      // El detalle queda en el log; quien llama decide si el flujo continúa.
      this.logger.error(
        `No fue posible enviar "${message.subject}" a ${message.to}.`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  private getTransporter(): Transporter {
    this.transporter ??= createTransport({
      host: this.settings.host,
      port: this.settings.port,
      secure: this.settings.secure,
      auth: { user: this.settings.user, pass: this.settings.password },
    });
    return this.transporter;
  }
}
