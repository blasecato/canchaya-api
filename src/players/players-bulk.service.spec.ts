import { PlayersService } from './players.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { BulkCreatePlayersDto } from './dto/bulk-create-players.dto';

describe('PlayersService: carga masiva de jugadores', () => {
  const usersFindMany = jest.fn();
  const usersCreate = jest.fn();
  const rolesCreate = jest.fn();
  const prisma = {
    users: { findMany: usersFindMany },
    $transaction: jest.fn(
      async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          users: { create: usersCreate },
          user_roles: { create: rolesCreate },
        }),
    ),
  } as unknown as PrismaService;
  const service = new PlayersService(prisma, {} as ImageStorageService);

  const row = (overrides: Record<string, unknown> = {}) => ({
    row: 2,
    idNumber: '1000000001',
    documentType: 'CC',
    fullName: 'María Pérez',
    birthDate: '2000-06-20',
    gender: 'female' as const,
    email: 'maria@test.com',
    phone: '3000000000',
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    usersFindMany.mockResolvedValue([]);
    usersCreate.mockResolvedValue({ id: 1n });
  });

  it('registra las filas nuevas y les asigna el rol de jugador', async () => {
    const dto = {
      players: [row(), row({ row: 3, idNumber: '2', email: 'b@test.com' })],
    } as BulkCreatePlayersDto;

    const result = await service.bulkCreate(dto);

    expect(result).toMatchObject({ received: 2, created: 2, skipped: [] });
    expect(usersCreate).toHaveBeenCalledTimes(2);
    expect(rolesCreate.mock.calls[0][0].data.role_code).toBe('PLAYER');
    // Todos comparten la misma clave temporal ya hasheada.
    expect(usersCreate.mock.calls[0][0].data.password_hash).toBe(
      usersCreate.mock.calls[1][0].data.password_hash,
    );
    expect(result.temporaryPassword).toHaveLength(15);
  });

  it('omite a quien ya tiene cuenta y lo informa con su fila', async () => {
    usersFindMany.mockResolvedValue([
      { id_number: '1000000001', email: 'otro@test.com' },
    ]);
    const dto = {
      players: [row(), row({ row: 3, idNumber: '2', email: 'b@test.com' })],
    } as BulkCreatePlayersDto;

    const result = await service.bulkCreate(dto);

    expect(result.created).toBe(1);
    expect(result.skipped).toEqual([
      {
        row: 2,
        idNumber: '1000000001',
        fullName: 'María Pérez',
        reason: 'duplicate_document',
        detail: 'Ya existe una cuenta con ese número de documento.',
      },
    ]);
    expect(usersCreate).toHaveBeenCalledTimes(1);
  });

  it('también omite el correo repetido dentro del mismo archivo', async () => {
    const dto = {
      players: [row(), row({ row: 3, idNumber: '2' })],
    } as BulkCreatePlayersDto;

    const result = await service.bulkCreate(dto);

    expect(result.created).toBe(1);
    expect(result.skipped[0]).toMatchObject({
      row: 3,
      reason: 'duplicate_in_file',
    });
  });

  it('rechaza la carga completa si una fecha de nacimiento es inválida', async () => {
    const dto = {
      players: [row({ birthDate: '2100-01-01' })],
    } as BulkCreatePlayersDto;

    await expect(service.bulkCreate(dto)).rejects.toThrow();
    expect(usersCreate).not.toHaveBeenCalled();
  });
});
