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
exports.PasswordResetConfirmationResponseDto = exports.PasswordResetVerificationResponseDto = exports.PasswordResetRequestResponseDto = exports.ConfirmPasswordResetDto = exports.VerifyPasswordResetCodeDto = exports.RequestPasswordResetDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_bcrypt_password_decorator_1 = require("../../common/decorators/is-bcrypt-password.decorator");
const normalizeEmail = ({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value;
const trimValue = ({ value }) => typeof value === 'string' ? value.trim() : value;
class RequestPasswordResetDto {
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" } };
    }
}
exports.RequestPasswordResetDto = RequestPasswordResetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jugador@asprofutpitorneos.com' }),
    (0, class_transformer_1.Transform)(normalizeEmail),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido.' }),
    __metadata("design:type", String)
], RequestPasswordResetDto.prototype, "email", void 0);
class VerifyPasswordResetCodeDto {
    email;
    code;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, code: { required: true, type: () => String, pattern: "^\\d{6}$" } };
    }
}
exports.VerifyPasswordResetCodeDto = VerifyPasswordResetCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jugador@asprofutpitorneos.com' }),
    (0, class_transformer_1.Transform)(normalizeEmail),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido.' }),
    __metadata("design:type", String)
], VerifyPasswordResetCodeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '482913', description: 'Código de seis dígitos.' }),
    (0, class_transformer_1.Transform)(trimValue),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'El código debe tener seis dígitos.' }),
    __metadata("design:type", String)
], VerifyPasswordResetCodeDto.prototype, "code", void 0);
class ConfirmPasswordResetDto {
    resetToken;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { resetToken: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8 } };
    }
}
exports.ConfirmPasswordResetDto = ConfirmPasswordResetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token entregado al verificar el código.' }),
    (0, class_transformer_1.Transform)(trimValue),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmPasswordResetDto.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'UnaClaveSegura123',
        description: 'Entre 8 caracteres y 72 bytes en UTF-8.',
        minLength: 8,
        writeOnly: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, is_bcrypt_password_decorator_1.IsBcryptPassword)(),
    __metadata("design:type", String)
], ConfirmPasswordResetDto.prototype, "password", void 0);
class PasswordResetRequestResponseDto {
    message;
    expiresInMinutes;
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, expiresInMinutes: { required: true, type: () => Number } };
    }
}
exports.PasswordResetRequestResponseDto = PasswordResetRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Si el correo está registrado enviaremos un código de verificación.',
    }),
    __metadata("design:type", String)
], PasswordResetRequestResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Minutos de vigencia del código.' }),
    __metadata("design:type", Number)
], PasswordResetRequestResponseDto.prototype, "expiresInMinutes", void 0);
class PasswordResetVerificationResponseDto {
    resetToken;
    expiresIn;
    static _OPENAPI_METADATA_FACTORY() {
        return { resetToken: { required: true, type: () => String }, expiresIn: { required: true, type: () => Number } };
    }
}
exports.PasswordResetVerificationResponseDto = PasswordResetVerificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token de un solo uso para cambiar la clave.' }),
    __metadata("design:type", String)
], PasswordResetVerificationResponseDto.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 600, description: 'Vigencia del token en segundos.' }),
    __metadata("design:type", Number)
], PasswordResetVerificationResponseDto.prototype, "expiresIn", void 0);
class PasswordResetConfirmationResponseDto {
    message;
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String } };
    }
}
exports.PasswordResetConfirmationResponseDto = PasswordResetConfirmationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tu contraseña fue actualizada correctamente.' }),
    __metadata("design:type", String)
], PasswordResetConfirmationResponseDto.prototype, "message", void 0);
//# sourceMappingURL=password-reset.dto.js.map