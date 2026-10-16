import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  AdvanceCompetitionDto,
  CompetitionScheduleDto,
  PreviewCompetitionDto,
  UpdateCompetitionLineupDto,
  type ReorganizeMode,
} from './competition.dto';
import {
  competitorTeamId,
  estimate,
  firstStage,
  FORMAT_LABELS,
  hasUnfilledSlots,
  readPlan,
  resolveStage,
  shuffled,
  standings,
  suggestions,
  validateConfig,
  type CompetitionPlan,
  type CompetitionSlot,
  type CompetitionStage,
  type Score,
} from './competition.engine';

type Client = PrismaService | Prisma.TransactionClient;
export function scheduleFixtures(
  stage: CompetitionStage,
  schedule: CompetitionScheduleDto,
) {
  const fixtures = [...stage.fixtures].sort(
    (a, b) =>
      a.round - b.round ||
      a.group.localeCompare(b.group) ||
      a.key.localeCompare(b.key),
  );
  const duration = schedule.durationMinutes + schedule.breakMinutes;
  if (duration * schedule.matchesPerDay > 24 * 60)
    throw new BadRequestException(
      'Los partidos de una jornada no caben en 24 horas.',
    );
  let day = 0;
  let slot = 0;
  let round = 1;
  return fixtures.map((fixture) => {
    if (fixture.round !== round) {
      if (slot > 0) day++;
      slot = 0;
      round = fixture.round;
    }
    if (slot === schedule.matchesPerDay) {
      day++;
      slot = 0;
    }
    const matchDate = schedule.startAt
      ? new Date(
          new Date(schedule.startAt).getTime() +
            day * schedule.daysBetweenMatchDays * 86400000 +
            slot * duration * 60000,
        ).toISOString()
      : null;
    slot++;
    return { ...fixture, matchDate };
  });
}

