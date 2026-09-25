import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type {
  StoredImageAsset,
  StoredImageReference,
  UploadedImageFile,
} from '../uploads/image-storage.types';
import {
  associationResponseSelect,
  toAssociationResponse,
  type AssociationResponseRecord,
} from './association-response.mapper';
import {
  associationTournamentResponseSelect,
  toAssociationTournamentResponse,
} from './association-tournament-response.mapper';
import { AssociationResponseDto } from './dto/association-response.dto';
import {
  type AssociationPermissionLevel,
  AssociationDetailResponseDto,
  AssociationPermissionsResponseDto,
} from './dto/association-detail-response.dto';
import { AssociationTournamentResponseDto } from './dto/association-tournament-response.dto';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import type { AssociationTournamentScope } from './dto/list-association-tournaments-query.dto';
import { PUBLIC_TOURNAMENT_PHASES } from '../tournaments/tournament-lifecycle.constants';

type AssociationCreationAuthorizationClient = Pick<
  Prisma.TransactionClient,
  'associations' | 'user_roles'
>;

/**
 * Organización que el catálogo muestra de primera a los jugadores.
 * Se puede cambiar sin recompilar con FEATURED_ASSOCIATION_ID.
 */
const FEATURED_ASSOCIATION_ID = (() => {
  const configured = process.env.FEATURED_ASSOCIATION_ID?.trim();
  return configured && /^\d+$/.test(configured) ? BigInt(configured) : 6n;
})();

