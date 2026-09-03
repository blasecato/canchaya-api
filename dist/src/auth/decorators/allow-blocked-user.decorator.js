"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowBlockedUser = exports.ALLOW_BLOCKED_USER_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ALLOW_BLOCKED_USER_KEY = Symbol('allow-blocked-user');
const AllowBlockedUser = () => (0, common_1.SetMetadata)(exports.ALLOW_BLOCKED_USER_KEY, true);
exports.AllowBlockedUser = AllowBlockedUser;
//# sourceMappingURL=allow-blocked-user.decorator.js.map