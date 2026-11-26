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
exports.TeamLineupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const team_lineup_constants_1 = require("./team-lineup.constants");
function readStoredLineup(value) {
    if (!value || typeof value !== 'object')
        return null;
    const record = value;
    if (typeof record.formation !== 'string' || !Array.isArray(record.slots)) {
        return null;
    }
    const slots = record.slots
        .filter((item) => Boolean(item) &&
        typeof item === 'object' &&
        typeof item.slotKey === 'string')
        .map((item) => ({
        slotKey: item.slotKey,
        playerId: typeof item.playerId === 'string' ? item.playerId : null,
    }));
    return {
        formation: record.formation,
        slots,
        updatedBy: typeof record.updatedBy === 'string' ? record.updatedBy : undefined,
        updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : undefined,
    };
}
let TeamLineupService = class TeamLineupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPlayerRegistration(tournamentId, userId) {
        const registrations = await this.prisma.tournament_team_registrations.findMany({
            where: {
                tournament_id: tournamentId,
                request_status: { in: ['approved', 'pending'] },
                teams: {
                    OR: [
                        { captain_user_id: userId },
                        {
                            team_members: {
                                some: { user_id: userId, status: 'active' },
                            },
                        },
                    ],
                },
            },
            include: {
                tournaments: {
                    select: {
                        id: true,
                        name: true,
                        modality: true,
                        associations: {
                            select: { id: true, name: true, logo_url: true },
                        },
                    },
                },
                teams: {
                    select: {
                        id: true,
                        name: true,
                        photo_url: true,
                        primary_color: true,
                        secondary_color: true,
                        captain_user_id: true,
                        users_teams_captain_user_idTousers: {
                            select: { full_name: true },
                        },
                        team_members: {
                            where: { status: 'active' },
                            include: {
                                users: { select: { id: true, full_name: true } },
                            },
                            orderBy: { created_at: 'asc' },
                        },
                    },
                },
                tournament_team_players: {
                    include: {
                        team_members: {
                            include: {
                                users: { select: { id: true, full_name: true } },
                            },
                        },
                    },
                    orderBy: [{ jersey_number: 'asc' }, { player_id: 'asc' }],
                },
            },
            orderBy: { created_at: 'asc' },
        });
        if (registrations.length === 0) {
            throw new common_1.NotFoundException('No perteneces a ningún equipo inscrito en este torneo.');
        }
        return (registrations.find((r) => r.request_status === 'approved') ??
            registrations[0]);
    }
    buildRoster(registration) {
        const usedNumbers = new Set();
        const rawEntries = new Map();
        for (const tp of registration.tournament_team_players) {
            const pid = tp.player_id.toString();
            if (tp.jersey_number !== null) {
                usedNumbers.add(tp.jersey_number);
            }
            rawEntries.set(pid, {
                playerId: pid,
                fullName: tp.team_members.users.full_name,
                jerseyNumber: tp.jersey_number,
                position: tp.position,
                isCaptain: tp.is_captain ||
                    tp.player_id === registration.teams.captain_user_id,
            });
        }
        for (const member of registration.teams.team_members) {
            const pid = member.user_id.toString();
            if (!rawEntries.has(pid)) {
                rawEntries.set(pid, {
                    playerId: pid,
                    fullName: member.users.full_name,
                    jerseyNumber: null,
                    position: null,
                    isCaptain: member.user_id === registration.teams.captain_user_id,
                });
            }
        }
        return [...rawEntries.values()]
            .map((entry) => {
            const isRandom = entry.jerseyNumber === null;
            const jerseyNumber = entry.jerseyNumber ??
                (0, team_lineup_constants_1.assignFallbackJerseyNumber)(`${registration.tournament_id.toString()}:${registration.team_id.toString()}:${entry.playerId}`, usedNumbers);
            return {
                playerId: entry.playerId,
                fullName: entry.fullName,
                firstName: (0, team_lineup_constants_1.extractFirstName)(entry.fullName),
                jerseyNumber,
                isAssignedNumberRandom: isRandom,
                position: entry.position,
                isCaptain: entry.isCaptain,
            };
        })
            .sort((a, b) => a.jerseyNumber - b.jerseyNumber);
    }
    formatResponse(registration, userId) {
        const playersOnPitch = (0, team_lineup_constants_1.parsePlayersOnPitch)(registration.tournaments.modality);
        const availableFormations = [...(0, team_lineup_constants_1.getFormationsForModality)(playersOnPitch)];
        const roster = this.buildRoster(registration);
        const rosterIds = new Set(roster.map((p) => p.playerId));
        const stored = readStoredLineup(registration.lineup);
        const formation = stored && availableFormations.includes(stored.formation)
            ? stored.formation
            : availableFormations[0];
        const expectedKeys = (0, team_lineup_constants_1.buildSlotKeysForFormation)(formation);
        const storedMap = new Map((stored?.slots ?? []).map((s) => [s.slotKey, s.playerId]));
        const assigned = new Set();
        const slots = expectedKeys.map((slotKey) => {
            const candidate = storedMap.get(slotKey) ?? null;
            if (candidate && rosterIds.has(candidate) && !assigned.has(candidate)) {
                assigned.add(candidate);
                return { slotKey, playerId: candidate };
            }
            return { slotKey, playerId: null };
        });
        return {
            tournamentId: registration.tournament_id.toString(),
            tournamentName: registration.tournaments.name,
            association: registration.tournaments.associations
                ? {
                    id: registration.tournaments.associations.id.toString(),
                    name: registration.tournaments.associations.name,
                    logoUrl: registration.tournaments.associations.logo_url,
                }
                : null,
            modality: registration.tournaments.modality,
            playersOnPitch,
            team: {
                id: registration.teams.id.toString(),
                name: registration.teams.name,
                photoUrl: registration.teams.photo_url,
                primaryColor: registration.teams.primary_color || '#1D4ED8',
                secondaryColor: registration.teams.secondary_color || '#F8FAFC',
                captainUserId: registration.teams.captain_user_id.toString(),
                captainName: registration.teams.users_teams_captain_user_idTousers.full_name,
            },
            canEdit: registration.teams.captain_user_id === userId,
            availableFormations,
            formation,
            slots,
            roster,
            updatedAt: stored?.updatedAt ?? null,
        };
    }
    async getMyLineup(tournamentId, userId) {
        const registration = await this.findPlayerRegistration(tournamentId, userId);
        return this.formatResponse(registration, userId);
    }
    async updateMyLineup(tournamentId, userId, dto) {
        const registration = await this.findPlayerRegistration(tournamentId, userId);
        if (registration.teams.captain_user_id !== userId) {
            throw new common_1.ForbiddenException('Solo el capitán del equipo puede organizar la alineación.');
        }
        const playersOnPitch = (0, team_lineup_constants_1.parsePlayersOnPitch)(registration.tournaments.modality);
        const availableFormations = (0, team_lineup_constants_1.getFormationsForModality)(playersOnPitch);
        if (!availableFormations.includes(dto.formation)) {
            throw new common_1.BadRequestException(`La formación ${dto.formation} no es válida para ${registration.tournaments.modality}.`);
        }
        const expectedKeys = (0, team_lineup_constants_1.buildSlotKeysForFormation)(dto.formation);
        const expectedKeySet = new Set(expectedKeys);
        const incomingMap = new Map();
        const usedPlayers = new Set();
        const roster = this.buildRoster(registration);
        const rosterIds = new Set(roster.map((p) => p.playerId));
        for (const slot of dto.slots) {
            if (!expectedKeySet.has(slot.slotKey)) {
                throw new common_1.BadRequestException(`La posición ${slot.slotKey} no corresponde a la formación ${dto.formation}.`);
            }
            if (incomingMap.has(slot.slotKey)) {
                throw new common_1.BadRequestException('Hay posiciones duplicadas en la alineación.');
            }
            const pid = slot.playerId ?? null;
            if (pid !== null) {
                if (!rosterIds.has(pid)) {
                    throw new common_1.BadRequestException('Uno de los jugadores seleccionados no pertenece a tu equipo.');
                }
                if (usedPlayers.has(pid)) {
                    throw new common_1.BadRequestException('Un jugador no puede ocupar más de una posición en cancha.');
                }
                usedPlayers.add(pid);
            }
            incomingMap.set(slot.slotKey, pid);
        }
        const normalizedSlots = expectedKeys.map((slotKey) => ({
            slotKey,
            playerId: incomingMap.get(slotKey) ?? null,
        }));
        const stored = {
            formation: dto.formation,
            slots: normalizedSlots,
            updatedBy: userId.toString(),
            updatedAt: new Date().toISOString(),
        };
        await this.prisma.tournament_team_registrations.update({
            where: {
                tournament_id_team_id: {
                    tournament_id: registration.tournament_id,
                    team_id: registration.team_id,
                },
            },
            data: {
                lineup: JSON.parse(JSON.stringify(stored)),
                updated_at: new Date(),
            },
        });
        const refreshed = await this.findPlayerRegistration(tournamentId, userId);
        return this.formatResponse(refreshed, userId);
    }
};
exports.TeamLineupService = TeamLineupService;
exports.TeamLineupService = TeamLineupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamLineupService);
//# sourceMappingURL=team-lineup.service.js.map