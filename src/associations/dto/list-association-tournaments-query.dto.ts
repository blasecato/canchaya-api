import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export const ASSOCIATION_TOURNAMENT_SCOPES = [
  'available',
  'management',
] as const;

export type AssociationTournamentScope =
  (typeof ASSOCIATION_TOURNAMENT_SCOPES)[number];

function trimString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : (value as unknown);
}

export class ListAssociationTournamentsQueryDto {
  @ApiPropertyOptional({
    enum: ASSOCIATION_TOURNAMENT_SCOPES,
    default: 'available',
    description:
      'management incluye borradores, inactivos, finalizados y cancelados, y requiere permisos de administración.',
  })
  @Transform(trimString)
  @IsOptional()
  @IsIn(ASSOCIATION_TOURNAMENT_SCOPES)
  scope?: AssociationTournamentScope;
}
