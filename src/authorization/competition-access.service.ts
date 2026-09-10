import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import type { RoleCode } from '../auth/decorators/require-roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

export type MatchWriteAccess = 'manager' | 'main_referee';

export interface TournamentAccessScope {
  roles: Set<string>;
  tournamentIds: bigint[] | null;
}

@Injectable()
export class CompetitionAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async findRoleCodes(userId: bigint): Promise<Set<string>> {
    const roles = await this.prisma.user_roles.findMany({
      where: { user_id: userId },
      select: { role_code: true },
    });

    return new Set(roles.map(({ role_code }) => role_code));
  }

  async findAccessibleTournamentScope(
    userId: bigint,
  ): Promise<TournamentAccessScope> {
    const roles = await this.findRoleCodes(userId);
    if (roles.has('SUPER_ADMIN')) {
      return { roles, tournamentIds: null };
    }

    const accessRules: Prisma.tournamentsWhereInput[] = [];

    if (roles.has('ASSOCIATION_ADMIN')) {
      accessRules.push(
        {
          associations: {
            OR: [
              { owner_user_id: userId },
              {
                association_administrators: {
                  some: {
                    user_id: userId,
                    status: 'active',
                  },
                },
              },
            ],
          },
        },
        {
          tournament_administrators: {
            some: {
              user_id: userId,
              status: 'active',
            },
          },
        },
      );
    }

    if (roles.has('REFEREE')) {
      accessRules.push({
        tournament_referees: {
          some: { user_id: userId, status: 'active' },
        },
      });
    }

    if (roles.has('PLAYER')) {
      accessRules.push({
        tournament_team_registrations: {
          some: {
            request_status: 'approved',
            tournament_team_players: {
              some: {
                player_id: userId,
                registration_status: 'approved',
              },
            },
          },
        },
      });
    }

    if (accessRules.length === 0) {
      return { roles, tournamentIds: [] };
    }

    const tournaments = await this.prisma.tournaments.findMany({
      where: { OR: accessRules },
      select: { id: true },
    });

    return {
      roles,
      tournamentIds: tournaments.map(({ id }) => id),
    };
  }

  async assertCanViewTournament(
    userId: bigint,
    tournamentId: bigint,
  ): Promise<void> {
    const scope = await this.findAccessibleTournamentScope(userId);
    if (
      scope.tournamentIds === null ||
      scope.tournamentIds.some((id) => id === tournamentId)
    ) {
      return;
    }

    await this.assertTournamentExists(tournamentId);
    throw new ForbiddenException(
      'No tienes permisos para consultar información operativa de este torneo.',
    );
  }

  async assertCanManageTournament(
    userId: bigint,
    tournamentId: bigint,
  ): Promise<void> {
    const roles = await this.findRoleCodes(userId);
    if (roles.has('SUPER_ADMIN')) {
      await this.assertTournamentExists(tournamentId);
      return;
    }

    if (!roles.has('ASSOCIATION_ADMIN')) {
      await this.assertTournamentExists(tournamentId);
      throw new ForbiddenException(
        'No tienes permisos para administrar este torneo.',
      );
    }

    const tournament = await this.prisma.tournaments.findFirst({
      where: {
        id: tournamentId,
        OR: [
          {
            associations: {
              OR: [
                { owner_user_id: userId },
                {
                  association_administrators: {
                    some: {
                      user_id: userId,
                      status: 'active',
                      permission_level: { not: 'viewer' },
                    },
                  },
                },
              ],
            },
          },
          {
            tournament_administrators: {
              some: {
                user_id: userId,
                status: 'active',
                permission_level: { not: 'viewer' },
              },
            },
          },
        ],
      },
      select: { id: true },
    });

    if (tournament) return;

    await this.assertTournamentExists(tournamentId);
    throw new ForbiddenException(
      'No tienes permisos para administrar este torneo.',
    );
  }

  async canUpdateTournamentPayments(
    userId: bigint,
    tournamentId: bigint,
  ): Promise<boolean> {
    const hasAssociationAdminRole = await this.prisma.user_roles.findUnique({
      where: {
        user_id_role_code: {
          user_id: userId,
          role_code: 'ASSOCIATION_ADMIN',
        },
      },
      select: { user_id: true },
    });
    if (!hasAssociationAdminRole) return false;

    const tournament = await this.prisma.tournaments.findFirst({
      where: {
        id: tournamentId,
        associations: {
          status: 'active',
          OR: [
            { owner_user_id: userId },
            {
              association_administrators: {
                some: {
                  user_id: userId,
                  status: 'active',
                  permission_level: { not: 'viewer' },
                },
              },
            },
          ],
        },
      },
      select: { id: true },
    });

    return Boolean(tournament);
  }

  async assertCanUpdateTournamentPayments(
    userId: bigint,
    tournamentId: bigint,
  ): Promise<void> {
    if (await this.canUpdateTournamentPayments(userId, tournamentId)) return;

    await this.assertTournamentExists(tournamentId);
    throw new ForbiddenException(
      'Solo un administrador activo de la asociación puede actualizar los pagos de inscripción.',
    );
  }

  async assertTournamentInPhases(
    tournamentId: bigint,
    allowedPhases: readonly string[],
    message: string,
  ): Promise<string> {
    const tournament = await this.prisma.tournaments.findUnique({
      where: { id: tournamentId },
      select: { phase: true },
    });
    if (!tournament) {
      throw new NotFoundException('El torneo solicitado no existe.');
    }
    if (!allowedPhases.includes(tournament.phase)) {
      throw new BadRequestException(message);
    }
    return tournament.phase;
  }

  async findManageableTournamentIds(userId: bigint): Promise<bigint[] | null> {
    const roles = await this.findRoleCodes(userId);
    if (roles.has('SUPER_ADMIN')) return null;
    if (!roles.has('ASSOCIATION_ADMIN')) return [];

    const tournaments = await this.prisma.tournaments.findMany({
      where: {
        OR: [
          {
            associations: {
              OR: [
                { owner_user_id: userId },
                {
                  association_administrators: {
                    some: {
                      user_id: userId,
                      status: 'active',
                      permission_level: { not: 'viewer' },
                    },
                  },
                },
              ],
            },
          },
          {
            tournament_administrators: {
              some: {
                user_id: userId,
                status: 'active',
                permission_level: { not: 'viewer' },
              },
            },
          },
        ],
      },
      select: { id: true },
    });
    return tournaments.map(({ id }) => id);
  }

  async assertCanViewMatch(userId: bigint, matchId: bigint): Promise<bigint> {
    const match = await this.findMatchTournament(matchId);
    await this.assertCanViewTournament(userId, match.tournament_id);
    return match.tournament_id;
  }

  async resolveMatchWriteAccess(
    userId: bigint,
    matchId: bigint,
  ): Promise<{ tournamentId: bigint; access: MatchWriteAccess }> {
    const match = await this.findMatchTournament(matchId);
    const roles = await this.findRoleCodes(userId);

    if (roles.has('SUPER_ADMIN') || roles.has('ASSOCIATION_ADMIN')) {
      try {
        await this.assertCanManageTournament(userId, match.tournament_id);
        return { tournamentId: match.tournament_id, access: 'manager' };
      } catch (error) {
        if (!(error instanceof ForbiddenException)) throw error;
      }
    }

    if (roles.has('REFEREE')) {
      const assignment = await this.prisma.match_referees.findFirst({
        where: {
          match_id: matchId,
          referee_id: userId,
          referee_role: 'main',
          assignment_status: 'accepted',
        },
        select: { match_id: true },
      });
      if (assignment) {
        return { tournamentId: match.tournament_id, access: 'main_referee' };
      }
    }

    throw new ForbiddenException(
      'Solo un administrador autorizado o el árbitro principal asignado puede registrar información de este partido.',
    );
  }

  async assertCanManageMatch(userId: bigint, matchId: bigint): Promise<bigint> {
    const match = await this.findMatchTournament(matchId);
    await this.assertCanManageTournament(userId, match.tournament_id);
    return match.tournament_id;
  }

  async assertHasAnyRole(
    userId: bigint,
    allowedRoles: readonly RoleCode[],
  ): Promise<Set<string>> {
    const roles = await this.findRoleCodes(userId);
    if (!allowedRoles.some((role) => roles.has(role))) {
      throw new ForbiddenException(
        'No tienes permisos suficientes para realizar esta acción.',
      );
    }
    return roles;
  }

  private async assertTournamentExists(tournamentId: bigint): Promise<void> {
    const tournament = await this.prisma.tournaments.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    });
    if (!tournament) {
      throw new NotFoundException(
        `El torneo con ID ${tournamentId.toString()} no existe.`,
      );
    }
  }

  private async findMatchTournament(
    matchId: bigint,
  ): Promise<{ tournament_id: bigint }> {
    const match = await this.prisma.matches.findUnique({
      where: { id: matchId },
      select: { tournament_id: true },
    });
    if (!match) {
      throw new NotFoundException(
        `No se encontró el partido con ID ${matchId.toString()}.`,
      );
    }
    return match;
  }
}
