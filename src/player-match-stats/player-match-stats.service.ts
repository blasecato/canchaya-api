import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';

@Injectable()
export class PlayerMatchStatsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlayerMatchStatDto: CreatePlayerMatchStatDto) {
    return this.prisma.player_match_stats.create({
      data: {
        match_id: BigInt(createPlayerMatchStatDto.matchId),
        tournament_id: BigInt(createPlayerMatchStatDto.tournamentId),
        team_id: BigInt(createPlayerMatchStatDto.teamId),
        player_id: BigInt(createPlayerMatchStatDto.playerId),
        goals: createPlayerMatchStatDto.goals,
        assists: createPlayerMatchStatDto.assists,
        yellow_cards: createPlayerMatchStatDto.yellowCards,
        red_cards: createPlayerMatchStatDto.redCards,
        minutes_played: createPlayerMatchStatDto.minutesPlayed,
      },
    });
  }

  findAll() {
    return this.prisma.player_match_stats.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: bigint) {
    const playerMatchStat = await this.prisma.player_match_stats.findUnique({
      where: { id },
    });

    if (!playerMatchStat) {
      throw new NotFoundException(
        `No se encontró la estadística de partido con ID ${id}.`,
      );
    }

    return playerMatchStat;
  }

  async update(id: bigint, updatePlayerMatchStatDto: UpdatePlayerMatchStatDto) {
    await this.findOne(id);

    return this.prisma.player_match_stats.update({
      where: { id },
      data: {
        match_id:
          updatePlayerMatchStatDto.matchId !== undefined
            ? BigInt(updatePlayerMatchStatDto.matchId)
            : undefined,
        tournament_id:
          updatePlayerMatchStatDto.tournamentId !== undefined
            ? BigInt(updatePlayerMatchStatDto.tournamentId)
            : undefined,
        team_id:
          updatePlayerMatchStatDto.teamId !== undefined
            ? BigInt(updatePlayerMatchStatDto.teamId)
            : undefined,
        player_id:
          updatePlayerMatchStatDto.playerId !== undefined
            ? BigInt(updatePlayerMatchStatDto.playerId)
            : undefined,
        goals: updatePlayerMatchStatDto.goals,
        assists: updatePlayerMatchStatDto.assists,
        yellow_cards: updatePlayerMatchStatDto.yellowCards,
        red_cards: updatePlayerMatchStatDto.redCards,
        minutes_played: updatePlayerMatchStatDto.minutesPlayed,
      },
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.player_match_stats.delete({ where: { id } });
  }
}
