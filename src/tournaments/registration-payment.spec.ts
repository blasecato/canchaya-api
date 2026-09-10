import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AssociationsService } from '../associations/associations.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { TournamentsService } from './tournaments.service';

jest.mock('sanitize-html', () => ({
  __esModule: true,
  default: (value: string) => value,
}));

it('records a partial payment, its audit event and a supported registration notification', async () => {
  const createEvent = jest.fn();
  const createNotifications = jest.fn();
  const update = jest.fn().mockImplementation(({ data }) => ({
    ...data,
    team_id: 31n,
    teams: { name: 'Equipo' },
    users_tournament_team_registrations_payment_updated_byTousers: {
      id: 1n,
      full_name: 'Administrador',
    },
  }));
  const transaction = {
    tournament_team_registrations: { update },
    tournament_registration_events: { create: createEvent },
    notifications: { createMany: createNotifications },
  };
  const prisma = {
    tournament_team_registrations: {
      findUnique: jest.fn().mockResolvedValue({
        request_status: 'approved',
        requested_by: 12n,
        payment_status: 'unpaid',
        amount_paid: new Prisma.Decimal(0),
        tournaments: {
          name: 'Copa',
          registration_fee: new Prisma.Decimal(200000),
          currency_code: 'COP',
        },
        teams: { name: 'Equipo', captain_user_id: 12n },
      }),
    },
    $transaction: jest.fn(async (callback) => callback(transaction)),
  };
  const access = { assertCanUpdateTournamentPayments: jest.fn() };
  const service = new TournamentsService(
    prisma as unknown as PrismaService,
    {} as AssociationsService,
    {} as ImageStorageService,
    access as unknown as CompetitionAccessService,
  );
  const result = await service.updateRegistrationPayment(62n, 31n, 1n, {
    paymentStatus: 'partial',
    amountPaid: 100000,
    notes: 'falta la mitad',
  });
  expect(access.assertCanUpdateTournamentPayments).toHaveBeenCalledWith(
    1n,
    62n,
  );
  expect(result).toMatchObject({
    paymentStatus: 'partial',
    amountPaid: '100000.00',
    balanceDue: '100000.00',
    notes: 'falta la mitad',
  });
  expect(createEvent).toHaveBeenCalledWith({
    data: expect.objectContaining({
      event_type: 'payment_updated',
      tournament_id: 62n,
      team_id: 31n,
    }),
  });
  expect(createNotifications).toHaveBeenCalledWith({
    data: [
      expect.objectContaining({
        user_id: 12n,
        type: 'tournament_registration',
      }),
    ],
  });
});
