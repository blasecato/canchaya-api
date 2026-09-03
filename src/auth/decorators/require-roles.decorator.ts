import { SetMetadata } from '@nestjs/common';

export const ROLE_CODES = [
  'SUPER_ADMIN',
  'ASSOCIATION_ADMIN',
  'REFEREE',
  'PLAYER',
] as const;

export type RoleCode = (typeof ROLE_CODES)[number];

export const REQUIRED_ROLES_KEY = Symbol('required-roles');

export const RequireRoles = (...roles: RoleCode[]) =>
  SetMetadata(REQUIRED_ROLES_KEY, roles);
