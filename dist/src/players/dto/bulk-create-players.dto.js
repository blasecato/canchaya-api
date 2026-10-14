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
exports.BulkCreatePlayersResponseDto = exports.BulkPlayerSkippedDto = exports.BulkCreatePlayersDto = exports.BulkPlayerRowDto = exports.MAX_BULK_PLAYERS = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_gender_constants_1 = require("../../users/user-gender.constants");
exports.MAX_BULK_PLAYERS = 500;
class BulkPlayerRowDto {
    row;
    idNumber;
    documentType;
    fullName;
    birthDate;
    gender;
    email;
    phone;
    static _OPENAPI_METADATA_FACTORY() {
        return { row: { required: true, type: () => Number, minimum: 1 }, idNumber: { required: true, type: () => String, maxLength: 40 }, documentType: { required: true, type: () => String, maxLength: 20 }, fullName: { required: true, type: () => String, maxLength: 160 }, birthDate: { required: true, type: () => String, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, gender: { required: true, enum: ["male", "female", "non_binary", "prefer_not_to_say"], enum: user_gender_constants_1.USER_GENDERS }, email: { required: true, type: () => String, format: "email" }, phone: { required: false, type: () => String, nullable: true, maxLength: 40 } };
    }
}
exports.BulkPlayerRowDto = BulkPlayerRowDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Fila del archivo, para señalar el error donde ocurrió.',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BulkPlayerRowDto.prototype, "row", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CC' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-06-20', format: 'date' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'La fecha de nacimiento debe tener formato AAAA-MM-DD.',
    }),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_gender_constants_1.USER_GENDERS }),
    (0, class_validator_1.IsIn)(user_gender_constants_1.USER_GENDERS, { message: 'El género no es válido.' }),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido.' }),
    __metadata("design:type", String)
], BulkPlayerRowDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", Object)
], BulkPlayerRowDto.prototype, "phone", void 0);
class BulkCreatePlayersDto {
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { players: { required: true, type: () => [require("./bulk-create-players.dto").BulkPlayerRowDto], minItems: 1 } };
    }
}
exports.BulkCreatePlayersDto = BulkCreatePlayersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: BulkPlayerRowDto, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(exports.MAX_BULK_PLAYERS, {
        message: `Puedes cargar máximo ${exports.MAX_BULK_PLAYERS} jugadores por archivo.`,
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkPlayerRowDto),
    __metadata("design:type", Array)
], BulkCreatePlayersDto.prototype, "players", void 0);
class BulkPlayerSkippedDto {
    row;
    idNumber;
    fullName;
    reason;
    detail;
    static _OPENAPI_METADATA_FACTORY() {
        return { row: { required: true, type: () => Number }, idNumber: { required: true, type: () => String }, fullName: { required: true, type: () => String }, reason: { required: true, enum: ["duplicate_document", "duplicate_email", "duplicate_in_file"] }, detail: { required: true, type: () => String } };
    }
}
exports.BulkPlayerSkippedDto = BulkPlayerSkippedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], BulkPlayerSkippedDto.prototype, "row", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    __metadata("design:type", String)
], BulkPlayerSkippedDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    __metadata("design:type", String)
], BulkPlayerSkippedDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['duplicate_document', 'duplicate_email', 'duplicate_in_file'],
    }),
    __metadata("design:type", String)
], BulkPlayerSkippedDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ya existe una cuenta con ese documento.' }),
    __metadata("design:type", String)
], BulkPlayerSkippedDto.prototype, "detail", void 0);
class BulkCreatePlayersResponseDto {
    received;
    created;
    skipped;
    temporaryPassword;
    static _OPENAPI_METADATA_FACTORY() {
        return { received: { required: true, type: () => Number }, created: { required: true, type: () => Number }, skipped: { required: true, type: () => [require("./bulk-create-players.dto").BulkPlayerSkippedDto] }, temporaryPassword: { required: true, type: () => String } };
    }
}
exports.BulkCreatePlayersResponseDto = BulkCreatePlayersResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], BulkCreatePlayersResponseDto.prototype, "received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80 }),
    __metadata("design:type", Number)
], BulkCreatePlayersResponseDto.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BulkPlayerSkippedDto, isArray: true }),
    __metadata("design:type", Array)
], BulkCreatePlayersResponseDto.prototype, "skipped", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Asprofutpi2026*',
        description: 'Clave temporal asignada a los jugadores creados.',
    }),
    __metadata("design:type", String)
], BulkCreatePlayersResponseDto.prototype, "temporaryPassword", void 0);
//# sourceMappingURL=bulk-create-players.dto.js.map