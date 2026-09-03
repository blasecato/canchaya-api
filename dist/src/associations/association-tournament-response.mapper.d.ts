import { Prisma } from '../../generated/prisma/client';
import { AssociationTournamentResponseDto } from './dto/association-tournament-response.dto';
export declare const AVAILABLE_TOURNAMENT_EXCLUDED_PHASES: readonly ["draft", "finished", "cancelled"];
export declare const tournamentSponsorResponseSelect: {
    sponsor_id: true;
    sponsorship_level: true;
    contribution_type: true;
    contribution_amount: true;
    currency_code: true;
    contribution_description: true;
    agreement_start_date: true;
    agreement_end_date: true;
    status: true;
    sponsors: {
        select: {
            name: true;
            tax_id: true;
            contact_name: true;
            email: true;
            phone: true;
            website_url: true;
            logo_url: true;
        };
    };
};
export type TournamentSponsorResponseRecord = Prisma.tournament_sponsorsGetPayload<{
    select: typeof tournamentSponsorResponseSelect;
}>;
export declare const associationTournamentResponseSelect: {
    id: true;
    association_id: true;
    name: true;
    description: true;
    sport_type: true;
    modality: true;
    start_date: true;
    end_date: true;
    registration_start_date: true;
    registration_end_date: true;
    registration_fee: true;
    currency_code: true;
    grand_prize: true;
    second_prize: true;
    third_prize: true;
    max_teams: true;
    min_players_per_team: true;
    max_players_per_team: true;
    location_name: true;
    location_address: true;
    rules_url: true;
    rules_content: true;
    photo_url: true;
    photo_public_id: true;
    phase: true;
    status: true;
    created_at: true;
    updated_at: true;
    tournament_types: {
        select: {
            id: true;
            name: true;
            description: true;
            min_players_per_team: true;
            max_players_per_team: true;
            instructions: true;
        };
    };
    tournament_sponsors: {
        orderBy: ({
            created_at: "asc";
            sponsor_id?: undefined;
        } | {
            sponsor_id: "asc";
            created_at?: undefined;
        })[];
        select: {
            sponsor_id: true;
            sponsorship_level: true;
            contribution_type: true;
            contribution_amount: true;
            currency_code: true;
            contribution_description: true;
            agreement_start_date: true;
            agreement_end_date: true;
            status: true;
            sponsors: {
                select: {
                    name: true;
                    tax_id: true;
                    contact_name: true;
                    email: true;
                    phone: true;
                    website_url: true;
                    logo_url: true;
                };
            };
        };
    };
    _count: {
        select: {
            tournament_team_registrations: {
                where: {
                    request_status: string;
                };
            };
        };
    };
};
export type AssociationTournamentResponseRecord = Prisma.tournamentsGetPayload<{
    select: typeof associationTournamentResponseSelect;
}>;
export declare function toAssociationTournamentResponse(tournament: AssociationTournamentResponseRecord): AssociationTournamentResponseDto;
export declare function toTournamentSponsorResponse(relation: TournamentSponsorResponseRecord): AssociationTournamentResponseDto['sponsors'][number];
