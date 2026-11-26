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
exports.UpdateTeamLineupDto = exports.TeamLineupSlotDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
class TeamLineupSlotDto {
    slotKey;
    playerId;
    static _OPENAPI_METADATA_FACTORY() {
        return { slotKey: { required: true, type: () => String, maxLength: 20 }, playerId: { required: false, type: () => String, nullable: true } };
    }
}
exports.TeamLineupSlotDto = TeamLineupSlotDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], TeamLineupSlotDto.prototype, "slotKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", Object)
], TeamLineupSlotDto.prototype, "playerId", void 0);
class UpdateTeamLineupDto {
    formation;
    slots;
    static _OPENAPI_METADATA_FACTORY() {
        return { formation: { required: true, type: () => String, maxLength: 20 }, slots: { required: true, type: () => [require("./team-lineup.dto").TeamLineupSlotDto], minItems: 5, maxItems: 11 } };
    }
}
exports.UpdateTeamLineupDto = UpdateTeamLineupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateTeamLineupDto.prototype, "formation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(5),
    (0, class_validator_1.ArrayMaxSize)(11),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TeamLineupSlotDto),
    __metadata("design:type", Array)
], UpdateTeamLineupDto.prototype, "slots", void 0);
//# sourceMappingURL=team-lineup.dto.js.map