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
exports.CompetitionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const competition_dto_1 = require("./competition.dto");
const competition_service_1 = require("./competition.service");
let CompetitionController = class CompetitionController {
    service;
    constructor(service) {
        this.service = service;
    }
    get(id, req) {
        return this.service.get(id, req.auth.userId);
    }
    options(id, req) {
        return this.service.options(id, req.auth.userId);
    }
    preview(id, req, dto) {
        return this.service.preview(id, req.auth.userId, dto);
    }
    generate(id, req, dto) {
        return this.service.generate(id, req.auth.userId, dto);
    }
    advance(id, req, dto) {
        return this.service.advance(id, req.auth.userId, dto);
    }
};
exports.CompetitionController = CompetitionController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], CompetitionController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('options'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], CompetitionController.prototype, "options", null);
__decorate([
    (0, common_1.Post)('preview'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, competition_dto_1.PreviewCompetitionDto]),
    __metadata("design:returntype", void 0)
], CompetitionController.prototype, "preview", null);
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, competition_dto_1.PreviewCompetitionDto]),
    __metadata("design:returntype", void 0)
], CompetitionController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('advance'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, competition_dto_1.AdvanceCompetitionDto]),
    __metadata("design:returntype", void 0)
], CompetitionController.prototype, "advance", null);
exports.CompetitionController = CompetitionController = __decorate([
    (0, swagger_1.ApiTags)('Competition planning'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, common_1.Controller)('tournaments/:id/competition'),
    __metadata("design:paramtypes", [competition_service_1.CompetitionService])
], CompetitionController);
//# sourceMappingURL=competition.controller.js.map