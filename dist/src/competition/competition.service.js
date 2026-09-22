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
exports.CompetitionService = void 0;
exports.scheduleFixtures = scheduleFixtures;
exports.assignApprovedTeamToCompetition = assignApprovedTeamToCompetition;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
const competition_engine_1 = require("./competition.engine");
function scheduleFixtures(stage, schedule) {
    const fixtures = [...stage.fixtures].sort((a, b) => a.round - b.round ||
        a.group.localeCompare(b.group) ||
        a.key.localeCompare(b.key));
    const duration = schedule.durationMinutes + schedule.breakMinutes;
    if (duration * schedule.matchesPerDay > 24 * 60)
        throw new common_1.BadRequestException('Los partidos de una jornada no caben en 24 horas.');
    let day = 0;
    let slot = 0;
    let round = 1;
    return fixtures.map((fixture) => {
        if (fixture.round !== round) {
            if (slot > 0)
                day++;
            slot = 0;
            round = fixture.round;
        }
        if (slot === schedule.matchesPerDay) {
            day++;
            slot = 0;
        }
        const matchDate = schedule.startAt
            ? new Date(new Date(schedule.startAt).getTime() +
                day * schedule.daysBetweenMatchDays * 86400000 +
                slot * duration * 60000).toISOString()
            : null;
        slot++;
        return { ...fixture, matchDate };
    });
}
function fixtureData(tournamentId, plan, stage) {
    return stage.fixtures.flatMap((fixture) => {
        const homeTeamId = (0, competition_engine_1.competitorTeamId)(plan, fixture.home);
        const awayTeamId = (0, competition_engine_1.competitorTeamId)(plan, fixture.away);
        if (!homeTeamId || !awayTeamId)
            return [];
        return [
            {
                tournament_id: tournamentId,
                competition_key: fixture.key,
                home_team_id: BigInt(homeTeamId),
                away_team_id: BigInt(awayTeamId),
                stage: `${stage.label} · ${fixture.group}`,
                round_number: fixture.round,
                match_date: fixture.matchDate ? new Date(fixture.matchDate) : null,
                duration_minutes: fixture.durationMinutes ?? 90,
                venue: fixture.venue || null,
            },
        ];
    });
}
async function materializeCompetitionFixtures(tx, tournamentId, plan) {
    const data = plan.stages.flatMap((stage) => fixtureData(tournamentId, plan, stage));
    if (data.length === 0)
        return;
    await tx.matches.createMany({ data, skipDuplicates: true });
}
async function assignApprovedTeamToCompetition(tx, tournamentId, teamId) {
    await tx.$queryRaw `SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
    const tournament = await tx.tournaments.findUniqueOrThrow({
        where: { id: tournamentId },
        select: { competition_plan: true, phase: true },
    });
    const plan = (0, competition_engine_1.readPlan)(tournament.competition_plan);
    if (!plan || plan.version !== 2 || !plan.slots)
        return;
    if (!['registration', 'validation', 'scheduled'].includes(tournament.phase))
        throw new common_1.BadRequestException('Los lugares del sorteo ya están cerrados para nuevos equipos.');
    const value = teamId.toString();
    if (plan.slots.some((slot) => slot.teamId === value))
        return;
    const slot = plan.slots.find(({ teamId: assigned }) => assigned === null);
    if (!slot)
        throw new common_1.BadRequestException('El sorteo ya no tiene lugares disponibles para otro equipo.');
    slot.teamId = value;
    const group = plan.stages[0]?.groups.find(({ teams }) => teams.includes(slot.id));
    await tx.tournament_team_registrations.update({
        where: {
            tournament_id_team_id: { tournament_id: tournamentId, team_id: teamId },
        },
        data: {
            group_name: group?.name ?? null,
            seed: plan.teamIds.indexOf(slot.id) + 1,
            updated_at: new Date(),
        },
    });
    await materializeCompetitionFixtures(tx, tournamentId, plan);
    await tx.tournaments.update({
        where: { id: tournamentId },
        data: {
            competition_plan: JSON.parse(JSON.stringify(plan)),
            updated_at: new Date(),
        },
    });
}
let CompetitionService = class CompetitionService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async tournament(client, id) {
        const tournament = await client.tournaments.findUnique({
            where: { id },
            include: {
                tournament_types: true,
                tournament_team_registrations: {
                    include: { teams: { select: { name: true } } },
                    orderBy: { team_id: 'asc' },
                },
            },
        });
        if (!tournament)
            throw new common_1.NotFoundException('El torneo no existe.');
        return tournament;
    }
    async options(id, actor) {
        await this.access.assertCanManageTournament(actor, id);
        const tournament = await this.tournament(this.prisma, id);
        const teams = tournament.tournament_team_registrations
            .filter((r) => r.request_status === 'approved')
            .map((r) => ({ id: r.team_id.toString(), name: r.teams.name }));
        const blockers = [];
        if (tournament.phase !== 'validation')
            blockers.push('La organización se realiza durante Validación.');
        if (teams.length > tournament.max_teams)
            blockers.push('Los equipos aprobados exceden el cupo del torneo.');
        if (tournament.competition_plan ||
            (await this.prisma.matches.count({ where: { tournament_id: id } })))
            blockers.push('El torneo ya tiene una organización o partidos. No se sobrescribirán.');
        return {
            teams,
            capacity: tournament.max_teams,
            pendingSlots: tournament.max_teams - teams.length,
            originalType: tournament.tournament_types.name,
            phase: tournament.phase,
            startDate: tournament.start_date.toISOString(),
            venue: tournament.location_name,
            blockers,
            suggestions: (0, competition_engine_1.suggestions)(tournament.max_teams),
        };
    }
    async prepare(client, id, actor, dto) {
        const tournament = await this.tournament(client, id);
        if (tournament.phase !== 'validation')
            throw new common_1.BadRequestException('Solo puedes organizar el torneo durante Validación.');
        if (tournament.competition_plan ||
            (await client.matches.count({ where: { tournament_id: id } })))
            throw new common_1.ConflictException('Ya existen partidos u organización. Actualiza la página.');
        const approved = tournament.tournament_team_registrations.filter((r) => r.request_status === 'approved');
        const ids = approved.map((r) => r.team_id.toString());
        if (ids.length !== dto.teamIds.length ||
            ids.some((id) => !dto.teamIds.includes(id)))
            throw new common_1.ConflictException('Los equipos aprobados cambiaron. Actualiza las sugerencias y vuelve a sortear.');
        if (ids.length > tournament.max_teams)
            throw new common_1.BadRequestException('Los equipos aprobados exceden el cupo.');
        (0, competition_engine_1.validateConfig)(dto.config, tournament.max_teams);
        const shuffledApproved = (0, competition_engine_1.shuffled)(ids, dto.seed);
        const slots = Array.from({ length: tournament.max_teams }, (_, index) => ({
            id: `slot-${index + 1}`,
            label: `Equipo ${index + 1}`,
            teamId: shuffledApproved[index] ?? null,
        }));
        const ordered = (0, competition_engine_1.shuffled)(slots.map(({ id: slotId }) => slotId), dto.seed);
        const stage = (0, competition_engine_1.firstStage)(dto.config, ordered);
        stage.fixtures = scheduleFixtures(stage, dto.schedule).map((fixture) => ({
            ...fixture,
            venue: dto.schedule.venue || null,
            durationMinutes: dto.schedule.durationMinutes,
        }));
        const plan = {
            version: 2,
            config: dto.config,
            seed: dto.seed,
            teamIds: ordered,
            slots,
            stages: [stage],
            champion: null,
            createdBy: actor.toString(),
            createdAt: new Date().toISOString(),
            originalType: tournament.tournament_types.name,
            changeReason: dto.changeReason?.trim() || null,
        };
        const fixtures = stage.fixtures;
        this.checkDates(fixtures, tournament.start_date, tournament.end_date);
        return {
            plan,
            fixtures,
            summary: (0, competition_engine_1.estimate)(dto.config, tournament.max_teams),
            label: competition_engine_1.FORMAT_LABELS[dto.config.format],
        };
    }
    async preview(id, actor, dto) {
        await this.access.assertCanManageTournament(actor, id);
        return this.prepare(this.prisma, id, actor, dto);
    }
    async generate(id, actor, dto) {
        await this.access.assertCanManageTournament(actor, id);
        await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM tournaments WHERE id = ${id} FOR UPDATE`;
            const { plan } = await this.prepare(tx, id, actor, dto);
            await materializeCompetitionFixtures(tx, id, plan);
            await tx.tournaments.update({
                where: { id },
                data: {
                    competition_plan: JSON.parse(JSON.stringify(plan)),
                    updated_at: new Date(),
                },
            });
            for (const group of plan.stages[0].groups)
                for (const competitorId of group.teams) {
                    const team = (0, competition_engine_1.competitorTeamId)(plan, competitorId);
                    if (!team)
                        continue;
                    await tx.tournament_team_registrations.update({
                        where: {
                            tournament_id_team_id: {
                                tournament_id: id,
                                team_id: BigInt(team),
                            },
                        },
                        data: {
                            group_name: group.name,
                            seed: plan.teamIds.indexOf(competitorId) + 1,
                        },
                    });
                }
        }, {
            isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable,
            timeout: 30000,
        });
        return this.get(id, actor);
    }
    async get(id, actor) {
        const tournament = await this.tournament(this.prisma, id);
        if (![
            'registration',
            'validation',
            'scheduled',
            'in_progress',
            'finished',
        ].includes(tournament.phase))
            await this.access.assertCanViewTournament(actor, id);
        const plan = (0, competition_engine_1.readPlan)(tournament.competition_plan);
        if (!plan)
            return {
                plan: null,
                stages: [],
                teams: [],
                label: null,
                canAdvance: false,
                advanceBlocker: null,
            };
        const matches = await this.prisma.matches.findMany({
            where: { tournament_id: id, competition_key: { not: null } },
            orderBy: { id: 'asc' },
            include: {
                match_referees: {
                    where: {
                        referee_role: 'main',
                        assignment_status: { in: ['pending', 'accepted'] },
                    },
                    select: {
                        assignment_status: true,
                        tournament_referees: {
                            select: { users: { select: { full_name: true } } },
                        },
                    },
                    take: 1,
                },
            },
        });
        const scores = this.scores(matches);
        const matchesByKey = new Map(matches.map((match) => [match.competition_key, match]));
        let advanceBlocker = null;
        if (tournament.phase !== 'in_progress')
            advanceBlocker = 'El torneo debe estar En curso para resolver etapas.';
        else if (plan.champion)
            advanceBlocker = 'La competencia ya tiene campeón.';
        else if ((0, competition_engine_1.hasUnfilledSlots)(plan))
            advanceBlocker =
                'Completa todos los lugares del sorteo antes de resolver etapas.';
        else {
            try {
                (0, competition_engine_1.resolveStage)(plan, scores);
            }
            catch (error) {
                if (error instanceof common_1.BadRequestException)
                    advanceBlocker = error.message;
                else
                    throw error;
            }
        }
        return {
            plan,
            label: competition_engine_1.FORMAT_LABELS[plan.config.format],
            teams: this.competitors(plan, tournament.tournament_team_registrations),
            stages: plan.stages.map((stage) => ({
                ...stage,
                tables: stage.kind === 'points'
                    ? stage.groups.map((g) => ({
                        group: g.name,
                        rows: (0, competition_engine_1.standings)(stage, g.name, scores, plan.teamIds),
                    }))
                    : [],
                matches: stage.fixtures.map((f) => {
                    const m = matchesByKey.get(f.key);
                    return {
                        ...f,
                        id: m?.id.toString() ?? null,
                        matchDate: m?.match_date?.toISOString() ?? f.matchDate ?? null,
                        venue: m?.venue ?? f.venue ?? null,
                        status: m?.status ??
                            ((0, competition_engine_1.competitorTeamId)(plan, f.home) && (0, competition_engine_1.competitorTeamId)(plan, f.away)
                                ? 'missing'
                                : 'awaiting_teams'),
                        homeScore: m?.home_score ?? null,
                        awayScore: m?.away_score ?? null,
                        homePenalties: m?.home_penalties ?? null,
                        awayPenalties: m?.away_penalties ?? null,
                        refereeName: m?.match_referees[0]?.tournament_referees.users.full_name ??
                            null,
                        refereeStatus: m?.match_referees[0]?.assignment_status ?? null,
                    };
                }),
            })),
            canAdvance: advanceBlocker === null,
            advanceBlocker,
        };
    }
    async advance(id, actor, dto) {
        await this.access.assertCanManageTournament(actor, id);
        await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM tournaments WHERE id = ${id} FOR UPDATE`;
            const tournament = await this.tournament(tx, id);
            const plan = (0, competition_engine_1.readPlan)(tournament.competition_plan);
            if (tournament.phase !== 'in_progress' || !plan)
                throw new common_1.BadRequestException('El torneo debe estar En curso y tener organización.');
            if (plan.stages.at(-1).id !== dto.expectedStage)
                throw new common_1.ConflictException('La etapa cambió. Actualiza la página.');
            const matches = await tx.matches.findMany({
                where: { tournament_id: id, competition_key: { not: null } },
            });
            if ((0, competition_engine_1.hasUnfilledSlots)(plan))
                throw new common_1.BadRequestException('Completa todos los lugares del sorteo antes de resolver etapas.');
            const { next, champion } = (0, competition_engine_1.resolveStage)(plan, this.scores(matches));
            if (next) {
                const fixtures = scheduleFixtures(next, dto.schedule).map((fixture) => ({
                    ...fixture,
                    venue: dto.schedule.venue || null,
                    durationMinutes: dto.schedule.durationMinutes,
                }));
                next.fixtures = fixtures;
                const lastEnd = Math.max(...matches.map((m) => (m.match_date?.getTime() ?? 0) + m.duration_minutes * 60000));
                this.checkDates(fixtures, new Date(Math.max(tournament.start_date.getTime(), lastEnd)), tournament.end_date);
                plan.stages.at(-1).resolved = true;
                plan.stages.push(next);
                await materializeCompetitionFixtures(tx, id, plan);
            }
            if (!next)
                plan.stages.at(-1).resolved = true;
            plan.champion = champion;
            await tx.tournaments.update({
                where: { id },
                data: {
                    competition_plan: JSON.parse(JSON.stringify(plan)),
                    updated_at: new Date(),
                },
            });
        }, {
            isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable,
            timeout: 30000,
        });
        return this.get(id, actor);
    }
    scores(matches) {
        return matches.map((m) => ({
            key: m.competition_key,
            status: m.status,
            homeScore: m.home_score,
            awayScore: m.away_score,
            homePenalties: m.home_penalties,
            awayPenalties: m.away_penalties,
        }));
    }
    checkDates(fixtures, start, end) {
        for (const f of fixtures)
            if (f.matchDate) {
                const time = new Date(f.matchDate).getTime();
                if (time < start.getTime() || (end && time >= end.getTime() + 86400000))
                    throw new common_1.BadRequestException('Las fechas generadas deben quedar dentro del torneo y después de la etapa anterior. Ajusta la fecha inicial o la frecuencia.');
            }
    }
    competitors(plan, registrations) {
        const names = new Map(registrations.map((registration) => [
            registration.team_id.toString(),
            registration.teams.name,
        ]));
        if (plan.version === 1 || !plan.slots)
            return plan.teamIds.map((id) => ({
                id,
                teamId: id,
                name: names.get(id) ?? `Equipo ${id}`,
                placeholder: false,
            }));
        return plan.slots.map((slot) => ({
            id: slot.id,
            teamId: slot.teamId,
            name: slot.teamId ? (names.get(slot.teamId) ?? slot.label) : slot.label,
            placeholder: slot.teamId === null,
        }));
    }
};
exports.CompetitionService = CompetitionService;
exports.CompetitionService = CompetitionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], CompetitionService);
//# sourceMappingURL=competition.service.js.map