import { ApiProperty } from '@nestjs/swagger';

/** Datos mínimos de una organización para la página pública «Nosotros». */
export class PublicAssociationResponseDto {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'Liga Deportiva Laboyana' })
  name!: string;

  @ApiProperty({ example: 'Pitalito', nullable: true, type: String })
  city!: string | null;

  @ApiProperty({ nullable: true, type: String })
  logoUrl!: string | null;

  @ApiProperty({
    example: 'Laura Martínez',
    description: 'Administrador responsable.',
  })
  ownerName!: string;
}
