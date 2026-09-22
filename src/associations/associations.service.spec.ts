import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { associationResponseSelect } from './association-response.mapper';
import { associationTournamentResponseSelect } from './association-tournament-response.mapper';
import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  const associationsFindMany = jest.fn();
  const associationsFindUnique = jest.fn();
  const associationsFindFirst = jest.fn();
  const tournamentsFindMany = jest.fn();
  const registrationsGroupBy = jest.fn();
  const userRolesFindMany = jest.fn();
  const userRolesFindFirst = jest.fn();
  const transactionUsersFindUnique = jest.fn();
  const transactionAssociationsCreate = jest.fn();
  const transactionAssociationsFindUnique = jest.fn();
  const transactionAssociationsFindFirst = jest.fn();
  const transactionAssociationsUpdate = jest.fn();
  const transactionUserRolesUpsert = jest.fn();
  const transactionUserRolesFindMany = jest.fn();
  const transactionNotificationsCreate = jest.fn();
  const transactionClient = {
    associations: {
      create: transactionAssociationsCreate,
      findFirst: transactionAssociationsFindFirst,
      findUnique: transactionAssociationsFindUnique,
      update: transactionAssociationsUpdate,
    },
    users: { findUnique: transactionUsersFindUnique },
    user_roles: {
      findMany: transactionUserRolesFindMany,
      upsert: transactionUserRolesUpsert,
    },
    notifications: { create: transactionNotificationsCreate },
  };
  const prismaTransaction = jest.fn();
  const prisma = {
    $transaction: prismaTransaction,
    associations: {
      findMany: associationsFindMany,
      findFirst: associationsFindFirst,
      findUnique: associationsFindUnique,
    },
    tournaments: { findMany: tournamentsFindMany },
    tournament_team_registrations: { groupBy: registrationsGroupBy },
    user_roles: {
      findMany: userRolesFindMany,
      findFirst: userRolesFindFirst,
    },
  } as unknown as PrismaService;
  const saveAssociationLogo = jest.fn();
  const saveAssociationCover = jest.fn();
  const deleteByPublicUrl = jest.fn();
  const storedAsset = (url: string) => ({
    url,
    publicId: `public:${url}`,
    assetId: `asset:${url}`,
    format: 'png',
    deliveryType: 'upload' as const,
  });
  const deleteImage = jest.fn(async (image: { url?: string | null }) =>
    deleteByPublicUrl(image.url ?? null),
  );
  const imageStorage = {
    saveAssociationLogo,
    saveAssociationCover,
    delete: deleteImage,
  } as unknown as ImageStorageService;
  const service = new AssociationsService(prisma, imageStorage);

  const associationRecord = {
    id: 5n,
    name: 'Liga Regional',
    description: 'Competencias regionales',
    city: 'Neiva',
    address: 'Carrera 5 # 10-20',
    tax_id: '900123456-7',
    email: 'contacto@liga.test',
    phone: '+573001112233',
    logo_url: 'https://example.com/logo.png',
    cover_url: 'https://example.com/cover.png',
    owner_user_id: 2n,
    status: 'active',
    created_at: new Date('2026-08-20T12:00:00.000Z'),
    updated_at: new Date('2026-08-21T12:00:00.000Z'),
    users: {
      id: 2n,
      full_name: 'Laura Martínez',
      email: 'laura@example.com',
      phone: null,
    },
    association_administrators: [
      { user_id: 2n, permission_level: 'administrator' },
      { user_id: 3n, permission_level: 'editor' },
      { user_id: 3n, permission_level: 'editor' },
    ],
    _count: { tournaments: 4 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    prismaTransaction.mockImplementation(
      (callback: (transaction: typeof transactionClient) => unknown) =>
        callback(transactionClient),
    );
    userRolesFindMany.mockResolvedValue([{ role_code: 'SUPER_ADMIN' }]);
    userRolesFindFirst.mockResolvedValue(null);
    transactionUserRolesFindMany.mockResolvedValue([
      { role_code: 'SUPER_ADMIN' },
    ]);
    transactionAssociationsFindUnique.mockResolvedValue(associationRecord);
    associationsFindFirst.mockResolvedValue(null);
    transactionAssociationsFindFirst.mockResolvedValue(null);
  });

  describe('create', () => {
    const createDto = {
      name: 'Liga Regional',
      description: 'Competencias regionales',
      city: 'Neiva',
      address: 'Carrera 5 # 10-20',
      taxId: '900123456-7',
      email: 'contacto@liga.test',
      phone: '+573001112233',
      ownerUserId: '2',
      status: 'active' as const,
    };
    const logo = {
      buffer: Buffer.from('logo'),
      mimetype: 'image/png',
    };
    const cover = {
      buffer: Buffer.from('cover'),
      mimetype: 'image/png',
    };

    it('crea la asociación y asigna el rol al propietario activo en una transacción', async () => {
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/logo.png'),
      );
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/cover.png'),
      );
      transactionUsersFindUnique.mockResolvedValue({ status: 'active' });
      transactionAssociationsCreate.mockResolvedValue({
        ...associationRecord,
        logo_url: '/uploads/associations/logo.png',
        cover_url: '/uploads/associations/covers/cover.png',
        association_administrators: [],
        _count: { tournaments: 0 },
      });
      transactionUserRolesUpsert.mockResolvedValue({});

      await expect(service.create(createDto, logo, cover, 1n)).resolves.toEqual(
        expect.objectContaining({
          id: '5',
          logoUrl: '/uploads/associations/logo.png',
          coverUrl: '/uploads/associations/covers/cover.png',
          administratorCount: 1,
        }),
      );
      expect(transactionUsersFindUnique).toHaveBeenCalledWith({
        where: { id: 2n },
        select: { status: true },
      });
      expect(transactionAssociationsCreate).toHaveBeenCalledWith({
        data: {
          name: 'Liga Regional',
          description: 'Competencias regionales',
          city: 'Neiva',
          address: 'Carrera 5 # 10-20',
          tax_id: '900123456-7',
          email: 'contacto@liga.test',
          phone: '+573001112233',
          logo_url: '/uploads/associations/logo.png',
          logo_public_id: 'public:/uploads/associations/logo.png',
          cover_url: '/uploads/associations/covers/cover.png',
          cover_public_id: 'public:/uploads/associations/covers/cover.png',
          owner_user_id: 2n,
          status: 'active',
        },
        select: associationResponseSelect,
      });
      expect(transactionUserRolesUpsert).toHaveBeenCalledWith({
        where: {
          user_id_role_code: {
            user_id: 2n,
            role_code: 'ASSOCIATION_ADMIN',
          },
        },
        create: { user_id: 2n, role_code: 'ASSOCIATION_ADMIN' },
        update: {},
      });
      expect(deleteByPublicUrl).not.toHaveBeenCalled();
    });

    it('permite que un administrador sin asociaciones registre una para sí mismo', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      transactionUserRolesFindMany.mockResolvedValue([
        { role_code: 'ASSOCIATION_ADMIN' },
      ]);
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/logo.png'),
      );
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/cover.png'),
      );
      transactionUsersFindUnique.mockResolvedValue({ status: 'active' });
      transactionAssociationsCreate.mockResolvedValue({
        ...associationRecord,
        logo_url: '/uploads/associations/logo.png',
        cover_url: '/uploads/associations/covers/cover.png',
        association_administrators: [],
        _count: { tournaments: 0 },
      });

      await expect(service.create(createDto, logo, cover, 2n)).resolves.toEqual(
        expect.objectContaining({ id: '5' }),
      );

      expect(associationsFindFirst).toHaveBeenCalledTimes(1);
      expect(transactionAssociationsFindFirst).toHaveBeenCalledTimes(1);
    });

    it('impide que un administrador registre otra asociación si ya está vinculado', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindFirst.mockResolvedValue({ id: 8n });

      await expect(service.create(createDto, logo, cover, 2n)).rejects.toThrow(
        new ForbiddenException(
          'Ya tienes una asociación vinculada y no puedes registrar otra.',
        ),
      );
      expect(saveAssociationLogo).not.toHaveBeenCalled();
      expect(prismaTransaction).not.toHaveBeenCalled();
    });

    it('impide que un administrador registre la asociación a nombre de otra persona', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);

      await expect(service.create(createDto, logo, cover, 3n)).rejects.toThrow(
        new ForbiddenException(
          'Solo puedes registrar una asociación vinculada a tu propia cuenta.',
        ),
      );
      expect(saveAssociationLogo).not.toHaveBeenCalled();
      expect(associationsFindFirst).not.toHaveBeenCalled();
    });

    it('rechaza propietarios inactivos y elimina las imágenes guardadas', async () => {
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/logo.png'),
      );
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/cover.png'),
      );
      transactionUsersFindUnique.mockResolvedValue({ status: 'inactive' });

      await expect(service.create(createDto, logo, cover, 1n)).rejects.toThrow(
        new BadRequestException('El usuario propietario debe estar activo.'),
      );
      expect(transactionAssociationsCreate).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/logo.png',
      );
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/covers/cover.png',
      );
    });

    it('elimina ambas imágenes cuando Prisma no completa la transacción', async () => {
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/logo.png'),
      );
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/cover.png'),
      );
      prismaTransaction.mockRejectedValue(new Error('unique constraint'));

      await expect(service.create(createDto, logo, cover, 1n)).rejects.toThrow(
        'unique constraint',
      );
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/logo.png',
      );
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/covers/cover.png',
      );
    });

    it('elimina el logo nuevo si falla el guardado de la portada', async () => {
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/logo.png'),
      );
      saveAssociationCover.mockRejectedValue(new Error('cover inválida'));

      await expect(service.create(createDto, logo, cover, 1n)).rejects.toThrow(
        'cover inválida',
      );
      expect(prismaTransaction).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/logo.png',
      );
    });
  });

  describe('findAll', () => {
    it('devuelve únicamente el contrato público con métricas agregadas', async () => {
      associationsFindMany.mockResolvedValue([associationRecord]);
      registrationsGroupBy.mockResolvedValue([
        { association_id: 5n, team_id: 10n },
        { association_id: 5n, team_id: 11n },
      ]);

      await expect(service.findAll()).resolves.toEqual([
        {
          id: '5',
          name: 'Liga Regional',
          description: 'Competencias regionales',
          city: 'Neiva',
          address: 'Carrera 5 # 10-20',
          taxId: '900123456-7',
          email: 'contacto@liga.test',
          phone: '+573001112233',
          logoUrl: 'https://example.com/logo.png',
          coverUrl: 'https://example.com/cover.png',
          status: 'active',
          owner: {
            id: '2',
            fullName: 'Laura Martínez',
            email: 'laura@example.com',
            phone: null,
          },
          tournamentCount: 4,
          teamCount: 2,
          administratorCount: 2,
          createdAt: '2026-08-20T12:00:00.000Z',
          updatedAt: '2026-08-21T12:00:00.000Z',
        },
      ]);
      expect(associationsFindMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        select: associationResponseSelect,
      });
      expect(registrationsGroupBy).toHaveBeenCalledWith({
        by: ['association_id', 'team_id'],
        where: {
          association_id: { in: [5n] },
          request_status: 'approved',
        },
      });
      expect(associationResponseSelect.users.select).not.toHaveProperty(
        'password_hash',
      );
    });

    it('evita consultar inscripciones cuando no existen asociaciones', async () => {
      associationsFindMany.mockResolvedValue([]);

      await expect(service.findAll()).resolves.toEqual([]);
      expect(registrationsGroupBy).not.toHaveBeenCalled();
    });

    it('muestra a un administrador el listado público de asociaciones activas', async () => {
      associationsFindMany.mockResolvedValue([]);

      await expect(service.findAll(9n)).resolves.toEqual([]);
      expect(associationsFindMany).toHaveBeenCalledWith({
        where: { status: 'active' },
        orderBy: { id: 'asc' },
        select: associationResponseSelect,
      });
    });
  });

  describe('findOne', () => {
    it('cuenta cada equipo aprobado una sola vez', async () => {
      associationsFindUnique.mockResolvedValue(associationRecord);
      registrationsGroupBy.mockResolvedValue([
        { team_id: 10n },
        { team_id: 11n },
        { team_id: 12n },
      ]);

      await expect(service.findOne(5n, 1n)).resolves.toEqual(
        expect.objectContaining({
          id: '5',
          teamCount: 3,
          permissions: {
            canEdit: true,
            canManageOwner: true,
            canManageTournaments: true,
            isOwner: false,
            permissionLevel: 'super_admin',
          },
        }),
      );
      expect(associationsFindUnique).toHaveBeenCalledWith({
        where: { id: 5n },
        select: associationResponseSelect,
      });
      expect(registrationsGroupBy).toHaveBeenCalledWith({
        by: ['team_id'],
        where: {
          association_id: 5n,
          request_status: 'approved',
        },
      });
    });

    it('lanza 404 sin ejecutar agregaciones si la asociación no existe', async () => {
      associationsFindUnique.mockResolvedValue(null);

      await expect(service.findOne(99n, 1n)).rejects.toThrow(
        new NotFoundException('La asociación con ID 99 no existe.'),
      );
      expect(registrationsGroupBy).not.toHaveBeenCalled();
    });

    it('reconoce al propietario con rol vivo como editor sin gestión del propietario', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique
        .mockResolvedValueOnce({
          owner_user_id: 2n,
          association_administrators: [],
        })
        .mockResolvedValueOnce(associationRecord);
      registrationsGroupBy.mockResolvedValue([]);

      await expect(service.findOne(5n, 2n)).resolves.toEqual(
        expect.objectContaining({
          permissions: {
            canEdit: true,
            canManageOwner: false,
            canManageTournaments: true,
            isOwner: true,
            permissionLevel: 'owner',
          },
        }),
      );
    });

    it('permite consultar al viewer pero marca que no puede editar', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique
        .mockResolvedValueOnce({
          owner_user_id: 2n,
          association_administrators: [{ permission_level: 'viewer' }],
        })
        .mockResolvedValueOnce(associationRecord);
      registrationsGroupBy.mockResolvedValue([]);

      const result = await service.findOne(5n, 4n);

      expect(result.permissions.canEdit).toBe(false);
      expect(result.permissions.canManageTournaments).toBe(false);
      expect(result.permissions.permissionLevel).toBe('viewer');
    });

    it('permite consultar sin editar una asociación activa ajena', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique
        .mockResolvedValueOnce({
          owner_user_id: 2n,
          status: 'active',
          association_administrators: [],
        })
        .mockResolvedValueOnce(associationRecord);
      registrationsGroupBy.mockResolvedValue([]);

      const result = await service.findOne(5n, 9n);

      expect(result.permissions).toEqual({
        canEdit: false,
        canManageOwner: false,
        canManageTournaments: false,
        isOwner: false,
        permissionLevel: 'viewer',
      });
    });

    it('rechaza a un ASSOCIATION_ADMIN ajeno a una asociación inactiva', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique.mockResolvedValue({
        owner_user_id: 2n,
        status: 'inactive',
        association_administrators: [],
      });

      await expect(service.findOne(5n, 9n)).rejects.toThrow(
        new ForbiddenException('No tienes acceso a esta asociación.'),
      );
      expect(registrationsGroupBy).not.toHaveBeenCalled();
    });
  });

  describe('findAvailableTournaments', () => {
    const tournamentRecord = {
      id: 19n,
      association_id: 5n,
      name: 'Copa Regional',
      description: 'Torneo abierto de la asociación.',
      sport_type: 'football',
      modality: '11v11',
      start_date: new Date('2026-09-10T00:00:00.000Z'),
      end_date: new Date('2026-11-30T00:00:00.000Z'),
      registration_start_date: new Date('2026-08-01T00:00:00.000Z'),
      registration_end_date: null,
      registration_fee: { toString: () => '150000.50' },
      currency_code: 'COP',
      grand_prize: { toString: () => '5000000' },
      second_prize: { toString: () => '2500000' },
      third_prize: { toString: () => '1000000' },
      max_teams: 16,
      min_players_per_team: 7,
      max_players_per_team: 25,
      location_name: 'Estadio Municipal',
      location_address: 'Carrera 5 # 10-20',
      rules_url: 'https://example.com/rules.pdf',
      photo_url: 'https://example.com/tournament.png',
      phase: 'registration',
      status: 'active',
      created_at: new Date('2026-08-20T12:00:00.000Z'),
      updated_at: new Date('2026-08-21T12:00:00.000Z'),
      tournament_types: {
        id: 3n,
        name: 'Eliminación directa',
        description: 'Competencia por llaves.',
        min_players_per_team: 7,
        max_players_per_team: 25,
        instructions: 'El perdedor queda eliminado.',
      },
      tournament_sponsors: [],
      rules_content: null,
      _count: { tournament_team_registrations: 7 },
    };

    it('filtra, ordena y serializa el contrato público de torneos disponibles', async () => {
      associationsFindUnique.mockResolvedValue({ id: 5n });
      tournamentsFindMany.mockResolvedValue([tournamentRecord]);

      await expect(service.findAvailableTournaments(5n, 1n)).resolves.toEqual([
        {
          id: '19',
          associationId: '5',
          name: 'Copa Regional',
          description: 'Torneo abierto de la asociación.',
          tournamentType: {
            id: '3',
            name: 'Eliminación directa',
            description: 'Competencia por llaves.',
            minPlayersPerTeam: 7,
            maxPlayersPerTeam: 25,
            instructions: 'El perdedor queda eliminado.',
          },
          sportType: 'football',
          modality: '11v11',
          startDate: '2026-09-10',
          endDate: '2026-11-30',
          registrationStartDate: '2026-08-01',
          registrationEndDate: null,
          registrationFee: '150000.50',
          currencyCode: 'COP',
          grandPrize: '5000000',
          secondPrize: '2500000',
          thirdPrize: '1000000',
          maxTeams: 16,
          minPlayersPerTeam: 7,
          maxPlayersPerTeam: 25,
          registeredTeamCount: 7,
          locationName: 'Estadio Municipal',
          locationAddress: 'Carrera 5 # 10-20',
          rulesUrl: 'https://example.com/rules.pdf',
          rulesContent: null,
          photoUrl: 'https://example.com/tournament.png',
          sponsors: [],
          phase: 'registration',
          status: 'active',
          createdAt: '2026-08-20T12:00:00.000Z',
          updatedAt: '2026-08-21T12:00:00.000Z',
        },
      ]);
      expect(userRolesFindMany).toHaveBeenCalledWith({
        where: {
          user_id: 1n,
          role_code: {
            in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'],
          },
        },
        select: { role_code: true },
      });
      expect(tournamentsFindMany).toHaveBeenCalledWith({
        where: {
          association_id: 5n,
          status: 'active',
          phase: {
            in: ['registration', 'validation', 'scheduled', 'in_progress', 'finished'],
          },
        },
        orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
        select: associationTournamentResponseSelect,
      });
      expect(
        associationTournamentResponseSelect._count.select
          .tournament_team_registrations.where,
      ).toEqual({ request_status: 'approved' });
    });

    it('devuelve una lista vacía cuando la asociación no tiene torneos disponibles', async () => {
      associationsFindUnique.mockResolvedValue({ id: 5n });
      tournamentsFindMany.mockResolvedValue([]);

      await expect(service.findAvailableTournaments(5n, 1n)).resolves.toEqual(
        [],
      );
    });

    it('incluye todos los estados en el alcance de gestión para usuarios autorizados', async () => {
      associationsFindUnique.mockResolvedValue({ id: 5n });
      tournamentsFindMany.mockResolvedValue([tournamentRecord]);

      await expect(
        service.findAvailableTournaments(5n, 1n, 'management'),
      ).resolves.toHaveLength(1);
      expect(tournamentsFindMany).toHaveBeenCalledWith({
        where: { association_id: 5n },
        orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
        select: associationTournamentResponseSelect,
      });
    });

    it('rechaza el alcance de gestión para un viewer activo', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique.mockResolvedValue({
        owner_user_id: 2n,
        association_administrators: [{ permission_level: 'viewer' }],
      });

      await expect(
        service.findAvailableTournaments(5n, 4n, 'management'),
      ).rejects.toThrow(
        new ForbiddenException(
          'No tienes permisos para administrar los torneos de esta asociación.',
        ),
      );
      expect(tournamentsFindMany).not.toHaveBeenCalled();
    });

    it('lanza 404 y no consulta torneos cuando la asociación no existe', async () => {
      associationsFindUnique.mockResolvedValue(null);

      await expect(service.findAvailableTournaments(99n, 1n)).rejects.toThrow(
        new NotFoundException('La asociación con ID 99 no existe.'),
      );
      expect(tournamentsFindMany).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('valida al nuevo propietario y le asigna ASSOCIATION_ADMIN en la transacción', async () => {
      transactionUsersFindUnique.mockResolvedValue({ status: 'active' });
      transactionAssociationsUpdate.mockResolvedValue({ id: 5n });
      transactionUserRolesUpsert.mockResolvedValue({});
      associationsFindUnique.mockResolvedValue({
        ...associationRecord,
        owner_user_id: 4n,
        users: {
          id: 4n,
          full_name: 'Nuevo Propietario',
          email: 'owner@example.com',
          phone: null,
        },
      });
      registrationsGroupBy.mockResolvedValue([]);

      const result = await service.update(5n, 1n, { ownerUserId: '4' });

      expect(result.id).toBe('5');
      expect(result.owner.id).toBe('4');
      expect(transactionUsersFindUnique).toHaveBeenCalledWith({
        where: { id: 4n },
        select: { status: true },
      });
      expect(transactionAssociationsUpdate).toHaveBeenCalledWith({
        where: { id: 5n },
        data: {
          name: undefined,
          description: undefined,
          city: undefined,
          address: undefined,
          tax_id: undefined,
          email: undefined,
          phone: undefined,
          logo_url: undefined,
          cover_url: undefined,
          owner_user_id: 4n,
          status: undefined,
        },
        select: { id: true },
      });
      expect(transactionUserRolesUpsert).toHaveBeenCalledWith({
        where: {
          user_id_role_code: {
            user_id: 4n,
            role_code: 'ASSOCIATION_ADMIN',
          },
        },
        create: { user_id: 4n, role_code: 'ASSOCIATION_ADMIN' },
        update: {},
      });
    });

    it('rechaza un cambio a propietario inactivo antes de actualizar', async () => {
      transactionUsersFindUnique.mockResolvedValue({ status: 'inactive' });

      await expect(
        service.update(5n, 1n, { ownerUserId: '4' }),
      ).rejects.toThrow(
        new BadRequestException('El usuario propietario debe estar activo.'),
      );
      expect(transactionAssociationsUpdate).not.toHaveBeenCalled();
      expect(transactionUserRolesUpsert).not.toHaveBeenCalled();
    });

    it('no consulta propietario ni asigna rol cuando no se cambia', async () => {
      transactionAssociationsUpdate.mockResolvedValue({ id: 5n });
      associationsFindUnique.mockResolvedValue({
        ...associationRecord,
        name: 'Liga actualizada',
      });
      registrationsGroupBy.mockResolvedValue([]);

      await expect(
        service.update(5n, 1n, { name: 'Liga actualizada' }),
      ).resolves.toEqual(expect.objectContaining({ name: 'Liga actualizada' }));
      expect(transactionUsersFindUnique).not.toHaveBeenCalled();
      expect(transactionUserRolesUpsert).not.toHaveBeenCalled();
    });

    it('permite a un editor reemplazar la portada y elimina la anterior tras el commit', async () => {
      const editorAccess = {
        owner_user_id: 2n,
        association_administrators: [{ permission_level: 'editor' }],
      };
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      transactionUserRolesFindMany.mockResolvedValue([
        { role_code: 'ASSOCIATION_ADMIN' },
      ]);
      associationsFindUnique
        .mockResolvedValueOnce(editorAccess)
        .mockResolvedValueOnce(editorAccess)
        .mockResolvedValueOnce({
          ...associationRecord,
          cover_url: '/uploads/associations/covers/new-cover.png',
        });
      transactionAssociationsFindUnique
        .mockResolvedValueOnce(editorAccess)
        .mockResolvedValueOnce({
          logo_url: '/uploads/associations/old-logo.png',
          cover_url: '/uploads/associations/covers/old-cover.png',
        });
      transactionAssociationsUpdate.mockResolvedValue({ id: 5n });
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/new-cover.png'),
      );
      registrationsGroupBy.mockResolvedValue([]);

      const result = await service.update(
        5n,
        3n,
        { name: 'Liga editada' },
        { cover: { buffer: Buffer.from('cover'), mimetype: 'image/png' } },
      );

      expect(result.coverUrl).toBe(
        '/uploads/associations/covers/new-cover.png',
      );
      expect(result.permissions.permissionLevel).toBe('editor');
      // Jest conserva los argumentos de mocks sin un contrato Prisma inferible.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const updateArgument = transactionAssociationsUpdate.mock.calls[0][0] as {
        data: { name?: string; cover_url?: string };
      };
      expect(updateArgument.data).toEqual(
        expect.objectContaining({
          name: 'Liga editada',
          cover_url: '/uploads/associations/covers/new-cover.png',
        }),
      );
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/covers/old-cover.png',
      );
      expect(deleteByPublicUrl).not.toHaveBeenCalledWith(
        '/uploads/associations/covers/new-cover.png',
      );
    });

    it('conserva una imagen migrada compartida si solo reemplaza la portada', async () => {
      const sharedLegacyUrl = '/uploads/associations/shared-legacy.png';
      const newCoverUrl = '/uploads/associations/covers/new-cover.png';

      associationsFindUnique
        .mockResolvedValueOnce(associationRecord)
        .mockResolvedValueOnce(associationRecord)
        .mockResolvedValueOnce({
          ...associationRecord,
          logo_url: sharedLegacyUrl,
          cover_url: newCoverUrl,
        });
      transactionAssociationsFindUnique
        .mockResolvedValueOnce(associationRecord)
        .mockResolvedValueOnce({
          logo_url: sharedLegacyUrl,
          cover_url: sharedLegacyUrl,
        });
      transactionAssociationsUpdate.mockResolvedValue({ id: 5n });
      saveAssociationCover.mockResolvedValue(storedAsset(newCoverUrl));
      registrationsGroupBy.mockResolvedValue([]);

      const result = await service.update(
        5n,
        1n,
        {},
        { cover: { buffer: Buffer.from('cover'), mimetype: 'image/png' } },
      );

      expect(result.logoUrl).toBe(sharedLegacyUrl);
      expect(result.coverUrl).toBe(newCoverUrl);
      expect(deleteByPublicUrl).not.toHaveBeenCalledWith(sharedLegacyUrl);
      expect(deleteByPublicUrl).not.toHaveBeenCalledWith(newCoverUrl);
    });

    it('rechaza PATCH a viewers y administradores ajenos', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique.mockResolvedValueOnce({
        owner_user_id: 2n,
        association_administrators: [{ permission_level: 'viewer' }],
      });

      await expect(
        service.update(5n, 4n, { name: 'No permitido' }),
      ).rejects.toThrow(ForbiddenException);

      associationsFindUnique.mockResolvedValueOnce({
        owner_user_id: 2n,
        association_administrators: [],
      });

      await expect(
        service.update(5n, 9n, { name: 'No permitido' }),
      ).rejects.toThrow(ForbiddenException);
      expect(transactionAssociationsUpdate).not.toHaveBeenCalled();
    });

    it('impide al propietario transferir la asociación', async () => {
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);
      associationsFindUnique.mockResolvedValue({
        owner_user_id: 2n,
        association_administrators: [],
      });

      await expect(
        service.update(5n, 2n, { ownerUserId: '4' }),
      ).rejects.toThrow(
        new ForbiddenException(
          'Solo SUPER_ADMIN puede cambiar al propietario de una asociación.',
        ),
      );
    });

    it('elimina las imágenes nuevas si la transacción de actualización falla', async () => {
      associationsFindUnique.mockResolvedValue(associationRecord);
      saveAssociationLogo.mockResolvedValue(
        storedAsset('/uploads/associations/new-logo.png'),
      );
      saveAssociationCover.mockResolvedValue(
        storedAsset('/uploads/associations/covers/new-cover.png'),
      );
      prismaTransaction.mockRejectedValue(new Error('rollback'));

      await expect(
        service.update(
          5n,
          1n,
          {},
          {
            logo: { buffer: Buffer.from('logo'), mimetype: 'image/png' },
            cover: { buffer: Buffer.from('cover'), mimetype: 'image/png' },
          },
        ),
      ).rejects.toThrow('rollback');
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/new-logo.png',
      );
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/associations/covers/new-cover.png',
      );
    });
  });
});
