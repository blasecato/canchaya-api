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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const allow_blocked_user_decorator_1 = require("./decorators/allow-blocked-user.decorator");
const login_dto_1 = require("./dto/login.dto");
const login_response_dto_1 = require("./dto/login-response.dto");
const logout_response_dto_1 = require("./dto/logout-response.dto");
const password_reset_dto_1 = require("./dto/password-reset.dto");
const password_reset_service_1 = require("./password-reset.service");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    passwordResetService;
    constructor(authService, passwordResetService) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    logout(request) {
        return this.authService.logout(request.auth);
    }
    requestPasswordReset(dto, ip) {
        return this.passwordResetService.request(dto, ip);
    }
    verifyPasswordResetCode(dto) {
        return this.passwordResetService.verify(dto);
    }
    confirmPasswordReset(dto) {
        return this.passwordResetService.confirm(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión con correo y contraseña' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Sesión iniciada correctamente.',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Formato de datos inválido.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Credenciales inválidas.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, allow_blocked_user_decorator_1.AllowBlockedUser)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Cerrar la sesión actual e invalidar su token' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Sesión cerrada correctamente.',
        type: logout_response_dto_1.LogoutResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token ausente, inválido, expirado o revocado.',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('password-reset/request'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 900_000 } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Solicitar un código para restablecer la contraseña',
    }),
    (0, swagger_1.ApiAcceptedResponse)({
        description: 'Solicitud registrada. La respuesta nunca revela si el correo existe.',
        type: password_reset_dto_1.PasswordResetRequestResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Formato de datos inválido.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_dto_1.RequestPasswordResetDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('password-reset/verify'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 900_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar el código recibido por correo' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Código válido: entrega el token para cambiar la contraseña.',
        type: password_reset_dto_1.PasswordResetVerificationResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Código inválido, vencido o agotado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_dto_1.VerifyPasswordResetCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPasswordResetCode", null);
__decorate([
    (0, common_1.Post)('password-reset/confirm'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 900_000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Definir la nueva contraseña' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Contraseña actualizada y sesiones anteriores cerradas.',
        type: password_reset_dto_1.PasswordResetConfirmationResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Token inválido o vencido.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_dto_1.ConfirmPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPasswordReset", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        password_reset_service_1.PasswordResetService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map