@Injectable()
export class AssociationsService {
  private readonly logger = new Logger(AssociationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async create(
    createAssociationDto: CreateAssociationDto,
    logo: UploadedImageFile,
    cover: UploadedImageFile,
    requestingUserId: bigint,
  ): Promise<AssociationResponseDto> {
    const ownerUserId = BigInt(createAssociationDto.ownerUserId);
    let logoAsset: StoredImageAsset | undefined;
    let coverAsset: StoredImageAsset | undefined;
    let response: AssociationResponseDto;

    await this.assertCanCreateAssociation(
      this.prisma,
      requestingUserId,
      ownerUserId,
    );

    try {
      logoAsset = await this.imageStorage.saveAssociationLogo(logo);
      coverAsset = await this.imageStorage.saveAssociationCover(cover);
    } catch (error: unknown) {
      await this.deleteImagesWithoutMaskingError([logoAsset, coverAsset]);
      throw error;
    }

    try {
      response = await this.prisma.$transaction(async (transaction) => {
        await this.assertCanCreateAssociation(
          transaction,
          requestingUserId,
          ownerUserId,
        );
        await this.ensureActiveOwner(transaction, ownerUserId);

        const association = await transaction.associations.create({
          data: {
            name: createAssociationDto.name,
            description: createAssociationDto.description,
            city: createAssociationDto.city,
            address: createAssociationDto.address,
            tax_id: createAssociationDto.taxId,
            email: createAssociationDto.email,
            phone: createAssociationDto.phone,
            logo_url: logoAsset.url,
            logo_public_id: logoAsset.publicId,
            cover_url: coverAsset.url,
            cover_public_id: coverAsset.publicId,
            owner_user_id: ownerUserId,
            status: createAssociationDto.status,
          },
          select: associationResponseSelect,
        });

        await this.ensureAssociationAdminRole(transaction, ownerUserId);

        return toAssociationResponse(association, 0);
      });
    } catch (error: unknown) {
      await this.deleteImagesWithoutMaskingError([logoAsset, coverAsset]);
      throw error;
    }

    if (ownerUserId !== requestingUserId) {
      await this.notifyAssociationAssignmentSafely(
        ownerUserId,
        response.id,
        response.name,
      );
    }

    return response;
  }

  async findAll(requestingUserId?: bigint): Promise<AssociationResponseDto[]> {
    const isSuperAdmin = requestingUserId
      ? await this.hasRole(requestingUserId, 'SUPER_ADMIN')
      : false;
    const isPlayer =
      requestingUserId && !isSuperAdmin
        ? await this.hasRole(requestingUserId, 'PLAYER')
        : false;
    const canSeeInactiveAssociations = requestingUserId ? isSuperAdmin : true;
    const associations = await this.prisma.associations.findMany({
      where: canSeeInactiveAssociations ? undefined : { status: 'active' },
      orderBy: { id: 'asc' },
      select: associationResponseSelect,
    });

    const response =
      await this.toAssociationResponsesWithTeamCounts(associations);

    return isPlayer ? this.pinFeaturedAssociation(response) : response;
  }

  private async hasRole(userId: bigint, roleCode: string): Promise<boolean> {
    return Boolean(
      await this.prisma.user_roles.findFirst({
        where: { user_id: userId, role_code: roleCode },
        select: { role_code: true },
      }),
    );
  }

  /** Deja la organización destacada de primera en el catálogo del jugador. */
  private pinFeaturedAssociation(
    associations: AssociationResponseDto[],
  ): AssociationResponseDto[] {
    const featuredId = FEATURED_ASSOCIATION_ID.toString();
    const featuredIndex = associations.findIndex(({ id }) => id === featuredId);
    if (featuredIndex <= 0) return associations;

    const featured = associations[featuredIndex];
    return [
      featured,
      ...associations.slice(0, featuredIndex),
      ...associations.slice(featuredIndex + 1),
    ];
  }

  async findMine(requestingUserId: bigint): Promise<AssociationResponseDto[]> {
    return this.findAdministeredAssociations(requestingUserId);
  }

  async findAdministeredBy(userId: bigint): Promise<AssociationResponseDto[]> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con ID ${userId.toString()} no existe.`,
      );
    }
    return this.findAdministeredAssociations(userId);
  }

  private async findAdministeredAssociations(
    userId: bigint,
  ): Promise<AssociationResponseDto[]> {
    const associations = await this.prisma.associations.findMany({
      where: {
        OR: [
          { owner_user_id: userId },
          {
            association_administrators: {
              some: {
                user_id: userId,
                status: 'active',
                permission_level: {
                  in: ['administrator', 'editor', 'viewer'],
                },
              },
            },
          },
        ],
      },
      orderBy: { id: 'asc' },
      select: associationResponseSelect,
    });

    const uniqueAssociations = [
      ...new Map(
        associations.map((association) => [association.id, association]),
      ).values(),
    ];

    return this.toAssociationResponsesWithTeamCounts(uniqueAssociations);
  }

  private async toAssociationResponsesWithTeamCounts(
    associations: AssociationResponseRecord[],
  ): Promise<AssociationResponseDto[]> {
    if (associations.length === 0) {
      return [];
    }

    const approvedTeams =
      await this.prisma.tournament_team_registrations.groupBy({
        by: ['association_id', 'team_id'],
        where: {
          association_id: { in: associations.map(({ id }) => id) },
          request_status: 'approved',
        },
      });
    const teamCounts = new Map<bigint, number>();

    for (const { association_id } of approvedTeams) {
      teamCounts.set(association_id, (teamCounts.get(association_id) ?? 0) + 1);
    }

    return associations.map((association) =>
      toAssociationResponse(association, teamCounts.get(association.id) ?? 0),
    );
  }

  async findOne(
    id: bigint,
    requestingUserId: bigint,
  ): Promise<AssociationDetailResponseDto> {
    const permissions = await this.getAssociationPermissions(
      this.prisma,
      id,
      requestingUserId,
    );
    const association = await this.prisma.associations.findUnique({
      where: { id },
      select: associationResponseSelect,
    });

    if (!association) {
      throw new NotFoundException(
        `La asociación con ID ${id.toString()} no existe.`,
      );
    }

    const teamCount = await this.countApprovedTeams(id);

    return {
      ...toAssociationResponse(association, teamCount),
      permissions,
    };
  }

  async findAvailableTournaments(
    associationId: bigint,
    requestingUserId: bigint,
    scope: AssociationTournamentScope = 'available',
  ): Promise<AssociationTournamentResponseDto[]> {
    const permissions = await this.getAssociationPermissions(
      this.prisma,
      associationId,
      requestingUserId,
    );

    if (scope === 'management' && !permissions.canManageTournaments) {
      throw new ForbiddenException(
        'No tienes permisos para administrar los torneos de esta asociación.',
      );
    }

    const tournaments = await this.prisma.tournaments.findMany({
      where: {
        association_id: associationId,
        ...(scope === 'available'
          ? {
              status: 'active',
              phase: { in: [...PUBLIC_TOURNAMENT_PHASES] },
            }
          : {}),
      },
      orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
      select: associationTournamentResponseSelect,
    });

    return tournaments.map(toAssociationTournamentResponse);
  }

  async update(
    id: bigint,
    requestingUserId: bigint,
    updateAssociationDto: UpdateAssociationDto,
    images: { logo?: UploadedImageFile; cover?: UploadedImageFile } = {},
  ): Promise<AssociationDetailResponseDto> {
    const initialPermissions = await this.getAssociationPermissions(
      this.prisma,
      id,
      requestingUserId,
    );

    if (!initialPermissions.canEdit) {
      throw new ForbiddenException(
        'Tu permiso de consulta no permite editar esta asociación.',
      );
    }

    if (
      updateAssociationDto.ownerUserId !== undefined &&
      !initialPermissions.canManageOwner
    ) {
      throw new ForbiddenException(
        'Solo SUPER_ADMIN puede cambiar al propietario de una asociación.',
      );
    }

    const ownerUserId =
      updateAssociationDto.ownerUserId === undefined
        ? undefined
        : BigInt(updateAssociationDto.ownerUserId);
    let newLogo: StoredImageAsset | undefined;
    let newCover: StoredImageAsset | undefined;

    try {
      if (images.logo) {
        newLogo = await this.imageStorage.saveAssociationLogo(images.logo);
      }

      if (images.cover) {
        newCover = await this.imageStorage.saveAssociationCover(images.cover);
      }
    } catch (error: unknown) {
      await this.deleteImagesWithoutMaskingError([newLogo, newCover]);
      throw error;
    }

    let previousImages: {
      logoUrl: string | null;
      logoPublicId: string | null;
      coverUrl: string;
      coverPublicId: string | null;
    };

    try {
      previousImages = await this.prisma.$transaction(async (transaction) => {
        const currentPermissions = await this.getAssociationPermissions(
          transaction,
          id,
          requestingUserId,
        );

        if (!currentPermissions.canEdit) {
          throw new ForbiddenException(
            'Tu permiso de consulta no permite editar esta asociación.',
          );
        }

        if (ownerUserId !== undefined && !currentPermissions.canManageOwner) {
          throw new ForbiddenException(
            'Solo SUPER_ADMIN puede cambiar al propietario de una asociación.',
          );
        }

        if (ownerUserId !== undefined) {
          await this.ensureActiveOwner(transaction, ownerUserId);
        }

        const currentAssociation = await transaction.associations.findUnique({
          where: { id },
          select: {
            name: true,
            owner_user_id: true,
            logo_url: true,
            logo_public_id: true,
            cover_url: true,
            cover_public_id: true,
          },
        });

        if (!currentAssociation) {
          throw new NotFoundException(
            `La asociación con ID ${id.toString()} no existe.`,
          );
        }

        await transaction.associations.update({
          where: { id },
          data: {
            name: updateAssociationDto.name,
            description: updateAssociationDto.description,
            city: updateAssociationDto.city,
            address: updateAssociationDto.address,
            tax_id: updateAssociationDto.taxId,
            email: updateAssociationDto.email,
            phone: updateAssociationDto.phone,
            logo_url: newLogo?.url,
            logo_public_id: newLogo?.publicId,
            cover_url: newCover?.url,
            cover_public_id: newCover?.publicId,
            owner_user_id: ownerUserId,
            status: updateAssociationDto.status,
          },
          select: { id: true },
        });

        if (ownerUserId !== undefined) {
          await this.ensureAssociationAdminRole(transaction, ownerUserId);

          if (
            ownerUserId !== currentAssociation.owner_user_id &&
            ownerUserId !== requestingUserId
          ) {
            await transaction.notifications.create({
              data: {
                user_id: ownerUserId,
                type: 'association',
                title: 'Te asignaron una asociación',
                message: `Ahora eres el propietario y administrador principal de ${updateAssociationDto.name?.trim() || currentAssociation.name}.`,
                entity_type: 'association',
                entity_id: id.toString(),
                metadata: {
                  associationId: id.toString(),
                  associationName:
                    updateAssociationDto.name?.trim() ||
                    currentAssociation.name,
                  actionUrl: `/associations/${id.toString()}/tournaments`,
                  actionLabel: 'Ver asociación',
                },
              },
            });
          }

          if (
            ownerUserId !== currentAssociation.owner_user_id &&
            currentAssociation.owner_user_id !== requestingUserId
          ) {
            await transaction.notifications.create({
              data: {
                user_id: currentAssociation.owner_user_id,
                type: 'association',
                title: 'La asociación cambió de propietario',
                message: `Ya no eres el propietario principal de ${updateAssociationDto.name?.trim() || currentAssociation.name}.`,
                entity_type: 'association',
                entity_id: id.toString(),
                metadata: {
                  associationId: id.toString(),
                  associationName:
                    updateAssociationDto.name?.trim() ||
                    currentAssociation.name,
                  actionUrl: '/associations',
                  actionLabel: 'Ver organizaciones',
                },
              },
            });
          }
        }

        return {
          logoUrl: currentAssociation.logo_url,
          logoPublicId: currentAssociation.logo_public_id,
          coverUrl: currentAssociation.cover_url,
          coverPublicId: currentAssociation.cover_public_id,
        };
      });
    } catch (error: unknown) {
      await this.deleteImagesWithoutMaskingError([newLogo, newCover]);
      throw error;
    }

    const retainedImageUrls = new Set(
      [
        newLogo?.url ?? previousImages.logoUrl,
        newCover?.url ?? previousImages.coverUrl,
      ].filter((imageUrl): imageUrl is string => Boolean(imageUrl)),
    );
    const replacedImageCandidates: Array<StoredImageReference | undefined> = [
      newLogo
        ? {
            url: previousImages.logoUrl,
            publicId: previousImages.logoPublicId,
          }
        : undefined,
      newCover
        ? {
            url: previousImages.coverUrl,
            publicId: previousImages.coverPublicId,
          }
        : undefined,
    ];
    const replacedImages = replacedImageCandidates.filter(
      (image): image is StoredImageReference => image !== undefined,
    );

    await this.deleteImagesWithoutMaskingError(
      replacedImages.filter(
        (image) => !image.url || !retainedImageUrls.has(image.url),
      ),
    );

    return this.findOne(id, requestingUserId);
  }

  async remove(id: bigint): Promise<AssociationResponseDto> {
    const [associationRecord, announcements] = await Promise.all([
      this.prisma.associations.findUnique({
        where: { id },
        select: associationResponseSelect,
      }),
      this.prisma.association_announcements.findMany({
        where: { association_id: id },
        select: { image_url: true, image_public_id: true },
      }),
    ]);

    if (!associationRecord) {
      throw new NotFoundException(
        `La asociación con ID ${id.toString()} no existe.`,
      );
    }

    const association = toAssociationResponse(
      associationRecord,
      await this.countApprovedTeams(id),
    );

    await this.prisma.associations.delete({ where: { id } });
    await this.deleteImagesWithoutMaskingError([
      {
        url: associationRecord.logo_url,
        publicId: associationRecord.logo_public_id,
      },
      {
        url: associationRecord.cover_url,
        publicId: associationRecord.cover_public_id,
      },
      ...announcements.map((announcement) => ({
        url: announcement.image_url,
        publicId: announcement.image_public_id,
      })),
    ]);

    return association;
  }

  private async countApprovedTeams(associationId: bigint): Promise<number> {
    const approvedTeams =
      await this.prisma.tournament_team_registrations.groupBy({
        by: ['team_id'],
        where: {
          association_id: associationId,
          request_status: 'approved',
        },
      });

    return approvedTeams.length;
  }

  private async ensureActiveOwner(
    transaction: Prisma.TransactionClient,
    ownerUserId: bigint,
  ): Promise<void> {
    const owner = await transaction.users.findUnique({
      where: { id: ownerUserId },
      select: { status: true },
    });

    if (!owner) {
      throw new NotFoundException('El usuario propietario no existe.');
    }

    if (owner.status !== 'active') {
      throw new BadRequestException(
        'El usuario propietario debe estar activo.',
      );
    }
  }

  private async ensureAssociationAdminRole(
    transaction: Prisma.TransactionClient,
    ownerUserId: bigint,
  ): Promise<void> {
    await transaction.user_roles.upsert({
      where: {
        user_id_role_code: {
          user_id: ownerUserId,
          role_code: 'ASSOCIATION_ADMIN',
        },
      },
      create: {
        user_id: ownerUserId,
        role_code: 'ASSOCIATION_ADMIN',
      },
      update: {},
    });
  }

  private async notifyAssociationAssignmentSafely(
    ownerUserId: bigint,
    associationId: string,
    associationName: string,
  ): Promise<void> {
    try {
      await this.prisma.notifications.create({
        data: {
          user_id: ownerUserId,
          type: 'association',
          title: 'Te asignaron una asociación',
          message: `Ahora eres el propietario y administrador principal de ${associationName}.`,
          entity_type: 'association',
          entity_id: associationId,
          metadata: {
            associationId,
            associationName,
            actionUrl: `/associations/${associationId}/tournaments`,
            actionLabel: 'Ver asociación',
          },
        },
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'error desconocido';
      this.logger.warn(
        `La asociación ${associationId} fue creada, pero no se pudo notificar al propietario ${ownerUserId.toString()}: ${message}`,
      );
    }
  }

  private async assertCanCreateAssociation(
    client: AssociationCreationAuthorizationClient,
    requestingUserId: bigint,
    ownerUserId: bigint,
  ): Promise<void> {
    const liveRoles = await client.user_roles.findMany({
      where: {
        user_id: requestingUserId,
        role_code: { in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] },
      },
      select: { role_code: true },
    });
    const roleCodes = new Set(liveRoles.map(({ role_code }) => role_code));

    if (roleCodes.has('SUPER_ADMIN')) return;

    if (!roleCodes.has('ASSOCIATION_ADMIN')) {
      throw new ForbiddenException(
        'No tienes permisos para registrar una asociación.',
      );
    }
    if (requestingUserId !== ownerUserId) {
      throw new ForbiddenException(
        'Solo puedes registrar una asociación vinculada a tu propia cuenta.',
      );
    }

    const existingAssociation = await client.associations.findFirst({
      where: {
        OR: [
          { owner_user_id: requestingUserId },
          {
            association_administrators: {
              some: {
                user_id: requestingUserId,
                status: 'active',
                permission_level: {
                  in: ['administrator', 'editor', 'viewer'],
                },
              },
            },
          },
        ],
      },
      select: { id: true },
    });

    if (existingAssociation) {
      throw new ForbiddenException(
        'Ya tienes una asociación vinculada y no puedes registrar otra.',
      );
    }
  }

  async getAssociationPermissions(
    client: Prisma.TransactionClient,
    associationId: bigint,
    requestingUserId: bigint,
  ): Promise<AssociationPermissionsResponseDto> {
    const [association, liveRoles] = await Promise.all([
      client.associations.findUnique({
        where: { id: associationId },
        select: {
          owner_user_id: true,
          status: true,
          association_administrators: {
            where: { user_id: requestingUserId, status: 'active' },
            select: { permission_level: true },
          },
        },
      }),
      client.user_roles.findMany({
        where: {
          user_id: requestingUserId,
          role_code: {
            in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'],
          },
        },
        select: { role_code: true },
      }),
    ]);

    if (!association) {
      throw new NotFoundException(
        `La asociación con ID ${associationId.toString()} no existe.`,
      );
    }

    const roleCodes = new Set(liveRoles.map(({ role_code }) => role_code));
    const isSuperAdmin = roleCodes.has('SUPER_ADMIN');
    const isOwner = association.owner_user_id === requestingUserId;

    if (isSuperAdmin) {
      return {
        canEdit: true,
        canManageOwner: true,
        canManageTournaments: true,
        isOwner,
        permissionLevel: 'super_admin',
      };
    }

    if (roleCodes.has('ASSOCIATION_ADMIN') && isOwner) {
      return {
        canEdit: true,
        canManageOwner: false,
        canManageTournaments: true,
        isOwner: true,
        permissionLevel: 'owner',
      };
    }

    const permissionLevel = roleCodes.has('ASSOCIATION_ADMIN')
      ? (association.association_administrators[0]?.permission_level as
          AssociationPermissionLevel | undefined)
      : undefined;

    if (
      permissionLevel &&
      (['administrator', 'editor', 'viewer'] as const).includes(
        permissionLevel as 'administrator' | 'editor' | 'viewer',
      )
    ) {
      return {
        canEdit: permissionLevel !== 'viewer',
        canManageOwner: false,
        canManageTournaments: permissionLevel === 'administrator',
        isOwner: false,
        permissionLevel,
      };
    }

    if (
      (roleCodes.has('ASSOCIATION_ADMIN') ||
        roleCodes.has('PLAYER') ||
        roleCodes.has('REFEREE')) &&
      association.status === 'active'
    ) {
      return {
        canEdit: false,
        canManageOwner: false,
        canManageTournaments: false,
        isOwner: false,
        permissionLevel: 'viewer',
      };
    }

    throw new ForbiddenException('No tienes acceso a esta asociación.');
  }

  private async deleteImagesWithoutMaskingError(
    images: Array<StoredImageReference | null | undefined>,
  ): Promise<void> {
    await Promise.all(
      images.map((image) => this.deleteImageWithoutMaskingError(image)),
    );
  }

  private async deleteImageWithoutMaskingError(
    image: StoredImageReference | null | undefined,
  ): Promise<void> {
    try {
      if (image) await this.imageStorage.delete(image);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      this.logger.error(`No fue posible eliminar la imagen: ${message}`);
    }
  }
}
