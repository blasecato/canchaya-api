import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { FOOTBALL_SPORT_TYPE } from '../common/constants/football.constants';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateTeamDto } from './dto/create-team.dto';
import { ListTeamsQueryDto } from './dto/list-teams-query.dto';
import { ListTeamPlayersQueryDto } from './dto/list-team-players-query.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamCarnetsResponseDto } from './dto/team-carnets-response.dto';
import type {
  TeamRosterPlayerResponseDto,
  TeamRostersResponseDto,
} from './dto/team-rosters-response.dto';
import type { UpdateTournamentRosterPlayerDto } from './dto/update-tournament-roster-player.dto';
import {
  formatTournamentEligibilityError,
  getTournamentEligibilityIssues,
} from '../tournaments/tournament-eligibility';

const MANAGEMENT_ROLES = ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] as const;
const ACTIVE_ROSTER_PHASES = [
  'registration',
  'validation',
  'scheduled',
  'in_progress',
] as const;
const TEAM_MATCH_PREVIEW_LIMIT = 10;

const teamMatchSelect = {
  id: true,
  tournament_id: true,
  home_team_id: true,
  away_team_id: true,
  match_date: true,
  venue: true,
  status: true,
  home_score: true,
  away_score: true,
  tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations:
    {
      select: {
        teams: { select: { name: true } },
        tournaments: { select: { name: true } },
      },
    },
  tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations:
    { select: { teams: { select: { name: true } } } },
  match_referees: {
    where: {
      referee_role: 'main',
      assignment_status: { in: ['pending', 'accepted'] },
    },
    select: {
      tournament_referees: {
        select: { users: { select: { full_name: true } } },
      },
    },
    take: 1,
  },
} satisfies Prisma.matchesSelect;

type TeamMatchRecord = Prisma.matchesGetPayload<{
  select: typeof teamMatchSelect;
}>;

type ActiveTeamRegistration = {
  tournament_id: bigint;
  request_status: string;
  tournaments: {
    name: string;
    phase: string;
    min_players_per_team: number;
    max_players_per_team: number;
    start_date: Date;
    category_name: string;
    category_min_age: number | null;
    category_max_age: number | null;
    category_gender: string;
  };
};

const teamCardSelect = {
  id: true,
  name: true,
  sport_type: true,
  modality: true,
  primary_color: true,
  secondary_color: true,
  captain_user_id: true,
  photo_url: true,
  status: true,
  created_at: true,
  updated_at: true,
  users_teams_captain_user_idTousers: {
    select: { id: true, full_name: true },
  },
  team_members: {
    where: { status: 'active' },
    orderBy: { created_at: 'asc' as const },
    select: {
      user_id: true,
      member_role: true,
      users: { select: { full_name: true, photo_url: true } },
    },
  },
  tournament_team_registrations: {
    select: {
      request_status: true,
      tournaments: {
        select: { id: true, name: true, max_players_per_team: true },
      },
    },
  },
} satisfies Prisma.teamsSelect;

type TeamCardRecord = Prisma.teamsGetPayload<{ select: typeof teamCardSelect }>;

