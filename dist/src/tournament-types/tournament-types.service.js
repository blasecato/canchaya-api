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
exports.TournamentTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tournamentTypeSelect = {
    id: true,
    name: true,
    description: true,
    min_players_per_team: true,
    max_players_per_team: true,
    instructions: true,
    created_at: true,
    updated_at: true,
    _count: { select: { tournaments: true } },
};
let TournamentTypesService = class TournamentTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        this.assertPlayerRange(dto.minPlayersPerTeam, dto.maxPlayersPerTeam);
        await this.assertUniqueName(dto.name);
        const tournamentType = await this.prisma.tournament_types.create({
            data: {
                name: dto.name,
                description: dto.description ?? null,
                min_players_per_team: dto.minPlayersPerTeam,
                max_players_per_team: dto.maxPlayersPerTeam,
                instructions: dto.instructions ?? null,
            },
            select: tournamentTypeSelect,
        });
        return this.toResponse(tournamentType);
    }
    async findAll() {
        const tournamentTypes = await this.prisma.tournament_types.findMany({
            orderBy: [{ name: 'asc' }, { id: 'asc' }],
            select: tournamentTypeSelect,
        });
        return tournamentTypes.map((item) => this.toResponse(item));
    }
    async findOne(id) {
        return this.toResponse(await this.findRecord(id));
    }
    async update(id, dto) {
        const current = await this.findRecord(id);
        const minimum = dto.minPlayersPerTeam ?? current.min_players_per_team;
        const maximum = dto.maxPlayersPerTeam ?? current.max_players_per_team;
        this.assertPlayerRange(minimum, maximum);
        await this.assertExistingTournamentsFitRange(id, minimum, maximum);
        if (dto.name && dto.name !== current.name) {
            await this.assertUniqueName(dto.name, id);
        }
        const tournamentType = await this.prisma.tournament_types.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
                min_players_per_team: dto.minPlayersPerTeam,
                max_players_per_team: dto.maxPlayersPerTeam,
                instructions: dto.instructions,
                updated_at: new Date(),
            },
            select: tournamentTypeSelect,
        });
        return this.toResponse(tournamentType);
    }
    async remove(id) {
        const current = await this.findRecord(id);
        if (current._count.tournaments > 0) {
            throw new common_1.BadRequestException(`No se puede eliminar porque ${current._count.tournaments} torneo(s) utilizan este tipo.`);
        }
        await this.prisma.tournament_types.delete({ where: { id } });
        return this.toResponse(current);
    }
    async findRecord(id) {
        const tournamentType = await this.prisma.tournament_types.findUnique({
            where: { id },
            select: tournamentTypeSelect,
        });
        if (!tournamentType) {
            throw new common_1.NotFoundException(`El tipo de torneo con ID ${id.toString()} no existe.`);
        }
        return tournamentType;
    }
    assertPlayerRange(minimum, maximum) {
        if (minimum > maximum) {
            throw new common_1.BadRequestException('El mínimo de jugadores no puede ser mayor que el máximo.');
        }
    }
    async assertUniqueName(name, excludedId) {
        const duplicate = await this.prisma.tournament_types.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                ...(excludedId ? { id: { not: excludedId } } : {}),
            },
            select: { id: true },
        });
        if (duplicate) {
            throw new common_1.ConflictException('Ya existe un tipo de torneo con ese nombre.');
        }
    }
    async assertExistingTournamentsFitRange(tournamentTypeId, minimum, maximum) {
        const incompatibleTournament = await this.prisma.tournaments.findFirst({
            where: {
                tournament_type_id: tournamentTypeId,
                OR: [
                    { min_players_per_team: { lt: minimum } },
                    { max_players_per_team: { gt: maximum } },
                ],
            },
            orderBy: { id: 'asc' },
            select: {
                name: true,
                min_players_per_team: true,
                max_players_per_team: true,
            },
        });
        if (incompatibleTournament) {
            throw new common_1.BadRequestException(`No puedes aplicar ese rango porque ${incompatibleTournament.name} está configurado entre ${incompatibleTournament.min_players_per_team} y ${incompatibleTournament.max_players_per_team} jugadores.`);
        }
    }
    toResponse(tournamentType) {
        return {
            id: tournamentType.id.toString(),
            name: tournamentType.name,
            description: tournamentType.description,
            minPlayersPerTeam: tournamentType.min_players_per_team,
            maxPlayersPerTeam: tournamentType.max_players_per_team,
            instructions: tournamentType.instructions,
            tournamentCount: tournamentType._count.tournaments,
            createdAt: tournamentType.created_at.toISOString(),
            updatedAt: tournamentType.updated_at.toISOString(),
        };
    }
};
exports.TournamentTypesService = TournamentTypesService;
exports.TournamentTypesService = TournamentTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TournamentTypesService);
//# sourceMappingURL=tournament-types.service.js.map