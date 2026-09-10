import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { SuspensionsService } from './suspensions.service';

describe('SuspensionsService security', () => {
  const actionFindUnique = jest.fn();
  const suspensionCreate = jest.fn();
  const prisma = {
    disciplinary_actions: { findUnique: actionFindUnique },
    suspensions: { create: suspensionCreate },
  } as unknown as PrismaService;
  const access = {
    assertCanManageTournament: jest.fn(),
  } as unknown as CompetitionAccessService;
  const service = new SuspensionsService(prisma, access);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registra como creador al usuario autenticado', async () => {
    actionFindUnique.mockResolvedValue({
      id: 10n,
      tournament_id: 20n,
      player_id: 30n,
    });
    suspensionCreate.mockResolvedValue({ id: 1n });

    await service.create(77n, {
      disciplinaryActionId: '10',
      matchesCount: 2,
    });

    const [call] = suspensionCreate.mock.calls[0] as unknown as [
      { data: { created_by: bigint } },
    ];
    expect(call.data.created_by).toBe(77n);
  });
});
