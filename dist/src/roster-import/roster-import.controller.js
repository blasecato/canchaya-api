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
exports.RosterImportController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const roster_import_dto_1 = require("./dto/roster-import.dto");
const roster_import_result_dto_1 = require("./dto/roster-import-result.dto");
const roster_import_service_1 = require("./roster-import.service");
let RosterImportController = class RosterImportController {
    rosterImport;
    constructor(rosterImport) {
        this.rosterImport = rosterImport;
    }
    import(tournamentId, dto, request) {
        return this.rosterImport.import(tournamentId, dto, request.auth.userId);
    }
};
exports.RosterImportController = RosterImportController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cargar equipos y plantillas desde un archivo de varias hojas',
        description: 'Cada hoja es un equipo. Los jugadores nuevos se crean con una clave temporal; los que ya existen se vinculan al equipo y al torneo.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: roster_import_result_dto_1.RosterImportResultDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, roster_import_dto_1.RosterImportDto, Object]),
    __metadata("design:returntype", Promise)
], RosterImportController.prototype, "import", null);
exports.RosterImportController = RosterImportController = __decorate([
    (0, swagger_1.ApiTags)('Carga masiva de plantillas'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('tournaments/:tournamentId/roster-import'),
    __metadata("design:paramtypes", [roster_import_service_1.RosterImportService])
], RosterImportController);
//# sourceMappingURL=roster-import.controller.js.map