export declare const SPONSOR_CONTRIBUTION_TYPES: readonly ["money", "products", "services", "mixed"];
export declare const TOURNAMENT_SPONSOR_STATUSES: readonly ["active", "inactive", "completed", "cancelled"];
export declare class TournamentSponsorInputDto {
    sponsorId?: string;
    name: string;
    taxId?: string | null;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    websiteUrl?: string | null;
    logoUrl?: string | null;
    logoFileIndex?: number;
    sponsorshipLevel?: string | null;
    contributionType?: (typeof SPONSOR_CONTRIBUTION_TYPES)[number];
    contributionAmount?: number | null;
    contributionCurrencyCode?: string;
    contributionDescription?: string | null;
    agreementStartDate?: string | null;
    agreementEndDate?: string | null;
    status?: (typeof TOURNAMENT_SPONSOR_STATUSES)[number];
}
export declare class TournamentSponsorsInputDto {
    sponsors?: TournamentSponsorInputDto[];
}
