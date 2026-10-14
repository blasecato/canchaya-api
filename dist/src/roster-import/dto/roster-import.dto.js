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
exports.RosterImportDto = exports.RosterImportTeamDto = exports.RosterImportPlayerDto = exports.DOCUMENT_TYPES = exports.MAX_PLAYERS_PER_SHEET = exports.MAX_SHEETS_PER_IMPORT = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_gender_constants_1 = require("../../users/user-gender.constants");
exports.MAX_SHEETS_PER_IMPORT = 40;
exports.MAX_PLAYERS_PER_SHEET = 60;
exports.DOCUMENT_TYPES = ['CC', 'TI', 'CE', 'PA'];
class RosterImportPlayerDto {
    row;
    fullName;
    email;
    phone;
    documentType;
    idNumber;
    birthDate;
    gender;
    position;
    jerseyNumber;
    isCaptain;
    static _OPENAPI_METADATA_FACTORY() {
        return { row: { required: true, type: () => Number, minimum: 1, maximum: 100000 }, fullName: { required: true, type: () => String, minLength: 3, maxLength: 150 }, email: { required: true, type: () => String, maxLength: 180, format: "email" }, phone: { required: false, type: () => String, maxLength: 40 }, documentType: { required: true, type: () => String, enum: exports.DOCUMENT_TYPES }, idNumber: { required: true, type: () => String, minLength: 4, maxLength: 30 }, birthDate: { required: true, type: () => String }, gender: { required: true, type: () => String, enum: user_gender_constants_1.USER_GENDERS }, position: { required: true, type: () => String, maxLength: 60 }, jerseyNumber: { required: false, type: () => Number, minimum: 0, maximum: 999 }, isCaptain: { required: false, type: () => Boolean } };
    }
}
exports.RosterImportPlayerDto = RosterImportPlayerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Fila del Excel, para ubicar el error.' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100000),
    __metadata("design:type", Number)
], RosterImportPlayerDto.prototype, "row", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria.perez@correo.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido.' }),
    (0, class_validator_1.MaxLength)(180),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3001234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.DOCUMENT_TYPES }),
    (0, class_validator_1.IsIn)(exports.DOCUMENT_TYPES, {
        message: `El tipo de documento debe ser ${exports.DOCUMENT_TYPES.join(', ')}.`,
    }),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-06-20' }),
    (0, class_validator_1.IsISO8601)({ strict: true }, { message: 'La fecha de nacimiento debe tener el formato AAAA-MM-DD.' }),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_gender_constants_1.USER_GENDERS }),
    (0, class_validator_1.IsIn)(user_gender_constants_1.USER_GENDERS, { message: 'El género registrado no es válido.' }),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delantero' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], RosterImportPlayerDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999),
    __metadata("design:type", Number)
], RosterImportPlayerDto.prototype, "jerseyNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RosterImportPlayerDto.prototype, "isCaptain", void 0);
class RosterImportTeamDto {
    sheetName;
    teamName;
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { sheetName: { required: true, type: () => String, minLength: 1, maxLength: 120 }, teamName: { required: true, type: () => String, minLength: 2, maxLength: 120 }, players: { required: true, type: () => [require("./roster-import.dto").RosterImportPlayerDto], minItems: 1 } };
    }
}
exports.RosterImportTeamDto = RosterImportTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Pitalito', description: 'Nombre de la hoja.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], RosterImportTeamDto.prototype, "sheetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Pitalito' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], RosterImportTeamDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RosterImportPlayerDto, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Cada hoja debe traer al menos un jugador.' }),
    (0, class_validator_1.ArrayMaxSize)(exports.MAX_PLAYERS_PER_SHEET, {
        message: `Cada hoja admite máximo ${exports.MAX_PLAYERS_PER_SHEET} jugadores.`,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RosterImportPlayerDto),
    __metadata("design:type", Array)
], RosterImportTeamDto.prototype, "players", void 0);
class RosterImportDto {
    teams;
    static _OPENAPI_METADATA_FACTORY() {
        return { teams: { required: true, type: () => [require("./roster-import.dto").RosterImportTeamDto], minItems: 1 } };
    }
}
exports.RosterImportDto = RosterImportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: RosterImportTeamDto, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'El archivo no trae ninguna hoja con jugadores.' }),
    (0, class_validator_1.ArrayMaxSize)(exports.MAX_SHEETS_PER_IMPORT, {
        message: `Puedes cargar máximo ${exports.MAX_SHEETS_PER_IMPORT} equipos (hojas) por archivo.`,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RosterImportTeamDto),
    __metadata("design:type", Array)
], RosterImportDto.prototype, "teams", void 0);
//# sourceMappingURL=roster-import.dto.js.map