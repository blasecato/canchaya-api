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
exports.UpdateTournamentRulesDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function emptyRulesToNull({ value }) {
    if (typeof value !== 'string')
        return value;
    return value.trim() === '' ? null : value;
}
class UpdateTournamentRulesDto {
    rulesContent;
    static _OPENAPI_METADATA_FACTORY() {
        return { rulesContent: { required: true, type: () => String, nullable: true, maxLength: 100000 } };
    }
}
exports.UpdateTournamentRulesDto = UpdateTournamentRulesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
        nullable: true,
        maxLength: 100_000,
    }),
    (0, class_transformer_1.Transform)(emptyRulesToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100_000),
    __metadata("design:type", Object)
], UpdateTournamentRulesDto.prototype, "rulesContent", void 0);
//# sourceMappingURL=update-tournament-rules.dto.js.map