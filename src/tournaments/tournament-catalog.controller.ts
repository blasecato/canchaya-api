import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { TournamentSponsorResponseDto } from '../associations/dto/association-tournament-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { ListTournamentsQueryDto } from './dto/list-tournaments-query.dto';
import { TournamentLifecycleResponseDto } from './dto/tournament-lifecycle-response.dto';
import { TransitionTournamentDto } from './dto/transition-tournament.dto';
import {
  TournamentCatalogFiltersResponseDto,
  TournamentCatalogItemResponseDto,
  TournamentDetailResponseDto,
  TournamentRulesResponseDto,
  TournamentCatalogPageResponseDto,
} from './dto/tournament-catalog-response.dto';
import { TournamentsService } from './tournaments.service';
import { TournamentLifecycleService } from './tournament-lifecycle.service';
import { UpdateTournamentRulesDto } from './dto/update-tournament-rules.dto';
import { TournamentSponsorInputDto } from './dto/tournament-sponsor-input.dto';
import { ReviewTeamRegistrationDto } from './dto/review-team-registration.dto';
import {
  TournamentPaymentsResponseDto,
  TournamentRegistrationPaymentResponseDto,
  UpdateRegistrationPaymentDto,
} from './dto/registration-payment.dto';
import {
  CaptainTeamOptionResponseDto,
  RegisterTeamDto,
  TeamRegistrationResponseDto,
} from './dto/register-team.dto';

