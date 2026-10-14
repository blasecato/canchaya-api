import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { assignApprovedTeamToCompetition } from '../competition/competition.service';
import { getTemporaryPlayerPassword } from '../players/players.constants';
import { PrismaService } from '../prisma/prisma.service';
import { getTournamentEligibilityIssues } from '../tournaments/tournament-eligibility';
import {
  RosterImportDto,
  RosterImportPlayerDto,
  RosterImportTeamDto,
} from './dto/roster-import.dto';
import {
  RosterImportPlayerResultDto,
  RosterImportResultDto,
  RosterImportTeamResultDto,
  type RosterPlayerOutcome,
} from './dto/roster-import-result.dto';
import {
  ROSTER_POSITIONS_LABEL,
  resolveRosterPosition,
} from './roster-positions.constants';

/** Fases en las que ya no tiene sentido cargar plantillas. */
const CLOSED_PHASES = ['archived', 'cancelled'];

type TournamentContext = Awaited<
  ReturnType<RosterImportService['loadTournament']>
>;

/** Jugador de la hoja ya validado contra la plataforma y el torneo. */
type PreparedPlayer = {
  source: RosterImportPlayerDto;
  idNumber: string;
  email: string;
  position: string;
  jerseyNumber: number | null;
  isCaptain: boolean;
  /** Cuenta existente; null cuando hay que crearla. */
  userId: bigint | null;
  /** Ya estaba en la plantilla de este equipo dentro del torneo. */
  alreadyInRoster: boolean;
};

