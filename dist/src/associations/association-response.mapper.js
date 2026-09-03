"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associationResponseSelect = void 0;
exports.toAssociationResponse = toAssociationResponse;
exports.associationResponseSelect = {
    id: true,
    name: true,
    description: true,
    city: true,
    address: true,
    tax_id: true,
    email: true,
    phone: true,
    logo_url: true,
    logo_public_id: true,
    cover_url: true,
    cover_public_id: true,
    owner_user_id: true,
    status: true,
    created_at: true,
    updated_at: true,
    users: {
        select: {
            id: true,
            full_name: true,
            email: true,
            phone: true,
        },
    },
    association_administrators: {
        where: { status: 'active' },
        select: { user_id: true, permission_level: true },
    },
    _count: {
        select: { tournaments: true },
    },
};
function toAssociationResponse(association, teamCount) {
    const administratorIds = new Set([
        association.owner_user_id,
        ...association.association_administrators.map(({ user_id }) => user_id),
    ]);
    return {
        id: association.id.toString(),
        name: association.name,
        description: association.description,
        city: association.city,
        address: association.address,
        taxId: association.tax_id,
        email: association.email,
        phone: association.phone,
        logoUrl: association.logo_url,
        coverUrl: association.cover_url,
        status: association.status,
        owner: {
            id: association.users.id.toString(),
            fullName: association.users.full_name,
            email: association.users.email,
            phone: association.users.phone,
        },
        tournamentCount: association._count.tournaments,
        teamCount,
        administratorCount: administratorIds.size,
        createdAt: association.created_at.toISOString(),
        updatedAt: association.updated_at.toISOString(),
    };
}
//# sourceMappingURL=association-response.mapper.js.map