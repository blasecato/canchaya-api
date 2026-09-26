import { createHash, randomInt, timingSafeEqual } from 'node:crypto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type {
  ConfirmPasswordResetDto,
  PasswordResetConfirmationResponseDto,
  PasswordResetRequestResponseDto,
  PasswordResetVerificationResponseDto,
  RequestPasswordResetDto,
  VerifyPasswordResetCodeDto,
} from './dto/password-reset.dto';

/** Respuesta única del primer paso: nunca revela si el correo existe. */
const GENERIC_REQUEST_MESSAGE =
  'Si el correo está registrado enviaremos un código de verificación.';
const INVALID_CODE_MESSAGE = 'El código es inválido o ya expiró.';
const INVALID_RESET_TOKEN_MESSAGE =
  'La sesión de recuperación expiró. Solicita un código nuevo.';

const CODE_TTL_MINUTES = 10;
const MAX_CODE_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;
const RESET_TOKEN_TTL_SECONDS = 600;

interface PasswordResetTokenPayload {
  sub: string;
  prc: string;
  type: 'password_reset';
  iat?: number;
  exp?: number;
}

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async request(
    dto: RequestPasswordResetDto,
    requestedIp?: string,
  ): Promise<PasswordResetRequestResponseDto> {
    const response: PasswordResetRequestResponseDto = {
      message: GENERIC_REQUEST_MESSAGE,
      expiresInMinutes: CODE_TTL_MINUTES,
    };
    const user = await this.prisma.users.findFirst({
      where: {
        email: { equals: dto.email, mode: 'insensitive' },
        status: 'active',
      },
      select: { id: true, email: true, full_name: true },
    });

    if (!user) return response;

    const now = new Date();
    const cooldownStart = new Date(
      now.getTime() - RESEND_COOLDOWN_SECONDS * 1000,
    );
    const recentCode = await this.prisma.password_reset_codes.findFirst({
      where: {
        user_id: user.id,
        consumed_at: null,
        expires_at: { gt: now },
        created_at: { gt: cooldownStart },
      },
      select: { id: true },
    });

    // Aún vale el código anterior: no se reenvía para no invitar al spam.
    if (recentCode) return response;

    const code = this.generateCode();
    await this.prisma.$transaction([
      this.prisma.password_reset_codes.updateMany({
        where: { user_id: user.id, consumed_at: null },
        data: { consumed_at: now },
      }),
      this.prisma.password_reset_codes.create({
        data: {
          user_id: user.id,
          code_hash: this.hashCode(code),
          expires_at: new Date(now.getTime() + CODE_TTL_MINUTES * 60 * 1000),
          requested_ip: requestedIp ?? null,
        },
      }),
    ]);

    try {
      await this.mailService.sendPasswordResetCode({
        to: user.email,
        fullName: user.full_name,
        code,
        expiresInMinutes: CODE_TTL_MINUTES,
      });
    } catch {
      // El detalle ya quedó en el log del MailService: la respuesta sigue
      // siendo genérica para no filtrar qué correos existen.
      this.logger.error(
        `No fue posible entregar el código de recuperación al usuario ${user.id.toString()}.`,
      );
    }

    return response;
  }

  async verify(
    dto: VerifyPasswordResetCodeDto,
  ): Promise<PasswordResetVerificationResponseDto> {
    const now = new Date();
    const user = await this.prisma.users.findFirst({
      where: {
        email: { equals: dto.email, mode: 'insensitive' },
        status: 'active',
      },
      select: { id: true },
    });

    if (!user) throw new BadRequestException(INVALID_CODE_MESSAGE);

    const activeCode = await this.prisma.password_reset_codes.findFirst({
      where: {
        user_id: user.id,
        consumed_at: null,
        expires_at: { gt: now },
      },
      orderBy: { id: 'desc' },
      select: { id: true, code_hash: true, attempts: true },
    });

    if (!activeCode) throw new BadRequestException(INVALID_CODE_MESSAGE);

    if (!this.codeMatches(dto.code, activeCode.code_hash)) {
      const attempts = activeCode.attempts + 1;
      const exhausted = attempts >= MAX_CODE_ATTEMPTS;
      // Al agotar los intentos se quema el código: hay que pedir otro.
      await this.prisma.password_reset_codes.update({
        where: { id: activeCode.id },
        data: { attempts, ...(exhausted ? { consumed_at: now } : {}) },
      });
      throw new BadRequestException(
        exhausted
          ? 'Superaste los intentos permitidos. Solicita un código nuevo.'
          : INVALID_CODE_MESSAGE,
      );
    }

    const resetToken = await this.jwtService.signAsync(
      {
        sub: user.id.toString(),
        prc: activeCode.id.toString(),
        type: 'password_reset' as const,
      },
      { expiresIn: RESET_TOKEN_TTL_SECONDS },
    );

    return { resetToken, expiresIn: RESET_TOKEN_TTL_SECONDS };
  }

  async confirm(
    dto: ConfirmPasswordResetDto,
  ): Promise<PasswordResetConfirmationResponseDto> {
    let payload: PasswordResetTokenPayload;
    try {
      payload =
        await this.jwtService.verifyAsync<PasswordResetTokenPayload>(
          dto.resetToken,
        );
    } catch {
      throw new BadRequestException(INVALID_RESET_TOKEN_MESSAGE);
    }

    if (
      payload?.type !== 'password_reset' ||
      !/^[1-9]\d*$/.test(payload.sub ?? '') ||
      !/^[1-9]\d*$/.test(payload.prc ?? '')
    ) {
      throw new BadRequestException(INVALID_RESET_TOKEN_MESSAGE);
    }

    const now = new Date();
    const userId = BigInt(payload.sub);
    const code = await this.prisma.password_reset_codes.findFirst({
      where: {
        id: BigInt(payload.prc),
        user_id: userId,
        consumed_at: null,
        expires_at: { gt: now },
      },
      select: { id: true },
    });

    if (!code) throw new BadRequestException(INVALID_RESET_TOKEN_MESSAGE);

    const passwordHash = await hash(dto.password, 12);
    await this.prisma.$transaction([
      this.prisma.users.update({
        where: { id: userId },
        data: { password_hash: passwordHash, updated_at: now },
      }),
      this.prisma.password_reset_codes.update({
        where: { id: code.id },
        data: { consumed_at: now },
      }),
      // Cambiar la clave cierra cualquier sesión abierta con la anterior.
      this.prisma.auth_sessions.updateMany({
        where: { user_id: userId, revoked_at: null },
        data: { revoked_at: now },
      }),
    ]);

    return { message: 'Tu contraseña fue actualizada correctamente.' };
  }

  private generateCode(): string {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
  }

  private hashCode(code: string): string {
    const pepper = this.configService.get<string>('JWT_SECRET') ?? '';
    return createHash('sha256').update(`${code}:${pepper}`).digest('hex');
  }

  private codeMatches(code: string, expectedHash: string): boolean {
    const actual = Buffer.from(this.hashCode(code), 'utf8');
    const expected = Buffer.from(expectedHash, 'utf8');
    return (
      actual.length === expected.length && timingSafeEqual(actual, expected)
    );
  }
}
