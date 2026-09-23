import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type {
  StoredImageAsset,
  UploadedImageFile,
} from '../uploads/image-storage.types';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAdministratorsQueryDto } from './dto/list-administrators-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PublicUserResponseDto } from './dto/public-user-response.dto';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { IdentityVerificationService } from './identity-verification.service';
import { publicUserSelect, toPublicUserResponse } from './public-user.mapper';

export type RegisterPlayerFiles = {
  photo: UploadedImageFile;
  documentFront: UploadedImageFile;
  documentBack: UploadedImageFile;
};

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Superadministrador',
  ASSOCIATION_ADMIN: 'Administrador de asociación',
  REFEREE: 'Árbitro',
  PLAYER: 'Jugador',
};

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
    private readonly identityVerification: IdentityVerificationService,
  ) {}

  async registerPlayer(
    dto: RegisterPlayerDto,
    files: RegisterPlayerFiles,
  ): Promise<PublicUserResponseDto> {
    this.assertValidBirthDate(dto.birthDate);
    this.assertDeclaredAgeMatchesBirthDate(dto.birthDate, dto.age);
    await this.assertUserIdentifiersAreAvailable(dto.idNumber, dto.email);

    // El OCR informa, no bloquea: una foto difícil no debe impedir el registro.
    // Lo que no queda confirmado se guarda para revisión de un administrador.
    const identityCheck = await this.identityVerification.verify(
      files.documentFront,
      files.documentBack,
      dto.idNumber,
      dto.birthDate,
    );
    if (!identityCheck.verified) {
      this.logger.warn(
        `Documento sin confirmar para la cédula ${dto.idNumber}: ` +
          `${identityCheck.outcome} (${JSON.stringify(identityCheck.details)})`,
      );
    }

    let photoAsset: StoredImageAsset | null = null;
    let documentFrontAsset: StoredImageAsset | null = null;
    let documentBackAsset: StoredImageAsset | null = null;
    try {
      photoAsset = await this.imageStorage.saveUserPhoto(files.photo);
      documentFrontAsset = await this.imageStorage.saveIdentityDocument(
        files.documentFront,
        'front',
      );
      documentBackAsset = await this.imageStorage.saveIdentityDocument(
        files.documentBack,
        'back',
      );
      const persistedPhoto = photoAsset;
      const persistedDocumentFront = documentFrontAsset;
      const persistedDocumentBack = documentBackAsset;

      const user = await this.prisma.$transaction(async (transaction) => {
        const created = await transaction.users.create({
          data: {
            id_number: dto.idNumber,
            document_type: 'CC',
            full_name: dto.fullName,
            birth_date: new Date(dto.birthDate),
            birth_city: dto.birthCity,
            gender: dto.gender,
            email: dto.email,
            phone: dto.phone || null,
            photo_url: persistedPhoto.url,
            photo_public_id: persistedPhoto.publicId,
            document_front_url: persistedDocumentFront.url,
            document_front_public_id: persistedDocumentFront.publicId,
            document_front_format: persistedDocumentFront.format,
            document_back_url: persistedDocumentBack.url,
            document_back_public_id: persistedDocumentBack.publicId,
            document_back_format: persistedDocumentBack.format,
            identity_verified_at: identityCheck.verified ? new Date() : null,
            identity_verification_status: identityCheck.verified
              ? 'verified'
              : 'pending_review',
            identity_verification_details:
              identityCheck.details as unknown as Prisma.InputJsonValue,
            identity_verification_checked_at: new Date(),
            password_hash: await hash(dto.password, 12),
            status: 'active',
          },
          select: { id: true },
        });
        await transaction.user_roles.create({
          data: { user_id: created.id, role_code: 'PLAYER' },
        });
        return this.findUserInTransaction(transaction, created.id);
      });

      return toPublicUserResponse(user);
    } catch (error) {
      await Promise.all([
        this.imageStorage.deleteSafely(photoAsset ?? {}),
        this.imageStorage.deleteSafely(documentFrontAsset ?? {}),
        this.imageStorage.deleteSafely(documentBackAsset ?? {}),
      ]);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        await this.assertUserIdentifiersAreAvailable(dto.idNumber, dto.email);
        throw new ConflictException(
          'Ya existe una cuenta con ese documento o correo electrónico.',
        );
      }
      throw error;
    }
  }

  /**
   * La edad es un campo aparte del formulario; si contradice la fecha escrita,
   * el error está en el formulario y no en la foto, así que sí se rechaza.
   */
  private assertDeclaredAgeMatchesBirthDate(
    birthDate: string,
    declaredAge: number,
  ): void {
    const [year, month, day] = birthDate.split('-').map(Number);
    const today = new Date();
    let expectedAge = today.getFullYear() - year;
    if (
      today.getMonth() + 1 < month ||
      (today.getMonth() + 1 === month && today.getDate() < day)
    ) {
      expectedAge -= 1;
    }
    if (expectedAge !== declaredAge) {
      throw new BadRequestException(
        `La edad indicada no coincide con la fecha de nacimiento. Para esa fecha la edad actual es ${expectedAge} años.`,
      );
    }
  }

  private async assertUserIdentifiersAreAvailable(
    idNumber: string,
    email: string,
  ): Promise<void> {
    const [documentOwner, emailOwner] = await Promise.all([
      this.prisma.users.findUnique({
        where: { id_number: idNumber },
        select: { id: true },
      }),
      this.prisma.users.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
        select: { id: true },
      }),
    ]);

    if (documentOwner && emailOwner) {
      throw new ConflictException(
        'Ya existe una cuenta con ese número de identidad y ese correo electrónico.',
      );
    }
    if (documentOwner) {
      throw new ConflictException(
        'Ya existe una cuenta con ese número de identidad.',
      );
    }
    if (emailOwner) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.usersUncheckedCreateInput = {
      id_number: createUserDto.idNumber,
      document_type: createUserDto.documentType,
      full_name: createUserDto.fullName,
      birth_date: new Date(createUserDto.birthDate),
      gender: createUserDto.gender,
      email: createUserDto.email,
      phone: createUserDto.phone,
      password_hash: await hash(createUserDto.password, 12),
      status: createUserDto.status,
    };

    return this.prisma.users.create({
      data,
      omit: { password_hash: true },
    });
  }

  async findAll(): Promise<PublicUserResponseDto[]> {
    const users = await this.prisma.users.findMany({
      orderBy: { id: 'asc' },
      select: publicUserSelect,
    });

    return users.map(toPublicUserResponse);
  }

  async findAdministrators(query: ListAdministratorsQueryDto) {
    const administratorRoles = ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'];
    const adminRoleWhere: Prisma.user_rolesWhereInput = query.role
      ? { role_code: query.role }
      : { role_code: { in: administratorRoles } };
    const where: Prisma.usersWhereInput = {
      status: query.status,
      user_roles: { some: adminRoleWhere },
      ...(query.search
        ? {
            OR: [
              {
                full_name: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                email: { contains: query.search, mode: 'insensitive' as const },
              },
              {
                id_number: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                phone: { contains: query.search, mode: 'insensitive' as const },
              },
            ],
          }
        : {}),
    };
    const allAdministratorsWhere: Prisma.usersWhereInput = {
      user_roles: { some: { role_code: { in: administratorRoles } } },
    };
    const skip = (query.page - 1) * query.pageSize;

    const [
      users,
      total,
      administratorsTotal,
      active,
      superAdmins,
      associationAdmins,
    ] = await this.prisma.$transaction([
      this.prisma.users.findMany({
        where,
        skip,
        take: query.pageSize,
        orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
        select: {
          id: true,
          id_number: true,
          document_type: true,
          full_name: true,
          birth_date: true,
          birth_city: true,
          email: true,
          phone: true,
          photo_url: true,
          status: true,
          created_at: true,
          updated_at: true,
          user_roles: {
            orderBy: { role_code: 'asc' },
            select: { role_code: true },
          },
          associations: { select: { id: true, name: true } },
          association_administrators: {
            where: { status: 'active' },
            select: {
              permission_level: true,
              associations: { select: { id: true, name: true } },
            },
          },
        },
      }),
      this.prisma.users.count({ where }),
      this.prisma.users.count({ where: allAdministratorsWhere }),
      this.prisma.users.count({
        where: { ...allAdministratorsWhere, status: 'active' },
      }),
      this.prisma.users.count({
        where: { user_roles: { some: { role_code: 'SUPER_ADMIN' } } },
      }),
      this.prisma.users.count({
        where: { user_roles: { some: { role_code: 'ASSOCIATION_ADMIN' } } },
      }),
    ]);

    return {
      items: users.map((user) => {
        const associations = new Map<
          string,
          { id: string; name: string; permissionLevel: string }
        >();
        if (user.associations) {
          associations.set(user.associations.id.toString(), {
            id: user.associations.id.toString(),
            name: user.associations.name,
            permissionLevel: 'owner',
          });
        }
        for (const assignment of user.association_administrators) {
          associations.set(assignment.associations.id.toString(), {
            id: assignment.associations.id.toString(),
            name: assignment.associations.name,
            permissionLevel: assignment.permission_level,
          });
        }

        return {
          id: user.id.toString(),
          idNumber: user.id_number,
          documentType: user.document_type,
          fullName: user.full_name,
          birthDate: user.birth_date.toISOString().slice(0, 10),
          birthCity: user.birth_city,
          email: user.email,
          phone: user.phone,
          photoUrl: user.photo_url,
          status: user.status,
          roles: user.user_roles.map(({ role_code }) => role_code),
          associations: [...associations.values()],
          createdAt: user.created_at.toISOString(),
          updatedAt: user.updated_at.toISOString(),
        };
      }),
      metrics: {
        total: administratorsTotal,
        active,
        superAdmins,
        associationAdmins,
      },
      page: query.page,
      pageSize: query.pageSize,
      total,
      hasNextPage: skip + users.length < total,
    };
  }

  async findOne(id: bigint): Promise<PublicUserResponseDto> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: publicUserSelect,
    });

    if (!user) {
      throw new NotFoundException(
        `El usuario con ID ${id.toString()} no existe.`,
      );
    }

    return toPublicUserResponse(user);
  }

  async findVisibleProfile(
    id: bigint,
    requestingUserId: bigint,
  ): Promise<PublicUserResponseDto> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: publicUserSelect,
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con ID ${id.toString()} no existe.`,
      );
    }

    await this.assertCanAccessProfile(
      requestingUserId,
      id,
      user.user_roles.map(({ role_code }) => role_code),
    );
    return toPublicUserResponse(user);
  }

  async updateProfile(
    id: bigint,
    requestingUserId: bigint,
    dto: UpdateUserProfileDto,
    photo?: UploadedImageFile,
  ): Promise<PublicUserResponseDto> {
    const current = await this.prisma.users.findUnique({
      where: { id },
      select: publicUserSelect,
    });
    if (!current) {
      throw new NotFoundException(
        `El usuario con ID ${id.toString()} no existe.`,
      );
    }

    const requesterRoles = await this.assertCanAccessProfile(
      requestingUserId,
      id,
      current.user_roles.map(({ role_code }) => role_code),
    );
    const isSuperAdmin = requesterRoles.has('SUPER_ADMIN');
    if (dto.roles !== undefined && !isSuperAdmin) {
      throw new ForbiddenException(
        'Solamente un superadministrador puede modificar los roles.',
      );
    }
    if (dto.birthDate) this.assertValidBirthDate(dto.birthDate);
    if (dto.roles) await this.assertRoleChangeIsValid(id, dto.roles);
    const previousRoles = current.user_roles.map(({ role_code }) => role_code);
    const nextRoles = dto.roles ? [...new Set(dto.roles)] : previousRoles;
    const addedRoles = nextRoles.filter(
      (role) => !previousRoles.includes(role),
    );
    const removedRoles = previousRoles.filter(
      (role) => !nextRoles.includes(role),
    );
    const rolesChanged = addedRoles.length > 0 || removedRoles.length > 0;

    const uploadedPhoto = photo
      ? await this.imageStorage.saveUserPhoto(photo)
      : null;
    const photoUrl = uploadedPhoto?.url ?? current.photo_url;
    let updated: Awaited<ReturnType<typeof this.findUserInTransaction>>;
    try {
      updated = await this.prisma.$transaction(async (transaction) => {
        await transaction.users.update({
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
        });
        if (dto.roles) {
          await transaction.user_roles.deleteMany({ where: { user_id: id } });
          await transaction.user_roles.createMany({
            data: dto.roles.map((roleCode) => ({
              user_id: id,
              role_code: roleCode,
            })),
          });
        }
        if (rolesChanged && id !== requestingUserId) {
          const changes = [
            addedRoles.length > 0
              ? `Roles agregados: ${addedRoles.map((role) => ROLE_LABELS[role] ?? role).join(', ')}.`
              : null,
            removedRoles.length > 0
              ? `Roles retirados: ${removedRoles.map((role) => ROLE_LABELS[role] ?? role).join(', ')}.`
              : null,
          ]
            .filter((value): value is string => Boolean(value))
            .join(' ');
          await transaction.notifications.create({
            data: {
              user_id: id,
              type: 'account',
              title: 'Tus roles fueron actualizados',
              message: changes,
              entity_type: 'user_roles',
              entity_id: id.toString(),
              metadata: {
                addedRoles,
                removedRoles,
                actionUrl: '/profile',
                actionLabel: 'Ver mi perfil',
              },
            },
          });
        }
        return this.findUserInTransaction(transaction, id);
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
    return toPublicUserResponse(updated);
  }

  async update(id: bigint, updateUserDto: UpdateUserDto) {
    const data: Prisma.usersUncheckedUpdateInput = {
      id_number: updateUserDto.idNumber,
      document_type: updateUserDto.documentType,
      full_name: updateUserDto.fullName,
      birth_date: updateUserDto.birthDate
        ? new Date(updateUserDto.birthDate)
        : undefined,
      gender: updateUserDto.gender,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      status: updateUserDto.status,
    };

    if (updateUserDto.password !== undefined) {
      data.password_hash = await hash(updateUserDto.password, 12);
    }

    const shouldRevokeSessions =
      updateUserDto.password !== undefined ||
      (updateUserDto.status !== undefined && updateUserDto.status !== 'active');

    return this.prisma.$transaction(async (transaction) => {
      const user = await transaction.users.update({
        where: { id },
        data,
        omit: { password_hash: true },
      });

      if (shouldRevokeSessions) {
        await transaction.auth_sessions.updateMany({
          where: { user_id: id, revoked_at: null },
          data: { revoked_at: new Date() },
        });
      }

      return user;
    });
  }

  async getIdentityDocumentDownload(
    id: bigint,
    requestingUserId: bigint,
    side: 'front' | 'back',
  ) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        document_front_public_id: true,
        document_front_format: true,
        document_back_public_id: true,
        document_back_format: true,
        user_roles: { select: { role_code: true } },
      },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con ID ${id.toString()} no existe.`,
      );
    }
    const requesterRoles = await this.assertCanAccessProfile(
      requestingUserId,
      id,
      user.user_roles.map(({ role_code }) => role_code),
    );
    if (!requesterRoles.has('SUPER_ADMIN')) {
      throw new ForbiddenException(
        'Solamente un superadministrador puede consultar el documento de identidad.',
      );
    }

    const publicId =
      side === 'front'
        ? user.document_front_public_id
        : user.document_back_public_id;
    const format =
      side === 'front' ? user.document_front_format : user.document_back_format;
    if (!publicId || !format) {
      throw new NotFoundException(
        'El documento solicitado no está disponible en el almacenamiento seguro.',
      );
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    return {
      url: this.imageStorage.createIdentityDocumentDownloadUrl(
        publicId,
        format,
        300,
      ),
      expiresAt: expiresAt.toISOString(),
    };
  }

  async remove(id: bigint) {
    const current = await this.prisma.users.findUnique({
      where: { id },
      select: {
        photo_url: true,
        photo_public_id: true,
        document_front_url: true,
        document_front_public_id: true,
        document_back_url: true,
        document_back_public_id: true,
      },
    });
    if (!current) {
      throw new NotFoundException(
        `El usuario con ID ${id.toString()} no existe.`,
      );
    }
    const removed = await this.prisma.users.delete({
      where: { id },
      omit: { password_hash: true },
    });
    const assets = [
      { url: current.photo_url, publicId: current.photo_public_id },
      {
        url: current.document_front_url,
        publicId: current.document_front_public_id,
        deliveryType: 'authenticated' as const,
      },
      {
        url: current.document_back_url,
        publicId: current.document_back_public_id,
        deliveryType: 'authenticated' as const,
      },
    ];
    for (const asset of assets) {
      try {
        await this.imageStorage.delete(asset);
      } catch (error: unknown) {
        this.logger.error(
          `No fue posible limpiar un recurso del usuario ${id.toString()}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
    return removed;
  }

  private async assertCanAccessProfile(
    requestingUserId: bigint,
    targetUserId: bigint,
    targetRoles: readonly string[],
  ): Promise<Set<string>> {
    const requesterRoles = new Set(
      (
        await this.prisma.user_roles.findMany({
          where: { user_id: requestingUserId },
          select: { role_code: true },
        })
      ).map(({ role_code }) => role_code),
    );
    if (
      requestingUserId === targetUserId ||
      requesterRoles.has('SUPER_ADMIN')
    ) {
      return requesterRoles;
    }
    if (
      requesterRoles.has('ASSOCIATION_ADMIN') &&
      (targetRoles.includes('PLAYER') || targetRoles.includes('REFEREE'))
    ) {
      return requesterRoles;
    }
    throw new ForbiddenException(
      'No tienes permisos para consultar o editar este perfil.',
    );
  }

  private async assertRoleChangeIsValid(id: bigint, roles: readonly string[]) {
    const existingRoleCount = await this.prisma.roles.count({
      where: { code: { in: [...roles] } },
    });
    if (existingRoleCount !== roles.length) {
      throw new BadRequestException(
        'Uno o más roles seleccionados no existen.',
      );
    }

    const removesSuperAdmin =
      !roles.includes('SUPER_ADMIN') &&
      Boolean(
        await this.prisma.user_roles.findUnique({
          where: {
            user_id_role_code: { user_id: id, role_code: 'SUPER_ADMIN' },
          },
        }),
      );
    if (!removesSuperAdmin) return;

    const otherSuperAdmins = await this.prisma.user_roles.count({
      where: { role_code: 'SUPER_ADMIN', user_id: { not: id } },
    });
    if (otherSuperAdmins === 0) {
      throw new BadRequestException(
        'No puedes retirar el rol al último superadministrador de la plataforma.',
      );
    }
  }

  private findUserInTransaction(
    transaction: Prisma.TransactionClient,
    id: bigint,
  ) {
    return transaction.users.findUniqueOrThrow({
      where: { id },
      select: publicUserSelect,
    });
  }

  private assertValidBirthDate(value: string) {
    if (new Date(value) > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede estar en el futuro.',
      );
    }
  }
}
