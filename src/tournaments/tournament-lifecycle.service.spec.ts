import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { TournamentLifecycleService } from './tournament-lifecycle.service';

it('uses a supported notification type when advancing to validation', async () => {
  const createMany = jest.fn();
  const transaction = {
    tournament_referees: {
      findMany: jest.fn().mockResolvedValue([{ user_id: 7n }]),
    },
    tournament_team_players: {
      findMany: jest
        .fn()
        .mockResolvedValue([{ player_id: 12n }, { player_id: 1n }]),
    },
    notifications: { createMany },
  };
  const service = new TournamentLifecycleService(
    {} as PrismaService,
    {} as CompetitionAccessService,
  );
  const snapshot = {
    id: 62n,
    name: 'Copa',
    phase: 'registration',
    registrations: [{ captainUserId: 12n }],
  } as Parameters<(typeof service)['notifyLifecycleChange']>[1];
  await service['notifyLifecycleChange'](
    transaction as unknown as Prisma.TransactionClient,
    snapshot,
    'validation',
    1n,
    null,
  );
  expect(createMany).toHaveBeenCalledTimes(1);
  const notifications = createMany.mock.calls[0][0].data;
  expect(notifications).toHaveLength(2);
  expect(
    notifications.map((item: { user_id: bigint }) => item.user_id),
  ).toEqual([12n, 7n]);
  for (const notification of notifications) {
    expect(notification).toMatchObject({
      type: 'tournament',
      entity_type: 'tournament',
      entity_id: '62',
      metadata: {
        fromPhase: 'registration',
        toPhase: 'validation',
        tournamentId: '62',
      },
    });
  }
});

it('allows entering validation without registrations so the organizer can draw placeholders', () => {
  const service = new TournamentLifecycleService(
    {} as PrismaService,
    {} as CompetitionAccessService,
  );
  const snapshot = {
    id: 1n,
    name: 'Copa anticipada',
    phase: 'registration',
    status: 'active',
    registrations: [],
    matches: [],
  } as Parameters<(typeof service)['findBlockers']>[0];
  expect(service['findBlockers'](snapshot, 'validation')).toEqual([]);
});

it('allows scheduling with placeholders and moves completion checks to start', () => {
  const service = new TournamentLifecycleService(
    {} as PrismaService,
    {} as CompetitionAccessService,
  );
  const snapshot = {
    id: 1n,
    name: 'Copa anticipada',
    phase: 'validation',
    status: 'active',
    maxTeams: 6,
    minPlayersPerTeam: 1,
    maxPlayersPerTeam: 25,
    startDate: new Date('2026-10-01'),
    categoryName: 'Libre',
    categoryMinAge: null,
    categoryMaxAge: null,
    categoryGender: 'open',
    registrations: [],
    matches: [],
    competitionPlan: {
      version: 2,
      config: {
        format: 'league',
        legs: 1,
        groups: 1,
        qualifiers: 1,
        finalLegs: 1,
      },
      seed: 'seed',
      teamIds: Array.from({ length: 6 }, (_, index) => `slot-${index + 1}`),
      slots: Array.from({ length: 6 }, (_, index) => ({
        id: `slot-${index + 1}`,
        label: `Equipo ${index + 1}`,
        teamId: null,
      })),
      stages: [],
      champion: null,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      originalType: 'Eliminación directa',
      changeReason: null,
    },
  } as Parameters<(typeof service)['findBlockers']>[0];
  expect(service['findBlockers'](snapshot, 'scheduled')).toEqual([]);
  expect(service['findBlockers'](snapshot, 'in_progress')).toEqual(
    expect.arrayContaining([
      expect.stringContaining('Completa los 6 lugares'),
      expect.stringContaining('Todos los lugares del sorteo'),
      expect.stringContaining('al menos seis equipos'),
      expect.stringContaining('al menos un partido'),
    ]),
  );
});

it('requires a confirmed organization before scheduling', () => {
  const service = new TournamentLifecycleService(
    {} as PrismaService,
    {} as CompetitionAccessService,
  );
  const snapshot = {
    id: 1n,
    name: 'Copa sin organización',
    phase: 'validation',
    status: 'active',
    registrations: [],
    matches: [],
    competitionPlan: null,
  } as Parameters<(typeof service)['findBlockers']>[0];
  expect(service['findBlockers'](snapshot, 'scheduled')).toEqual([
    expect.stringContaining('Organiza y confirma'),
  ]);
});
