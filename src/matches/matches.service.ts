import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMatchDto: CreateMatchDto) {
    return this.prisma.matches.create({
      data: {
        tournament_id: BigInt(createMatchDto.tournamentId),
        home_team_id: BigInt(createMatchDto.homeTeamId),
        away_team_id: BigInt(createMatchDto.awayTeamId),
        match_date:
          createMatchDto.matchDate === null
            ? null
            : createMatchDto.matchDate !== undefined
              ? new Date(createMatchDto.matchDate)
              : undefined,
        venue: createMatchDto.venue,
        stage: createMatchDto.stage,
        round_number: createMatchDto.roundNumber,
        home_score: createMatchDto.homeScore,
        away_score: createMatchDto.awayScore,
        status: createMatchDto.status,
        notes: createMatchDto.notes,
      },
    });
  }

  findAll() {
    return this.prisma.matches.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: bigint) {
    const match = await this.prisma.matches.findUnique({ where: { id } });

    if (!match) {
      throw new NotFoundException(`No se encontró el partido con ID ${id}.`);
    }

    return match;
  }

  async update(id: bigint, updateMatchDto: UpdateMatchDto) {
    await this.findOne(id);
    const scheduleChanged =
      updateMatchDto.matchDate !== undefined ||
      updateMatchDto.venue !== undefined ||
      updateMatchDto.status !== undefined;

    return this.prisma.$transaction(async (transaction) => {
      const match = await transaction.matches.update({
        where: { id },
        data: {
          tournament_id:
            updateMatchDto.tournamentId !== undefined
              ? BigInt(updateMatchDto.tournamentId)
              : undefined,
          home_team_id:
            updateMatchDto.homeTeamId !== undefined
              ? BigInt(updateMatchDto.homeTeamId)
              : undefined,
          away_team_id:
            updateMatchDto.awayTeamId !== undefined
              ? BigInt(updateMatchDto.awayTeamId)
              : undefined,
          match_date:
            updateMatchDto.matchDate === null
              ? null
              : updateMatchDto.matchDate !== undefined
                ? new Date(updateMatchDto.matchDate)
                : undefined,
          venue: updateMatchDto.venue,
          stage: updateMatchDto.stage,
          round_number: updateMatchDto.roundNumber,
          home_score: updateMatchDto.homeScore,
          away_score: updateMatchDto.awayScore,
          status: updateMatchDto.status,
          notes: updateMatchDto.notes,
        },
      });

      if (
        scheduleChanged &&
        match.match_date &&
        match.match_date.getTime() >= Date.now()
      ) {
        const assignments = await transaction.match_referees.findMany({
          where: {
            match_id: id,
            assignment_status: { not: 'cancelled' },
          },
          select: { referee_id: true },
        });
        const recipientIds = [
          ...new Set(assignments.map(({ referee_id }) => referee_id)),
        ];
        if (recipientIds.length > 0) {
          const dateLabel = new Intl.DateTimeFormat('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota',
          }).format(match.match_date);
          await transaction.notifications.createMany({
            data: recipientIds.map((userId) => ({
              user_id: userId,
              type: 'match',
              title:
                match.status === 'cancelled'
                  ? 'Un partido asignado fue cancelado'
                  : 'Tu partido asignado fue actualizado',
              message:
                match.status === 'cancelled'
                  ? `El partido programado para el ${dateLabel} fue cancelado.`
                  : `Tu partido quedó programado para el ${dateLabel}${match.venue ? ` en ${match.venue}` : ''}.`,
              entity_type: 'match',
              entity_id: id.toString(),
              metadata: {
                matchId: id.toString(),
                tournamentId: match.tournament_id.toString(),
                actionUrl: '/my-matches',
                actionLabel: 'Ver mis partidos',
              },
            })),
          });
        }
      }

      return match;
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.matches.delete({ where: { id } });
  }
}
