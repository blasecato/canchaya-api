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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createRoleDto) {
        return this.prisma.roles.create({
            data: {
                code: createRoleDto.code,
                name: createRoleDto.name,
                description: createRoleDto.description,
            },
        });
    }
    findAll() {
        return this.prisma.roles.findMany({ orderBy: { code: 'asc' } });
    }
    async findOne(code) {
        const role = await this.prisma.roles.findUnique({ where: { code } });
        if (!role) {
            throw new common_1.NotFoundException(`El rol con código ${code} no existe.`);
        }
        return role;
    }
    update(code, updateRoleDto) {
        return this.prisma.roles.update({
            where: { code },
            data: {
                code: updateRoleDto.code,
                name: updateRoleDto.name,
                description: updateRoleDto.description,
            },
        });
    }
    remove(code) {
        return this.prisma.roles.delete({ where: { code } });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map