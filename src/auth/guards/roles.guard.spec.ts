import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  const getAllAndOverride = jest.fn();
  const userRolesFindFirst = jest.fn();
  const reflector = { getAllAndOverride } as unknown as Reflector;
  const prisma = {
    user_roles: { findFirst: userRolesFindFirst },
  } as unknown as PrismaService;
  const rolesGuard = new RolesGuard(reflector, prisma);
  const handler = jest.fn();
  class TestController {}

  function createContext(
    request: Partial<AuthenticatedRequest>,
  ): ExecutionContext {
    return {
      getHandler: () => handler,
      getClass: () => TestController,
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('permite la ruta cuando no declara roles obligatorios', async () => {
    getAllAndOverride.mockReturnValue(undefined);

    await expect(rolesGuard.canActivate(createContext({}))).resolves.toBe(true);
    expect(userRolesFindFirst).not.toHaveBeenCalled();
  });

  it('consulta los roles actuales del usuario autenticado', async () => {
    getAllAndOverride.mockReturnValue(['SUPER_ADMIN']);
    userRolesFindFirst.mockResolvedValue({ role_code: 'SUPER_ADMIN' });

    await expect(
      rolesGuard.canActivate(
        createContext({ auth: { sessionId: 11n, userId: 7n } }),
      ),
    ).resolves.toBe(true);
    expect(userRolesFindFirst).toHaveBeenCalledWith({
      where: {
        user_id: 7n,
        role_code: { in: ['SUPER_ADMIN'] },
      },
      select: { role_code: true },
    });
  });

  it('responde 403 si el rol actual no autoriza la operación', async () => {
    getAllAndOverride.mockReturnValue(['SUPER_ADMIN']);
    userRolesFindFirst.mockResolvedValue(null);

    await expect(
      rolesGuard.canActivate(
        createContext({ auth: { sessionId: 11n, userId: 7n } }),
      ),
    ).rejects.toThrow(
      new ForbiddenException(
        'No tienes permisos suficientes para realizar esta acción.',
      ),
    );
  });

  it('responde 401 si se usa sin un principal autenticado', async () => {
    getAllAndOverride.mockReturnValue(['SUPER_ADMIN']);

    await expect(rolesGuard.canActivate(createContext({}))).rejects.toThrow(
      new UnauthorizedException('Token de acceso requerido.'),
    );
    expect(userRolesFindFirst).not.toHaveBeenCalled();
  });
});
