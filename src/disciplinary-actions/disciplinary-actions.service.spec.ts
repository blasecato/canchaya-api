import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { DisciplinaryActionsService } from './disciplinary-actions.service';

describe('DisciplinaryActionsService security', () => {
  const actionCreate = jest.fn();
  const rosterFindUnique = jest.fn();
  const prisma = {
    disciplinary_actions: { create: actionCreate },
    tournament_team_players: { findUnique: rosterFindUnique },
  } as unknown as PrismaService;
  const access = {
    assertCanManageTournament: jest.fn(),
  } as unknown as CompetitionAccessService;
  const service = new DisciplinaryActionsService(prisma, access);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('toma el reportante del JWT y crea la acción pendiente de decisión', async () => {
    rosterFindUnique.mockResolvedValue({ registration_status: 'approved' });
    actionCreate.mockResolvedValue({ id: 1n });

    await service.create(77n, {
      tournamentId: '1',
      teamId: '2',
      playerId: '3',
      reason: 'Conducta antideportiva',
    });

    const [call] = actionCreate.mock.calls[0] as unknown as [
      {
        data: {
          reported_by: bigint;
          decision_status: string;
          decided_by: bigint | null;
        };
      },
    ];
    expect(call.data.reported_by).toBe(77n);
    expect(call.data.decision_status).toBe('reported');
    expect(call.data.decided_by).toBeNull();
  });
});
