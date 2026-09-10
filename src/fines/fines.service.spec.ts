import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { FinesService } from './fines.service';

describe('FinesService security', () => {
  const actionFindUnique = jest.fn();
  const fineCreate = jest.fn();
  const prisma = {
    disciplinary_actions: { findUnique: actionFindUnique },
    fines: { create: fineCreate },
  } as unknown as PrismaService;
  const access = {
    assertCanManageTournament: jest.fn(),
  } as unknown as CompetitionAccessService;
  const service = new FinesService(prisma, access);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registra como creador al usuario autenticado', async () => {
    actionFindUnique.mockResolvedValue({
      id: 10n,
      tournament_id: 20n,
      player_id: 30n,
    });
    fineCreate.mockResolvedValue({ id: 1n });

    await service.create(77n, {
      disciplinaryActionId: '10',
      amount: 50_000,
    });

    const [call] = fineCreate.mock.calls[0] as unknown as [
      { data: { created_by: bigint } },
    ];
    expect(call.data.created_by).toBe(77n);
  });
});
