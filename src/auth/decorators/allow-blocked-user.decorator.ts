import { SetMetadata } from '@nestjs/common';

export const ALLOW_BLOCKED_USER_KEY = Symbol('allow-blocked-user');

/**
 * Permite que una cuenta bloqueada use exclusivamente el endpoint marcado.
 * El resto de rutas protegidas continúan rechazando cuentas bloqueadas.
 */
export const AllowBlockedUser = () => SetMetadata(ALLOW_BLOCKED_USER_KEY, true);
