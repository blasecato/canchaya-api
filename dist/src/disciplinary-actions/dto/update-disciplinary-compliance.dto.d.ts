export declare class UpdateDisciplinaryComplianceDto {
    suspensionStatus?: 'served' | 'revoked';
    fineStatus?: 'paid' | 'waived' | 'cancelled';
    paymentReference?: string;
    notes?: string;
    unblockAccount?: boolean;
}
