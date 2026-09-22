import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
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
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { AllowBlockedUser } from '../auth/decorators/allow-blocked-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAdministratorsQueryDto } from './dto/list-administrators-query.dto';
import { RegisterPlayerDto } from './dto/register-player.dto';
import { PublicUserResponseDto } from './dto/public-user-response.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { type RegisterPlayerFiles, UsersService } from './users.service';

const userPhotoUploadOptions = {
  limits: { files: 1, fileSize: MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
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
          'La foto de perfil debe ser una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

const profileUpdateBody = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(UpdateUserProfileDto) },
      {
        type: 'object',
        properties: {
          photo: {
            type: 'string',
            format: 'binary',
            description: 'Foto JPEG, PNG o WebP de máximo 2 MB.',
          },
        },
      },
    ],
  },
};

@ApiTags('Users')
@ApiExtraModels(UpdateUserProfileDto, RegisterPlayerDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Registrar un usuario' })
  @ApiCreatedResponse({ description: 'Usuario registrado correctamente.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'documentFront', maxCount: 1 },
        { name: 'documentBack', maxCount: 1 },
      ],
      {
        limits: {
          files: 3,
          fileSize: MAX_IMAGE_SIZE_BYTES,
          fields: 9,
          parts: 12,
        },
        fileFilter: (
          _request: unknown,
          file: { mimetype: string },
          callback: (error: Error | null, acceptFile: boolean) => void,
        ) => {
          if (
            !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(
              file.mimetype,
            )
          ) {
            callback(
              new BadRequestException(
                'Las fotografías deben ser imágenes JPEG, PNG o WebP.',
              ),
              false,
            );
            return;
          }
          callback(null, true);
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(RegisterPlayerDto) },
        {
          type: 'object',
          required: ['photo', 'documentFront', 'documentBack'],
          properties: {
            photo: { type: 'string', format: 'binary' },
            documentFront: { type: 'string', format: 'binary' },
            documentBack: { type: 'string', format: 'binary' },
          },
        },
      ],
    },
  })
  @ApiOperation({
    summary: 'Registrar públicamente una cuenta de jugador verificada',
  })
  @ApiCreatedResponse({
    description: 'Cuenta de jugador verificada y registrada.',
    type: PublicUserResponseDto,
  })
  async register(
    @Body() dto: RegisterPlayerDto,
    @UploadedFiles()
    uploadedFiles: {
      photo?: UploadedImageFile[];
      documentFront?: UploadedImageFile[];
      documentBack?: UploadedImageFile[];
    },
  ): Promise<PublicUserResponseDto> {
    const files = {
      photo: uploadedFiles.photo?.[0],
      documentFront: uploadedFiles.documentFront?.[0],
      documentBack: uploadedFiles.documentBack?.[0],
    };
    if (!files.photo || !files.documentFront || !files.documentBack) {
      throw new BadRequestException(
        'La foto de perfil y las dos caras del documento son obligatorias.',
      );
    }
    return this.usersService.registerPlayer(dto, files as RegisterPlayerFiles);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiOkResponse({
    description: 'Listado público de usuarios con sus roles.',
    type: PublicUserResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Token de acceso inválido.' })
  @ApiForbiddenResponse({
    description: 'Requiere el rol SUPER_ADMIN.',
  })
  findAll(): Promise<PublicUserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get('administrators')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar administradores de la plataforma' })
  @ApiOkResponse({
    description:
      'Listado paginado de superadministradores y administradores de asociación.',
  })
  @ApiUnauthorizedResponse({ description: 'Token de acceso inválido.' })
  @ApiForbiddenResponse({ description: 'Requiere el rol SUPER_ADMIN.' })
  findAdministrators(@Query() query: ListAdministratorsQueryDto) {
    return this.usersService.findAdministrators(query);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @AllowBlockedUser()
  @Header('Cache-Control', 'private, no-store')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Consultar el perfil del usuario autenticado' })
  @ApiOkResponse({
    description: 'Perfil público del usuario autenticado.',
    type: PublicUserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido, expirado o revocado.',
  })
  @ApiNotFoundResponse({ description: 'El usuario no existe.' })
  findMe(@Req() request: AuthenticatedRequest): Promise<PublicUserResponseDto> {
    return this.usersService.findOne(request.auth.userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', userPhotoUploadOptions))
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody(profileUpdateBody)
  @ApiOperation({ summary: 'Actualizar el perfil del usuario autenticado' })
  updateMe(
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateUserProfileDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.usersService.updateProfile(
      request.auth.userId,
      request.auth.userId,
      dto,
      photo,
    );
  }

  @Get(':id/identity-documents/:side')
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, no-store')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Generar acceso temporal a un documento de identidad protegido',
  })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiParam({ name: 'side', enum: ['front', 'back'] })
  getIdentityDocument(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('side') side: string,
    @Req() request: AuthenticatedRequest,
  ) {
    if (side !== 'front' && side !== 'back') {
      throw new BadRequestException(
        'El lado del documento debe ser front o back.',
      );
    }
    return this.usersService.getIdentityDocumentDownload(
      id,
      request.auth.userId,
      side,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Consultar un usuario por ID' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Usuario encontrado.',
    type: PublicUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'El usuario no existe.' })
  @ApiUnauthorizedResponse({ description: 'Token de acceso inválido.' })
  @ApiForbiddenResponse({
    description:
      'Requiere un rol administrativo y acceso al perfil solicitado.',
  })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.usersService.findVisibleProfile(id, request.auth.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @UseInterceptors(FileInterceptor('photo', userPhotoUploadOptions))
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody(profileUpdateBody)
  @ApiOperation({ summary: 'Actualizar un perfil visible por ID' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({ description: 'Usuario actualizado correctamente.' })
  @ApiNotFoundResponse({ description: 'El usuario no existe.' })
  @ApiUnauthorizedResponse({ description: 'Token de acceso inválido.' })
  @ApiForbiddenResponse({
    description:
      'Requiere un rol administrativo y acceso al perfil solicitado.',
  })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateUserProfileDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.usersService.updateProfile(id, request.auth.userId, dto, photo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({ description: 'Usuario eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'El usuario no existe.' })
  @ApiUnauthorizedResponse({ description: 'Token de acceso inválido.' })
  @ApiForbiddenResponse({ description: 'Requiere el rol SUPER_ADMIN.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.usersService.remove(id);
  }
}
