import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AssociationsService } from '../associations/associations.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import type { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentsService } from './tournaments.service';

jest.mock('sanitize-html', () => ({
  __esModule: true,
  default: (value: string) => value,
}));

describe('TournamentsService', () => {
  const prismaTransaction = jest.fn();
  const tournamentsFindUnique = jest.fn();
  const tournamentsFindFirst = jest.fn();
  const associationsFindFirst = jest.fn();
  const teamsFindFirst = jest.fn();
  const sponsorsFindFirst = jest.fn();

  const transactionTournamentTypeFindUnique = jest.fn();
  const transactionTournamentCreate = jest.fn();
  const transactionTournamentFindUnique = jest.fn();
  const transactionTournamentUpdate = jest.fn();
  const transactionTournamentDelete = jest.fn();
  const transactionRegistrationCount = jest.fn();
  const transactionTournamentSponsorsDeleteMany = jest.fn();

  const transactionClient = {
    tournament_types: { findUnique: transactionTournamentTypeFindUnique },
    tournaments: {
      create: transactionTournamentCreate,
      findUnique: transactionTournamentFindUnique,
      update: transactionTournamentUpdate,
      delete: transactionTournamentDelete,
    },
    tournament_team_registrations: {
      count: transactionRegistrationCount,
    },
    tournament_sponsors: {
      deleteMany: transactionTournamentSponsorsDeleteMany,
    },
  };

  const prisma = {
    $transaction: prismaTransaction,
    tournaments: {
      findUnique: tournamentsFindUnique,
      findFirst: tournamentsFindFirst,
    },
    associations: { findFirst: associationsFindFirst },
    teams: { findFirst: teamsFindFirst },
    sponsors: { findFirst: sponsorsFindFirst },
  } as unknown as PrismaService;

  const getAssociationPermissions = jest.fn();
  const associationsService = {
    getAssociationPermissions,
  } as unknown as AssociationsService;

  const saveTournamentPhoto = jest.fn();
  const deleteByPublicUrl = jest.fn();
  const storedAsset = (url: string) => ({
    url,
    publicId: `public:${url}`,
    assetId: `asset:${url}`,
    format: 'png',
    deliveryType: 'upload' as const,
  });
  const deleteImage = jest.fn(
    async (image: { url?: string | null }) =>
      deleteByPublicUrl(image.url ?? null),
  );
  const imageStorage = {
    saveTournamentPhoto,
    delete: deleteImage,
  } as unknown as ImageStorageService;

  const associationId = 14n;
  const tournamentId = 31n;
  const requestingUserId = 8n;

  const managerPermissions = {
    canEdit: true,
    canManageOwner: false,
    canManageTournaments: true,
    isOwner: false,
    permissionLevel: 'administrator',
  };

  const tournamentRecord = {
    id: tournamentId,
    association_id: associationId,
    name: 'Copa Regional 2026',
    description: 'Torneo de prueba',
    sport_type: 'Fútbol',
    modality: 'Fútbol 11',
    start_date: new Date('2026-09-15T00:00:00.000Z'),
    end_date: new Date('2026-10-15T00:00:00.000Z'),
    registration_start_date: new Date('2026-08-01T00:00:00.000Z'),
    registration_end_date: new Date('2026-09-10T00:00:00.000Z'),
    registration_fee: 150000,
    currency_code: 'COP',
    grand_prize: 1000000,
    second_prize: 500000,
    third_prize: 250000,
    max_teams: 16,
    min_players_per_team: 7,
    max_players_per_team: 25,
    location_name: 'Estadio Municipal',
    location_address: 'Carrera 5 # 10-20',
    rules_url: 'https://example.com/reglamento.pdf',
    photo_url: '/uploads/tournaments/old-photo.png',
    phase: 'draft',
    status: 'active',
    created_at: new Date('2026-08-20T12:00:00.000Z'),
    updated_at: new Date('2026-08-21T12:00:00.000Z'),
    tournament_types: {
      id: 2n,
      name: 'Todos contra todos',
      description: 'Formato de liga.',
      min_players_per_team: 7,
      max_players_per_team: 25,
      instructions: null,
    },
    tournament_sponsors: [],
    rules_content: null,
    _count: { tournament_team_registrations: 0 },
  };

  const createDto: CreateTournamentDto = {
    name: 'Copa Regional 2026',
    description: 'Torneo de prueba',
    tournamentTypeId: '2',
    sportType: 'Fútbol',
    modality: 'Fútbol 11',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    registrationStartDate: '2026-08-01',
    registrationEndDate: '2026-09-10',
    registrationFee: 150000,
    currencyCode: 'COP',
    grandPrize: 1000000,
    secondPrize: 500000,
    thirdPrize: 250000,
    maxTeams: 16,
    minPlayersPerTeam: 7,
    maxPlayersPerTeam: 25,
    locationName: 'Estadio Municipal',
    locationAddress: 'Carrera 5 # 10-20',
    rulesUrl: 'https://example.com/reglamento.pdf',
    phase: 'draft',
    status: 'active',
  };

  const photo: UploadedImageFile = {
    buffer: Buffer.from('photo'),
    mimetype: 'image/png',
  };

  let service: TournamentsService;

  beforeEach(() => {
    jest.resetAllMocks();
    deleteImage.mockImplementation(
      async (image: { url?: string | null }) =>
        deleteByPublicUrl(image.url ?? null),
    );

    prismaTransaction.mockImplementation(
      (callback: (client: typeof transactionClient) => unknown) =>
        callback(transactionClient),
    );
    getAssociationPermissions.mockResolvedValue(managerPermissions);
    transactionTournamentTypeFindUnique.mockResolvedValue({
      id: 2n,
      name: 'Todos contra todos',
      min_players_per_team: 7,
      max_players_per_team: 25,
    });
    associationsFindFirst.mockResolvedValue(null);
    tournamentsFindFirst.mockResolvedValue(null);
    teamsFindFirst.mockResolvedValue(null);
    sponsorsFindFirst.mockResolvedValue(null);

    service = new TournamentsService(prisma, associationsService, imageStorage);
  });

  describe('create', () => {
    it('fija la asociación desde la ruta y el creador desde el usuario autenticado', async () => {
      saveTournamentPhoto.mockResolvedValue(
        storedAsset('/uploads/tournaments/new-photo.png'),
      );
      transactionTournamentCreate.mockResolvedValue({
        ...tournamentRecord,
        photo_url: '/uploads/tournaments/new-photo.png',
      });
      transactionTournamentFindUnique.mockResolvedValue({
        ...tournamentRecord,
        photo_url: '/uploads/tournaments/new-photo.png',
        photo_public_id: 'public:/uploads/tournaments/new-photo.png',
      });

      await expect(
        service.create(associationId, requestingUserId, createDto, photo),
      ).resolves.toEqual(
        expect.objectContaining({
          id: tournamentId.toString(),
          associationId: associationId.toString(),
          photoUrl: '/uploads/tournaments/new-photo.png',
        }),
      );

      expect(transactionTournamentCreate).toHaveBeenCalledWith({
        data: {
          association_id: associationId,
          name: createDto.name,
          description: createDto.description,
          tournament_type_id: 2n,
          sport_type: createDto.sportType,
          modality: createDto.modality,
          start_date: new Date('2026-09-15'),
          end_date: new Date('2026-10-15'),
          registration_start_date: new Date('2026-08-01'),
          registration_end_date: new Date('2026-09-10'),
          registration_fee: createDto.registrationFee,
          currency_code: createDto.currencyCode,
          grand_prize: createDto.grandPrize,
          second_prize: createDto.secondPrize,
          third_prize: createDto.thirdPrize,
          max_teams: createDto.maxTeams,
          min_players_per_team: createDto.minPlayersPerTeam,
          max_players_per_team: createDto.maxPlayersPerTeam,
          location_name: createDto.locationName,
          location_address: createDto.locationAddress,
          rules_url: createDto.rulesUrl,
          photo_url: '/uploads/tournaments/new-photo.png',
          photo_public_id: 'public:/uploads/tournaments/new-photo.png',
          phase: createDto.phase,
          status: createDto.status,
          created_by: requestingUserId,
        },
        select: { id: true },
      });
      expect(getAssociationPermissions).toHaveBeenNthCalledWith(
        1,
        prisma,
        associationId,
        requestingUserId,
      );
      expect(getAssociationPermissions).toHaveBeenNthCalledWith(
        2,
        transactionClient,
        associationId,
        requestingUserId,
      );
    });

    it('revalida el permiso dentro de la transacción y revierte la foto si cambió', async () => {
      getAssociationPermissions
        .mockResolvedValueOnce(managerPermissions)
        .mockResolvedValueOnce({
          ...managerPermissions,
          canManageTournaments: false,
          permissionLevel: 'viewer',
        });
      saveTournamentPhoto.mockResolvedValue(
        storedAsset('/uploads/tournaments/new-photo.png'),
      );

      await expect(
        service.create(associationId, requestingUserId, createDto, photo),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(transactionTournamentCreate).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/tournaments/new-photo.png',
      );
    });

    it.each(['viewer', 'editor'])(
      'deniega la creación al permiso %s cuando canManageTournaments es false',
      async (permissionLevel) => {
        getAssociationPermissions.mockResolvedValue({
          ...managerPermissions,
          canManageTournaments: false,
          permissionLevel,
        });

        await expect(
          service.create(associationId, requestingUserId, createDto),
        ).rejects.toBeInstanceOf(ForbiddenException);

        expect(prismaTransaction).not.toHaveBeenCalled();
        expect(saveTournamentPhoto).not.toHaveBeenCalled();
      },
    );

    it.each([
      [
        'la finalización antes del inicio',
        { endDate: '2026-09-14' },
        'La fecha de finalización',
      ],
      [
        'la apertura de inscripciones después del inicio',
        { registrationStartDate: '2026-09-16' },
        'La fecha de inicio de inscripciones',
      ],
      [
        'el cierre de inscripciones después del inicio',
        { registrationEndDate: '2026-09-16' },
        'La fecha de cierre de inscripciones',
      ],
      [
        'el cierre de inscripciones antes de su apertura',
        {
          registrationStartDate: '2026-09-10',
          registrationEndDate: '2026-09-09',
        },
        'La fecha de cierre de inscripciones',
      ],
    ])('rechaza %s', async (_caseName, overrides, expectedMessage) => {
      await expect(
        service.create(associationId, requestingUserId, {
          ...createDto,
          ...overrides,
        }),
      ).rejects.toThrow(expectedMessage);

      expect(getAssociationPermissions).not.toHaveBeenCalled();
      expect(prismaTransaction).not.toHaveBeenCalled();
    });

    it('elimina la foto nueva cuando la transacción falla', async () => {
      saveTournamentPhoto.mockResolvedValue(
        storedAsset('/uploads/tournaments/new-photo.png'),
      );
      transactionTournamentCreate.mockRejectedValue(
        new Error('database failure'),
      );

      await expect(
        service.create(associationId, requestingUserId, createDto, photo),
      ).rejects.toThrow('database failure');

      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/tournaments/new-photo.png',
      );
    });

    it('rechaza un tipo de torneo inexistente y limpia la foto guardada', async () => {
      saveTournamentPhoto.mockResolvedValue(
        storedAsset('/uploads/tournaments/new-photo.png'),
      );
      transactionTournamentTypeFindUnique.mockResolvedValue(null);

      await expect(
        service.create(associationId, requestingUserId, createDto, photo),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(transactionTournamentCreate).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/tournaments/new-photo.png',
      );
    });
  });

  describe('findOne', () => {
    it('consulta por la clave compuesta de torneo y asociación', async () => {
      tournamentsFindUnique.mockResolvedValue({
        ...tournamentRecord,
        phase: 'registration',
      });

      await expect(
        service.findOne(associationId, tournamentId, requestingUserId),
      ).resolves.toEqual(
        expect.objectContaining({
          id: tournamentId.toString(),
          associationId: associationId.toString(),
        }),
      );

      expect(tournamentsFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id_association_id: {
              id: tournamentId,
              association_id: associationId,
            },
          },
        }),
      );
    });

    it('oculta borradores a usuarios sin permiso de gestión', async () => {
      getAssociationPermissions.mockResolvedValue({
        ...managerPermissions,
        canManageTournaments: false,
        permissionLevel: 'viewer',
      });
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);

      await expect(
        service.findOne(associationId, tournamentId, requestingUserId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('permite consultar un torneo disponible sin permiso de gestión', async () => {
      getAssociationPermissions.mockResolvedValue({
        ...managerPermissions,
        canManageTournaments: false,
        permissionLevel: 'viewer',
      });
      tournamentsFindUnique.mockResolvedValue({
        ...tournamentRecord,
        phase: 'registration',
        status: 'active',
      });

      await expect(
        service.findOne(associationId, tournamentId, requestingUserId),
      ).resolves.toEqual(expect.objectContaining({ id: '31' }));
    });
  });

  describe('update', () => {
    it('reconsulta y actualiza por ID compuesto dentro de la transacción', async () => {
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      transactionTournamentUpdate.mockResolvedValue({
        ...tournamentRecord,
        name: 'Copa actualizada',
      });

      await service.update(associationId, tournamentId, requestingUserId, {
        name: 'Copa actualizada',
      });

      const compositeWhere = {
        id_association_id: {
          id: tournamentId,
          association_id: associationId,
        },
      };
      expect(tournamentsFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: compositeWhere }),
      );
      expect(transactionTournamentFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: compositeWhere }),
      );
      expect(transactionTournamentUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ where: compositeWhere }),
      );
    });

    it('revalida el permiso transaccional antes de actualizar', async () => {
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);
      getAssociationPermissions
        .mockResolvedValueOnce(managerPermissions)
        .mockResolvedValueOnce({
          ...managerPermissions,
          canManageTournaments: false,
          permissionLevel: 'viewer',
        });

      await expect(
        service.update(associationId, tournamentId, requestingUserId, {
          name: 'Cambio no autorizado',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(transactionTournamentFindUnique).not.toHaveBeenCalled();
      expect(transactionTournamentUpdate).not.toHaveBeenCalled();
    });

    it('valida las fechas combinando los valores persistidos y parciales', async () => {
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);

      await expect(
        service.update(associationId, tournamentId, requestingUserId, {
          startDate: '2026-10-16',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(prismaTransaction).not.toHaveBeenCalled();
    });

    it('elimina la foto nueva si falla la actualización transaccional', async () => {
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      saveTournamentPhoto.mockResolvedValue(
        storedAsset('/uploads/tournaments/new-photo.png'),
      );
      transactionTournamentUpdate.mockRejectedValue(
        new Error('database failure'),
      );

      await expect(
        service.update(
          associationId,
          tournamentId,
          requestingUserId,
          { name: 'Copa actualizada' },
          photo,
        ),
      ).rejects.toThrow('database failure');

      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        '/uploads/tournaments/new-photo.png',
      );
      expect(deleteByPublicUrl).not.toHaveBeenCalledWith(
        tournamentRecord.photo_url,
      );
    });

    it('elimina la foto reemplazada solo después de actualizar y comprobar referencias', async () => {
      const newPhotoUrl = '/uploads/tournaments/new-photo.png';
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      saveTournamentPhoto.mockResolvedValue(storedAsset(newPhotoUrl));
      transactionTournamentUpdate.mockResolvedValue({
        ...tournamentRecord,
        photo_url: newPhotoUrl,
      });

      await service.update(
        associationId,
        tournamentId,
        requestingUserId,
        { name: 'Copa actualizada' },
        photo,
      );

      expect(transactionTournamentUpdate).toHaveBeenCalledWith({
        where: {
          id_association_id: {
            id: tournamentId,
            association_id: associationId,
          },
        },
        data: {
          name: 'Copa actualizada',
          description: undefined,
          tournament_type_id: undefined,
          sport_type: undefined,
          modality: undefined,
          start_date: undefined,
          end_date: undefined,
          registration_start_date: undefined,
          registration_end_date: undefined,
          registration_fee: undefined,
          currency_code: undefined,
          grand_prize: undefined,
          second_prize: undefined,
          third_prize: undefined,
          max_teams: undefined,
          min_players_per_team: undefined,
          max_players_per_team: undefined,
          location_name: undefined,
          location_address: undefined,
          rules_url: undefined,
          photo_url: newPhotoUrl,
          photo_public_id: `public:${newPhotoUrl}`,
          phase: undefined,
          status: undefined,
        },
      });
      expect(associationsFindFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            { logo_url: tournamentRecord.photo_url },
            { cover_url: tournamentRecord.photo_url },
          ],
        },
        select: { id: true },
      });
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        tournamentRecord.photo_url,
      );
    });

    it('conserva la foto anterior si todavía está referenciada', async () => {
      const newPhotoUrl = '/uploads/tournaments/new-photo.png';
      tournamentsFindUnique.mockResolvedValue(tournamentRecord);
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      saveTournamentPhoto.mockResolvedValue(storedAsset(newPhotoUrl));
      transactionTournamentUpdate.mockResolvedValue({
        ...tournamentRecord,
        photo_url: newPhotoUrl,
      });
      tournamentsFindFirst.mockResolvedValue({ id: 99n });

      await service.update(
        associationId,
        tournamentId,
        requestingUserId,
        {},
        photo,
      );

      expect(deleteByPublicUrl).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('elimina un borrador sin inscripciones mediante ID compuesto y limpia su foto', async () => {
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      transactionRegistrationCount.mockResolvedValue(0);
      transactionTournamentDelete.mockResolvedValue(tournamentRecord);

      await expect(
        service.remove(associationId, tournamentId, requestingUserId),
      ).resolves.toEqual(expect.objectContaining({ id: '31' }));

      expect(transactionTournamentDelete).toHaveBeenCalledWith({
        where: {
          id_association_id: {
            id: tournamentId,
            association_id: associationId,
          },
        },
      });
      expect(deleteByPublicUrl).toHaveBeenCalledWith(
        tournamentRecord.photo_url,
      );
    });

    it('no elimina torneos que ya salieron de borrador', async () => {
      transactionTournamentFindUnique.mockResolvedValue({
        ...tournamentRecord,
        phase: 'registration',
      });

      await expect(
        service.remove(associationId, tournamentId, requestingUserId),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(transactionRegistrationCount).not.toHaveBeenCalled();
      expect(transactionTournamentDelete).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).not.toHaveBeenCalled();
    });

    it('no elimina un borrador que ya tiene inscripciones', async () => {
      transactionTournamentFindUnique.mockResolvedValue(tournamentRecord);
      transactionRegistrationCount.mockResolvedValue(1);

      await expect(
        service.remove(associationId, tournamentId, requestingUserId),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(transactionTournamentDelete).not.toHaveBeenCalled();
      expect(deleteByPublicUrl).not.toHaveBeenCalled();
    });
  });
});
