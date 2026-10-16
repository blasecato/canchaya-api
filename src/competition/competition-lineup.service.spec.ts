import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionService } from './competition.service';

/** Sorteo de dos grupos con cuatro equipos ya ubicados. */
const plan = () => ({
  version: 2,
  config: {
    format: 'groups_knockout',
    legs: 1,
    groups: 2,
    qualifiers: 1,
    finalLegs: 1,
  },
  seed: 'seed',
  teamIds: ['slot-1', 'slot-2', 'slot-3', 'slot-4'],
  slots: [
    { id: 'slot-1', label: 'Equipo 1', teamId: '10' },
    { id: 'slot-2', label: 'Equipo 2', teamId: '20' },
    { id: 'slot-3', label: 'Equipo 3', teamId: '30' },
    { id: 'slot-4', label: 'Equipo 4', teamId: '40' },
  ],
  stages: [
    {
      id: 1,
      label: 'Fase de grupos',
      kind: 'points',
      groups: [
        { name: 'Grupo A', teams: ['slot-1', 'slot-2'] },
        { name: 'Grupo B', teams: ['slot-3', 'slot-4'] },
      ],
      fixtures: [
        { key: 'g1-a-1', home: 'slot-1', away: 'slot-2', round: 1, group: 'Grupo A' },
        { key: 'g1-b-1', home: 'slot-3', away: 'slot-4', round: 1, group: 'Grupo B' },
      ],
      byes: [],
      resolved: false,
    },
  ],
  champion: null,
  createdBy: '9',
  createdAt: new Date().toISOString(),
  originalType: 'Grupos',
  changeReason: null,
});

const registration = (teamId: string, name: string) => ({
  team_id: BigInt(teamId),
  request_status: 'approved',
  teams: { name },
});

const setup = (options: { phase?: string; playedMatches?: number } = {}) => {
  const matchesUpdateMany = jest.fn().mockResolvedValue({ count: 1 });
  const matchesDeleteMany = jest.fn().mockResolvedValue({ count: 0 });
  const registrationUpdate = jest.fn();
  const tournamentUpdate = jest.fn();
  const tournament = {
    id: 7n,
    phase: options.phase ?? 'in_progress',
    competition_plan: plan(),
    max_teams: 4,
    start_date: new Date('2026-01-01'),
    end_date: null,
    tournament_types: { name: 'Grupos' },
    tournament_team_registrations: [
      registration('10', 'Alfa'),
      registration('20', 'Beta'),
      registration('30', 'Gamma'),
      registration('40', 'Delta'),
    ],
  };
  const tx = {
    $queryRaw: jest.fn(),
    tournaments: {
      findUnique: jest.fn().mockResolvedValue(tournament),
      update: tournamentUpdate,
    },
    matches: {
      count: jest.fn().mockResolvedValue(options.playedMatches ?? 0),
      updateMany: matchesUpdateMany,
      deleteMany: matchesDeleteMany,
    },
    tournament_team_registrations: { update: registrationUpdate },
  };
  const prisma = {
    ...tx,
    $transaction: jest.fn((callback: (client: typeof tx) => unknown) =>
      Promise.resolve(callback(tx)),
    ),
  };
  const access = {
    assertCanManageTournament: jest.fn().mockResolvedValue(undefined),
    assertCanViewTournament: jest.fn().mockResolvedValue(undefined),
  };
  const service = new CompetitionService(
    prisma as unknown as PrismaService,
    access as unknown as CompetitionAccessService,
  );
  // `get` se consulta al final para devolver el sorteo ya guardado.
  jest
    .spyOn(service, 'get')
    .mockResolvedValue({ plan: null, stages: [], teams: [] } as never);
  return {
    service,
    tx,
    access,
    matchesUpdateMany,
    matchesDeleteMany,
    registrationUpdate,
    tournamentUpdate,
  };
};

