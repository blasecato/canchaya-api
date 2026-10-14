import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import type {
  CardChargeResponseDto,
  PlayerCardChargesSummaryDto,
  TeamCardChargesResponseDto,
  TournamentCardDebtDto,
} from './dto/card-charge-response.dto';

type CardType = 'yellow' | 'red';

type MatchCardEntry = {
  tournamentId: bigint;
  teamId: bigint;
  playerId: bigint;
  matchId: bigint;
  yellowCards: number;
  redCards: number;
};

@Injectable()
export class CardChargesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  /**
   * Sincroniza la deuda de un jugador en un partido con lo que dice el acta.
   * Se llama al crear, corregir o borrar estadísticas: la cantidad se ajusta en
   * lugar de duplicarse, y un cargo ya pagado nunca se modifica ni se elimina.
   */
  async syncMatchCards(
    client: Prisma.TransactionClient | PrismaService,
    entry: MatchCardEntry,
  ): Promise<void> {
    const tournament = await client.tournaments.findUnique({
      where: { id: entry.tournamentId },
      select: {
        name: true,
        yellow_card_fee: true,
        red_card_fee: true,
        currency_code: true,
      },
    });
    if (!tournament) return;

    const fees: Record<CardType, Prisma.Decimal> = {
      yellow: tournament.yellow_card_fee,
      red: tournament.red_card_fee,
    };
    const quantities: Record<CardType, number> = {
      yellow: Math.max(0, entry.yellowCards),
      red: Math.max(0, entry.redCards),
    };

    for (const cardType of ['yellow', 'red'] as const) {
      const quantity = quantities[cardType];
      const unitAmount = fees[cardType];
      const existing = await client.tournament_card_charges.findUnique({
        where: {
          match_id_player_id_card_type: {
            match_id: entry.matchId,
            player_id: entry.playerId,
            card_type: cardType,
          },
        },
        select: { id: true, payment_status: true },
      });

      // Lo ya cobrado no se toca: corregir el acta después del pago exigiría
      // una devolución, que es una decisión del organizador, no automática.
      if (existing?.payment_status === 'paid') continue;

      if (quantity === 0 || unitAmount.equals(0)) {
        if (existing) {
          await client.tournament_card_charges.delete({
            where: { id: existing.id },
          });
        }
        continue;
      }

      const totalAmount = unitAmount.mul(quantity);
      if (existing) {
        await client.tournament_card_charges.update({
          where: { id: existing.id },
          data: {
            team_id: entry.teamId,
            quantity,
            unit_amount: unitAmount,
            total_amount: totalAmount,
            updated_at: new Date(),
          },
        });
        continue;
      }

      await client.tournament_card_charges.create({
        data: {
          tournament_id: entry.tournamentId,
          team_id: entry.teamId,
          player_id: entry.playerId,
          match_id: entry.matchId,
          card_type: cardType,
          quantity,
          unit_amount: unitAmount,
          total_amount: totalAmount,
          currency_code: tournament.currency_code,
        },
      });
      await this.notifyPlayer(client, entry.playerId, {
        title:
          cardType === 'yellow'
            ? 'Tienes una tarjeta amarilla por pagar'
            : 'Tienes una tarjeta roja por pagar',
        message: `${tournament.name}: ${quantity} tarjeta${quantity === 1 ? '' : 's'} ${cardType === 'yellow' ? 'amarilla' : 'roja'}${quantity === 1 ? '' : 's'} por ${this.formatAmount(totalAmount, tournament.currency_code)}. Paga con el delegado de tu equipo.`,
        entityId: entry.tournamentId,
        metadata: {
          tournamentId: entry.tournamentId.toString(),
          tournamentName: tournament.name,
          cardType,
          quantity,
          amount: totalAmount.toFixed(2),
          currencyCode: tournament.currency_code,
          actionUrl: '/profile',
          actionLabel: 'Ver mis tarjetas',
        },
      });
    }
  }

  /** Borra los cargos pendientes de un acta eliminada. */
  async removeMatchCards(
    client: Prisma.TransactionClient | PrismaService,
    matchId: bigint,
    playerId: bigint,
  ): Promise<void> {
    await client.tournament_card_charges.deleteMany({
      where: { match_id: matchId, player_id: playerId, payment_status: 'pending' },
    });
  }

  async findByTeam(
    tournamentId: bigint,
    teamId: bigint,
    requestingUserId: bigint,
  ): Promise<TeamCardChargesResponseDto> {
    await this.access.assertCanManageTournament(requestingUserId, tournamentId);

    const charges = await this.prisma.tournament_card_charges.findMany({
      where: { tournament_id: tournamentId, team_id: teamId },
      orderBy: [{ payment_status: 'asc' }, { created_at: 'asc' }],
      select: {
        id: true,
        player_id: true,
        match_id: true,
        card_type: true,
        quantity: true,
        unit_amount: true,
        total_amount: true,
        currency_code: true,
        payment_status: true,
        paid_at: true,
        tournament_team_players: {
          select: {
            team_members: {
              select: { users: { select: { full_name: true } } },
            },
          },
        },
        matches: { select: { match_date: true } },
      },
    });

    const players = new Map<string, CardChargeResponseDto>();
    charges.forEach((charge) => {
      const playerId = charge.player_id.toString();
      const current = players.get(playerId) ?? {
        playerId,
        playerName:
          charge.tournament_team_players.team_members.users.full_name,
        currencyCode: charge.currency_code,
        pendingYellowCards: 0,
        pendingRedCards: 0,
        pendingAmount: '0.00',
        paidAmount: '0.00',
        charges: [],
      };

      const isPending = charge.payment_status === 'pending';
      if (isPending) {
        if (charge.card_type === 'yellow') {
          current.pendingYellowCards += charge.quantity;
        } else {
          current.pendingRedCards += charge.quantity;
        }
        current.pendingAmount = new Prisma.Decimal(current.pendingAmount)
          .add(charge.total_amount)
          .toFixed(2);
      } else {
        current.paidAmount = new Prisma.Decimal(current.paidAmount)
          .add(charge.total_amount)
          .toFixed(2);
      }

      current.charges.push({
        id: charge.id.toString(),
        matchId: charge.match_id.toString(),
        matchDate: charge.matches.match_date?.toISOString() ?? null,
        cardType: charge.card_type as CardType,
        quantity: charge.quantity,
        unitAmount: charge.unit_amount.toFixed(2),
        totalAmount: charge.total_amount.toFixed(2),
        paymentStatus: charge.payment_status as 'pending' | 'paid',
        paidAt: charge.paid_at?.toISOString() ?? null,
      });

      players.set(playerId, current);
    });

    const list = [...players.values()].sort((left, right) =>
      left.playerName.localeCompare(right.playerName, 'es'),
    );

    return {
      tournamentId: tournamentId.toString(),
      teamId: teamId.toString(),
      players: list,
      pendingTotal: list
        .reduce(
          (total, player) => total.add(player.pendingAmount),
          new Prisma.Decimal(0),
        )
        .toFixed(2),
      paidTotal: list
        .reduce(
          (total, player) => total.add(player.paidAmount),
          new Prisma.Decimal(0),
        )
        .toFixed(2),
    };
  }

  /** Confirma a cada jugador que su deuda quedó saldada. */
  private async notifySettledPlayers(
    transaction: Prisma.TransactionClient,
    chargeIds: bigint[],
  ): Promise<void> {
    const charges = await transaction.tournament_card_charges.findMany({
      where: { id: { in: chargeIds } },
      select: {
        player_id: true,
        total_amount: true,
        currency_code: true,
        tournament_id: true,
        tournament_team_players: {
          select: {
            tournament_team_registrations: {
              select: { tournaments: { select: { name: true } } },
            },
          },
        },
      },
    });

    // Un solo aviso por jugador y torneo, con el total que acaba de pagar.
    const totals = new Map<
      string,
      {
        playerId: bigint;
        tournamentId: bigint;
        tournamentName: string;
        currencyCode: string;
        amount: Prisma.Decimal;
      }
    >();
    charges.forEach((charge) => {
      const key = `${charge.player_id.toString()}:${charge.tournament_id.toString()}`;
      const current = totals.get(key);
      const amount = current
        ? current.amount.add(charge.total_amount)
        : charge.total_amount;
      totals.set(key, {
        playerId: charge.player_id,
        tournamentId: charge.tournament_id,
        tournamentName:
          charge.tournament_team_players.tournament_team_registrations
            .tournaments.name,
        currencyCode: charge.currency_code,
        amount,
      });
    });

    for (const entry of totals.values()) {
      await this.notifyPlayer(transaction, entry.playerId, {
        title: 'Registramos el pago de tus tarjetas',
        message: `${entry.tournamentName}: quedaron saldadas tus tarjetas por ${this.formatAmount(entry.amount, entry.currencyCode)}.`,
        entityId: entry.tournamentId,
        metadata: {
          tournamentId: entry.tournamentId.toString(),
          tournamentName: entry.tournamentName,
          amount: entry.amount.toFixed(2),
          currencyCode: entry.currencyCode,
          actionUrl: '/profile',
          actionLabel: 'Ver mis tarjetas',
        },
      });
    }
  }

  private formatAmount(amount: Prisma.Decimal, currencyCode: string): string {
    try {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: 0,
      }).format(amount.toNumber());
    } catch {
      return `${amount.toFixed(2)} ${currencyCode}`;
    }
  }

  private async notifyPlayer(
    client: Prisma.TransactionClient | PrismaService,
    playerId: bigint,
    notification: {
      title: string;
      message: string;
      entityId: bigint;
      metadata: Prisma.InputJsonValue;
    },
  ): Promise<void> {
    await client.notifications.create({
      data: {
        user_id: playerId,
        type: 'discipline_compliance',
        title: notification.title,
        message: notification.message,
        entity_type: 'tournament_card_charge',
        entity_id: notification.entityId.toString(),
        metadata: notification.metadata,
      },
    });
  }

  /** Deuda del propio jugador, agrupada por torneo. */
  async findMyCharges(playerId: bigint): Promise<PlayerCardChargesSummaryDto> {
    const charges = await this.prisma.tournament_card_charges.findMany({
      where: { player_id: playerId },
      orderBy: [{ payment_status: 'asc' }, { created_at: 'desc' }],
      select: {
        id: true,
        card_type: true,
        quantity: true,
        unit_amount: true,
        total_amount: true,
        currency_code: true,
        payment_status: true,
        paid_at: true,
        match_id: true,
        matches: { select: { match_date: true } },
        tournament_team_players: {
          select: {
            tournament_team_registrations: {
              select: {
                tournaments: { select: { id: true, name: true } },
                teams: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    const byTournament = new Map<string, TournamentCardDebtDto>();
    charges.forEach((charge) => {
      const registration =
        charge.tournament_team_players.tournament_team_registrations;
      const tournamentId = registration.tournaments.id.toString();
      const current = byTournament.get(tournamentId) ?? {
        tournamentId,
        tournamentName: registration.tournaments.name,
        teamName: registration.teams.name,
        currencyCode: charge.currency_code,
        pendingYellowCards: 0,
        pendingRedCards: 0,
        pendingAmount: '0.00',
        paidAmount: '0.00',
        charges: [],
      };

      if (charge.payment_status === 'pending') {
        if (charge.card_type === 'yellow') {
          current.pendingYellowCards += charge.quantity;
        } else {
          current.pendingRedCards += charge.quantity;
        }
        current.pendingAmount = new Prisma.Decimal(current.pendingAmount)
          .add(charge.total_amount)
          .toFixed(2);
      } else {
        current.paidAmount = new Prisma.Decimal(current.paidAmount)
          .add(charge.total_amount)
          .toFixed(2);
      }

      current.charges.push({
        id: charge.id.toString(),
        matchId: charge.match_id.toString(),
        matchDate: charge.matches.match_date?.toISOString() ?? null,
        cardType: charge.card_type as CardType,
        quantity: charge.quantity,
        unitAmount: charge.unit_amount.toFixed(2),
        totalAmount: charge.total_amount.toFixed(2),
        paymentStatus: charge.payment_status as 'pending' | 'paid',
        paidAt: charge.paid_at?.toISOString() ?? null,
      });

      byTournament.set(tournamentId, current);
    });

    const tournaments = [...byTournament.values()];
    return {
      tournaments,
      pendingTotal: tournaments
        .reduce(
          (total, tournament) => total.add(tournament.pendingAmount),
          new Prisma.Decimal(0),
        )
        .toFixed(2),
    };
  }

  /** Marca cargos como pagados o los devuelve a pendiente. */
  async updatePayment(
    tournamentId: bigint,
    chargeIds: bigint[],
    paid: boolean,
    requestingUserId: bigint,
  ): Promise<{ updated: number }> {
    await this.access.assertCanManageTournament(requestingUserId, tournamentId);

    const charges = await this.prisma.tournament_card_charges.findMany({
      where: { id: { in: chargeIds }, tournament_id: tournamentId },
      select: { id: true },
    });
    if (charges.length !== chargeIds.length) {
      throw new BadRequestException(
        'Alguno de los cobros no pertenece a este torneo.',
      );
    }

    const now = new Date();
    const result = await this.prisma.$transaction(async (transaction) => {
      const updated = await transaction.tournament_card_charges.updateMany({
        where: { id: { in: chargeIds }, tournament_id: tournamentId },
        data: paid
          ? {
              payment_status: 'paid',
              paid_at: now,
              paid_by: requestingUserId,
              updated_at: now,
            }
          : {
              payment_status: 'pending',
              paid_at: null,
              paid_by: null,
              updated_at: now,
            },
      });

      if (paid) await this.notifySettledPlayers(transaction, chargeIds);

      return updated;
    });

    return { updated: result.count };
  }
}
