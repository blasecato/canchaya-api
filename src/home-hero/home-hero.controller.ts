import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import {
  HomeHeroSlideResponseDto,
  UpdateHomeHeroSlideDto,
} from './dto/home-hero.dto';
import { HomeHeroService } from './home-hero.service';

const slideUploadOptions = {
  limits: { files: 1, fileSize: MAX_IMAGE_SIZE_BYTES },
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
          'El slider solamente admite imágenes JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

@ApiTags('Home hero')
@Controller()
export class HomeHeroController {
  constructor(private readonly homeHeroService: HomeHeroService) {}

  @Get('public/home/hero-slides')
  @ApiOperation({ summary: 'Consultar los slides del carrusel de inicio' })
  @ApiOkResponse({ type: HomeHeroSlideResponseDto, isArray: true })
  findAll(): Promise<HomeHeroSlideResponseDto[]> {
    return this.homeHeroService.findAll();
  }

  @Patch('home/hero-slides/:slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('image', slideUploadOptions))
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: '#/components/schemas/UpdateHomeHeroSlideDto' },
        {
          type: 'object',
          properties: {
            image: { type: 'string', format: 'binary' },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Editar un slide del carrusel de inicio' })
  @ApiOkResponse({ type: HomeHeroSlideResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'El slide indicado no existe.' })
  update(
    @Param('slug') slug: string,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateHomeHeroSlideDto,
    @UploadedFile() image?: UploadedImageFile,
  ): Promise<HomeHeroSlideResponseDto[]> {
    return this.homeHeroService.update(slug, dto, request.auth.userId, image);
  }
}
