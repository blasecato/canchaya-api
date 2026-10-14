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
import {
  BulkCreatePlayersDto,
  BulkCreatePlayersResponseDto,
  BulkPlayerRowDto,
  BulkPlayerSkippedDto,
} from './dto/bulk-create-players.dto';
import { ROLE_LABELS } from '../users/user-role.constants';
import { getTemporaryPlayerPassword } from './players.constants';
import { CreatePlayerDto } from './dto/create-player.dto';
import { DeletePlayerResultDto } from './dto/delete-player-result.dto';
import { ListPlayersQueryDto } from './dto/list-players-query.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

const BLOCK_DURATION_LABELS: Record<PlayerBlockDuration, string> = {
  one_week: '1 semana',
  one_month: '1 mes',
  three_months: '3 meses',
  six_months: '6 meses',
  nine_months: '9 meses',
  one_year: '1 año',
};

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

  /**
   * Alta masiva desde un archivo. Las filas que ya existen en la plataforma se
   * omiten en lugar de fallar: quien carga una lista de 100 jugadores espera
   * que entren los nuevos, no que se caiga todo por 20 repetidos.
   */
  async bulkCreate(
    dto: BulkCreatePlayersDto,
  ): Promise<BulkCreatePlayersResponseDto> {
    const temporaryPassword = getTemporaryPlayerPassword();
    const skipped: BulkPlayerSkippedDto[] = [];
    const pending: BulkPlayerRowDto[] = [];
    const seenDocuments = new Set<string>();
    const seenEmails = new Set<string>();

    dto.players.forEach((player) => {
      this.assertValidBirthDate(player.birthDate);
      const idNumber = player.idNumber.trim();
      const email = player.email.trim().toLowerCase();

      // Repetidos dentro del propio archivo: se conserva la primera aparición.
      if (seenDocuments.has(idNumber) || seenEmails.has(email)) {
        skipped.push({
          row: player.row,
          idNumber,
          fullName: player.fullName.trim(),
          reason: 'duplicate_in_file',
          detail: 'El archivo trae este jugador más de una vez.',
        });
        return;
      }

      seenDocuments.add(idNumber);
      seenEmails.add(email);
      pending.push({ ...player, idNumber, email });
    });

    if (pending.length > 0) {
      const existing = await this.prisma.users.findMany({
        where: {
          OR: [
            { id_number: { in: pending.map(({ idNumber }) => idNumber) } },
            {
              email: {
                in: pending.map(({ email }) => email),
                mode: 'insensitive',
              },
            },
          ],
        },
        select: { id_number: true, email: true },
      });
      const takenDocuments = new Set(existing.map(({ id_number }) => id_number));
      const takenEmails = new Set(
        existing.map(({ email }) => email.toLowerCase()),
      );

      for (let index = pending.length - 1; index >= 0; index -= 1) {
        const player = pending[index];
        const documentTaken = takenDocuments.has(player.idNumber);
        const emailTaken = takenEmails.has(player.email);
        if (!documentTaken && !emailTaken) continue;

        skipped.push({
          row: player.row,
          idNumber: player.idNumber,
          fullName: player.fullName.trim(),
          reason: documentTaken ? 'duplicate_document' : 'duplicate_email',
          detail: documentTaken
            ? 'Ya existe una cuenta con ese número de documento.'
            : 'Ya existe una cuenta con ese correo electrónico.',
        });
        pending.splice(index, 1);
      }
    }

    let created = 0;
    if (pending.length > 0) {
      // Una sola clave temporal compartida: se hashea una vez, no 500.
      const passwordHash = await hash(temporaryPassword, 12);
      await this.prisma.$transaction(async (transaction) => {
        for (const player of pending) {
          const user = await transaction.users.create({
            data: {
              id_number: player.idNumber,
              document_type: player.documentType.trim(),
              full_name: player.fullName.trim(),
              birth_date: new Date(player.birthDate),
              gender: player.gender,
              email: player.email,
              phone: player.phone?.trim() || null,
              password_hash: passwordHash,
              status: 'active',
            },
            select: { id: true },
          });
          await transaction.user_roles.create({
            data: { user_id: user.id, role_code: 'PLAYER' },
          });
          created += 1;
        }
      });
    }

    return {
      received: dto.players.length,
      created,
      skipped: skipped.sort((left, right) => left.row - right.row),
      temporaryPassword,
    };
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

  /**
   * Borrado definitivo de un jugador. Pensado para corregir registros erróneos
   * o de prueba, así que solo procede cuando la cuenta no deja huella: sin
   * estadísticas, tarjetas, sanciones ni responsabilidades administrativas.
   * Lo que sí se limpia son sus inscripciones y sus equipos, que no son
   * historia deportiva sino vínculos.
   */
  async remove(
    id: bigint,
    requestingUserId: bigint,
  ): Promise<DeletePlayerResultDto> {
    if (id === requestingUserId) {
      throw new BadRequestException('No puedes eliminar tu propia cuenta.');
    }
    const player = await this.prisma.users.findFirst({
      where: { id, user_roles: { some: { role_code: 'PLAYER' } } },
      select: {
        id: true,
        full_name: true,
        photo_url: true,
        photo_public_id: true,
        user_roles: { select: { role_code: true } },
      },
    });
    if (!player) {
      throw new NotFoundException(
        `El jugador con ID ${id.toString()} no existe.`,
      );
    }

    const otherRoles = player.user_roles
      .map(({ role_code }) => role_code)
      .filter((role) => role !== 'PLAYER');
    if (otherRoles.length > 0) {
      throw new BadRequestException(
        `${player.full_name} también tiene los roles ${otherRoles
          .map((role) => ROLE_LABELS[role] ?? role)
          .join(', ')}. Quita esos roles antes de eliminar la cuenta.`,
      );
    }

    const [
      matchStats,
      cardCharges,
      disciplinaryActions,
      captainTeams,
      createdTeams,
      requestedRegistrations,
      registrationEvents,
    ] = await Promise.all([
      this.prisma.player_match_stats.count({ where: { player_id: id } }),
      this.prisma.tournament_card_charges.count({ where: { player_id: id } }),
      this.prisma.disciplinary_actions.count({ where: { player_id: id } }),
      this.prisma.teams.count({ where: { captain_user_id: id } }),
      this.prisma.teams.count({ where: { created_by: id } }),
      this.prisma.tournament_team_registrations.count({
        where: { requested_by: id },
      }),
      this.prisma.tournament_registration_events.count({
        where: { actor_user_id: id },
      }),
    ]);

    const blockers: string[] = [];
    if (matchStats > 0)
      blockers.push(
        `tiene estadísticas en ${matchStats} partido${matchStats === 1 ? '' : 's'}`,
      );
    if (cardCharges > 0)
      blockers.push('tiene cobros de tarjetas registrados');
    if (disciplinaryActions > 0)
      blockers.push('tiene procesos disciplinarios');
    if (captainTeams > 0)
      blockers.push(
        `es capitán de ${captainTeams} equipo${captainTeams === 1 ? '' : 's'}`,
      );
    if (createdTeams > 0)
      blockers.push(
        `creó ${createdTeams} equipo${createdTeams === 1 ? '' : 's'}`,
      );
    if (requestedRegistrations > 0 || registrationEvents > 0)
      blockers.push('gestionó inscripciones de equipos a torneos');
    if (blockers.length > 0) {
      throw new BadRequestException(
        `${player.full_name} no se puede eliminar porque ${blockers.join(', ')}. Bloquea la cuenta en lugar de borrarla para conservar esa información.`,
      );
    }

    let removedTeamMemberships = 0;
    let removedTournamentRosters = 0;
    try {
      await this.prisma.$transaction(async (transaction) => {
        // La plantilla del torneo cuelga de la membresía: va primero.
        const rosters = await transaction.tournament_team_players.deleteMany({
          where: { player_id: id },
        });
        removedTournamentRosters = rosters.count;
        const memberships = await transaction.team_members.deleteMany({
          where: { user_id: id },
        });
        removedTeamMemberships = memberships.count;
        // El borrado del usuario arrastra roles, sesiones, notificaciones,
        // preferencias y códigos de recuperación.
        await transaction.users.delete({ where: { id } });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          `${player.full_name} tiene información asociada en el sistema que no se puede borrar. Bloquea la cuenta en lugar de eliminarla.`,
        );
      }
      throw error;
    }

    if (player.photo_url) {
      await this.imageStorage.deleteSafely({
        url: player.photo_url,
        publicId: player.photo_public_id,
      });
    }

    return {
      id: id.toString(),
      fullName: player.full_name,
      removedTeamMemberships,
      removedTournamentRosters,
    };
  }

  async block(id: bigint, requestingUserId: bigint, dto: BlockPlayerDto) {
    if (id === requestingUserId) {
      throw new BadRequestException('No puedes bloquear tu propia cuenta.');
    }
    await this.ensurePlayer(id);
    const now = new Date();
    const blockedUntil = this.calculateBlockedUntil(now, dto.duration);
    const actor = await this.prisma.users.findUnique({
      where: { id: requestingUserId },
      select: { full_name: true },
    });
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
          title: `Tu cuenta fue bloqueada por ${BLOCK_DURATION_LABELS[dto.duration]}`,
          message: `Tu cuenta fue bloqueada por ${BLOCK_DURATION_LABELS[dto.duration]}, hasta el ${this.formatBlockDate(blockedUntil)}. Durante ese tiempo no podrás integrar equipos nuevos ni inscribirte en otros torneos. Motivo: ${dto.reason.trim()}`,
          entity_type: 'user_block',
          entity_id: id.toString(),
          metadata: {
            reason: dto.reason.trim(),
            duration: dto.duration,
            durationLabel: BLOCK_DURATION_LABELS[dto.duration],
            blockedUntil: blockedUntil.toISOString(),
            actionUrl: '/profile',
            actionLabel: 'Ver mi perfil',
          },
        },
      });
      await this.notifyBlockRecipients(transaction, id, requestingUserId, {
        title: 'Un jugador fue bloqueado',
        message: `${updated.full_name} fue bloqueado por ${BLOCK_DURATION_LABELS[dto.duration]}, hasta el ${this.formatBlockDate(blockedUntil)}. Bloqueo registrado por ${actor?.full_name ?? 'un administrador'}. No podrá integrar equipos nuevos ni inscribirse en otros torneos. Motivo: ${dto.reason.trim()}`,
        metadata: {
          reason: dto.reason.trim(),
          duration: dto.duration,
          durationLabel: BLOCK_DURATION_LABELS[dto.duration],
          blockedUntil: blockedUntil.toISOString(),
          playerId: id.toString(),
          playerName: updated.full_name,
          blockedBy: requestingUserId.toString(),
          blockedByName: actor?.full_name ?? null,
          actionUrl: '/players',
          actionLabel: 'Ver jugadores',
        },
      });
      return updated;
    });
    return this.toResponse(player);
  }

  /**
   * Destinatarios del aviso de sanción: los superadministradores, quien ejecuta
   * la acción y los administradores de las organizaciones donde el jugador
   * tiene inscripciones vigentes. No se notifica a toda la plataforma.
   */
  private async findBlockNotificationRecipients(
    transaction: Prisma.TransactionClient,
    playerId: bigint,
    actorUserId: bigint,
  ): Promise<bigint[]> {
    const [superAdministrators, rosterEntries] = await Promise.all([
      transaction.users.findMany({
        where: {
          status: 'active',
          user_roles: { some: { role_code: 'SUPER_ADMIN' } },
        },
        select: { id: true },
      }),
      transaction.tournament_team_players.findMany({
        where: {
          player_id: playerId,
          tournament_team_registrations: {
            request_status: { in: ['pending', 'changes_requested', 'approved'] },
            tournaments: {
              status: 'active',
              phase: { notIn: ['finished', 'archived', 'cancelled'] },
            },
          },
        },
        select: {
          tournament_team_registrations: {
            select: { tournaments: { select: { association_id: true } } },
          },
        },
      }),
    ]);

    const associationIds = [
      ...new Set(
        rosterEntries.map(
          ({ tournament_team_registrations }) =>
            tournament_team_registrations.tournaments.association_id,
        ),
      ),
    ];

    const associationStaff = associationIds.length
      ? await transaction.associations.findMany({
          where: { id: { in: associationIds } },
          select: {
            owner_user_id: true,
            association_administrators: {
              where: { status: 'active' },
              select: { user_id: true },
            },
          },
        })
      : [];

    const recipients = new Set<bigint>([
      actorUserId,
      ...superAdministrators.map(({ id }) => id),
    ]);
    associationStaff.forEach((association) => {
      recipients.add(association.owner_user_id);
      association.association_administrators.forEach(({ user_id }) =>
        recipients.add(user_id),
      );
    });
    // El jugador recibe su propio aviso, con otro texto.
    recipients.delete(playerId);

    return [...recipients];
  }

  private async notifyBlockRecipients(
    transaction: Prisma.TransactionClient,
    playerId: bigint,
    actorUserId: bigint,
    notification: {
      title: string;
      message: string;
      metadata: Prisma.InputJsonValue;
    },
  ): Promise<void> {
    const recipients = await this.findBlockNotificationRecipients(
      transaction,
      playerId,
      actorUserId,
    );

    if (recipients.length === 0) return;

    await transaction.notifications.createMany({
      data: recipients.map((userId) => ({
        user_id: userId,
        type: 'system',
        title: notification.title,
        message: notification.message,
        entity_type: 'user_block',
        entity_id: playerId.toString(),
        metadata: notification.metadata,
      })),
    });
  }

  async unblock(id: bigint, requestingUserId: bigint) {
    await this.ensurePlayer(id);
    const actor = await this.prisma.users.findUnique({
      where: { id: requestingUserId },
      select: { full_name: true },
    });
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
      await this.notifyBlockRecipients(transaction, id, requestingUserId, {
        title: 'Se levantó el bloqueo de un jugador',
        message: `${updated.full_name} puede volver a usar su cuenta. Bloqueo retirado por ${actor?.full_name ?? 'un administrador'}.`,
        metadata: {
          playerId: id.toString(),
          playerName: updated.full_name,
          unblockedBy: requestingUserId.toString(),
          unblockedByName: actor?.full_name ?? null,
          actionUrl: '/players',
          actionLabel: 'Ver jugadores',
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
