import { Prisma } from '../../generated/prisma/client';
import type {
  AssociationAnnouncementResponseDto,
  AssociationAnnouncementVisibility,
  PublicAssociationAnnouncementResponseDto,
} from './dto/association-announcement.dto';

export const associationAnnouncementSelect = {
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
} satisfies Prisma.association_announcementsSelect;

export type AssociationAnnouncementRecord =
  Prisma.association_announcementsGetPayload<{
    select: typeof associationAnnouncementSelect;
  }>;

export const publicAssociationAnnouncementSelect = {
  ...associationAnnouncementSelect,
  associations: {
    select: {
      name: true,
      city: true,
      logo_url: true,
    },
  },
} satisfies Prisma.association_announcementsSelect;

export type PublicAssociationAnnouncementRecord =
  Prisma.association_announcementsGetPayload<{
    select: typeof publicAssociationAnnouncementSelect;
  }>;

const toDateValue = (date: Date) => date.toISOString().slice(0, 10);

const toOptionalDateValue = (date: Date | null) =>
  date ? toDateValue(date) : null;

const toOptionalAmount = (amount: Prisma.Decimal | null) =>
  amount === null ? null : amount.toNumber();

export function toAssociationAnnouncementResponse(
  announcement: AssociationAnnouncementRecord,
  today: Date,
): AssociationAnnouncementResponseDto {
  const visibility: AssociationAnnouncementVisibility =
    announcement.starts_on > today
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
    registrationStartsOn: toOptionalDateValue(
      announcement.registration_starts_on,
    ),
    tournamentStartsOn: toOptionalDateValue(announcement.tournament_starts_on),
    firstPlacePrize: toOptionalAmount(announcement.first_place_prize),
    secondPlacePrize: toOptionalAmount(announcement.second_place_prize),
    visibility,
    createdAt: announcement.created_at.toISOString(),
    updatedAt: announcement.updated_at.toISOString(),
  };
}

export function toPublicAssociationAnnouncementResponse(
  announcement: PublicAssociationAnnouncementRecord,
  today: Date,
): PublicAssociationAnnouncementResponseDto {
  return {
    ...toAssociationAnnouncementResponse(announcement, today),
    associationName: announcement.associations.name,
    associationCity: announcement.associations.city,
    associationLogoUrl: announcement.associations.logo_url,
  };
}
