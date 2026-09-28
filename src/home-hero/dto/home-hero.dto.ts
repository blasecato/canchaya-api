import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class UpdateHomeHeroSlideDto {
  @ApiPropertyOptional({ example: '⚽ La casa del fútbol y más' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(90)
  eyebrow?: string;

  @ApiPropertyOptional({ example: 'Copa' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @ApiPropertyOptional({ example: 'Pitalito' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  accentTitle?: string;

  @ApiPropertyOptional({ example: 'Reúne a tu equipo y compite.' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(320)
  description?: string;

  @ApiPropertyOptional({ example: 'Ver torneos' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(40)
  ctaLabel?: string;

  @ApiPropertyOptional({ example: '/tournaments' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  @Matches(/^\/[\w\-/]*$/, {
    message: 'El enlace debe ser una ruta interna que empiece con "/".',
  })
  ctaTo?: string;

  @ApiPropertyOptional({ example: 'Copa Pitalito' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  thumbnailTitle?: string;
}

export class HomeHeroSlideResponseDto {
  @ApiProperty({ example: 'copa-pitalito' })
  slug!: string;

  @ApiProperty({ example: 2 })
  position!: number;

  @ApiProperty()
  eyebrow!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  accentTitle!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  ctaLabel!: string;

  @ApiProperty({ example: '/tournaments' })
  ctaTo!: string;

  @ApiProperty()
  thumbnailTitle!: string;

  @ApiProperty({
    nullable: true,
    description: 'Nula cuando el slide conserva la imagen incluida en la app.',
  })
  imageUrl!: string | null;
}
