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
exports.PublicUserResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_gender_constants_1 = require("../user-gender.constants");
class PublicUserResponseDto {
    id;
    idNumber;
    documentType;
    fullName;
    birthDate;
    birthCity;
    gender;
    email;
    phone;
    photoUrl;
    status;
    blockReason;
    blockedUntil;
    roles;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, idNumber: { required: true, type: () => String }, documentType: { required: true, type: () => String }, fullName: { required: true, type: () => String }, birthDate: { required: true, type: () => String }, birthCity: { required: true, type: () => String, nullable: true }, gender: { required: true, nullable: true, enum: ["male", "female", "non_binary", "prefer_not_to_say"] }, email: { required: true, type: () => String }, phone: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, status: { required: true, type: () => String }, blockReason: { required: true, type: () => String, nullable: true }, blockedUntil: { required: true, type: () => String, nullable: true }, roles: { required: true, type: () => [String] }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
}
exports.PublicUserResponseDto = PublicUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CC' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1995-06-20', format: 'date' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pitalito', nullable: true }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "birthCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_gender_constants_1.USER_GENDERS, nullable: true }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@example.com', format: 'email' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+573001234567', nullable: true }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/uploads/users/550e8400-e29b-41d4-a716-446655440000.webp',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Incumplimiento reiterado del reglamento.',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "blockReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-09-09T18:00:00.000Z',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PublicUserResponseDto.prototype, "blockedUntil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['PLAYER'], type: [String] }),
    __metadata("design:type", Array)
], PublicUserResponseDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], PublicUserResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=public-user-response.dto.js.map