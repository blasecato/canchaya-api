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
var PasswordResetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const mail_service_1 = require("../mail/mail.service");
const prisma_service_1 = require("../prisma/prisma.service");
const GENERIC_REQUEST_MESSAGE = 'Si el correo está registrado enviaremos un código de verificación.';
const INVALID_CODE_MESSAGE = 'El código es inválido o ya expiró.';
const INVALID_RESET_TOKEN_MESSAGE = 'La sesión de recuperación expiró. Solicita un código nuevo.';
const CODE_TTL_MINUTES = 10;
const MAX_CODE_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;
const RESET_TOKEN_TTL_SECONDS = 600;
let PasswordResetService = PasswordResetService_1 = class PasswordResetService {
    prisma;
    jwtService;
    mailService;
    configService;
    logger = new common_1.Logger(PasswordResetService_1.name);
    constructor(prisma, jwtService, mailService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async request(dto, requestedIp) {
        const response = {
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
        if (!user)
            return response;
        const now = new Date();
        const cooldownStart = new Date(now.getTime() - RESEND_COOLDOWN_SECONDS * 1000);
        const recentCode = await this.prisma.password_reset_codes.findFirst({
            where: {
                user_id: user.id,
                consumed_at: null,
                expires_at: { gt: now },
                created_at: { gt: cooldownStart },
            },
            select: { id: true },
        });
        if (recentCode)
            return response;
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
        }
        catch {
            this.logger.error(`No fue posible entregar el código de recuperación al usuario ${user.id.toString()}.`);
        }
        return response;
    }
    async verify(dto) {
        const now = new Date();
        const user = await this.prisma.users.findFirst({
            where: {
                email: { equals: dto.email, mode: 'insensitive' },
                status: 'active',
            },
            select: { id: true },
        });
        if (!user)
            throw new common_1.BadRequestException(INVALID_CODE_MESSAGE);
        const activeCode = await this.prisma.password_reset_codes.findFirst({
            where: {
                user_id: user.id,
                consumed_at: null,
                expires_at: { gt: now },
            },
            orderBy: { id: 'desc' },
            select: { id: true, code_hash: true, attempts: true },
        });
        if (!activeCode)
            throw new common_1.BadRequestException(INVALID_CODE_MESSAGE);
        if (!this.codeMatches(dto.code, activeCode.code_hash)) {
            const attempts = activeCode.attempts + 1;
            const exhausted = attempts >= MAX_CODE_ATTEMPTS;
            await this.prisma.password_reset_codes.update({
                where: { id: activeCode.id },
                data: { attempts, ...(exhausted ? { consumed_at: now } : {}) },
            });
            throw new common_1.BadRequestException(exhausted
                ? 'Superaste los intentos permitidos. Solicita un código nuevo.'
                : INVALID_CODE_MESSAGE);
        }
        const resetToken = await this.jwtService.signAsync({
            sub: user.id.toString(),
            prc: activeCode.id.toString(),
            type: 'password_reset',
        }, { expiresIn: RESET_TOKEN_TTL_SECONDS });
        return { resetToken, expiresIn: RESET_TOKEN_TTL_SECONDS };
    }
    async confirm(dto) {
        let payload;
        try {
            payload =
                await this.jwtService.verifyAsync(dto.resetToken);
        }
        catch {
            throw new common_1.BadRequestException(INVALID_RESET_TOKEN_MESSAGE);
        }
        if (payload?.type !== 'password_reset' ||
            !/^[1-9]\d*$/.test(payload.sub ?? '') ||
            !/^[1-9]\d*$/.test(payload.prc ?? '')) {
            throw new common_1.BadRequestException(INVALID_RESET_TOKEN_MESSAGE);
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
        if (!code)
            throw new common_1.BadRequestException(INVALID_RESET_TOKEN_MESSAGE);
        const passwordHash = await (0, bcryptjs_1.hash)(dto.password, 12);
        await this.prisma.$transaction([
            this.prisma.users.update({
                where: { id: userId },
                data: { password_hash: passwordHash, updated_at: now },
            }),
            this.prisma.password_reset_codes.update({
                where: { id: code.id },
                data: { consumed_at: now },
            }),
            this.prisma.auth_sessions.updateMany({
                where: { user_id: userId, revoked_at: null },
                data: { revoked_at: now },
            }),
        ]);
        return { message: 'Tu contraseña fue actualizada correctamente.' };
    }
    generateCode() {
        return (0, node_crypto_1.randomInt)(0, 1_000_000).toString().padStart(6, '0');
    }
    hashCode(code) {
        const pepper = this.configService.get('JWT_SECRET') ?? '';
        return (0, node_crypto_1.createHash)('sha256').update(`${code}:${pepper}`).digest('hex');
    }
    codeMatches(code, expectedHash) {
        const actual = Buffer.from(this.hashCode(code), 'utf8');
        const expected = Buffer.from(expectedHash, 'utf8');
        return (actual.length === expected.length && (0, node_crypto_1.timingSafeEqual)(actual, expected));
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = PasswordResetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        config_1.ConfigService])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map