@Injectable()
export class TeamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async create(
    requestingUserId: bigint,
    dto: CreateTeamDto,
    photo?: UploadedImageFile,
  ) {
    const roles = await this.findRoleCodes(requestingUserId);
    const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
    const captainUserId = isManager
      ? dto.captainUserId
        ? BigInt(dto.captainUserId)
        : null
      : requestingUserId;

    if (!captainUserId) {
      throw new BadRequestException(
        'Debes seleccionar un capitán para el equipo.',
      );
    }

    const requestedMemberIds = new Set(
      (dto.memberUserIds ?? []).map((id) => BigInt(id)),
    );
    requestedMemberIds.add(captainUserId);
    const memberIds = [...requestedMemberIds];
    await this.assertActivePlayers(memberIds, captainUserId);

    const uploadedPhoto = photo
      ? await this.imageStorage.saveTeamPhoto(photo)
      : null;
    try {
      const team = await this.prisma.$transaction(async (transaction) => {
        const created = await transaction.teams.create({
          data: {
            name: dto.name.trim(),
            sport_type: FOOTBALL_SPORT_TYPE,
            modality: dto.modality.trim(),
            primary_color: dto.primaryColor ?? null,
            secondary_color: dto.secondaryColor ?? null,
            captain_user_id: captainUserId,
            created_by: requestingUserId,
            photo_url: uploadedPhoto?.url ?? null,
            photo_public_id: uploadedPhoto?.publicId ?? null,
            status: dto.status ?? 'active',
          },
          select: { id: true },
        });

        await transaction.team_members.createMany({
          data: memberIds.map((userId) => ({
            team_id: created.id,
            user_id: userId,
            // La capitanía se almacena en teams.captain_user_id. La restricción
            // de team_members solo admite player, coach o assistant.
            member_role: 'player',
            status: 'active',
          })),
        });

        const notificationRecipients = memberIds.filter(
          (userId) => userId !== requestingUserId,
        );
        if (notificationRecipients.length > 0) {
          await transaction.notifications.createMany({
            data: notificationRecipients.map((userId) => {
              const isCaptain = userId === captainUserId;
              return {
                user_id: userId,
                type: 'team',
                title: isCaptain
                  ? 'Fuiste designado capitán'
                  : 'Te agregaron a un equipo',
                message: isCaptain
                  ? `Ahora eres el capitán de ${dto.name.trim()}.`
                  : `Fuiste agregado como integrante de ${dto.name.trim()}.`,
                entity_type: 'team',
                entity_id: created.id.toString(),
                metadata: {
                  teamId: created.id.toString(),
                  teamName: dto.name.trim(),
                  actionUrl: `/teams/${created.id.toString()}`,
                  actionLabel: 'Ver equipo',
                },
              };
            }),
          });
        }
        return created;
      });

      return this.findOne(team.id, requestingUserId);
    } catch (error) {
      if (uploadedPhoto) await this.imageStorage.deleteSafely(uploadedPhoto);
      throw error;
    }
  }

  async findAll(query: ListTeamsQueryDto, requestingUserId: bigint) {
    const roles = await this.findRoleCodes(requestingUserId);
    const where = await this.buildVisibleWhere(requestingUserId, roles);
    where.status = 'active';
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        {
          users_teams_captain_user_idTousers: {
            full_name: { contains: query.search, mode: 'insensitive' },
          },
        },
      ];
    }
    if (query.tournamentId) {
      where.tournament_team_registrations = {
        some: {
          tournament_id: BigInt(query.tournamentId),
          request_status: query.registrationStatus,
        },
      };
    } else if (query.managedTournamentsOnly) {
      if (!roles.has('ASSOCIATION_ADMIN')) {
        throw new ForbiddenException(
          'Este filtro solo está disponible para administradores de asociación.',
        );
      }
      where.tournament_team_registrations = {
        some: {
          request_status: 'approved',
          tournaments: {
            associations: {
              OR: [
                { owner_user_id: requestingUserId },
                {
                  association_administrators: {
                    some: { user_id: requestingUserId, status: 'active' },
                  },
                },
              ],
            },
          },
        },
      };
    }

    const skip = (query.page - 1) * query.pageSize;
    const [total, teams] = await this.prisma.$transaction([
      this.prisma.teams.count({ where }),
      this.prisma.teams.findMany({
        where,
        orderBy: [{ name: 'asc' }, { id: 'asc' }],
        skip,
        take: query.pageSize,
        select: teamCardSelect,
      }),
    ]);

    return {
      items: teams.map((team) =>
        this.toResponse(team, requestingUserId, roles),
      ),
      page: query.page,
      pageSize: query.pageSize,
      total,
      hasNextPage: skip + teams.length < total,
    };
  }

  async findFilters(requestingUserId: bigint) {
    const roles = await this.findRoleCodes(requestingUserId);
    const where = await this.buildVisibleWhere(requestingUserId, roles);
    where.status = 'active';
    const registrations =
      await this.prisma.tournament_team_registrations.findMany({
        where: { teams: where },
        distinct: ['tournament_id'],
        orderBy: { tournament_id: 'asc' },
        select: { tournaments: { select: { id: true, name: true } } },
      });
    return {
      tournaments: registrations
        .map(({ tournaments }) => ({
          id: tournaments.id.toString(),
          name: tournaments.name,
        }))
        .sort((left, right) => left.name.localeCompare(right.name, 'es')),
    };
  }

  async findPlayerOptions(query: ListTeamPlayersQueryDto) {
    const where: Prisma.usersWhereInput = {
      status: 'active',
      user_roles: { some: { role_code: 'PLAYER' } },
      OR: query.search
        ? [
            { full_name: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
          ]
        : undefined,
    };
    const skip = (query.page - 1) * query.pageSize;
    const [total, players] = await this.prisma.$transaction([
      this.prisma.users.count({ where }),
      this.prisma.users.findMany({
        where,
        orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
        skip,
        take: query.pageSize,
        select: { id: true, full_name: true, email: true },
      }),
    ]);
    return {
      items: players.map((player) => ({
        id: player.id.toString(),
        fullName: player.full_name,
        email: player.email,
      })),
      page: query.page,
      pageSize: query.pageSize,
      total,
      hasNextPage: skip + players.length < total,
    };
  }

  async findOne(id: bigint, requestingUserId: bigint) {
    const roles = await this.findRoleCodes(requestingUserId);
    const visibleWhere = await this.buildVisibleWhere(requestingUserId, roles);
    const team = await this.prisma.teams.findFirst({
      where: { AND: [{ id, status: 'active' }, visibleWhere] },
      select: teamCardSelect,
    });
    if (!team)
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    return this.toResponse(team, requestingUserId, roles);
  }

  async findMatches(id: bigint, requestingUserId: bigint) {
    // Keep the same team visibility rule as the profile itself.
    await this.findOne(id, requestingUserId);
    const teamFilter = { OR: [{ home_team_id: id }, { away_team_id: id }] };
    const [results, upcoming] = await Promise.all([
      this.prisma.matches.findMany({
        where: { ...teamFilter, status: 'played' },
        orderBy: [
          { match_date: { sort: 'desc', nulls: 'last' } },
          { id: 'desc' },
        ],
        take: TEAM_MATCH_PREVIEW_LIMIT,
        select: teamMatchSelect,
      }),
      this.prisma.matches.findMany({
        where: {
          ...teamFilter,
          status: { in: ['scheduled', 'postponed'] },
          match_date: { gt: new Date() },
        },
        orderBy: [{ match_date: 'asc' }, { id: 'asc' }],
        take: TEAM_MATCH_PREVIEW_LIMIT,
        select: teamMatchSelect,
      }),
    ]);

    const toMatch = (match: TeamMatchRecord) => ({
      id: match.id.toString(),
      tournamentId: match.tournament_id.toString(),
      tournamentName:
        match
          .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
          .tournaments.name,
      matchDate: match.match_date?.toISOString() ?? null,
      venue: match.venue,
      status: match.status,
      homeTeam: {
        id: match.home_team_id.toString(),
        name: match
          .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
          .teams.name,
      },
      awayTeam: {
        id: match.away_team_id.toString(),
        name: match
          .tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations
          .teams.name,
      },
      homeScore: match.home_score,
      awayScore: match.away_score,
      refereeName:
        match.match_referees[0]?.tournament_referees.users.full_name ?? null,
    });

    return {
      teamId: id.toString(),
      results: results.map(toMatch),
      upcoming: upcoming.map(toMatch),
    };
  }

  async findTournamentRosters(
    id: bigint,
    requestingUserId: bigint,
  ): Promise<TeamRostersResponseDto> {
    const roles = await this.findRoleCodes(requestingUserId);
    const visibleWhere = await this.buildVisibleWhere(requestingUserId, roles);
    const team = await this.prisma.teams.findFirst({
      where: { AND: [{ id, status: 'active' }, visibleWhere] },
      select: {
        id: true,
        captain_user_id: true,
        tournament_team_registrations: {
          where: { request_status: 'approved' },
          orderBy: [
            { tournaments: { start_date: 'desc' } },
            { tournament_id: 'desc' },
          ],
          select: {
            tournament_id: true,
            tournaments: {
              select: {
                name: true,
                phase: true,
                min_players_per_team: true,
                max_players_per_team: true,
              },
            },
            tournament_team_players: {
              where: { registration_status: 'approved' },
              orderBy: [{ jersey_number: 'asc' }, { player_id: 'asc' }],
              select: {
                player_id: true,
                jersey_number: true,
                position: true,
                is_captain: true,
                team_members: {
                  select: {
                    users: {
                      select: { full_name: true, photo_url: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!team) {
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    }

    const canManageMembers =
      MANAGEMENT_ROLES.some((role) => roles.has(role)) ||
      team.captain_user_id === requestingUserId;

    return {
      teamId: team.id.toString(),
      canManageMembers,
      tournaments: team.tournament_team_registrations.map((registration) => ({
        tournamentId: registration.tournament_id.toString(),
        tournamentName: registration.tournaments.name,
        phase: registration.tournaments.phase,
        minPlayers: registration.tournaments.min_players_per_team,
        maxPlayers: registration.tournaments.max_players_per_team,
        canEdit:
          canManageMembers &&
          ACTIVE_ROSTER_PHASES.includes(
            registration.tournaments
              .phase as (typeof ACTIVE_ROSTER_PHASES)[number],
          ),
        players: registration.tournament_team_players.map((player) => ({
          id: player.player_id.toString(),
          fullName: player.team_members.users.full_name,
          photoUrl: player.team_members.users.photo_url,
          jerseyNumber: player.jersey_number,
          position: player.position,
          isCaptain: player.is_captain,
        })),
      })),
    };
  }

  async updateTournamentRosterPlayer(
    teamId: bigint,
    tournamentId: bigint,
    playerId: bigint,
    requestingUserId: bigint,
    dto: UpdateTournamentRosterPlayerDto,
  ): Promise<TeamRosterPlayerResponseDto> {
    if (dto.jerseyNumber === undefined && dto.position === undefined) {
      throw new BadRequestException(
        'Debes enviar el dorsal, la posición o ambos datos.',
      );
    }

    const roles = await this.findRoleCodes(requestingUserId);
    const team = await this.prisma.teams.findUnique({
      where: { id: teamId },
      select: { id: true, name: true, captain_user_id: true, status: true },
    });
    if (!team || team.status !== 'active') {
      throw new NotFoundException('El equipo solicitado no existe.');
    }
    if (
      !MANAGEMENT_ROLES.some((role) => roles.has(role)) &&
      team.captain_user_id !== requestingUserId
    ) {
      throw new ForbiddenException(
        'Solo el capitán o un administrador puede editar la plantilla del torneo.',
      );
    }

    const rosterPlayer = await this.prisma.tournament_team_players.findUnique({
      where: {
        tournament_id_team_id_player_id: {
          tournament_id: tournamentId,
          team_id: teamId,
          player_id: playerId,
        },
      },
      select: {
        registration_status: true,
        tournament_team_registrations: {
          select: {
            tournaments: { select: { name: true, phase: true } },
          },
        },
      },
    });
    if (!rosterPlayer || rosterPlayer.registration_status !== 'approved') {
      throw new NotFoundException(
        'El jugador no está activo en la plantilla de este torneo.',
      );
    }
    if (
      !ACTIVE_ROSTER_PHASES.includes(
        rosterPlayer.tournament_team_registrations.tournaments
          .phase as (typeof ACTIVE_ROSTER_PHASES)[number],
      )
    ) {
      throw new BadRequestException(
        'La plantilla histórica de un torneo finalizado, archivado o cancelado no se puede modificar.',
      );
    }

    if (dto.jerseyNumber !== undefined && dto.jerseyNumber !== null) {
      const duplicate = await this.prisma.tournament_team_players.findFirst({
        where: {
          tournament_id: tournamentId,
          team_id: teamId,
          player_id: { not: playerId },
          jersey_number: dto.jerseyNumber,
        },
        select: { player_id: true },
      });
      if (duplicate) {
        throw new BadRequestException(
          `El dorsal ${dto.jerseyNumber} ya está asignado a otro jugador de esta plantilla.`,
        );
      }
    }

    const updated = await this.prisma.$transaction(async (transaction) => {
      const saved = await transaction.tournament_team_players.update({
        where: {
          tournament_id_team_id_player_id: {
            tournament_id: tournamentId,
            team_id: teamId,
            player_id: playerId,
          },
        },
        data: {
          jersey_number: dto.jerseyNumber,
          position: dto.position,
        },
        select: {
          player_id: true,
          jersey_number: true,
          position: true,
          is_captain: true,
          team_members: {
            select: {
              users: { select: { full_name: true, photo_url: true } },
            },
          },
        },
      });

      if (playerId !== requestingUserId) {
        await transaction.notifications.create({
          data: {
            user_id: playerId,
            type: 'team_roster',
            title: 'Datos deportivos actualizados',
            message: `Tu dorsal o posición en ${team.name} para ${rosterPlayer.tournament_team_registrations.tournaments.name} fue actualizado.`,
            entity_type: 'team',
            entity_id: teamId.toString(),
            metadata: {
              teamId: teamId.toString(),
              teamName: team.name,
              tournamentId: tournamentId.toString(),
              tournamentName:
                rosterPlayer.tournament_team_registrations.tournaments.name,
              actionUrl: `/teams/${teamId.toString()}?tournamentId=${tournamentId.toString()}`,
              actionLabel: 'Ver plantilla',
            },
          },
        });
      }
      return saved;
    });

    return {
      id: updated.player_id.toString(),
      fullName: updated.team_members.users.full_name,
      photoUrl: updated.team_members.users.photo_url,
      jerseyNumber: updated.jersey_number,
      position: updated.position,
      isCaptain: updated.is_captain,
    };
  }

  async removeMember(
    teamId: bigint,
    playerId: bigint,
    requestingUserId: bigint,
  ) {
    const roles = await this.findRoleCodes(requestingUserId);
    const team = await this.prisma.teams.findUnique({
      where: { id: teamId },
      select: {
        id: true,
        name: true,
        captain_user_id: true,
        status: true,
        team_members: {
          where: { user_id: playerId, status: 'active' },
          select: {
            user_id: true,
            users: { select: { full_name: true } },
          },
          take: 1,
        },
      },
    });
    if (!team || team.status !== 'active') {
      throw new NotFoundException('El equipo solicitado no existe.');
    }
    if (
      !roles.has('SUPER_ADMIN') &&
      team.captain_user_id !== requestingUserId
    ) {
      throw new ForbiddenException(
        'Solo el capitán del equipo o un superadministrador puede retirar integrantes.',
      );
    }
    if (playerId === team.captain_user_id) {
      throw new BadRequestException(
        'El capitán no puede ser retirado sin transferir primero la capitanía.',
      );
    }
    const member = team.team_members[0];
    if (!member) {
      throw new BadRequestException(
        'El jugador no es un integrante activo de este equipo.',
      );
    }

    await this.prisma.$transaction(
      async (transaction) => {
        const [activeMemberCount, activeRegistrations] = await Promise.all([
          transaction.team_members.count({
            where: { team_id: teamId, status: 'active' },
          }),
          this.findActiveTeamRegistrations(transaction, teamId),
        ]);
        this.assertMemberCountWithinTournamentLimits(
          activeMemberCount - 1,
          activeRegistrations,
        );

        const removed = await transaction.team_members.updateMany({
          where: { team_id: teamId, user_id: playerId, status: 'active' },
          data: { status: 'inactive' },
        });
        if (removed.count !== 1) {
          throw new BadRequestException(
            'La plantilla cambió mientras realizabas la operación. Actualiza la página e inténtalo de nuevo.',
          );
        }

        await this.withdrawPlayersFromApprovedRosters(
          transaction,
          teamId,
          [playerId],
          activeRegistrations,
        );

        const recipientIds = [
          ...new Set([playerId, team.captain_user_id]),
        ].filter((userId) => userId !== requestingUserId);
        if (recipientIds.length > 0) {
          await transaction.notifications.createMany({
            data: recipientIds.map((userId) => ({
              user_id: userId,
              type: 'team',
              title: 'Integrante retirado del equipo',
              message: `${member.users.full_name} fue retirado de ${team.name}.`,
              entity_type: 'team',
              entity_id: teamId.toString(),
              metadata: {
                teamId: teamId.toString(),
                teamName: team.name,
                playerId: playerId.toString(),
                actionUrl:
                  userId === playerId
                    ? '/teams'
                    : `/teams/${teamId.toString()}`,
                actionLabel:
                  userId === playerId ? 'Ver mis equipos' : 'Ver equipo',
              },
            })),
          });
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    return {
      teamId: teamId.toString(),
      playerId: playerId.toString(),
      message: `${member.users.full_name} fue retirado de ${team.name}.`,
    };
  }

  async findCarnets(
    id: bigint,
    requestingUserId: bigint,
    tournamentId?: bigint,
  ): Promise<TeamCarnetsResponseDto> {
    const roles = await this.findRoleCodes(requestingUserId);
    if (!MANAGEMENT_ROLES.some((role) => roles.has(role))) {
      throw new ForbiddenException(
        'Solo un administrador puede descargar los carnés del equipo.',
      );
    }

    if (tournamentId) {
      const tournament = await this.prisma.tournaments.findUnique({
        where: { id: tournamentId },
        select: {
          association_id: true,
          tournament_team_registrations: {
            where: { team_id: id, request_status: 'approved' },
            select: { team_id: true },
          },
        },
      });
      if (
        !tournament ||
        tournament.tournament_team_registrations.length === 0
      ) {
        throw new BadRequestException(
          'El equipo no está aprobado en este torneo.',
        );
      }
      if (!roles.has('SUPER_ADMIN')) {
        const managedAssociation = await this.prisma.associations.findFirst({
          where: {
            id: tournament.association_id,
            OR: [
              { owner_user_id: requestingUserId },
              {
                association_administrators: {
                  some: { user_id: requestingUserId, status: 'active' },
                },
              },
            ],
          },
          select: { id: true },
        });
        if (!managedAssociation)
          throw new ForbiddenException('No administras este torneo.');
      }
    }

    const team = await this.prisma.teams.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        sport_type: true,
        modality: true,
        primary_color: true,
        secondary_color: true,
        photo_url: true,
        status: true,
        team_members: {
          where: {
            status: 'active',
            tournament_team_players: tournamentId
              ? {
                  some: {
                    tournament_id: tournamentId,
                    registration_status: 'approved',
                  },
                }
              : undefined,
          },
          orderBy: [{ users: { full_name: 'asc' } }, { user_id: 'asc' }],
          select: {
            user_id: true,
            tournament_team_players: {
              where: {
                tournament_id: tournamentId,
                registration_status: 'approved',
              },
              orderBy: { created_at: 'desc' },
              take: 1,
              select: { jersey_number: true, position: true },
            },
            users: {
              select: {
                full_name: true,
                id_number: true,
                document_type: true,
                birth_date: true,
                phone: true,
                email: true,
                photo_url: true,
              },
            },
          },
        },
        tournament_team_registrations: {
          where: {
            request_status: 'approved',
            tournament_id: tournamentId,
          },
          orderBy: [{ tournaments: { start_date: 'desc' } }],
          select: {
            tournaments: {
              select: {
                id: true,
                name: true,
                start_date: true,
                end_date: true,
              },
            },
          },
        },
      },
    });

    if (!team || team.status !== 'active') {
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    }

    return {
      teamId: team.id.toString(),
      teamName: team.name,
      sportType: team.sport_type,
      modality: team.modality,
      primaryColor: team.primary_color,
      secondaryColor: team.secondary_color,
      photoUrl: team.photo_url,
      tournaments: team.tournament_team_registrations.map(
        ({ tournaments }) => ({
          id: tournaments.id.toString(),
          name: tournaments.name,
          startDate: tournaments.start_date.toISOString().slice(0, 10),
          endDate: tournaments.end_date?.toISOString().slice(0, 10) ?? null,
        }),
      ),
      players: team.team_members.map(
        ({ user_id, users, tournament_team_players }) => ({
          id: user_id.toString(),
          fullName: users.full_name,
          idNumber: users.id_number,
          documentType: users.document_type,
          birthDate: users.birth_date.toISOString().slice(0, 10),
          phone: users.phone,
          email: users.email,
          photoUrl: users.photo_url,
          jerseyNumber: tournament_team_players[0]?.jersey_number ?? null,
          position: tournament_team_players[0]?.position ?? null,
        }),
      ),
    };
  }

  async update(
    id: bigint,
    requestingUserId: bigint,
    dto: UpdateTeamDto,
    photo?: UploadedImageFile,
  ) {
    const roles = await this.findRoleCodes(requestingUserId);
    const current = await this.prisma.teams.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        captain_user_id: true,
        photo_url: true,
        photo_public_id: true,
        status: true,
        team_members: {
          where: { status: 'active' },
          select: { user_id: true },
        },
      },
    });
    if (!current || current.status !== 'active') {
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    }
    const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
    if (!isManager && current.captain_user_id !== requestingUserId) {
      throw new ForbiddenException(
        'Solo el capitán o un administrador puede editar el equipo.',
      );
    }

    const nextCaptainId = dto.captainUserId
      ? BigInt(dto.captainUserId)
      : current.captain_user_id;
    const currentMemberIds = new Set(
      current.team_members.map(({ user_id }) => user_id),
    );
    const nextMemberIdSet = dto.memberUserIds
      ? new Set(dto.memberUserIds.map((userId) => BigInt(userId)))
      : new Set(currentMemberIds);
    nextMemberIdSet.add(nextCaptainId);
    const nextMemberIds = [...nextMemberIdSet];
    await this.assertActivePlayers(nextMemberIds, nextCaptainId);
    const addedMemberIds = [...nextMemberIdSet].filter(
      (userId) => !currentMemberIds.has(userId),
    );
    const removedMemberIds = dto.memberUserIds
      ? [...currentMemberIds].filter((userId) => !nextMemberIdSet.has(userId))
      : [];
    const captainChanged = nextCaptainId !== current.captain_user_id;
    const shouldSynchronizeMembers =
      dto.memberUserIds !== undefined || captainChanged;
    const nextTeamName = dto.name?.trim() || current.name;

    const uploadedPhoto = photo
      ? await this.imageStorage.saveTeamPhoto(photo)
      : null;
    const photoUrl = uploadedPhoto?.url ?? current.photo_url;
    try {
      await this.prisma.$transaction(
        async (transaction) => {
          const activeRegistrations = shouldSynchronizeMembers
            ? await this.findActiveTeamRegistrations(transaction, id)
            : [];
          if (shouldSynchronizeMembers) {
            this.assertMemberCountWithinTournamentLimits(
              nextMemberIds.length,
              activeRegistrations,
            );
            await this.assertPlayersAvailableForTournaments(
              transaction,
              id,
              addedMemberIds,
              activeRegistrations,
            );
            await this.assertPlayersEligibleForTournaments(
              transaction,
              nextMemberIds,
              activeRegistrations,
            );
          }

          await transaction.teams.update({
            where: { id },
            data: {
              name: dto.name?.trim(),
              sport_type:
                dto.sportType === undefined ? undefined : FOOTBALL_SPORT_TYPE,
              modality: dto.modality?.trim(),
              primary_color: dto.primaryColor,
              secondary_color: dto.secondaryColor,
              captain_user_id: nextCaptainId,
              photo_url: photoUrl,
              photo_public_id: uploadedPhoto?.publicId,
              status: dto.status,
              updated_at: new Date(),
            },
          });
          if (nextCaptainId !== current.captain_user_id) {
            await transaction.team_members.updateMany({
              where: { team_id: id, user_id: current.captain_user_id },
              data: { member_role: 'player' },
            });
            await transaction.team_members.upsert({
              where: {
                team_id_user_id: { team_id: id, user_id: nextCaptainId },
              },
              create: {
                team_id: id,
                user_id: nextCaptainId,
                member_role: 'player',
                status: 'active',
              },
              update: { member_role: 'player', status: 'active' },
            });
          }
          if (shouldSynchronizeMembers) {
            await transaction.team_members.updateMany({
              where: {
                team_id: id,
                user_id: { notIn: nextMemberIds },
                status: 'active',
              },
              data: { status: 'inactive' },
            });
            await Promise.all(
              nextMemberIds.map((userId) =>
                transaction.team_members.upsert({
                  where: { team_id_user_id: { team_id: id, user_id: userId } },
                  create: {
                    team_id: id,
                    user_id: userId,
                    member_role: 'player',
                    status: 'active',
                  },
                  update: { member_role: 'player', status: 'active' },
                }),
              ),
            );

            await this.synchronizeApprovedTournamentRosters(
              transaction,
              id,
              nextMemberIds,
              removedMemberIds,
              nextCaptainId,
              activeRegistrations,
            );
          }

          const notifications = [
            ...addedMemberIds
              .filter(
                (userId) =>
                  userId !== requestingUserId &&
                  (!captainChanged || userId !== nextCaptainId),
              )
              .map((userId) => ({
                user_id: userId,
                type: 'team',
                title: 'Te agregaron a un equipo',
                message: `Fuiste agregado como integrante de ${nextTeamName}.`,
                entity_type: 'team',
                entity_id: id.toString(),
                metadata: {
                  teamId: id.toString(),
                  teamName: nextTeamName,
                  actionUrl: `/teams/${id.toString()}`,
                  actionLabel: 'Ver equipo',
                },
              })),
            ...removedMemberIds
              .filter((userId) => userId !== requestingUserId)
              .map((userId) => ({
                user_id: userId,
                type: 'team',
                title: 'Ya no perteneces al equipo',
                message: `Fuiste retirado de ${nextTeamName}.`,
                entity_type: 'team',
                entity_id: id.toString(),
                metadata: {
                  teamId: id.toString(),
                  teamName: nextTeamName,
                  actionUrl: '/teams',
                  actionLabel: 'Ver mis equipos',
                },
              })),
          ];

          if (captainChanged && nextCaptainId !== requestingUserId) {
            notifications.push({
              user_id: nextCaptainId,
              type: 'team',
              title: 'Ahora eres capitán',
              message: `Te asignaron como capitán de ${nextTeamName}.`,
              entity_type: 'team',
              entity_id: id.toString(),
              metadata: {
                teamId: id.toString(),
                teamName: nextTeamName,
                actionUrl: `/teams/${id.toString()}`,
                actionLabel: 'Ver equipo',
              },
            });
          }

          if (
            captainChanged &&
            current.captain_user_id !== requestingUserId &&
            !removedMemberIds.includes(current.captain_user_id)
          ) {
            notifications.push({
              user_id: current.captain_user_id,
              type: 'team',
              title: 'Capitanía transferida',
              message: `La capitanía de ${nextTeamName} fue asignada a otro integrante. Sigues formando parte del equipo.`,
              entity_type: 'team',
              entity_id: id.toString(),
              metadata: {
                teamId: id.toString(),
                teamName: nextTeamName,
                actionUrl: `/teams/${id.toString()}`,
                actionLabel: 'Ver equipo',
              },
            });
          }

          if (notifications.length > 0) {
            await transaction.notifications.createMany({ data: notifications });
          }
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
      if (photo && current.photo_url) {
        await this.imageStorage.deleteSafely({
          url: current.photo_url,
          publicId: current.photo_public_id,
        });
      }
      return this.findOne(id, requestingUserId);
    } catch (error) {
      if (uploadedPhoto) await this.imageStorage.deleteSafely(uploadedPhoto);
      throw error;
    }
  }

  async leave(id: bigint, requestingUserId: bigint) {
    const team = await this.prisma.teams.findUnique({
      where: { id },
      select: { id: true, name: true, captain_user_id: true, status: true },
    });
    if (!team || team.status !== 'active') {
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    }
    if (team.captain_user_id === requestingUserId) {
      throw new BadRequestException(
        'El capitán no puede abandonar el equipo sin transferir primero la capitanía.',
      );
    }
    const membership = await this.prisma.team_members.findUnique({
      where: { team_id_user_id: { team_id: id, user_id: requestingUserId } },
    });
    if (!membership || membership.status !== 'active') {
      throw new BadRequestException('No eres miembro activo de este equipo.');
    }
    const leavingPlayer = await this.prisma.users.findUnique({
      where: { id: requestingUserId },
      select: { full_name: true },
    });
    await this.prisma.$transaction(
      async (transaction) => {
        const [activeMemberCount, activeRegistrations] = await Promise.all([
          transaction.team_members.count({
            where: { team_id: id, status: 'active' },
          }),
          this.findActiveTeamRegistrations(transaction, id),
        ]);
        this.assertMemberCountWithinTournamentLimits(
          activeMemberCount - 1,
          activeRegistrations,
        );

        const removed = await transaction.team_members.updateMany({
          where: {
            team_id: id,
            user_id: requestingUserId,
            status: 'active',
          },
          data: { status: 'inactive' },
        });
        if (removed.count !== 1) {
          throw new BadRequestException(
            'La plantilla cambió mientras realizabas la operación. Actualiza la página e inténtalo de nuevo.',
          );
        }
        await this.withdrawPlayersFromApprovedRosters(
          transaction,
          id,
          [requestingUserId],
          activeRegistrations,
        );
        await transaction.notifications.create({
          data: {
            user_id: team.captain_user_id,
            type: 'team',
            title: 'Un integrante salió del equipo',
            message: `${leavingPlayer?.full_name ?? 'Un jugador'} abandonó ${team.name}.`,
            entity_type: 'team',
            entity_id: id.toString(),
            metadata: {
              teamId: id.toString(),
              teamName: team.name,
              actionUrl: `/teams/${id.toString()}`,
              actionLabel: 'Ver equipo',
            },
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    return { id: id.toString(), message: `Saliste del equipo ${team.name}.` };
  }

  async remove(id: bigint, requestingUserId: bigint) {
    const roles = await this.findRoleCodes(requestingUserId);
    if (!MANAGEMENT_ROLES.some((role) => roles.has(role))) {
      throw new ForbiddenException('No tienes permisos para eliminar equipos.');
    }
    const team = await this.prisma.teams.findUnique({
      where: { id },
      include: {
        team_members: {
          where: { status: 'active' },
          select: { user_id: true },
        },
      },
    });
    if (!team || team.status !== 'active') {
      throw new NotFoundException(
        `El equipo con ID ${id.toString()} no existe.`,
      );
    }
    await this.prisma.$transaction(async (transaction) => {
      await transaction.teams.update({
        where: { id },
        data: { status: 'inactive', updated_at: new Date() },
      });
      await transaction.team_members.updateMany({
        where: { team_id: id },
        data: { status: 'inactive' },
      });
      const recipientIds = team.team_members
        .map(({ user_id }) => user_id)
        .filter((userId) => userId !== requestingUserId);
      if (recipientIds.length > 0) {
        await transaction.notifications.createMany({
          data: recipientIds.map((userId) => ({
            user_id: userId,
            type: 'team',
            title: 'Equipo eliminado',
            message: `${team.name} fue eliminado por un administrador. Su historial se conservará.`,
            entity_type: 'team',
            entity_id: id.toString(),
            metadata: {
              teamId: id.toString(),
              teamName: team.name,
              actionUrl: '/teams',
              actionLabel: 'Ver mis equipos',
            },
          })),
        });
      }
    });
    return {
      id: id.toString(),
      message: `El equipo ${team.name} fue eliminado y su historial fue conservado.`,
    };
  }

  private async findRoleCodes(userId: bigint): Promise<Set<string>> {
    const roles = await this.prisma.user_roles.findMany({
      where: { user_id: userId },
      select: { role_code: true },
    });
    return new Set(roles.map(({ role_code }) => role_code));
  }

  private async buildVisibleWhere(
    userId: bigint,
    roles: Set<string>,
  ): Promise<Prisma.teamsWhereInput> {
    if (MANAGEMENT_ROLES.some((role) => roles.has(role))) return {};

    const visibleTeamIds = new Set<bigint>();
    if (roles.has('PLAYER')) {
      const memberships = await this.prisma.team_members.findMany({
        where: { user_id: userId, status: 'active' },
        select: { team_id: true },
      });
      memberships.forEach(({ team_id }) => visibleTeamIds.add(team_id));
    }
    if (roles.has('REFEREE')) {
      const assignments = await this.prisma.match_referees.findMany({
        where: {
          referee_id: userId,
          assignment_status: { in: ['pending', 'accepted'] },
        },
        select: {
          matches: { select: { home_team_id: true, away_team_id: true } },
        },
      });
      assignments.forEach(({ matches }) => {
        visibleTeamIds.add(matches.home_team_id);
        visibleTeamIds.add(matches.away_team_id);
      });
    }
    return { id: { in: [...visibleTeamIds] } };
  }

  private async assertActivePlayers(memberIds: bigint[], captainId: bigint) {
    const users = await this.prisma.users.findMany({
      where: {
        id: { in: memberIds },
        status: 'active',
        user_roles: { some: { role_code: 'PLAYER' } },
      },
      select: { id: true },
    });
    if (users.length !== memberIds.length) {
      throw new BadRequestException(
        'Todos los integrantes deben ser usuarios activos con rol de jugador.',
      );
    }
    if (!users.some(({ id }) => id === captainId)) {
      throw new BadRequestException('El capitán debe ser un jugador activo.');
    }
  }

  private async findActiveTeamRegistrations(
    client: Prisma.TransactionClient,
    teamId: bigint,
  ): Promise<ActiveTeamRegistration[]> {
    return client.tournament_team_registrations.findMany({
      where: {
        team_id: teamId,
        request_status: { in: ['pending', 'changes_requested', 'approved'] },
        tournaments: {
          status: 'active',
          phase: { in: [...ACTIVE_ROSTER_PHASES] },
        },
      },
      select: {
        tournament_id: true,
        request_status: true,
        tournaments: {
          select: {
            name: true,
            phase: true,
            min_players_per_team: true,
            max_players_per_team: true,
            start_date: true,
            category_name: true,
            category_min_age: true,
            category_max_age: true,
            category_gender: true,
          },
        },
      },
    });
  }

  private assertMemberCountWithinTournamentLimits(
    memberCount: number,
    registrations: ActiveTeamRegistration[],
  ): void {
    const belowMinimum = registrations.find(
      ({ tournaments }) => memberCount < tournaments.min_players_per_team,
    );
    if (belowMinimum) {
      throw new BadRequestException(
        `No puedes dejar el equipo con ${memberCount} integrantes: ${belowMinimum.tournaments.name} exige mínimo ${belowMinimum.tournaments.min_players_per_team}. Agrega primero un reemplazo y guarda ambos cambios al mismo tiempo.`,
      );
    }

    const aboveMaximum = registrations.find(
      ({ tournaments }) => memberCount > tournaments.max_players_per_team,
    );
    if (aboveMaximum) {
      throw new BadRequestException(
        `El equipo no puede quedar con ${memberCount} integrantes: ${aboveMaximum.tournaments.name} admite máximo ${aboveMaximum.tournaments.max_players_per_team}.`,
      );
    }
  }

  private async assertPlayersAvailableForTournaments(
    client: Prisma.TransactionClient,
    teamId: bigint,
    playerIds: bigint[],
    registrations: ActiveTeamRegistration[],
  ): Promise<void> {
    if (playerIds.length === 0 || registrations.length === 0) return;

    const existing = await client.tournament_team_players.findFirst({
      where: {
        tournament_id: {
          in: registrations.map(({ tournament_id }) => tournament_id),
        },
        team_id: { not: teamId },
        player_id: { in: playerIds },
      },
      select: {
        player_id: true,
        tournament_team_registrations: {
          select: { tournaments: { select: { name: true } } },
        },
      },
    });
    if (existing) {
      throw new BadRequestException(
        `Uno de los nuevos integrantes ya figura en otro equipo de ${existing.tournament_team_registrations.tournaments.name}. Un jugador solo puede representar a un equipo por torneo.`,
      );
    }
  }

  private async assertPlayersEligibleForTournaments(
    client: Prisma.TransactionClient,
    playerIds: bigint[],
    registrations: ActiveTeamRegistration[],
  ): Promise<void> {
    if (playerIds.length === 0 || registrations.length === 0) return;

    const players = await client.users.findMany({
      where: { id: { in: playerIds } },
      select: { full_name: true, birth_date: true, gender: true },
    });
    for (const { tournaments } of registrations) {
      const rules = {
        name: tournaments.name,
        startDate: tournaments.start_date,
        categoryName: tournaments.category_name,
        minAge: tournaments.category_min_age,
        maxAge: tournaments.category_max_age,
        gender: tournaments.category_gender,
      };
      const issues = getTournamentEligibilityIssues(
        rules,
        players.map((player) => ({
          fullName: player.full_name,
          birthDate: player.birth_date,
          gender: player.gender,
        })),
      );
      if (issues.length > 0) {
        throw new BadRequestException(
          formatTournamentEligibilityError(rules, issues),
        );
      }
    }
  }

  private async synchronizeApprovedTournamentRosters(
    client: Prisma.TransactionClient,
    teamId: bigint,
    activePlayerIds: bigint[],
    removedPlayerIds: bigint[],
    captainId: bigint,
    registrations: ActiveTeamRegistration[],
  ): Promise<void> {
    const approvedRegistrations = registrations.filter(
      ({ request_status }) => request_status === 'approved',
    );
    if (approvedRegistrations.length === 0) return;

    await this.withdrawPlayersFromApprovedRosters(
      client,
      teamId,
      removedPlayerIds,
      approvedRegistrations,
    );

    for (const registration of approvedRegistrations) {
      await client.tournament_team_players.updateMany({
        where: {
          tournament_id: registration.tournament_id,
          team_id: teamId,
          registration_status: 'approved',
        },
        data: { is_captain: false },
      });
      await Promise.all(
        activePlayerIds.map((playerId) =>
          client.tournament_team_players.upsert({
            where: {
              tournament_id_team_id_player_id: {
                tournament_id: registration.tournament_id,
                team_id: teamId,
                player_id: playerId,
              },
            },
            create: {
              tournament_id: registration.tournament_id,
              team_id: teamId,
              player_id: playerId,
              is_captain: playerId === captainId,
              registration_status: 'approved',
            },
            update: {
              is_captain: playerId === captainId,
              registration_status: 'approved',
            },
          }),
        ),
      );
    }
  }

  private async withdrawPlayersFromApprovedRosters(
    client: Prisma.TransactionClient,
    teamId: bigint,
    playerIds: bigint[],
    registrations: ActiveTeamRegistration[],
  ): Promise<void> {
    if (playerIds.length === 0) return;
    const approvedTournamentIds = registrations
      .filter(({ request_status }) => request_status === 'approved')
      .map(({ tournament_id }) => tournament_id);
    if (approvedTournamentIds.length === 0) return;

    await client.tournament_team_players.updateMany({
      where: {
        tournament_id: { in: approvedTournamentIds },
        team_id: teamId,
        player_id: { in: playerIds },
        registration_status: 'approved',
      },
      data: {
        registration_status: 'withdrawn',
        jersey_number: null,
        position: null,
        is_captain: false,
      },
    });
  }

  private toResponse(team: TeamCardRecord, userId: bigint, roles: Set<string>) {
    const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
    const isCaptain = team.captain_user_id === userId;
    const isMember = team.team_members.some(
      ({ user_id }) => user_id === userId,
    );
    const tournaments = team.tournament_team_registrations.map(
      (registration) => ({
        id: registration.tournaments.id.toString(),
        name: registration.tournaments.name,
        registrationStatus: registration.request_status,
      }),
    );
    const maxPlayers = team.tournament_team_registrations.reduce(
      (maximum, registration) =>
        Math.max(maximum, registration.tournaments.max_players_per_team),
      team.team_members.length,
    );
    return {
      id: team.id.toString(),
      name: team.name,
      sportType: team.sport_type,
      modality: team.modality,
      primaryColor: team.primary_color,
      secondaryColor: team.secondary_color,
      photoUrl: team.photo_url,
      status: team.status,
      captain: {
        id: team.users_teams_captain_user_idTousers.id.toString(),
        fullName: team.users_teams_captain_user_idTousers.full_name,
      },
      members: team.team_members.map((member) => ({
        id: member.user_id.toString(),
        fullName: member.users.full_name,
        photoUrl: member.users.photo_url,
        role: member.member_role,
      })),
      memberCount: team.team_members.length,
      maxPlayers,
      tournaments,
      permissions: {
        isMember,
        isCaptain,
        canEnter: true,
        canEdit: isManager || isCaptain,
        canRemoveMembers: roles.has('SUPER_ADMIN') || isCaptain,
        canLeave: roles.has('PLAYER') && isMember && !isCaptain,
        canDelete: isManager,
      },
      createdAt: team.created_at.toISOString(),
      updatedAt: team.updated_at.toISOString(),
    };
  }
}
