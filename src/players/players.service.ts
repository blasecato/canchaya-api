import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  BlockPlayerDto,
  type PlayerBlockDuration,
} from './dto/block-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ListPlayersQueryDto } from './dto/list-players-query.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

const playerSelect = {
  id: true,
  id_number: true,
  document_type: true,
  full_name: true,
  birth_date: true,
  gender: true,
  email: true,
  phone: true,
  photo_url: true,
  photo_public_id: true,
  status: true,
  blocked_until: true,
  block_reason: true,
  created_at: true,
  updated_at: true,
  user_roles: {
    orderBy: { role_code: 'asc' },
    select: { role_code: true },
  },
  team_members: {
    where: { status: 'active' },
    select: {
      teams: { select: { id: true, name: true } },
      tournament_team_players: {
        select: {
          registration_status: true,
          tournament_team_registrations: {
            select: { tournaments: { select: { id: true, name: true } } },
          },
        },
      },
    },
  },
} satisfies Prisma.usersSelect;

type PlayerRecord = Prisma.usersGetPayload<{ select: typeof playerSelect }>;

@Injectable()
export class PlayersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async findAll(query: ListPlayersQueryDto, requestingUserId: bigint) {
    await this.releaseExpiredBlocks();
    if (query.managedTournamentsOnly) {
      const isAssociationAdmin = await this.prisma.user_roles.findUnique({
        where: {
          user_id_role_code: {
            user_id: requestingUserId,
            role_code: 'ASSOCIATION_ADMIN',
          },
        },
        select: { user_id: true },
      });
      if (!isAssociationAdmin) {
        throw new ForbiddenException(
          'Este filtro solo está disponible para administradores de asociación.',
        );
      }
    }
    const membershipFilter: Prisma.team_membersWhereInput = {
      status: 'active',
      team_id: query.teamId ? BigInt(query.teamId) : undefined,
      tournament_team_players: query.managedTournamentsOnly
        ? {
            some: {
              registration_status: 'approved',
              tournament_team_registrations: {
                request_status: 'approved',
                tournaments: {
                  associations: {
                    OR: [
                      { owner_user_id: requestingUserId },
                      {
                        association_administrators: {
                          some: {
                            user_id: requestingUserId,
                            status: 'active',
                            permission_level: 'administrator',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          }
        : query.tournamentId
          ? { some: { tournament_id: BigInt(query.tournamentId) } }
          : undefined,
    };
    const where: Prisma.usersWhereInput = {
      user_roles: { some: { role_code: 'PLAYER' } },
      status:
        query.status === 'active'
          ? 'active'
          : query.status === 'blocked'
            ? 'inactive'
            : undefined,
      team_members:
        query.teamId || query.tournamentId || query.managedTournamentsOnly
          ? { some: membershipFilter }
          : undefined,
      OR: query.search
        ? [
            { full_name: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
            { id_number: { contains: query.search, mode: 'insensitive' } },
          ]
        : undefined,
    };
    const allPlayersWhere: Prisma.usersWhereInput = {
      user_roles: { some: { role_code: 'PLAYER' } },
    };
    const minorThreshold = new Date();
    minorThreshold.setFullYear(minorThreshold.getFullYear() - 18);
    const skip = (query.page - 1) * query.pageSize;
    const [total, players, totalPlayers, active, blocked, minors] =
      await this.prisma.$transaction([
        this.prisma.users.count({ where }),
        this.prisma.users.findMany({
          where,
          orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
          skip,
          take: query.pageSize,
          select: playerSelect,
        }),
        this.prisma.users.count({ where: allPlayersWhere }),
        this.prisma.users.count({
          where: { ...allPlayersWhere, status: 'active' },
        }),
        this.prisma.users.count({
          where: {
            ...allPlayersWhere,
            status: 'inactive',
          },
        }),
        this.prisma.users.count({
          where: { ...allPlayersWhere, birth_date: { gt: minorThreshold } },
        }),
      ]);

    return {
      items: players.map((player) => this.toResponse(player)),
      metrics: { total: totalPlayers, active, blocked, minors },
      page: query.page,
      pageSize: query.pageSize,
      total,
      hasNextPage: skip + players.length < total,
    };
  }

  async findFilters() {
    const [teams, tournaments] = await Promise.all([
      this.prisma.teams.findMany({
        where: {
          status: 'active',
          team_members: {
            some: {
              status: 'active',
              users: { user_roles: { some: { role_code: 'PLAYER' } } },
            },
          },
        },
        orderBy: [{ name: 'asc' }, { id: 'asc' }],
        select: { id: true, name: true },
      }),
      this.prisma.tournaments.findMany({
        where: {
          tournament_team_registrations: {
            some: { tournament_team_players: { some: {} } },
          },
        },
        orderBy: [{ name: 'asc' }, { id: 'asc' }],
        select: { id: true, name: true },
      }),
    ]);
    return {
      teams: teams.map(({ id, name }) => ({ id: id.toString(), name })),
      tournaments: tournaments.map(({ id, name }) => ({
        id: id.toString(),
        name,
      })),
    };
  }

  async create(dto: CreatePlayerDto, photo?: UploadedImageFile) {
    this.assertValidBirthDate(dto.birthDate);
    const uploadedPhoto = photo
      ? await this.imageStorage.saveUserPhoto(photo)
      : null;
    try {
      const player = await this.prisma.$transaction(async (transaction) => {
        const user = await transaction.users.create({
          data: {
            id_number: dto.idNumber.trim(),
            document_type: dto.documentType.trim(),
            full_name: dto.fullName.trim(),
            birth_date: new Date(dto.birthDate),
            gender: dto.gender,
            email: dto.email.trim().toLowerCase(),
            phone: dto.phone?.trim() || null,
            photo_url: uploadedPhoto?.url ?? null,
            photo_public_id: uploadedPhoto?.publicId ?? null,
            password_hash: await hash(dto.password, 12),
            status: 'active',
          },
          select: { id: true },
        });
        await transaction.user_roles.create({
          data: { user_id: user.id, role_code: 'PLAYER' },
        });
        return transaction.users.findUniqueOrThrow({
          where: { id: user.id },
          select: playerSelect,
        });
      });
      return this.toResponse(player);
    } catch (error) {
      if (uploadedPhoto) await this.imageStorage.deleteSafely(uploadedPhoto);
      throw error;
    }
  }

  async update(id: bigint, dto: UpdatePlayerDto, photo?: UploadedImageFile) {
    const current = await this.prisma.users.findFirst({
      where: { id, user_roles: { some: { role_code: 'PLAYER' } } },
      select: { id: true, photo_url: true, photo_public_id: true },
    });
    if (!current) {
      throw new NotFoundException(
        `El jugador con ID ${id.toString()} no existe.`,
      );
    }
    if (dto.birthDate) this.assertValidBirthDate(dto.birthDate);
    const uploadedPhoto = photo
      ? await this.imageStorage.saveUserPhoto(photo)
      : null;
    const photoUrl = uploadedPhoto?.url ?? current.photo_url;
    let player: PlayerRecord;
    try {
      player = await this.prisma.users.update({
        where: { id },
        data: {
          id_number: dto.idNumber?.trim(),
          document_type: dto.documentType?.trim(),
          full_name: dto.fullName?.trim(),
          birth_date: dto.birthDate ? new Date(dto.birthDate) : undefined,
          gender: dto.gender,
          email: dto.email?.trim().toLowerCase(),
          phone:
            dto.phone === undefined ? undefined : dto.phone?.trim() || null,
          photo_url: photoUrl,
          photo_public_id: uploadedPhoto?.publicId,
          updated_at: new Date(),
        },
        select: playerSelect,
      });
    } catch (error) {
      if (uploadedPhoto) await this.imageStorage.deleteSafely(uploadedPhoto);
      throw error;
    }
    if (photo && current.photo_url) {
      await this.imageStorage.deleteSafely({
        url: current.photo_url,
        publicId: current.photo_public_id,
      });
    }
    return this.toResponse(player);
  }

  async block(id: bigint, requestingUserId: bigint, dto: BlockPlayerDto) {
    if (id === requestingUserId) {
      throw new BadRequestException('No puedes bloquear tu propia cuenta.');
    }
    await this.ensurePlayer(id);
    const now = new Date();
    const blockedUntil = this.calculateBlockedUntil(now, dto.duration);
    const player = await this.prisma.$transaction(async (transaction) => {
      const updated = await transaction.users.update({
        where: { id },
        data: {
          status: 'inactive',
          blocked_until: blockedUntil,
          block_reason: dto.reason.trim(),
          blocked_by: requestingUserId,
          block_source_action_id: null,
          updated_at: now,
        },
        select: playerSelect,
      });
      await transaction.auth_sessions.updateMany({
        where: { user_id: id, revoked_at: null },
        data: { revoked_at: now },
      });
      await transaction.notifications.create({
        data: {
          user_id: id,
          type: 'system',
          title: 'Tu cuenta fue bloqueada temporalmente',
          message: `Tu cuenta fue bloqueada hasta el ${this.formatBlockDate(blockedUntil)}. Motivo: ${dto.reason.trim()}`,
          entity_type: 'user_block',
          entity_id: id.toString(),
          metadata: {
            reason: dto.reason.trim(),
            blockedUntil: blockedUntil.toISOString(),
            actionUrl: '/profile',
            actionLabel: 'Ver mi perfil',
          },
        },
      });
      return updated;
    });
    return this.toResponse(player);
  }

  async unblock(id: bigint) {
    await this.ensurePlayer(id);
    const player = await this.prisma.$transaction(async (transaction) => {
      const updated = await transaction.users.update({
        where: { id },
        data: {
          status: 'active',
          blocked_until: null,
          block_reason: null,
          blocked_by: null,
          block_source_action_id: null,
          updated_at: new Date(),
        },
        select: playerSelect,
      });
      await transaction.notifications.create({
        data: {
          user_id: id,
          type: 'account',
          title: 'Tu cuenta fue reactivada',
          message:
            'El bloqueo de tu cuenta fue retirado. Ya puedes volver a utilizar todas tus funciones habilitadas.',
          entity_type: 'user_block',
          entity_id: id.toString(),
          metadata: {
            actionUrl: '/profile',
            actionLabel: 'Ver mi perfil',
          },
        },
      });
      return updated;
    });
    return this.toResponse(player);
  }

  private async ensurePlayer(id: bigint) {
    const player = await this.prisma.users.findFirst({
      where: { id, user_roles: { some: { role_code: 'PLAYER' } } },
      select: { id: true },
    });
    if (!player) {
      throw new NotFoundException(
        `El jugador con ID ${id.toString()} no existe.`,
      );
    }
  }

  private async releaseExpiredBlocks() {
    const now = new Date();
    await this.prisma.users.updateMany({
      where: {
        status: 'inactive',
        block_reason: { not: null },
        blocked_until: { lte: now },
      },
      data: {
        status: 'active',
        blocked_until: null,
        block_reason: null,
        blocked_by: null,
        block_source_action_id: null,
        updated_at: now,
      },
    });
  }

  private assertValidBirthDate(value: string) {
    const birthDate = new Date(value);
    if (birthDate > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede estar en el futuro.',
      );
    }
  }

  private calculateBlockedUntil(start: Date, duration: PlayerBlockDuration) {
    const end = new Date(start);
    if (duration === 'one_week') end.setDate(end.getDate() + 7);
    if (duration === 'one_month') end.setMonth(end.getMonth() + 1);
    if (duration === 'three_months') end.setMonth(end.getMonth() + 3);
    if (duration === 'six_months') end.setMonth(end.getMonth() + 6);
    if (duration === 'nine_months') end.setMonth(end.getMonth() + 9);
    if (duration === 'one_year') end.setFullYear(end.getFullYear() + 1);
    return end;
  }

  private formatBlockDate(value: Date) {
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Bogota',
    }).format(value);
  }

  private toResponse(player: PlayerRecord) {
    const teams = player.team_members.map(({ teams }) => ({
      id: teams.id.toString(),
      name: teams.name,
    }));
    const tournamentMap = new Map<string, { id: string; name: string }>();
    player.team_members.forEach(({ tournament_team_players }) => {
      tournament_team_players.forEach((registration) => {
        const tournament =
          registration.tournament_team_registrations.tournaments;
        tournamentMap.set(tournament.id.toString(), {
          id: tournament.id.toString(),
          name: tournament.name,
        });
      });
    });
    return {
      id: player.id.toString(),
      idNumber: player.id_number,
      documentType: player.document_type,
      fullName: player.full_name,
      birthDate: player.birth_date.toISOString().slice(0, 10),
      gender: player.gender,
      age: this.calculateAge(player.birth_date),
      email: player.email,
      phone: player.phone,
      photoUrl: player.photo_url,
      status: player.status === 'inactive' ? 'blocked' : 'active',
      blockReason: player.block_reason,
      blockedUntil: player.blocked_until?.toISOString() ?? null,
      roles: player.user_roles.map(({ role_code }) => role_code),
      teams,
      tournaments: [...tournamentMap.values()],
      createdAt: player.created_at.toISOString(),
      updatedAt: player.updated_at.toISOString(),
    };
  }

  private calculateAge(birthDate: Date) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getUTCFullYear();
    const birthdayHasNotPassed =
      today.getMonth() < birthDate.getUTCMonth() ||
      (today.getMonth() === birthDate.getUTCMonth() &&
        today.getDate() < birthDate.getUTCDate());
    if (birthdayHasNotPassed) age -= 1;
    return age;
  }
}
