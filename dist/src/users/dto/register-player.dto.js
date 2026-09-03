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
exports.RegisterPlayerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_bcrypt_password_decorator_1 = require("../../common/decorators/is-bcrypt-password.decorator");
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
const normalizeEmail = ({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value;
class RegisterPlayerDto {
    idNumber;
    fullName;
    email;
    age;
    phone;
    birthDate;
    birthCity;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { idNumber: { required: true, type: () => String, maxLength: 40 }, fullName: { required: true, type: () => String, maxLength: 160 }, email: { required: true, type: () => String, maxLength: 254, format: "email" }, age: { required: true, type: () => Number, minimum: 1, maximum: 120 }, phone: { required: false, type: () => String, maxLength: 40 }, birthDate: { required: true, type: () => String, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, birthCity: { required: true, type: () => String, maxLength: 120 }, password: { required: true, type: () => String, minLength: 8 } };
    }
}
exports.RegisterPlayerDto = RegisterPlayerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'juan@example.com' }),
    (0, class_transformer_1.Transform)(normalizeEmail),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 27, minimum: 1, maximum: 120 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], RegisterPlayerDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+57 300 123 4567' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1999-05-20', format: 'date' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pitalito' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "birthCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 8, writeOnly: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, is_bcrypt_password_decorator_1.IsBcryptPassword)(),
    __metadata("design:type", String)
], RegisterPlayerDto.prototype, "password", void 0);
//# sourceMappingURL=register-player.dto.js.map