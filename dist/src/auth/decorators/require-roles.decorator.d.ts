export declare const ROLE_CODES: readonly ["SUPER_ADMIN", "ASSOCIATION_ADMIN", "REFEREE", "PLAYER"];
export type RoleCode = (typeof ROLE_CODES)[number];
export declare const REQUIRED_ROLES_KEY: unique symbol;
export declare const RequireRoles: (...roles: RoleCode[]) => import("@nestjs/common").CustomDecorator<typeof REQUIRED_ROLES_KEY>;
