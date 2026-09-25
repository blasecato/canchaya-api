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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
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
import { AssociationAnnouncementsService } from './association-announcements.service';
import {
  AssociationAnnouncementResponseDto,
  CreateAssociationAnnouncementDto,
  ListAssociationAnnouncementsQueryDto,
  UpdateAssociationAnnouncementDto,
} from './dto/association-announcement.dto';

const announcementUploadOptions = {
  limits: {
    fields: 4,
    files: 1,
    fileSize: MAX_IMAGE_SIZE_BYTES,
    parts: 6,
  },
  fileFilter: (
    _request: unknown,
    file: UploadedImageFile,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(file.mimetype)
    ) {
      callback(
        new BadRequestException(
          'La publicación debe usar una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

@ApiTags('Association announcements')
@ApiBearerAuth('access-token')
@ApiExtraModels(
  CreateAssociationAnnouncementDto,
  UpdateAssociationAnnouncementDto,
)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('associations/:associationId/announcements')
export class AssociationAnnouncementsController {
  constructor(
    private readonly announcementsService: AssociationAnnouncementsService,
  ) {}

  @Get()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE')
  @ApiOperation({
    summary: 'Listar publicaciones visibles o administrables de la asociación',
  })
  @ApiOkResponse({ type: AssociationAnnouncementResponseDto, isArray: true })
  findAll(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Req() request: AuthenticatedRequest,
    @Query() query: ListAssociationAnnouncementsQueryDto,
  ) {
    return this.announcementsService.findAll(
      associationId,
      request.auth.userId,
      query.scope,
    );
  }

  @Post()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @UseInterceptors(FileInterceptor('image', announcementUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateAssociationAnnouncementDto) },
        {
          type: 'object',
          required: ['image'],
          properties: {
            image: {
              type: 'string',
              format: 'binary',
              description: 'Flyer JPEG, PNG o WebP de máximo 2 MB.',
            },
          },
        },
      ],
    },
  })
  @ApiCreatedResponse({ type: AssociationAnnouncementResponseDto })
  create(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateAssociationAnnouncementDto,
    @UploadedFile() image?: UploadedImageFile,
  ) {
    if (!image) {
      throw new BadRequestException(
        'Selecciona la imagen o flyer de la publicación.',
      );
    }
    return this.announcementsService.create(
      associationId,
      request.auth.userId,
      dto,
      image,
    );
  }

  @Patch(':announcementId')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @UseInterceptors(FileInterceptor('image', announcementUploadOptions))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(UpdateAssociationAnnouncementDto) },
        {
          type: 'object',
          properties: {
            image: { type: 'string', format: 'binary' },
          },
        },
      ],
    },
  })
  @ApiOkResponse({ type: AssociationAnnouncementResponseDto })
  update(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Param('announcementId', ParseBigIntPipe) announcementId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateAssociationAnnouncementDto,
    @UploadedFile() image?: UploadedImageFile,
  ) {
    return this.announcementsService.update(
      associationId,
      announcementId,
      request.auth.userId,
      dto,
      image,
    );
  }

  @Delete(':announcementId')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOkResponse({ type: AssociationAnnouncementResponseDto })
  remove(
    @Param('associationId', ParseBigIntPipe) associationId: bigint,
    @Param('announcementId', ParseBigIntPipe) announcementId: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.announcementsService.remove(
      associationId,
      announcementId,
      request.auth.userId,
    );
  }
}
