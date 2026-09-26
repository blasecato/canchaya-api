export interface WelcomeTemplateData {
  appName: string;
  supportEmail: string;
  logoSrc: string;
  contactPhone: string;
  websiteUrl: string;
  fullName: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const GRASS_DARK = '#10532c';
const GRASS_LIGHT = '#15683a';
const LINE = 'rgba(255,255,255,0.75)';
const NAVY = '#0a1c3d';
const GOLD = '#f5b301';
const CREAM = '#ffffff';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const toDialLink = (phone: string) => phone.replace(/[^\d+]/g, '');
const toWhatsAppLink = (phone: string) => phone.replace(/\D/g, '');

const features = [
  {
    icon: '🏆',
    title: 'Inscribe a tu equipo',
    copy: 'Explora los torneos abiertos, revisa premios y cupos, e inscríbete en minutos.',
  },
  {
    icon: '📅',
    title: 'Sigue tu calendario',
    copy: 'Consulta fechas, sedes y rivales. Te avisamos cuando se programe o cambie un partido.',
  },
  {
    icon: '📊',
    title: 'Mira tus estadísticas',
    copy: 'Goles, tarjetas y posiciones de tu equipo actualizadas fecha a fecha.',
  },
];

/**
 * Cada sección vive sobre una franja de césped: el color alterna para imitar
 * el corte de la cancha sin usar imágenes de fondo (Outlook las ignora).
 */
const grassFor = (index: number) => (index % 2 === 0 ? GRASS_DARK : GRASS_LIGHT);

const renderFeature = (
  feature: (typeof features)[number],
  index: number,
) => `<tr>
  <td bgcolor="${grassFor(index)}" style="padding:14px 28px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(4,26,14,0.45);border:1px solid rgba(255,255,255,0.18);border-radius:14px;">
      <tr>
        <td width="52" align="center" valign="top" style="padding:16px 0 16px 16px;font-size:26px;line-height:1;">${feature.icon}</td>
        <td style="padding:16px 18px 16px 12px;font-family:Arial,Helvetica,sans-serif;">
          <p style="margin:0 0 4px;font-size:15px;font-weight:bold;color:${CREAM};">${feature.title}</p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(255,255,255,0.78);">${feature.copy}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

export function renderWelcomeEmail(data: WelcomeTemplateData): RenderedEmail {
  const firstName = data.fullName.trim().split(/\s+/)[0] || 'Jugador';
  const safeName = escapeHtml(firstName);
  const safeApp = escapeHtml(data.appName);
  const safeSupport = escapeHtml(data.supportEmail);
  const safePhone = escapeHtml(data.contactPhone);
  const safeLogo = escapeHtml(data.logoSrc);
  const safeSite = escapeHtml(data.websiteUrl);
  const year = new Date().getFullYear();

  const text = [
    `¡Bienvenido a ${data.appName}, ${firstName}!`,
    '',
    `${data.appName} es la Asociación Promotora de Torneos de Fútbol de Pitalito.`,
    'Organizamos ligas, copas relámpago y torneos empresariales, y en la plataforma puedes:',
    ...features.map((feature) => `- ${feature.title}: ${feature.copy}`),
    '',
    `Entra cuando quieras: ${data.websiteUrl}`,
    data.contactPhone
      ? `¿Dudas? Escríbenos a ${data.supportEmail} o al ${data.contactPhone}.`
      : `¿Dudas? Escríbenos a ${data.supportEmail}.`,
  ].join('\n');

  const contactPhoneRow = data.contactPhone
    ? `<p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,0.75);">
         📞 <a href="tel:${escapeHtml(toDialLink(data.contactPhone))}" style="color:${CREAM};text-decoration:none;">${safePhone}</a>
         &nbsp;·&nbsp;
         <a href="https://wa.me/${escapeHtml(toWhatsAppLink(data.contactPhone))}" style="color:${GOLD};text-decoration:none;">WhatsApp</a>
       </p>`
    : '';

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>Bienvenido a ${safeApp}</title>
  </head>
  <body style="margin:0;padding:0;background:#061027;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#061027" style="background:#061027;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;border-radius:20px;overflow:hidden;border:3px solid ${LINE};">

            <!-- Tribuna: escudo sobre azul -->
            <tr>
              <td bgcolor="${NAVY}" align="center" style="padding:26px 24px 10px;">
                <img src="${safeLogo}" width="140" alt="${safeApp}" style="display:block;width:140px;max-width:58%;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td bgcolor="${NAVY}" align="center" style="padding:0 24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">
                Asociación promotora de torneos de fútbol de Pitalito
              </td>
            </tr>

            <!-- Línea de fondo de la cancha -->
            <tr>
              <td bgcolor="${LINE}" style="height:3px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Área grande con el saludo -->
            <tr>
              <td bgcolor="${GRASS_DARK}" align="center" style="padding:32px 28px 10px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border:2px solid ${LINE};border-radius:16px;">
                  <tr>
                    <td align="center" style="padding:20px 26px;font-family:'Trebuchet MS',Arial,sans-serif;">
                      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">
                        ⚽ Pitazo inicial
                      </p>
                      <h1 style="margin:0;font-size:30px;line-height:1.1;text-transform:uppercase;color:${CREAM};">
                        ¡Bienvenido,<br />${safeName}!
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Presentación -->
            <tr>
              <td bgcolor="${GRASS_DARK}" style="padding:16px 32px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);text-align:center;">
                Tu cuenta ya está activa. ${safeApp} es la asociación que organiza
                ligas, copas relámpago y torneos empresariales en Pitalito y la
                región: nosotros ponemos la cancha, el arbitraje y la tabla de
                posiciones; tú pones el equipo.
              </td>
            </tr>

            <!-- Línea de medio campo -->
            <tr>
              <td bgcolor="${LINE}" style="height:2px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td bgcolor="${GRASS_LIGHT}" align="center" style="padding:0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="width:70px;height:36px;border:2px solid ${LINE};border-top:0;border-bottom-left-radius:70px;border-bottom-right-radius:70px;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Qué puedes hacer -->
            <tr>
              <td bgcolor="${GRASS_LIGHT}" style="padding:22px 28px 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};text-align:center;">
                Tu alineación en la plataforma
              </td>
            </tr>
            ${features.map(renderFeature).join('\n')}

            <!-- Llamado a la acción -->
            <tr>
              <td bgcolor="${grassFor(features.length)}" align="center" style="padding:24px 28px 30px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" bgcolor="${GOLD}" style="border-radius:12px;">
                      <a href="${safeSite}" style="display:inline-block;padding:14px 30px;font-family:'Trebuchet MS',Arial,sans-serif;font-size:15px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:${NAVY};text-decoration:none;">
                        Entrar a la plataforma
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.7);">
                  Ingresa con el correo con el que te registraste.
                </p>
              </td>
            </tr>

            <!-- Línea de fondo -->
            <tr>
              <td bgcolor="${LINE}" style="height:3px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Contacto -->
            <tr>
              <td bgcolor="${NAVY}" align="center" style="padding:24px 28px 8px;">
                <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">
                  Estamos para ayudarte
                </p>
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,0.75);">
                  ✉️ <a href="mailto:${safeSupport}" style="color:${CREAM};text-decoration:none;">${safeSupport}</a>
                </p>
                ${contactPhoneRow}
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
                  <a href="${safeSite}" style="color:#16a7f5;text-decoration:none;">${safeSite.replace(/^https?:\/\//, '')}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="${NAVY}" align="center" style="padding:16px 24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:rgba(255,255,255,0.45);">
                ${safeApp} · Pitalito, Huila<br />
                © ${year} Todos los derechos reservados · Correo automático, no respondas a esta dirección.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject: `¡Bienvenido a ${data.appName}, ${firstName}! Tu cuenta ya está lista`,
    html,
    text,
  };
}
