import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import {
  firstStage,
  type CompetitionPlan,
} from '../competition/competition.engine';
import { MatchOperationalNotificationsService } from '../notifications/match-operational-notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefereeAssignmentsService } from '../referees/referee-assignments.service';
import { MatchesService } from './matches.service';

const service = new MatchesService(
  {} as PrismaService,
  {} as CompetitionAccessService,
  {} as RefereeAssignmentsService,
  {} as MatchOperationalNotificationsService,
);
const config = {
  format: 'knockout' as const,
  legs: 1,
  groups: 1,
  qualifiers: 1,
  finalLegs: 1,
};
const stage = firstStage(config, ['1', '2', '3', '4', '5', '6']);
const plan: CompetitionPlan = {
  version: 1,
  config,
  teamIds: ['1', '2', '3', '4', '5', '6'],
  stages: [stage],
  champion: null,
  seed: '',
  createdAt: '',
  createdBy: '1',
  originalType: '',
  changeReason: null,
};
const transaction = (competitionPlan: CompetitionPlan, phase = 'in_progress') =>
  ({
    tournaments: {
      findUniqueOrThrow: jest
        .fn()
        .mockResolvedValue({ phase, competition_plan: competitionPlan }),
    },
  }) as unknown as Prisma.TransactionClient;
const validate = service['assertManagedMatchUpdate'].bind(service);
it('requires penalties for tied knockout results and forbids tied shootouts', async () => {
  const tx = transaction(plan);
  await expect(
    validate(tx, 1n, stage.fixtures[0].key, {}, 'played', 1, 1, null, null),
  ).rejects.toThrow('penaltis');
  await expect(
    validate(tx, 1n, stage.fixtures[0].key, {}, 'played', 1, 1, 3, 3),
  ).rejects.toThrow('ganador');
  await expect(
    validate(tx, 1n, stage.fixtures[0].key, {}, 'played', 1, 1, 3, 4),
  ).resolves.toBeUndefined();
});
it('freezes fixtures after the draw and results after resolving the stage', async () => {
  await expect(
    validate(
      transaction(plan),
      1n,
      stage.fixtures[0].key,
      { homeTeamId: '9' },
      'scheduled',
      null,
      null,
      null,
      null,
    ),
  ).rejects.toThrow('sorteo');
  await expect(
    validate(
      transaction({ ...plan, stages: [{ ...stage, resolved: true }] }),
      1n,
      stage.fixtures[0].key,
      {},
      'played',
      1,
      0,
      null,
      null,
    ),
  ).rejects.toThrow('bloqueados');
});
it('does not allow results before the tournament starts', async () => {
  await expect(
    validate(
      transaction(plan, 'validation'),
      1n,
      stage.fixtures[0].key,
      {},
      'played',
      1,
      0,
      null,
      null,
    ),
  ).rejects.toThrow('Inicia');
});
it('does not count penalty shootouts in points stages', async () => {
  await expect(
    validate(
      transaction({ ...plan, stages: [{ ...stage, kind: 'points' }] }),
      1n,
      stage.fixtures[0].key,
      {},
      'played',
      1,
      1,
      3,
      4,
    ),
  ).rejects.toThrow('eliminatorias');
});
