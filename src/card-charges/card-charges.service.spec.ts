import { Prisma } from '../../generated/prisma/client';
import { CardChargesService } from './card-charges.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';

describe('CardChargesService: cobro de tarjetas', () => {
  const tournamentsFindUnique = jest.fn();
  const chargesFindUnique = jest.fn();
  const chargesCreate = jest.fn();
  const chargesUpdate = jest.fn();
  const chargesDelete = jest.fn();
  const notificationsCreate = jest.fn();
  const client = {
    tournaments: { findUnique: tournamentsFindUnique },
    tournament_card_charges: {
      findUnique: chargesFindUnique,
      create: chargesCreate,
      update: chargesUpdate,
      delete: chargesDelete,
    },
    notifications: { create: notificationsCreate },
  } as unknown as PrismaService;
  const service = new CardChargesService(
    client,
    {} as CompetitionAccessService,
  );
  const entry = {
    tournamentId: 7n,
    teamId: 3n,
    playerId: 9n,
    matchId: 44n,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    tournamentsFindUnique.mockResolvedValue({
      name: 'Copa Pitalito',
      yellow_card_fee: new Prisma.Decimal('5000'),
      red_card_fee: new Prisma.Decimal('15000'),
      currency_code: 'COP',
    });
    chargesFindUnique.mockResolvedValue(null);
  });

  it('cobra cada tarjeta con la tarifa del torneo', async () => {
    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 2,
      redCards: 1,
    });

    const [amarilla, roja] = chargesCreate.mock.calls.map(([args]) => args.data);
    expect(amarilla).toMatchObject({
      card_type: 'yellow',
      quantity: 2,
      currency_code: 'COP',
    });
    expect(amarilla.unit_amount.toFixed(2)).toBe('5000.00');
    expect(amarilla.total_amount.toFixed(2)).toBe('10000.00');
    expect(roja.total_amount.toFixed(2)).toBe('15000.00');
  });

  it('avisa al jugador de la deuda recién registrada', async () => {
    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 1,
      redCards: 0,
    });

    expect(notificationsCreate).toHaveBeenCalledTimes(1);
    const aviso = notificationsCreate.mock.calls[0][0].data;
    expect(aviso).toMatchObject({
      user_id: 9n,
      entity_type: 'tournament_card_charge',
      title: 'Tienes una tarjeta amarilla por pagar',
    });
    expect(aviso.message).toContain('Copa Pitalito');
  });

  it('no genera cobro cuando el torneo no cobra esa tarjeta', async () => {
    tournamentsFindUnique.mockResolvedValue({
      name: 'Copa Pitalito',
      yellow_card_fee: new Prisma.Decimal('0'),
      red_card_fee: new Prisma.Decimal('15000'),
      currency_code: 'COP',
    });

    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 3,
      redCards: 0,
    });

    expect(chargesCreate).not.toHaveBeenCalled();
    expect(notificationsCreate).not.toHaveBeenCalled();
  });

  it('ajusta la cantidad al corregir el acta en vez de duplicar la deuda', async () => {
    chargesFindUnique.mockImplementation(({ where }) =>
      where.match_id_player_id_card_type.card_type === 'yellow'
        ? { id: 100n, payment_status: 'pending' }
        : null,
    );

    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 1,
      redCards: 0,
    });

    expect(chargesCreate).not.toHaveBeenCalled();
    expect(chargesUpdate).toHaveBeenCalledTimes(1);
    const data = chargesUpdate.mock.calls[0][0].data;
    expect(data.quantity).toBe(1);
    expect(data.total_amount.toFixed(2)).toBe('5000.00');
  });

  it('borra el cobro pendiente cuando el acta deja al jugador sin tarjetas', async () => {
    chargesFindUnique.mockImplementation(({ where }) =>
      where.match_id_player_id_card_type.card_type === 'yellow'
        ? { id: 100n, payment_status: 'pending' }
        : null,
    );

    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 0,
      redCards: 0,
    });

    expect(chargesDelete).toHaveBeenCalledWith({ where: { id: 100n } });
  });

  it('respeta un cobro ya pagado aunque se corrija el acta', async () => {
    chargesFindUnique.mockResolvedValue({ id: 100n, payment_status: 'paid' });

    await service.syncMatchCards(client, {
      ...entry,
      yellowCards: 0,
      redCards: 0,
    });

    expect(chargesDelete).not.toHaveBeenCalled();
    expect(chargesUpdate).not.toHaveBeenCalled();
  });
});
