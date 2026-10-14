jest.mock('sanitize-html', () => ({
  __esModule: true,
  default: (value: string) => value,
}));

import { Prisma } from '../../generated/prisma/client';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssociationsService } from '../associations/associations.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';

describe('TournamentsService: agregar equipos desde la organización', () => {
  const tournamentsFindUnique = jest.fn();
  const teamsFindMany = jest.fn();
  const registrationsFindMany = jest.fn();
  const registrationsCreate = jest.fn();
  const eventsCreate = jest.fn();
  const rosterCreateMany = jest.fn();
  const notificationsCreate = jest.fn();
  const prisma = {
    tournaments: { findUnique: tournamentsFindUnique },
    teams: { findMany: teamsFindMany },
    tournament_team_registrations: { findMany: registrationsFindMany },
    $transaction: jest.fn(
      async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          tournament_team_registrations: { create: registrationsCreate },
          tournament_registration_events: { create: eventsCreate },
          tournament_team_players: { createMany: rosterCreateMany },
          notifications: { create: notificationsCreate },
          tournaments: {
            findUniqueOrThrow: jest
              .fn()
              .mockResolvedValue({ competition_plan: null, phase: 'registration' }),
          },
          // El reparto en el sorteo bloquea la fila del torneo antes de tocarla.
          $queryRaw: jest.fn().mockResolvedValue([]),
        }),
    ),
  } as unknown as PrismaService;
  const service = new TournamentsService(
    prisma,
    {} as AssociationsService,
    {} as ImageStorageService,
    {} as CompetitionAccessService,
  );

  const player = (overrides: Record<string, unknown> = {}) => ({
    user_id: 1n,
    users: {
      full_name: 'Jugador',
      birth_date: new Date('2000-01-01'),
      gender: 'male',
      status: 'active',
      block_reason: null,
      ...overrides,
    },
  });
  const roster = (count: number, overrides: Record<string, unknown> = {}) =>
    Array.from({ length: count }, (_item, index) => ({
      ...player(overrides),
      user_id: BigInt(index + 1),
    }));

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(
        service as unknown as { requireManagementPermission: () => Promise<void> },
        'requireManagementPermission',
      )
      .mockResolvedValue(undefined);
    tournamentsFindUnique.mockResolvedValue({
      association_id: 4n,
      name: 'Copa Pitalito',
      max_teams: 8,
      min_players_per_team: 7,
      max_players_per_team: 20,
      registration_fee: new Prisma.Decimal(0),
      start_date: new Date('2026-11-01'),
      category_name: 'Libre',
      category_min_age: null,
      category_max_age: null,
      category_gender: 'open',
      _count: { tournament_team_registrations: 0 },
    });
    registrationsFindMany.mockResolvedValue([]);
  });

  it('agrega los equipos válidos y los deja aprobados', async () => {
    teamsFindMany.mockResolvedValue([
      {
        id: 3n,
        name: 'Los Galácticos',
        status: 'active',
        captain_user_id: 1n,
        team_members: roster(8),
      },
    ]);

    const result = await service.addTeamsAsManager(7n, [3n], 9n);

    expect(result.added).toEqual([{ teamId: '3', teamName: 'Los Galácticos' }]);
    expect(result.rejected).toHaveLength(0);
    expect(result.availableSlots).toBe(7);
    expect(registrationsCreate.mock.calls[0][0].data.request_status).toBe(
      'approved',
    );
    expect(rosterCreateMany).toHaveBeenCalledTimes(1);
  });

  it('rechaza el equipo ya inscrito sin tocar los demás', async () => {
    registrationsFindMany.mockResolvedValue([{ team_id: 3n }]);
    teamsFindMany.mockResolvedValue([
      {
        id: 3n,
        name: 'Los Galácticos',
        status: 'active',
        captain_user_id: 1n,
        team_members: roster(8),
      },
      {
        id: 4n,
        name: 'Vereda FC',
        status: 'active',
        captain_user_id: 2n,
        team_members: roster(8),
      },
    ]);

    const result = await service.addTeamsAsManager(7n, [3n, 4n], 9n);

    expect(result.added.map(({ teamName }) => teamName)).toEqual(['Vereda FC']);
    expect(result.rejected[0]).toMatchObject({
      teamName: 'Los Galácticos',
      reason: 'Ya estaba inscrito en este torneo.',
    });
  });

  it('explica el motivo cuando hay jugadores bloqueados', async () => {
    teamsFindMany.mockResolvedValue([
      {
        id: 5n,
        name: 'Sancionados FC',
        status: 'active',
        captain_user_id: 1n,
        team_members: [
          ...roster(7),
          player({
            full_name: 'Juan Pérez',
            status: 'inactive',
            block_reason: 'Agresión',
          }),
        ],
      },
    ]);

    const result = await service.addTeamsAsManager(7n, [5n], 9n);

    expect(result.added).toHaveLength(0);
    expect(result.rejected[0].reason).toContain('Juan Pérez');
    expect(registrationsCreate).not.toHaveBeenCalled();
  });

  it('explica el motivo cuando la plantilla no alcanza el mínimo', async () => {
    teamsFindMany.mockResolvedValue([
      {
        id: 6n,
        name: 'Cortos FC',
        status: 'active',
        captain_user_id: 1n,
        team_members: roster(5),
      },
    ]);

    const result = await service.addTeamsAsManager(7n, [6n], 9n);

    expect(result.rejected[0].reason).toContain('5 jugadores');
    expect(result.rejected[0].reason).toContain('entre 7 y 20');
  });

  it('corta cuando se acaban los cupos', async () => {
    tournamentsFindUnique.mockResolvedValue({
      association_id: 4n,
      name: 'Copa Pitalito',
      max_teams: 1,
      min_players_per_team: 7,
      max_players_per_team: 20,
      registration_fee: new Prisma.Decimal(0),
      start_date: new Date('2026-11-01'),
      category_name: 'Libre',
      category_min_age: null,
      category_max_age: null,
      category_gender: 'open',
      _count: { tournament_team_registrations: 1 },
    });
    teamsFindMany.mockResolvedValue([
      {
        id: 3n,
        name: 'Los Galácticos',
        status: 'active',
        captain_user_id: 1n,
        team_members: roster(8),
      },
    ]);

    const result = await service.addTeamsAsManager(7n, [3n], 9n);

    expect(result.rejected[0].reason).toBe(
      'El torneo se quedó sin cupos disponibles.',
    );
  });
});
