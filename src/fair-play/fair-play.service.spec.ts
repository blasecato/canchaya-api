import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { FairPlayService } from './fair-play.service';

const teamRow = (
  teamId: string,
  teamName: string,
  yellow: number,
  red: number,
  played = 6,
  disciplinary = 0,
) => ({
  team_id: teamId,
  team_name: teamName,
  photo_url: null,
  yellow_cards: yellow,
  red_cards: red,
  disciplinary_cards: disciplinary,
  matches_played: played,
});

const setup = (teams: unknown[], players: unknown[] = []) => {
  const queryRaw = jest
    .fn()
    .mockResolvedValueOnce(teams)
    .mockResolvedValueOnce(players);
  const access = {
    assertCanViewTournament: jest.fn().mockResolvedValue(undefined),
  };
  const service = new FairPlayService(
    { $queryRaw: queryRaw } as unknown as PrismaService,
    access as unknown as CompetitionAccessService,
  );
  return { service, access, queryRaw };
};

describe('FairPlayService', () => {
  it('suma amonestaciones y ordena por menos puntos de juego limpio', async () => {
    const { service } = setup([
      teamRow('1', 'Alfa', 10, 0),
      teamRow('2', 'Beta', 2, 2),
      teamRow('3', 'Gamma', 1, 0),
    ]);
    const result = await service.findByTournament(7n, 3n);
    expect(result.teams.map((team) => [team.teamName, team.fairPlayPoints])).toEqual(
      [
        ['Gamma', 1],
        ['Beta', 8],
        ['Alfa', 10],
      ],
    );
    expect(result.teams[0].position).toBe(1);
    expect(result.teams[1].totalCards).toBe(4);
    expect(result.totalYellowCards).toBe(13);
    expect(result.totalRedCards).toBe(2);
  });

  it('desempata con menos rojas y luego por nombre, y promedia por partido', async () => {
    const { service } = setup([
      teamRow('1', 'Zulia', 3, 0, 4),
      teamRow('2', 'Avila', 3, 0, 2),
      // Mismos puntos que las otras, pero con una roja: queda última.
      teamRow('3', 'Boston', 0, 1, 4),
    ]);
    const result = await service.findByTournament(7n, 3n);
    expect(result.teams.map((team) => team.teamName)).toEqual([
      'Avila',
      'Zulia',
      'Boston',
    ]);
    expect(result.teams[0].pointsPerMatch).toBe(1.5);
    expect(result.teams[1].pointsPerMatch).toBe(0.75);
  });

  it('exige permiso de lectura del torneo antes de consultar', async () => {
    const { service, access, queryRaw } = setup([]);
    access.assertCanViewTournament.mockRejectedValue(new Error('sin acceso'));
    await expect(service.findByTournament(7n, 3n)).rejects.toThrow(
      'sin acceso',
    );
    expect(queryRaw).not.toHaveBeenCalled();
  });

  it('agrupa los jugadores amonestados en su equipo', async () => {
    const { service } = setup(
      [teamRow('1', 'Alfa', 3, 1), teamRow('2', 'Beta', 0, 0)],
      [
        {
          team_id: '1',
          player_id: '9',
          player_name: 'Juan Pérez',
          yellow_cards: 2,
          red_cards: 1,
        },
        {
          team_id: '1',
          player_id: '10',
          player_name: 'Luis Díaz',
          yellow_cards: 1,
          red_cards: 0,
        },
      ],
    );
    const result = await service.findByTournament(7n, 3n);
    const alfa = result.teams.find((team) => team.teamId === '1');
    expect(alfa?.players.map((player) => player.playerName)).toEqual([
      'Juan Pérez',
      'Luis Díaz',
    ]);
    expect(result.teams.find((team) => team.teamId === '2')?.players).toEqual(
      [],
    );
  });
});
