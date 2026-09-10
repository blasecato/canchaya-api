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
exports.ReplaceRefereeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
class ReplaceRefereeDto {
    newRefereeId;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { newRefereeId: { required: true, type: () => String }, reason: { required: false, type: () => String, maxLength: 500 } };
    }
}
exports.ReplaceRefereeDto = ReplaceRefereeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], ReplaceRefereeDto.prototype, "newRefereeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'El árbitro original reportó una novedad.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ReplaceRefereeDto.prototype, "reason", void 0);
//# sourceMappingURL=replace-referee.dto.js.map