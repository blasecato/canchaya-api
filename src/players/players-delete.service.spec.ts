import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { PlayersService } from './players.service';

const setup = (
  options: {
    player?: unknown;
    counts?: Partial<{
      stats: number;
      charges: number;
      discipline: number;
      captainTeams: number;
      createdTeams: number;
      requested: number;
      events: number;
    }>;
    deleteError?: unknown;
  } = {},
) => {
  const counts = {
    stats: 0,
    charges: 0,
    discipline: 0,
    captainTeams: 0,
    createdTeams: 0,
    requested: 0,
    events: 0,
    ...options.counts,
  };
  const usersDelete = jest.fn();
  const rosterDeleteMany = jest.fn().mockResolvedValue({ count: 2 });
  const membersDeleteMany = jest.fn().mockResolvedValue({ count: 1 });
  const deleteSafely = jest.fn().mockResolvedValue(undefined);
  if (options.deleteError) usersDelete.mockRejectedValue(options.deleteError);

  const prisma = {
    users: {
      findFirst: jest.fn().mockResolvedValue(
        options.player === undefined
          ? {
              id: 9n,
              full_name: 'Juan Pérez',
              photo_url: 'https://cdn/foto.jpg',
              photo_public_id: 'foto',
              user_roles: [{ role_code: 'PLAYER' }],
            }
          : options.player,
      ),
    },
    player_match_stats: { count: jest.fn().mockResolvedValue(counts.stats) },
    tournament_card_charges: {
      count: jest.fn().mockResolvedValue(counts.charges),
    },
    disciplinary_actions: {
      count: jest.fn().mockResolvedValue(counts.discipline),
    },
    teams: {
      count: jest
        .fn()
        .mockResolvedValueOnce(counts.captainTeams)
        .mockResolvedValueOnce(counts.createdTeams),
    },
    tournament_team_registrations: {
      count: jest.fn().mockResolvedValue(counts.requested),
    },
    tournament_registration_events: {
      count: jest.fn().mockResolvedValue(counts.events),
    },
    $transaction: jest.fn(async (callback: (tx: unknown) => Promise<unknown>) =>
      callback({
        tournament_team_players: { deleteMany: rosterDeleteMany },
        team_members: { deleteMany: membersDeleteMany },
        users: { delete: usersDelete },
      }),
    ),
  } as unknown as PrismaService;
  const service = new PlayersService(prisma, {
    deleteSafely,
  } as unknown as ImageStorageService);
  return { service, usersDelete, rosterDeleteMany, membersDeleteMany, deleteSafely };
};

describe('PlayersService: eliminar jugadores', () => {
  it('borra la cuenta, sus inscripciones, sus equipos y su foto', async () => {
    const { service, usersDelete, rosterDeleteMany, membersDeleteMany, deleteSafely } =
      setup();

    const result = await service.remove(9n, 1n);

    expect(result).toEqual({
      id: '9',
      fullName: 'Juan Pérez',
      removedTeamMemberships: 1,
      removedTournamentRosters: 2,
    });
    // La plantilla del torneo cuelga de la membresía: se borra primero.
    expect(rosterDeleteMany).toHaveBeenCalledWith({ where: { player_id: 9n } });
    expect(membersDeleteMany).toHaveBeenCalledWith({ where: { user_id: 9n } });
    expect(usersDelete).toHaveBeenCalledWith({ where: { id: 9n } });
    expect(deleteSafely).toHaveBeenCalledWith({
      url: 'https://cdn/foto.jpg',
      publicId: 'foto',
    });
  });

  it('no deja borrar la propia cuenta', async () => {
    const { service, usersDelete } = setup();
    await expect(service.remove(9n, 9n)).rejects.toThrow(
      'No puedes eliminar tu propia cuenta.',
    );
    expect(usersDelete).not.toHaveBeenCalled();
  });

  it('avisa cuando el jugador no existe', async () => {
    const { service } = setup({ player: null });
    await expect(service.remove(9n, 1n)).rejects.toThrow('no existe');
  });

  it('protege las cuentas que además son árbitro o administrador', async () => {
    const { service, usersDelete } = setup({
      player: {
        id: 9n,
        full_name: 'Juan Pérez',
        photo_url: null,
        photo_public_id: null,
        user_roles: [{ role_code: 'PLAYER' }, { role_code: 'REFEREE' }],
      },
    });
    await expect(service.remove(9n, 1n)).rejects.toThrow('Árbitro');
    expect(usersDelete).not.toHaveBeenCalled();
  });

  it('bloquea el borrado cuando el jugador tiene historia deportiva', async () => {
    const stats = setup({ counts: { stats: 3 } });
    await expect(stats.service.remove(9n, 1n)).rejects.toThrow(
      'estadísticas en 3 partidos',
    );

    const charges = setup({ counts: { charges: 1 } });
    await expect(charges.service.remove(9n, 1n)).rejects.toThrow(
      'cobros de tarjetas',
    );

    const discipline = setup({ counts: { discipline: 1 } });
    await expect(discipline.service.remove(9n, 1n)).rejects.toThrow(
      'procesos disciplinarios',
    );
  });

  it('bloquea el borrado del capitán o creador de un equipo', async () => {
    const captain = setup({ counts: { captainTeams: 1 } });
    await expect(captain.service.remove(9n, 1n)).rejects.toThrow(
      'es capitán de 1 equipo',
    );

    const creator = setup({ counts: { createdTeams: 2 } });
    await expect(creator.service.remove(9n, 1n)).rejects.toThrow(
      'creó 2 equipos',
    );
  });

  it('traduce la violación de llave foránea a un mensaje para el usuario', async () => {
    const { service } = setup({
      deleteError: new Prisma.PrismaClientKnownRequestError('FK', {
        code: 'P2003',
        clientVersion: '7.9.1',
      }),
    });
    await expect(service.remove(9n, 1n)).rejects.toThrow(
      'información asociada en el sistema',
    );
  });
});
