export interface PasswordResetCodeTemplateData {
  appName: string;
  supportEmail: string;
  /** URL remota o referencia cid: del logo incrustado. */
  logoSrc: string;
  contactPhone: string;
  websiteUrl: string;
  fullName: string;
  code: string;
  expiresInMinutes: number;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const NAVY = '#0a1c3d';
const NAVY_DEEP = '#061027';
const GOLD = '#f5b301';
const SKY = '#16a7f5';
const GRASS = '#1f6b3a';
const CREAM = '#f4f1e8';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Solo dígitos y el prefijo +: es lo que aceptan los enlaces tel: y wa.me. */
const toDialLink = (phone: string) => phone.replace(/[^\d+]/g, '');

const toWhatsAppLink = (phone: string) => phone.replace(/\D/g, '');

/** Cada dígito en su propia casilla, como un marcador de estadio. */
const renderCodeBoxes = (code: string) =>
  Array.from(code)
    .map(
      (digit) => `<td align="center" valign="middle" width="46" bgcolor="${NAVY_DEEP}" style="width:46px;height:58px;border:2px solid ${GOLD};border-radius:10px;font-family:'Trebuchet MS',Arial,sans-serif;font-size:30px;font-weight:bold;color:${GOLD};">${escapeHtml(digit)}</td>
       <td width="8" style="width:8px;font-size:0;line-height:0;">&nbsp;</td>`,
    )
    .join('');

/** Franjas de cancha: alterna verdes para dar la sensación de césped. */
const renderPitchStripes = () =>
  Array.from({ length: 10 })
    .map(
      (_unused, index) =>
        `<td bgcolor="${index % 2 === 0 ? GRASS : '#175c31'}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>`,
    )
    .join('');

export function renderPasswordResetCodeEmail(
  data: PasswordResetCodeTemplateData,
): RenderedEmail {
  const firstName = data.fullName.trim().split(/\s+/)[0] || 'Jugador';
  const safeName = escapeHtml(firstName);
  const safeApp = escapeHtml(data.appName);
  const safeSupport = escapeHtml(data.supportEmail);
  const safePhone = escapeHtml(data.contactPhone);
  const safeLogo = escapeHtml(data.logoSrc);
  const safeSite = escapeHtml(data.websiteUrl);
  const year = new Date().getFullYear();

  const text = [
    `${firstName}, recibimos una solicitud para restablecer tu contraseña en ${data.appName}.`,
    '',
    `Tu código de verificación es: ${data.code}`,
    `Vence en ${data.expiresInMinutes} minutos y solo se puede usar una vez.`,
    '',
    'Si no solicitaste el cambio, ignora este correo: tu contraseña seguirá igual.',
    data.contactPhone
      ? `¿Necesitas ayuda? Escríbenos a ${data.supportEmail} o llámanos al ${data.contactPhone}.`
      : `¿Necesitas ayuda? Escríbenos a ${data.supportEmail}.`,
  ].join('\n');

  const contactBlock = data.contactPhone
    ? `<tr>
         <td align="center" style="padding:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(244,241,232,0.7);">
           📞 <a href="tel:${escapeHtml(toDialLink(data.contactPhone))}" style="color:${CREAM};text-decoration:none;">${safePhone}</a>
           &nbsp;·&nbsp;
           <a href="https://wa.me/${escapeHtml(toWhatsAppLink(data.contactPhone))}" style="color:${GOLD};text-decoration:none;">WhatsApp</a>
         </td>
       </tr>`
    : '';

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>Código de verificación</title>
  </head>
  <body style="margin:0;padding:0;background:${NAVY_DEEP};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${NAVY_DEEP}" style="background:${NAVY_DEEP};padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${NAVY};border-radius:20px;overflow:hidden;border:1px solid rgba(244,241,232,0.10);">

            <!-- Barra superior dorada -->
            <tr>
              <td bgcolor="${GOLD}" style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Escudo -->
            <tr>
              <td align="center" style="padding:28px 24px 8px;">
                <img src="${safeLogo}" width="150" alt="${safeApp}" style="display:block;width:150px;max-width:60%;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${SKY};">
                Asociación promotora de torneos de fútbol
              </td>
            </tr>

            <!-- Franja de cancha -->
            <tr>
              <td style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>${renderPitchStripes()}</tr>
                </table>
              </td>
            </tr>

            <!-- Mensaje -->
            <tr>
              <td style="padding:30px 32px 0;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">
                  ⚽ Tiempo de reanudar el juego
                </p>
                <h1 style="margin:0 0 14px;font-family:'Trebuchet MS',Arial,sans-serif;font-size:27px;line-height:1.15;text-transform:uppercase;color:${CREAM};">
                  Restablece tu contraseña
                </h1>
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:rgba(244,241,232,0.78);">
                  ${safeName}, recibimos una solicitud para cambiar la contraseña de tu cuenta.
                  Este es tu código de verificación:
                </p>
              </td>
            </tr>

            <!-- Marcador con el código -->
            <tr>
              <td align="center" style="padding:22px 24px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background:rgba(22,167,245,0.08);border:1px solid rgba(245,179,1,0.35);border-radius:16px;">
                  <tr>
                    <td style="padding:18px 20px 14px;">
                      <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(244,241,232,0.5);text-align:center;">
                        Código de verificación
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>${renderCodeBoxes(data.code)}</tr>
                      </table>
                      <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(244,241,232,0.55);text-align:center;">
                        ⏱ Vence en ${data.expiresInMinutes} minutos · un solo uso
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Instrucciones -->
            <tr>
              <td style="padding:18px 32px 4px;">
                <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:rgba(244,241,232,0.7);">
                  Escríbelo en la pantalla de recuperación para definir tu nueva contraseña.
                  Por seguridad cerraremos las sesiones abiertas con la clave anterior.
                </p>
                <p style="margin:0;padding:12px 14px;background:rgba(244,241,232,0.05);border-left:3px solid ${SKY};border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:rgba(244,241,232,0.62);">
                  ¿No fuiste tú? Ignora este correo: sin el código nadie puede entrar y tu
                  contraseña seguirá siendo la misma.
                </p>
              </td>
            </tr>

            <!-- Contacto -->
            <tr>
              <td style="padding:26px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr><td bgcolor="rgba(244,241,232,0.10)" style="height:1px;font-size:0;line-height:0;background:rgba(244,241,232,0.10);">&nbsp;</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:18px 24px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">
                ¿Necesitas ayuda?
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 24px 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(244,241,232,0.7);">
                ✉️ <a href="mailto:${safeSupport}" style="color:${CREAM};text-decoration:none;">${safeSupport}</a>
              </td>
            </tr>
            ${contactBlock}
            <tr>
              <td align="center" style="padding:6px 24px 24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
                <a href="${safeSite}" style="color:${SKY};text-decoration:none;">${safeSite.replace(/^https?:\/\//, '')}</a>
              </td>
            </tr>

            <!-- Pie -->
            <tr>
              <td bgcolor="${NAVY_DEEP}" style="padding:18px 24px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:rgba(244,241,232,0.4);">
                ${safeApp} · Pitalito, Huila<br />
                © ${year} Todos los derechos reservados · Correo automático, no respondas a esta dirección.
              </td>
            </tr>
          </table>

          <p style="margin:16px auto 0;max-width:600px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(244,241,232,0.3);text-align:center;">
            Recibiste este correo porque alguien solicitó restablecer la contraseña de esta cuenta.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject: `Código de verificación ${data.code} · ${data.appName}`,
    html,
    text,
  };
}
