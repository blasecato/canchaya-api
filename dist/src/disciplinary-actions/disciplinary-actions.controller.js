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
exports.DisciplinaryActionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_disciplinary_action_dto_1 = require("./dto/create-disciplinary-action.dto");
const update_disciplinary_action_dto_1 = require("./dto/update-disciplinary-action.dto");
const disciplinary_actions_service_1 = require("./disciplinary-actions.service");
let DisciplinaryActionsController = class DisciplinaryActionsController {
    disciplinaryActionsService;
    constructor(disciplinaryActionsService) {
        this.disciplinaryActionsService = disciplinaryActionsService;
    }
    create(createDisciplinaryActionDto) {
        return this.disciplinaryActionsService.create(createDisciplinaryActionDto);
    }
    findAll() {
        return this.disciplinaryActionsService.findAll();
    }
    findOne(id) {
        return this.disciplinaryActionsService.findOne(id);
    }
    update(id, updateDisciplinaryActionDto) {
        return this.disciplinaryActionsService.update(id, updateDisciplinaryActionDto);
    }
    remove(id) {
        return this.disciplinaryActionsService.remove(id);
    }
};
exports.DisciplinaryActionsController = DisciplinaryActionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una acción disciplinaria' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Acción disciplinaria registrada correctamente.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_disciplinary_action_dto_1.CreateDisciplinaryActionDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las acciones disciplinarias' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de acciones disciplinarias.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar una acción disciplinaria por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Acción disciplinaria encontrada.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una acción disciplinaria' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Acción disciplinaria actualizada correctamente.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, update_disciplinary_action_dto_1.UpdateDisciplinaryActionDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una acción disciplinaria' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Acción disciplinaria eliminada correctamente.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "remove", null);
exports.DisciplinaryActionsController = DisciplinaryActionsController = __decorate([
    (0, swagger_1.ApiTags)('Disciplinary actions'),
    (0, common_1.Controller)('disciplinary-actions'),
    __metadata("design:paramtypes", [disciplinary_actions_service_1.DisciplinaryActionsService])
], DisciplinaryActionsController);
//# sourceMappingURL=disciplinary-actions.controller.js.map