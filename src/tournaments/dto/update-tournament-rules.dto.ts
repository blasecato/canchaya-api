import { ApiProperty } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

function emptyRulesToNull({ value }: TransformFnParams): unknown {
  if (typeof value !== 'string') return value;
  return value.trim() === '' ? null : value;
}

export class UpdateTournamentRulesDto {
  @ApiProperty({
    example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
    nullable: true,
    maxLength: 100_000,
  })
  @Transform(emptyRulesToNull)
  @IsOptional()
  @IsString()
  @MaxLength(100_000)
  rulesContent!: string | null;
}
