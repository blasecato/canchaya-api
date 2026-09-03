export declare class CreateDisciplinaryActionDto {
    tournamentId: string;
    matchId?: string | null;
    teamId: string;
    playerId: string;
    cardType?: string;
    reason: string;
    occurredAt?: string;
    reportedBy: string;
    decisionStatus?: string;
    decidedBy?: string | null;
    decidedAt?: string | null;
    decisionNotes?: string | null;
}
