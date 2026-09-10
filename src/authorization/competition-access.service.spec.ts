import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from './competition-access.service';

describe('CompetitionAccessService', () => {
  const userRolesFindMany = jest.fn();
  const tournamentsFindMany = jest.fn();
  const tournamentsFindFirst = jest.fn();
  const tournamentsFindUnique = jest.fn();
  const matchesFindUnique = jest.fn();
  const matchRefereesFindFirst = jest.fn();
  const prisma = {
    user_roles: { findMany: userRolesFindMany },
    tournaments: {
      findMany: tournamentsFindMany,
      findFirst: tournamentsFindFirst,
      findUnique: tournamentsFindUnique,
    },
    matches: { findUnique: matchesFindUnique },
    match_referees: { findFirst: matchRefereesFindFirst },
  } as unknown as PrismaService;
  const service = new CompetitionAccessService(prisma);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('da acceso global a torneos únicamente al superadministrador', async () => {
    userRolesFindMany.mockResolvedValue([{ role_code: 'SUPER_ADMIN' }]);

    await expect(service.findAccessibleTournamentScope(7n)).resolves.toEqual({
      roles: new Set(['SUPER_ADMIN']),
      tournamentIds: null,
    });
    expect(tournamentsFindMany).not.toHaveBeenCalled();
  });

  it('rechaza a un administrador ajeno al torneo', async () => {
    userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
    tournamentsFindFirst.mockResolvedValue(null);
    tournamentsFindUnique.mockResolvedValue({ id: 20n });

    await expect(service.assertCanManageTournament(7n, 20n)).rejects.toThrow(
      new ForbiddenException(
        'No tienes permisos para administrar este torneo.',
      ),
    );
  });

  it('permite registrar el acta al árbitro principal asignado', async () => {
    matchesFindUnique.mockResolvedValue({ tournament_id: 20n });
    userRolesFindMany.mockResolvedValue([{ role_code: 'REFEREE' }]);
    matchRefereesFindFirst.mockResolvedValue({ match_id: 30n });

    await expect(service.resolveMatchWriteAccess(7n, 30n)).resolves.toEqual({
      tournamentId: 20n,
      access: 'main_referee',
    });
    expect(matchRefereesFindFirst).toHaveBeenCalledWith({
      where: {
        match_id: 30n,
        referee_id: 7n,
        referee_role: 'main',
        assignment_status: { not: 'cancelled' },
      },
      select: { match_id: true },
    });
  });

  it('impide escribir resultados a un árbitro no asignado como principal', async () => {
    matchesFindUnique.mockResolvedValue({ tournament_id: 20n });
    userRolesFindMany.mockResolvedValue([{ role_code: 'REFEREE' }]);
    matchRefereesFindFirst.mockResolvedValue(null);

    await expect(service.resolveMatchWriteAccess(7n, 30n)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
