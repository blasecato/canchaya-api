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
exports.CreatePlayerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_bcrypt_password_decorator_1 = require("../../common/decorators/is-bcrypt-password.decorator");
const user_gender_constants_1 = require("../../users/user-gender.constants");
class CreatePlayerDto {
    idNumber;
    documentType;
    fullName;
    birthDate;
    gender;
    email;
    phone;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { idNumber: { required: true, type: () => String, maxLength: 40 }, documentType: { required: true, type: () => String, maxLength: 20 }, fullName: { required: true, type: () => String, maxLength: 160 }, birthDate: { required: true, type: () => String, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, gender: { required: true, enum: ["male", "female", "non_binary", "prefer_not_to_say"], enum: user_gender_constants_1.USER_GENDERS }, email: { required: true, type: () => String, format: "email" }, phone: { required: false, type: () => String, nullable: true, maxLength: 40 }, password: { required: true, type: () => String, minLength: 8 } };
    }
}
exports.CreatePlayerDto = CreatePlayerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CC' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-06-20', format: 'date' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_gender_constants_1.USER_GENDERS, example: 'male' }),
    (0, class_validator_1.IsIn)(user_gender_constants_1.USER_GENDERS),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", Object)
], CreatePlayerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 8, writeOnly: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, is_bcrypt_password_decorator_1.IsBcryptPassword)(),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "password", void 0);
//# sourceMappingURL=create-player.dto.js.map