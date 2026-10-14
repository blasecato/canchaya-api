import { Prisma } from '../../generated/prisma/client';
import {
  associationTournamentResponseSelect,
  toAssociationTournamentResponse,
} from '../associations/association-tournament-response.mapper';
import { TournamentCatalogItemResponseDto } from './dto/tournament-catalog-response.dto';

export const tournamentCatalogItemSelect = {
  ...associationTournamentResponseSelect,
  created_by: true,
  associations: {
    select: {
      id: true,
      name: true,
      logo_url: true,
      users: { select: { full_name: true } },
    },
  },
} satisfies Prisma.tournamentsSelect;

export type TournamentCatalogItemRecord = Prisma.tournamentsGetPayload<{
  select: typeof tournamentCatalogItemSelect;
}>;

export function toTournamentCatalogItemResponse(
  tournament: TournamentCatalogItemRecord,
  canManage = false,
): TournamentCatalogItemResponseDto {
  return {
    ...toAssociationTournamentResponse(tournament),
    association: {
      id: tournament.associations.id.toString(),
      name: tournament.associations.name,
      logoUrl: tournament.associations.logo_url,
      ownerName: tournament.associations.users.full_name,
    },
    canManage,
  };
}