function fixtureData(
  tournamentId: bigint,
  plan: CompetitionPlan,
  stage: CompetitionStage,
) {
  return stage.fixtures.flatMap((fixture) => {
    const homeTeamId = competitorTeamId(plan, fixture.home);
    const awayTeamId = competitorTeamId(plan, fixture.away);
    if (!homeTeamId || !awayTeamId) return [];
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

async function materializeCompetitionFixtures(
  tx: Prisma.TransactionClient,
  tournamentId: bigint,
  plan: CompetitionPlan,
): Promise<void> {
  const data = plan.stages.flatMap((stage) =>
    fixtureData(tournamentId, plan, stage),
  );
  if (data.length === 0) return;
  await tx.matches.createMany({ data, skipDuplicates: true });
}

export async function assignApprovedTeamToCompetition(
  tx: Prisma.TransactionClient,
  tournamentId: bigint,
  teamId: bigint,
): Promise<void> {
  await tx.$queryRaw`SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
  const tournament = await tx.tournaments.findUniqueOrThrow({
    where: { id: tournamentId },
    select: { competition_plan: true, phase: true },
  });
  const plan = readPlan(tournament.competition_plan);
  if (!plan || plan.version !== 2 || !plan.slots) return;
  if (!['registration', 'scheduled'].includes(tournament.phase))
    throw new BadRequestException(
      'Los lugares del sorteo ya están cerrados para nuevos equipos.',
    );
  const value = teamId.toString();
  if (plan.slots.some((slot) => slot.teamId === value)) return;
  const slot = plan.slots.find(({ teamId: assigned }) => assigned === null);
  if (!slot)
    throw new BadRequestException(
      'El sorteo ya no tiene lugares disponibles para otro equipo.',
    );
  slot.teamId = value;
  const group = plan.stages[0]?.groups.find(({ teams }) =>
    teams.includes(slot.id),
  );
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
      competition_plan: JSON.parse(
        JSON.stringify(plan),
      ) as Prisma.InputJsonValue,
      updated_at: new Date(),
    },
  });
}

@Injectable()
export class CompetitionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  private async tournament(client: Client, id: bigint) {
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
    if (!tournament) throw new NotFoundException('El torneo no existe.');
    return tournament;
  }
  async options(id: bigint, actor: bigint) {
    await this.access.assertCanManageTournament(actor, id);
    const tournament = await this.tournament(this.prisma, id);
    const teams = tournament.tournament_team_registrations
      .filter((r) => r.request_status === 'approved')
      .map((r) => ({ id: r.team_id.toString(), name: r.teams.name }));
    const plan = readPlan(tournament.competition_plan);
    const [totalMatches, played] = await Promise.all([
      this.prisma.matches.count({
        where: { tournament_id: id, competition_key: { not: null } },
      }),
      this.prisma.matches.findMany({
        where: {
          tournament_id: id,
          competition_key: { not: null },
          status: { in: CompetitionService.PLAYED_STATUSES },
        },
        select: { home_team_id: true, away_team_id: true },
        orderBy: { id: 'asc' },
      }),
    ]);
    const playedMatches = played.length;
    // El asistente usa estos cruces para anticipar cuántos resultados
    // sobreviven a la reorganización antes de confirmarla.
    const playedPairings = played.map(({ home_team_id, away_team_id }) => [
      home_team_id.toString(),
      away_team_id.toString(),
    ]);
    const hasPlan = Boolean(plan) || totalMatches > 0;
    // Con organización previa el flujo pasa a ser una reorganización: ahí los
    // bloqueos no aplican porque el administrador ya decidió rehacer el sorteo.
    const canReorganize =
      hasPlan && !['archived', 'cancelled'].includes(tournament.phase);
    const blockers: string[] = [];
    if (!hasPlan && tournament.phase !== 'registration')
      blockers.push(
        'La organización del torneo se realiza mientras está en Inscripciones.',
      );
    if (teams.length > tournament.max_teams)
      blockers.push('Los equipos aprobados exceden el cupo del torneo.');
    if (hasPlan && !canReorganize)
      blockers.push(
        'Un torneo archivado o cancelado ya no se puede reorganizar.',
      );
    return {
      teams,
      hasPlan,
      canReorganize,
      totalMatches,
      playedMatches,
      playedPairings,
      currentConfig: plan?.config ?? null,
      /** Semilla del sorteo vigente: repetirla conserva el orden de equipos. */
      currentSeed: plan?.seed ?? null,
      currentLabel: plan ? FORMAT_LABELS[plan.config.format] : null,
      planTeamIds: plan?.slots?.flatMap((slot) => slot.teamId ?? []) ?? [],
      capacity: tournament.max_teams,
      pendingSlots: tournament.max_teams - teams.length,
      originalType: tournament.tournament_types.name,
      phase: tournament.phase,
      startDate: tournament.start_date.toISOString(),
      venue: tournament.location_name,
      blockers,
      suggestions: suggestions(tournament.max_teams),
    };
  }
  private async prepare(
    client: Client,
    id: bigint,
    actor: bigint,
    dto: PreviewCompetitionDto,
  ) {
    const tournament = await this.tournament(client, id);
    const isReorganizing = Boolean(dto.reorganize);
    // La primera organización solo ocurre en Inscripciones; rehacerla se puede
    // mientras el torneo siga vivo, que es cuando cambia el formato.
    if (!isReorganizing && tournament.phase !== 'registration')
      throw new BadRequestException(
        'Solo puedes organizar el torneo mientras está en Inscripciones.',
      );
    if (isReorganizing && ['archived', 'cancelled'].includes(tournament.phase))
      throw new BadRequestException(
        'Un torneo archivado o cancelado ya no se puede reorganizar.',
      );
    if (
      !isReorganizing &&
      (tournament.competition_plan ||
        (await client.matches.count({ where: { tournament_id: id } })))
    )
      throw new ConflictException(
        'Ya existen partidos u organización. Actualiza la página.',
      );
    const approved = tournament.tournament_team_registrations.filter(
      (r) => r.request_status === 'approved',
    );
    const ids = approved.map((r) => r.team_id.toString());
    if (
      ids.length !== dto.teamIds.length ||
      ids.some((id) => !dto.teamIds.includes(id))
    )
      throw new ConflictException(
        'Los equipos aprobados cambiaron. Actualiza las sugerencias y vuelve a sortear.',
      );
    if (ids.length > tournament.max_teams)
      throw new BadRequestException('Los equipos aprobados exceden el cupo.');
    validateConfig(dto.config, tournament.max_teams);
    const shuffledApproved = shuffled(ids, dto.seed);
    const slots: CompetitionSlot[] = Array.from(
      { length: tournament.max_teams },
      (_, index) => ({
        id: `slot-${index + 1}`,
        label: `Equipo ${index + 1}`,
        teamId: shuffledApproved[index] ?? null,
      }),
    );
    const ordered = shuffled(
      slots.map(({ id: slotId }) => slotId),
      dto.seed,
    );
    const stage = firstStage(dto.config, ordered);
    stage.fixtures = scheduleFixtures(stage, dto.schedule).map((fixture) => ({
      ...fixture,
      venue: dto.schedule.venue || null,
      durationMinutes: dto.schedule.durationMinutes,
    }));
    const plan: CompetitionPlan = {
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
      summary: estimate(dto.config, tournament.max_teams),
      label: FORMAT_LABELS[dto.config.format],
    };
  }
  /** Partidos con historia real: ya se jugaron o están en juego. */
  private static readonly PLAYED_STATUSES = ['played', 'in_progress'];

  /** Resultados ya jugados, para poder trasladarlos a la organización nueva. */
  private async collectPlayedResults(
    tx: Prisma.TransactionClient,
    tournamentId: bigint,
  ) {
    return tx.matches.findMany({
      where: {
        tournament_id: tournamentId,
        status: { in: CompetitionService.PLAYED_STATUSES },
      },
      select: {
        id: true,
        home_team_id: true,
        away_team_id: true,
        home_score: true,
        away_score: true,
        home_penalties: true,
        away_penalties: true,
        match_date: true,
        status: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * Saca del torneo el calendario anterior para que el sorteo nuevo pueda
   * crear sus partidos. Los que nunca se jugaron se borran; los que ya tienen
   * historia se conservan como registro anulado (sin clave de competencia,
   * así no entran en tablas ni cuadros) porque de ellos cuelgan cobros de
   * tarjetas, estadísticas y procesos disciplinarios que no se deben perder.
   */
  private async retireCompetitionFixtures(
    tx: Prisma.TransactionClient,
    tournamentId: bigint,
    note: string,
  ): Promise<{ removed: number; retired: number }> {
    const { count: removed } = await tx.matches.deleteMany({
      where: {
        tournament_id: tournamentId,
        status: { notIn: CompetitionService.PLAYED_STATUSES },
      },
    });
    // Se usa SQL para anexar la nota sin borrar lo que el administrador
    // hubiera escrito en el partido.
    const retired = await tx.$executeRaw`
      UPDATE matches
         SET competition_key = NULL,
             status = 'cancelled',
             notes = CASE
               WHEN notes IS NULL OR notes = '' THEN ${note}
               ELSE notes || E'\n' || ${note}
             END,
             updated_at = now()
       WHERE tournament_id = ${tournamentId}
         AND status IN ('played', 'in_progress')`;
    return { removed, retired };
  }

  /**
   * Traslada cada resultado al partido equivalente del sorteo nuevo. Se busca
   * el mismo par de equipos, sin importar quién quedó de local, y cada
   * resultado se usa una sola vez: si el formato nuevo no repite ese cruce, el
   * resultado queda solo como historial y el partido se vuelve a jugar.
   */
  private async restorePlayedResults(
    tx: Prisma.TransactionClient,
    tournamentId: bigint,
    results: Awaited<ReturnType<CompetitionService['collectPlayedResults']>>,
  ): Promise<{ restored: number; dropped: number }> {
    if (results.length === 0) return { restored: 0, dropped: 0 };

    const pending = await tx.matches.findMany({
      where: {
        tournament_id: tournamentId,
        status: 'scheduled',
        competition_key: { not: null },
      },
      select: { id: true, home_team_id: true, away_team_id: true },
      orderBy: { id: 'asc' },
    });
    const used = new Set<string>();
    let restored = 0;

    for (const result of results) {
      const pair = [result.home_team_id, result.away_team_id];
      const match = pending.find(
        (candidate) =>
          !used.has(candidate.id.toString()) &&
          pair.includes(candidate.home_team_id) &&
          pair.includes(candidate.away_team_id),
      );
      if (!match) continue;

      const sameSides = match.home_team_id === result.home_team_id;
      await tx.matches.update({
        where: { id: match.id },
        data: {
          status: result.status,
          // Si el sorteo invirtió la localía, el marcador se invierte con ella.
          home_score: sameSides ? result.home_score : result.away_score,
          away_score: sameSides ? result.away_score : result.home_score,
          home_penalties: sameSides
            ? result.home_penalties
            : result.away_penalties,
          away_penalties: sameSides
            ? result.away_penalties
            : result.home_penalties,
          match_date: result.match_date,
          notes: 'Resultado trasladado desde la organización anterior.',
          updated_at: new Date(),
        },
      });
      used.add(match.id.toString());
      restored += 1;
    }

    return { restored, dropped: results.length - restored };
  }

  async preview(id: bigint, actor: bigint, dto: PreviewCompetitionDto) {
    await this.access.assertCanManageTournament(actor, id);
    return this.prepare(this.prisma, id, actor, dto);
  }
  async generate(id: bigint, actor: bigint, dto: PreviewCompetitionDto) {
    await this.access.assertCanManageTournament(actor, id);
    let reorganization: {
      mode: ReorganizeMode;
      retiredMatches: number;
      removedMatches: number;
      restoredResults: number;
      droppedResults: number;
    } | null = null;
    await this.prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`SELECT id FROM tournaments WHERE id = ${id} FOR UPDATE`;
        const previousResults = dto.reorganize
          ? await this.collectPlayedResults(tx, id)
          : [];
        const retired = dto.reorganize
          ? await this.retireCompetitionFixtures(
              tx,
              id,
              dto.reorganize.mode === 'keep_results'
                ? 'Partido reemplazado al reorganizar el torneo; su resultado se trasladó al nuevo calendario.'
                : 'Partido anulado al reorganizar el torneo; se volverá a jugar en el nuevo calendario.',
            )
          : { removed: 0, retired: 0 };
        const { plan } = await this.prepare(tx, id, actor, dto);
        await materializeCompetitionFixtures(tx, id, plan);
        const carried =
          dto.reorganize?.mode === 'keep_results'
            ? await this.restorePlayedResults(tx, id, previousResults)
            : { restored: 0, dropped: previousResults.length };
        if (dto.reorganize)
          reorganization = {
            mode: dto.reorganize.mode,
            retiredMatches: retired.retired,
            removedMatches: retired.removed,
            restoredResults: carried.restored,
            droppedResults: carried.dropped,
          };
        await tx.tournaments.update({
          where: { id },
          data: {
            competition_plan: JSON.parse(
              JSON.stringify(plan),
            ) as Prisma.InputJsonValue,
            updated_at: new Date(),
          },
        });
        for (const group of plan.stages[0].groups)
          for (const competitorId of group.teams) {
            const team = competitorTeamId(plan, competitorId);
            if (!team) continue;
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
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        timeout: 30000,
      },
    );
    return { ...(await this.get(id, actor)), reorganization };
  }
  /**
   * Reasigna qué equipo ocupa cada lugar del sorteo. Los partidos siguen a su
   * lugar: al cambiar el titular de un puesto, sus partidos pasan al equipo
   * nuevo con el marcador que ya tuvieran. Por eso un cambio que toque
   * partidos jugados exige confirmación explícita del administrador.
   */
  async updateLineup(
    id: bigint,
    actor: bigint,
    dto: UpdateCompetitionLineupDto,
  ) {
    await this.access.assertCanManageTournament(actor, id);

    const summary = await this.prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`SELECT id FROM tournaments WHERE id = ${id} FOR UPDATE`;
        const tournament = await this.tournament(tx, id);
        if (['archived', 'cancelled'].includes(tournament.phase))
          throw new BadRequestException(
            'Un torneo archivado o cancelado ya no se puede reacomodar.',
          );

        const plan = readPlan(tournament.competition_plan);
        if (!plan || plan.version !== 2 || !plan.slots)
          throw new BadRequestException(
            'Este torneo todavía no tiene un sorteo que se pueda reacomodar.',
          );

        const approved = tournament.tournament_team_registrations
          .filter((row) => row.request_status === 'approved')
          .map((row) => ({
            id: row.team_id.toString(),
            name: row.teams.name,
          }));
        const approvedById = new Map(approved.map((team) => [team.id, team]));
        const slotIds = new Set(plan.slots.map(({ id: slotId }) => slotId));

        // 1. La petición debe hablar de lugares que existen y de equipos
        //    aprobados; cualquier otra cosa es un error del cliente.
        const assignments = new Map<string, string | null>();
        for (const slot of dto.slots) {
          if (!slotIds.has(slot.slotId))
            throw new BadRequestException(
              'La distribución enviada no coincide con el sorteo actual. Actualiza la página.',
            );
          const teamId = slot.teamId ?? null;
          if (teamId && !approvedById.has(teamId))
            throw new BadRequestException(
              'Solo puedes ubicar equipos aprobados en este torneo.',
            );
          assignments.set(slot.slotId, teamId);
        }

        // 2. Ningún equipo puede quedar en dos lugares.
        const seen = new Map<string, string>();
        for (const [slotId, teamId] of assignments) {
          if (!teamId) continue;
          const previous = seen.get(teamId);
          if (previous)
            throw new BadRequestException(
              `${approvedById.get(teamId)?.name ?? 'Un equipo'} quedó ubicado en dos lugares del sorteo. Déjalo en uno solo.`,
            );
          seen.set(teamId, slotId);
        }

        const next = plan.slots.map((slot) => ({
          ...slot,
          teamId: assignments.has(slot.id)
            ? (assignments.get(slot.id) ?? null)
            : slot.teamId,
        }));

        // 3. Los equipos aprobados que quedaron sin lugar se informan, porque
        //    quedarían fuera de la competencia sin que nadie lo note.
        const placed = new Set(next.flatMap(({ teamId }) => teamId ?? []));
        const unplaced = approved.filter((team) => !placed.has(team.id));
        if (unplaced.length > 0)
          throw new BadRequestException(
            `Falta ubicar ${unplaced.length === 1 ? 'un equipo' : `${unplaced.length} equipos`} en el sorteo: ${unplaced
              .map(({ name }) => name)
              .join(', ')}.`,
          );

        const changedSlots = next.filter(
          (slot, index) => slot.teamId !== plan.slots![index].teamId,
        );
        if (changedSlots.length === 0)
          return {
            movedTeams: 0,
            updatedMatches: 0,
            playedMatches: 0,
            freedSlots: 0,
          };

        // 4. Los partidos del torneo se reasignan al titular nuevo de cada
        //    lugar. Se avisa cuántos ya se habían jugado.
        const fixtures = plan.stages.flatMap((stage) =>
          stage.fixtures.map((fixture) => ({
            key: fixture.key,
            home: fixture.home,
            away: fixture.away,
          })),
        );
        const slotTeam = new Map(next.map((slot) => [slot.id, slot.teamId]));
        const touchedKeys = fixtures
          .filter(
            (fixture) =>
              changedSlots.some(
                ({ id: slotId }) =>
                  slotId === fixture.home || slotId === fixture.away,
              ),
          )
          .map(({ key }) => key);

        const playedMatches = await tx.matches.count({
          where: {
            tournament_id: id,
            competition_key: { in: touchedKeys },
            status: { in: CompetitionService.PLAYED_STATUSES },
          },
        });
        if (playedMatches > 0 && !dto.confirmPlayedMatches)
          throw new ConflictException(
            `Este cambio afecta ${playedMatches} partido${playedMatches === 1 ? ' ya jugado' : 's ya jugados'}: su marcador quedará a nombre del equipo que ocupe ese lugar. Confirma para continuar.`,
          );

        let updatedMatches = 0;
        let removedMatches = 0;
        for (const fixture of fixtures) {
          if (!touchedKeys.includes(fixture.key)) continue;
          const homeTeamId = slotTeam.get(fixture.home) ?? null;
          const awayTeamId = slotTeam.get(fixture.away) ?? null;
          if (!homeTeamId || !awayTeamId) {
            // El lugar quedó libre: el partido deja de tener rival y se retira.
            const { count } = await tx.matches.deleteMany({
              where: {
                tournament_id: id,
                competition_key: fixture.key,
                status: { notIn: CompetitionService.PLAYED_STATUSES },
              },
            });
            removedMatches += count;
            continue;
          }
          const { count } = await tx.matches.updateMany({
            where: { tournament_id: id, competition_key: fixture.key },
            data: {
              home_team_id: BigInt(homeTeamId),
              away_team_id: BigInt(awayTeamId),
              updated_at: new Date(),
            },
          });
          updatedMatches += count;
        }

        // 5. Grupo y número de sorteo de cada inscripción siguen al equipo.
        plan.slots = next;
        for (const stage of plan.stages.slice(0, 1))
          for (const group of stage.groups)
            for (const competitorId of group.teams) {
              const teamId = slotTeam.get(competitorId);
              if (!teamId) continue;
              await tx.tournament_team_registrations.update({
                where: {
                  tournament_id_team_id: {
                    tournament_id: id,
                    team_id: BigInt(teamId),
                  },
                },
                data: {
                  group_name: group.name,
                  seed: plan.teamIds.indexOf(competitorId) + 1,
                  updated_at: new Date(),
                },
              });
            }

        await tx.tournaments.update({
          where: { id },
          data: {
            competition_plan: JSON.parse(
              JSON.stringify({
                ...plan,
                lineupReason: dto.reason?.trim() || null,
              }),
            ) as Prisma.InputJsonValue,
            updated_at: new Date(),
          },
        });

        return {
          movedTeams: changedSlots.length,
          updatedMatches,
          removedMatches,
          playedMatches,
        };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        timeout: 30000,
      },
    );

    return { ...(await this.get(id, actor)), lineup: summary };
  }

  async get(id: bigint, actor: bigint) {
    const tournament = await this.tournament(this.prisma, id);
    if (
      !['registration', 'scheduled', 'in_progress', 'finished'].includes(
        tournament.phase,
      )
    )
      await this.access.assertCanViewTournament(actor, id);
    const plan = readPlan(tournament.competition_plan);
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
    const matchesByKey = new Map(
      matches.map((match) => [match.competition_key, match]),
    );
    let advanceBlocker: string | null = null;
    if (tournament.phase !== 'in_progress')
      advanceBlocker = 'El torneo debe estar En curso para resolver etapas.';
    else if (plan.champion) advanceBlocker = 'La competencia ya tiene campeón.';
    else if (hasUnfilledSlots(plan))
      advanceBlocker =
        'Completa todos los lugares del sorteo antes de resolver etapas.';
    else {
      try {
        resolveStage(plan, scores);
      } catch (error) {
        if (error instanceof BadRequestException)
          advanceBlocker = error.message;
        else throw error;
      }
    }
    return {
      plan,
      label: FORMAT_LABELS[plan.config.format],
      teams: this.competitors(plan, tournament.tournament_team_registrations),
      stages: plan.stages.map((stage) => ({
        ...stage,
        tables:
          stage.kind === 'points'
            ? stage.groups.map((g) => ({
                group: g.name,
                rows: standings(stage, g.name, scores, plan.teamIds),
              }))
            : [],
        matches: stage.fixtures.map((f) => {
          const m = matchesByKey.get(f.key);
          return {
            ...f,
            id: m?.id.toString() ?? null,
            matchDate: m?.match_date?.toISOString() ?? f.matchDate ?? null,
            venue: m?.venue ?? f.venue ?? null,
            status:
              m?.status ??
              (competitorTeamId(plan, f.home) && competitorTeamId(plan, f.away)
                ? 'missing'
                : 'awaiting_teams'),
            homeScore: m?.home_score ?? null,
            awayScore: m?.away_score ?? null,
            homePenalties: m?.home_penalties ?? null,
            awayPenalties: m?.away_penalties ?? null,
            refereeName:
              m?.match_referees[0]?.tournament_referees.users.full_name ?? null,
            refereeStatus: m?.match_referees[0]?.assignment_status ?? null,
          };
        }),
      })),
      canAdvance: advanceBlocker === null,
      advanceBlocker,
    };
  }
  async advance(id: bigint, actor: bigint, dto: AdvanceCompetitionDto) {
    await this.access.assertCanManageTournament(actor, id);
    await this.prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`SELECT id FROM tournaments WHERE id = ${id} FOR UPDATE`;
        const tournament = await this.tournament(tx, id);
        const plan = readPlan(tournament.competition_plan);
        if (tournament.phase !== 'in_progress' || !plan)
          throw new BadRequestException(
            'El torneo debe estar En curso y tener organización.',
          );
        if (plan.stages.at(-1)!.id !== dto.expectedStage)
          throw new ConflictException('La etapa cambió. Actualiza la página.');
        const matches = await tx.matches.findMany({
          where: { tournament_id: id, competition_key: { not: null } },
        });
        if (hasUnfilledSlots(plan))
          throw new BadRequestException(
            'Completa todos los lugares del sorteo antes de resolver etapas.',
          );
        const { next, champion } = resolveStage(plan, this.scores(matches));
        if (next) {
          const fixtures = scheduleFixtures(next, dto.schedule).map(
            (fixture) => ({
              ...fixture,
              venue: dto.schedule.venue || null,
              durationMinutes: dto.schedule.durationMinutes,
            }),
          );
          next.fixtures = fixtures;
          const lastEnd = Math.max(
            ...matches.map(
              (m) =>
                (m.match_date?.getTime() ?? 0) + m.duration_minutes * 60000,
            ),
          );
          this.checkDates(
            fixtures,
            new Date(Math.max(tournament.start_date.getTime(), lastEnd)),
            tournament.end_date,
          );
          plan.stages.at(-1)!.resolved = true;
          plan.stages.push(next);
          await materializeCompetitionFixtures(tx, id, plan);
        }
        if (!next) plan.stages.at(-1)!.resolved = true;
        plan.champion = champion;
        await tx.tournaments.update({
          where: { id },
          data: {
            competition_plan: JSON.parse(
              JSON.stringify(plan),
            ) as Prisma.InputJsonValue,
            updated_at: new Date(),
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        timeout: 30000,
      },
    );
    return this.get(id, actor);
  }
  private scores(
    matches: {
      competition_key: string | null;
      status: string;
      home_score: number | null;
      away_score: number | null;
      home_penalties: number | null;
      away_penalties: number | null;
    }[],
  ): Score[] {
    return matches.map((m) => ({
      key: m.competition_key!,
      status: m.status,
      homeScore: m.home_score,
      awayScore: m.away_score,
      homePenalties: m.home_penalties,
      awayPenalties: m.away_penalties,
    }));
  }
  private checkDates(
    fixtures: { matchDate?: string | null }[],
    start: Date,
    end: Date | null,
  ) {
    for (const f of fixtures)
      if (f.matchDate) {
        const time = new Date(f.matchDate).getTime();
        if (time < start.getTime() || (end && time >= end.getTime() + 86400000))
          throw new BadRequestException(
            'Las fechas generadas deben quedar dentro del torneo y después de la etapa anterior. Ajusta la fecha inicial o la frecuencia.',
          );
      }
  }
  private competitors(
    plan: CompetitionPlan,
    registrations: Array<{
      team_id: bigint;
      request_status: string;
      teams: { name: string };
    }>,
  ) {
    const names = new Map(
      registrations.map((registration) => [
        registration.team_id.toString(),
        registration.teams.name,
      ]),
    );
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
}
