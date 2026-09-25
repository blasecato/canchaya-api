"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicAssociationAnnouncementSelect = exports.associationAnnouncementSelect = void 0;
exports.toAssociationAnnouncementResponse = toAssociationAnnouncementResponse;
exports.toPublicAssociationAnnouncementResponse = toPublicAssociationAnnouncementResponse;
exports.associationAnnouncementSelect = {
    id: true,
    association_id: true,
    title: true,
    description: true,
    image_url: true,
    image_public_id: true,
    starts_on: true,
    ends_on: true,
    contact_phone: true,
    address: true,
    registration_fee: true,
    registration_starts_on: true,
    tournament_starts_on: true,
    first_place_prize: true,
    second_place_prize: true,
    created_at: true,
    updated_at: true,
};
exports.publicAssociationAnnouncementSelect = {
    ...exports.associationAnnouncementSelect,
    associations: {
        select: {
            name: true,
            city: true,
            logo_url: true,
        },
    },
};
const toDateValue = (date) => date.toISOString().slice(0, 10);
const toOptionalDateValue = (date) => date ? toDateValue(date) : null;
const toOptionalAmount = (amount) => amount === null ? null : amount.toNumber();
function toAssociationAnnouncementResponse(announcement, today) {
    const visibility = announcement.starts_on > today
        ? 'scheduled'
        : announcement.ends_on < today
            ? 'expired'
            : 'visible';
    return {
        id: announcement.id.toString(),
        associationId: announcement.association_id.toString(),
        title: announcement.title,
        description: announcement.description,
        imageUrl: announcement.image_url,
        startsOn: toDateValue(announcement.starts_on),
        endsOn: toDateValue(announcement.ends_on),
        contactPhone: announcement.contact_phone,
        address: announcement.address,
        registrationFee: toOptionalAmount(announcement.registration_fee),
        registrationStartsOn: toOptionalDateValue(announcement.registration_starts_on),
        tournamentStartsOn: toOptionalDateValue(announcement.tournament_starts_on),
        firstPlacePrize: toOptionalAmount(announcement.first_place_prize),
        secondPlacePrize: toOptionalAmount(announcement.second_place_prize),
        visibility,
        createdAt: announcement.created_at.toISOString(),
        updatedAt: announcement.updated_at.toISOString(),
    };
}
function toPublicAssociationAnnouncementResponse(announcement, today) {
    return {
        ...toAssociationAnnouncementResponse(announcement, today),
        associationName: announcement.associations.name,
        associationCity: announcement.associations.city,
        associationLogoUrl: announcement.associations.logo_url,
    };
}
//# sourceMappingURL=association-announcement.mapper.js.map