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
exports.LoginResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const public_user_response_dto_1 = require("../../users/dto/public-user-response.dto");
class LoginResponseDto {
    accessToken;
    tokenType;
    expiresIn;
    expiresAt;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, tokenType: { required: true, type: () => String }, expiresIn: { required: true, type: () => Number }, expiresAt: { required: true, type: () => String }, user: { required: true, type: () => require("../../users/dto/public-user-response.dto").PublicUserResponseDto } };
    }
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT de acceso.' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración del token en segundos.',
        example: 86400,
    }),
    __metadata("design:type", Number)
], LoginResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T19:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: public_user_response_dto_1.PublicUserResponseDto }),
    __metadata("design:type", public_user_response_dto_1.PublicUserResponseDto)
], LoginResponseDto.prototype, "user", void 0);
//# sourceMappingURL=login-response.dto.js.map