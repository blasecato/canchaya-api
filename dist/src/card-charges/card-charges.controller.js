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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardChargesController = exports.MyCardChargesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const card_charges_service_1 = require("./card-charges.service");
const card_charge_response_dto_1 = require("./dto/card-charge-response.dto");
let MyCardChargesController = class MyCardChargesController {
    cardCharges;
    constructor(cardCharges) {
        this.cardCharges = cardCharges;
    }
    findMine(request) {
        return this.cardCharges.findMyCharges(request.auth.userId);
    }
};
exports.MyCardChargesController = MyCardChargesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar mis tarjetas pendientes de pago' }),
    (0, swagger_1.ApiOkResponse)({ type: card_charge_response_dto_1.PlayerCardChargesSummaryDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyCardChargesController.prototype, "findMine", null);
exports.MyCardChargesController = MyCardChargesController = __decorate([
    (0, swagger_1.ApiTags)('Cobros por tarjetas'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('me/card-charges'),
    __metadata("design:paramtypes", [card_charges_service_1.CardChargesService])
], MyCardChargesController);
let CardChargesController = class CardChargesController {
    cardCharges;
    constructor(cardCharges) {
        this.cardCharges = cardCharges;
    }
    findByTeam(tournamentId, teamId, request) {
        return this.cardCharges.findByTeam(tournamentId, teamId, request.auth.userId);
    }
    updatePayment(tournamentId, dto, request) {
        return this.cardCharges.updatePayment(tournamentId, dto.chargeIds.map((id) => BigInt(id)), dto.paid, request.auth.userId);
    }
};
exports.CardChargesController = CardChargesController;
__decorate([
    (0, common_1.Get)('teams/:teamId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar las tarjetas por cobrar de un equipo en el torneo',
    }),
    (0, swagger_1.ApiOkResponse)({ type: card_charge_response_dto_1.TeamCardChargesResponseDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('teamId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", Promise)
], CardChargesController.prototype, "findByTeam", null);
__decorate([
    (0, common_1.Patch)('payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar cobros como pagados o devolverlos a pendiente' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, card_charge_response_dto_1.UpdateCardChargePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], CardChargesController.prototype, "updatePayment", null);
exports.CardChargesController = CardChargesController = __decorate([
    (0, swagger_1.ApiTags)('Cobros por tarjetas'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('tournaments/:tournamentId/card-charges'),
    __metadata("design:paramtypes", [card_charges_service_1.CardChargesService])
], CardChargesController);
//# sourceMappingURL=card-charges.controller.js.map