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
exports.UpdateUserProfileDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const require_roles_decorator_1 = require("../../auth/decorators/require-roles.decorator");
const user_gender_constants_1 = require("../user-gender.constants");
class UpdateUserProfileDto {
    idNumber;
    documentType;
    fullName;
    birthDate;
    gender;
    email;
    phone;
    roles;
    static _OPENAPI_METADATA_FACTORY() {
        return { idNumber: { required: false, type: () => String, maxLength: 40 }, documentType: { required: false, type: () => String, maxLength: 20 }, fullName: { required: false, type: () => String, maxLength: 160 }, birthDate: { required: false, type: () => String, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, gender: { required: false, enum: ["male", "female", "non_binary", "prefer_not_to_say"], enum: user_gender_constants_1.USER_GENDERS }, email: { required: false, type: () => String, maxLength: 254, format: "email" }, phone: { required: false, type: () => String, nullable: true, maxLength: 40 }, roles: { required: false, type: () => [String], enum: require_roles_decorator_1.ROLE_CODES, isArray: true, uniqueItems: true, minItems: 1 } };
    }
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1020304050' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'CC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'María Pérez' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1995-06-20', format: 'date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_gender_constants_1.USER_GENDERS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(user_gender_constants_1.USER_GENDERS),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'maria@example.com', format: 'email' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], UpdateUserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+573001234567', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", Object)
], UpdateUserProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '["PLAYER", "REFEREE"]',
        description: 'JSON con los roles del usuario. Solamente SUPER_ADMIN puede enviarlo.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value))
            return value;
        if (typeof value !== 'string' || value.trim() === '')
            return undefined;
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsIn)(require_roles_decorator_1.ROLE_CODES, { each: true }),
    __metadata("design:type", Array)
], UpdateUserProfileDto.prototype, "roles", void 0);
//# sourceMappingURL=update-user-profile.dto.js.map