const sponsorLogoUploadOptions = {
  limits: { files: 1, fileSize: MAX_IMAGE_SIZE_BYTES, fields: 20, parts: 22 },
  fileFilter: (
    _request: unknown,
    file: { mimetype: string },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(file.mimetype)
    ) {
      callback(
        new BadRequestException(
          'El logo debe ser una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

@ApiTags('Tournament catalog')
@ApiExtraModels(TournamentSponsorInputDto)
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
  description: 'Token de acceso ausente, inválido, expirado o revocado.',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER')
@Controller('tournaments')
export class TournamentCatalogController {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly tournamentLifecycleService: TournamentLifecycleService,
  ) {}

  @Get('filters')
  @ApiOperation({ summary: 'Consultar opciones del catálogo de torneos' })
  @ApiOkResponse({ type: TournamentCatalogFiltersResponseDto })
  findFilterOptions(): Promise<TournamentCatalogFiltersResponseDto> {
    return this.tournamentsService.findCatalogFilterOptions();
  }

  @Get('mine')
  @RequireRoles('PLAYER', 'REFEREE')
  @ApiOperation({
    summary:
      'Listar torneos del usuario como jugador inscrito o árbitro asignado',
  })
  @ApiOkResponse({ type: TournamentCatalogItemResponseDto, isArray: true })
  findMine(
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentCatalogItemResponseDto[]> {
    return this.tournamentsService.findMine(request.auth.userId);
  }

  @Get()
  @ApiOperation({
    summary:
      'Listar torneos de todas las asociaciones con filtros y paginación',
  })
  @ApiOkResponse({ type: TournamentCatalogPageResponseDto })
  findCatalog(
    @Query() query: ListTournamentsQueryDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentCatalogPageResponseDto> {
    return this.tournamentsService.findCatalog(query, request.auth.userId);
  }

  @Get(':tournamentId')
  @ApiOperation({ summary: 'Consultar el perfil completo de un torneo por ID' })
  @ApiParam({ name: 'tournamentId', example: '12', type: String })
  @ApiOkResponse({ type: TournamentDetailResponseDto })
  @ApiNotFoundResponse({ description: 'El torneo solicitado no existe.' })
  findCatalogOne(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentDetailResponseDto> {
    return this.tournamentsService.findCatalogOne(
      tournamentId,
      request.auth.userId,
    );
  }

  @Get(':tournamentId/lifecycle')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Consultar el ciclo de vida y sus requisitos' })
  @ApiOkResponse({ type: TournamentLifecycleResponseDto })
  findLifecycle(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentLifecycleResponseDto> {
    return this.tournamentLifecycleService.findLifecycle(
      tournamentId,
      request.auth.userId,
    );
  }

  @Patch(':tournamentId/lifecycle')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Avanzar o cancelar el ciclo de vida del torneo' })
  @ApiOkResponse({ type: TournamentLifecycleResponseDto })
  transitionLifecycle(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: TransitionTournamentDto,
  ): Promise<TournamentLifecycleResponseDto> {
    return this.tournamentLifecycleService.transition(
      tournamentId,
      request.auth.userId,
      dto,
    );
  }

  @Get(':tournamentId/sponsors')
  @ApiOperation({
    summary: 'Listar los patrocinadores administrables de un torneo',
  })
  @ApiOkResponse({ type: TournamentSponsorResponseDto, isArray: true })
  findSponsors(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentSponsorResponseDto[]> {
    return this.tournamentsService.findSponsors(
      tournamentId,
      request.auth.userId,
    );
  }

  @Post(':tournamentId/sponsors')
  @UseInterceptors(FileInterceptor('logo', sponsorLogoUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(TournamentSponsorInputDto) },
        {
          type: 'object',
          properties: {
            logo: { type: 'string', format: 'binary' },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Agregar un patrocinador a un torneo' })
  @ApiCreatedResponse({ type: TournamentSponsorResponseDto })
  createSponsor(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: TournamentSponsorInputDto,
    @UploadedFile() logo?: UploadedImageFile,
  ): Promise<TournamentSponsorResponseDto> {
    return this.tournamentsService.createSponsor(
      tournamentId,
      request.auth.userId,
      dto,
      logo,
    );
  }

  @Patch(':tournamentId/sponsors/:sponsorId')
  @UseInterceptors(FileInterceptor('logo', sponsorLogoUploadOptions))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation({ summary: 'Editar un patrocinador vinculado a un torneo' })
  @ApiOkResponse({ type: TournamentSponsorResponseDto })
  updateSponsor(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('sponsorId', ParseBigIntPipe) sponsorId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: TournamentSponsorInputDto,
    @UploadedFile() logo?: UploadedImageFile,
  ): Promise<TournamentSponsorResponseDto> {
    return this.tournamentsService.updateSponsor(
      tournamentId,
      sponsorId,
      request.auth.userId,
      dto,
      logo,
    );
  }

  @Delete(':tournamentId/sponsors/:sponsorId')
  @ApiOperation({ summary: 'Retirar un patrocinador de un torneo' })
  @ApiOkResponse({ schema: { example: { sponsorId: '3' } } })
  removeSponsor(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('sponsorId', ParseBigIntPipe) sponsorId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<{ sponsorId: string }> {
    return this.tournamentsService.removeSponsor(
      tournamentId,
      sponsorId,
      request.auth.userId,
    );
  }

  @Get(':tournamentId/captain-teams')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Listar los equipos del usuario disponibles para inscripción',
  })
  @ApiOkResponse({ type: CaptainTeamOptionResponseDto, isArray: true })
  findCaptainTeams(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<CaptainTeamOptionResponseDto[]> {
    return this.tournamentsService.findCaptainTeams(
      tournamentId,
      request.auth.userId,
    );
  }

  @Post(':tournamentId/registrations')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({ summary: 'Solicitar la inscripción de un equipo al torneo' })
  @ApiOkResponse({ type: TeamRegistrationResponseDto })
  registerTeam(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: RegisterTeamDto,
  ): Promise<TeamRegistrationResponseDto> {
    return this.tournamentsService.registerTeam(
      tournamentId,
      BigInt(dto.teamId),
      request.auth.userId,
    );
  }

  @Get(':tournamentId/payments')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({
    summary: 'Consultar el estado financiero de las inscripciones del torneo',
  })
  @ApiOkResponse({ type: TournamentPaymentsResponseDto })
  findRegistrationPayments(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TournamentPaymentsResponseDto> {
    return this.tournamentsService.findRegistrationPayments(
      tournamentId,
      request.auth.userId,
    );
  }

  @Patch(':tournamentId/registrations/:teamId/payment')
  @RequireRoles('ASSOCIATION_ADMIN')
  @ApiOperation({
    summary:
      'Registrar manualmente el estado del pago de una inscripción aprobada',
  })
  @ApiOkResponse({ type: TournamentRegistrationPaymentResponseDto })
  updateRegistrationPayment(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('teamId', ParseBigIntPipe) teamId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateRegistrationPaymentDto,
  ): Promise<TournamentRegistrationPaymentResponseDto> {
    return this.tournamentsService.updateRegistrationPayment(
      tournamentId,
      teamId,
      request.auth.userId,
      dto,
    );
  }

  @Get(':tournamentId/registrations/:teamId')
  findRegistrationDetail(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('teamId', ParseBigIntPipe) teamId: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tournamentsService.findRegistrationDetail(
      tournamentId,
      teamId,
      request.auth.userId,
    );
  }

  @Patch(':tournamentId/registrations/:teamId')
  reviewRegistration(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('teamId', ParseBigIntPipe) teamId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: ReviewTeamRegistrationDto,
  ) {
    return this.tournamentsService.reviewRegistration(
      tournamentId,
      teamId,
      request.auth.userId,
      dto,
    );
  }

  @Post(':tournamentId/registrations/:teamId/resubmit')
  @RequireRoles('PLAYER')
  resubmitRegistration(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('teamId', ParseBigIntPipe) teamId: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tournamentsService.resubmitRegistration(
      tournamentId,
      teamId,
      request.auth.userId,
    );
  }

  @Patch(':tournamentId/rules')
  @ApiOperation({
    summary: 'Actualizar únicamente el reglamento enriquecido de un torneo',
  })
  @ApiParam({ name: 'tournamentId', example: '12', type: String })
  @ApiOkResponse({ type: TournamentRulesResponseDto })
  @ApiForbiddenResponse({
    description:
      'El usuario no administra la asociación a la que pertenece el torneo.',
  })
  @ApiNotFoundResponse({ description: 'El torneo solicitado no existe.' })
  updateRules(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateTournamentRulesDto: UpdateTournamentRulesDto,
  ): Promise<TournamentRulesResponseDto> {
    return this.tournamentsService.updateRules(
      tournamentId,
      request.auth.userId,
      updateTournamentRulesDto,
    );
  }
}