@Injectable()
export class RosterImportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  /**
   * Carga masiva de equipos y plantillas desde un Excel de varias hojas: cada
   * hoja es un equipo. Cada hoja se procesa en su propia transacción, así una
   * hoja con problemas no arrastra a las demás ni deja cuentas a medio crear.
   */
  async import(
    tournamentId: bigint,
    dto: RosterImportDto,
    actorId: bigint,
  ): Promise<RosterImportResultDto> {
    await this.access.assertCanManageTournament(actorId, tournamentId);
    const tournament = await this.loadTournament(tournamentId);
    if (CLOSED_PHASES.includes(tournament.phase)) {
      throw new BadRequestException(
        'Este torneo está archivado o cancelado: ya no admite nuevas plantillas.',
      );
    }
    if (tournament.status !== 'active') {
      throw new BadRequestException(
        'Activa el torneo antes de cargar equipos y jugadores.',
      );
    }

    const duplicatedSheets = this.findDuplicatedSheets(dto.teams);
    const passwordHash = await hash(getTemporaryPlayerPassword(), 12);
    let createdAnyAccount = false;
    let occupiedSlots = await this.prisma.tournament_team_registrations.count({
      where: {
        tournament_id: tournamentId,
        request_status: { in: ['pending', 'approved'] },
      },
    });

    // Un jugador solo puede quedar en un equipo del torneo: se recuerda en qué
    // hoja apareció primero para explicar el choque en la segunda.
    const documentsInFile = new Map<string, string>();
    const results: RosterImportTeamResultDto[] = [];

    for (const sheet of dto.teams) {
      const teamName = sheet.teamName.trim();
      const duplicatedSheetOwner = duplicatedSheets.get(
        this.normalizeName(teamName),
      );
      if (duplicatedSheetOwner && duplicatedSheetOwner !== sheet.sheetName) {
        results.push(
          this.rejectSheet(
            sheet,
            `El archivo trae otra hoja para el mismo equipo («${duplicatedSheetOwner}»). Deja una sola hoja por equipo.`,
          ),
        );
        continue;
      }

      try {
        const result = await this.importSheet({
          sheet,
          teamName,
          tournament,
          actorId,
          passwordHash,
          documentsInFile,
          occupiedSlots,
        });
        if (result.outcome === 'team_created' || result.outcome === 'team_registered')
          occupiedSlots += 1;
        if (result.playersCreated > 0) createdAnyAccount = true;
        results.push(result);
      } catch (error) {
        // Cualquier fallo inesperado deja la hoja fuera con su motivo, sin
        // tumbar el resto del archivo.
        results.push(
          this.rejectSheet(
            sheet,
            error instanceof Error && error.message
              ? error.message
              : 'No fue posible cargar esta hoja.',
          ),
        );
      }
    }

    return {
      tournamentId: tournamentId.toString(),
      sheetsReceived: dto.teams.length,
      teamsImported: results.filter(({ outcome }) => outcome !== 'rejected')
        .length,
      teamsRejected: results.filter(({ outcome }) => outcome === 'rejected')
        .length,
      playersCreated: results.reduce((sum, t) => sum + t.playersCreated, 0),
      playersLinked: results.reduce((sum, t) => sum + t.playersLinked, 0),
      playersRejected: results.reduce((sum, t) => sum + t.playersRejected, 0),
      availableSlots: Math.max(0, tournament.max_teams - occupiedSlots),
      temporaryPassword: createdAnyAccount ? getTemporaryPlayerPassword() : null,
      teams: results,
    };
  }

  private async loadTournament(tournamentId: bigint) {
    const tournament = await this.prisma.tournaments.findUnique({
      where: { id: tournamentId },
      select: {
        id: true,
        name: true,
        association_id: true,
        phase: true,
        status: true,
        modality: true,
        max_teams: true,
        min_players_per_team: true,
        max_players_per_team: true,
        start_date: true,
        category_name: true,
        category_min_age: true,
        category_max_age: true,
        category_gender: true,
        registration_fee: true,
      },
    });
    if (!tournament) throw new NotFoundException('El torneo solicitado no existe.');
    return tournament;
  }

  private normalizeName = (value: string) =>
    value
      .trim()
      .toLocaleLowerCase('es')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, ' ');

  /** Hojas distintas que apuntan al mismo equipo: solo vale la primera. */
  private findDuplicatedSheets(teams: RosterImportTeamDto[]) {
    const firstSheetByTeam = new Map<string, string>();
    const duplicated = new Map<string, string>();
    for (const sheet of teams) {
      const key = this.normalizeName(sheet.teamName);
      const owner = firstSheetByTeam.get(key);
      if (owner) duplicated.set(key, owner);
      else firstSheetByTeam.set(key, sheet.sheetName);
    }
    return duplicated;
  }

  private rejectSheet(
    sheet: RosterImportTeamDto,
    detail: string,
  ): RosterImportTeamResultDto {
    return {
      sheetName: sheet.sheetName,
      teamName: sheet.teamName.trim(),
      teamId: null,
      outcome: 'rejected',
      detail,
      playersCreated: 0,
      playersLinked: 0,
      playersRejected: sheet.players.length,
      rosterSize: 0,
      players: sheet.players.map((player) => ({
        ...this.toPlayerResult(player, 'rejected', detail),
      })),
    };
  }

  private toPlayerResult(
    player: RosterImportPlayerDto,
    outcome: RosterPlayerOutcome,
    detail: string,
  ): RosterImportPlayerResultDto {
    return {
      row: player.row,
      fullName: player.fullName.trim(),
      documentType: player.documentType.trim().toUpperCase(),
      idNumber: player.idNumber.trim(),
      email: player.email.trim().toLowerCase(),
      position: resolveRosterPosition(player.position),
      jerseyNumber: player.jerseyNumber ?? null,
      isCaptain: Boolean(player.isCaptain),
      outcome,
      detail,
    };
  }

  private async importSheet(input: {
    sheet: RosterImportTeamDto;
    teamName: string;
    tournament: TournamentContext;
    actorId: bigint;
    passwordHash: string;
    documentsInFile: Map<string, string>;
    occupiedSlots: number;
  }): Promise<RosterImportTeamResultDto> {
    const { sheet, teamName, tournament, documentsInFile } = input;

    const team = await this.resolveTeam(teamName);
    if (team === 'ambiguous') {
      return this.rejectSheet(
        sheet,
        `Hay más de un equipo llamado «${teamName}». Agrégalo con el botón «Agregar equipos» para elegir el correcto.`,
      );
    }
    if (team && team.status !== 'active') {
      return this.rejectSheet(
        sheet,
        `El equipo «${team.name}» está inactivo en la plataforma.`,
      );
    }

    const registration = team
      ? await this.prisma.tournament_team_registrations.findUnique({
          where: {
            tournament_id_team_id: {
              tournament_id: tournament.id,
              team_id: team.id,
            },
          },
          select: { request_status: true },
        })
      : null;
    const isRegistered =
      registration !== null &&
      ['pending', 'approved'].includes(registration.request_status);

    if (!isRegistered && input.occupiedSlots >= tournament.max_teams) {
      return this.rejectSheet(
        sheet,
        'El torneo se quedó sin cupos para más equipos.',
      );
    }

    const { prepared, rejected } = await this.preparePlayers({
      sheet,
      tournament,
      team,
      documentsInFile,
    });

    const existingRosterSize = team
      ? await this.prisma.tournament_team_players.count({
          where: { tournament_id: tournament.id, team_id: team.id },
        })
      : 0;
    const newPlayers = prepared.filter(({ alreadyInRoster }) => !alreadyInRoster);
    const rosterSize = existingRosterSize + newPlayers.length;

    if (rosterSize < tournament.min_players_per_team) {
      return this.rejectSheet(
        sheet,
        `La plantilla queda con ${rosterSize} jugador${rosterSize === 1 ? '' : 'es'} y el torneo exige mínimo ${tournament.min_players_per_team}.${
          rejected.length > 0
            ? ` Revisa primero los ${rejected.length} jugador${rejected.length === 1 ? '' : 'es'} con error de esta hoja.`
            : ''
        }`,
      );
    }
    if (rosterSize > tournament.max_players_per_team) {
      return this.rejectSheet(
        sheet,
        `La plantilla queda con ${rosterSize} jugadores y el torneo permite máximo ${tournament.max_players_per_team}.`,
      );
    }

    // El capitán es el marcado en la hoja; si no hay (o quedó rechazado), se
    // toma al primero válido para no perder la carga por ese detalle.
    const markedCaptain = prepared.find(({ isCaptain }) => isCaptain) ?? null;
    const captain = markedCaptain ?? prepared[0] ?? null;
    if (!captain) {
      return this.rejectSheet(
        sheet,
        'Ningún jugador de esta hoja se pudo cargar, así que el equipo no se creó.',
      );
    }

    const written = await this.persistSheet({
      ...input,
      team,
      isRegistered,
      prepared,
      captain,
      markedCaptain,
      rosterSize,
    });

    return {
      sheetName: sheet.sheetName,
      teamName,
      teamId: written.teamId.toString(),
      outcome: written.outcome,
      detail: written.detail,
      playersCreated: written.created.length,
      playersLinked: written.linked.length,
      playersRejected: rejected.length,
      rosterSize,
      players: [
        ...prepared.map((player) =>
          this.toPlayerResult(
            player.source,
            player.alreadyInRoster
              ? 'already_in_team'
              : written.created.includes(player)
                ? 'created'
                : 'linked',
            player.alreadyInRoster
              ? 'Ya estaba en la plantilla de este equipo para el torneo.'
              : written.created.includes(player)
                ? 'Cuenta creada con la clave temporal; quedó en el equipo y en el torneo.'
                : 'Ya tenía cuenta en la plataforma; quedó en el equipo y en el torneo.',
          ),
        ),
        ...rejected,
      ].sort((left, right) => left.row - right.row),
    };
  }

  /** Un equipo por nombre: ninguno, uno, o varios (ambiguo). */
  private async resolveTeam(teamName: string) {
    const candidates = await this.prisma.teams.findMany({
      where: { name: { equals: teamName, mode: 'insensitive' } },
      select: { id: true, name: true, status: true, captain_user_id: true },
      take: 2,
    });
    if (candidates.length > 1) return 'ambiguous' as const;
    return candidates[0] ?? null;
  }

  /**
   * Valida cada fila contra la plataforma y las reglas del torneo. No escribe
   * nada: devuelve quién entra y quién queda fuera, con el motivo exacto.
   */
  private async preparePlayers(input: {
    sheet: RosterImportTeamDto;
    tournament: TournamentContext;
    team: { id: bigint; name: string } | null;
    documentsInFile: Map<string, string>;
  }): Promise<{
    prepared: PreparedPlayer[];
    rejected: RosterImportPlayerResultDto[];
  }> {
    const { sheet, tournament, team, documentsInFile } = input;
    const prepared: PreparedPlayer[] = [];
    const rejected: RosterImportPlayerResultDto[] = [];
    const reject = (player: RosterImportPlayerDto, detail: string) =>
      rejected.push(this.toPlayerResult(player, 'rejected', detail));

    const documentsInSheet = new Set<string>();
    const emailsInSheet = new Set<string>();
    const jerseysInSheet = new Set<number>();
    let captainsInSheet = 0;

    const documents = sheet.players.map(({ idNumber }) => idNumber.trim());
    const emails = sheet.players.map(({ email }) => email.trim().toLowerCase());
    const [existingUsers, rosterRows, teamJerseys] = await Promise.all([
      this.prisma.users.findMany({
        where: {
          OR: [
            { id_number: { in: documents } },
            { email: { in: emails, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          id_number: true,
          email: true,
          full_name: true,
          status: true,
          block_reason: true,
        },
      }),
      this.prisma.tournament_team_players.findMany({
        where: { tournament_id: tournament.id },
        select: {
          player_id: true,
          team_id: true,
          tournament_team_registrations: {
            select: { teams: { select: { name: true } } },
          },
        },
      }),
      team
        ? this.prisma.tournament_team_players.findMany({
            where: {
              tournament_id: tournament.id,
              team_id: team.id,
              jersey_number: { not: null },
            },
            select: { jersey_number: true, player_id: true },
          })
        : Promise.resolve([]),
    ]);

    const userByDocument = new Map(
      existingUsers.map((user) => [user.id_number, user]),
    );
    const userByEmail = new Map(
      existingUsers.map((user) => [user.email.toLowerCase(), user]),
    );
    const rosterByPlayer = new Map(
      rosterRows.map((row) => [row.player_id.toString(), row]),
    );
    // Quién lleva cada número hoy: así un jugador puede repetir el suyo al
    // volver a cargar la hoja, pero no quitárselo a otro.
    const jerseyOwners = new Map(
      teamJerseys.flatMap(({ jersey_number, player_id }) =>
        jersey_number === null ? [] : [[jersey_number, player_id.toString()]],
      ),
    );

    for (const player of sheet.players) {
      const fullName = player.fullName.trim();
      const idNumber = player.idNumber.trim();
      const email = player.email.trim().toLowerCase();

      const position = resolveRosterPosition(player.position);
      if (!position) {
        reject(
          player,
          `${fullName}: la posición «${player.position}» no es válida. Usa una de estas: ${ROSTER_POSITIONS_LABEL}.`,
        );
        continue;
      }

      if (documentsInSheet.has(idNumber)) {
        reject(player, `${fullName}: esta hoja repite el documento ${idNumber}.`);
        continue;
      }
      if (emailsInSheet.has(email)) {
        reject(player, `${fullName}: esta hoja repite el correo ${email}.`);
        continue;
      }
      const otherSheet = documentsInFile.get(idNumber);
      if (otherSheet) {
        reject(
          player,
          `${fullName}: ya aparece en la hoja «${otherSheet}». Un jugador solo puede estar en un equipo del torneo.`,
        );
        continue;
      }

      const byDocumentForJersey = userByDocument.get(idNumber);
      if (player.jerseyNumber !== undefined && player.jerseyNumber !== null) {
        if (jerseysInSheet.has(player.jerseyNumber)) {
          reject(
            player,
            `${fullName}: el número ${player.jerseyNumber} ya lo lleva otro jugador de esta hoja.`,
          );
          continue;
        }
        const owner = jerseyOwners.get(player.jerseyNumber);
        if (owner && owner !== byDocumentForJersey?.id.toString()) {
          reject(
            player,
            `${fullName}: el número ${player.jerseyNumber} ya está asignado a otro jugador de la plantilla.`,
          );
          continue;
        }
      }

      const birthDate = new Date(`${player.birthDate}T00:00:00.000Z`);
      if (Number.isNaN(birthDate.getTime())) {
        reject(player, `${fullName}: la fecha de nacimiento no es válida.`);
        continue;
      }
      const eligibilityIssues = getTournamentEligibilityIssues(
        {
          name: tournament.name,
          startDate: tournament.start_date,
          categoryName: tournament.category_name,
          minAge: tournament.category_min_age,
          maxAge: tournament.category_max_age,
          gender: tournament.category_gender,
        },
        [{ fullName, birthDate, gender: player.gender }],
      );
      if (eligibilityIssues.length > 0) {
        reject(player, eligibilityIssues.join(' '));
        continue;
      }

      const byDocument = userByDocument.get(idNumber);
      const byEmail = userByEmail.get(email);
      if (!byDocument && byEmail) {
        reject(
          player,
          `${fullName}: el correo ${email} ya pertenece a la cuenta de ${byEmail.full_name} (documento ${byEmail.id_number}).`,
        );
        continue;
      }
      if (byDocument && byDocument.status !== 'active') {
        reject(
          player,
          `${fullName}: su cuenta está bloqueada${byDocument.block_reason ? ` (${byDocument.block_reason})` : ''}.`,
        );
        continue;
      }

      let alreadyInRoster = false;
      if (byDocument) {
        const roster = rosterByPlayer.get(byDocument.id.toString());
        if (roster) {
          if (!team || roster.team_id !== team.id) {
            reject(
              player,
              `${fullName}: ya está inscrito en este torneo con ${roster.tournament_team_registrations.teams.name}.`,
            );
            continue;
          }
          alreadyInRoster = true;
        }
      }

      if (player.isCaptain) {
        captainsInSheet += 1;
        if (captainsInSheet > 1) {
          reject(
            player,
            `${fullName}: la hoja marca más de un capitán. Deja solo uno.`,
          );
          continue;
        }
      }

      documentsInSheet.add(idNumber);
      emailsInSheet.add(email);
      documentsInFile.set(idNumber, sheet.sheetName);
      if (player.jerseyNumber !== undefined && player.jerseyNumber !== null)
        jerseysInSheet.add(player.jerseyNumber);

      prepared.push({
        source: player,
        idNumber,
        email,
        position,
        jerseyNumber: player.jerseyNumber ?? null,
        isCaptain: Boolean(player.isCaptain),
        userId: byDocument?.id ?? null,
        alreadyInRoster,
      });
    }

    return { prepared, rejected };
  }

  /** Escribe la hoja completa: cuentas, equipo, inscripción y plantilla. */
  private async persistSheet(input: {
    sheet: RosterImportTeamDto;
    teamName: string;
    tournament: TournamentContext;
    actorId: bigint;
    passwordHash: string;
    team: { id: bigint; name: string; captain_user_id: bigint } | null;
    isRegistered: boolean;
    prepared: PreparedPlayer[];
    captain: PreparedPlayer;
    markedCaptain: PreparedPlayer | null;
    rosterSize: number;
  }) {
    const {
      tournament,
      actorId,
      passwordHash,
      prepared,
      captain,
      markedCaptain,
      teamName,
      isRegistered,
      rosterSize,
    } = input;
    const created: PreparedPlayer[] = [];
    const linked: PreparedPlayer[] = [];

    return this.prisma.$transaction(async (tx) => {
      for (const player of prepared) {
        if (player.userId) {
          if (!player.alreadyInRoster) linked.push(player);
          continue;
        }
        const user = await tx.users.create({
          data: {
            id_number: player.idNumber,
            document_type: player.source.documentType.trim().toUpperCase(),
            full_name: player.source.fullName.trim(),
            birth_date: new Date(`${player.source.birthDate}T00:00:00.000Z`),
            gender: player.source.gender,
            email: player.email,
            phone: player.source.phone?.trim() || null,
            password_hash: passwordHash,
            status: 'active',
          },
          select: { id: true },
        });
        player.userId = user.id;
        created.push(player);
      }

      // Cualquier cuenta usada en una plantilla debe poder entrar como jugador.
      await tx.user_roles.createMany({
        data: prepared.map((player) => ({
          user_id: player.userId!,
          role_code: 'PLAYER',
        })),
        skipDuplicates: true,
      });

      let teamId = input.team?.id ?? null;
      let teamCreated = false;
      if (!teamId) {
        const captainUserId = captain.userId;
        if (!captainUserId) {
          throw new BadRequestException(
            'La hoja no tiene jugadores válidos para crear el equipo.',
          );
        }
        const team = await tx.teams.create({
          data: {
            name: teamName,
            sport_type: 'Fútbol',
            modality: tournament.modality,
            captain_user_id: captainUserId,
            created_by: actorId,
            status: 'active',
          },
          select: { id: true },
        });
        teamId = team.id;
        teamCreated = true;
      }

      await tx.team_members.createMany({
        data: prepared.map((player) => ({
          team_id: teamId!,
          user_id: player.userId!,
          member_role: 'player',
          status: 'active',
        })),
        skipDuplicates: true,
      });
      // Un integrante que estaba inactivo vuelve a quedar activo al cargarlo.
      await tx.team_members.updateMany({
        where: {
          team_id: teamId,
          user_id: { in: prepared.map((player) => player.userId!) },
          status: { not: 'active' },
        },
        data: { status: 'active' },
      });

      if (!isRegistered) {
        await tx.tournament_team_registrations.create({
          data: {
            tournament_id: tournament.id,
            association_id: tournament.association_id,
            team_id: teamId,
            requested_by: actorId,
            request_status: 'approved',
            reviewed_by: actorId,
            reviewed_at: new Date(),
            review_notes: 'Equipo cargado desde un archivo de plantillas.',
            payment_status: tournament.registration_fee.equals(0)
              ? 'paid'
              : 'unpaid',
          },
        });
        await tx.tournament_registration_events.create({
          data: {
            tournament_id: tournament.id,
            team_id: teamId,
            actor_user_id: actorId,
            event_type: 'approved',
            message: 'Equipo cargado masivamente por la organización.',
          },
        });
      }

      // Capitán del torneo: el marcado en la hoja; si no vino, el capitán que
      // ya tiene el equipo y, para un equipo nuevo, el primero de la hoja.
      const rosterCaptainId =
        markedCaptain?.userId ?? input.team?.captain_user_id ?? captain.userId;
      // Volver a cargar la hoja corrige la ficha de quien ya estaba inscrito.
      for (const player of prepared.filter((p) => p.alreadyInRoster)) {
        await tx.tournament_team_players.update({
          where: {
            tournament_id_team_id_player_id: {
              tournament_id: tournament.id,
              team_id: teamId,
              player_id: player.userId!,
            },
          },
          data: {
            position: player.position,
            jersey_number: player.jerseyNumber,
            is_captain: player.userId === rosterCaptainId,
          },
        });
      }
      await tx.tournament_team_players.createMany({
        data: prepared
          .filter(({ alreadyInRoster }) => !alreadyInRoster)
          .map((player) => ({
            tournament_id: tournament.id,
            team_id: teamId!,
            player_id: player.userId!,
            position: player.position,
            jersey_number: player.jerseyNumber,
            is_captain: player.userId === rosterCaptainId,
            registration_status: 'approved',
          })),
        skipDuplicates: true,
      });

      if (!isRegistered) {
        await assignApprovedTeamToCompetition(tx, tournament.id, teamId);
        const captainUserId = input.team?.captain_user_id ?? captain.userId;
        if (captainUserId) {
          await tx.notifications.create({
            data: {
              user_id: captainUserId,
              type: 'tournament_registration',
              title: 'Tu equipo fue inscrito en un torneo',
              message: `${teamName} quedó inscrito en ${tournament.name}.`,
              entity_type: 'tournament_registration',
              entity_id: `${tournament.id.toString()}:${teamId.toString()}`,
              metadata: {
                tournamentId: tournament.id.toString(),
                tournamentName: tournament.name,
                teamId: teamId.toString(),
                teamName,
                status: 'approved',
                actionUrl: `/tournaments/${tournament.id.toString()}`,
                actionLabel: 'Ver torneo',
              },
            },
          });
        }
      }

      const outcome = teamCreated
        ? ('team_created' as const)
        : isRegistered
          ? ('roster_updated' as const)
          : ('team_registered' as const);
      const captainNote = markedCaptain
        ? ''
        : ` Ninguna fila venía marcada como capitán: quedó ${captain.source.fullName.trim()}.`;
      const detail = teamCreated
        ? `Equipo creado e inscrito con ${rosterSize} jugador${rosterSize === 1 ? '' : 'es'}.${captainNote}`
        : isRegistered
          ? `El equipo ya estaba inscrito; su plantilla quedó con ${rosterSize} jugador${rosterSize === 1 ? '' : 'es'}.`
          : `El equipo ya existía y quedó inscrito con ${rosterSize} jugador${rosterSize === 1 ? '' : 'es'}.`;

      return { teamId, outcome, detail, created, linked };
    });
  }
}
