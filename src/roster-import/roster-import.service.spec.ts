import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { RosterImportService } from './roster-import.service';

jest.mock('bcryptjs', () => ({ hash: jest.fn().mockResolvedValue('hashed') }));

const player = (
  row: number,
  overrides: Partial<{
    fullName: string;
    email: string;
    idNumber: string;
    birthDate: string;
    gender: string;
    position: string;
    jerseyNumber: number;
    isCaptain: boolean;
  }> = {},
) => ({
  row,
  fullName: overrides.fullName ?? `Jugador ${row}`,
  email: overrides.email ?? `jugador${row}@correo.com`,
  phone: '3001234567',
  documentType: 'CC',
  idNumber: overrides.idNumber ?? `100${row}`,
  birthDate: overrides.birthDate ?? '2000-05-10',
  gender: overrides.gender ?? 'male',
  position: overrides.position ?? 'Delantero',
  jerseyNumber: overrides.jerseyNumber,
  isCaptain: overrides.isCaptain ?? row === 1,
});

const sheet = (name: string, players: ReturnType<typeof player>[]) => ({
  sheetName: name,
  teamName: name,
  players,
});

const tournament = {
  id: 7n,
  name: 'Copa Laboyana',
  association_id: 3n,
  phase: 'registration',
  status: 'active',
  modality: 'Fútbol 8',
  max_teams: 8,
  min_players_per_team: 2,
  max_players_per_team: 10,
  start_date: new Date('2026-03-01T00:00:00.000Z'),
  category_name: 'Libre',
  category_min_age: null as number | null,
  category_max_age: null as number | null,
  category_gender: 'open',
  registration_fee: new Prisma.Decimal(0),
};

const setup = (
  options: {
    tournament?: Partial<typeof tournament>;
    teams?: { id: bigint; name: string; status: string; captain_user_id: bigint }[];
    users?: {
      id: bigint;
      id_number: string;
      email: string;
      full_name: string;
      status: string;
      block_reason: string | null;
    }[];
    roster?: {
      player_id: bigint;
      team_id: bigint;
      tournament_team_registrations: { teams: { name: string } };
    }[];
    registration?: { request_status: string } | null;
    registrationCount?: number;
  } = {},
) => {
  let nextUserId = 500n;
  const tx = {
    $queryRaw: jest.fn(),
    users: {
      create: jest.fn(() => {
        nextUserId += 1n;
        return Promise.resolve({ id: nextUserId });
      }),
    },
    user_roles: { createMany: jest.fn() },
    teams: { create: jest.fn().mockResolvedValue({ id: 90n }) },
    team_members: { createMany: jest.fn(), updateMany: jest.fn() },
    tournaments: {
      findUniqueOrThrow: jest
        .fn()
        .mockResolvedValue({ competition_plan: null, phase: 'registration' }),
    },
    tournament_team_registrations: { create: jest.fn() },
    tournament_registration_events: { create: jest.fn() },
    tournament_team_players: { createMany: jest.fn() },
    notifications: { create: jest.fn() },
  };
  const prisma = {
    tournaments: {
      findUnique: jest
        .fn()
        .mockResolvedValue({ ...tournament, ...options.tournament }),
    },
    teams: { findMany: jest.fn().mockResolvedValue(options.teams ?? []) },
    users: { findMany: jest.fn().mockResolvedValue(options.users ?? []) },
    tournament_team_registrations: {
      count: jest.fn().mockResolvedValue(options.registrationCount ?? 0),
      findUnique: jest.fn().mockResolvedValue(options.registration ?? null),
    },
    tournament_team_players: {
      findMany: jest.fn().mockImplementation(({ where }: { where: { team_id?: bigint; jersey_number?: unknown } }) =>
        Promise.resolve(where.jersey_number ? [] : (options.roster ?? [])),
      ),
      count: jest.fn().mockResolvedValue(0),
    },
    $transaction: jest.fn((callback: (client: typeof tx) => unknown) =>
      Promise.resolve(callback(tx)),
    ),
  };
  const access = {
    assertCanManageTournament: jest.fn().mockResolvedValue(undefined),
  };
  const service = new RosterImportService(
    prisma as unknown as PrismaService,
    access as unknown as CompetitionAccessService,
  );
  return { service, prisma, tx, access };
};

