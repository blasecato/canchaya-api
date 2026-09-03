import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentTypeDto } from './dto/create-tournament-type.dto';
import { TournamentTypeResponseDto } from './dto/tournament-type-response.dto';
import { UpdateTournamentTypeDto } from './dto/update-tournament-type.dto';

const tournamentTypeSelect = {
  id: true,
  name: true,
  description: true,
  min_players_per_team: true,
  max_players_per_team: true,
  instructions: true,
  created_at: true,
  updated_at: true,
  _count: { select: { tournaments: true } },
} satisfies Prisma.tournament_typesSelect;

type TournamentTypeRecord = Prisma.tournament_typesGetPayload<{
  select: typeof tournamentTypeSelect;
}>;

@Injectable()
export class TournamentTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateTournamentTypeDto,
  ): Promise<TournamentTypeResponseDto> {
    this.assertPlayerRange(dto.minPlayersPerTeam, dto.maxPlayersPerTeam);
    await this.assertUniqueName(dto.name);
    const tournamentType = await this.prisma.tournament_types.create({
      data: {
        name: dto.name,
        description: dto.description ?? null,
        min_players_per_team: dto.minPlayersPerTeam,
        max_players_per_team: dto.maxPlayersPerTeam,
        instructions: dto.instructions ?? null,
      },
      select: tournamentTypeSelect,
    });
    return this.toResponse(tournamentType);
  }

  async findAll(): Promise<TournamentTypeResponseDto[]> {
    const tournamentTypes = await this.prisma.tournament_types.findMany({
      orderBy: [{ name: 'asc' }, { id: 'asc' }],
      select: tournamentTypeSelect,
    });
    return tournamentTypes.map((item) => this.toResponse(item));
  }

  async findOne(id: bigint): Promise<TournamentTypeResponseDto> {
    return this.toResponse(await this.findRecord(id));
  }

  async update(
    id: bigint,
    dto: UpdateTournamentTypeDto,
  ): Promise<TournamentTypeResponseDto> {
    const current = await this.findRecord(id);
    const minimum = dto.minPlayersPerTeam ?? current.min_players_per_team;
    const maximum = dto.maxPlayersPerTeam ?? current.max_players_per_team;
    this.assertPlayerRange(minimum, maximum);
    await this.assertExistingTournamentsFitRange(id, minimum, maximum);
    if (dto.name && dto.name !== current.name) {
      await this.assertUniqueName(dto.name, id);
    }
    const tournamentType = await this.prisma.tournament_types.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        min_players_per_team: dto.minPlayersPerTeam,
        max_players_per_team: dto.maxPlayersPerTeam,
        instructions: dto.instructions,
        updated_at: new Date(),
      },
      select: tournamentTypeSelect,
    });
    return this.toResponse(tournamentType);
  }

  async remove(id: bigint): Promise<TournamentTypeResponseDto> {
    const current = await this.findRecord(id);
    if (current._count.tournaments > 0) {
      throw new BadRequestException(
        `No se puede eliminar porque ${current._count.tournaments} torneo(s) utilizan este tipo.`,
      );
    }
    await this.prisma.tournament_types.delete({ where: { id } });
    return this.toResponse(current);
  }

  private async findRecord(id: bigint) {
    const tournamentType = await this.prisma.tournament_types.findUnique({
      where: { id },
      select: tournamentTypeSelect,
    });
    if (!tournamentType) {
      throw new NotFoundException(
        `El tipo de torneo con ID ${id.toString()} no existe.`,
      );
    }
    return tournamentType;
  }

  private assertPlayerRange(minimum: number, maximum: number): void {
    if (minimum > maximum) {
      throw new BadRequestException(
        'El mínimo de jugadores no puede ser mayor que el máximo.',
      );
    }
  }

  private async assertUniqueName(name: string, excludedId?: bigint) {
    const duplicate = await this.prisma.tournament_types.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        ...(excludedId ? { id: { not: excludedId } } : {}),
      },
      select: { id: true },
    });
    if (duplicate) {
      throw new ConflictException(
        'Ya existe un tipo de torneo con ese nombre.',
      );
    }
  }

  private async assertExistingTournamentsFitRange(
    tournamentTypeId: bigint,
    minimum: number,
    maximum: number,
  ): Promise<void> {
    const incompatibleTournament = await this.prisma.tournaments.findFirst({
      where: {
        tournament_type_id: tournamentTypeId,
        OR: [
          { min_players_per_team: { lt: minimum } },
          { max_players_per_team: { gt: maximum } },
        ],
      },
      orderBy: { id: 'asc' },
      select: {
        name: true,
        min_players_per_team: true,
        max_players_per_team: true,
      },
    });
    if (incompatibleTournament) {
      throw new BadRequestException(
        `No puedes aplicar ese rango porque ${incompatibleTournament.name} está configurado entre ${incompatibleTournament.min_players_per_team} y ${incompatibleTournament.max_players_per_team} jugadores.`,
      );
    }
  }

  private toResponse(
    tournamentType: TournamentTypeRecord,
  ): TournamentTypeResponseDto {
    return {
      id: tournamentType.id.toString(),
      name: tournamentType.name,
      description: tournamentType.description,
      minPlayersPerTeam: tournamentType.min_players_per_team,
      maxPlayersPerTeam: tournamentType.max_players_per_team,
      instructions: tournamentType.instructions,
      tournamentCount: tournamentType._count.tournaments,
      createdAt: tournamentType.created_at.toISOString(),
      updatedAt: tournamentType.updated_at.toISOString(),
    };
  }
}
