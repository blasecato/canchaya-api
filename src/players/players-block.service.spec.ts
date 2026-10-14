import { PlayersService } from './players.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { BlockPlayerDto } from './dto/block-player.dto';

describe('PlayersService: bloqueo de jugadores', () => {
  const usersUpdate = jest.fn();
  const usersFindMany = jest.fn();
  const usersFindFirst = jest.fn();
  const rosterFindMany = jest.fn();
  const associationsFindMany = jest.fn();
  const sessionsUpdateMany = jest.fn();
  const notificationsCreate = jest.fn();
  const notificationsCreateMany = jest.fn();
  const transactionClient = {
    users: { update: usersUpdate, findMany: usersFindMany },
    tournament_team_players: { findMany: rosterFindMany },
    associations: { findMany: associationsFindMany },
    auth_sessions: { updateMany: sessionsUpdateMany },
    notifications: {
      create: notificationsCreate,
      createMany: notificationsCreateMany,
    },
  };
  const usersFindUnique = jest.fn();
  const prisma = {
    users: { findFirst: usersFindFirst, findUnique: usersFindUnique },
    $transaction: jest.fn(
      async (callback: (tx: unknown) => Promise<unknown>) =>
        callback(transactionClient),
    ),
  } as unknown as PrismaService;
  const service = new PlayersService(prisma, {} as ImageStorageService);
  const dto: BlockPlayerDto = {
    reason: 'Agresión al árbitro',
    duration: 'one_week',
  };
  const playerRecord = {
    id: 9n,
    full_name: 'Juan Pérez',
    id_number: '123',
    document_type: 'CC',
    email: 'juan@test.com',
    phone: null,
    birth_date: new Date('1996-01-01'),
    birth_city: null,
    gender: 'male',
    status: 'inactive',
    photo_url: null,
    blocked_until: new Date('2026-10-19T00:00:00.000Z'),
    block_reason: dto.reason,
    created_at: new Date(),
    updated_at: new Date(),
    user_roles: [{ role_code: 'PLAYER' }],
    team_members: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    usersFindFirst.mockResolvedValue({ id: 9n });
    usersFindUnique.mockResolvedValue({ full_name: 'Laura Martínez' });
    usersUpdate.mockResolvedValue(playerRecord);
    // Un superadministrador y el jugador compitiendo en la organización 20.
    usersFindMany.mockResolvedValue([{ id: 1n }]);
    rosterFindMany.mockResolvedValue([
      { tournament_team_registrations: { tournaments: { association_id: 20n } } },
    ]);
    associationsFindMany.mockResolvedValue([
      {
        owner_user_id: 30n,
        association_administrators: [{ user_id: 31n }],
      },
    ]);
  });

  it('notifica al superadministrador, a quien bloquea y a la organización donde compite', async () => {
    await service.block(9n, 4n, dto);

    const avisos = notificationsCreateMany.mock.calls[0][0].data;
    expect(avisos.map(({ user_id }: { user_id: bigint }) => user_id).sort()).toEqual(
      [1n, 4n, 30n, 31n].sort(),
    );
    expect(avisos[0]).toMatchObject({
      type: 'system',
      title: 'Un jugador fue bloqueado',
      entity_type: 'user_block',
    });
    expect(avisos[0].message).toContain('Juan Pérez');
    expect(avisos[0].message).toContain(dto.reason);
    // El aviso dice por cuánto tiempo y quién lo registró.
    expect(avisos[0].message).toContain('1 semana');
    expect(avisos[0].message).toContain('Laura Martínez');
  });

  it('avisa al jugador bloqueado con su propio mensaje', async () => {
    await service.block(9n, 4n, dto);

    expect(notificationsCreate).toHaveBeenCalledTimes(1);
    expect(notificationsCreate.mock.calls[0][0].data).toMatchObject({
      user_id: 9n,
      title: 'Tu cuenta fue bloqueada por 1 semana',
    });
    expect(notificationsCreate.mock.calls[0][0].data.message).toContain(
      dto.reason,
    );
    // El jugador no aparece además en el aviso dirigido a la administración.
    const avisos = notificationsCreateMany.mock.calls[0][0].data;
    expect(avisos.some(({ user_id }: { user_id: bigint }) => user_id === 9n)).toBe(
      false,
    );
  });

  it('solo avisa a los superadministradores cuando no compite en ningún torneo', async () => {
    rosterFindMany.mockResolvedValue([]);
    associationsFindMany.mockResolvedValue([]);

    await service.block(9n, 4n, dto);

    const avisos = notificationsCreateMany.mock.calls[0][0].data;
    expect(avisos.map(({ user_id }: { user_id: bigint }) => user_id).sort()).toEqual(
      [1n, 4n].sort(),
    );
    expect(associationsFindMany).not.toHaveBeenCalled();
  });

  it('también notifica al levantar el bloqueo', async () => {
    await service.unblock(9n, 4n);

    expect(notificationsCreateMany.mock.calls[0][0].data[0]).toMatchObject({
      title: 'Se levantó el bloqueo de un jugador',
    });
  });

  it('no deja que un administrador se bloquee a sí mismo', async () => {
    await expect(service.block(4n, 4n, dto)).rejects.toThrow(
      'No puedes bloquear tu propia cuenta.',
    );
    expect(notificationsCreateMany).not.toHaveBeenCalled();
  });
});
