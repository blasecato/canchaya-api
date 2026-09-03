import { ApiProperty } from '@nestjs/swagger';
import { AssociationResponseDto } from './association-response.dto';

export const ASSOCIATION_PERMISSION_LEVELS = [
  'super_admin',
  'owner',
  'administrator',
  'editor',
  'viewer',
] as const;

export type AssociationPermissionLevel =
  (typeof ASSOCIATION_PERMISSION_LEVELS)[number];

export class AssociationPermissionsResponseDto {
  @ApiProperty({ example: true })
  canEdit!: boolean;

  @ApiProperty({
    example: false,
    description:
      'Solo SUPER_ADMIN puede cambiar al propietario de una asociación.',
  })
  canManageOwner!: boolean;

  @ApiProperty({
    example: true,
    description: 'Permite crear y administrar torneos dentro de la asociación.',
  })
  canManageTournaments!: boolean;

  @ApiProperty({ example: true })
  isOwner!: boolean;

  @ApiProperty({ enum: ASSOCIATION_PERMISSION_LEVELS, example: 'owner' })
  permissionLevel!: AssociationPermissionLevel;
}

export class AssociationDetailResponseDto extends AssociationResponseDto {
  @ApiProperty({ type: AssociationPermissionsResponseDto })
  permissions!: AssociationPermissionsResponseDto;
}
