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
exports.TournamentLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
const tournament_lifecycle_constants_1 = require("./tournament-lifecycle.constants");
const tournament_eligibility_1 = require("./tournament-eligibility");
let TournamentLifecycleService = class TournamentLifecycleService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async findLifecycle(tournamentId, requestingUserId) {
        await this.access.assertCanManageTournament(requestingUserId, tournamentId);
        const snapshot = await this.findSnapshot(this.prisma, tournamentId);
        const history = await this.prisma.tournament_lifecycle_events.findMany({
            where: { tournament_id: tournamentId },
            orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
            select: {
                id: true,
                from_phase: true,
                to_phase: true,
                reason: true,
                created_at: true,
                actor_user_id: true,
                actor: { select: { full_name: true } },
            },
        });
        return {
            tournamentId: tournamentId.toString(),
            currentPhase: snapshot.phase,
            currentPhaseLabel: tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS[snapshot.phase],
            transitions: this.buildTransitionOptions(snapshot),
            paymentSummary: this.buildPaymentSummary(snapshot),
            history: history.map((event) => ({
                id: event.id.toString(),
                fromPhase: this.toNullablePhase(event.from_phase),
                toPhase: this.toPhase(event.to_phase),
                reason: event.reason,
                createdAt: event.created_at.toISOString(),
                actorUserId: event.actor_user_id.toString(),
                actorName: event.actor.full_name,
            })),
        };
    }
    async transition(tournamentId, requestingUserId, dto) {
        await this.access.assertCanManageTournament(requestingUserId, tournamentId);
        const reason = dto.reason?.trim() || null;
        await this.prisma.$transaction(async (transaction) => {
            const snapshot = await this.findSnapshot(transaction, tournamentId);
            const option = this.buildTransitionOptions(snapshot).find(({ phase }) => phase === dto.phase);
            if (!option) {
                throw new common_1.BadRequestException(`No se puede pasar de ${tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS[snapshot.phase]} a ${tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS[dto.phase]}.`);
            }
            if (option.requiresReason && !reason) {
                throw new common_1.BadRequestException('Debes indicar el motivo para cancelar el torneo.');
            }
            if (!option.allowed) {
                throw new common_1.BadRequestException({
                    message: 'El torneo todavía no cumple los requisitos de esta fase.',
                    blockers: option.blockers,
                });
            }
            const updated = await transaction.tournaments.updateMany({
                where: { id: tournamentId, phase: snapshot.phase },
                data: {
                    phase: dto.phase,
                    status: ['archived', 'cancelled'].includes(dto.phase)
                        ? 'inactive'
                        : undefined,
                    updated_at: new Date(),
                },
            });
            if (updated.count !== 1) {
                throw new common_1.ConflictException('El torneo cambió mientras realizabas la operación. Actualiza la página e inténtalo de nuevo.');
            }
            await transaction.tournament_lifecycle_events.create({
                data: {
                    tournament_id: tournamentId,
                    actor_user_id: requestingUserId,
                    from_phase: snapshot.phase,
                    to_phase: dto.phase,
                    reason,
                },
            });
            await this.notifyLifecycleChange(transaction, snapshot, dto.phase, requestingUserId, reason);
        }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        return this.findLifecycle(tournamentId, requestingUserId);
    }
    buildTransitionOptions(snapshot) {
        const options = [];
        const nextPhase = tournament_lifecycle_constants_1.TOURNAMENT_FORWARD_TRANSITIONS[snapshot.phase];
        if (nextPhase) {
            const blockers = this.findBlockers(snapshot, nextPhase);
            options.push({
                phase: nextPhase,
                label: tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS[nextPhase],
                allowed: blockers.length === 0,
                blockers,
                warnings: this.findWarnings(snapshot, nextPhase),
                requiresReason: false,
            });
        }
        if (tournament_lifecycle_constants_1.TOURNAMENT_CANCELLABLE_PHASES.includes(snapshot.phase)) {
            options.push({
                phase: 'cancelled',
                label: tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS.cancelled,
                allowed: true,
                blockers: [],
                warnings: [],
                requiresReason: true,
            });
        }
        return options;
    }
    findWarnings(snapshot, targetPhase) {
        if (targetPhase !== 'in_progress')
            return [];
        const summary = this.buildPaymentSummary(snapshot);
        const teamsWithBalance = summary.partialTeams + summary.unpaidTeams;
        if (teamsWithBalance === 0)
            return [];
        return [
            `${teamsWithBalance} de ${summary.totalTeams} equipos aprobados todavía tienen saldo pendiente por ${this.formatAmount(summary.totalBalance, snapshot.currencyCode)}. Esto no impide iniciar el torneo, pero la deuda seguirá registrada.`,
        ];
    }
    buildPaymentSummary(snapshot) {
        const approved = snapshot.registrations.filter(({ status }) => status === 'approved');
        const paidTeams = approved.filter(({ paymentStatus }) => paymentStatus === 'paid').length;
        const partialTeams = approved.filter(({ paymentStatus }) => paymentStatus === 'partial').length;
        const unpaidTeams = approved.filter(({ paymentStatus }) => paymentStatus === 'unpaid').length;
        const expectedAmount = snapshot.registrationFee.mul(approved.length);
        const totalPaid = approved.reduce((total, registration) => total.plus(registration.amountPaid), new client_1.Prisma.Decimal(0));
        const calculatedBalance = expectedAmount.minus(totalPaid);
        const totalBalance = calculatedBalance.isNegative()
            ? new client_1.Prisma.Decimal(0)
            : calculatedBalance;
        return {
            totalTeams: approved.length,
            paidTeams,
            partialTeams,
            unpaidTeams,
            expectedAmount: expectedAmount.toFixed(2),
            totalPaid: totalPaid.toFixed(2),
            totalBalance: totalBalance.toFixed(2),
            allPaid: partialTeams === 0 && unpaidTeams === 0,
        };
    }
    formatAmount(amount, currencyCode) {
        return `${new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(amount))} ${currencyCode.trim()}`;
    }
    findBlockers(snapshot, targetPhase) {
        const blockers = [];
        const viableRegistrations = snapshot.registrations.filter(({ status }) => ['pending', 'approved', 'changes_requested'].includes(status));
        const approvedRegistrations = snapshot.registrations.filter(({ status }) => status === 'approved');
        if (targetPhase === 'registration') {
            if (snapshot.status !== 'active') {
                blockers.push('Activa el torneo antes de abrir las inscripciones.');
            }
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            if (snapshot.registrationEndDate &&
                snapshot.registrationEndDate < today) {
                blockers.push('La fecha de cierre de inscripciones ya pasó; actualízala antes de abrirlas.');
            }
        }
        if (targetPhase === 'validation' && viableRegistrations.length < 2) {
            blockers.push('Se necesitan al menos dos solicitudes de equipos sin rechazar para cerrar inscripciones.');
        }
        if (targetPhase === 'scheduled') {
            if (approvedRegistrations.length < 2) {
                blockers.push('Aprueba al menos dos equipos antes de programar el torneo.');
            }
            if (approvedRegistrations.length > snapshot.maxTeams) {
                blockers.push(`Hay ${approvedRegistrations.length} equipos aprobados y el torneo admite máximo ${snapshot.maxTeams}.`);
            }
            const unresolved = snapshot.registrations.filter(({ status }) => ['pending', 'changes_requested'].includes(status)).length;
            if (unresolved > 0) {
                blockers.push(`Resuelve ${unresolved} solicitud${unresolved === 1 ? '' : 'es'} pendiente${unresolved === 1 ? '' : 's'}.`);
            }
            for (const registration of approvedRegistrations) {
                const playerCount = registration.players.length;
                if (playerCount < snapshot.minPlayersPerTeam ||
                    playerCount > snapshot.maxPlayersPerTeam) {
                    blockers.push(`El equipo ${registration.teamId.toString()} debe tener entre ${snapshot.minPlayersPerTeam} y ${snapshot.maxPlayersPerTeam} jugadores aprobados.`);
                }
                if (registration.players.filter(({ isCaptain }) => isCaptain).length !== 1) {
                    blockers.push(`El equipo ${registration.teamId.toString()} debe tener exactamente un capitán en su plantilla aprobada.`);
                }
                const eligibilityRules = {
                    name: snapshot.name,
                    startDate: snapshot.startDate,
                    categoryName: snapshot.categoryName,
                    minAge: snapshot.categoryMinAge,
                    maxAge: snapshot.categoryMaxAge,
                    gender: snapshot.categoryGender,
                };
                const eligibilityIssues = (0, tournament_eligibility_1.getTournamentEligibilityIssues)(eligibilityRules, registration.players);
                if (eligibilityIssues.length > 0) {
                    blockers.push(`${registration.teamName}: ${(0, tournament_eligibility_1.formatTournamentEligibilityError)(eligibilityRules, eligibilityIssues)}`);
                }
            }
            if (snapshot.matches.length === 0) {
                blockers.push('Genera los enfrentamientos y sus fechas antes de marcar el torneo como programado.');
            }
            else {
                const teamsWithMatches = new Set(snapshot.matches.flatMap(({ homeTeamId, awayTeamId }) => [
                    homeTeamId.toString(),
                    awayTeamId.toString(),
                ]));
                const missingTeams = approvedRegistrations.filter(({ teamId }) => !teamsWithMatches.has(teamId.toString()));
                if (missingTeams.length > 0) {
                    blockers.push(`${missingTeams.length} equipo${missingTeams.length === 1 ? '' : 's'} aprobado${missingTeams.length === 1 ? '' : 's'} aún no tiene${missingTeams.length === 1 ? '' : 'n'} enfrentamientos.`);
                }
                const matchesWithoutDate = snapshot.matches.filter(({ status, matchDate }) => status !== 'cancelled' && !matchDate).length;
                if (matchesWithoutDate > 0) {
                    blockers.push(`Asigna fecha a ${matchesWithoutDate} partido${matchesWithoutDate === 1 ? '' : 's'}.`);
                }
            }
        }
        if (targetPhase === 'in_progress') {
            const activeMatches = snapshot.matches.filter(({ status }) => status !== 'cancelled');
            if (activeMatches.length === 0) {
                blockers.push('El torneo debe tener al menos un partido programado.');
            }
            if (activeMatches.some(({ matchDate }) => !matchDate)) {
                blockers.push('Todos los partidos activos deben tener una fecha asignada.');
            }
        }
        if (targetPhase === 'finished') {
            const playedMatches = snapshot.matches.filter(({ status }) => status === 'played');
            if (playedMatches.length === 0) {
                blockers.push('Debe existir al menos un partido jugado.');
            }
            const unfinished = snapshot.matches.filter(({ status }) => !['played', 'cancelled'].includes(status)).length;
            if (unfinished > 0) {
                blockers.push(`Finaliza o cancela los ${unfinished} partido${unfinished === 1 ? '' : 's'} pendiente${unfinished === 1 ? '' : 's'}.`);
            }
        }
        if (targetPhase === 'archived') {
            if (snapshot.openDisciplinaryActions > 0) {
                blockers.push(`Resuelve ${snapshot.openDisciplinaryActions} novedad${snapshot.openDisciplinaryActions === 1 ? '' : 'es'} disciplinaria${snapshot.openDisciplinaryActions === 1 ? '' : 's'} pendiente${snapshot.openDisciplinaryActions === 1 ? '' : 's'}.`);
            }
            if (snapshot.pendingDisciplinaryAppeals > 0) {
                blockers.push(`Resuelve ${snapshot.pendingDisciplinaryAppeals} apelación${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 'es'} disciplinaria${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 's'} pendiente${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 's'}.`);
            }
            if (snapshot.pendingFines > 0) {
                blockers.push(`Cierra ${snapshot.pendingFines} multa${snapshot.pendingFines === 1 ? '' : 's'} pendiente${snapshot.pendingFines === 1 ? '' : 's'} antes de archivar.`);
            }
            if (snapshot.activeSuspensions > 0) {
                blockers.push(`Marca como cumplida o revocada ${snapshot.activeSuspensions} suspensión${snapshot.activeSuspensions === 1 ? '' : 'es'} activa${snapshot.activeSuspensions === 1 ? '' : 's'}.`);
            }
        }
        return [...new Set(blockers)];
    }
    async findSnapshot(client, tournamentId) {
        const [tournament, matches, openDisciplinaryActions, pendingDisciplinaryAppeals, pendingFines, activeSuspensions,] = await Promise.all([
            client.tournaments.findUnique({
                where: { id: tournamentId },
                select: {
                    id: true,
                    name: true,
                    phase: true,
                    status: true,
                    start_date: true,
                    category_name: true,
                    category_min_age: true,
                    category_max_age: true,
                    category_gender: true,
                    registration_end_date: true,
                    min_players_per_team: true,
                    max_players_per_team: true,
                    max_teams: true,
                    registration_fee: true,
                    currency_code: true,
                    tournament_team_registrations: {
                        select: {
                            team_id: true,
                            request_status: true,
                            payment_status: true,
                            amount_paid: true,
                            teams: { select: { captain_user_id: true, name: true } },
                            tournament_team_players: {
                                where: { registration_status: 'approved' },
                                select: {
                                    is_captain: true,
                                    team_members: {
                                        select: {
                                            users: {
                                                select: {
                                                    full_name: true,
                                                    birth_date: true,
                                                    gender: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            client.matches.findMany({
                where: { tournament_id: tournamentId },
                select: {
                    status: true,
                    match_date: true,
                    home_team_id: true,
                    away_team_id: true,
                },
            }),
            client.disciplinary_actions.count({
                where: {
                    tournament_id: tournamentId,
                    decision_status: { in: ['reported', 'under_review'] },
                },
            }),
            client.disciplinary_appeals.count({
                where: {
                    status: 'pending',
                    disciplinary_action: { tournament_id: tournamentId },
                },
            }),
            client.fines.count({
                where: {
                    payment_status: 'pending',
                    disciplinary_actions: { tournament_id: tournamentId },
                },
            }),
            client.suspensions.count({
                where: {
                    status: 'active',
                    disciplinary_actions: { tournament_id: tournamentId },
                },
            }),
        ]);
        if (!tournament) {
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        }
        return {
            id: tournament.id,
            name: tournament.name,
            phase: this.toPhase(tournament.phase),
            status: tournament.status,
            startDate: tournament.start_date,
            categoryName: tournament.category_name,
            categoryMinAge: tournament.category_min_age,
            categoryMaxAge: tournament.category_max_age,
            categoryGender: tournament.category_gender,
            registrationEndDate: tournament.registration_end_date,
            minPlayersPerTeam: tournament.min_players_per_team,
            maxPlayersPerTeam: tournament.max_players_per_team,
            maxTeams: tournament.max_teams,
            registrationFee: tournament.registration_fee,
            currencyCode: tournament.currency_code,
            openDisciplinaryActions,
            pendingDisciplinaryAppeals,
            pendingFines,
            activeSuspensions,
            registrations: tournament.tournament_team_registrations.map((registration) => ({
                teamId: registration.team_id,
                teamName: registration.teams.name,
                status: registration.request_status,
                paymentStatus: registration.payment_status,
                amountPaid: registration.amount_paid,
                captainUserId: registration.teams.captain_user_id,
                players: registration.tournament_team_players.map((player) => ({
                    isCaptain: player.is_captain,
                    fullName: player.team_members.users.full_name,
                    birthDate: player.team_members.users.birth_date,
                    gender: player.team_members.users.gender,
                })),
            })),
            matches: matches.map((match) => ({
                status: match.status,
                matchDate: match.match_date,
                homeTeamId: match.home_team_id,
                awayTeamId: match.away_team_id,
            })),
        };
    }
    async notifyLifecycleChange(transaction, snapshot, targetPhase, requestingUserId, reason) {
        const [referees, rosterPlayers] = await Promise.all([
            transaction.tournament_referees.findMany({
                where: { tournament_id: snapshot.id, status: 'active' },
                select: { user_id: true },
            }),
            transaction.tournament_team_players.findMany({
                where: {
                    tournament_id: snapshot.id,
                    registration_status: 'approved',
                },
                select: { player_id: true },
            }),
        ]);
        const recipientIds = [
            ...new Set([
                ...snapshot.registrations.map(({ captainUserId }) => captainUserId),
                ...referees.map(({ user_id }) => user_id),
                ...rosterPlayers.map(({ player_id }) => player_id),
            ]),
        ].filter((userId) => userId !== requestingUserId);
        if (recipientIds.length === 0)
            return;
        const targetLabel = tournament_lifecycle_constants_1.TOURNAMENT_PHASE_LABELS[targetPhase];
        const isCancelled = targetPhase === 'cancelled';
        await transaction.notifications.createMany({
            data: recipientIds.map((userId) => ({
                user_id: userId,
                type: 'tournament',
                title: isCancelled ? 'Torneo cancelado' : `Torneo en ${targetLabel}`,
                message: isCancelled
                    ? `${snapshot.name} fue cancelado.${reason ? ` Motivo: ${reason}` : ''}`
                    : `${snapshot.name} avanzó a la fase ${targetLabel}.`,
                entity_type: 'tournament',
                entity_id: snapshot.id.toString(),
                metadata: {
                    tournamentId: snapshot.id.toString(),
                    tournamentName: snapshot.name,
                    fromPhase: snapshot.phase,
                    toPhase: targetPhase,
                    reason,
                    actionUrl: `/tournaments/${snapshot.id.toString()}`,
                    actionLabel: 'Ver torneo',
                },
            })),
        });
    }
    toPhase(value) {
        if (!(0, tournament_lifecycle_constants_1.isTournamentPhase)(value)) {
            throw new common_1.BadRequestException(`El torneo tiene una fase no reconocida: ${value}.`);
        }
        return value;
    }
    toNullablePhase(value) {
        return value === null ? null : this.toPhase(value);
    }
};
exports.TournamentLifecycleService = TournamentLifecycleService;
exports.TournamentLifecycleService = TournamentLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], TournamentLifecycleService);
//# sourceMappingURL=tournament-lifecycle.service.js.map