import { ConfigService } from '@nestjs/config';

export const JWT_ALGORITHM = 'HS256' as const;

export interface AuthSettings {
  audience: string;
  expiresInSeconds: number;
  issuer: string;
  rememberMeExpiresInSeconds: number;
  secret: string;
}

function getPositiveInteger(
  configService: ConfigService,
  key: string,
  defaultValue: number,
): number {
  const value = Number(
    configService.get<string>(key) ?? defaultValue.toString(),
  );

  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${key} debe ser un entero positivo.`);
  }

  return value;
}

export function getAuthSettings(configService: ConfigService): AuthSettings {
  const secret = configService.getOrThrow<string>('JWT_SECRET');

  if (Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 bytes.');
  }

  const expiresInSeconds = getPositiveInteger(
    configService,
    'JWT_EXPIRES_IN_SECONDS',
    86_400,
  );
  const rememberMeExpiresInSeconds = getPositiveInteger(
    configService,
    'JWT_REMEMBER_ME_EXPIRES_IN_SECONDS',
    2_592_000,
  );

  return {
    audience: configService.get<string>('JWT_AUDIENCE') ?? 'canchaya-web',
    expiresInSeconds,
    issuer: configService.get<string>('JWT_ISSUER') ?? 'canchaya-api',
    rememberMeExpiresInSeconds,
    secret,
  };
}
