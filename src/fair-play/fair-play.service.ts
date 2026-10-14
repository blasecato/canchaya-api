import { Injectable } from '@nestjs/common';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  FairPlayPlayerDto,
  FairPlayResponseDto,
  FairPlayTeamDto,
} from './dto/fair-play-response.dto';

/** Escala clásica del premio al juego limpio: menos puntos es mejor. */
export const YELLOW_CARD_POINTS = 1;
export const RED_CARD_POINTS = 3;

type TeamRow = {
  team_id: string;
  team_name: string;
  photo_url: string | null;
  yellow_cards: number;
  red_cards: number;
  disciplinary_cards: number;
  matches_played: number;
};

type PlayerRow = {
  team_id: string;
  player_id: string;
  player_name: string;
  yellow_cards: number;
  red_cards: number;
};

@Injectable()
export class FairPlayService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  /**
   * Tarjetas acumuladas por equipo en cualquier tipo de torneo. Se cuentan las
   * del acta del partido (player_match_stats), que es el registro oficial de
   * cada tarjeta mostrada. Quedan fuera los partidos anulados (incluidos los
   * que se anulan al reorganizar el torneo), porque esos se vuelven a jugar.
   */
  async findByTournament(
    tournamentId: bigint,
    requestingUserId: bigint,
  ): Promise<FairPlayResponseDto> {
    await this.access.assertCanViewTournament(requestingUserId, tournamentId);

    const teamRows = await this.prisma.$queryRaw<TeamRow[]>`
      SELECT ttr.team_id::text        AS team_id,
             t.name                   AS team_name,
             t.photo_url              AS photo_url,
             COALESCE(s.yellow_cards, 0)::int       AS yellow_cards,
             COALESCE(s.red_cards, 0)::int          AS red_cards,
             COALESCE(d.disciplinary_cards, 0)::int AS disciplinary_cards,
             COALESCE(p.matches_played, 0)::int     AS matches_played
        FROM tournament_team_registrations ttr
        JOIN teams t ON t.id = ttr.team_id
        LEFT JOIN (
              SELECT pms.team_id,
                     SUM(pms.yellow_cards) AS yellow_cards,
                     SUM(pms.red_cards)    AS red_cards
                FROM player_match_stats pms
                JOIN matches m
                  ON m.id = pms.match_id
                 AND m.tournament_id = pms.tournament_id
               WHERE pms.tournament_id = ${tournamentId}
                 AND m.status <> 'cancelled'
               GROUP BY pms.team_id
             ) s ON s.team_id = ttr.team_id
        LEFT JOIN (
              SELECT da.team_id, COUNT(*) AS disciplinary_cards
                FROM disciplinary_actions da
               WHERE da.tournament_id = ${tournamentId}
                 AND da.card_type IN ('yellow', 'red')
               GROUP BY da.team_id
             ) d ON d.team_id = ttr.team_id
        LEFT JOIN (
              SELECT team_id, COUNT(*) AS matches_played
                FROM (
                      SELECT home_team_id AS team_id
                        FROM matches
                       WHERE tournament_id = ${tournamentId}
                         AND status = 'played'
                      UNION ALL
                      SELECT away_team_id AS team_id
                        FROM matches
                       WHERE tournament_id = ${tournamentId}
                         AND status = 'played'
                     ) played
               GROUP BY team_id
             ) p ON p.team_id = ttr.team_id
       WHERE ttr.tournament_id = ${tournamentId}
         AND ttr.request_status = 'approved'`;

    const playerRows = await this.prisma.$queryRaw<PlayerRow[]>`
      SELECT pms.team_id::text   AS team_id,
             pms.player_id::text AS player_id,
             u.full_name         AS player_name,
             SUM(pms.yellow_cards)::int AS yellow_cards,
             SUM(pms.red_cards)::int    AS red_cards
        FROM player_match_stats pms
        JOIN matches m
          ON m.id = pms.match_id
         AND m.tournament_id = pms.tournament_id
        JOIN users u ON u.id = pms.player_id
       WHERE pms.tournament_id = ${tournamentId}
         AND m.status <> 'cancelled'
         AND (pms.yellow_cards > 0 OR pms.red_cards > 0)
       GROUP BY pms.team_id, pms.player_id, u.full_name
       ORDER BY SUM(pms.red_cards) DESC,
                SUM(pms.yellow_cards) DESC,
                u.full_name`;

    const playersByTeam = new Map<string, FairPlayPlayerDto[]>();
    for (const row of playerRows) {
      const list = playersByTeam.get(row.team_id) ?? [];
      list.push({
        playerId: row.player_id,
        playerName: row.player_name,
        yellowCards: row.yellow_cards,
        redCards: row.red_cards,
      });
      playersByTeam.set(row.team_id, list);
    }

    const teams = teamRows
      .map((row) => {
        const fairPlayPoints =
          row.yellow_cards * YELLOW_CARD_POINTS +
          row.red_cards * RED_CARD_POINTS;
        return {
          position: 0,
          teamId: row.team_id,
          teamName: row.team_name,
          photoUrl: row.photo_url,
          matchesPlayed: row.matches_played,
          yellowCards: row.yellow_cards,
          redCards: row.red_cards,
          totalCards: row.yellow_cards + row.red_cards,
          fairPlayPoints,
          pointsPerMatch:
            row.matches_played > 0
              ? Math.round((fairPlayPoints / row.matches_played) * 100) / 100
              : 0,
          disciplinaryCards: row.disciplinary_cards,
          players: playersByTeam.get(row.team_id) ?? [],
        } satisfies FairPlayTeamDto;
      })
      // Menos puntos primero; a igualdad, menos rojas, menos amarillas y orden
      // alfabético para que la tabla no cambie sola entre consultas.
      .sort(
        (a, b) =>
          a.fairPlayPoints - b.fairPlayPoints ||
          a.redCards - b.redCards ||
          a.yellowCards - b.yellowCards ||
          a.teamName.localeCompare(b.teamName, 'es'),
      )
      .map((team, index) => ({ ...team, position: index + 1 }));

    return {
      tournamentId: tournamentId.toString(),
      yellowCardPoints: YELLOW_CARD_POINTS,
      redCardPoints: RED_CARD_POINTS,
      totalYellowCards: teams.reduce((sum, t) => sum + t.yellowCards, 0),
      totalRedCards: teams.reduce((sum, t) => sum + t.redCards, 0),
      teams,
    };
  }
}
