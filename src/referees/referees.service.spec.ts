import { RefereesService } from './referees.service';
import { PrismaService } from '../prisma/prisma.service';

describe('Disponibilidad automática de árbitros', () => {
  it('considera disponible a quien no tiene asignaciones, sin consultar horarios manuales', async () => {
    const referees = [1n, 2n].map((id) => ({ id, full_name: `Árbitro ${id}` }));
    const findMany = jest
      .fn<Promise<{ referee_id: bigint }[]>, [unknown]>()
      .mockResolvedValue([{ referee_id: 2n }]);
    const manualAvailability = jest.fn();
    const prisma = {
      users: { findMany: jest.fn().mockResolvedValue(referees) },
      match_referees: { groupBy: jest.fn().mockResolvedValue([]), findMany },
      referee_availability: { findMany: manualAvailability },
    } as unknown as PrismaService;
    const result = await new RefereesService(prisma).findAll();
    expect(result.items.map((item) => item.availableToday)).toEqual([
      true,
      false,
    ]);
    expect(result.metrics.availableToday).toBe(1);
    expect(manualAvailability).not.toHaveBeenCalled();
    const query = findMany.mock.calls[0][0] as {
      where: { assignment_status: unknown; matches: { status: unknown } };
    };
    expect(query.where.assignment_status).toEqual({
      in: ['pending', 'accepted'],
    });
    expect(query.where.matches.status).toEqual({
      notIn: ['played', 'cancelled'],
    });
  });
});
