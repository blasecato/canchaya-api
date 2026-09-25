export declare class CreateAssociationAnnouncementDto {
    title?: string | null;
    description?: string | null;
    startsOn: string;
    endsOn: string;
    contactPhone?: string | null;
    address?: string | null;
    registrationFee?: number | null;
    registrationStartsOn?: string | null;
    tournamentStartsOn?: string | null;
    firstPlacePrize?: number | null;
    secondPlacePrize?: number | null;
}
declare const UpdateAssociationAnnouncementDto_base: import("@nestjs/common").Type<Partial<CreateAssociationAnnouncementDto>>;
export declare class UpdateAssociationAnnouncementDto extends UpdateAssociationAnnouncementDto_base {
}
export declare const ASSOCIATION_ANNOUNCEMENT_SCOPES: readonly ["visible", "management"];
export type AssociationAnnouncementScope = (typeof ASSOCIATION_ANNOUNCEMENT_SCOPES)[number];
export declare class ListAssociationAnnouncementsQueryDto {
    scope?: AssociationAnnouncementScope;
}
export declare const ASSOCIATION_ANNOUNCEMENT_VISIBILITIES: readonly ["scheduled", "visible", "expired"];
export type AssociationAnnouncementVisibility = (typeof ASSOCIATION_ANNOUNCEMENT_VISIBILITIES)[number];
export declare class AssociationAnnouncementResponseDto {
    id: string;
    associationId: string;
    title: string | null;
    description: string | null;
    imageUrl: string;
    startsOn: string;
    endsOn: string;
    contactPhone: string | null;
    address: string | null;
    registrationFee: number | null;
    registrationStartsOn: string | null;
    tournamentStartsOn: string | null;
    firstPlacePrize: number | null;
    secondPlacePrize: number | null;
    visibility: AssociationAnnouncementVisibility;
    createdAt: string;
    updatedAt: string;
}
export {};
