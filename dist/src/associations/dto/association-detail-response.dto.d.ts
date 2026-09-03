import { AssociationResponseDto } from './association-response.dto';
export declare const ASSOCIATION_PERMISSION_LEVELS: readonly ["super_admin", "owner", "administrator", "editor", "viewer"];
export type AssociationPermissionLevel = (typeof ASSOCIATION_PERMISSION_LEVELS)[number];
export declare class AssociationPermissionsResponseDto {
    canEdit: boolean;
    canManageOwner: boolean;
    canManageTournaments: boolean;
    isOwner: boolean;
    permissionLevel: AssociationPermissionLevel;
}
export declare class AssociationDetailResponseDto extends AssociationResponseDto {
    permissions: AssociationPermissionsResponseDto;
}
