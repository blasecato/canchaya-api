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
exports.ListAssociationTournamentsQueryDto = exports.ASSOCIATION_TOURNAMENT_SCOPES = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.ASSOCIATION_TOURNAMENT_SCOPES = [
    'available',
    'management',
];
function trimString({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
class ListAssociationTournamentsQueryDto {
    scope;
    static _OPENAPI_METADATA_FACTORY() {
        return { scope: { required: false, enum: ["available", "management"], enum: exports.ASSOCIATION_TOURNAMENT_SCOPES } };
    }
}
exports.ListAssociationTournamentsQueryDto = ListAssociationTournamentsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: exports.ASSOCIATION_TOURNAMENT_SCOPES,
        default: 'available',
        description: 'management incluye borradores, inactivos, finalizados y cancelados, y requiere permisos de administración.',
    }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.ASSOCIATION_TOURNAMENT_SCOPES),
    __metadata("design:type", String)
], ListAssociationTournamentsQueryDto.prototype, "scope", void 0);
//# sourceMappingURL=list-association-tournaments-query.dto.js.map