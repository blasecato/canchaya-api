import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un rol' })
  @ApiCreatedResponse({ description: 'Rol registrado correctamente.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los roles' })
  @ApiOkResponse({ description: 'Listado de roles.' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Consultar un rol por código' })
  @ApiParam({ name: 'code', example: 'PLAYER' })
  @ApiOkResponse({ description: 'Rol encontrado.' })
  @ApiNotFoundResponse({ description: 'El rol no existe.' })
  findOne(@Param('code') code: string) {
    return this.rolesService.findOne(code);
  }

  @Patch(':code')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiParam({ name: 'code', example: 'PLAYER' })
  @ApiOkResponse({ description: 'Rol actualizado correctamente.' })
  @ApiNotFoundResponse({ description: 'El rol no existe.' })
  update(@Param('code') code: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(code, updateRoleDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiParam({ name: 'code', example: 'PLAYER' })
  @ApiOkResponse({ description: 'Rol eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'El rol no existe.' })
  remove(@Param('code') code: string) {
    return this.rolesService.remove(code);
  }
}
