import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CardChargesService } from './card-charges.service';
import { PlayerCardChargesSummaryDto, TeamCardChargesResponseDto, UpdateCardChargePaymentDto } from './dto/card-charge-response.dto';
export declare class MyCardChargesController {
    private readonly cardCharges;
    constructor(cardCharges: CardChargesService);
    findMine(request: AuthenticatedRequest): Promise<PlayerCardChargesSummaryDto>;
}
export declare class CardChargesController {
    private readonly cardCharges;
    constructor(cardCharges: CardChargesService);
    findByTeam(tournamentId: bigint, teamId: bigint, request: AuthenticatedRequest): Promise<TeamCardChargesResponseDto>;
    updatePayment(tournamentId: bigint, dto: UpdateCardChargePaymentDto, request: AuthenticatedRequest): Promise<{
        updated: number;
    }>;
}
