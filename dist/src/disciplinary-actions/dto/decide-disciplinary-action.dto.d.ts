export declare class DisciplinarySuspensionDecisionDto {
    matchesCount?: number;
    startDate?: string;
    endDate?: string;
    reason?: string;
}
export declare class DisciplinaryFineDecisionDto {
    amount: number;
    dueDate?: string;
    notes?: string;
}
export declare class DisciplinaryBlockDecisionDto {
    duration: 'one_week' | 'one_month' | 'three_months' | 'six_months' | 'nine_months' | 'one_year';
    reason: string;
}
export declare class DecideDisciplinaryActionDto {
    decision: 'approved' | 'dismissed';
    notes: string;
    suspension?: DisciplinarySuspensionDecisionDto;
    fine?: DisciplinaryFineDecisionDto;
    block?: DisciplinaryBlockDecisionDto;
}
