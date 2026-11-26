"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentCatalogItemSelect = void 0;
exports.toTournamentCatalogItemResponse = toTournamentCatalogItemResponse;
const association_tournament_response_mapper_1 = require("../associations/association-tournament-response.mapper");
exports.tournamentCatalogItemSelect = {
    ...association_tournament_response_mapper_1.associationTournamentResponseSelect,
    created_by: true,
    associations: {
        select: {
            id: true,
            name: true,
            logo_url: true,
            city: true,
            address: true,
            phone: true,
            email: true,
            users: { select: { full_name: true } },
        },
    },
};
function toTournamentCatalogItemResponse(tournament, canManage = false) {
    return {
        ...(0, association_tournament_response_mapper_1.toAssociationTournamentResponse)(tournament),
        association: {
            id: tournament.associations.id.toString(),
            name: tournament.associations.name,
            logoUrl: tournament.associations.logo_url,
            city: tournament.associations.city,
            address: tournament.associations.address,
            phone: tournament.associations.phone,
            email: tournament.associations.email,
            ownerName: tournament.associations.users.full_name,
        },
        canManage,
    };
}
//# sourceMappingURL=tournament-catalog.mapper.js.map