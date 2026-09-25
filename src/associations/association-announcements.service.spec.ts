import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import {
  associationAnnouncementSelect,
  publicAssociationAnnouncementSelect,
} from './association-announcement.mapper';
import { AssociationAnnouncementsService } from './association-announcements.service';
import { AssociationsService } from './associations.service';

describe('AssociationAnnouncementsService', () => {
  const findMany = jest.fn();
  const findFirst = jest.fn();
  const create = jest.fn();
  const update = jest.fn();
  const remove = jest.fn();
  const prisma = {
    association_announcements: {
      findMany,
      findFirst,
      create,
      update,
      delete: remove,
    },
  } as unknown as PrismaService;
  const getAssociationPermissions = jest.fn();
  const associationsService = {
    getAssociationPermissions,
  } as unknown as AssociationsService;
  const saveAssociationAnnouncement = jest.fn();
  const deleteSafely = jest.fn();
  const imageStorage = {
    saveAssociationAnnouncement,
    deleteSafely,
  } as unknown as ImageStorageService;
  const service = new AssociationAnnouncementsService(
    prisma,
    associationsService,
    imageStorage,
  );
  const today = new Date('2026-09-24T00:00:00.000Z');
  const record = {
    id: 11n,
    association_id: 7n,
    title: 'Próxima copa regional',
    description: 'Inscripciones muy pronto.',
    image_url: 'https://example.com/flyer.jpg',
    image_public_id: 'flyer-11',
    starts_on: new Date('2026-09-20T00:00:00.000Z'),
    ends_on: new Date('2026-10-20T00:00:00.000Z'),
    contact_phone: null,
    address: null,
    registration_fee: null,
    registration_starts_on: null,
    tournament_starts_on: null,
    first_place_prize: null,
    second_place_prize: null,
    created_at: new Date('2026-09-24T15:00:00.000Z'),
    updated_at: new Date('2026-09-24T15:00:00.000Z'),
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    getAssociationPermissions.mockResolvedValue({ canEdit: true });
    jest
      .spyOn(
        service as unknown as { todayInColombia(): Date },
        'todayInColombia',
      )
      .mockReturnValue(today);
  });

  it('muestra únicamente publicaciones vigentes y las ordena de la más reciente', async () => {
    findMany.mockResolvedValue([record]);

    await expect(service.findAll(7n, 3n)).resolves.toEqual([
      expect.objectContaining({
        id: '11',
        associationId: '7',
        visibility: 'visible',
      }),
    ]);
    expect(findMany).toHaveBeenCalledWith({
      where: {
        association_id: 7n,
        starts_on: { lte: today },
        ends_on: { gte: today },
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      select: associationAnnouncementSelect,
    });
  });

  it('publica en portada las cinco novedades vigentes de organizaciones activas', async () => {
    findMany.mockResolvedValue([
      {
        ...record,
        associations: {
          name: 'Organización Deportiva Pitalito',
          city: 'Pitalito',
          logo_url: 'https://example.com/logo.png',
        },
      },
    ]);

    await expect(service.findVisibleForHome()).resolves.toEqual([
      expect.objectContaining({
        id: '11',
        associationName: 'Organización Deportiva Pitalito',
        associationCity: 'Pitalito',
        visibility: 'visible',
      }),
    ]);
    expect(findMany).toHaveBeenCalledWith({
      where: {
        starts_on: { lte: today },
        ends_on: { gte: today },
        associations: { status: 'active' },
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      take: 5,
      select: publicAssociationAnnouncementSelect,
    });
  });

  it('exige permiso de edición para consultar el historial de gestión', async () => {
    getAssociationPermissions.mockResolvedValue({ canEdit: false });

    await expect(service.findAll(7n, 3n, 'management')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(findMany).not.toHaveBeenCalled();
  });

  it('elimina la imagen cargada si la base de datos rechaza la publicación', async () => {
    const uploaded = {
      url: 'https://example.com/new.jpg',
      publicId: 'new',
      assetId: 'asset-new',
      format: 'jpg',
      deliveryType: 'upload' as const,
    };
    saveAssociationAnnouncement.mockResolvedValue(uploaded);
    create.mockRejectedValue(new Error('database error'));

    await expect(
      service.create(
        7n,
        3n,
        {
          title: 'Nueva publicación',
          startsOn: '2026-09-24',
          endsOn: '2026-10-24',
        },
        { buffer: Buffer.from('image'), mimetype: 'image/jpeg' },
      ),
    ).rejects.toThrow('database error');
    expect(deleteSafely).toHaveBeenCalledWith(uploaded);
  });

  it('permite crear una publicación sin título ni descripción', async () => {
    const uploaded = {
      url: 'https://example.com/flyer-only.jpg',
      publicId: 'flyer-only',
      assetId: 'asset-flyer-only',
      format: 'jpg',
      deliveryType: 'upload' as const,
    };
    saveAssociationAnnouncement.mockResolvedValue(uploaded);
    create.mockResolvedValue({
      ...record,
      title: null,
      description: null,
      image_url: uploaded.url,
      image_public_id: uploaded.publicId,
    });

    await expect(
      service.create(
        7n,
        3n,
        {
          startsOn: '2026-09-24',
          endsOn: '2026-10-24',
        },
        { buffer: Buffer.from('image'), mimetype: 'image/jpeg' },
      ),
    ).resolves.toEqual(
      expect.objectContaining({ title: null, description: null }),
    );
    expect(create).toHaveBeenCalledWith({
      data: {
        association_id: 7n,
        title: undefined,
        description: undefined,
        contact_phone: null,
        address: null,
        registration_fee: null,
        registration_starts_on: null,
        tournament_starts_on: null,
        first_place_prize: null,
        second_place_prize: null,
        image_url: uploaded.url,
        image_public_id: uploaded.publicId,
        starts_on: new Date('2026-09-24T00:00:00.000Z'),
        ends_on: new Date('2026-10-24T00:00:00.000Z'),
        created_by: 3n,
      },
      select: associationAnnouncementSelect,
    });
  });

  it('rechaza un rango invertido antes de subir la imagen', async () => {
    await expect(
      service.create(
        7n,
        3n,
        {
          title: 'Fechas inválidas',
          startsOn: '2026-10-24',
          endsOn: '2026-09-24',
        },
        { buffer: Buffer.from('image'), mimetype: 'image/jpeg' },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(saveAssociationAnnouncement).not.toHaveBeenCalled();
  });

  it('reemplaza la imagen anterior solamente después de actualizar', async () => {
    const uploaded = {
      url: 'https://example.com/replacement.jpg',
      publicId: 'replacement',
      assetId: 'asset-replacement',
      format: 'jpg',
      deliveryType: 'upload' as const,
    };
    findFirst.mockResolvedValue(record);
    saveAssociationAnnouncement.mockResolvedValue(uploaded);
    update.mockResolvedValue({
      ...record,
      image_url: uploaded.url,
      image_public_id: uploaded.publicId,
    });

    await service.update(
      7n,
      11n,
      3n,
      { title: 'Flyer actualizado' },
      { buffer: Buffer.from('replacement'), mimetype: 'image/jpeg' },
    );

    expect(deleteSafely).toHaveBeenCalledWith({
      url: record.image_url,
      publicId: record.image_public_id,
    });
  });
});
