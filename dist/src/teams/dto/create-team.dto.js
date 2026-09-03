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
exports.CreateTeamDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateTeamDto {
    name;
    sportType;
    modality;
    primaryColor;
    secondaryColor;
    captainUserId;
    memberUserIds;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 120 }, sportType: { required: true, type: () => String, maxLength: 50 }, modality: { required: true, type: () => String, maxLength: 50 }, primaryColor: { required: false, type: () => String, nullable: true, pattern: "^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$" }, secondaryColor: { required: false, type: () => String, nullable: true, pattern: "^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$" }, captainUserId: { required: false, type: () => String }, memberUserIds: { required: false, type: () => [String], uniqueItems: true }, status: { required: false, type: () => String, enum: ['active', 'inactive'] } };
    }
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Central' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'football' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "sportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11v11' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#0066CC', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", Object)
], CreateTeamDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#FFFFFF', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", Object)
], CreateTeamDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5', type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "captainUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '["5", "8"]',
        description: 'JSON con IDs de jugadores que integrarán el equipo.',
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
    (0, class_validator_1.ArrayUnique)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)({ each: true }),
    __metadata("design:type", Array)
], CreateTeamDto.prototype, "memberUserIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['active', 'inactive'], default: 'active' }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['active', 'inactive']),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "status", void 0);
//# sourceMappingURL=create-team.dto.js.map