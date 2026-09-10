export type TournamentEligibilityRules = {
    name: string;
    startDate: Date;
    categoryName: string;
    minAge: number | null;
    maxAge: number | null;
    gender: string;
};
export type TournamentEligibilityPlayer = {
    fullName: string;
    birthDate: Date;
    gender: string | null;
};
export declare function calculateAgeOnDate(birthDate: Date, referenceDate: Date): number;
export declare function getTournamentEligibilityIssues(tournament: TournamentEligibilityRules, players: TournamentEligibilityPlayer[]): string[];
export declare function formatTournamentEligibilityError(tournament: TournamentEligibilityRules, issues: string[]): string;