describe('CompetitionService: reacomodar el sorteo', () => {
  it('intercambia dos equipos y reasigna sus partidos', async () => {
    const { service, matchesUpdateMany, tournamentUpdate, registrationUpdate } =
      setup();

    const result = await service.updateLineup(7n, 9n, {
      slots: [
        { slotId: 'slot-1', teamId: '30' },
        { slotId: 'slot-3', teamId: '10' },
      ],
    });

    expect(result.lineup).toEqual(
      expect.objectContaining({ movedTeams: 2, playedMatches: 0 }),
    );
    // Los dos cruces tocados se reasignan al titular nuevo de cada lugar.
    expect(matchesUpdateMany).toHaveBeenCalledTimes(2);
    expect(matchesUpdateMany.mock.calls[0][0]).toEqual({
      where: { tournament_id: 7n, competition_key: 'g1-a-1' },
      data: expect.objectContaining({ home_team_id: 30n, away_team_id: 20n }),
    });
    const savedPlan = tournamentUpdate.mock.calls[0][0].data
      .competition_plan as ReturnType<typeof plan>;
    expect(savedPlan.slots.map(({ teamId }) => teamId)).toEqual([
      '30',
      '20',
      '10',
      '40',
    ]);
    // El grupo de cada inscripción sigue al equipo.
    expect(registrationUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { tournament_id_team_id: { tournament_id: 7n, team_id: 30n } },
        data: expect.objectContaining({ group_name: 'Grupo A' }),
      }),
    );
  });

  it('pide confirmación cuando el cambio toca partidos jugados', async () => {
    const { service, matchesUpdateMany } = setup({ playedMatches: 2 });

    await expect(
      service.updateLineup(7n, 9n, {
        slots: [
          { slotId: 'slot-1', teamId: '30' },
          { slotId: 'slot-3', teamId: '10' },
        ],
      }),
    ).rejects.toThrow('2 partidos ya jugados');
    expect(matchesUpdateMany).not.toHaveBeenCalled();
  });

  it('aplica el cambio cuando el administrador confirma los partidos jugados', async () => {
    const { service, matchesUpdateMany } = setup({ playedMatches: 2 });
    const result = await service.updateLineup(7n, 9n, {
      slots: [
        { slotId: 'slot-1', teamId: '30' },
        { slotId: 'slot-3', teamId: '10' },
      ],
      confirmPlayedMatches: true,
    });
    expect(result.lineup).toEqual(
      expect.objectContaining({ playedMatches: 2, movedTeams: 2 }),
    );
    expect(matchesUpdateMany).toHaveBeenCalled();
  });

  it('rechaza dejar al mismo equipo en dos lugares', async () => {
    const { service } = setup();
    await expect(
      service.updateLineup(7n, 9n, {
        slots: [
          { slotId: 'slot-1', teamId: '30' },
          { slotId: 'slot-2', teamId: '30' },
        ],
      }),
    ).rejects.toThrow('dos lugares');
  });

  it('avisa cuando un equipo aprobado queda sin lugar', async () => {
    const { service } = setup();
    await expect(
      service.updateLineup(7n, 9n, {
        slots: [{ slotId: 'slot-1', teamId: null }],
      }),
    ).rejects.toThrow('Falta ubicar un equipo');
  });

  it('rechaza lugares o equipos ajenos al torneo', async () => {
    const { service } = setup();
    await expect(
      service.updateLineup(7n, 9n, {
        slots: [{ slotId: 'slot-99', teamId: '10' }],
      }),
    ).rejects.toThrow('no coincide con el sorteo actual');
    await expect(
      service.updateLineup(7n, 9n, {
        slots: [{ slotId: 'slot-1', teamId: '999' }],
      }),
    ).rejects.toThrow('equipos aprobados');
  });

  it('no reacomoda torneos archivados ni cancelados', async () => {
    for (const phase of ['archived', 'cancelled']) {
      const { service } = setup({ phase });
      await expect(
        service.updateLineup(7n, 9n, {
          slots: [{ slotId: 'slot-1', teamId: '30' }],
        }),
      ).rejects.toThrow('archivado o cancelado');
    }
  });

  it('no toca nada cuando la distribución no cambia', async () => {
    const { service, matchesUpdateMany, tournamentUpdate } = setup();
    const result = await service.updateLineup(7n, 9n, {
      slots: [{ slotId: 'slot-1', teamId: '10' }],
    });
    expect(result.lineup).toEqual(
      expect.objectContaining({ movedTeams: 0, updatedMatches: 0 }),
    );
    expect(matchesUpdateMany).not.toHaveBeenCalled();
    expect(tournamentUpdate).not.toHaveBeenCalled();
  });
});
