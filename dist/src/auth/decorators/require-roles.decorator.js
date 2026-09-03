"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireRoles = exports.REQUIRED_ROLES_KEY = exports.ROLE_CODES = void 0;
const common_1 = require("@nestjs/common");
exports.ROLE_CODES = [
    'SUPER_ADMIN',
    'ASSOCIATION_ADMIN',
    'REFEREE',
    'PLAYER',
];
exports.REQUIRED_ROLES_KEY = Symbol('required-roles');
const RequireRoles = (...roles) => (0, common_1.SetMetadata)(exports.REQUIRED_ROLES_KEY, roles);
exports.RequireRoles = RequireRoles;
//# sourceMappingURL=require-roles.decorator.js.map