import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: {
        code: createRoleDto.code,
        name: createRoleDto.name,
        description: createRoleDto.description,
      },
    });
  }

  findAll() {
    return this.prisma.roles.findMany({ orderBy: { code: 'asc' } });
  }

  async findOne(code: string) {
    const role = await this.prisma.roles.findUnique({ where: { code } });

    if (!role) {
      throw new NotFoundException(`El rol con código ${code} no existe.`);
    }

    return role;
  }

  update(code: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { code },
      data: {
        code: updateRoleDto.code,
        name: updateRoleDto.name,
        description: updateRoleDto.description,
      },
    });
  }

  remove(code: string) {
    return this.prisma.roles.delete({ where: { code } });
  }
}
