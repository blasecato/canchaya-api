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
exports.TournamentPaymentsResponseDto = exports.TournamentPaymentSummaryResponseDto = exports.MyTournamentPaymentResponseDto = exports.MyTournamentTeamPaymentResponseDto = exports.TournamentRegistrationPaymentResponseDto = exports.RegistrationPaymentUserResponseDto = exports.UpdateRegistrationPaymentDto = exports.REGISTRATION_PAYMENT_STATUSES = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
exports.REGISTRATION_PAYMENT_STATUSES = [
    'unpaid',
    'partial',
    'paid',
];
class UpdateRegistrationPaymentDto {
    paymentStatus;
    amountPaid;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentStatus: { required: true, enum: ["paid", "unpaid", "partial"], enum: exports.REGISTRATION_PAYMENT_STATUSES }, amountPaid: { required: false, type: () => Number, minimum: 0, maximum: 999999999999.99 }, notes: { required: false, type: () => String, nullable: true, maxLength: 1000 } };
    }
}
exports.UpdateRegistrationPaymentDto = UpdateRegistrationPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.REGISTRATION_PAYMENT_STATUSES, example: 'partial' }),
    (0, class_validator_1.IsIn)(exports.REGISTRATION_PAYMENT_STATUSES),
    __metadata("design:type", String)
], UpdateRegistrationPaymentDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 100000,
        minimum: 0,
        description: 'Valor recibido. Es obligatorio únicamente para un pago parcial.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === '' || value === null || value === undefined
        ? undefined
        : Number(value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], UpdateRegistrationPaymentDto.prototype, "amountPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Abono recibido en efectivo en la sede de la asociación.',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", Object)
], UpdateRegistrationPaymentDto.prototype, "notes", void 0);
class RegistrationPaymentUserResponseDto {
    id;
    fullName;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String } };
    }
}
exports.RegistrationPaymentUserResponseDto = RegistrationPaymentUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12', type: String }),
    __metadata("design:type", String)
], RegistrationPaymentUserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laura Gómez' }),
    __metadata("design:type", String)
], RegistrationPaymentUserResponseDto.prototype, "fullName", void 0);
class TournamentRegistrationPaymentResponseDto {
    teamId;
    teamName;
    paymentStatus;
    registrationFee;
    amountPaid;
    balanceDue;
    notes;
    updatedAt;
    updatedBy;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, paymentStatus: { required: true, enum: ["paid", "unpaid", "partial"] }, registrationFee: { required: true, type: () => String }, amountPaid: { required: true, type: () => String }, balanceDue: { required: true, type: () => String }, notes: { required: true, type: () => String, nullable: true }, updatedAt: { required: true, type: () => String, nullable: true }, updatedBy: { required: true, type: () => require("./registration-payment.dto").RegistrationPaymentUserResponseDto, nullable: true } };
    }
}
exports.TournamentRegistrationPaymentResponseDto = TournamentRegistrationPaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ladrillera Fútbol Club' }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.REGISTRATION_PAYMENT_STATUSES }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '150000.00' }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50000.00' }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "amountPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100000.00' }),
    __metadata("design:type", String)
], TournamentRegistrationPaymentResponseDto.prototype, "balanceDue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Object)
], TournamentRegistrationPaymentResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Object)
], TournamentRegistrationPaymentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: RegistrationPaymentUserResponseDto,
        nullable: true,
    }),
    __metadata("design:type", Object)
], TournamentRegistrationPaymentResponseDto.prototype, "updatedBy", void 0);
class MyTournamentTeamPaymentResponseDto {
    teamId;
    teamName;
    paymentStatus;
    registrationFee;
    amountPaid;
    balanceDue;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, paymentStatus: { required: true, enum: ["paid", "unpaid", "partial"] }, registrationFee: { required: true, type: () => String }, amountPaid: { required: true, type: () => String }, balanceDue: { required: true, type: () => String }, updatedAt: { required: true, type: () => String, nullable: true } };
    }
}
exports.MyTournamentTeamPaymentResponseDto = MyTournamentTeamPaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ladrillera Fútbol Club' }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.REGISTRATION_PAYMENT_STATUSES }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '150000.00' }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50000.00' }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "amountPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100000.00' }),
    __metadata("design:type", String)
], MyTournamentTeamPaymentResponseDto.prototype, "balanceDue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Object)
], MyTournamentTeamPaymentResponseDto.prototype, "updatedAt", void 0);
class MyTournamentPaymentResponseDto {
    tournamentId;
    tournamentName;
    currencyCode;
    payment;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, tournamentName: { required: true, type: () => String }, currencyCode: { required: true, type: () => String }, payment: { required: true, type: () => require("./registration-payment.dto").MyTournamentTeamPaymentResponseDto } };
    }
}
exports.MyTournamentPaymentResponseDto = MyTournamentPaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], MyTournamentPaymentResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa Surcolombiana' }),
    __metadata("design:type", String)
], MyTournamentPaymentResponseDto.prototype, "tournamentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP' }),
    __metadata("design:type", String)
], MyTournamentPaymentResponseDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MyTournamentTeamPaymentResponseDto }),
    __metadata("design:type", MyTournamentTeamPaymentResponseDto)
], MyTournamentPaymentResponseDto.prototype, "payment", void 0);
class TournamentPaymentSummaryResponseDto {
    totalTeams;
    paidTeams;
    partialTeams;
    unpaidTeams;
    expectedAmount;
    totalPaid;
    totalBalance;
    allPaid;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalTeams: { required: true, type: () => Number }, paidTeams: { required: true, type: () => Number }, partialTeams: { required: true, type: () => Number }, unpaidTeams: { required: true, type: () => Number }, expectedAmount: { required: true, type: () => String }, totalPaid: { required: true, type: () => String }, totalBalance: { required: true, type: () => String }, allPaid: { required: true, type: () => Boolean } };
    }
}
exports.TournamentPaymentSummaryResponseDto = TournamentPaymentSummaryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], TournamentPaymentSummaryResponseDto.prototype, "totalTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], TournamentPaymentSummaryResponseDto.prototype, "paidTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], TournamentPaymentSummaryResponseDto.prototype, "partialTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TournamentPaymentSummaryResponseDto.prototype, "unpaidTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1200000.00' }),
    __metadata("design:type", String)
], TournamentPaymentSummaryResponseDto.prototype, "expectedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '950000.00' }),
    __metadata("design:type", String)
], TournamentPaymentSummaryResponseDto.prototype, "totalPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '250000.00' }),
    __metadata("design:type", String)
], TournamentPaymentSummaryResponseDto.prototype, "totalBalance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TournamentPaymentSummaryResponseDto.prototype, "allPaid", void 0);
class TournamentPaymentsResponseDto {
    tournamentId;
    tournamentName;
    currencyCode;
    registrationFee;
    canUpdate;
    summary;
    registrations;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, tournamentName: { required: true, type: () => String }, currencyCode: { required: true, type: () => String }, registrationFee: { required: true, type: () => String }, canUpdate: { required: true, type: () => Boolean }, summary: { required: true, type: () => require("./registration-payment.dto").TournamentPaymentSummaryResponseDto }, registrations: { required: true, type: () => [require("./registration-payment.dto").TournamentRegistrationPaymentResponseDto] } };
    }
}
exports.TournamentPaymentsResponseDto = TournamentPaymentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], TournamentPaymentsResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa Surcolombiana' }),
    __metadata("design:type", String)
], TournamentPaymentsResponseDto.prototype, "tournamentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP' }),
    __metadata("design:type", String)
], TournamentPaymentsResponseDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '150000.00' }),
    __metadata("design:type", String)
], TournamentPaymentsResponseDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TournamentPaymentsResponseDto.prototype, "canUpdate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentPaymentSummaryResponseDto }),
    __metadata("design:type", TournamentPaymentSummaryResponseDto)
], TournamentPaymentsResponseDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: TournamentRegistrationPaymentResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], TournamentPaymentsResponseDto.prototype, "registrations", void 0);
//# sourceMappingURL=registration-payment.dto.js.map