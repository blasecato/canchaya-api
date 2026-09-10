"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associationTournamentResponseSelect = exports.tournamentSponsorResponseSelect = void 0;
exports.toAssociationTournamentResponse = toAssociationTournamentResponse;
exports.toTournamentSponsorResponse = toTournamentSponsorResponse;
exports.tournamentSponsorResponseSelect = {
    sponsor_id: true,
    sponsorship_level: true,
    contribution_type: true,
    contribution_amount: true,
    currency_code: true,
    contribution_description: true,
    agreement_start_date: true,
    agreement_end_date: true,
    status: true,
    sponsors: {
        select: {
            name: true,
            tax_id: true,
            contact_name: true,
            email: true,
            phone: true,
            website_url: true,
            logo_url: true,
        },
    },
};
exports.associationTournamentResponseSelect = {
    id: true,
    association_id: true,
    name: true,
    description: true,
    sport_type: true,
    modality: true,
    category_name: true,
    category_min_age: true,
    category_max_age: true,
    category_gender: true,
    start_date: true,
    end_date: true,
    registration_start_date: true,
    registration_end_date: true,
    registration_fee: true,
    currency_code: true,
    grand_prize: true,
    second_prize: true,
    third_prize: true,
    max_teams: true,
    min_players_per_team: true,
    max_players_per_team: true,
    location_name: true,
    location_address: true,
    rules_url: true,
    rules_content: true,
    photo_url: true,
    photo_public_id: true,
    phase: true,
    status: true,
    created_at: true,
    updated_at: true,
    tournament_types: {
        select: {
            id: true,
            name: true,
            description: true,
            min_players_per_team: true,
            max_players_per_team: true,
            instructions: true,
        },
    },
    tournament_sponsors: {
        orderBy: [{ created_at: 'asc' }, { sponsor_id: 'asc' }],
        select: exports.tournamentSponsorResponseSelect,
    },
    _count: {
        select: {
            tournament_team_registrations: {
                where: { request_status: 'approved' },
            },
        },
    },
};
function toAssociationTournamentResponse(tournament) {
    return {
        id: tournament.id.toString(),
        associationId: tournament.association_id.toString(),
        name: tournament.name,
        description: tournament.description,
        tournamentType: {
            id: tournament.tournament_types.id.toString(),
            name: tournament.tournament_types.name,
            description: tournament.tournament_types.description,
            minPlayersPerTeam: tournament.tournament_types.min_players_per_team,
            maxPlayersPerTeam: tournament.tournament_types.max_players_per_team,
            instructions: tournament.tournament_types.instructions,
        },
        sportType: tournament.sport_type,
        modality: tournament.modality,
        categoryName: tournament.category_name,
        categoryMinAge: tournament.category_min_age,
        categoryMaxAge: tournament.category_max_age,
        categoryGender: tournament.category_gender,
        startDate: toDateOnly(tournament.start_date),
        endDate: toNullableDateOnly(tournament.end_date),
        registrationStartDate: toNullableDateOnly(tournament.registration_start_date),
        registrationEndDate: toNullableDateOnly(tournament.registration_end_date),
        registrationFee: tournament.registration_fee.toString(),
        currencyCode: tournament.currency_code,
        grandPrize: tournament.grand_prize.toString(),
        secondPrize: tournament.second_prize.toString(),
        thirdPrize: tournament.third_prize.toString(),
        maxTeams: tournament.max_teams,
        minPlayersPerTeam: tournament.min_players_per_team,
        maxPlayersPerTeam: tournament.max_players_per_team,
        registeredTeamCount: tournament._count.tournament_team_registrations,
        locationName: tournament.location_name,
        locationAddress: tournament.location_address,
        rulesUrl: tournament.rules_url,
        rulesContent: tournament.rules_content,
        photoUrl: tournament.photo_url,
        sponsors: tournament.tournament_sponsors.map(toTournamentSponsorResponse),
        phase: tournament.phase,
        status: tournament.status,
        createdAt: tournament.created_at.toISOString(),
        updatedAt: tournament.updated_at.toISOString(),
    };
}
function toTournamentSponsorResponse(relation) {
    return {
        sponsorId: relation.sponsor_id.toString(),
        name: relation.sponsors.name,
        taxId: relation.sponsors.tax_id,
        contactName: relation.sponsors.contact_name,
        email: relation.sponsors.email,
        phone: relation.sponsors.phone,
        websiteUrl: relation.sponsors.website_url,
        logoUrl: relation.sponsors.logo_url,
        sponsorshipLevel: relation.sponsorship_level,
        contributionType: relation.contribution_type,
        contributionAmount: relation.contribution_amount?.toString() ?? null,
        contributionCurrencyCode: relation.currency_code,
        contributionDescription: relation.contribution_description,
        agreementStartDate: toNullableDateOnly(relation.agreement_start_date),
        agreementEndDate: toNullableDateOnly(relation.agreement_end_date),
        status: relation.status,
    };
}
function toDateOnly(value) {
    return value.toISOString().slice(0, 10);
}
function toNullableDateOnly(value) {
    return value === null ? null : toDateOnly(value);
}
//# sourceMappingURL=association-tournament-response.mapper.js.map