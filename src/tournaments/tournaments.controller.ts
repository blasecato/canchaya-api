import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AssociationTournamentResponseDto } from '../associations/dto/association-tournament-response.dto';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentsService } from './tournaments.service';

const PHOTO_SCHEMA = {
  type: 'string',
  format: 'binary',
  description: 'Foto opcional JPEG, PNG o WebP de máximo 2 MB.',
} as const;

const tournamentImageUploadOptions = {
  limits: {
    files: 21,
    fileSize: MAX_IMAGE_SIZE_BYTES,
    // 22 text fields, 3 team limits, and the sponsors JSON field.
    fields: 26,
    // All 26 fields plus the tournament photo and up to 20 sponsor logos.
    parts: 48,
  },
  fileFilter: (
    _request: unknown,
    file: { mimetype: string },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(file.mimetype)
    ) {
      callback(
        new BadRequestException('Las imágenes deben ser JPEG, PNG o WebP.'),
        false,
      );
      return;
    }

    callback(null, true);
  },
};

@ApiTags('Association tournaments')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
  description: 'Token de acceso ausente, inválido, expirado o revocado.',
})
@ApiForbiddenResponse({
  description:
    'El usuario no tiene permisos para administrar torneos en esta asociación.',
})
@ApiExtraModels(CreateTournamentDto, UpdateTournamentDto)
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
@Controller('associations/:associationId/tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'sponsorLogos', maxCount: 20 },
      ],
      tournamentImageUploadOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateTournamentDto) },
        {
          type: 'object',
          properties: {
            photo: PHOTO_SCHEMA,
            sponsorLogos: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Registrar un torneo dentro de una asociación' })
  @ApiParam({ name: 'associationId', example: '1', type: String })
  @ApiCreatedResponse({
    description: 'Torneo registrado correctamente.',
    type: AssociationTournamentResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos, fechas o formato de imagen inválidos.',
  })
  @ApiNotFoundResponse({
    description: 'La asociación o el tipo de torneo no existe.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'La foto supera el límite de 2 MB.',
  })
  create(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() createTournamentDto: CreateTournamentDto,
    @UploadedFiles()
    images?: {
      photo?: UploadedImageFile[];
      sponsorLogos?: UploadedImageFile[];
    },
  ): Promise<AssociationTournamentResponseDto> {
    return this.tournamentsService.create(
      associationId,
      request.auth.userId,
      createTournamentDto,
      images?.photo?.[0],
      images?.sponsorLogos ?? [],
    );
  }

  @Get(':tournamentId')
  @ApiOperation({ summary: 'Consultar un torneo dentro de su asociación' })
  @ApiParam({ name: 'associationId', example: '1', type: String })
  @ApiParam({ name: 'tournamentId', example: '12', type: String })
  @ApiOkResponse({
    description: 'Torneo encontrado.',
    type: AssociationTournamentResponseDto,
  })
  @ApiNotFoundResponse({
    description:
      'El torneo no existe en la asociación o no está disponible para este usuario.',
  })
  findOne(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<AssociationTournamentResponseDto> {
    return this.tournamentsService.findOne(
      associationId,
      tournamentId,
      request.auth.userId,
    );
  }

  @Patch(':tournamentId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'sponsorLogos', maxCount: 20 },
      ],
      tournamentImageUploadOptions,
    ),
  )
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(UpdateTournamentDto) },
        {
          type: 'object',
          properties: {
            photo: PHOTO_SCHEMA,
            sponsorLogos: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Actualizar un torneo de una asociación' })
  @ApiParam({ name: 'associationId', example: '1', type: String })
  @ApiParam({ name: 'tournamentId', example: '12', type: String })
  @ApiOkResponse({
    description: 'Torneo actualizado correctamente.',
    type: AssociationTournamentResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos, fechas o formato de imagen inválidos.',
  })
  @ApiNotFoundResponse({
    description: 'El torneo no existe dentro de la asociación.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'La foto supera el límite de 2 MB.',
  })
  update(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateTournamentDto: UpdateTournamentDto,
    @UploadedFiles()
    images?: {
      photo?: UploadedImageFile[];
      sponsorLogos?: UploadedImageFile[];
    },
  ): Promise<AssociationTournamentResponseDto> {
    return this.tournamentsService.update(
      associationId,
      tournamentId,
      request.auth.userId,
      updateTournamentDto,
      images?.photo?.[0],
      images?.sponsorLogos ?? [],
    );
  }

  @Delete(':tournamentId')
  @ApiOperation({
    summary: 'Eliminar permanentemente un torneo en borrador sin inscripciones',
  })
  @ApiParam({ name: 'associationId', example: '1', type: String })
  @ApiParam({ name: 'tournamentId', example: '12', type: String })
  @ApiOkResponse({
    description: 'Torneo eliminado correctamente.',
    type: AssociationTournamentResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El torneo no es un borrador o ya tiene inscripciones.',
  })
  @ApiNotFoundResponse({
    description: 'El torneo no existe dentro de la asociación.',
  })
  remove(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<AssociationTournamentResponseDto> {
    return this.tournamentsService.remove(
      associationId,
      tournamentId,
      request.auth.userId,
    );
  }
}
