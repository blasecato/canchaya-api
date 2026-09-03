"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const public_user_mapper_1 = require("../users/public-user.mapper");
const auth_config_1 = require("./auth.config");
const INVALID_CREDENTIALS_MESSAGE = 'Credenciales inválidas.';
const INVALID_TOKEN_MESSAGE = 'Token inválido, expirado o revocado.';
const DUMMY_PASSWORD_HASH = '$2b$12$586Ds5J7mmi.nFhCw7LzzuvQ60P5JZcppz9zEJ/fWt8gjK.BaZzVO';
let AuthService = class AuthService {
    prisma;
    jwtService;
    settings;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.settings = (0, auth_config_1.getAuthSettings)(configService);
    }
    async login(loginDto) {
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
                ...public_user_mapper_1.publicUserSelect,
                password_hash: true,
            },
        });
        const passwordIsValid = await (0, bcryptjs_1.compare)(loginDto.password, user?.password_hash ?? DUMMY_PASSWORD_HASH);
        const hasActiveBlock = Boolean(user &&
            user.status === 'inactive' &&
            user.block_reason &&
            (!user.blocked_until || user.blocked_until.getTime() > now.getTime()));
        if (!user ||
            !passwordIsValid ||
            (user.status !== 'active' && !hasActiveBlock)) {
            throw new common_1.UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
        }
        const expiresInSeconds = loginDto.rememberMe
            ? this.settings.rememberMeExpiresInSeconds
            : this.settings.expiresInSeconds;
        const tokenId = (0, node_crypto_1.randomUUID)();
        const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);
        const payload = {
            jti: tokenId,
            sub: user.id.toString(),
            type: 'access',
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
            user: (0, public_user_mapper_1.toPublicUserResponse)(user),
        };
    }
    async validateAccessToken(token) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        if (!this.isAccessTokenPayload(payload)) {
            throw new common_1.UnauthorizedException(INVALID_TOKEN_MESSAGE);
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
        if (!session ||
            session.user_id !== userId ||
            session.revoked_at !== null ||
            session.expires_at.getTime() <= Date.now()) {
            throw new common_1.UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        const now = new Date();
        const blockHasExpired = Boolean(session.users.status === 'inactive' &&
            session.users.block_reason &&
            session.users.blocked_until &&
            session.users.blocked_until.getTime() <= now.getTime());
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
        const isBlocked = Boolean(!blockHasExpired &&
            session.users.status === 'inactive' &&
            session.users.block_reason &&
            (!session.users.blocked_until ||
                session.users.blocked_until.getTime() > now.getTime()));
        if (session.users.status !== 'active' && !isBlocked && !blockHasExpired) {
            throw new common_1.UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        return {
            sessionId: session.id,
            userId,
            ...(isBlocked ? { isBlocked: true } : {}),
        };
    }
    async logout(session) {
        const result = await this.prisma.auth_sessions.updateMany({
            where: {
                id: session.sessionId,
                user_id: session.userId,
                revoked_at: null,
            },
            data: { revoked_at: new Date() },
        });
        if (result.count !== 1) {
            throw new common_1.UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        return { message: 'Sesión cerrada correctamente.' };
    }
    hashTokenId(tokenId) {
        return (0, node_crypto_1.createHash)('sha256').update(tokenId).digest('hex');
    }
    isAccessTokenPayload(payload) {
        return (payload?.type === 'access' &&
            typeof payload.jti === 'string' &&
            payload.jti.length > 0 &&
            typeof payload.sub === 'string' &&
            /^[1-9]\d*$/.test(payload.sub) &&
            Number.isInteger(payload.iat) &&
            Number.isInteger(payload.exp));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map