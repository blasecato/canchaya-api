import { createHash, randomUUID } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import {
  publicUserSelect,
  toPublicUserResponse,
} from '../users/public-user.mapper';
import { getAuthSettings, type AuthSettings } from './auth.config';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import type { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import type { AuthenticatedSession } from './interfaces/authenticated-request.interface';

const INVALID_CREDENTIALS_MESSAGE = 'Credenciales inválidas.';
const INVALID_TOKEN_MESSAGE = 'Token inválido, expirado o revocado.';
const DUMMY_PASSWORD_HASH =
  '$2b$12$586Ds5J7mmi.nFhCw7LzzuvQ60P5JZcppz9zEJ/fWt8gjK.BaZzVO';

@Injectable()
export class AuthService {
  private readonly settings: AuthSettings;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.settings = getAuthSettings(configService);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const email = loginDto.email.trim().toLowerCase();
    const now = new Date();
    await this.prisma.users.updateMany({
      where: {
        email: { equals: email, mode: 'insensitive' },
        status: 'inactive',
        block_reason: { not: null },
        blocked_until: { lte: now },
      },
      data: {
        status: 'active',
        blocked_until: null,
        block_reason: null,
        blocked_by: null,
        updated_at: now,
      },
    });
    const user = await this.prisma.users.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
      select: {
        ...publicUserSelect,
        password_hash: true,
      },
    });

    const passwordIsValid = await compare(
      loginDto.password,
      user?.password_hash ?? DUMMY_PASSWORD_HASH,
    );

    const hasActiveBlock = Boolean(
      user &&
        user.status === 'inactive' &&
        user.block_reason &&
        (!user.blocked_until || user.blocked_until.getTime() > now.getTime()),
    );

    if (
      !user ||
      !passwordIsValid ||
      (user.status !== 'active' && !hasActiveBlock)
    ) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    const expiresInSeconds = loginDto.rememberMe
      ? this.settings.rememberMeExpiresInSeconds
      : this.settings.expiresInSeconds;
    const tokenId = randomUUID();
    const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);
    const payload = {
      jti: tokenId,
      sub: user.id.toString(),
      type: 'access' as const,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: expiresInSeconds,
    });

    await this.prisma.auth_sessions.create({
      data: {
        user_id: user.id,
        jti_hash: this.hashTokenId(tokenId),
        expires_at: expiresAt,
      },
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: expiresInSeconds,
      expiresAt: expiresAt.toISOString(),
      user: toPublicUserResponse(user),
    };
  }

  async validateAccessToken(token: string): Promise<AuthenticatedSession> {
    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token);
    } catch {
      throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
    }

    if (!this.isAccessTokenPayload(payload)) {
      throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
    }

    const userId = BigInt(payload.sub);
    const session = await this.prisma.auth_sessions.findUnique({
      where: { jti_hash: this.hashTokenId(payload.jti) },
      select: {
        id: true,
        user_id: true,
        expires_at: true,
        revoked_at: true,
        users: {
          select: {
            status: true,
            block_reason: true,
            blocked_until: true,
          },
        },
      },
    });

    if (
      !session ||
      session.user_id !== userId ||
      session.revoked_at !== null ||
      session.expires_at.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
    }

    const now = new Date();
    const blockHasExpired = Boolean(
      session.users.status === 'inactive' &&
        session.users.block_reason &&
        session.users.blocked_until &&
        session.users.blocked_until.getTime() <= now.getTime(),
    );

    if (blockHasExpired) {
      await this.prisma.users.updateMany({
        where: {
          id: userId,
          status: 'inactive',
          block_reason: { not: null },
          blocked_until: { lte: now },
        },
        data: {
          status: 'active',
          blocked_until: null,
          block_reason: null,
          blocked_by: null,
          updated_at: now,
        },
      });
    }

    const isBlocked = Boolean(
      !blockHasExpired &&
        session.users.status === 'inactive' &&
        session.users.block_reason &&
        (!session.users.blocked_until ||
          session.users.blocked_until.getTime() > now.getTime()),
    );

    if (session.users.status !== 'active' && !isBlocked && !blockHasExpired) {
      throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
    }

    return {
      sessionId: session.id,
      userId,
      ...(isBlocked ? { isBlocked: true } : {}),
    };
  }

  async logout(session: AuthenticatedSession): Promise<LogoutResponseDto> {
    const result = await this.prisma.auth_sessions.updateMany({
      where: {
        id: session.sessionId,
        user_id: session.userId,
        revoked_at: null,
      },
      data: { revoked_at: new Date() },
    });

    if (result.count !== 1) {
      throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
    }

    return { message: 'Sesión cerrada correctamente.' };
  }

  private hashTokenId(tokenId: string): string {
    return createHash('sha256').update(tokenId).digest('hex');
  }

  private isAccessTokenPayload(
    payload: AccessTokenPayload,
  ): payload is AccessTokenPayload {
    return (
      payload?.type === 'access' &&
      typeof payload.jti === 'string' &&
      payload.jti.length > 0 &&
      typeof payload.sub === 'string' &&
      /^[1-9]\d*$/.test(payload.sub) &&
      Number.isInteger(payload.iat) &&
      Number.isInteger(payload.exp)
    );
  }
}
