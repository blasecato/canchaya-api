import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ALLOW_BLOCKED_USER_KEY } from '../decorators/allow-blocked-user.decorator';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Token de acceso requerido.');
    }

    request.auth = await this.authService.validateAccessToken(token);

    const allowsBlockedUser =
      this.reflector.getAllAndOverride<boolean>(ALLOW_BLOCKED_USER_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? false;

    if (request.auth.isBlocked && !allowsBlockedUser) {
      throw new ForbiddenException(
        'Tu cuenta está bloqueada. Solo puedes consultar tu perfil y tus notificaciones.',
      );
    }

    return true;
  }

  private extractBearerToken(authorization?: string): string | undefined {
    const [type, token, extra] = authorization?.trim().split(/\s+/) ?? [];

    if (type?.toLowerCase() !== 'bearer' || !token || extra) {
      return undefined;
    }

    return token;
  }
}
