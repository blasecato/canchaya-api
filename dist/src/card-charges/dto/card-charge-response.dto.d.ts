export declare class CardChargeItemDto {
    id: string;
    matchId: string;
    matchDate: string | null;
    cardType: 'yellow' | 'red';
    quantity: number;
    unitAmount: string;
    totalAmount: string;
    paymentStatus: 'pending' | 'paid';
    paidAt: string | null;
}
export declare class CardChargeResponseDto {
    playerId: string;
    playerName: string;
    currencyCode: string;
    pendingYellowCards: number;
    pendingRedCards: number;
    pendingAmount: string;
    paidAmount: string;
    charges: CardChargeItemDto[];
}
export declare class TeamCardChargesResponseDto {
    tournamentId: string;
    teamId: string;
    players: CardChargeResponseDto[];
    pendingTotal: string;
    paidTotal: string;
}
export declare class UpdateCardChargePaymentDto {
    chargeIds: string[];
    paid: boolean;
}
export declare class TournamentCardDebtDto {
    tournamentId: string;
    tournamentName: string;
    teamName: string;
    currencyCode: string;
    pendingYellowCards: number;
    pendingRedCards: number;
    pendingAmount: string;
    paidAmount: string;
    charges: CardChargeItemDto[];
}
export declare class PlayerCardChargesSummaryDto {
    tournaments: TournamentCardDebtDto[];
    pendingTotal: string;
}
