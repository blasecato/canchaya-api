import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import {
  REQUIRED_ROLES_KEY,
  type RoleCode,
} from '../decorators/require-roles.decorator';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<readonly RoleCode[]>(
      REQUIRED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.auth) {
      throw new UnauthorizedException('Token de acceso requerido.');
    }

    const currentRole = await this.prisma.user_roles.findFirst({
      where: {
        user_id: request.auth.userId,
        role_code: { in: [...requiredRoles] },
      },
      select: { role_code: true },
    });

    if (!currentRole) {
      throw new ForbiddenException(
        'No tienes permisos suficientes para realizar esta acción.',
      );
    }

    return true;
  }
}
