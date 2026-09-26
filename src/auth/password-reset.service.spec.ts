/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { createHash } from 'node:crypto';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import type { MailService } from '../mail/mail.service';
import { JWT_ALGORITHM } from './auth.config';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  const secret = 'a'.repeat(64);
  const usersFindFirst = jest.fn();
  const usersUpdate = jest.fn();
  const codesFindFirst = jest.fn();
  const codesCreate = jest.fn();
  const codesUpdate = jest.fn();
  const codesUpdateMany = jest.fn();
  const sessionsUpdateMany = jest.fn();
  const transaction = jest.fn();
  const prisma = {
    users: { findFirst: usersFindFirst, update: usersUpdate },
    password_reset_codes: {
      findFirst: codesFindFirst,
      create: codesCreate,
      update: codesUpdate,
      updateMany: codesUpdateMany,
    },
    auth_sessions: { updateMany: sessionsUpdateMany },
    $transaction: transaction,
  } as unknown as PrismaService;
  const sendPasswordResetCode = jest.fn();
  const mailService = { sendPasswordResetCode } as unknown as MailService;
  const configService = new ConfigService({ JWT_SECRET: secret });
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
  const service = new PasswordResetService(
    prisma,
    jwtService,
    mailService,
    configService,
  );
  const hashCode = (code: string) =>
    createHash('sha256').update(`${code}:${secret}`).digest('hex');

  beforeEach(() => {
    jest.clearAllMocks();
    transaction.mockResolvedValue([]);
    sendPasswordResetCode.mockResolvedValue(undefined);
  });

  describe('request', () => {
    it('responde igual cuando el correo no existe y no envía nada', async () => {
      usersFindFirst.mockResolvedValue(null);

      await expect(
        service.request({ email: 'nadie@test.com' }),
      ).resolves.toEqual({
        message: 'Si el correo está registrado enviaremos un código de verificación.',
        expiresInMinutes: 10,
      });
      expect(sendPasswordResetCode).not.toHaveBeenCalled();
      expect(transaction).not.toHaveBeenCalled();
    });

    it('guarda el código como hash y envía el correo', async () => {
      usersFindFirst.mockResolvedValue({
        id: 4n,
        email: 'jugador@test.com',
        full_name: 'Ana Perez',
      });
      codesFindFirst.mockResolvedValue(null);

      await service.request({ email: 'jugador@test.com' }, '10.0.0.5');

      expect(transaction).toHaveBeenCalledTimes(1);
      const createArgs = codesCreate.mock.calls[0][0];
      const sentCode = sendPasswordResetCode.mock.calls[0][0].code;
      expect(sentCode).toMatch(/^\d{6}$/);
      expect(createArgs.data.code_hash).toBe(hashCode(sentCode));
      expect(createArgs.data.code_hash).not.toContain(sentCode);
      expect(createArgs.data.requested_ip).toBe('10.0.0.5');
    });

    it('no reenvía mientras el código anterior sigue vigente', async () => {
      usersFindFirst.mockResolvedValue({
        id: 4n,
        email: 'jugador@test.com',
        full_name: 'Ana Perez',
      });
      codesFindFirst.mockResolvedValue({ id: 9n });

      await service.request({ email: 'jugador@test.com' });

      expect(sendPasswordResetCode).not.toHaveBeenCalled();
      expect(transaction).not.toHaveBeenCalled();
    });
  });

  describe('verify', () => {
    it('entrega un token cuando el código coincide', async () => {
      usersFindFirst.mockResolvedValue({ id: 4n });
      codesFindFirst.mockResolvedValue({
        id: 7n,
        code_hash: hashCode('123456'),
        attempts: 0,
      });

      const result = await service.verify({
        email: 'jugador@test.com',
        code: '123456',
      });

      expect(result.expiresIn).toBe(600);
      const payload = await jwtService.verifyAsync(result.resetToken);
      expect(payload).toMatchObject({
        sub: '4',
        prc: '7',
        type: 'password_reset',
      });
    });

    it('cuenta el intento fallido sin quemar el código', async () => {
      usersFindFirst.mockResolvedValue({ id: 4n });
      codesFindFirst.mockResolvedValue({
        id: 7n,
        code_hash: hashCode('123456'),
        attempts: 1,
      });

      await expect(
        service.verify({ email: 'jugador@test.com', code: '000000' }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(codesUpdate).toHaveBeenCalledWith({
        where: { id: 7n },
        data: { attempts: 2 },
      });
    });

    it('quema el código al agotar los intentos', async () => {
      usersFindFirst.mockResolvedValue({ id: 4n });
      codesFindFirst.mockResolvedValue({
        id: 7n,
        code_hash: hashCode('123456'),
        attempts: 4,
      });

      await expect(
        service.verify({ email: 'jugador@test.com', code: '000000' }),
      ).rejects.toThrow('Superaste los intentos permitidos.');
      expect(codesUpdate.mock.calls[0][0].data.consumed_at).toBeInstanceOf(Date);
    });

    it('rechaza cuando no hay código vigente', async () => {
      usersFindFirst.mockResolvedValue({ id: 4n });
      codesFindFirst.mockResolvedValue(null);

      await expect(
        service.verify({ email: 'jugador@test.com', code: '123456' }),
      ).rejects.toThrow('El código es inválido o ya expiró.');
    });
  });

  describe('confirm', () => {
    const signResetToken = (sub: string, prc: string) =>
      jwtService.signAsync(
        { sub, prc, type: 'password_reset' },
        { expiresIn: 600 },
      );

    it('cambia la contraseña, consume el código y revoca las sesiones', async () => {
      const resetToken = await signResetToken('4', '7');
      codesFindFirst.mockResolvedValue({ id: 7n });

      await expect(
        service.confirm({ resetToken, password: 'NuevaClave123' }),
      ).resolves.toEqual({
        message: 'Tu contraseña fue actualizada correctamente.',
      });

      const passwordHash = usersUpdate.mock.calls[0][0].data.password_hash;
      await expect(compare('NuevaClave123', passwordHash)).resolves.toBe(true);
      expect(codesUpdate.mock.calls[0][0].data.consumed_at).toBeInstanceOf(Date);
      expect(sessionsUpdateMany).toHaveBeenCalledWith({
        where: { user_id: 4n, revoked_at: null },
        data: { revoked_at: expect.any(Date) },
      });
    });

    it('rechaza un token que no es de recuperación', async () => {
      const accessToken = await jwtService.signAsync(
        { sub: '4', jti: 'x', type: 'access' },
        { expiresIn: 600 },
      );

      await expect(
        service.confirm({ resetToken: accessToken, password: 'NuevaClave123' }),
      ).rejects.toThrow('La sesión de recuperación expiró.');
      expect(usersUpdate).not.toHaveBeenCalled();
    });

    it('rechaza cuando el código ya fue consumido', async () => {
      const resetToken = await signResetToken('4', '7');
      codesFindFirst.mockResolvedValue(null);

      await expect(
        service.confirm({ resetToken, password: 'NuevaClave123' }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(usersUpdate).not.toHaveBeenCalled();
    });
  });
});
