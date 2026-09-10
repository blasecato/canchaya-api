import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { IdentityVerificationService } from './identity-verification.service';
import { publicUserSelect } from './public-user.mapper';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const usersFindUnique = jest.fn();
  const usersFindMany = jest.fn();
  const prisma = {
    users: { findMany: usersFindMany, findUnique: usersFindUnique },
  } as unknown as PrismaService;
  const usersService = new UsersService(
    prisma,
    {} as ImageStorageService,
    {} as IdentityVerificationService,
  );

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

  describe('findOne', () => {
    it('devuelve el usuario público completo con sus roles', async () => {
      usersFindUnique.mockResolvedValue({
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
        status: 'active',
        blocked_until: null,
        block_reason: null,
        created_at: new Date('2026-08-20T12:00:00.000Z'),
        updated_at: new Date('2026-08-21T12:00:00.000Z'),
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
  });
});