describe('RosterImportService', () => {
  it('crea el equipo, las cuentas nuevas y la inscripción desde una hoja', async () => {
    const { service, tx } = setup();
    const result = await service.import(
      7n,
      { teams: [sheet('Deportivo Pitalito', [player(1), player(2), player(3)])] },
      9n,
    );

    expect(result.teams[0].outcome).toBe('team_created');
    expect(result.playersCreated).toBe(3);
    expect(result.playersLinked).toBe(0);
    expect(tx.users.create).toHaveBeenCalledTimes(3);
    expect(tx.teams.create.mock.calls[0][0].data).toEqual(
      expect.objectContaining({
        name: 'Deportivo Pitalito',
        sport_type: 'Fútbol',
        modality: 'Fútbol 8',
      }),
    );
    expect(tx.tournament_team_registrations.create.mock.calls[0][0].data).toEqual(
      expect.objectContaining({ request_status: 'approved', team_id: 90n }),
    );
    const roster = tx.tournament_team_players.createMany.mock.calls[0][0].data;
    expect(roster).toHaveLength(3);
    expect(roster[0]).toEqual(
      expect.objectContaining({ position: 'Delantero', is_captain: true }),
    );
    expect(result.temporaryPassword).toBeTruthy();
  });

  it('vincula al jugador que ya tiene cuenta sin volver a crearla', async () => {
    const { service, tx } = setup({
      users: [
        {
          id: 42n,
          id_number: '1001',
          email: 'jugador1@correo.com',
          full_name: 'Jugador 1',
          status: 'active',
          block_reason: null,
        },
      ],
    });
    const result = await service.import(
      7n,
      { teams: [sheet('Real Timaná', [player(1), player(2)])] },
      9n,
    );

    expect(tx.users.create).toHaveBeenCalledTimes(1);
    expect(result.playersCreated).toBe(1);
    expect(result.playersLinked).toBe(1);
    const linked = result.teams[0].players.find(({ row }) => row === 1);
    expect(linked?.outcome).toBe('linked');
    expect(linked?.detail).toContain('Ya tenía cuenta');
  });

  it('rechaza por categoría y deja la hoja fuera si no alcanza el mínimo', async () => {
    const { service, tx } = setup({
      tournament: { category_min_age: 18, category_max_age: 30, min_players_per_team: 2 },
    });
    const result = await service.import(
      7n,
      {
        teams: [
          sheet('Juventud', [
            player(1, { birthDate: '2015-01-01', fullName: 'Niño Pérez' }),
            player(2, { birthDate: '2014-01-01', fullName: 'Niña Gómez' }),
          ]),
        ],
      },
      9n,
    );

    expect(result.teams[0].outcome).toBe('rejected');
    expect(result.teams[0].detail).toContain('mínimo 2');
    expect(result.playersRejected).toBe(2);
    expect(tx.users.create).not.toHaveBeenCalled();
    expect(tx.teams.create).not.toHaveBeenCalled();
  });

  it('avisa cuándo el jugador ya está inscrito con otro equipo del torneo', async () => {
    const { service } = setup({
      users: [
        {
          id: 42n,
          id_number: '1001',
          email: 'jugador1@correo.com',
          full_name: 'Jugador 1',
          status: 'active',
          block_reason: null,
        },
      ],
      roster: [
        {
          player_id: 42n,
          team_id: 11n,
          tournament_team_registrations: { teams: { name: 'Atlético Laboyano' } },
        },
      ],
    });
    const result = await service.import(
      7n,
      { teams: [sheet('Real Timaná', [player(1), player(2), player(3)])] },
      9n,
    );

    const rejected = result.teams[0].players.find(({ row }) => row === 1);
    expect(rejected?.outcome).toBe('rejected');
    expect(rejected?.detail).toContain('Atlético Laboyano');
    expect(result.teams[0].outcome).toBe('team_created');
    expect(result.teams[0].rosterSize).toBe(2);
  });

  it('no deja al mismo jugador en dos hojas del archivo', async () => {
    const { service } = setup();
    const result = await service.import(
      7n,
      {
        teams: [
          sheet('Equipo A', [player(1), player(2)]),
          sheet('Equipo B', [player(1), player(3), player(4)]),
        ],
      },
      9n,
    );

    const repeated = result.teams[1].players.find(({ row }) => row === 1);
    expect(repeated?.outcome).toBe('rejected');
    expect(repeated?.detail).toContain('Equipo A');
    expect(result.teams[1].rosterSize).toBe(2);
  });

  it('rechaza posiciones desconocidas y acepta los sinónimos de cancha', async () => {
    const { service } = setup();
    const result = await service.import(
      7n,
      {
        teams: [
          sheet('Equipo A', [
            player(1, { position: 'portero' }),
            player(2, { position: 'volante' }),
            player(3, { position: 'bateador' }),
          ]),
        ],
      },
      9n,
    );

    const players = result.teams[0].players;
    expect(players[0].position).toBe('Arquero');
    expect(players[1].position).toBe('Mediocampista');
    expect(players[2].outcome).toBe('rejected');
    expect(players[2].detail).toContain('bateador');
  });

  it('pide elegir el equipo cuando hay varios con el mismo nombre', async () => {
    const { service, tx } = setup({
      teams: [
        { id: 1n, name: 'Real Timaná', status: 'active', captain_user_id: 2n },
        { id: 2n, name: 'real timaná', status: 'active', captain_user_id: 3n },
      ],
    });
    const result = await service.import(
      7n,
      { teams: [sheet('Real Timaná', [player(1), player(2)])] },
      9n,
    );

    expect(result.teams[0].outcome).toBe('rejected');
    expect(result.teams[0].detail).toContain('más de un equipo');
    expect(tx.teams.create).not.toHaveBeenCalled();
  });

  it('respeta el cupo máximo de equipos del torneo', async () => {
    const { service } = setup({
      tournament: { max_teams: 1 },
      registrationCount: 1,
    });
    const result = await service.import(
      7n,
      { teams: [sheet('Equipo A', [player(1), player(2)])] },
      9n,
    );

    expect(result.teams[0].outcome).toBe('rejected');
    expect(result.teams[0].detail).toContain('sin cupos');
    expect(result.availableSlots).toBe(0);
  });

  it('solo completa la plantilla cuando el equipo ya estaba inscrito', async () => {
    const { service, tx } = setup({
      teams: [
        { id: 11n, name: 'Equipo A', status: 'active', captain_user_id: 2n },
      ],
      registration: { request_status: 'approved' },
    });
    const result = await service.import(
      7n,
      { teams: [sheet('Equipo A', [player(1), player(2)])] },
      9n,
    );

    expect(result.teams[0].outcome).toBe('roster_updated');
    expect(tx.tournament_team_registrations.create).not.toHaveBeenCalled();
    expect(tx.teams.create).not.toHaveBeenCalled();
    expect(tx.tournament_team_players.createMany).toHaveBeenCalled();
  });

  it('bloquea el archivo completo si el torneo está cancelado', async () => {
    const { service } = setup({ tournament: { phase: 'cancelled' } });
    await expect(
      service.import(7n, { teams: [sheet('Equipo A', [player(1)])] }, 9n),
    ).rejects.toThrow('archivado o cancelado');
  });
});
