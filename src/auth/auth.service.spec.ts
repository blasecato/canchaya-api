/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { randomUUID } from 'node:crypto';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { JWT_ALGORITHM } from './auth.config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const secret = 'a'.repeat(64);
  const usersFindFirst = jest.fn();
  const usersUpdateMany = jest.fn();
  const sessionsCreate = jest.fn();
  const sessionsFindUnique = jest.fn();
  const sessionsUpdateMany = jest.fn();
  const prisma = {
    users: { findFirst: usersFindFirst, updateMany: usersUpdateMany },
    auth_sessions: {
      create: sessionsCreate,
      findUnique: sessionsFindUnique,
      updateMany: sessionsUpdateMany,
    },
  } as unknown as PrismaService;
  const configService = new ConfigService({
    JWT_SECRET: secret,
    JWT_EXPIRES_IN_SECONDS: '86400',
    JWT_REMEMBER_ME_EXPIRES_IN_SECONDS: '2592000',
    JWT_ISSUER: 'canchaya-api',
    JWT_AUDIENCE: 'canchaya-web',
  });
  const jwtService = new JwtService({
    secret,
    signOptions: {
      algorithm: JWT_ALGORITHM,
      audience: 'canchaya-web',
      issuer: 'canchaya-api',
    },
    verifyOptions: {
      algorithms: [JWT_ALGORITHM],
      audience: 'canchaya-web',
      issuer: 'canchaya-api',
    },
  });
  const authService = new AuthService(prisma, jwtService, configService);
  let passwordHash: string;

  beforeAll(async () => {
    passwordHash = await hash('correct-password', 4);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('inicia sesión, firma un JWT y guarda solamente el hash del jti', async () => {
    usersFindFirst.mockResolvedValue({
      id: 7n,
      id_number: '1020304050',
      document_type: 'CC',
      email: 'user@example.com',
      full_name: 'Usuario Prueba',
      birth_date: new Date('1995-06-20T00:00:00.000Z'),
      birth_city: null,
      gender: null,
      phone: '+573001234567',
      photo_url: null,
      photo_public_id: null,
      document_front_public_id: null,
      document_back_public_id: null,
      identity_verification_status: 'verified',
      password_hash: passwordHash,
      status: 'active',
      blocked_until: null,
      block_reason: null,
      created_at: new Date('2026-08-20T12:00:00.000Z'),
      updated_at: new Date('2026-08-21T12:00:00.000Z'),
      user_roles: [{ role_code: 'PLAYER' }],
    });
    sessionsCreate.mockResolvedValue({ id: 21n });

    const result = await authService.login({
      email: ' USER@example.com ',
      password: 'correct-password',
    });
    const payload = await jwtService.verifyAsync<{
      jti: string;
      sub: string;
      type: string;
    }>(result.accessToken);

    expect(result).toEqual(
      expect.objectContaining({
        tokenType: 'Bearer',
        expiresIn: 86400,
        user: {
          id: '7',
          idNumber: '1020304050',
          documentType: 'CC',
          email: 'user@example.com',
          fullName: 'Usuario Prueba',
          birthDate: '1995-06-20',
          birthCity: null,
          gender: null,
          phone: '+573001234567',
          photoUrl: null,
          hasIdentityDocuments: false,
          identityVerificationStatus: 'verified',
          status: 'active',
          blockReason: null,
          blockedUntil: null,
          roles: ['PLAYER'],
          createdAt: '2026-08-20T12:00:00.000Z',
          updatedAt: '2026-08-21T12:00:00.000Z',
        },
      }),
    );
    expect(payload).toEqual(
      expect.objectContaining({
        jti: expect.any(String),
        sub: '7',
        type: 'access',
      }),
    );
    expect(sessionsCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        user_id: 7n,
        jti_hash: expect.stringMatching(/^[a-f0-9]{64}$/),
        expires_at: expect.any(Date),
      }),
    });
    expect(sessionsCreate.mock.calls[0][0].data.jti_hash).not.toBe(payload.jti);
  });

  it('usa la duración extendida cuando rememberMe está activo', async () => {
    usersFindFirst.mockResolvedValue({
      id: 7n,
      id_number: '1020304050',
      document_type: 'CC',
      email: 'user@example.com',
      full_name: 'Usuario Prueba',
      birth_date: new Date('1995-06-20T00:00:00.000Z'),
      phone: null,
      password_hash: passwordHash,
      status: 'active',
      created_at: new Date('2026-08-20T12:00:00.000Z'),
      updated_at: new Date('2026-08-21T12:00:00.000Z'),
      user_roles: [],
    });
    sessionsCreate.mockResolvedValue({ id: 22n });

    const result = await authService.login({
      email: 'user@example.com',
      password: 'correct-password',
      rememberMe: true,
    });

    expect(result.expiresIn).toBe(2_592_000);
  });

  it('devuelve el mismo error para credenciales incorrectas y no crea sesión', async () => {
    usersFindFirst.mockResolvedValue({
      id: 7n,
      email: 'user@example.com',
      full_name: 'Usuario Prueba',
      password_hash: passwordHash,
      status: 'active',
      user_roles: [],
    });

    await expect(
      authService.login({
        email: 'user@example.com',
        password: 'incorrect-password',
      }),
    ).rejects.toThrow(new UnauthorizedException('Credenciales inválidas.'));
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it('acepta un token firmado únicamente cuando su sesión está activa', async () => {
    const tokenId = randomUUID();
    const token = await jwtService.signAsync(
      { jti: tokenId, sub: '7', type: 'access' },
      { expiresIn: 3600 },
    );
    sessionsFindUnique.mockResolvedValue({
      id: 21n,
      user_id: 7n,
      expires_at: new Date(Date.now() + 60_000),
      revoked_at: null,
      users: { status: 'active' },
    });

    await expect(authService.validateAccessToken(token)).resolves.toEqual({
      sessionId: 21n,
      userId: 7n,
    });
    expect(sessionsFindUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { jti_hash: expect.stringMatching(/^[a-f0-9]{64}$/) },
      }),
    );
  });

  it('rechaza inmediatamente un token cuya sesión fue revocada', async () => {
    const token = await jwtService.signAsync(
      { jti: randomUUID(), sub: '7', type: 'access' },
      { expiresIn: 3600 },
    );
    sessionsFindUnique.mockResolvedValue({
      id: 21n,
      user_id: 7n,
      expires_at: new Date(Date.now() + 60_000),
      revoked_at: new Date(),
      users: { status: 'active' },
    });

    await expect(authService.validateAccessToken(token)).rejects.toThrow(
      new UnauthorizedException('Token inválido, expirado o revocado.'),
    );
  });

  it('cierra la sesión actual marcándola como revocada', async () => {
    sessionsUpdateMany.mockResolvedValue({ count: 1 });

    await expect(
      authService.logout({ sessionId: 21n, userId: 7n }),
    ).resolves.toEqual({ message: 'Sesión cerrada correctamente.' });
    expect(sessionsUpdateMany).toHaveBeenCalledWith({
      where: { id: 21n, user_id: 7n, revoked_at: null },
      data: { revoked_at: expect.any(Date) },
    });
  });
});
