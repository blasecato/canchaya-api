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
exports.CardChargesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const competition_access_service_1 = require("../authorization/competition-access.service");
let CardChargesService = class CardChargesService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async syncMatchCards(client, entry) {
        const tournament = await client.tournaments.findUnique({
            where: { id: entry.tournamentId },
            select: {
                name: true,
                yellow_card_fee: true,
                red_card_fee: true,
                currency_code: true,
            },
        });
        if (!tournament)
            return;
        const fees = {
            yellow: tournament.yellow_card_fee,
            red: tournament.red_card_fee,
        };
        const quantities = {
            yellow: Math.max(0, entry.yellowCards),
            red: Math.max(0, entry.redCards),
        };
        for (const cardType of ['yellow', 'red']) {
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
            if (existing?.payment_status === 'paid')
                continue;
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
                title: cardType === 'yellow'
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
    async removeMatchCards(client, matchId, playerId) {
        await client.tournament_card_charges.deleteMany({
            where: { match_id: matchId, player_id: playerId, payment_status: 'pending' },
        });
    }
    async findByTeam(tournamentId, teamId, requestingUserId) {
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
        const players = new Map();
        charges.forEach((charge) => {
            const playerId = charge.player_id.toString();
            const current = players.get(playerId) ?? {
                playerId,
                playerName: charge.tournament_team_players.team_members.users.full_name,
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
                }
                else {
                    current.pendingRedCards += charge.quantity;
                }
                current.pendingAmount = new client_1.Prisma.Decimal(current.pendingAmount)
                    .add(charge.total_amount)
                    .toFixed(2);
            }
            else {
                current.paidAmount = new client_1.Prisma.Decimal(current.paidAmount)
                    .add(charge.total_amount)
                    .toFixed(2);
            }
            current.charges.push({
                id: charge.id.toString(),
                matchId: charge.match_id.toString(),
                matchDate: charge.matches.match_date?.toISOString() ?? null,
                cardType: charge.card_type,
                quantity: charge.quantity,
                unitAmount: charge.unit_amount.toFixed(2),
                totalAmount: charge.total_amount.toFixed(2),
                paymentStatus: charge.payment_status,
                paidAt: charge.paid_at?.toISOString() ?? null,
            });
            players.set(playerId, current);
        });
        const list = [...players.values()].sort((left, right) => left.playerName.localeCompare(right.playerName, 'es'));
        return {
            tournamentId: tournamentId.toString(),
            teamId: teamId.toString(),
            players: list,
            pendingTotal: list
                .reduce((total, player) => total.add(player.pendingAmount), new client_1.Prisma.Decimal(0))
                .toFixed(2),
            paidTotal: list
                .reduce((total, player) => total.add(player.paidAmount), new client_1.Prisma.Decimal(0))
                .toFixed(2),
        };
    }
    async notifySettledPlayers(transaction, chargeIds) {
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
        const totals = new Map();
        charges.forEach((charge) => {
            const key = `${charge.player_id.toString()}:${charge.tournament_id.toString()}`;
            const current = totals.get(key);
            const amount = current
                ? current.amount.add(charge.total_amount)
                : charge.total_amount;
            totals.set(key, {
                playerId: charge.player_id,
                tournamentId: charge.tournament_id,
                tournamentName: charge.tournament_team_players.tournament_team_registrations
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
    formatAmount(amount, currencyCode) {
        try {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: currencyCode,
                maximumFractionDigits: 0,
            }).format(amount.toNumber());
        }
        catch {
            return `${amount.toFixed(2)} ${currencyCode}`;
        }
    }
    async notifyPlayer(client, playerId, notification) {
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
    async findMyCharges(playerId) {
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
        const byTournament = new Map();
        charges.forEach((charge) => {
            const registration = charge.tournament_team_players.tournament_team_registrations;
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
                }
                else {
                    current.pendingRedCards += charge.quantity;
                }
                current.pendingAmount = new client_1.Prisma.Decimal(current.pendingAmount)
                    .add(charge.total_amount)
                    .toFixed(2);
            }
            else {
                current.paidAmount = new client_1.Prisma.Decimal(current.paidAmount)
                    .add(charge.total_amount)
                    .toFixed(2);
            }
            current.charges.push({
                id: charge.id.toString(),
                matchId: charge.match_id.toString(),
                matchDate: charge.matches.match_date?.toISOString() ?? null,
                cardType: charge.card_type,
                quantity: charge.quantity,
                unitAmount: charge.unit_amount.toFixed(2),
                totalAmount: charge.total_amount.toFixed(2),
                paymentStatus: charge.payment_status,
                paidAt: charge.paid_at?.toISOString() ?? null,
            });
            byTournament.set(tournamentId, current);
        });
        const tournaments = [...byTournament.values()];
        return {
            tournaments,
            pendingTotal: tournaments
                .reduce((total, tournament) => total.add(tournament.pendingAmount), new client_1.Prisma.Decimal(0))
                .toFixed(2),
        };
    }
    async updatePayment(tournamentId, chargeIds, paid, requestingUserId) {
        await this.access.assertCanManageTournament(requestingUserId, tournamentId);
        const charges = await this.prisma.tournament_card_charges.findMany({
            where: { id: { in: chargeIds }, tournament_id: tournamentId },
            select: { id: true },
        });
        if (charges.length !== chargeIds.length) {
            throw new common_1.BadRequestException('Alguno de los cobros no pertenece a este torneo.');
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
            if (paid)
                await this.notifySettledPlayers(transaction, chargeIds);
            return updated;
        });
        return { updated: result.count };
    }
};
exports.CardChargesService = CardChargesService;
exports.CardChargesService = CardChargesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], CardChargesService);
//# sourceMappingURL=card-charges.service.js.map