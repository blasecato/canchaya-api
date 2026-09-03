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
exports.AssociationDetailResponseDto = exports.AssociationPermissionsResponseDto = exports.ASSOCIATION_PERMISSION_LEVELS = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const association_response_dto_1 = require("./association-response.dto");
exports.ASSOCIATION_PERMISSION_LEVELS = [
    'super_admin',
    'owner',
    'administrator',
    'editor',
    'viewer',
];
class AssociationPermissionsResponseDto {
    canEdit;
    canManageOwner;
    canManageTournaments;
    isOwner;
    permissionLevel;
    static _OPENAPI_METADATA_FACTORY() {
        return { canEdit: { required: true, type: () => Boolean }, canManageOwner: { required: true, type: () => Boolean }, canManageTournaments: { required: true, type: () => Boolean }, isOwner: { required: true, type: () => Boolean }, permissionLevel: { required: true, enum: ["owner", "super_admin", "administrator", "editor", "viewer"] } };
    }
}
exports.AssociationPermissionsResponseDto = AssociationPermissionsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AssociationPermissionsResponseDto.prototype, "canEdit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Solo SUPER_ADMIN puede cambiar al propietario de una asociación.',
    }),
    __metadata("design:type", Boolean)
], AssociationPermissionsResponseDto.prototype, "canManageOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Permite crear y administrar torneos dentro de la asociación.',
    }),
    __metadata("design:type", Boolean)
], AssociationPermissionsResponseDto.prototype, "canManageTournaments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AssociationPermissionsResponseDto.prototype, "isOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.ASSOCIATION_PERMISSION_LEVELS, example: 'owner' }),
    __metadata("design:type", String)
], AssociationPermissionsResponseDto.prototype, "permissionLevel", void 0);
class AssociationDetailResponseDto extends association_response_dto_1.AssociationResponseDto {
    permissions;
    static _OPENAPI_METADATA_FACTORY() {
        return { permissions: { required: true, type: () => require("./association-detail-response.dto").AssociationPermissionsResponseDto } };
    }
}
exports.AssociationDetailResponseDto = AssociationDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: AssociationPermissionsResponseDto }),
    __metadata("design:type", AssociationPermissionsResponseDto)
], AssociationDetailResponseDto.prototype, "permissions", void 0);
//# sourceMappingURL=association-detail-response.dto.js.map