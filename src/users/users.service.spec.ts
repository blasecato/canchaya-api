import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { IdentityVerificationService } from './identity-verification.service';
import { publicUserSelect } from './public-user.mapper';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const usersFindUnique = jest.fn();
  const usersFindMany = jest.fn<(args: unknown) => Promise<unknown[]>>();
  const userRolesFindMany = jest.fn();
  const createIdentityDocumentDownloadUrl = jest.fn(
    () => 'https://signed.test/documento',
  );
  const prisma = {
    users: { findMany: usersFindMany, findUnique: usersFindUnique },
    user_roles: { findMany: userRolesFindMany },
  } as unknown as PrismaService;
  const usersService = new UsersService(
    prisma,
    { createIdentityDocumentDownloadUrl } as unknown as ImageStorageService,
    {} as IdentityVerificationService,
  );

  const baseUserRecord = {
    id: 7n,
    id_number: '1020304050',
    document_type: 'CC',
    full_name: 'Usuario Prueba',
    birth_date: new Date('1995-06-20T00:00:00.000Z'),
    birth_city: null,
    gender: null,
    email: 'user@example.com',
    phone: '+573001234567',
    photo_url: null,
    photo_public_id: null,
    document_front_public_id: 'canchaya/users/documents/front/abc',
    document_back_public_id: 'canchaya/users/documents/back/def',
    identity_verification_status: 'verified',
    status: 'active',
    blocked_until: null,
    block_reason: null,
    created_at: new Date('2026-08-20T12:00:00.000Z'),
    updated_at: new Date('2026-08-21T12:00:00.000Z'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('devuelve una lista tipada con roles sin exponer contraseñas', async () => {
      usersFindMany.mockResolvedValue([
        {
          id: 7n,
          id_number: '1020304050',
          document_type: 'CC',
          full_name: 'Usuario Prueba',
          birth_date: new Date('1995-06-20T00:00:00.000Z'),
          birth_city: null,
          gender: null,
          email: 'user@example.com',
          phone: null,
          photo_url: null,
          photo_public_id: null,
          status: 'active',
          blocked_until: null,
          block_reason: null,
          created_at: new Date('2026-08-20T12:00:00.000Z'),
          updated_at: new Date('2026-08-21T12:00:00.000Z'),
          user_roles: [{ role_code: 'PLAYER' }],
        },
      ]);

      await expect(usersService.findAll()).resolves.toEqual([
        expect.objectContaining({ id: '7', roles: ['PLAYER'] }),
      ]);
      expect(usersFindMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        select: publicUserSelect,
      });
    });
  });

  describe('exportAdministrators', () => {
    it('exporta únicamente datos de contacto, rol y asociaciones', async () => {
      usersFindMany.mockResolvedValue([
        {
          id_number: '1020304050',
          document_type: 'CC',
          full_name: 'Administradora Prueba',
          email: 'admin@example.com',
          phone: '+573001234567',
          status: 'active',
          user_roles: [{ role_code: 'ASSOCIATION_ADMIN' }],
          associations: { id: 4n, name: 'Liga Principal' },
          association_administrators: [
            {
              permission_level: 'administrator',
              associations: { id: 8n, name: 'Liga Alterna' },
            },
          ],
        },
      ]);

      const result = await usersService.exportAdministrators({
        search: 'Prueba',
        role: 'ASSOCIATION_ADMIN',
        status: 'active',
      });

      expect(result).toEqual([
        {
          fullName: 'Administradora Prueba',
          documentType: 'CC',
          idNumber: '1020304050',
          phone: '+573001234567',
          email: 'admin@example.com',
          status: 'active',
          roles: ['ASSOCIATION_ADMIN'],
          associations: [
            { name: 'Liga Principal', permissionLevel: 'owner' },
            {
              name: 'Liga Alterna',
              permissionLevel: 'administrator',
            },
          ],
        },
      ]);
      expect(usersFindMany).toHaveBeenCalledTimes(1);
      expect(result[0]).not.toHaveProperty('birthDate');
      expect(result[0]).not.toHaveProperty('photoUrl');
    });
  });

  describe('findOne', () => {
    it('devuelve el usuario público completo con sus roles', async () => {
      usersFindUnique.mockResolvedValue({
        ...baseUserRecord,
        user_roles: [
          { role_code: 'REFEREE' },
          { role_code: 'PLAYER' },
          { role_code: 'REFEREE' },
        ],
      });

      await expect(usersService.findOne(7n)).resolves.toEqual({
        id: '7',
        idNumber: '1020304050',
        documentType: 'CC',
        fullName: 'Usuario Prueba',
        birthDate: '1995-06-20',
        birthCity: null,
        gender: null,
        email: 'user@example.com',
        phone: '+573001234567',
        photoUrl: null,
        hasIdentityDocuments: true,
        identityVerificationStatus: 'verified',
        status: 'active',
        blockReason: null,
        blockedUntil: null,
        roles: ['PLAYER', 'REFEREE'],
        createdAt: '2026-08-20T12:00:00.000Z',
        updatedAt: '2026-08-21T12:00:00.000Z',
      });
      expect(usersFindUnique).toHaveBeenCalledWith({
        where: { id: 7n },
        select: publicUserSelect,
      });
      expect(publicUserSelect).not.toHaveProperty('password_hash');
    });

    it('lanza 404 cuando el usuario autenticado ya no existe', async () => {
      usersFindUnique.mockResolvedValue(null);

      await expect(usersService.findOne(99n)).rejects.toThrow(
        new NotFoundException('El usuario con ID 99 no existe.'),
      );
    });

    it('informa que no hay documento cuando falta alguna de las dos caras', async () => {
      usersFindUnique.mockResolvedValue({
        ...baseUserRecord,
        document_back_public_id: null,
        user_roles: [{ role_code: 'PLAYER' }],
      });

      await expect(usersService.findOne(7n)).resolves.toEqual(
        expect.objectContaining({ hasIdentityDocuments: false }),
      );
    });
  });

  describe('getIdentityDocumentDownload', () => {
    const documentOwner = {
      document_front_public_id: 'canchaya/users/documents/front/abc',
      document_front_format: 'png',
      document_back_public_id: 'canchaya/users/documents/back/def',
      document_back_format: 'png',
      user_roles: [{ role_code: 'PLAYER' }],
    };

    it('entrega un enlace firmado al superadministrador', async () => {
      usersFindUnique.mockResolvedValue(documentOwner);
      userRolesFindMany.mockResolvedValue([{ role_code: 'SUPER_ADMIN' }]);

      await expect(
        usersService.getIdentityDocumentDownload(7n, 1n, 'front'),
      ).resolves.toEqual(
        expect.objectContaining({ url: 'https://signed.test/documento' }),
      );
      expect(createIdentityDocumentDownloadUrl).toHaveBeenCalledWith(
        'canchaya/users/documents/front/abc',
        'png',
        300,
      );
    });

    it('niega el documento a un administrador de asociación', async () => {
      // Puede consultar el perfil del jugador, pero la cédula fotografiada no.
      usersFindUnique.mockResolvedValue(documentOwner);
      userRolesFindMany.mockResolvedValue([{ role_code: 'ASSOCIATION_ADMIN' }]);

      await expect(
        usersService.getIdentityDocumentDownload(7n, 1n, 'front'),
      ).rejects.toThrow(ForbiddenException);
      expect(createIdentityDocumentDownloadUrl).not.toHaveBeenCalled();
    });

    it('niega el documento al propio titular del perfil', async () => {
      usersFindUnique.mockResolvedValue(documentOwner);
      userRolesFindMany.mockResolvedValue([{ role_code: 'PLAYER' }]);

      await expect(
        usersService.getIdentityDocumentDownload(7n, 7n, 'back'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
