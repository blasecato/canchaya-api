"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RosterImportService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const competition_access_service_1 = require("../authorization/competition-access.service");
const phone_util_1 = require("../common/utils/phone.util");
const competition_service_1 = require("../competition/competition.service");
const prisma_service_1 = require("../prisma/prisma.service");
const tournament_eligibility_1 = require("../tournaments/tournament-eligibility");
const roster_positions_constants_1 = require("./roster-positions.constants");
const CLOSED_PHASES = ['archived', 'cancelled'];
function phoneVariantsFor(phone) {
    return [
        phone,
        `+57${phone}`,
        `+57 ${phone}`,
        `57${phone}`,
        `+57 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`,
        `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`,
    ];
}
let RosterImportService = class RosterImportService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async import(tournamentId, dto, actorId) {
        await this.access.assertCanManageTournament(actorId, tournamentId);
        const tournament = await this.loadTournament(tournamentId);
        if (CLOSED_PHASES.includes(tournament.phase)) {
            throw new common_1.BadRequestException('Este torneo está archivado o cancelado: ya no admite nuevas plantillas.');
        }
        if (tournament.status !== 'active') {
            throw new common_1.BadRequestException('Activa el torneo antes de cargar equipos y jugadores.');
        }
        const duplicatedSheets = this.findDuplicatedSheets(dto.teams);
        let createdAnyAccount = false;
        let occupiedSlots = await this.prisma.tournament_team_registrations.count({
            where: {
                tournament_id: tournamentId,
                request_status: { in: ['pending', 'approved'] },
            },
        });
        const documentsInFile = new Map();
        const phonesInFile = new Map();
        const results = [];
        for (const sheet of dto.teams) {
            const teamName = sheet.teamName.trim();
            const duplicatedSheetOwner = duplicatedSheets.get(this.normalizeName(teamName));
            if (duplicatedSheetOwner && duplicatedSheetOwner !== sheet.sheetName) {
                results.push(this.rejectSheet(sheet, `El archivo trae otra hoja para el mismo equipo («${duplicatedSheetOwner}»). Deja una sola hoja por equipo.`));
                continue;
            }
            try {
                const result = await this.importSheet({
                    sheet,
                    teamName,
                    tournament,
                    actorId,
                    documentsInFile,
                    phonesInFile,
                    occupiedSlots,
                });
                if (result.outcome === 'team_created' || result.outcome === 'team_registered')
                    occupiedSlots += 1;
                if (result.playersCreated > 0)
                    createdAnyAccount = true;
                results.push(result);
            }
            catch (error) {
                results.push(this.rejectSheet(sheet, error instanceof Error && error.message
                    ? error.message
                    : 'No fue posible cargar esta hoja.'));
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
            temporaryPassword: createdAnyAccount
                ? 'Número de documento de cada jugador'
                : null,
            teams: results,
        };
    }
    async loadTournament(tournamentId) {
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
        if (!tournament)
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        return tournament;
    }
    normalizeName = (value) => value
        .trim()
        .toLocaleLowerCase('es')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, ' ');
    findDuplicatedSheets(teams) {
        const firstSheetByTeam = new Map();
        const duplicated = new Map();
        for (const sheet of teams) {
            const key = this.normalizeName(sheet.teamName);
            const owner = firstSheetByTeam.get(key);
            if (owner)
                duplicated.set(key, owner);
            else
                firstSheetByTeam.set(key, sheet.sheetName);
        }
        return duplicated;
    }
    rejectSheet(sheet, detail, reviewed) {
        const players = reviewed
            ? [
                ...reviewed.prepared.map((player) => this.toPlayerResult(player.source, 'rejected', 'Este jugador cumple los requisitos, pero la hoja completa no se pudo cargar.')),
                ...reviewed.rejected,
            ].sort((left, right) => left.row - right.row)
            : sheet.players.map((player) => this.toPlayerResult(player, 'rejected', detail));
        return {
            sheetName: sheet.sheetName,
            teamName: sheet.teamName.trim(),
            teamId: null,
            outcome: 'rejected',
            detail,
            playersCreated: 0,
            playersLinked: 0,
            playersRejected: players.length,
            rosterSize: 0,
            players,
        };
    }
    toPlayerResult(player, outcome, detail) {
        return {
            row: player.row,
            fullName: player.fullName.trim(),
            documentType: player.documentType.trim().toUpperCase(),
            idNumber: player.idNumber.trim(),
            email: player.email?.trim().toLowerCase() || null,
            phone: (0, phone_util_1.normalizeColombianPhone)(player.phone),
            position: player.position ? (0, roster_positions_constants_1.resolveRosterPosition)(player.position) : null,
            jerseyNumber: player.jerseyNumber ?? null,
            isCaptain: Boolean(player.isCaptain),
            outcome,
            detail,
        };
    }
    async importSheet(input) {
        const { sheet, teamName, tournament, documentsInFile, phonesInFile } = input;
        const team = await this.resolveTeam(teamName);
        if (team === 'ambiguous') {
            return this.rejectSheet(sheet, `Hay más de un equipo llamado «${teamName}». Agrégalo con el botón «Agregar equipos» para elegir el correcto.`);
        }
        if (team && team.status !== 'active') {
            return this.rejectSheet(sheet, `El equipo «${team.name}» está inactivo en la plataforma.`);
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
        const isRegistered = registration !== null &&
            ['pending', 'approved'].includes(registration.request_status);
        if (!isRegistered && input.occupiedSlots >= tournament.max_teams) {
            return this.rejectSheet(sheet, 'El torneo se quedó sin cupos para más equipos.');
        }
        const { prepared, rejected } = await this.preparePlayers({
            sheet,
            tournament,
            team,
            documentsInFile,
            phonesInFile,
        });
        const existingRosterSize = team
            ? await this.prisma.tournament_team_players.count({
                where: { tournament_id: tournament.id, team_id: team.id },
            })
            : 0;
        const newPlayers = prepared.filter(({ alreadyInRoster }) => !alreadyInRoster);
        const rosterSize = existingRosterSize + newPlayers.length;
        if (rosterSize < tournament.min_players_per_team) {
            return this.rejectSheet(sheet, `La plantilla queda con ${rosterSize} jugador${rosterSize === 1 ? '' : 'es'} y el torneo exige mínimo ${tournament.min_players_per_team}.${rejected.length > 0
                ? ` Corrige los ${rejected.length} jugador${rejected.length === 1 ? '' : 'es'} con error que se listan abajo y vuelve a cargar la hoja.`
                : ''}`, { prepared, rejected });
        }
        if (rosterSize > tournament.max_players_per_team) {
            return this.rejectSheet(sheet, `La plantilla queda con ${rosterSize} jugadores y el torneo permite máximo ${tournament.max_players_per_team}.`, { prepared, rejected });
        }
        const markedCaptain = prepared.find(({ isCaptain }) => isCaptain) ?? null;
        const captain = markedCaptain ?? prepared[0] ?? null;
        if (!captain) {
            return this.rejectSheet(sheet, 'Ningún jugador de esta hoja se pudo cargar, así que el equipo no se creó.', { prepared, rejected });
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
                ...prepared.map((player) => this.toPlayerResult(player.source, player.alreadyInRoster
                    ? 'already_in_team'
                    : written.created.includes(player)
                        ? 'created'
                        : 'linked', player.alreadyInRoster
                    ? 'Ya estaba en la plantilla de este equipo para el torneo.'
                    : written.created.includes(player)
                        ? 'Cuenta creada con la clave temporal; quedó en el equipo y en el torneo.'
                        : 'Ya tenía cuenta en la plataforma; quedó en el equipo y en el torneo.')),
                ...rejected,
            ].sort((left, right) => left.row - right.row),
        };
    }
    async resolveTeam(teamName) {
        const candidates = await this.prisma.teams.findMany({
            where: { name: { equals: teamName, mode: 'insensitive' } },
            select: { id: true, name: true, status: true, captain_user_id: true },
            take: 2,
        });
        if (candidates.length > 1)
            return 'ambiguous';
        return candidates[0] ?? null;
    }
    async preparePlayers(input) {
        const { sheet, tournament, team, documentsInFile, phonesInFile } = input;
        const prepared = [];
        const rejected = [];
        const reject = (player, detail) => rejected.push(this.toPlayerResult(player, 'rejected', detail));
        const documentsInSheet = new Set();
        const phonesInSheet = new Set();
        const emailsInSheet = new Set();
        const jerseysInSheet = new Set();
        let captainsInSheet = 0;
        const documents = sheet.players.map(({ idNumber }) => idNumber.trim());
        const normalizedPhones = sheet.players.map(({ phone }) => (0, phone_util_1.normalizeColombianPhone)(phone));
        const allPhoneVariants = normalizedPhones.flatMap(phoneVariantsFor);
        const emails = sheet.players
            .map(({ email }) => email?.trim().toLowerCase())
            .filter((value) => Boolean(value));
        const userOrFilters = [
            { id_number: { in: documents } },
            ...(allPhoneVariants.length > 0
                ? [{ phone: { in: allPhoneVariants } }]
                : []),
            ...(emails.length > 0
                ? [{ email: { in: emails, mode: 'insensitive' } }]
                : []),
        ];
        const [existingUsers, rosterRows, teamJerseys] = await Promise.all([
            this.prisma.users.findMany({
                where: { OR: userOrFilters },
                select: {
                    id: true,
                    id_number: true,
                    email: true,
                    phone: true,
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
        const userByDocument = new Map(existingUsers.map((user) => [user.id_number, user]));
        const userByPhone = new Map();
        for (const user of existingUsers) {
            if (user.phone) {
                const norm = (0, phone_util_1.normalizeColombianPhone)(user.phone);
                if (norm)
                    userByPhone.set(norm, user);
            }
        }
        const userByEmail = new Map(existingUsers
            .filter((user) => Boolean(user.email))
            .map((user) => [user.email.toLowerCase(), user]));
        const rosterByPlayer = new Map(rosterRows.map((row) => [row.player_id.toString(), row]));
        const jerseyOwners = new Map(teamJerseys.flatMap(({ jersey_number, player_id }) => jersey_number === null ? [] : [[jersey_number, player_id.toString()]]));
        for (const player of sheet.players) {
            const fullName = player.fullName.trim();
            const idNumber = player.idNumber.trim();
            const phone = (0, phone_util_1.normalizeColombianPhone)(player.phone);
            const email = player.email?.trim().toLowerCase() || null;
            let position = null;
            if (player.position?.trim()) {
                const resolvedPosition = (0, roster_positions_constants_1.resolveRosterPosition)(player.position);
                if (!resolvedPosition) {
                    reject(player, `${fullName}: la posición «${player.position}» no es válida. Usa una de estas: ${roster_positions_constants_1.ROSTER_POSITIONS_LABEL}.`);
                    continue;
                }
                position = resolvedPosition;
            }
            if (documentsInSheet.has(idNumber)) {
                reject(player, `${fullName}: esta hoja repite el documento ${idNumber}.`);
                continue;
            }
            if (phonesInSheet.has(phone)) {
                reject(player, `${fullName}: esta hoja repite el teléfono ${phone}.`);
                continue;
            }
            if (email && emailsInSheet.has(email)) {
                reject(player, `${fullName}: esta hoja repite el correo ${email}.`);
                continue;
            }
            const otherSheetByDoc = documentsInFile.get(idNumber);
            if (otherSheetByDoc) {
                reject(player, `${fullName}: ya aparece en la hoja «${otherSheetByDoc}». Un jugador solo puede estar en un equipo del torneo.`);
                continue;
            }
            const otherSheetByPhone = phonesInFile.get(phone);
            if (otherSheetByPhone) {
                reject(player, `${fullName}: el teléfono ${phone} ya aparece en la hoja «${otherSheetByPhone}».`);
                continue;
            }
            const existingAccount = userByDocument.get(idNumber) ?? userByPhone.get(phone) ?? null;
            if (player.jerseyNumber !== undefined && player.jerseyNumber !== null) {
                if (jerseysInSheet.has(player.jerseyNumber)) {
                    reject(player, `${fullName}: el número ${player.jerseyNumber} ya lo lleva otro jugador de esta hoja.`);
                    continue;
                }
                const owner = jerseyOwners.get(player.jerseyNumber);
                if (owner && owner !== existingAccount?.id.toString()) {
                    reject(player, `${fullName}: el número ${player.jerseyNumber} ya está asignado a otro jugador de la plantilla.`);
                    continue;
                }
            }
            const birthDate = new Date(`${player.birthDate}T00:00:00.000Z`);
            if (Number.isNaN(birthDate.getTime())) {
                reject(player, `${fullName}: la fecha de nacimiento no es válida.`);
                continue;
            }
            const eligibilityIssues = (0, tournament_eligibility_1.getTournamentEligibilityIssues)({
                name: tournament.name,
                startDate: tournament.start_date,
                categoryName: tournament.category_name,
                minAge: tournament.category_min_age,
                maxAge: tournament.category_max_age,
                gender: tournament.category_gender,
            }, [{ fullName, birthDate, gender: player.gender }]);
            if (eligibilityIssues.length > 0) {
                reject(player, eligibilityIssues.join(' '));
                continue;
            }
            const byEmail = email ? userByEmail.get(email) : undefined;
            if (!existingAccount && byEmail) {
                reject(player, `${fullName}: el correo ${email} ya pertenece a la cuenta de ${byEmail.full_name} (documento ${byEmail.id_number}).`);
                continue;
            }
            if (existingAccount && existingAccount.status !== 'active') {
                reject(player, `${fullName}: su cuenta está bloqueada${existingAccount.block_reason ? ` (${existingAccount.block_reason})` : ''}.`);
                continue;
            }
            let alreadyInRoster = false;
            if (existingAccount) {
                const roster = rosterByPlayer.get(existingAccount.id.toString());
                if (roster) {
                    if (!team || roster.team_id !== team.id) {
                        reject(player, `${fullName}: ya está inscrito en este torneo con ${roster.tournament_team_registrations.teams.name}.`);
                        continue;
                    }
                    alreadyInRoster = true;
                }
            }
            if (player.isCaptain) {
                captainsInSheet += 1;
                if (captainsInSheet > 1) {
                    reject(player, `${fullName}: la hoja marca más de un capitán. Deja solo uno.`);
                    continue;
                }
            }
            documentsInSheet.add(idNumber);
            phonesInSheet.add(phone);
            if (email)
                emailsInSheet.add(email);
            documentsInFile.set(idNumber, sheet.sheetName);
            phonesInFile.set(phone, sheet.sheetName);
            if (player.jerseyNumber !== undefined && player.jerseyNumber !== null)
                jerseysInSheet.add(player.jerseyNumber);
            prepared.push({
                source: player,
                idNumber,
                phone,
                email,
                position,
                jerseyNumber: player.jerseyNumber ?? null,
                isCaptain: Boolean(player.isCaptain),
                userId: existingAccount?.id ?? null,
                alreadyInRoster,
            });
        }
        return { prepared, rejected };
    }
    async persistSheet(input) {
        const { tournament, actorId, prepared, captain, markedCaptain, teamName, isRegistered, rosterSize, } = input;
        const created = [];
        const linked = [];
        const passwordHashes = new Map();
        for (const player of prepared) {
            if (!player.userId) {
                passwordHashes.set(player.idNumber, await (0, bcryptjs_1.hash)(player.idNumber, 12));
            }
        }
        return this.prisma.$transaction(async (tx) => {
            for (const player of prepared) {
                if (player.userId) {
                    if (!player.alreadyInRoster)
                        linked.push(player);
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
                        phone: player.phone,
                        password_hash: passwordHashes.get(player.idNumber),
                        identity_verified_at: new Date(),
                        identity_verification_status: 'verified',
                        status: 'active',
                    },
                    select: { id: true },
                });
                player.userId = user.id;
                created.push(player);
            }
            await tx.user_roles.createMany({
                data: prepared.map((player) => ({
                    user_id: player.userId,
                    role_code: 'PLAYER',
                })),
                skipDuplicates: true,
            });
            let teamId = input.team?.id ?? null;
            let teamCreated = false;
            if (!teamId) {
                const captainUserId = captain.userId;
                if (!captainUserId) {
                    throw new common_1.BadRequestException('La hoja no tiene jugadores válidos para crear el equipo.');
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
                    team_id: teamId,
                    user_id: player.userId,
                    member_role: 'player',
                    status: 'active',
                })),
                skipDuplicates: true,
            });
            await tx.team_members.updateMany({
                where: {
                    team_id: teamId,
                    user_id: { in: prepared.map((player) => player.userId) },
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
            const rosterCaptainId = markedCaptain?.userId ?? input.team?.captain_user_id ?? captain.userId;
            for (const player of prepared.filter((p) => p.alreadyInRoster)) {
                await tx.tournament_team_players.update({
                    where: {
                        tournament_id_team_id_player_id: {
                            tournament_id: tournament.id,
                            team_id: teamId,
                            player_id: player.userId,
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
                    team_id: teamId,
                    player_id: player.userId,
                    position: player.position,
                    jersey_number: player.jerseyNumber,
                    is_captain: player.userId === rosterCaptainId,
                    registration_status: 'approved',
                })),
                skipDuplicates: true,
            });
            if (!isRegistered) {
                await (0, competition_service_1.assignApprovedTeamToCompetition)(tx, tournament.id, teamId);
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
                ? 'team_created'
                : isRegistered
                    ? 'roster_updated'
                    : 'team_registered';
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
};
exports.RosterImportService = RosterImportService;
exports.RosterImportService = RosterImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], RosterImportService);
//# sourceMappingURL=roster-import.service.js.map