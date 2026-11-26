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
exports.CreateCompetitionTemplateDto = exports.AdvanceCompetitionDto = exports.UpdateCompetitionLineupDto = exports.CompetitionSlotAssignmentDto = exports.PreviewCompetitionDto = exports.ReorganizeOptionsDto = exports.REORGANIZE_MODES = exports.CompetitionScheduleDto = exports.StageBlueprintDto = exports.CompetitionConfigDto = void 0;
exports.toStageBlueprint = toStageBlueprint;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const competition_engine_1 = require("./competition.engine");
const competition_pipeline_1 = require("./competition.pipeline");
const is_big_int_string_decorator_1 = require("../common/decorators/is-big-int-string.decorator");
class CompetitionConfigDto {
    format;
    legs;
    groups;
    qualifiers;
    finalLegs;
    extraQualifiers;
    extraQualifierMode;
    static _OPENAPI_METADATA_FACTORY() {
        return { format: { required: true, enum: ["knockout", "league", "league_knockout", "groups_knockout", "league_final", "groups_final"], enum: competition_engine_1.FORMATS }, legs: { required: true, type: () => Number, enum: [1, 2, 3] }, groups: { required: true, type: () => Number, minimum: 1, maximum: 10000 }, qualifiers: { required: true, type: () => Number, minimum: 1, maximum: 10000 }, finalLegs: { required: true, type: () => Number, enum: [1, 2] }, extraQualifiers: { required: false, type: () => Number, minimum: 0, maximum: 32 }, extraQualifierMode: { required: false, enum: ["direct", "play_in"], enum: competition_engine_1.EXTRA_QUALIFIER_MODES } };
    }
}
exports.CompetitionConfigDto = CompetitionConfigDto;
__decorate([
    (0, class_validator_1.IsIn)(competition_engine_1.FORMATS),
    __metadata("design:type", String)
], CompetitionConfigDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsIn)([1, 2, 3]),
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
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    __metadata("design:type", Number)
], CompetitionConfigDto.prototype, "extraQualifiers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_engine_1.EXTRA_QUALIFIER_MODES),
    __metadata("design:type", String)
], CompetitionConfigDto.prototype, "extraQualifierMode", void 0);
class StageBlueprintDto {
    kind;
    label;
    groups;
    legs;
    seeding;
    qualifiersPerGroup;
    extraQualifiers;
    extraQualifierMode;
    thirdPlaceMatch;
    pairing;
    singleRound;
    luckyLosers;
    stopAtTeams;
    static _OPENAPI_METADATA_FACTORY() {
        return { kind: { required: true, enum: ["points", "knockout"], enum: ['points', 'knockout'] }, label: { required: false, type: () => String, maxLength: 80 }, groups: { required: false, type: () => Number, minimum: 1, maximum: 100 }, legs: { required: false, enum: [1, 2, 3], enum: [1, 2, 3] }, seeding: { required: false, enum: ["snake", "random"], enum: competition_pipeline_1.STAGE_SEEDINGS }, qualifiersPerGroup: { required: false, type: () => Number, nullable: true, minimum: 1, maximum: 10000 }, extraQualifiers: { required: false, type: () => Number, minimum: 0, maximum: 32 }, extraQualifierMode: { required: false, enum: ["direct", "play_in"], enum: competition_engine_1.EXTRA_QUALIFIER_MODES }, thirdPlaceMatch: { required: false, type: () => Boolean }, pairing: { required: false, enum: ["random", "seeded", "parallel"], enum: competition_pipeline_1.KNOCKOUT_PAIRINGS }, singleRound: { required: false, type: () => Boolean }, luckyLosers: { required: false, type: () => Number, minimum: 0, maximum: 64 }, stopAtTeams: { required: false, type: () => Number, minimum: 1, maximum: 1024 } };
    }
}
exports.StageBlueprintDto = StageBlueprintDto;
__decorate([
    (0, class_validator_1.IsIn)(['points', 'knockout']),
    __metadata("design:type", String)
], StageBlueprintDto.prototype, "kind", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], StageBlueprintDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], StageBlueprintDto.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([1, 2, 3]),
    __metadata("design:type", Number)
], StageBlueprintDto.prototype, "legs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_pipeline_1.STAGE_SEEDINGS),
    __metadata("design:type", String)
], StageBlueprintDto.prototype, "seeding", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Object)
], StageBlueprintDto.prototype, "qualifiersPerGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    __metadata("design:type", Number)
], StageBlueprintDto.prototype, "extraQualifiers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_engine_1.EXTRA_QUALIFIER_MODES),
    __metadata("design:type", String)
], StageBlueprintDto.prototype, "extraQualifierMode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StageBlueprintDto.prototype, "thirdPlaceMatch", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_pipeline_1.KNOCKOUT_PAIRINGS),
    __metadata("design:type", String)
], StageBlueprintDto.prototype, "pairing", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], StageBlueprintDto.prototype, "singleRound", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(64),
    __metadata("design:type", Number)
], StageBlueprintDto.prototype, "luckyLosers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1024),
    __metadata("design:type", Number)
], StageBlueprintDto.prototype, "stopAtTeams", void 0);
function toStageBlueprint(dto) {
    if (dto.kind === 'knockout') {
        return {
            kind: 'knockout',
            ...(dto.label?.trim() ? { label: dto.label.trim() } : {}),
            thirdPlaceMatch: dto.thirdPlaceMatch ?? true,
            pairing: dto.pairing ?? 'seeded',
            ...(dto.singleRound ? { singleRound: true } : {}),
            ...(dto.singleRound && dto.luckyLosers
                ? { luckyLosers: dto.luckyLosers }
                : {}),
            stopAtTeams: dto.stopAtTeams ?? 1,
        };
    }
    return {
        kind: 'points',
        ...(dto.label?.trim() ? { label: dto.label.trim() } : {}),
        groups: dto.groups ?? 1,
        legs: dto.legs ?? 1,
        seeding: dto.seeding ?? 'snake',
        ...(dto.qualifiersPerGroup !== undefined
            ? { qualifiersPerGroup: dto.qualifiersPerGroup }
            : {}),
        ...(dto.extraQualifiers ? { extraQualifiers: dto.extraQualifiers } : {}),
        ...(dto.extraQualifierMode
            ? { extraQualifierMode: dto.extraQualifierMode }
            : {}),
    };
}
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
exports.REORGANIZE_MODES = ['reset', 'keep_results'];
class ReorganizeOptionsDto {
    mode;
    static _OPENAPI_METADATA_FACTORY() {
        return { mode: { required: true, enum: ["reset", "keep_results"], enum: exports.REORGANIZE_MODES } };
    }
}
exports.ReorganizeOptionsDto = ReorganizeOptionsDto;
__decorate([
    (0, class_validator_1.IsIn)(exports.REORGANIZE_MODES),
    __metadata("design:type", String)
], ReorganizeOptionsDto.prototype, "mode", void 0);
class PreviewCompetitionDto {
    config;
    organizationMode;
    blueprints;
    reorganize;
    schedule;
    seed;
    teamIds;
    changeReason;
    static _OPENAPI_METADATA_FACTORY() {
        return { config: { required: false, type: () => require("./competition.dto").CompetitionConfigDto }, organizationMode: { required: false, enum: ["planned", "on_the_fly"], enum: competition_pipeline_1.ORGANIZATION_MODES }, blueprints: { required: false, type: () => [require("./competition.dto").StageBlueprintDto], minItems: 1, maxItems: 8 }, reorganize: { required: false, type: () => require("./competition.dto").ReorganizeOptionsDto }, schedule: { required: true, type: () => require("./competition.dto").CompetitionScheduleDto }, seed: { required: true, type: () => String, format: "uuid" }, teamIds: { required: true, type: () => [String], uniqueItems: true, maxItems: 10001 }, changeReason: { required: false, type: () => String, maxLength: 1000 } };
    }
}
exports.PreviewCompetitionDto = PreviewCompetitionDto;
__decorate([
    (0, class_validator_1.ValidateIf)((dto) => !dto.blueprints?.length),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CompetitionConfigDto),
    __metadata("design:type", CompetitionConfigDto)
], PreviewCompetitionDto.prototype, "config", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_pipeline_1.ORGANIZATION_MODES),
    __metadata("design:type", String)
], PreviewCompetitionDto.prototype, "organizationMode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(8),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StageBlueprintDto),
    __metadata("design:type", Array)
], PreviewCompetitionDto.prototype, "blueprints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ReorganizeOptionsDto),
    __metadata("design:type", ReorganizeOptionsDto)
], PreviewCompetitionDto.prototype, "reorganize", void 0);
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
class CompetitionSlotAssignmentDto {
    slotId;
    teamId;
    static _OPENAPI_METADATA_FACTORY() {
        return { slotId: { required: true, type: () => String, maxLength: 40 }, teamId: { required: false, type: () => String, nullable: true } };
    }
}
exports.CompetitionSlotAssignmentDto = CompetitionSlotAssignmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CompetitionSlotAssignmentDto.prototype, "slotId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", Object)
], CompetitionSlotAssignmentDto.prototype, "teamId", void 0);
class UpdateCompetitionLineupDto {
    slots;
    confirmPlayedMatches;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { slots: { required: true, type: () => [require("./competition.dto").CompetitionSlotAssignmentDto], maxItems: 10001 }, confirmPlayedMatches: { required: false, type: () => Boolean, enum: [true] }, reason: { required: false, type: () => String, maxLength: 500 } };
    }
}
exports.UpdateCompetitionLineupDto = UpdateCompetitionLineupDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(10001),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CompetitionSlotAssignmentDto),
    __metadata("design:type", Array)
], UpdateCompetitionLineupDto.prototype, "slots", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([true]),
    __metadata("design:type", Boolean)
], UpdateCompetitionLineupDto.prototype, "confirmPlayedMatches", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateCompetitionLineupDto.prototype, "reason", void 0);
class AdvanceCompetitionDto {
    expectedStage;
    schedule;
    finishTournament;
    qualifiersPerGroup;
    extraQualifiers;
    extraQualifierMode;
    nextStage;
    static _OPENAPI_METADATA_FACTORY() {
        return { expectedStage: { required: true, type: () => Number, minimum: 1 }, schedule: { required: true, type: () => require("./competition.dto").CompetitionScheduleDto }, finishTournament: { required: false, type: () => Boolean }, qualifiersPerGroup: { required: false, type: () => Number, minimum: 1, maximum: 10000 }, extraQualifiers: { required: false, type: () => Number, minimum: 0, maximum: 32 }, extraQualifierMode: { required: false, enum: ["direct", "play_in"], enum: competition_engine_1.EXTRA_QUALIFIER_MODES }, nextStage: { required: false, type: () => require("./competition.dto").StageBlueprintDto } };
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
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdvanceCompetitionDto.prototype, "finishTournament", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], AdvanceCompetitionDto.prototype, "qualifiersPerGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    __metadata("design:type", Number)
], AdvanceCompetitionDto.prototype, "extraQualifiers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_engine_1.EXTRA_QUALIFIER_MODES),
    __metadata("design:type", String)
], AdvanceCompetitionDto.prototype, "extraQualifierMode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => StageBlueprintDto),
    __metadata("design:type", StageBlueprintDto)
], AdvanceCompetitionDto.prototype, "nextStage", void 0);
class CreateCompetitionTemplateDto {
    name;
    description;
    mode;
    blueprints;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 120 }, description: { required: false, type: () => String, maxLength: 500 }, mode: { required: false, enum: ["planned", "on_the_fly"], enum: competition_pipeline_1.ORGANIZATION_MODES }, blueprints: { required: false, type: () => [require("./competition.dto").StageBlueprintDto], minItems: 1, maxItems: 8 } };
    }
}
exports.CreateCompetitionTemplateDto = CreateCompetitionTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateCompetitionTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateCompetitionTemplateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(competition_pipeline_1.ORGANIZATION_MODES),
    __metadata("design:type", String)
], CreateCompetitionTemplateDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(8),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StageBlueprintDto),
    __metadata("design:type", Array)
], CreateCompetitionTemplateDto.prototype, "blueprints", void 0);
//# sourceMappingURL=competition.dto.js.map