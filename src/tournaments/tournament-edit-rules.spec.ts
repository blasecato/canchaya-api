import { BadRequestException } from '@nestjs/common';

// El servicio importa sanitize-html, que Jest no puede cargar como ESM.
jest.mock('sanitize-html', () => ({
  __esModule: true,
  default: (value: string) => value,
}));

import { TournamentsService } from './tournaments.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssociationsService } from '../associations/associations.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';

describe('TournamentsService: edición durante el torneo', () => {
  const registrationsCount = jest.fn();
  const registrationsFindMany = jest.fn();
  const client = {
    tournament_team_registrations: {
      count: registrationsCount,
      findMany: registrationsFindMany,
    },
  };
  const service = new TournamentsService(
    {} as PrismaService,
    {} as AssociationsService,
    {} as ImageStorageService,
    {} as CompetitionAccessService,
  );
  const assertAllowed = (
    tournament: Record<string, unknown>,
    dto: Record<string, unknown>,
  ) =>
    (
      service as unknown as {
        assertTournamentUpdateAllowed: (
          client: unknown,
          tournament: unknown,
          dto: unknown,
        ) => Promise<void>;
      }
    ).assertTournamentUpdateAllowed(client, tournament, dto);

  const tournament = {
    id: 7n,
    phase: 'in_progress',
    max_teams: 16,
    min_players_per_team: 7,
    max_players_per_team: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    registrationsCount.mockResolvedValue(8);
    registrationsFindMany.mockResolvedValue([]);
  });

  it('permite cambiar el formato con el torneo ya en curso', async () => {
    await expect(
      assertAllowed(tournament, {
        tournamentTypeId: '9',
        categoryName: 'Sub 23',
        maxTeams: 20,
      }),
    ).resolves.toBeUndefined();
  });

  it('impide dejar el cupo por debajo de los equipos aprobados', async () => {
    registrationsCount.mockResolvedValue(10);

    await expect(assertAllowed(tournament, { maxTeams: 6 })).rejects.toThrow(
      'ya tiene 10 equipos aprobados',
    );
  });

  it('avisa si el nuevo rango de jugadores deja plantillas fuera de norma', async () => {
    registrationsFindMany.mockResolvedValue([
      { teams: { name: 'Los Galácticos' }, _count: { tournament_team_players: 7 } },
      { teams: { name: 'Vereda FC' }, _count: { tournament_team_players: 9 } },
    ]);

    await expect(
      assertAllowed(tournament, { minPlayersPerTeam: 10 }),
    ).rejects.toThrow('Los Galácticos');
  });

  it('bloquea la edición de un torneo archivado o cancelado', async () => {
    await expect(
      assertAllowed({ ...tournament, phase: 'cancelled' }, { maxTeams: 20 }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('deja editar un torneo finalizado para corregir su información', async () => {
    await expect(
      assertAllowed({ ...tournament, phase: 'finished' }, { maxTeams: 20 }),
    ).resolves.toBeUndefined();
  });
});
