import { Prisma } from '../../generated/prisma/client';
import type { AssociationAnnouncementResponseDto } from './dto/association-announcement.dto';
export declare const associationAnnouncementSelect: {
    id: true;
    association_id: true;
    title: true;
    description: true;
    image_url: true;
    image_public_id: true;
    starts_on: true;
    ends_on: true;
    contact_phone: true;
    address: true;
    registration_fee: true;
    registration_starts_on: true;
    tournament_starts_on: true;
    first_place_prize: true;
    second_place_prize: true;
    created_at: true;
    updated_at: true;
};
export type AssociationAnnouncementRecord = Prisma.association_announcementsGetPayload<{
    select: typeof associationAnnouncementSelect;
}>;
export declare function toAssociationAnnouncementResponse(announcement: AssociationAnnouncementRecord, today: Date): AssociationAnnouncementResponseDto;
