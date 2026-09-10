export declare const REGISTRATION_PAYMENT_STATUSES: readonly ["unpaid", "partial", "paid"];
export type RegistrationPaymentStatus = (typeof REGISTRATION_PAYMENT_STATUSES)[number];
export declare class UpdateRegistrationPaymentDto {
    paymentStatus: RegistrationPaymentStatus;
    amountPaid?: number;
    notes?: string | null;
}
export declare class RegistrationPaymentUserResponseDto {
    id: string;
    fullName: string;
}
export declare class TournamentRegistrationPaymentResponseDto {
    teamId: string;
    teamName: string;
    paymentStatus: RegistrationPaymentStatus;
    registrationFee: string;
    amountPaid: string;
    balanceDue: string;
    notes: string | null;
    updatedAt: string | null;
    updatedBy: RegistrationPaymentUserResponseDto | null;
}
export declare class TournamentPaymentSummaryResponseDto {
    totalTeams: number;
    paidTeams: number;
    partialTeams: number;
    unpaidTeams: number;
    expectedAmount: string;
    totalPaid: string;
    totalBalance: string;
    allPaid: boolean;
}
export declare class TournamentPaymentsResponseDto {
    tournamentId: string;
    tournamentName: string;
    currencyCode: string;
    registrationFee: string;
    canUpdate: boolean;
    summary: TournamentPaymentSummaryResponseDto;
    registrations: TournamentRegistrationPaymentResponseDto[];
}
