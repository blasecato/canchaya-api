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
exports.ListTournamentsQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const create_tournament_dto_1 = require("./create-tournament.dto");
const trimString = ({ value }) => typeof value === 'string' ? value.trim() : value;
class ListTournamentsQueryDto {
    associationId;
    managedOnly;
    tournamentTypeId;
    dateFrom;
    dateTo;
    phase;
    page = 1;
    pageSize = 10;
    static _OPENAPI_METADATA_FACTORY() {
        return { associationId: { required: false, type: () => String }, managedOnly: { required: false, type: () => Boolean }, tournamentTypeId: { required: false, type: () => String }, dateFrom: { required: false, type: () => String }, dateTo: { required: false, type: () => String }, phase: { required: false, enum: ["cancelled", "draft", "registration", "in_progress", "finished"], enum: create_tournament_dto_1.TOURNAMENT_PHASES }, page: { required: true, type: () => Object, default: 1, minimum: 1 }, pageSize: { required: true, type: () => Object, default: 10, minimum: 1, maximum: 10 } };
    }
}
exports.ListTournamentsQueryDto = ListTournamentsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1', type: String }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], ListTournamentsQueryDto.prototype, "associationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListTournamentsQueryDto.prototype, "managedOnly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1', type: String }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], ListTournamentsQueryDto.prototype, "tournamentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-08-01', format: 'date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], ListTournamentsQueryDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-31', format: 'date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], ListTournamentsQueryDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_tournament_dto_1.TOURNAMENT_PHASES }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(create_tournament_dto_1.TOURNAMENT_PHASES),
    __metadata("design:type", String)
], ListTournamentsQueryDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1, minimum: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], ListTournamentsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10, minimum: 1, maximum: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], ListTournamentsQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=list-tournaments-query.dto.js.map