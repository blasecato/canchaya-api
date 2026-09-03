"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../auth.service");
const allow_blocked_user_decorator_1 = require("../decorators/allow-blocked-user.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    authService;
    reflector;
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractBearerToken(request.headers.authorization);
        if (!token) {
            throw new common_1.UnauthorizedException('Token de acceso requerido.');
        }
        request.auth = await this.authService.validateAccessToken(token);
        const allowsBlockedUser = this.reflector.getAllAndOverride(allow_blocked_user_decorator_1.ALLOW_BLOCKED_USER_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) ?? false;
        if (request.auth.isBlocked && !allowsBlockedUser) {
            throw new common_1.ForbiddenException('Tu cuenta está bloqueada. Solo puedes consultar tu perfil y tus notificaciones.');
        }
        return true;
    }
    extractBearerToken(authorization) {
        const [type, token, extra] = authorization?.trim().split(/\s+/) ?? [];
        if (type?.toLowerCase() !== 'bearer' || !token || extra) {
            return undefined;
        }
        return token;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map