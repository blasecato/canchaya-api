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
exports.ListDisciplinaryActionsQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ListDisciplinaryActionsQueryDto {
    status;
    search;
    page = 1;
    pageSize = 20;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, type: () => String, enum: ['reported', 'under_review', 'approved', 'dismissed'] }, search: { required: false, type: () => String }, page: { required: true, type: () => Object, default: 1, minimum: 1 }, pageSize: { required: true, type: () => Object, default: 20, minimum: 1, maximum: 50 } };
    }
}
exports.ListDisciplinaryActionsQueryDto = ListDisciplinaryActionsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['reported', 'under_review', 'approved', 'dismissed'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['reported', 'under_review', 'approved', 'dismissed']),
    __metadata("design:type", String)
], ListDisciplinaryActionsQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Juan o Copa' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListDisciplinaryActionsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1, minimum: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], ListDisciplinaryActionsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20, default: 20, minimum: 1, maximum: 50 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Object)
], ListDisciplinaryActionsQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=list-disciplinary-actions-query.dto.js.map