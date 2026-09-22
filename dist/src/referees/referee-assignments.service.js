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
exports.RefereeAssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
const ACTIVE_ASSIGNMENT_STATUSES = ['pending', 'accepted'];
const REFEREE_ASSIGNMENT_WINDOW_MINUTES = 60;
const ASSIGNABLE_TOURNAMENT_PHASES = [
    'validation',
    'scheduled',
    'in_progress',
];
const assignmentSelect = {
    match_id: true,
    referee_id: true,
    referee_role: true,
    assignment_status: true,
    assigned_by: true,
    responded_at: true,
    response_notes: true,
    replaced_referee_id: true,
    replacement_reason: true,
    created_at: true,
    updated_at: true,
    tournament_referees: {
        select: {
            users: {
                select: {
                    id: true,
                    full_name: true,
                    email: true,
                    photo_url: true,
                },
            },
        },
    },
    matches: {
        select: {
            id: true,
            tournament_id: true,
            match_date: true,
            duration_minutes: true,
            venue: true,
            status: true,
            stage: true,
            tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: {
                select: {
                    teams: { select: { id: true, name: true } },
                    tournaments: { select: { id: true, name: true, phase: true } },
                },
            },
            tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations: { select: { teams: { select: { id: true, name: true } } } },
        },
    },
};
let RefereeAssignmentsService = class RefereeAssignmentsService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async findAssignableMatches(managerId, refereeId) {
        await this.assertActiveReferee(this.prisma, refereeId);
        const manageableTournamentIds = await this.access.findManageableTournamentIds(managerId);
        const now = new Date();
        const matches = await this.prisma.matches.findMany({
            where: {
                tournament_id: manageableTournamentIds === null
                    ? undefined
                    : { in: manageableTournamentIds },
                tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: { tournaments: { phase: { in: [...ASSIGNABLE_TOURNAMENT_PHASES] } } },
                status: { in: ['scheduled', 'postponed', 'in_progress'] },
                match_date: { gte: now },
            },
            orderBy: [{ match_date: 'asc' }, { id: 'asc' }],
            take: 100,
            select: {
                id: true,
                tournament_id: true,
                match_date: true,
                duration_minutes: true,
                venue: true,
                status: true,
                stage: true,
                tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: {
                    select: {
                        teams: { select: { name: true } },
                        tournaments: { select: { name: true, phase: true } },
                    },
                },
                tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations: { select: { teams: { select: { name: true } } } },
                match_referees: {
                    where: { assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] } },
                    select: {
                        referee_id: true,
                        referee_role: true,
                        assignment_status: true,
                        tournament_referees: {
                            select: { users: { select: { full_name: true } } },
                        },
                    },
                },
            },
        });
        return matches.map((match) => ({
            id: match.id.toString(),
            tournamentId: match.tournament_id.toString(),
            tournamentName: match
                .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                .tournaments.name,
            tournamentPhase: match
                .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                .tournaments.phase,
            matchDate: match.match_date?.toISOString() ?? null,
            durationMinutes: match.duration_minutes,
            venue: match.venue,
            status: match.status,
            stage: match.stage,
            homeTeam: match
                .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                .teams.name,
            awayTeam: match
                .tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations
                .teams.name,
            assignments: match.match_referees.map((assignment) => ({
                refereeId: assignment.referee_id.toString(),
                refereeName: assignment.tournament_referees.users.full_name,
                role: assignment.referee_role,
                status: assignment.assignment_status,
            })),
        }));
    }
    async findMatchAssignments(managerId, matchId) {
        await this.access.assertCanManageMatch(managerId, matchId);
        const assignments = await this.prisma.match_referees.findMany({
            where: { match_id: matchId },
            orderBy: [{ created_at: 'asc' }, { referee_id: 'asc' }],
            select: assignmentSelect,
        });
        return assignments.map((assignment) => this.toResponse(assignment));
    }
    async assign(managerId, matchId, dto) {
        const tournamentId = await this.access.assertCanManageMatch(managerId, matchId);
        await this.access.assertTournamentInPhases(tournamentId, ASSIGNABLE_TOURNAMENT_PHASES, 'Los árbitros solo se pueden asignar durante Validación, Programado o En curso.');
        const refereeId = BigInt(dto.refereeId);
        try {
            await this.prisma.$transaction(async (transaction) => {
                const match = await this.findAssignableMatch(transaction, matchId);
                await this.assertActiveReferee(transaction, refereeId);
                await this.assertCanAttend(transaction, refereeId, match.id, match.match_date);
                await this.assertRoleIsAvailable(transaction, match.id, refereeId, dto.role);
                await this.persistPendingAssignment(transaction, match, refereeId, dto.role, managerId);
            }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        }
        catch (error) {
            this.rethrowAssignmentConflict(error);
        }
        return this.findAssignment(matchId, refereeId);
    }
    async respond(refereeId, matchId, dto) {
        const current = await this.prisma.match_referees.findUnique({
            where: {
                match_id_referee_id: { match_id: matchId, referee_id: refereeId },
            },
            select: {
                assignment_status: true,
                tournament_id: true,
                matches: {
                    select: {
                        id: true,
                        match_date: true,
                        duration_minutes: true,
                        status: true,
                        tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: { select: { tournaments: { select: { phase: true } } } },
                    },
                },
            },
        });
        if (!current || current.assignment_status !== 'pending') {
            throw new common_1.NotFoundException('No existe una asignación pendiente para responder en este partido.');
        }
        if (!ASSIGNABLE_TOURNAMENT_PHASES.includes(current.matches
            .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
            .tournaments.phase)) {
            throw new common_1.BadRequestException('Esta asignación ya no se puede responder porque el torneo está cerrado.');
        }
        try {
            await this.prisma.$transaction(async (transaction) => {
                if (dto.status === 'accepted') {
                    await this.assertCanAttend(transaction, refereeId, matchId, current.matches.match_date);
                }
                const changed = await transaction.match_referees.updateMany({
                    where: {
                        match_id: matchId,
                        referee_id: refereeId,
                        assignment_status: 'pending',
                    },
                    data: {
                        assignment_status: dto.status,
                        responded_at: new Date(),
                        response_notes: dto.notes?.trim() || null,
                        updated_at: new Date(),
                    },
                });
                if (changed.count !== 1) {
                    throw new common_1.ConflictException('La asignación ya fue respondida desde otra sesión.');
                }
                await transaction.referee_assignment_events.create({
                    data: {
                        match_id: matchId,
                        referee_id: refereeId,
                        actor_user_id: refereeId,
                        event_type: dto.status,
                        previous_status: 'pending',
                        new_status: dto.status,
                        reason: dto.notes?.trim() || null,
                    },
                });
                await this.notifyTournamentManagers(transaction, current.tournament_id, refereeId, dto.status === 'accepted'
                    ? 'Asignación arbitral aceptada'
                    : 'Asignación arbitral rechazada', dto.status === 'accepted'
                    ? 'El árbitro confirmó su participación en el partido.'
                    : `El árbitro rechazó la asignación${dto.notes?.trim() ? `: ${dto.notes.trim()}` : '.'}`, matchId);
            }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        }
        catch (error) {
            this.rethrowAssignmentConflict(error);
        }
        return this.findAssignment(matchId, refereeId);
    }
    async replace(managerId, matchId, currentRefereeId, dto) {
        const tournamentId = await this.access.assertCanManageMatch(managerId, matchId);
        await this.access.assertTournamentInPhases(tournamentId, ASSIGNABLE_TOURNAMENT_PHASES, 'Los árbitros solo se pueden reemplazar durante Validación, Programado o En curso.');
        const newRefereeId = BigInt(dto.newRefereeId);
        if (newRefereeId === currentRefereeId) {
            throw new common_1.BadRequestException('Selecciona un árbitro diferente para realizar el reemplazo.');
        }
        try {
            await this.prisma.$transaction(async (transaction) => {
                const current = await transaction.match_referees.findUnique({
                    where: {
                        match_id_referee_id: {
                            match_id: matchId,
                            referee_id: currentRefereeId,
                        },
                    },
                    select: { assignment_status: true, referee_role: true },
                });
                if (!current ||
                    !ACTIVE_ASSIGNMENT_STATUSES.includes(current.assignment_status)) {
                    throw new common_1.NotFoundException('La asignación que deseas reemplazar ya no está activa.');
                }
                const match = await this.findAssignableMatch(transaction, matchId);
                await this.assertActiveReferee(transaction, newRefereeId);
                await this.assertCanAttend(transaction, newRefereeId, match.id, match.match_date);
                await this.assertRoleIsAvailable(transaction, match.id, newRefereeId, current.referee_role, currentRefereeId);
                await transaction.match_referees.update({
                    where: {
                        match_id_referee_id: {
                            match_id: matchId,
                            referee_id: currentRefereeId,
                        },
                    },
                    data: {
                        assignment_status: 'replaced',
                        replaced_referee_id: newRefereeId,
                        replacement_reason: dto.reason?.trim() || null,
                        responded_at: new Date(),
                        updated_at: new Date(),
                    },
                });
                await transaction.referee_assignment_events.create({
                    data: {
                        match_id: matchId,
                        referee_id: currentRefereeId,
                        actor_user_id: managerId,
                        event_type: 'replaced',
                        previous_status: current.assignment_status,
                        new_status: 'replaced',
                        reason: dto.reason?.trim() || null,
                    },
                });
                await this.persistPendingAssignment(transaction, match, newRefereeId, current.referee_role, managerId, currentRefereeId, dto.reason);
                await transaction.notifications.create({
                    data: {
                        user_id: currentRefereeId,
                        type: 'match',
                        title: 'Cambio en tu asignación arbitral',
                        message: `Fuiste reemplazado en el partido${dto.reason?.trim() ? `: ${dto.reason.trim()}` : '.'}`,
                        entity_type: 'match',
                        entity_id: matchId.toString(),
                        metadata: {
                            matchId: matchId.toString(),
                            actionUrl: '/my-matches',
                            actionLabel: 'Ver mis partidos',
                        },
                    },
                });
            }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        }
        catch (error) {
            this.rethrowAssignmentConflict(error);
        }
        return this.findAssignment(matchId, newRefereeId);
    }
    async assertActiveAssignmentsCompatible(matchId, matchDate) {
        const assignments = await this.prisma.match_referees.findMany({
            where: {
                match_id: matchId,
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
            },
            select: { referee_id: true },
        });
        for (const assignment of assignments) {
            await this.assertCanAttend(this.prisma, assignment.referee_id, matchId, matchDate);
        }
    }
    async findAssignment(matchId, refereeId) {
        const assignment = await this.prisma.match_referees.findUnique({
            where: {
                match_id_referee_id: { match_id: matchId, referee_id: refereeId },
            },
            select: assignmentSelect,
        });
        if (!assignment) {
            throw new common_1.NotFoundException('La asignación arbitral no existe.');
        }
        return this.toResponse(assignment);
    }
    async findAssignableMatch(client, matchId) {
        const match = await client.matches.findUnique({
            where: { id: matchId },
            select: {
                id: true,
                tournament_id: true,
                match_date: true,
                duration_minutes: true,
                venue: true,
                status: true,
                tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: {
                    select: {
                        tournaments: { select: { name: true, phase: true } },
                    },
                },
            },
        });
        if (!match)
            throw new common_1.NotFoundException('El partido no existe.');
        const tournament = match
            .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
            .tournaments;
        if (!ASSIGNABLE_TOURNAMENT_PHASES.includes(tournament.phase)) {
            throw new common_1.BadRequestException('El torneo no permite gestionar árbitros en su fase actual.');
        }
        if (['played', 'cancelled'].includes(match.status)) {
            throw new common_1.BadRequestException('No se pueden asignar árbitros a un partido finalizado o cancelado.');
        }
        if (!match.match_date) {
            throw new common_1.BadRequestException('Define la fecha y la hora del partido antes de asignar árbitros.');
        }
        return { ...match, tournaments: tournament };
    }
    async assertActiveReferee(client, refereeId) {
        const referee = await client.users.findFirst({
            where: {
                id: refereeId,
                status: 'active',
                user_roles: { some: { role_code: 'REFEREE' } },
            },
            select: { id: true },
        });
        if (!referee) {
            throw new common_1.BadRequestException('El usuario seleccionado no es un árbitro activo.');
        }
    }
    async assertCanAttend(client, refereeId, matchId, startsAt) {
        if (!startsAt) {
            throw new common_1.BadRequestException('El partido debe tener fecha y hora para validar la disponibilidad.');
        }
        const endsAt = new Date(startsAt.getTime() + REFEREE_ASSIGNMENT_WINDOW_MINUTES * 60_000);
        const otherAssignments = await client.match_referees.findMany({
            where: {
                referee_id: refereeId,
                match_id: { not: matchId },
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                matches: { match_date: { not: null } },
            },
            select: {
                match_id: true,
                matches: {
                    select: { match_date: true, duration_minutes: true },
                },
            },
        });
        const conflict = otherAssignments.find(({ matches }) => {
            if (!matches.match_date)
                return false;
            const otherEnd = new Date(matches.match_date.getTime() +
                REFEREE_ASSIGNMENT_WINDOW_MINUTES * 60_000);
            return matches.match_date < endsAt && otherEnd > startsAt;
        });
        if (conflict) {
            throw new common_1.ConflictException(`El árbitro ya tiene una asignación que se cruza con este horario (partido ${conflict.match_id.toString()}).`);
        }
    }
    async assertRoleIsAvailable(client, matchId, refereeId, role, replacingRefereeId) {
        const duplicate = await client.match_referees.findFirst({
            where: {
                match_id: matchId,
                referee_id: refereeId,
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
            },
            select: { referee_id: true },
        });
        if (duplicate) {
            throw new common_1.ConflictException('Este árbitro ya tiene una asignación activa en el partido.');
        }
        if (role !== 'main')
            return;
        const main = await client.match_referees.findFirst({
            where: {
                match_id: matchId,
                referee_role: 'main',
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                referee_id: replacingRefereeId
                    ? { not: replacingRefereeId }
                    : undefined,
            },
            select: { referee_id: true },
        });
        if (main) {
            throw new common_1.ConflictException('El partido ya tiene un árbitro principal pendiente o confirmado.');
        }
    }
    async persistPendingAssignment(transaction, match, refereeId, role, managerId, replacedRefereeId, reason) {
        const previousAssignment = await transaction.match_referees.findUnique({
            where: {
                match_id_referee_id: { match_id: match.id, referee_id: refereeId },
            },
            select: { assignment_status: true },
        });
        await transaction.tournament_referees.upsert({
            where: {
                tournament_id_user_id: {
                    tournament_id: match.tournament_id,
                    user_id: refereeId,
                },
            },
            create: {
                tournament_id: match.tournament_id,
                user_id: refereeId,
                status: 'active',
            },
            update: { status: 'active' },
        });
        if (previousAssignment) {
            await transaction.match_referees.update({
                where: {
                    match_id_referee_id: { match_id: match.id, referee_id: refereeId },
                },
                data: {
                    referee_role: role,
                    assignment_status: 'pending',
                    assigned_by: managerId,
                    responded_at: null,
                    response_notes: null,
                    replaced_referee_id: replacedRefereeId,
                    replacement_reason: reason?.trim() || null,
                    updated_at: new Date(),
                },
            });
        }
        else {
            await transaction.match_referees.create({
                data: {
                    match_id: match.id,
                    tournament_id: match.tournament_id,
                    referee_id: refereeId,
                    referee_role: role,
                    assignment_status: 'pending',
                    assigned_by: managerId,
                    replaced_referee_id: replacedRefereeId,
                    replacement_reason: reason?.trim() || null,
                },
            });
        }
        await transaction.referee_assignment_events.create({
            data: {
                match_id: match.id,
                referee_id: refereeId,
                actor_user_id: managerId,
                event_type: 'assigned',
                previous_status: previousAssignment?.assignment_status ?? null,
                new_status: 'pending',
                reason: reason?.trim() || null,
            },
        });
        const dateLabel = new Intl.DateTimeFormat('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota',
        }).format(match.match_date);
        await transaction.notifications.create({
            data: {
                user_id: refereeId,
                type: 'match',
                title: 'Nueva asignación arbitral',
                message: `Te asignaron como ${role === 'main' ? 'árbitro principal' : 'árbitro asistente'} en ${match.tournaments.name}, el ${dateLabel}${match.venue ? ` en ${match.venue}` : ''}. Confirma si puedes asistir.`,
                entity_type: 'match_referee',
                entity_id: `${match.id.toString()}:${refereeId.toString()}`,
                metadata: {
                    matchId: match.id.toString(),
                    tournamentId: match.tournament_id.toString(),
                    assignmentStatus: 'pending',
                    actionUrl: '/my-matches',
                    actionLabel: 'Responder asignación',
                },
            },
        });
    }
    async notifyTournamentManagers(transaction, tournamentId, actorId, title, message, matchId) {
        const tournament = await transaction.tournaments.findUnique({
            where: { id: tournamentId },
            select: {
                created_by: true,
                associations: {
                    select: {
                        owner_user_id: true,
                        association_administrators: {
                            where: { status: 'active' },
                            select: { user_id: true },
                        },
                    },
                },
                tournament_administrators: {
                    where: { status: 'active' },
                    select: { user_id: true },
                },
            },
        });
        if (!tournament)
            return;
        const recipients = new Set([
            tournament.created_by,
            tournament.associations.owner_user_id,
            ...tournament.associations.association_administrators.map(({ user_id }) => user_id),
            ...tournament.tournament_administrators.map(({ user_id }) => user_id),
        ]);
        recipients.delete(actorId);
        if (recipients.size === 0)
            return;
        await transaction.notifications.createMany({
            data: [...recipients].map((userId) => ({
                user_id: userId,
                type: 'match',
                title,
                message,
                entity_type: 'match',
                entity_id: matchId.toString(),
                metadata: {
                    matchId: matchId.toString(),
                    actionUrl: '/referees',
                    actionLabel: 'Gestionar árbitros',
                },
            })),
        });
    }
    toResponse(assignment) {
        const match = assignment.matches;
        return {
            matchId: assignment.match_id.toString(),
            refereeId: assignment.referee_id.toString(),
            refereeRole: assignment.referee_role,
            assignmentStatus: assignment.assignment_status,
            assignedBy: assignment.assigned_by?.toString() ?? null,
            respondedAt: assignment.responded_at?.toISOString() ?? null,
            responseNotes: assignment.response_notes,
            replacementReason: assignment.replacement_reason,
            createdAt: assignment.created_at.toISOString(),
            updatedAt: assignment.updated_at.toISOString(),
            referee: {
                id: assignment.tournament_referees.users.id.toString(),
                fullName: assignment.tournament_referees.users.full_name,
                email: assignment.tournament_referees.users.email,
                photoUrl: assignment.tournament_referees.users.photo_url,
            },
            match: {
                id: match.id.toString(),
                tournamentId: match.tournament_id.toString(),
                tournamentName: match
                    .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                    .tournaments.name,
                tournamentPhase: match
                    .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                    .tournaments.phase,
                matchDate: match.match_date?.toISOString() ?? null,
                durationMinutes: match.duration_minutes,
                venue: match.venue,
                status: match.status,
                stage: match.stage,
                homeTeam: {
                    id: match.tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations.teams.id.toString(),
                    name: match
                        .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                        .teams.name,
                },
                awayTeam: {
                    id: match.tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations.teams.id.toString(),
                    name: match
                        .tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations
                        .teams.name,
                },
            },
        };
    }
    rethrowAssignmentConflict(error) {
        if (error instanceof common_1.BadRequestException ||
            error instanceof common_1.ConflictException ||
            error instanceof common_1.NotFoundException) {
            throw error;
        }
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            (error.code === 'P2002' || error.code === 'P2034')) {
            throw new common_1.ConflictException('La asignación cambió al mismo tiempo desde otra sesión. Actualiza la información e inténtalo de nuevo.');
        }
        throw error;
    }
};
exports.RefereeAssignmentsService = RefereeAssignmentsService;
exports.RefereeAssignmentsService = RefereeAssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], RefereeAssignmentsService);
//# sourceMappingURL=referee-assignments.service.js.map