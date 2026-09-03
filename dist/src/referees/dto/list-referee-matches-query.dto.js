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
exports.ListRefereeMatchesQueryDto = exports.REFEREE_MATCH_KINDS = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.REFEREE_MATCH_KINDS = ['past', 'upcoming'];
class ListRefereeMatchesQueryDto {
    kind = 'past';
    page = 1;
    pageSize = 10;
    static _OPENAPI_METADATA_FACTORY() {
        return { kind: { required: true, default: "past", enum: ["past", "upcoming"], enum: exports.REFEREE_MATCH_KINDS }, page: { required: true, type: () => Object, default: 1, minimum: 1 }, pageSize: { required: true, type: () => Object, default: 10, minimum: 1, maximum: 10 } };
    }
}
exports.ListRefereeMatchesQueryDto = ListRefereeMatchesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.REFEREE_MATCH_KINDS, default: 'past' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.REFEREE_MATCH_KINDS),
    __metadata("design:type", String)
], ListRefereeMatchesQueryDto.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1, minimum: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], ListRefereeMatchesQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10, minimum: 1, maximum: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], ListRefereeMatchesQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=list-referee-matches-query.dto.js.map