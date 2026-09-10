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
exports.UpdateDisciplinaryActionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
const create_disciplinary_action_dto_1 = require("./create-disciplinary-action.dto");
class UpdateDisciplinaryActionDto extends (0, swagger_1.PartialType)(create_disciplinary_action_dto_1.CreateDisciplinaryActionDto, { skipNullProperties: false }) {
    decisionStatus;
    decisionNotes;
    static _OPENAPI_METADATA_FACTORY() {
        return { decisionStatus: { required: false, type: () => String, enum: ['reported', 'approved', 'dismissed'] }, decisionNotes: { required: false, type: () => String, nullable: true } };
    }
}
exports.UpdateDisciplinaryActionDto = UpdateDisciplinaryActionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'approved',
        enum: ['reported', 'approved', 'dismissed'],
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['reported', 'approved', 'dismissed']),
    __metadata("design:type", String)
], UpdateDisciplinaryActionDto.prototype, "decisionStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Decisión confirmada.', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateDisciplinaryActionDto.prototype, "decisionNotes", void 0);
//# sourceMappingURL=update-disciplinary-action.dto.js.map