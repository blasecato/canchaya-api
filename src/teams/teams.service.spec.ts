import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { TeamsService } from './teams.service';

describe('TeamsService.removeMember permissions', () => {
  const findRoles = jest.fn();
  const transaction = jest.fn();
  const prisma = {
    user_roles: { findMany: findRoles },
    teams: {
      findUnique: jest.fn().mockResolvedValue({
        id: 1n,
        name: 'Equipo',
        status: 'active',
        captain_user_id: 12n,
        team_members: [{ user_id: 13n, users: { full_name: 'Jugador' } }],
      }),
    },
    $transaction: transaction,
  };
  const service = new TeamsService(
    prisma as unknown as PrismaService,
    {} as ImageStorageService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    transaction.mockResolvedValue(undefined);
  });

  it.each([
    ['SUPER_ADMIN', 1n],
    ['PLAYER', 12n],
    ['ASSOCIATION_ADMIN', 12n],
  ])('allows %s with user ID %s', async (role, userId) => {
    findRoles.mockResolvedValue([{ role_code: role }]);
    await expect(service.removeMember(1n, 13n, userId)).resolves.toMatchObject({
      playerId: '13',
    });
    expect(transaction).toHaveBeenCalledTimes(1);
  });

  it.each(['PLAYER', 'ASSOCIATION_ADMIN', 'REFEREE'])(
    'rejects a non-captain %s before writing',
    async (role) => {
      findRoles.mockResolvedValue([{ role_code: role }]);
      await expect(service.removeMember(1n, 13n, 99n)).rejects.toThrow(
        ForbiddenException,
      );
      expect(transaction).not.toHaveBeenCalled();
    },
  );

  it('requires transferring captaincy before removing the captain', async () => {
    findRoles.mockResolvedValue([{ role_code: 'SUPER_ADMIN' }]);
    await expect(service.removeMember(1n, 12n, 1n)).rejects.toThrow(
      BadRequestException,
    );
    expect(transaction).not.toHaveBeenCalled();
  });
});
