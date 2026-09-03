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
exports.ListTeamsQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
class ListTeamsQueryDto {
    search;
    tournamentId;
    registrationStatus;
    managedTournamentsOnly;
    page = 1;
    pageSize = 10;
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String, maxLength: 120 }, tournamentId: { required: false, type: () => String }, registrationStatus: { required: false, type: () => String, enum: ['approved', 'pending', 'rejected', 'changes_requested'] }, managedTournamentsOnly: { required: false, type: () => Boolean }, page: { required: true, type: () => Object, default: 1, minimum: 1 }, pageSize: { required: true, type: () => Object, default: 10, minimum: 1, maximum: 10 } };
    }
}
exports.ListTeamsQueryDto = ListTeamsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Galácticos' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListTeamsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1', type: String }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], ListTeamsQueryDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['approved', 'pending', 'rejected', 'changes_requested'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['approved', 'pending', 'rejected', 'changes_requested']),
    __metadata("design:type", String)
], ListTeamsQueryDto.prototype, "registrationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListTeamsQueryDto.prototype, "managedTournamentsOnly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1, minimum: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], ListTeamsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10, minimum: 1, maximum: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], ListTeamsQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=list-teams-query.dto.js.map