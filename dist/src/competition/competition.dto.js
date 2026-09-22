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
exports.AdvanceCompetitionDto = exports.PreviewCompetitionDto = exports.CompetitionScheduleDto = exports.CompetitionConfigDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const competition_engine_1 = require("./competition.engine");
const is_big_int_string_decorator_1 = require("../common/decorators/is-big-int-string.decorator");
class CompetitionConfigDto {
    format;
    legs;
    groups;
    qualifiers;
    finalLegs;
    static _OPENAPI_METADATA_FACTORY() {
        return { format: { required: true, enum: ["league", "league_knockout", "knockout", "groups_knockout", "league_final", "groups_final"], enum: competition_engine_1.FORMATS }, legs: { required: true, type: () => Number, enum: [1, 2] }, groups: { required: true, type: () => Number, minimum: 1, maximum: 10000 }, qualifiers: { required: true, type: () => Number, minimum: 1, maximum: 10000 }, finalLegs: { required: true, type: () => Number, enum: [1, 2] } };
    }
}
exports.CompetitionConfigDto = CompetitionConfigDto;
__decorate([
    (0, class_validator_1.IsIn)(competition_engine_1.FORMATS),
    __metadata("design:type", String)
], CompetitionConfigDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsIn)([1, 2]),
    __metadata("design:type", Number)
], CompetitionConfigDto.prototype, "legs", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], CompetitionConfigDto.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], CompetitionConfigDto.prototype, "qualifiers", void 0);
__decorate([
    (0, class_validator_1.IsIn)([1, 2]),
    __metadata("design:type", Number)
], CompetitionConfigDto.prototype, "finalLegs", void 0);
class CompetitionScheduleDto {
    startAt;
    durationMinutes;
    breakMinutes;
    matchesPerDay;
    daysBetweenMatchDays;
    venue;
    static _OPENAPI_METADATA_FACTORY() {
        return { startAt: { required: false, type: () => String }, durationMinutes: { required: true, type: () => Number, minimum: 15, maximum: 240 }, breakMinutes: { required: true, type: () => Number, minimum: 0, maximum: 240 }, matchesPerDay: { required: true, type: () => Number, minimum: 1, maximum: 16 }, daysBetweenMatchDays: { required: true, type: () => Number, minimum: 1, maximum: 30 }, venue: { required: false, type: () => String, maxLength: 200 } };
    }
}
exports.CompetitionScheduleDto = CompetitionScheduleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CompetitionScheduleDto.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(15),
    (0, class_validator_1.Max)(240),
    __metadata("design:type", Number)
], CompetitionScheduleDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(240),
    __metadata("design:type", Number)
], CompetitionScheduleDto.prototype, "breakMinutes", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(16),
    __metadata("design:type", Number)
], CompetitionScheduleDto.prototype, "matchesPerDay", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", Number)
], CompetitionScheduleDto.prototype, "daysBetweenMatchDays", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CompetitionScheduleDto.prototype, "venue", void 0);
class PreviewCompetitionDto {
    config;
    schedule;
    seed;
    teamIds;
    changeReason;
    static _OPENAPI_METADATA_FACTORY() {
        return { config: { required: true, type: () => require("./competition.dto").CompetitionConfigDto }, schedule: { required: true, type: () => require("./competition.dto").CompetitionScheduleDto }, seed: { required: true, type: () => String, format: "uuid" }, teamIds: { required: true, type: () => [String], uniqueItems: true, maxItems: 10001 }, changeReason: { required: false, type: () => String, maxLength: 1000 } };
    }
}
exports.PreviewCompetitionDto = PreviewCompetitionDto;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompetitionConfigDto),
    __metadata("design:type", CompetitionConfigDto)
], PreviewCompetitionDto.prototype, "config", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompetitionScheduleDto),
    __metadata("design:type", CompetitionScheduleDto)
], PreviewCompetitionDto.prototype, "schedule", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PreviewCompetitionDto.prototype, "seed", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(10001),
    (0, class_validator_1.ArrayUnique)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)({ each: true }),
    __metadata("design:type", Array)
], PreviewCompetitionDto.prototype, "teamIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], PreviewCompetitionDto.prototype, "changeReason", void 0);
class AdvanceCompetitionDto {
    expectedStage;
    schedule;
    static _OPENAPI_METADATA_FACTORY() {
        return { expectedStage: { required: true, type: () => Number, minimum: 1 }, schedule: { required: true, type: () => require("./competition.dto").CompetitionScheduleDto } };
    }
}
exports.AdvanceCompetitionDto = AdvanceCompetitionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdvanceCompetitionDto.prototype, "expectedStage", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompetitionScheduleDto),
    __metadata("design:type", CompetitionScheduleDto)
], AdvanceCompetitionDto.prototype, "schedule", void 0);
//# sourceMappingURL=competition.dto.js.map