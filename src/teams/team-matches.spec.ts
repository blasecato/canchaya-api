import { NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { TeamsService } from './teams.service';

const match = {
  id: 647n,
  tournament_id: 62n,
  home_team_id: 31n,
  away_team_id: 8n,
  match_date: new Date('2026-09-22T18:00:00.000Z'),
  venue: 'Estadio Municipal',
  status: 'scheduled',
  home_score: null,
  away_score: null,
  tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations:
    {
      teams: { name: 'Arena Kings' },
      tournaments: { name: 'Liga Mi Casa' },
    },
  tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations:
    { teams: { name: 'Equipo Prueba 08' } },
  match_referees: [
    { tournament_referees: { users: { full_name: 'Felipe Castro' } } },
  ],
};

describe('TeamsService.findMatches', () => {
  const findMany = jest.fn<Promise<unknown[]>, [Prisma.matchesFindManyArgs]>();
  const service = new TeamsService(
    { matches: { findMany } } as unknown as PrismaService,
    {} as ImageStorageService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns only played results and dated future matches for the visible team', async () => {
    const findOne = jest
      .spyOn(service, 'findOne')
      .mockResolvedValue({} as never);
    findMany
      .mockResolvedValueOnce([
        { ...match, status: 'played', home_score: 3, away_score: 1 },
      ])
      .mockResolvedValueOnce([match]);

    const data = await service.findMatches(31n, 2n);

    expect(findOne).toHaveBeenCalledWith(31n, 2n);
    expect(findMany).toHaveBeenCalledTimes(2);
    expect(findMany.mock.calls[0][0]).toMatchObject({
      where: {
        OR: [{ home_team_id: 31n }, { away_team_id: 31n }],
        status: 'played',
      },
      take: 10,
    });
    expect(findMany.mock.calls[1][0]).toMatchObject({
      where: {
        OR: [{ home_team_id: 31n }, { away_team_id: 31n }],
        status: { in: ['scheduled', 'postponed'] },
      },
      take: 10,
    });
    expect(findMany.mock.calls[1][0].where).toHaveProperty('match_date.gt');
    expect(data.upcoming[0]).toMatchObject({
      tournamentId: '62',
      tournamentName: 'Liga Mi Casa',
      homeTeam: { id: '31', name: 'Arena Kings' },
      awayTeam: { id: '8', name: 'Equipo Prueba 08' },
      refereeName: 'Felipe Castro',
      matchDate: '2026-09-22T18:00:00.000Z',
    });
    expect(data.results[0]).toMatchObject({ homeScore: 3, awayScore: 1 });
  });

  it('does not expose matches when the team is not visible to the user', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

    await expect(service.findMatches(31n, 99n)).rejects.toThrow(
      NotFoundException,
    );
    expect(findMany).not.toHaveBeenCalled();
  });
});
