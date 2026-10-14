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
exports.FairPlayController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const fair_play_response_dto_1 = require("./dto/fair-play-response.dto");
const fair_play_service_1 = require("./fair-play.service");
let FairPlayController = class FairPlayController {
    fairPlay;
    constructor(fairPlay) {
        this.fairPlay = fairPlay;
    }
    findByTournament(tournamentId, request) {
        return this.fairPlay.findByTournament(tournamentId, request.auth.userId);
    }
};
exports.FairPlayController = FairPlayController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tabla de juego limpio: tarjetas acumuladas por equipo',
    }),
    (0, swagger_1.ApiOkResponse)({ type: fair_play_response_dto_1.FairPlayResponseDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], FairPlayController.prototype, "findByTournament", null);
exports.FairPlayController = FairPlayController = __decorate([
    (0, swagger_1.ApiTags)('Juego limpio'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tournaments/:tournamentId/fair-play'),
    __metadata("design:paramtypes", [fair_play_service_1.FairPlayService])
], FairPlayController);
//# sourceMappingURL=fair-play.controller.js.map