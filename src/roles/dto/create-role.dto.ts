import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'PLAYER', description: 'Código único del rol.' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'Jugador', description: 'Nombre único del rol.' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Puede pertenecer a equipos y participar en torneos.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
