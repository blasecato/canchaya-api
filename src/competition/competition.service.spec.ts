import { ForbiddenException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import {
  assignApprovedTeamToCompetition,
  CompetitionService,
} from './competition.service';
import { competitorTeamId, type CompetitionPlan } from './competition.engine';
import { PreviewCompetitionDto } from './competition.dto';

const request = {
  config: {
    format: 'groups_knockout' as const,
    legs: 1,
    groups: 2,
    qualifiers: 2,
    finalLegs: 1,
  },
  schedule: {
    durationMinutes: 90,
    breakMinutes: 30,
    matchesPerDay: 4,
    daysBetweenMatchDays: 7,
  },
  seed: '00000000-0000-4000-8000-000000000000',
  teamIds: ['1', '2', '3', '4', '5', '6'],
};
const setup = () => {
  const tournament = {
    id: 1n,
    phase: 'validation',
    competition_plan: null,
    max_teams: 6,
    start_date: new Date('2026-01-01'),
    end_date: null,
    tournament_types: { name: 'Liga' },
    tournament_team_registrations: request.teamIds.map((id) => ({
      team_id: BigInt(id),
      request_status: 'approved',
      teams: { name: `Team ${id}` },
    })),
  };
  const tx = {
    $queryRaw: jest.fn(),
    tournaments: {
      findUnique: jest.fn().mockResolvedValue(tournament),
      update: jest.fn((data: { data: { competition_plan: CompetitionPlan } }) =>
        Promise.resolve(data),
      ),
    },
    matches: {
      count: jest.fn().mockResolvedValue(0),
      createMany: jest.fn(
        (data: {
          data: {
            competition_key: string;
            home_team_id: bigint;
            away_team_id: bigint;
          }[];
        }) => Promise.resolve(data),
      ),
      findMany: jest.fn().mockResolvedValue([]),
    },
    tournament_team_registrations: { update: jest.fn() },
  };
  const prisma = {
    ...tx,
    $transaction: jest.fn((callback: (client: typeof tx) => unknown) =>
      Promise.resolve(callback(tx)),
    ),
  };
  const access = {
    assertCanManageTournament: jest.fn().mockResolvedValue(undefined),
  };
  const service = new CompetitionService(
    prisma as unknown as PrismaService,
    access as unknown as CompetitionAccessService,
  );
  return { service, prisma, access, tx, tournament };
};

describe('competition organization safeguards', () => {
  it('rejects missing nested settings, duplicate IDs and invalid formats at the HTTP boundary', async () => {
    for (const input of [
      {},
      { ...request, config: null },
      { ...request, schedule: null },
      { ...request, config: { ...request.config, format: 'unknown' } },
      { ...request, teamIds: ['1', '1', '2', '3', '4', '5'] },
    ])
      expect(
        (await validate(plainToInstance(PreviewCompetitionDto, input))).length,
      ).toBeGreaterThan(0);
    expect(
      await validate(plainToInstance(PreviewCompetitionDto, request)),
    ).toHaveLength(0);
    expect(
      await validate(
        plainToInstance(PreviewCompetitionDto, { ...request, teamIds: [] }),
      ),
    ).toHaveLength(0);
  });
  it('checks managerial access before previewing or mutating', async () => {
    const { service, access, prisma } = setup();
    access.assertCanManageTournament.mockRejectedValue(
      new ForbiddenException(),
    );
    await expect(service.preview(1n, 2n, request)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(service.generate(1n, 2n, request)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(
      service.advance(1n, 2n, { expectedStage: 1, schedule: request.schedule }),
    ).rejects.toThrow(ForbiddenException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(prisma.tournaments.findUnique).not.toHaveBeenCalled();
  });
  it('rejects stale rosters and existing matches', async () => {
    const { service, tx } = setup();
    await expect(
      service.preview(1n, 2n, {
        ...request,
        teamIds: ['1', '2', '3', '4', '5', '7'],
      }),
    ).rejects.toThrow('cambiaron');
    tx.matches.count.mockResolvedValue(1);
    await expect(service.generate(1n, 2n, request)).rejects.toThrow(
      'Ya existen',
    );
    expect(tx.matches.createMany).not.toHaveBeenCalled();
  });
  it('requires validation but allows unresolved applications', async () => {
    const { service, tournament } = setup();
    tournament.phase = 'in_progress';
    await expect(service.preview(1n, 2n, request)).rejects.toThrow(
      'Validación',
    );
    tournament.phase = 'validation';
    tournament.tournament_team_registrations.push({
      team_id: 7n,
      request_status: 'pending',
      teams: { name: 'Pending' },
    });
    await expect(service.preview(1n, 2n, request)).resolves.toBeDefined();
  });
  it('keeps preview read-only and persists exactly its draw atomically', async () => {
    const { service, tx, prisma } = setup();
    const preview = await service.preview(1n, 2n, request);
    expect(tx.matches.createMany).not.toHaveBeenCalled();
    expect(tx.tournaments.update).not.toHaveBeenCalled();
    await service.generate(1n, 2n, request);
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
    const created = tx.matches.createMany.mock.calls[0][0].data as {
      competition_key: string;
      home_team_id: bigint;
      away_team_id: bigint;
    }[];
    expect(
      created.map((m) => [
        m.competition_key,
        String(m.home_team_id),
        String(m.away_team_id),
      ]),
    ).toEqual(
      preview.fixtures.map((f) => [
        f.key,
        competitorTeamId(preview.plan, f.home),
        competitorTeamId(preview.plan, f.away),
      ]),
    );
    expect(
      tx.tournaments.update.mock.calls[0][0].data.competition_plan.teamIds,
    ).toEqual(preview.plan.teamIds);
  });
  it('rejects a schedule outside tournament dates without writing matches', async () => {
    const { service, tx } = setup();
    await expect(
      service.generate(1n, 2n, {
        ...request,
        schedule: { ...request.schedule, startAt: '2025-12-01T10:00:00Z' },
      }),
    ).rejects.toThrow('fechas');
    expect(tx.matches.createMany).not.toHaveBeenCalled();
  });

  it('builds the complete draw with placeholders when no team is approved', async () => {
    const { service, tournament, tx } = setup();
    tournament.tournament_team_registrations = [];
    const emptyRequest = { ...request, teamIds: [] };
    const preview = await service.preview(1n, 2n, emptyRequest);
    expect(preview.plan.version).toBe(2);
    expect(preview.plan.slots).toHaveLength(6);
    expect(preview.plan.slots?.every(({ teamId }) => teamId === null)).toBe(
      true,
    );
    expect(preview.fixtures).toHaveLength(6);
    await service.generate(1n, 2n, emptyRequest);
    expect(tx.matches.createMany).not.toHaveBeenCalled();
    expect(tx.tournaments.update).toHaveBeenCalled();
  });

  it('materializes only fixtures whose two places already have real teams', async () => {
    const { service, tournament, tx } = setup();
    tournament.tournament_team_registrations =
      tournament.tournament_team_registrations.slice(0, 2);
    const partialRequest = { ...request, teamIds: ['1', '2'] };
    const preview = await service.preview(1n, 2n, partialRequest);
    await service.generate(1n, 2n, partialRequest);
    const expected = preview.fixtures.filter(
      (fixture) =>
        competitorTeamId(preview.plan, fixture.home) &&
        competitorTeamId(preview.plan, fixture.away),
    );
    const created = tx.matches.createMany.mock.calls[0]?.[0].data ?? [];
    expect(created).toHaveLength(expected.length);
    expect(
      preview.plan.slots?.filter(({ teamId }) => teamId === null),
    ).toHaveLength(4);
  });

  it('fills the next placeholder while the tournament is scheduled', async () => {
    const { service, tournament } = setup();
    tournament.tournament_team_registrations =
      tournament.tournament_team_registrations.slice(0, 2);
    const preview = await service.preview(1n, 2n, {
      ...request,
      teamIds: ['1', '2'],
    });
    const persistedPlan = JSON.parse(
      JSON.stringify(preview.plan),
    ) as CompetitionPlan;
    const registrationUpdate = jest.fn();
    const tournamentUpdate = jest.fn();
    const tx = {
      $queryRaw: jest.fn(),
      tournaments: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          phase: 'scheduled',
          competition_plan: persistedPlan,
        }),
        update: tournamentUpdate,
      },
      tournament_team_registrations: { update: registrationUpdate },
      matches: { createMany: jest.fn() },
    } as unknown as Prisma.TransactionClient;
    await assignApprovedTeamToCompetition(tx, 1n, 30n);
    expect(persistedPlan.slots?.find(({ id }) => id === 'slot-3')?.teamId).toBe(
      '30',
    );
    expect(registrationUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          tournament_id_team_id: { tournament_id: 1n, team_id: 30n },
        },
      }),
    );
    expect(tournamentUpdate).toHaveBeenCalled();
  });
});
