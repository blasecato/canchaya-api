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
exports.PlayerCardChargesSummaryDto = exports.TournamentCardDebtDto = exports.UpdateCardChargePaymentDto = exports.TeamCardChargesResponseDto = exports.CardChargeResponseDto = exports.CardChargeItemDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CardChargeItemDto {
    id;
    matchId;
    matchDate;
    cardType;
    quantity;
    unitAmount;
    totalAmount;
    paymentStatus;
    paidAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, matchId: { required: true, type: () => String }, matchDate: { required: true, type: () => String, nullable: true }, cardType: { required: true, enum: ["yellow", "red"] }, quantity: { required: true, type: () => Number }, unitAmount: { required: true, type: () => String }, totalAmount: { required: true, type: () => String }, paymentStatus: { required: true, enum: ["pending", "paid"] }, paidAt: { required: true, type: () => String, nullable: true } };
    }
}
exports.CardChargeItemDto = CardChargeItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '44' }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "matchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CardChargeItemDto.prototype, "matchDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['yellow', 'red'] }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], CardChargeItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000.00' }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "unitAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10000.00' }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['pending', 'paid'] }),
    __metadata("design:type", String)
], CardChargeItemDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CardChargeItemDto.prototype, "paidAt", void 0);
class CardChargeResponseDto {
    playerId;
    playerName;
    currencyCode;
    pendingYellowCards;
    pendingRedCards;
    pendingAmount;
    paidAmount;
    charges;
    static _OPENAPI_METADATA_FACTORY() {
        return { playerId: { required: true, type: () => String }, playerName: { required: true, type: () => String }, currencyCode: { required: true, type: () => String }, pendingYellowCards: { required: true, type: () => Number }, pendingRedCards: { required: true, type: () => Number }, pendingAmount: { required: true, type: () => String }, paidAmount: { required: true, type: () => String }, charges: { required: true, type: () => [require("./card-charge-response.dto").CardChargeItemDto] } };
    }
}
exports.CardChargeResponseDto = CardChargeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9' }),
    __metadata("design:type", String)
], CardChargeResponseDto.prototype, "playerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    __metadata("design:type", String)
], CardChargeResponseDto.prototype, "playerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP' }),
    __metadata("design:type", String)
], CardChargeResponseDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], CardChargeResponseDto.prototype, "pendingYellowCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CardChargeResponseDto.prototype, "pendingRedCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '30000.00' }),
    __metadata("design:type", String)
], CardChargeResponseDto.prototype, "pendingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000.00' }),
    __metadata("design:type", String)
], CardChargeResponseDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CardChargeItemDto, isArray: true }),
    __metadata("design:type", Array)
], CardChargeResponseDto.prototype, "charges", void 0);
class TeamCardChargesResponseDto {
    tournamentId;
    teamId;
    players;
    pendingTotal;
    paidTotal;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, teamId: { required: true, type: () => String }, players: { required: true, type: () => [require("./card-charge-response.dto").CardChargeResponseDto] }, pendingTotal: { required: true, type: () => String }, paidTotal: { required: true, type: () => String } };
    }
}
exports.TeamCardChargesResponseDto = TeamCardChargesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    __metadata("design:type", String)
], TeamCardChargesResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3' }),
    __metadata("design:type", String)
], TeamCardChargesResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CardChargeResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TeamCardChargesResponseDto.prototype, "players", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '45000.00' }),
    __metadata("design:type", String)
], TeamCardChargesResponseDto.prototype, "pendingTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20000.00' }),
    __metadata("design:type", String)
], TeamCardChargesResponseDto.prototype, "paidTotal", void 0);
class UpdateCardChargePaymentDto {
    chargeIds;
    paid;
    static _OPENAPI_METADATA_FACTORY() {
        return { chargeIds: { required: true, type: () => [String], minItems: 1, maxItems: 200 }, paid: { required: true, type: () => Boolean } };
    }
}
exports.UpdateCardChargePaymentDto = UpdateCardChargePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true, example: ['12', '13'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(200),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCardChargePaymentDto.prototype, "chargeIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'true marca pagado, false lo devuelve a pendiente.' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCardChargePaymentDto.prototype, "paid", void 0);
class TournamentCardDebtDto {
    tournamentId;
    tournamentName;
    teamName;
    currencyCode;
    pendingYellowCards;
    pendingRedCards;
    pendingAmount;
    paidAmount;
    charges;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, tournamentName: { required: true, type: () => String }, teamName: { required: true, type: () => String }, currencyCode: { required: true, type: () => String }, pendingYellowCards: { required: true, type: () => Number }, pendingRedCards: { required: true, type: () => Number }, pendingAmount: { required: true, type: () => String }, paidAmount: { required: true, type: () => String }, charges: { required: true, type: () => [require("./card-charge-response.dto").CardChargeItemDto] } };
    }
}
exports.TournamentCardDebtDto = TournamentCardDebtDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa Pitalito' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "tournamentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Galácticos FC' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], TournamentCardDebtDto.prototype, "pendingYellowCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TournamentCardDebtDto.prototype, "pendingRedCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25000.00' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "pendingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000.00' }),
    __metadata("design:type", String)
], TournamentCardDebtDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CardChargeItemDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentCardDebtDto.prototype, "charges", void 0);
class PlayerCardChargesSummaryDto {
    tournaments;
    pendingTotal;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournaments: { required: true, type: () => [require("./card-charge-response.dto").TournamentCardDebtDto] }, pendingTotal: { required: true, type: () => String } };
    }
}
exports.PlayerCardChargesSummaryDto = PlayerCardChargesSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentCardDebtDto, isArray: true }),
    __metadata("design:type", Array)
], PlayerCardChargesSummaryDto.prototype, "tournaments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25000.00' }),
    __metadata("design:type", String)
], PlayerCardChargesSummaryDto.prototype, "pendingTotal", void 0);
//# sourceMappingURL=card-charge-response.dto.js.map