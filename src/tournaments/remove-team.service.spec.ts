jest.mock('sanitize-html', () => ({
  __esModule: true,
  default: (value: string) => value,
}));

import { AssociationsService } from '../associations/associations.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { TournamentsService } from './tournaments.service';

const plan = () => ({
  version: 2,
  config: {
    format: 'league',
    legs: 1,
    groups: 1,
    qualifiers: 1,
    finalLegs: 1,
  },
  seed: 'seed',
  teamIds: ['slot-1', 'slot-2'],
  slots: [
    { id: 'slot-1', label: 'Equipo 1', teamId: '3' },
    { id: 'slot-2', label: 'Equipo 2', teamId: null },
  ],
  stages: [],
  champion: null,
  createdBy: '9',
  createdAt: new Date().toISOString(),
  originalType: 'Liga',
  changeReason: null,
});

const setup = (
  options: {
    registration?: unknown;
    phase?: string;
    matchesWithHistory?: number;
    cardCharges?: number;
    disciplinaryActions?: number;
    competitionPlan?: unknown;
  } = {},
) => {
  const matchesDeleteMany = jest.fn().mockResolvedValue({ count: 4 });
  const registrationDelete = jest.fn();
  const tournamentUpdate = jest.fn();
  const notificationCreate = jest.fn();
  const registrationFindUnique = jest.fn().mockResolvedValue(
    options.registration === undefined
      ? {
          request_status: 'approved',
          tournaments: {
            name: 'Copa Pitalito',
            association_id: 4n,
            phase: options.phase ?? 'registration',
            max_teams: 8,
            competition_plan:
              'competitionPlan' in options ? options.competitionPlan : plan(),
          },
          teams: { name: 'Deportivo Pitalito', captain_user_id: 21n },
          _count: { tournament_team_players: 12 },
        }
      : options.registration,
  );
  const prisma = {
    tournament_team_registrations: {
      findUnique: registrationFindUnique,
      count: jest.fn().mockResolvedValue(2),
    },
    matches: {
      count: jest.fn().mockResolvedValue(options.matchesWithHistory ?? 0),
    },
    tournament_card_charges: {
      count: jest.fn().mockResolvedValue(options.cardCharges ?? 0),
    },
    disciplinary_actions: {
      count: jest.fn().mockResolvedValue(options.disciplinaryActions ?? 0),
    },
    $transaction: jest.fn(async (callback: (tx: unknown) => Promise<unknown>) =>
      callback({
        matches: { deleteMany: matchesDeleteMany },
        tournament_team_registrations: { delete: registrationDelete },
        tournaments: { update: tournamentUpdate },
        notifications: { create: notificationCreate },
      }),
    ),
  } as unknown as PrismaService;
  const service = new TournamentsService(
    prisma,
    {} as AssociationsService,
    {} as ImageStorageService,
    {} as CompetitionAccessService,
  );
  jest
    .spyOn(
      service as unknown as { requireManagementPermission: () => Promise<void> },
      'requireManagementPermission',
    )
    .mockResolvedValue(undefined);
  return {
    service,
    prisma,
    matchesDeleteMany,
    registrationDelete,
    tournamentUpdate,
    notificationCreate,
  };
};

describe('TournamentsService: sacar un equipo del torneo', () => {
  it('borra inscripción y partidos sin jugar, y libera el lugar del sorteo', async () => {
    const {
      service,
      matchesDeleteMany,
      registrationDelete,
      tournamentUpdate,
      notificationCreate,
    } = setup();

    const result = await service.removeTeamFromTournament(
      7n,
      3n,
      9n,
      'Se inscribió en la categoría equivocada.',
    );

    expect(result).toEqual(
      expect.objectContaining({
        teamId: '3',
        teamName: 'Deportivo Pitalito',
        removedMatches: 4,
        removedPlayers: 12,
        availableSlots: 6,
        freedDrawSlot: true,
      }),
    );
    expect(matchesDeleteMany).toHaveBeenCalledWith({
      where: {
        tournament_id: 7n,
        OR: [{ home_team_id: 3n }, { away_team_id: 3n }],
      },
    });
    expect(registrationDelete).toHaveBeenCalled();
    const savedPlan = tournamentUpdate.mock.calls[0][0].data
      .competition_plan as ReturnType<typeof plan>;
    expect(savedPlan.slots[0].teamId).toBeNull();
    expect(notificationCreate.mock.calls[0][0].data.message).toContain(
      'categoría equivocada',
    );
  });

  it('no toca el sorteo cuando el torneo todavía no está organizado', async () => {
    const { service, tournamentUpdate } = setup({ competitionPlan: null });
    const result = await service.removeTeamFromTournament(7n, 3n, 9n);
    expect(result.freedDrawSlot).toBe(false);
    expect(tournamentUpdate).not.toHaveBeenCalled();
  });

  it('bloquea el retiro si el equipo ya tiene partidos con historia', async () => {
    const { service, registrationDelete } = setup({ matchesWithHistory: 2 });
    await expect(
      service.removeTeamFromTournament(7n, 3n, 9n),
    ).rejects.toThrow('ya tiene partidos jugados o anulados');
    expect(registrationDelete).not.toHaveBeenCalled();
  });

  it('bloquea el retiro si hay cobros de tarjetas o procesos disciplinarios', async () => {
    const charges = setup({ cardCharges: 1 });
    await expect(
      charges.service.removeTeamFromTournament(7n, 3n, 9n),
    ).rejects.toThrow('cobros de tarjetas');

    const discipline = setup({ disciplinaryActions: 1 });
    await expect(
      discipline.service.removeTeamFromTournament(7n, 3n, 9n),
    ).rejects.toThrow('procesos disciplinarios');
  });

  it('no permite retirar equipos de un torneo terminado o archivado', async () => {
    for (const phase of ['finished', 'archived', 'cancelled']) {
      const { service } = setup({ phase });
      await expect(
        service.removeTeamFromTournament(7n, 3n, 9n),
      ).rejects.toThrow('ya terminó o está archivado');
    }
  });

  it('avisa cuando el equipo no está inscrito', async () => {
    const { service } = setup({ registration: null });
    await expect(
      service.removeTeamFromTournament(7n, 3n, 9n),
    ).rejects.toThrow('no está inscrito');
  });
});
