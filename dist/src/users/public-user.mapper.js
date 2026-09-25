"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicUserSelect = void 0;
exports.toPublicUserResponse = toPublicUserResponse;
exports.publicUserSelect = {
    id: true,
    id_number: true,
    document_type: true,
    full_name: true,
    birth_date: true,
    birth_city: true,
    gender: true,
    email: true,
    phone: true,
    photo_url: true,
    photo_public_id: true,
    document_front_public_id: true,
    document_back_public_id: true,
    status: true,
    identity_verification_status: true,
    blocked_until: true,
    block_reason: true,
    created_at: true,
    updated_at: true,
    user_roles: {
        orderBy: { role_code: 'asc' },
        select: { role_code: true },
    },
};
function toPublicUserResponse(user) {
    const roles = [...new Set(user.user_roles.map(({ role_code }) => role_code))];
    roles.sort();
    return {
        id: user.id.toString(),
        idNumber: user.id_number,
        documentType: user.document_type,
        fullName: user.full_name,
        birthDate: user.birth_date.toISOString().slice(0, 10),
        birthCity: user.birth_city,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photo_url,
        hasIdentityDocuments: Boolean(user.document_front_public_id && user.document_back_public_id),
        status: user.status,
        identityVerificationStatus: user.identity_verification_status,
        blockReason: user.block_reason,
        blockedUntil: user.blocked_until?.toISOString() ?? null,
        roles,
        createdAt: user.created_at.toISOString(),
        updatedAt: user.updated_at.toISOString(),
    };
}
//# sourceMappingURL=public-user.mapper.js.map