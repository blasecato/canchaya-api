"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ALGORITHM = void 0;
exports.getAuthSettings = getAuthSettings;
exports.JWT_ALGORITHM = 'HS256';
function getPositiveInteger(configService, key, defaultValue) {
    const value = Number(configService.get(key) ?? defaultValue.toString());
    if (!Number.isSafeInteger(value) || value <= 0) {
        throw new Error(`${key} debe ser un entero positivo.`);
    }
    return value;
}
function getAuthSettings(configService) {
    const secret = configService.getOrThrow('JWT_SECRET');
    if (Buffer.byteLength(secret, 'utf8') < 32) {
        throw new Error('JWT_SECRET debe tener al menos 32 bytes.');
    }
    const expiresInSeconds = getPositiveInteger(configService, 'JWT_EXPIRES_IN_SECONDS', 86_400);
    const rememberMeExpiresInSeconds = getPositiveInteger(configService, 'JWT_REMEMBER_ME_EXPIRES_IN_SECONDS', 2_592_000);
    return {
        audience: configService.get('JWT_AUDIENCE') ?? 'canchaya-web',
        expiresInSeconds,
        issuer: configService.get('JWT_ISSUER') ?? 'canchaya-api',
        rememberMeExpiresInSeconds,
        secret,
    };
}
//# sourceMappingURL=auth.config.js.map