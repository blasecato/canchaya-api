import 'dotenv/config';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { getMailSettings } from '../src/mail/mail.config';
import { MailService } from '../src/mail/mail.service';
import { renderPasswordResetCodeEmail } from '../src/mail/templates/password-reset-code.template';
import { renderWelcomeEmail } from '../src/mail/templates/welcome.template';

/**
 * Envía un correo de prueba con el diseño real.
 * Uso: npm run mail:test -- destinatario@dominio.com [--welcome]
 * Con --preview solo escribe el HTML en tmp/ sin enviar nada.
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const previewOnly = args.includes('--preview');
  const isWelcome = args.includes('--welcome');
  const recipient = args.find((value) => !value.startsWith('--'))?.trim();
  const configService = new ConfigService(process.env);
  const settings = getMailSettings(configService);

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
      ? renderWelcomeEmail(common)
      : renderPasswordResetCodeEmail({
          ...common,
          code: '482913',
          expiresInMinutes: 10,
        });
    const output = resolve(
      process.cwd(),
      isWelcome ? 'tmp/welcome-preview.html' : 'tmp/password-reset-preview.html',
    );
    await writeFile(output, html, 'utf8');
    console.log(`✔ Vista previa escrita en ${output}`);
    return;
  }

  if (!recipient) {
    throw new Error(
      'Indica el destinatario: npm run mail:test -- tucorreo@dominio.com',
    );
  }
  if (!settings.enabled) {
    throw new Error(
      'Faltan MAIL_HOST, MAIL_USER o MAIL_PASSWORD en el archivo .env.',
    );
  }

  console.log(
    `Enviando desde ${settings.from} vía ${settings.host}:${settings.port}…`,
  );
  const mailService = new MailService(configService);
  if (isWelcome) {
    await mailService.sendWelcome({
      to: recipient,
      fullName: 'Prueba de envío',
    });
  } else {
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

main().catch((error: unknown) => {
  console.error('✖ Falló el envío:');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
