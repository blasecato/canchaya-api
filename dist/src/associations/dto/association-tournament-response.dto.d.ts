import { type TournamentCategoryGender } from '../../tournaments/tournament-category.constants';
export declare class AssociationTournamentTypeResponseDto {
    id: string;
    name: string;
    description: string | null;
    minPlayersPerTeam: number;
    maxPlayersPerTeam: number;
    instructions: string | null;
}
export declare class TournamentSponsorResponseDto {
    sponsorId: string;
    name: string;
    taxId: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    websiteUrl: string | null;
    logoUrl: string | null;
    sponsorshipLevel: string | null;
    contributionType: 'money' | 'products' | 'services' | 'mixed';
    contributionAmount: string | null;
    contributionCurrencyCode: string;
    contributionDescription: string | null;
    agreementStartDate: string | null;
    agreementEndDate: string | null;
    status: 'active' | 'inactive' | 'completed' | 'cancelled';
}
export declare class AssociationTournamentResponseDto {
    id: string;
    associationId: string;
    name: string;
    description: string | null;
    tournamentType: AssociationTournamentTypeResponseDto;
    sportType: string;
    modality: string;
    categoryName: string;
    categoryMinAge: number | null;
    categoryMaxAge: number | null;
    categoryGender: TournamentCategoryGender;
    startDate: string;
    endDate: string | null;
    registrationStartDate: string | null;
    registrationEndDate: string | null;
    registrationFee: string;
    currencyCode: string;
    grandPrize: string;
    secondPrize: string;
    thirdPrize: string;
    maxTeams: number;
    minPlayersPerTeam: number;
    maxPlayersPerTeam: number;
    registeredTeamCount: number;
    locationName: string | null;
    locationAddress: string | null;
    rulesUrl: string | null;
    rulesContent: string | null;
    photoUrl: string | null;
    sponsors: TournamentSponsorResponseDto[];
    phase: 'draft' | 'registration' | 'validation' | 'scheduled' | 'in_progress' | 'finished' | 'archived' | 'cancelled';
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}
