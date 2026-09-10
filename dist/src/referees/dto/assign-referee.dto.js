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
exports.AssignRefereeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
class AssignRefereeDto {
    refereeId;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { refereeId: { required: true, type: () => String }, role: { required: true, enum: ["main", "assistant"], enum: ['main', 'assistant'] } };
    }
}
exports.AssignRefereeDto = AssignRefereeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], AssignRefereeDto.prototype, "refereeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['main', 'assistant'], example: 'main' }),
    (0, class_validator_1.IsIn)(['main', 'assistant']),
    __metadata("design:type", String)
], AssignRefereeDto.prototype, "role", void 0);
//# sourceMappingURL=assign-referee.dto.js.map