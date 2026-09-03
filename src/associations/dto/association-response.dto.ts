import { ApiProperty } from '@nestjs/swagger';

export class AssociationOwnerResponseDto {
  @ApiProperty({ example: '2', type: String })
  id!: string;

  @ApiProperty({ example: 'Laura Martínez' })
  fullName!: string;

  @ApiProperty({ example: 'laura@example.com', format: 'email' })
  email!: string;

  @ApiProperty({ example: '+573001234567', nullable: true })
  phone!: string | null;
}

export class AssociationResponseDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: 'Liga Distrital de Fútbol' })
  name!: string;

  @ApiProperty({ example: 'Asociación deportiva distrital.', nullable: true })
  description!: string | null;

  @ApiProperty({ example: 'Bogotá' })
  city!: string;

  @ApiProperty({ example: 'Calle 10 # 20-30', nullable: true })
  address!: string | null;

  @ApiProperty({ example: '900123456-7', nullable: true })
  taxId!: string | null;

  @ApiProperty({ example: 'contacto@liga.example', nullable: true })
  email!: string | null;

  @ApiProperty({ example: '+576011234567', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: 'https://example.com/logo.png', nullable: true })
  logoUrl!: string | null;

  @ApiProperty({ example: 'https://example.com/cover.png' })
  coverUrl!: string;

  @ApiProperty({ enum: ['active', 'inactive'], example: 'active' })
  status!: 'active' | 'inactive';

  @ApiProperty({ type: AssociationOwnerResponseDto })
  owner!: AssociationOwnerResponseDto;

  @ApiProperty({ example: 4, minimum: 0 })
  tournamentCount!: number;

  @ApiProperty({ example: 12, minimum: 0 })
  teamCount!: number;

  @ApiProperty({ example: 3, minimum: 1 })
  administratorCount!: number;

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  updatedAt!: string;
}
