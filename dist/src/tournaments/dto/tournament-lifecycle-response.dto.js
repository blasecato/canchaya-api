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
exports.TournamentLifecycleResponseDto = exports.TournamentLifecycleEventResponseDto = exports.TournamentTransitionOptionResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const tournament_lifecycle_constants_1 = require("../tournament-lifecycle.constants");
const registration_payment_dto_1 = require("./registration-payment.dto");
class TournamentTransitionOptionResponseDto {
    phase;
    label;
    allowed;
    blockers;
    warnings;
    requiresReason;
    static _OPENAPI_METADATA_FACTORY() {
        return { phase: { required: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"] }, label: { required: true, type: () => String }, allowed: { required: true, type: () => Boolean }, blockers: { required: true, type: () => [String] }, warnings: { required: true, type: () => [String] }, requiresReason: { required: true, type: () => Boolean } };
    }
}
exports.TournamentTransitionOptionResponseDto = TournamentTransitionOptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES }),
    __metadata("design:type", String)
], TournamentTransitionOptionResponseDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Validación' }),
    __metadata("design:type", String)
], TournamentTransitionOptionResponseDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TournamentTransitionOptionResponseDto.prototype, "allowed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true }),
    __metadata("design:type", Array)
], TournamentTransitionOptionResponseDto.prototype, "blockers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        description: 'Advertencias informativas que requieren confirmación, pero no impiden avanzar.',
    }),
    __metadata("design:type", Array)
], TournamentTransitionOptionResponseDto.prototype, "warnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TournamentTransitionOptionResponseDto.prototype, "requiresReason", void 0);
class TournamentLifecycleEventResponseDto {
    id;
    fromPhase;
    toPhase;
    reason;
    createdAt;
    actorUserId;
    actorName;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fromPhase: { required: true, nullable: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"] }, toPhase: { required: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"] }, reason: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => String }, actorUserId: { required: true, type: () => String }, actorName: { required: true, type: () => String } };
    }
}
exports.TournamentLifecycleEventResponseDto = TournamentLifecycleEventResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], TournamentLifecycleEventResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES, nullable: true }),
    __metadata("design:type", Object)
], TournamentLifecycleEventResponseDto.prototype, "fromPhase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES }),
    __metadata("design:type", String)
], TournamentLifecycleEventResponseDto.prototype, "toPhase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], TournamentLifecycleEventResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-06T12:00:00.000Z' }),
    __metadata("design:type", String)
], TournamentLifecycleEventResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10', type: String }),
    __metadata("design:type", String)
], TournamentLifecycleEventResponseDto.prototype, "actorUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laura Gómez' }),
    __metadata("design:type", String)
], TournamentLifecycleEventResponseDto.prototype, "actorName", void 0);
class TournamentLifecycleResponseDto {
    tournamentId;
    currentPhase;
    currentPhaseLabel;
    transitions;
    paymentSummary;
    history;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, currentPhase: { required: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"] }, currentPhaseLabel: { required: true, type: () => String }, transitions: { required: true, type: () => [require("./tournament-lifecycle-response.dto").TournamentTransitionOptionResponseDto] }, paymentSummary: { required: true, type: () => require("./registration-payment.dto").TournamentPaymentSummaryResponseDto }, history: { required: true, type: () => [require("./tournament-lifecycle-response.dto").TournamentLifecycleEventResponseDto] } };
    }
}
exports.TournamentLifecycleResponseDto = TournamentLifecycleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], TournamentLifecycleResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES }),
    __metadata("design:type", String)
], TournamentLifecycleResponseDto.prototype, "currentPhase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Inscripciones' }),
    __metadata("design:type", String)
], TournamentLifecycleResponseDto.prototype, "currentPhaseLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentTransitionOptionResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentLifecycleResponseDto.prototype, "transitions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: registration_payment_dto_1.TournamentPaymentSummaryResponseDto }),
    __metadata("design:type", registration_payment_dto_1.TournamentPaymentSummaryResponseDto)
], TournamentLifecycleResponseDto.prototype, "paymentSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentLifecycleEventResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentLifecycleResponseDto.prototype, "history", void 0);
//# sourceMappingURL=tournament-lifecycle-response.dto.js.map