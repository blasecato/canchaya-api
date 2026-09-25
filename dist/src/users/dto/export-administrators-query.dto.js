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
exports.ExportAdministratorsQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
class ExportAdministratorsQueryDto {
    search;
    role;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String, maxLength: 120 }, role: { required: false, enum: ["SUPER_ADMIN", "ASSOCIATION_ADMIN"], enum: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] }, status: { required: false, enum: ["active", "blocked"], enum: ['active', 'blocked'] } };
    }
}
exports.ExportAdministratorsQueryDto = ExportAdministratorsQueryDto;
__decorate([
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ExportAdministratorsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['SUPER_ADMIN', 'ASSOCIATION_ADMIN']),
    __metadata("design:type", String)
], ExportAdministratorsQueryDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['active', 'blocked'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['active', 'blocked']),
    __metadata("design:type", String)
], ExportAdministratorsQueryDto.prototype, "status", void 0);
//# sourceMappingURL=export-administrators-query.dto.js.map