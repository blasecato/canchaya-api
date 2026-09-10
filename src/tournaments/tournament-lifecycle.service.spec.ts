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
