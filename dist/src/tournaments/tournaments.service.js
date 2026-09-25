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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TournamentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const association_tournament_response_mapper_1 = require("../associations/association-tournament-response.mapper");
const associations_service_1 = require("../associations/associations.service");
const competition_access_service_1 = require("../authorization/competition-access.service");
const football_constants_1 = require("../common/constants/football.constants");
const competition_engine_1 = require("../competition/competition.engine");
const competition_service_1 = require("../competition/competition.service");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const tournament_catalog_mapper_1 = require("./tournament-catalog.mapper");
const tournament_category_constants_1 = require("./tournament-category.constants");
const tournament_eligibility_1 = require("./tournament-eligibility");
const tournament_lifecycle_constants_1 = require("./tournament-lifecycle.constants");
let TournamentsService = TournamentsService_1 = class TournamentsService {
    prisma;
    associationsService;
    imageStorage;
    competitionAccess;
    logger = new common_1.Logger(TournamentsService_1.name);
    constructor(prisma, associationsService, imageStorage, competitionAccess) {
        this.prisma = prisma;
        this.associationsService = associationsService;
        this.imageStorage = imageStorage;
        this.competitionAccess = competitionAccess;
    }
    async findFeaturedActive() {
        const tournaments = await this.prisma.tournaments.findMany({
            where: {
                status: 'active',
                phase: { in: [...tournament_lifecycle_constants_1.ACTIVE_TOURNAMENT_PHASES] },
            },
            orderBy: [{ start_date: 'desc' }, { id: 'desc' }],
            take: 6,
            select: tournament_catalog_mapper_1.tournamentCatalogItemSelect,
        });
        return tournaments.map((tournament) => (0, tournament_catalog_mapper_1.toTournamentCatalogItemResponse)(tournament, false));
    }
    async findPublicStats() {
        const [activeTournaments, associations, activePlayers] = await this.prisma.$transaction([
            this.prisma.tournaments.count({
                where: {
                    status: 'active',
                    phase: { in: [...tournament_lifecycle_constants_1.ACTIVE_TOURNAMENT_PHASES] },
                },
            }),
            this.prisma.associations.count({ where: { status: 'active' } }),
            this.prisma.users.count({
                where: {
                    status: 'active',
                    user_roles: { some: { role_code: 'PLAYER' } },
                },
            }),
        ]);
        return { activeTournaments, associations, activePlayers };
    }
    async findCatalog(query, requestingUserId) {
        const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
        const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;
        if (dateFrom && dateTo && dateFrom > dateTo) {
            throw new common_1.BadRequestException('La fecha inicial del filtro no puede ser posterior a la fecha final.');
        }
        const requestingRoleCodes = requestingUserId === undefined
            ? new Set()
            : await this.competitionAccess.findRoleCodes(requestingUserId);
        const isSuperAdmin = requestingRoleCodes.has('SUPER_ADMIN');
        const isAssociationAdmin = requestingRoleCodes.has('ASSOCIATION_ADMIN');
        if (query.managedOnly) {
            if (requestingUserId === undefined) {
                throw new common_1.ForbiddenException('Este filtro requiere iniciar sesión como administrador de asociación.');
            }
            if (!isAssociationAdmin) {
                throw new common_1.ForbiddenException('Este filtro solo está disponible para administradores de asociación.');
            }
        }
        const publicVisibility = {
            status: 'active',
            phase: { in: [...tournament_lifecycle_constants_1.PUBLIC_TOURNAMENT_PHASES] },
        };
        const managementVisibility = {
            associations: {
                OR: [
                    { owner_user_id: requestingUserId },
                    {
                        association_administrators: {
                            some: {
                                user_id: requestingUserId,
                                status: 'active',
                                permission_level: 'administrator',
                            },
                        },
                    },
                ],
            },
        };
        const visibility = isSuperAdmin
            ? undefined
            : isAssociationAdmin
                ? { OR: [publicVisibility, managementVisibility] }
                : publicVisibility;
        const where = {
            association_id: query.associationId
                ? BigInt(query.associationId)
                : undefined,
            tournament_type_id: query.tournamentTypeId
                ? BigInt(query.tournamentTypeId)
                : undefined,
            category_name: query.category
                ? { equals: query.category, mode: 'insensitive' }
                : undefined,
            category_gender: query.categoryGender,
            phase: query.phase,
            AND: visibility ? [visibility] : undefined,
            associations: query.managedOnly
                ? {
                    OR: [
                        { owner_user_id: requestingUserId },
                        {
                            association_administrators: {
                                some: {
                                    user_id: requestingUserId,
                                    status: 'active',
                                    permission_level: 'administrator',
                                },
                            },
                        },
                    ],
                }
                : undefined,
            start_date: dateFrom || dateTo
                ? {
                    gte: dateFrom,
                    lte: dateTo,
                }
                : undefined,
        };
        const skip = (query.page - 1) * query.pageSize;
        const [total, tournaments] = await this.prisma.$transaction([
            this.prisma.tournaments.count({ where }),
            this.prisma.tournaments.findMany({
                where,
                orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
                skip,
                take: query.pageSize,
                select: tournament_catalog_mapper_1.tournamentCatalogItemSelect,
            }),
        ]);
        const managedAssociationIds = requestingUserId === undefined
            ? new Set()
            : await this.findManagedAssociationIds(requestingUserId, tournaments.map(({ association_id }) => association_id));
        return {
            items: tournaments.map((tournament) => (0, tournament_catalog_mapper_1.toTournamentCatalogItemResponse)(tournament, managedAssociationIds.has(tournament.association_id))),
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + tournaments.length < total,
        };
    }
    async findMine(requestingUserId) {
        const userRoles = await this.prisma.user_roles.findMany({
            where: {
                user_id: requestingUserId,
                role_code: { in: ['PLAYER', 'REFEREE'] },
            },
            select: { role_code: true },
        });
        const roleCodes = new Set(userRoles.map(({ role_code }) => role_code));
        const participationFilters = [];
        if (roleCodes.has('PLAYER')) {
            participationFilters.push({
                tournament_team_registrations: {
                    some: {
                        request_status: 'approved',
                        tournament_team_players: {
                            some: {
                                player_id: requestingUserId,
                                registration_status: 'approved',
                            },
                        },
                    },
                },
            });
        }
        if (roleCodes.has('REFEREE')) {
            participationFilters.push({
                tournament_referees: {
                    some: { user_id: requestingUserId, status: 'active' },
                },
            });
        }
        if (participationFilters.length === 0)
            return [];
        const tournaments = await this.prisma.tournaments.findMany({
            where: {
                status: 'active',
                phase: { in: [...tournament_lifecycle_constants_1.PUBLIC_TOURNAMENT_PHASES] },
                OR: participationFilters,
            },
            orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
            select: tournament_catalog_mapper_1.tournamentCatalogItemSelect,
        });
        const managedAssociationIds = await this.findManagedAssociationIds(requestingUserId, tournaments.map(({ association_id }) => association_id));
        return tournaments.map((tournament) => (0, tournament_catalog_mapper_1.toTournamentCatalogItemResponse)(tournament, managedAssociationIds.has(tournament.association_id)));
    }
    async findCaptainTeams(tournamentId, requestingUserId) {
        const tournament = await this.prisma.tournaments.findUnique({
            where: { id: tournamentId },
            select: {
                id: true,
                name: true,
                start_date: true,
                category_name: true,
                category_min_age: true,
                category_max_age: true,
                category_gender: true,
            },
        });
        if (!tournament)
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        const teams = await this.prisma.teams.findMany({
            where: {
                status: 'active',
                OR: [
                    { captain_user_id: requestingUserId },
                    {
                        team_members: {
                            some: { user_id: requestingUserId, status: 'active' },
                        },
                    },
                ],
            },
            orderBy: [{ name: 'asc' }, { id: 'asc' }],
            select: {
                id: true,
                name: true,
                photo_url: true,
                team_members: {
                    where: { status: 'active' },
                    select: {
                        users: {
                            select: { full_name: true, birth_date: true, gender: true },
                        },
                    },
                },
                tournament_team_registrations: {
                    where: { tournament_id: tournamentId },
                    select: { request_status: true },
                    take: 1,
                },
            },
        });
        const eligibilityRules = this.toEligibilityRules(tournament);
        return teams.map((team) => {
            const eligibilityIssues = (0, tournament_eligibility_1.getTournamentEligibilityIssues)(eligibilityRules, team.team_members.map(({ users }) => this.toEligibilityPlayer(users)));
            return {
                id: team.id.toString(),
                name: team.name,
                photoUrl: team.photo_url,
                memberCount: team.team_members.length,
                registrationStatus: team.tournament_team_registrations[0]?.request_status ?? null,
                eligible: eligibilityIssues.length === 0,
                eligibilityMessage: eligibilityIssues.length === 0
                    ? null
                    : (0, tournament_eligibility_1.formatTournamentEligibilityError)(eligibilityRules, eligibilityIssues),
            };
        });
    }
    async registerTeam(tournamentId, teamId, requestingUserId) {
        const [tournament, team] = await Promise.all([
            this.prisma.tournaments.findUnique({
                where: { id: tournamentId },
                select: {
                    association_id: true,
                    phase: true,
                    status: true,
                    registration_start_date: true,
                    registration_end_date: true,
                    max_teams: true,
                    min_players_per_team: true,
                    max_players_per_team: true,
                    registration_fee: true,
                    name: true,
                    start_date: true,
                    category_name: true,
                    category_min_age: true,
                    category_max_age: true,
                    category_gender: true,
                    _count: {
                        select: {
                            tournament_team_registrations: {
                                where: { request_status: { in: ['pending', 'approved'] } },
                            },
                        },
                    },
                },
            }),
            this.prisma.teams.findUnique({
                where: { id: teamId },
                select: {
                    captain_user_id: true,
                    status: true,
                    team_members: {
                        where: { status: 'active' },
                        select: {
                            user_id: true,
                            users: {
                                select: { full_name: true, birth_date: true, gender: true },
                            },
                        },
                    },
                },
            }),
        ]);
        if (!tournament)
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        if (!team || team.status !== 'active')
            throw new common_1.NotFoundException('El equipo seleccionado no existe.');
        if (team.captain_user_id !== requestingUserId &&
            !team.team_members.some(({ user_id }) => user_id === requestingUserId)) {
            throw new common_1.ForbiddenException('Solo un integrante activo puede inscribir este equipo.');
        }
        this.assertTeamRosterWithinTournamentLimits(team.team_members.length, tournament.min_players_per_team, tournament.max_players_per_team);
        this.assertTeamCategoryEligibility(this.toEligibilityRules(tournament), team.team_members.map(({ users }) => this.toEligibilityPlayer(users)));
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const registrationsAreOpen = tournament.status === 'active' &&
            ['registration', 'validation', 'scheduled'].includes(tournament.phase) &&
            (!tournament.registration_start_date ||
                tournament.registration_start_date <= today) &&
            (!tournament.registration_end_date ||
                tournament.registration_end_date >= today);
        if (!registrationsAreOpen) {
            throw new common_1.BadRequestException('Las inscripciones de este torneo no están abiertas.');
        }
        if (tournament._count.tournament_team_registrations >= tournament.max_teams) {
            throw new common_1.BadRequestException('El torneo ya no tiene cupos disponibles.');
        }
        const existing = await this.prisma.tournament_team_registrations.findUnique({
            where: {
                tournament_id_team_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                },
            },
            select: { request_status: true },
        });
        if (existing) {
            throw new common_1.BadRequestException('Este equipo ya tiene una solicitud de inscripción en el torneo.');
        }
        const [tournamentInfo, teamInfo, recipients] = await Promise.all([
            this.prisma.tournaments.findUniqueOrThrow({
                where: { id: tournamentId },
                select: { name: true },
            }),
            this.prisma.teams.findUniqueOrThrow({
                where: { id: teamId },
                select: { name: true },
            }),
            this.findRegistrationAdministratorIds(tournamentId, tournament.association_id),
        ]);
        const registration = await this.prisma.$transaction(async (transaction) => {
            const created = await transaction.tournament_team_registrations.create({
                data: {
                    tournament_id: tournamentId,
                    association_id: tournament.association_id,
                    team_id: teamId,
                    requested_by: requestingUserId,
                    request_status: 'pending',
                    payment_status: tournament.registration_fee.equals(0)
                        ? 'paid'
                        : 'unpaid',
                },
                select: { tournament_id: true, team_id: true, request_status: true },
            });
            await transaction.tournament_registration_events.create({
                data: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                    actor_user_id: requestingUserId,
                    event_type: 'submitted',
                    message: 'Solicitud de inscripción enviada.',
                },
            });
            if (recipients.length > 0) {
                await transaction.notifications.createMany({
                    data: recipients.map((userId) => ({
                        user_id: userId,
                        type: 'tournament_registration',
                        title: 'Nueva solicitud de inscripción',
                        message: `${teamInfo.name} quiere inscribirse en ${tournamentInfo.name}.`,
                        entity_type: 'tournament_registration',
                        entity_id: `${tournamentId.toString()}:${teamId.toString()}`,
                        metadata: {
                            audience: 'administrator',
                            tournamentId: tournamentId.toString(),
                            tournamentName: tournamentInfo.name,
                            teamId: teamId.toString(),
                            teamName: teamInfo.name,
                            status: 'pending',
                            actionUrl: `/tournaments/${tournamentId.toString()}`,
                            actionLabel: 'Ver torneo',
                        },
                    })),
                });
            }
            return created;
        });
        return {
            tournamentId: registration.tournament_id.toString(),
            teamId: registration.team_id.toString(),
            status: registration.request_status,
        };
    }
    async findRegistrationPayments(tournamentId, requestingUserId) {
        await this.competitionAccess.assertCanManageTournament(requestingUserId, tournamentId);
        const [tournament, canUpdate] = await Promise.all([
            this.prisma.tournaments.findUnique({
                where: { id: tournamentId },
                select: {
                    id: true,
                    name: true,
                    registration_fee: true,
                    currency_code: true,
                    tournament_team_registrations: {
                        where: { request_status: 'approved' },
                        orderBy: [{ teams: { name: 'asc' } }, { team_id: 'asc' }],
                        select: {
                            team_id: true,
                            payment_status: true,
                            amount_paid: true,
                            payment_notes: true,
                            payment_updated_at: true,
                            teams: { select: { name: true } },
                            users_tournament_team_registrations_payment_updated_byTousers: {
                                select: { id: true, full_name: true },
                            },
                        },
                    },
                },
            }),
            this.competitionAccess.canUpdateTournamentPayments(requestingUserId, tournamentId),
        ]);
        if (!tournament) {
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        }
        const registrations = tournament.tournament_team_registrations.map((registration) => this.toRegistrationPaymentResponse(registration, tournament.registration_fee));
        const totalPaid = tournament.tournament_team_registrations.reduce((total, registration) => total.plus(registration.amount_paid), new client_1.Prisma.Decimal(0));
        const expectedAmount = tournament.registration_fee.mul(registrations.length);
        const calculatedBalance = expectedAmount.minus(totalPaid);
        const totalBalance = calculatedBalance.isNegative()
            ? new client_1.Prisma.Decimal(0)
            : calculatedBalance;
        const paidTeams = registrations.filter(({ paymentStatus }) => paymentStatus === 'paid').length;
        const partialTeams = registrations.filter(({ paymentStatus }) => paymentStatus === 'partial').length;
        const unpaidTeams = registrations.filter(({ paymentStatus }) => paymentStatus === 'unpaid').length;
        return {
            tournamentId: tournament.id.toString(),
            tournamentName: tournament.name,
            currencyCode: tournament.currency_code.trim(),
            registrationFee: tournament.registration_fee.toFixed(2),
            canUpdate,
            summary: {
                totalTeams: registrations.length,
                paidTeams,
                partialTeams,
                unpaidTeams,
                expectedAmount: expectedAmount.toFixed(2),
                totalPaid: totalPaid.toFixed(2),
                totalBalance: totalBalance.toFixed(2),
                allPaid: partialTeams === 0 && unpaidTeams === 0,
            },
            registrations,
        };
    }
    async findMyRegistrationPayment(tournamentId, requestingUserId) {
        const registration = await this.prisma.tournament_team_registrations.findFirst({
            where: {
                tournament_id: tournamentId,
                request_status: 'approved',
                tournament_team_players: {
                    some: {
                        player_id: requestingUserId,
                        registration_status: 'approved',
                    },
                },
            },
            select: {
                team_id: true,
                payment_status: true,
                amount_paid: true,
                payment_notes: true,
                payment_updated_at: true,
                teams: { select: { name: true } },
                tournaments: {
                    select: {
                        id: true,
                        name: true,
                        registration_fee: true,
                        currency_code: true,
                    },
                },
                users_tournament_team_registrations_payment_updated_byTousers: {
                    select: { id: true, full_name: true },
                },
            },
        });
        if (!registration) {
            throw new common_1.NotFoundException('No tienes una inscripción aprobada en este torneo.');
        }
        const payment = this.toRegistrationPaymentResponse(registration, registration.tournaments.registration_fee);
        return {
            tournamentId: registration.tournaments.id.toString(),
            tournamentName: registration.tournaments.name,
            currencyCode: registration.tournaments.currency_code.trim(),
            payment: {
                teamId: payment.teamId,
                teamName: payment.teamName,
                paymentStatus: payment.paymentStatus,
                registrationFee: payment.registrationFee,
                amountPaid: payment.amountPaid,
                balanceDue: payment.balanceDue,
                updatedAt: payment.updatedAt,
            },
        };
    }
    async updateRegistrationPayment(tournamentId, teamId, requestingUserId, dto) {
        await this.competitionAccess.assertCanUpdateTournamentPayments(requestingUserId, tournamentId);
        const registration = await this.prisma.tournament_team_registrations.findUnique({
            where: {
                tournament_id_team_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                },
            },
            select: {
                request_status: true,
                requested_by: true,
                payment_status: true,
                amount_paid: true,
                tournaments: {
                    select: {
                        name: true,
                        registration_fee: true,
                        currency_code: true,
                    },
                },
                teams: {
                    select: { name: true, captain_user_id: true },
                },
            },
        });
        if (!registration) {
            throw new common_1.NotFoundException('La inscripción del equipo no existe.');
        }
        if (registration.request_status !== 'approved') {
            throw new common_1.BadRequestException('El pago solo se puede registrar para un equipo aprobado en el torneo.');
        }
        const fee = registration.tournaments.registration_fee;
        const amountPaid = this.resolveRegistrationPaymentAmount(dto.paymentStatus, dto.amountPaid, fee);
        const notes = dto.notes?.trim() || null;
        const now = new Date();
        const updated = await this.prisma.$transaction(async (transaction) => {
            const saved = await transaction.tournament_team_registrations.update({
                where: {
                    tournament_id_team_id: {
                        tournament_id: tournamentId,
                        team_id: teamId,
                    },
                },
                data: {
                    payment_status: dto.paymentStatus,
                    amount_paid: amountPaid,
                    payment_notes: notes,
                    payment_updated_by: requestingUserId,
                    payment_updated_at: now,
                    updated_at: now,
                },
                select: {
                    team_id: true,
                    payment_status: true,
                    amount_paid: true,
                    payment_notes: true,
                    payment_updated_at: true,
                    teams: { select: { name: true } },
                    users_tournament_team_registrations_payment_updated_byTousers: {
                        select: { id: true, full_name: true },
                    },
                },
            });
            const statusLabel = {
                unpaid: 'pendiente',
                partial: 'abonado parcialmente',
                paid: 'pagado por completo',
            }[dto.paymentStatus];
            await transaction.tournament_registration_events.create({
                data: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                    actor_user_id: requestingUserId,
                    event_type: 'payment_updated',
                    message: `Pago marcado como ${statusLabel}. Valor recibido: ${amountPaid.toFixed(2)} ${registration.tournaments.currency_code.trim()}.${notes ? ` ${notes}` : ''}`,
                },
            });
            if (registration.payment_status !== dto.paymentStatus ||
                !registration.amount_paid.equals(amountPaid)) {
                const recipientIds = [
                    ...new Set([
                        registration.requested_by,
                        registration.teams.captain_user_id,
                    ]),
                ].filter((userId) => userId !== requestingUserId);
                if (recipientIds.length > 0) {
                    await transaction.notifications.createMany({
                        data: recipientIds.map((userId) => ({
                            user_id: userId,
                            type: 'tournament_registration',
                            title: 'Pago de inscripción actualizado',
                            message: `El pago de ${registration.teams.name} en ${registration.tournaments.name} quedó ${statusLabel}.`,
                            entity_type: 'tournament_registration',
                            entity_id: `${tournamentId.toString()}:${teamId.toString()}`,
                            metadata: {
                                tournamentId: tournamentId.toString(),
                                tournamentName: registration.tournaments.name,
                                teamId: teamId.toString(),
                                teamName: registration.teams.name,
                                paymentStatus: dto.paymentStatus,
                                amountPaid: amountPaid.toFixed(2),
                                actionUrl: `/tournaments/${tournamentId.toString()}`,
                                actionLabel: 'Ver torneo',
                            },
                        })),
                    });
                }
            }
            return saved;
        });
        return this.toRegistrationPaymentResponse(updated, fee);
    }
    resolveRegistrationPaymentAmount(status, requestedAmount, registrationFee) {
        if (registrationFee.equals(0) && status !== 'paid') {
            throw new common_1.BadRequestException('Las inscripciones gratuitas se registran automáticamente como pagadas.');
        }
        if (status === 'unpaid')
            return new client_1.Prisma.Decimal(0);
        if (status === 'paid')
            return registrationFee;
        if (registrationFee.equals(0)) {
            throw new common_1.BadRequestException('Un torneo gratuito no puede registrar un pago parcial.');
        }
        if (requestedAmount === undefined) {
            throw new common_1.BadRequestException('Debes indicar el valor recibido para registrar un pago parcial.');
        }
        const amount = new client_1.Prisma.Decimal(requestedAmount);
        if (amount.lessThanOrEqualTo(0) ||
            amount.greaterThanOrEqualTo(registrationFee)) {
            throw new common_1.BadRequestException(`El abono debe ser mayor que cero y menor que el valor total de la inscripción (${registrationFee.toFixed(2)}).`);
        }
        return amount;
    }
    toRegistrationPaymentResponse(registration, registrationFee) {
        const calculatedBalance = registrationFee.minus(registration.amount_paid);
        const balance = calculatedBalance.isNegative()
            ? new client_1.Prisma.Decimal(0)
            : calculatedBalance;
        return {
            teamId: registration.team_id.toString(),
            teamName: registration.teams.name,
            paymentStatus: registration.payment_status,
            registrationFee: registrationFee.toFixed(2),
            amountPaid: registration.amount_paid.toFixed(2),
            balanceDue: balance.toFixed(2),
            notes: registration.payment_notes,
            updatedAt: registration.payment_updated_at?.toISOString() ?? null,
            updatedBy: registration.users_tournament_team_registrations_payment_updated_byTousers
                ? {
                    id: registration.users_tournament_team_registrations_payment_updated_byTousers.id.toString(),
                    fullName: registration
                        .users_tournament_team_registrations_payment_updated_byTousers
                        .full_name,
                }
                : null,
        };
    }
    async findRegistrationDetail(tournamentId, teamId, requestingUserId) {
        const registration = await this.prisma.tournament_team_registrations.findUnique({
            where: {
                tournament_id_team_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                },
            },
            select: {
                tournament_id: true,
                team_id: true,
                requested_by: true,
                request_status: true,
                review_notes: true,
                reviewed_at: true,
                created_at: true,
                tournaments: {
                    select: { name: true, association_id: true, phase: true },
                },
                teams: {
                    select: {
                        name: true,
                        sport_type: true,
                        modality: true,
                        captain_user_id: true,
                        team_members: {
                            where: { status: 'active' },
                            select: { user_id: true },
                        },
                    },
                },
                tournament_registration_events: {
                    orderBy: [{ created_at: 'asc' }, { id: 'asc' }],
                    select: {
                        id: true,
                        event_type: true,
                        message: true,
                        created_at: true,
                    },
                },
            },
        });
        if (!registration)
            throw new common_1.NotFoundException('La solicitud no existe.');
        const canManage = await this.canReviewRegistration(tournamentId, registration.tournaments.association_id, requestingUserId);
        const isCaptain = registration.teams.captain_user_id === requestingUserId;
        if (!canManage &&
            !isCaptain &&
            registration.requested_by !== requestingUserId) {
            throw new common_1.ForbiddenException('No puedes consultar esta solicitud.');
        }
        return {
            tournamentId: registration.tournament_id.toString(),
            tournamentName: registration.tournaments.name,
            teamId: registration.team_id.toString(),
            teamName: registration.teams.name,
            sportType: registration.teams.sport_type,
            modality: registration.teams.modality,
            memberCount: registration.teams.team_members.length,
            status: registration.request_status,
            reviewNotes: registration.review_notes,
            createdAt: registration.created_at.toISOString(),
            reviewedAt: registration.reviewed_at?.toISOString() ?? null,
            canReview: canManage &&
                ['registration', 'validation', 'scheduled'].includes(registration.tournaments.phase) &&
                registration.request_status === 'pending',
            canResubmit: isCaptain &&
                ['registration', 'validation', 'scheduled'].includes(registration.tournaments.phase) &&
                registration.request_status === 'changes_requested',
            events: registration.tournament_registration_events.map((event) => ({
                id: event.id.toString(),
                type: event.event_type,
                message: event.message,
                createdAt: event.created_at.toISOString(),
            })),
        };
    }
    async reviewRegistration(tournamentId, teamId, requestingUserId, dto) {
        const registration = await this.prisma.tournament_team_registrations.findUnique({
            where: {
                tournament_id_team_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                },
            },
            select: {
                request_status: true,
                requested_by: true,
                tournaments: {
                    select: {
                        name: true,
                        association_id: true,
                        phase: true,
                        max_teams: true,
                        min_players_per_team: true,
                        max_players_per_team: true,
                        start_date: true,
                        category_name: true,
                        category_min_age: true,
                        category_max_age: true,
                        category_gender: true,
                        _count: {
                            select: {
                                tournament_team_registrations: {
                                    where: { request_status: 'approved' },
                                },
                            },
                        },
                    },
                },
                teams: {
                    select: {
                        name: true,
                        captain_user_id: true,
                        team_members: {
                            where: { status: 'active' },
                            select: {
                                user_id: true,
                                users: {
                                    select: {
                                        full_name: true,
                                        birth_date: true,
                                        gender: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!registration)
            throw new common_1.NotFoundException('La solicitud no existe.');
        if (!(await this.canReviewRegistration(tournamentId, registration.tournaments.association_id, requestingUserId))) {
            throw new common_1.ForbiddenException('No puedes revisar esta solicitud.');
        }
        if (registration.request_status !== 'pending') {
            throw new common_1.BadRequestException('Solo se pueden revisar solicitudes pendientes.');
        }
        if (!['registration', 'validation', 'scheduled'].includes(registration.tournaments.phase)) {
            throw new common_1.BadRequestException('Las plantillas se pueden revisar hasta antes de iniciar el torneo.');
        }
        if (dto.status === 'approved' &&
            registration.tournaments._count.tournament_team_registrations >=
                registration.tournaments.max_teams) {
            throw new common_1.BadRequestException('No se puede aprobar el equipo porque el torneo ya completó sus cupos.');
        }
        if (dto.status === 'approved') {
            this.assertTeamRosterWithinTournamentLimits(registration.teams.team_members.length, registration.tournaments.min_players_per_team, registration.tournaments.max_players_per_team);
            this.assertTeamCategoryEligibility(this.toEligibilityRules(registration.tournaments), registration.teams.team_members.map(({ users }) => this.toEligibilityPlayer(users)));
        }
        const message = dto.message?.trim() || null;
        if (dto.status !== 'approved' && !message) {
            throw new common_1.BadRequestException('Debes indicar el motivo o los cambios solicitados.');
        }
        await this.prisma.$transaction(async (transaction) => {
            await transaction.tournament_team_registrations.update({
                where: {
                    tournament_id_team_id: {
                        tournament_id: tournamentId,
                        team_id: teamId,
                    },
                },
                data: {
                    request_status: dto.status,
                    reviewed_by: requestingUserId,
                    reviewed_at: new Date(),
                    review_notes: message,
                    updated_at: new Date(),
                },
            });
            await transaction.tournament_registration_events.create({
                data: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                    actor_user_id: requestingUserId,
                    event_type: dto.status,
                    message,
                },
            });
            if (dto.status === 'approved') {
                await transaction.tournament_team_players.createMany({
                    data: registration.teams.team_members.map(({ user_id }) => ({
                        tournament_id: tournamentId,
                        team_id: teamId,
                        player_id: user_id,
                        is_captain: user_id === registration.teams.captain_user_id,
                        registration_status: 'approved',
                    })),
                    skipDuplicates: true,
                });
                await (0, competition_service_1.assignApprovedTeamToCompetition)(transaction, tournamentId, teamId);
            }
            const recipientIds = [
                ...new Set([
                    registration.requested_by,
                    registration.teams.captain_user_id,
                ]),
            ];
            const presentation = {
                approved: { title: 'Inscripción aprobada', text: 'fue aceptado' },
                rejected: { title: 'Inscripción rechazada', text: 'fue rechazado' },
                changes_requested: {
                    title: 'Cambios solicitados',
                    text: 'requiere cambios',
                },
            }[dto.status];
            await transaction.notifications.createMany({
                data: recipientIds.map((userId) => ({
                    user_id: userId,
                    type: 'tournament_registration',
                    title: presentation.title,
                    message: `${registration.teams.name} ${presentation.text} para ${registration.tournaments.name}.${message ? ` ${message}` : ''}`,
                    entity_type: 'tournament_registration',
                    entity_id: `${tournamentId.toString()}:${teamId.toString()}`,
                    metadata: {
                        audience: 'player',
                        tournamentId: tournamentId.toString(),
                        tournamentName: registration.tournaments.name,
                        teamId: teamId.toString(),
                        teamName: registration.teams.name,
                        status: dto.status,
                        reviewNotes: message,
                        actionUrl: `/tournaments/${tournamentId.toString()}`,
                        actionLabel: 'Ver torneo',
                    },
                })),
            });
        });
        return {
            tournamentId: tournamentId.toString(),
            teamId: teamId.toString(),
            status: dto.status,
        };
    }
    async resubmitRegistration(tournamentId, teamId, requestingUserId) {
        const registration = await this.prisma.tournament_team_registrations.findUnique({
            where: {
                tournament_id_team_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                },
            },
            select: {
                request_status: true,
                association_id: true,
                tournaments: {
                    select: {
                        name: true,
                        phase: true,
                        min_players_per_team: true,
                        max_players_per_team: true,
                        start_date: true,
                        category_name: true,
                        category_min_age: true,
                        category_max_age: true,
                        category_gender: true,
                    },
                },
                teams: {
                    select: {
                        name: true,
                        captain_user_id: true,
                        team_members: {
                            where: { status: 'active' },
                            select: {
                                users: {
                                    select: {
                                        full_name: true,
                                        birth_date: true,
                                        gender: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!registration)
            throw new common_1.NotFoundException('La solicitud no existe.');
        if (registration.teams.captain_user_id !== requestingUserId) {
            throw new common_1.ForbiddenException('Solo el capitán puede reenviar la solicitud.');
        }
        if (registration.request_status !== 'changes_requested') {
            throw new common_1.BadRequestException('Esta solicitud no tiene cambios pendientes.');
        }
        if (!['registration', 'validation', 'scheduled'].includes(registration.tournaments.phase)) {
            throw new common_1.BadRequestException('La plantilla ya está cerrada y no admite nuevos cambios.');
        }
        this.assertTeamRosterWithinTournamentLimits(registration.teams.team_members.length, registration.tournaments.min_players_per_team, registration.tournaments.max_players_per_team);
        this.assertTeamCategoryEligibility(this.toEligibilityRules(registration.tournaments), registration.teams.team_members.map(({ users }) => this.toEligibilityPlayer(users)));
        const recipients = await this.findRegistrationAdministratorIds(tournamentId, registration.association_id);
        await this.prisma.$transaction(async (transaction) => {
            await transaction.tournament_team_registrations.update({
                where: {
                    tournament_id_team_id: {
                        tournament_id: tournamentId,
                        team_id: teamId,
                    },
                },
                data: {
                    request_status: 'pending',
                    reviewed_by: null,
                    reviewed_at: null,
                    updated_at: new Date(),
                },
            });
            await transaction.tournament_registration_events.create({
                data: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                    actor_user_id: requestingUserId,
                    event_type: 'resubmitted',
                    message: 'El capitán informó que realizó los cambios solicitados.',
                },
            });
            if (recipients.length > 0)
                await transaction.notifications.createMany({
                    data: recipients.map((userId) => ({
                        user_id: userId,
                        type: 'tournament_registration',
                        title: 'Solicitud corregida',
                        message: `${registration.teams.name} reenvió su solicitud para ${registration.tournaments.name}.`,
                        entity_type: 'tournament_registration',
                        entity_id: `${tournamentId}:${teamId}`,
                        metadata: {
                            audience: 'administrator',
                            tournamentId: tournamentId.toString(),
                            tournamentName: registration.tournaments.name,
                            teamId: teamId.toString(),
                            teamName: registration.teams.name,
                            status: 'pending',
                            actionUrl: `/tournaments/${tournamentId.toString()}`,
                            actionLabel: 'Ver torneo',
                        },
                    })),
                });
        });
        return {
            tournamentId: tournamentId.toString(),
            teamId: teamId.toString(),
            status: 'pending',
        };
    }
    async findRegistrationAdministratorIds(tournamentId, associationId) {
        const [tournamentAdmins, association] = await Promise.all([
            this.prisma.tournament_administrators.findMany({
                where: { tournament_id: tournamentId, status: 'active' },
                select: { user_id: true },
            }),
            this.prisma.associations.findUnique({
                where: { id: associationId },
                select: {
                    owner_user_id: true,
                    association_administrators: {
                        where: { status: 'active', permission_level: { not: 'viewer' } },
                        select: { user_id: true },
                    },
                },
            }),
        ]);
        return [
            ...new Set([
                ...tournamentAdmins.map(({ user_id }) => user_id),
                ...(association ? [association.owner_user_id] : []),
                ...(association?.association_administrators.map(({ user_id }) => user_id) ?? []),
            ]),
        ];
    }
    async canReviewRegistration(tournamentId, associationId, userId) {
        const [superAdmin, tournamentAdmin, association] = await Promise.all([
            this.prisma.user_roles.findUnique({
                where: {
                    user_id_role_code: { user_id: userId, role_code: 'SUPER_ADMIN' },
                },
                select: { user_id: true },
            }),
            this.prisma.tournament_administrators.findFirst({
                where: {
                    tournament_id: tournamentId,
                    user_id: userId,
                    status: 'active',
                    permission_level: { not: 'viewer' },
                },
                select: { user_id: true },
            }),
            this.prisma.associations.findFirst({
                where: {
                    id: associationId,
                    OR: [
                        { owner_user_id: userId },
                        {
                            association_administrators: {
                                some: {
                                    user_id: userId,
                                    status: 'active',
                                    permission_level: { not: 'viewer' },
                                },
                            },
                        },
                    ],
                },
                select: { id: true },
            }),
        ]);
        return Boolean(superAdmin || tournamentAdmin || association);
    }
    async findCatalogOne(tournamentId, requestingUserId) {
        const tournament = await this.prisma.tournaments.findUnique({
            where: { id: tournamentId },
            select: tournament_catalog_mapper_1.tournamentCatalogItemSelect,
        });
        if (!tournament) {
            throw new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe.`);
        }
        const roleCodes = await this.competitionAccess.findRoleCodes(requestingUserId);
        const canManage = roleCodes.has('SUPER_ADMIN') ||
            (roleCodes.has('ASSOCIATION_ADMIN') &&
                (await this.canReviewRegistration(tournamentId, tournament.association_id, requestingUserId)));
        if (!canManage && !this.isAvailable(tournament)) {
            throw new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe.`);
        }
        const [registrations, players, playedMatches, viewerRegistration] = await Promise.all([
            this.prisma.tournament_team_registrations.findMany({
                where: { tournament_id: tournamentId, request_status: 'approved' },
                select: {
                    team_id: true,
                    points: true,
                    teams: {
                        select: { name: true, primary_color: true },
                    },
                },
            }),
            this.prisma.tournament_team_players.findMany({
                where: {
                    tournament_id: tournamentId,
                    registration_status: 'approved',
                },
                select: {
                    player_id: true,
                    team_members: {
                        select: {
                            users: { select: { full_name: true } },
                            teams: { select: { name: true } },
                        },
                    },
                    player_match_stats: { select: { goals: true } },
                },
            }),
            this.prisma.matches.findMany({
                where: { tournament_id: tournamentId, status: 'played' },
                select: {
                    home_team_id: true,
                    away_team_id: true,
                    home_score: true,
                    away_score: true,
                },
            }),
            this.prisma.tournament_team_players.findFirst({
                where: {
                    tournament_id: tournamentId,
                    player_id: requestingUserId,
                    registration_status: 'approved',
                    tournament_team_registrations: { request_status: 'approved' },
                },
                select: { team_id: true },
            }),
        ]);
        const standings = registrations.map((registration) => {
            let played = 0;
            let wins = 0;
            let draws = 0;
            let losses = 0;
            let goalsFor = 0;
            let goalsAgainst = 0;
            for (const match of playedMatches) {
                const isHome = match.home_team_id === registration.team_id;
                const isAway = match.away_team_id === registration.team_id;
                if (!isHome && !isAway)
                    continue;
                const scored = (isHome ? match.home_score : match.away_score) ?? 0;
                const conceded = (isHome ? match.away_score : match.home_score) ?? 0;
                played += 1;
                goalsFor += scored;
                goalsAgainst += conceded;
                if (scored > conceded)
                    wins += 1;
                else if (scored === conceded)
                    draws += 1;
                else
                    losses += 1;
            }
            return {
                teamId: registration.team_id.toString(),
                teamName: registration.teams.name,
                primaryColor: registration.teams.primary_color,
                played,
                wins,
                draws,
                losses,
                goalsFor,
                goalsAgainst,
                points: registration.points,
            };
        });
        standings.sort((left, right) => right.points - left.points ||
            right.goalsFor -
                right.goalsAgainst -
                (left.goalsFor - left.goalsAgainst) ||
            left.teamName.localeCompare(right.teamName, 'es'));
        const scorers = players
            .map((player) => ({
            id: player.player_id.toString(),
            name: player.team_members.users.full_name,
            team: player.team_members.teams.name,
            goals: player.player_match_stats.reduce((total, statistic) => total + statistic.goals, 0),
        }))
            .sort((left, right) => right.goals - left.goals || left.name.localeCompare(right.name, 'es'));
        return {
            ...(0, tournament_catalog_mapper_1.toTournamentCatalogItemResponse)(tournament, canManage),
            viewerTeamId: viewerRegistration?.team_id.toString() ?? null,
            standings,
            scorers,
            matchesPlayed: playedMatches.length,
            totalGoals: playedMatches.reduce((total, match) => total + (match.home_score ?? 0) + (match.away_score ?? 0), 0),
        };
    }
    async findCatalogFilterOptions() {
        const [associations, tournamentTypes, categories] = await Promise.all([
            this.prisma.associations.findMany({
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: { id: true, name: true },
            }),
            this.prisma.tournament_types.findMany({
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: { id: true, name: true },
            }),
            this.prisma.tournaments.findMany({
                distinct: ['category_name'],
                orderBy: { category_name: 'asc' },
                select: { category_name: true },
            }),
        ]);
        return {
            associations: associations.map(({ id, name }) => ({
                id: id.toString(),
                name,
            })),
            tournamentTypes: tournamentTypes.map(({ id, name }) => ({
                id: id.toString(),
                name,
            })),
            categories: [
                ...new Map(categories.map(({ category_name }) => [
                    category_name.toLocaleLowerCase('es-CO'),
                    category_name,
                ])).values(),
            ],
            categoryGenders: [...tournament_category_constants_1.TOURNAMENT_CATEGORY_GENDERS],
        };
    }
    async updateRules(tournamentId, requestingUserId, updateTournamentRulesDto) {
        const rulesContent = this.sanitizeRulesContent(updateTournamentRulesDto.rulesContent);
        const updatedTournament = await this.prisma.$transaction(async (client) => {
            const tournament = await client.tournaments.findUnique({
                where: { id: tournamentId },
                select: { id: true, association_id: true, phase: true },
            });
            if (!tournament) {
                throw new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe.`);
            }
            await this.requireManagementPermission(client, tournament.association_id, requestingUserId);
            this.assertRulesEditable(tournament.phase);
            return client.tournaments.update({
                where: { id: tournamentId },
                data: { rules_content: rulesContent, updated_at: new Date() },
                select: { id: true, rules_content: true },
            });
        });
        return {
            id: updatedTournament.id.toString(),
            rulesContent: updatedTournament.rules_content,
        };
    }
    async findSponsors(tournamentId, requestingUserId) {
        await this.requireTournamentManagementPermission(this.prisma, tournamentId, requestingUserId);
        const sponsors = await this.prisma.tournament_sponsors.findMany({
            where: { tournament_id: tournamentId },
            orderBy: [{ created_at: 'asc' }, { sponsor_id: 'asc' }],
            select: association_tournament_response_mapper_1.tournamentSponsorResponseSelect,
        });
        return sponsors.map(association_tournament_response_mapper_1.toTournamentSponsorResponse);
    }
    async createSponsor(tournamentId, requestingUserId, dto, logo) {
        await this.requireTournamentManagementPermission(this.prisma, tournamentId, requestingUserId);
        await this.assertSponsorsEditable(this.prisma, tournamentId);
        const uploadedLogo = logo
            ? await this.imageStorage.saveSponsorLogo(logo)
            : undefined;
        let previousLogo;
        try {
            const response = await this.prisma.$transaction(async (transaction) => {
                await this.requireTournamentManagementPermission(transaction, tournamentId, requestingUserId);
                const agreementDates = await this.assertSponsorsEditable(transaction, tournamentId);
                let sponsorId;
                if (dto.sponsorId) {
                    sponsorId = BigInt(dto.sponsorId);
                    const existing = await transaction.sponsors.findUnique({
                        where: { id: sponsorId },
                        select: { id: true, logo_url: true, logo_public_id: true },
                    });
                    if (!existing) {
                        throw new common_1.NotFoundException(`El patrocinador con ID ${sponsorId.toString()} no existe.`);
                    }
                    if (uploadedLogo) {
                        previousLogo = {
                            url: existing.logo_url,
                            publicId: existing.logo_public_id,
                        };
                    }
                    await transaction.sponsors.update({
                        where: { id: sponsorId },
                        data: this.sponsorData(dto, uploadedLogo),
                    });
                }
                else {
                    const existing = dto.taxId
                        ? await transaction.sponsors.findUnique({
                            where: { tax_id: dto.taxId },
                            select: { id: true, logo_url: true, logo_public_id: true },
                        })
                        : null;
                    if (existing) {
                        sponsorId = existing.id;
                        if (uploadedLogo) {
                            previousLogo = {
                                url: existing.logo_url,
                                publicId: existing.logo_public_id,
                            };
                        }
                        await transaction.sponsors.update({
                            where: { id: sponsorId },
                            data: this.sponsorData(dto, uploadedLogo),
                        });
                    }
                    else {
                        const created = await transaction.sponsors.create({
                            data: this.sponsorData(dto, uploadedLogo),
                            select: { id: true },
                        });
                        sponsorId = created.id;
                    }
                }
                const currentRelation = await transaction.tournament_sponsors.findUnique({
                    where: {
                        tournament_id_sponsor_id: {
                            tournament_id: tournamentId,
                            sponsor_id: sponsorId,
                        },
                    },
                    select: { sponsor_id: true },
                });
                if (currentRelation) {
                    throw new common_1.BadRequestException(`${dto.name} ya está vinculado como patrocinador de este torneo.`);
                }
                const relation = await transaction.tournament_sponsors.create({
                    data: {
                        tournament_id: tournamentId,
                        sponsor_id: sponsorId,
                        ...this.tournamentSponsorData(dto, agreementDates),
                    },
                    select: association_tournament_response_mapper_1.tournamentSponsorResponseSelect,
                });
                return (0, association_tournament_response_mapper_1.toTournamentSponsorResponse)(relation);
            });
            if (uploadedLogo && previousLogo) {
                await this.deleteImageIfUnreferenced(previousLogo);
            }
            return response;
        }
        catch (error) {
            if (uploadedLogo)
                await this.deleteImageWithoutMaskingError(uploadedLogo);
            throw error;
        }
    }
    async updateSponsor(tournamentId, sponsorId, requestingUserId, dto, logo) {
        await this.requireTournamentManagementPermission(this.prisma, tournamentId, requestingUserId);
        await this.assertSponsorsEditable(this.prisma, tournamentId);
        const uploadedLogo = logo
            ? await this.imageStorage.saveSponsorLogo(logo)
            : undefined;
        let previousLogo;
        try {
            const response = await this.prisma.$transaction(async (transaction) => {
                await this.requireTournamentManagementPermission(transaction, tournamentId, requestingUserId);
                const agreementDates = await this.assertSponsorsEditable(transaction, tournamentId);
                const relation = await transaction.tournament_sponsors.findUnique({
                    where: {
                        tournament_id_sponsor_id: {
                            tournament_id: tournamentId,
                            sponsor_id: sponsorId,
                        },
                    },
                    select: { sponsor_id: true },
                });
                if (!relation) {
                    throw new common_1.NotFoundException('El patrocinador no está vinculado a este torneo.');
                }
                if (dto.taxId) {
                    const taxIdOwner = await transaction.sponsors.findFirst({
                        where: { tax_id: dto.taxId, id: { not: sponsorId } },
                        select: { id: true },
                    });
                    if (taxIdOwner) {
                        throw new common_1.BadRequestException('El NIT o identificación ya pertenece a otro patrocinador.');
                    }
                }
                if (uploadedLogo) {
                    const currentSponsor = await transaction.sponsors.findUniqueOrThrow({
                        where: { id: sponsorId },
                        select: { logo_url: true, logo_public_id: true },
                    });
                    previousLogo = {
                        url: currentSponsor.logo_url,
                        publicId: currentSponsor.logo_public_id,
                    };
                }
                await transaction.sponsors.update({
                    where: { id: sponsorId },
                    data: this.sponsorData(dto, uploadedLogo),
                });
                const updated = await transaction.tournament_sponsors.update({
                    where: {
                        tournament_id_sponsor_id: {
                            tournament_id: tournamentId,
                            sponsor_id: sponsorId,
                        },
                    },
                    data: this.tournamentSponsorData(dto, agreementDates),
                    select: association_tournament_response_mapper_1.tournamentSponsorResponseSelect,
                });
                return (0, association_tournament_response_mapper_1.toTournamentSponsorResponse)(updated);
            });
            if (uploadedLogo && previousLogo) {
                await this.deleteImageIfUnreferenced(previousLogo);
            }
            return response;
        }
        catch (error) {
            if (uploadedLogo)
                await this.deleteImageWithoutMaskingError(uploadedLogo);
            throw error;
        }
    }
    async removeSponsor(tournamentId, sponsorId, requestingUserId) {
        return this.prisma.$transaction(async (transaction) => {
            await this.requireTournamentManagementPermission(transaction, tournamentId, requestingUserId);
            await this.assertSponsorsEditable(transaction, tournamentId);
            const deleted = await transaction.tournament_sponsors.deleteMany({
                where: { tournament_id: tournamentId, sponsor_id: sponsorId },
            });
            if (deleted.count === 0) {
                throw new common_1.NotFoundException('El patrocinador no está vinculado a este torneo.');
            }
            return { sponsorId: sponsorId.toString() };
        });
    }
    async create(associationId, requestingUserId, createTournamentDto, photo, sponsorLogos = []) {
        this.assertValidCategoryAgeRange(createTournamentDto.categoryMinAge ?? null, createTournamentDto.categoryMaxAge ?? null);
        this.assertValidDates({
            startDate: new Date(createTournamentDto.startDate),
            endDate: this.toDate(createTournamentDto.endDate) ?? null,
            registrationStartDate: this.toDate(createTournamentDto.registrationStartDate) ?? null,
            registrationEndDate: this.toDate(createTournamentDto.registrationEndDate) ?? null,
        });
        await this.requireManagementPermission(this.prisma, associationId, requestingUserId);
        let photoAsset;
        let sponsorLogoAssets = new Map();
        let replacedSponsorImages = [];
        let tournament;
        try {
            if (photo) {
                photoAsset = await this.imageStorage.saveTournamentPhoto(photo);
            }
            sponsorLogoAssets = await this.uploadSponsorLogos(createTournamentDto.sponsors ?? [], sponsorLogos);
            const createResult = await this.prisma.$transaction(async (transaction) => {
                await this.requireManagementPermission(transaction, associationId, requestingUserId);
                const tournamentType = await this.findTournamentTypePlayerLimits(transaction, BigInt(createTournamentDto.tournamentTypeId));
                this.assertTournamentPlayerRangeWithinType(tournamentType, createTournamentDto.minPlayersPerTeam, createTournamentDto.maxPlayersPerTeam);
                this.assertTournamentCapacityWithinType(tournamentType, createTournamentDto.maxTeams);
                const createdTournament = await transaction.tournaments.create({
                    data: {
                        association_id: associationId,
                        name: createTournamentDto.name,
                        description: createTournamentDto.description,
                        tournament_type_id: BigInt(createTournamentDto.tournamentTypeId),
                        sport_type: football_constants_1.FOOTBALL_SPORT_TYPE,
                        modality: createTournamentDto.modality,
                        category_name: createTournamentDto.categoryName ?? 'Libre',
                        category_min_age: createTournamentDto.categoryMinAge ?? null,
                        category_max_age: createTournamentDto.categoryMaxAge ?? null,
                        category_gender: createTournamentDto.categoryGender ?? 'open',
                        start_date: new Date(createTournamentDto.startDate),
                        end_date: this.toDate(createTournamentDto.endDate),
                        registration_start_date: this.toDate(createTournamentDto.registrationStartDate),
                        registration_end_date: this.toDate(createTournamentDto.registrationEndDate),
                        registration_fee: createTournamentDto.registrationFee,
                        currency_code: createTournamentDto.currencyCode,
                        grand_prize: createTournamentDto.grandPrize,
                        second_prize: createTournamentDto.secondPrize,
                        third_prize: createTournamentDto.thirdPrize,
                        max_teams: createTournamentDto.maxTeams,
                        min_players_per_team: createTournamentDto.minPlayersPerTeam,
                        max_players_per_team: createTournamentDto.maxPlayersPerTeam,
                        location_name: createTournamentDto.locationName,
                        location_address: createTournamentDto.locationAddress,
                        rules_url: createTournamentDto.rulesUrl,
                        photo_url: photoAsset?.url,
                        photo_public_id: photoAsset?.publicId,
                        phase: 'draft',
                        status: createTournamentDto.status,
                        created_by: requestingUserId,
                    },
                    select: { id: true },
                });
                await transaction.tournament_lifecycle_events.create({
                    data: {
                        tournament_id: createdTournament.id,
                        actor_user_id: requestingUserId,
                        from_phase: null,
                        to_phase: 'draft',
                        reason: 'Torneo creado en estado Borrador.',
                    },
                });
                const replacedImages = await this.syncTournamentSponsors(transaction, createdTournament.id, createTournamentDto.sponsors ?? [], sponsorLogoAssets);
                return {
                    tournament: await this.findTournamentInAssociation(transaction, associationId, createdTournament.id),
                    replacedImages,
                };
            });
            tournament = createResult.tournament;
            replacedSponsorImages = createResult.replacedImages;
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([
                photoAsset,
                ...sponsorLogoAssets.values(),
            ]);
            throw error;
        }
        await this.deleteUnreferencedImages(replacedSponsorImages);
        return (0, association_tournament_response_mapper_1.toAssociationTournamentResponse)(tournament);
    }
    async findOne(associationId, tournamentId, requestingUserId) {
        const permissions = await this.associationsService.getAssociationPermissions(this.prisma, associationId, requestingUserId);
        const tournament = await this.findTournamentInAssociation(this.prisma, associationId, tournamentId);
        if (!permissions.canManageTournaments && !this.isAvailable(tournament)) {
            throw this.tournamentNotFound(tournamentId, associationId);
        }
        return (0, association_tournament_response_mapper_1.toAssociationTournamentResponse)(tournament);
    }
    async update(associationId, tournamentId, requestingUserId, updateTournamentDto, photo, sponsorLogos = []) {
        await this.requireManagementPermission(this.prisma, associationId, requestingUserId);
        const currentTournament = await this.findTournamentInAssociation(this.prisma, associationId, tournamentId);
        await this.assertTournamentUpdateAllowed(this.prisma, currentTournament, updateTournamentDto);
        this.assertValidDates(this.mergeDates(currentTournament, updateTournamentDto));
        this.assertValidCategoryAgeRange(updateTournamentDto.categoryMinAge === undefined
            ? currentTournament.category_min_age
            : updateTournamentDto.categoryMinAge, updateTournamentDto.categoryMaxAge === undefined
            ? currentTournament.category_max_age
            : updateTournamentDto.categoryMaxAge);
        let newPhoto;
        let sponsorLogoAssets = new Map();
        let replacedSponsorImages = [];
        let tournament;
        let previousPhoto = {
            url: currentTournament.photo_url,
            publicId: currentTournament.photo_public_id,
        };
        try {
            if (photo) {
                newPhoto = await this.imageStorage.saveTournamentPhoto(photo);
            }
            sponsorLogoAssets = await this.uploadSponsorLogos(updateTournamentDto.sponsors ?? [], sponsorLogos);
            const updateResult = await this.prisma.$transaction(async (transaction) => {
                await this.requireManagementPermission(transaction, associationId, requestingUserId);
                const persistedTournament = await this.findTournamentInAssociation(transaction, associationId, tournamentId);
                await this.assertTournamentUpdateAllowed(transaction, persistedTournament, updateTournamentDto);
                this.assertValidDates(this.mergeDates(persistedTournament, updateTournamentDto));
                this.assertValidCategoryAgeRange(updateTournamentDto.categoryMinAge === undefined
                    ? persistedTournament.category_min_age
                    : updateTournamentDto.categoryMinAge, updateTournamentDto.categoryMaxAge === undefined
                    ? persistedTournament.category_max_age
                    : updateTournamentDto.categoryMaxAge);
                const tournamentType = await this.findTournamentTypePlayerLimits(transaction, updateTournamentDto.tournamentTypeId === undefined
                    ? persistedTournament.tournament_types.id
                    : BigInt(updateTournamentDto.tournamentTypeId));
                this.assertTournamentPlayerRangeWithinType(tournamentType, updateTournamentDto.minPlayersPerTeam ??
                    persistedTournament.min_players_per_team, updateTournamentDto.maxPlayersPerTeam ??
                    persistedTournament.max_players_per_team);
                this.assertTournamentCapacityWithinType(tournamentType, updateTournamentDto.maxTeams ?? persistedTournament.max_teams);
                await transaction.tournaments.update({
                    where: {
                        id_association_id: {
                            id: tournamentId,
                            association_id: associationId,
                        },
                    },
                    data: {
                        name: updateTournamentDto.name,
                        description: updateTournamentDto.description,
                        tournament_type_id: updateTournamentDto.tournamentTypeId === undefined
                            ? undefined
                            : BigInt(updateTournamentDto.tournamentTypeId),
                        sport_type: updateTournamentDto.sportType === undefined
                            ? undefined
                            : football_constants_1.FOOTBALL_SPORT_TYPE,
                        modality: updateTournamentDto.modality,
                        category_name: updateTournamentDto.categoryName,
                        category_min_age: updateTournamentDto.categoryMinAge,
                        category_max_age: updateTournamentDto.categoryMaxAge,
                        category_gender: updateTournamentDto.categoryGender,
                        start_date: updateTournamentDto.startDate === undefined
                            ? undefined
                            : new Date(updateTournamentDto.startDate),
                        end_date: this.toDate(updateTournamentDto.endDate),
                        registration_start_date: this.toDate(updateTournamentDto.registrationStartDate),
                        registration_end_date: this.toDate(updateTournamentDto.registrationEndDate),
                        registration_fee: updateTournamentDto.registrationFee,
                        currency_code: updateTournamentDto.currencyCode,
                        grand_prize: updateTournamentDto.grandPrize,
                        second_prize: updateTournamentDto.secondPrize,
                        third_prize: updateTournamentDto.thirdPrize,
                        max_teams: updateTournamentDto.maxTeams,
                        min_players_per_team: updateTournamentDto.minPlayersPerTeam,
                        max_players_per_team: updateTournamentDto.maxPlayersPerTeam,
                        location_name: updateTournamentDto.locationName,
                        location_address: updateTournamentDto.locationAddress,
                        rules_url: updateTournamentDto.rulesUrl,
                        photo_url: newPhoto?.url,
                        photo_public_id: newPhoto?.publicId,
                        status: updateTournamentDto.status,
                    },
                });
                if (updateTournamentDto.sponsors !== undefined) {
                    replacedSponsorImages = await this.syncTournamentSponsors(transaction, tournamentId, updateTournamentDto.sponsors, sponsorLogoAssets);
                }
                const updatedTournament = await this.findTournamentInAssociation(transaction, associationId, tournamentId);
                return {
                    previousPhoto: {
                        url: persistedTournament.photo_url,
                        publicId: persistedTournament.photo_public_id,
                    },
                    tournament: updatedTournament,
                };
            });
            tournament = updateResult.tournament;
            previousPhoto = updateResult.previousPhoto;
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([
                newPhoto,
                ...sponsorLogoAssets.values(),
            ]);
            throw error;
        }
        if (newPhoto && previousPhoto.url !== newPhoto.url) {
            await this.deleteImageIfUnreferenced(previousPhoto);
        }
        await this.deleteUnreferencedImages(replacedSponsorImages);
        return (0, association_tournament_response_mapper_1.toAssociationTournamentResponse)(tournament);
    }
    async remove(associationId, tournamentId, requestingUserId) {
        await this.requireManagementPermission(this.prisma, associationId, requestingUserId);
        const deletedTournament = await this.prisma.$transaction(async (transaction) => {
            await this.requireManagementPermission(transaction, associationId, requestingUserId);
            const tournament = await this.findTournamentInAssociation(transaction, associationId, tournamentId);
            if (tournament.phase !== 'draft') {
                throw new common_1.BadRequestException('Solo se puede eliminar permanentemente un torneo en borrador.');
            }
            const registrationCount = await transaction.tournament_team_registrations.count({
                where: { tournament_id: tournamentId },
            });
            if (registrationCount > 0) {
                throw new common_1.BadRequestException('No se puede eliminar un torneo que ya tiene inscripciones.');
            }
            await transaction.tournaments.delete({
                where: {
                    id_association_id: {
                        id: tournamentId,
                        association_id: associationId,
                    },
                },
            });
            return tournament;
        });
        await this.deleteImageIfUnreferenced({
            url: deletedTournament.photo_url,
            publicId: deletedTournament.photo_public_id,
        });
        return (0, association_tournament_response_mapper_1.toAssociationTournamentResponse)(deletedTournament);
    }
    async requireManagementPermission(client, associationId, requestingUserId) {
        const permissions = await this.associationsService.getAssociationPermissions(client, associationId, requestingUserId);
        if (!permissions.canManageTournaments) {
            throw new common_1.ForbiddenException('No tienes permisos para administrar los torneos de esta asociación.');
        }
    }
    async requireTournamentManagementPermission(client, tournamentId, requestingUserId) {
        const tournament = await client.tournaments.findUnique({
            where: { id: tournamentId },
            select: { association_id: true, created_by: true },
        });
        if (!tournament) {
            throw new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe.`);
        }
        if (tournament.created_by === requestingUserId)
            return;
        const [superAdmin, tournamentAdmin, associationManager] = await Promise.all([
            client.user_roles.findUnique({
                where: {
                    user_id_role_code: {
                        user_id: requestingUserId,
                        role_code: 'SUPER_ADMIN',
                    },
                },
                select: { user_id: true },
            }),
            client.tournament_administrators.findFirst({
                where: {
                    tournament_id: tournamentId,
                    user_id: requestingUserId,
                    status: 'active',
                    permission_level: { not: 'viewer' },
                },
                select: { user_id: true },
            }),
            client.associations.findFirst({
                where: {
                    id: tournament.association_id,
                    OR: [
                        { owner_user_id: requestingUserId },
                        {
                            association_administrators: {
                                some: {
                                    user_id: requestingUserId,
                                    status: 'active',
                                    permission_level: { not: 'viewer' },
                                },
                            },
                        },
                    ],
                },
                select: { id: true },
            }),
        ]);
        if (!superAdmin && !tournamentAdmin && !associationManager) {
            throw new common_1.ForbiddenException('No tienes permisos para administrar los patrocinadores de este torneo.');
        }
    }
    async assertTournamentUpdateAllowed(client, tournament, dto) {
        if (['finished', 'archived', 'cancelled'].includes(tournament.phase)) {
            throw new common_1.BadRequestException('Un torneo finalizado, archivado o cancelado ya no admite edición general.');
        }
        const structuralChanges = [
            dto.tournamentTypeId !== undefined &&
                BigInt(dto.tournamentTypeId) !== tournament.tournament_types.id,
            dto.sportType !== undefined && dto.sportType !== tournament.sport_type,
            dto.modality !== undefined && dto.modality !== tournament.modality,
            dto.categoryName !== undefined &&
                dto.categoryName !== tournament.category_name,
            dto.categoryMinAge !== undefined &&
                dto.categoryMinAge !== tournament.category_min_age,
            dto.categoryMaxAge !== undefined &&
                dto.categoryMaxAge !== tournament.category_max_age,
            dto.categoryGender !== undefined &&
                dto.categoryGender !== tournament.category_gender,
            dto.maxTeams !== undefined && dto.maxTeams !== tournament.max_teams,
            dto.minPlayersPerTeam !== undefined &&
                dto.minPlayersPerTeam !== tournament.min_players_per_team,
            dto.maxPlayersPerTeam !== undefined &&
                dto.maxPlayersPerTeam !== tournament.max_players_per_team,
        ].some(Boolean);
        const paymentConfigurationChanges = [
            dto.registrationFee !== undefined &&
                Number(dto.registrationFee) !== Number(tournament.registration_fee),
            dto.currencyCode !== undefined &&
                dto.currencyCode !== tournament.currency_code.trim(),
        ].some(Boolean);
        if (['validation', 'scheduled', 'in_progress'].includes(tournament.phase)) {
            const registrationChanges = [
                this.dateChanged(dto.registrationStartDate, tournament.registration_start_date),
                this.dateChanged(dto.registrationEndDate, tournament.registration_end_date),
                paymentConfigurationChanges,
            ].some(Boolean);
            if (structuralChanges || registrationChanges) {
                throw new common_1.BadRequestException('La configuración de participantes e inscripciones queda bloqueada desde la fase de Validación.');
            }
            return;
        }
        if (tournament.phase === 'registration' &&
            (structuralChanges || paymentConfigurationChanges)) {
            const registrations = await client.tournament_team_registrations.count({
                where: { tournament_id: tournament.id },
            });
            if (registrations > 0) {
                throw new common_1.BadRequestException('No puedes cambiar el formato, la categoría, los cupos, el rango de jugadores, el valor ni la moneda después de recibir inscripciones.');
            }
        }
    }
    assertValidCategoryAgeRange(minimumAge, maximumAge) {
        if (minimumAge !== null && maximumAge !== null && minimumAge > maximumAge) {
            throw new common_1.BadRequestException('La edad mínima de la categoría no puede ser mayor que la edad máxima.');
        }
    }
    assertRulesEditable(phase) {
        if (!['draft', 'registration', 'validation', 'scheduled'].includes(phase)) {
            throw new common_1.BadRequestException('El reglamento no se puede editar después de iniciar, finalizar, archivar o cancelar el torneo.');
        }
    }
    async assertSponsorsEditable(client, tournamentId) {
        const tournament = await client.tournaments.findUnique({
            where: { id: tournamentId },
            select: { phase: true, start_date: true, end_date: true },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        }
        if (['finished', 'archived', 'cancelled'].includes(tournament.phase)) {
            throw new common_1.BadRequestException('Los patrocinadores no se pueden modificar en un torneo finalizado, archivado o cancelado.');
        }
        return {
            startDate: tournament.start_date,
            endDate: tournament.end_date,
        };
    }
    dateChanged(value, current) {
        if (value === undefined)
            return false;
        const nextDate = this.toDate(value);
        return (nextDate?.getTime() ?? null) !== (current?.getTime() ?? null);
    }
    sponsorData(dto, logo) {
        return {
            name: dto.name,
            tax_id: dto.taxId ?? null,
            contact_name: dto.contactName ?? null,
            email: dto.email ?? null,
            phone: dto.phone ?? null,
            website_url: dto.websiteUrl ?? null,
            logo_url: logo?.url,
            logo_public_id: logo?.publicId,
            status: 'active',
            updated_at: new Date(),
        };
    }
    tournamentSponsorData(dto, agreementDates) {
        return {
            sponsorship_level: dto.sponsorshipLevel ?? null,
            contribution_type: dto.contributionType ?? 'money',
            contribution_amount: dto.contributionAmount ?? null,
            currency_code: dto.contributionCurrencyCode?.toUpperCase() ?? 'COP',
            contribution_description: dto.contributionDescription ?? null,
            agreement_start_date: agreementDates.startDate,
            agreement_end_date: agreementDates.endDate,
            status: dto.status ?? 'active',
        };
    }
    async findManagedAssociationIds(requestingUserId, associationIds) {
        const uniqueAssociationIds = [...new Set(associationIds)];
        if (uniqueAssociationIds.length === 0)
            return new Set();
        const roles = await this.prisma.user_roles.findMany({
            where: {
                user_id: requestingUserId,
                role_code: { in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] },
            },
            select: { role_code: true },
        });
        const roleCodes = new Set(roles.map(({ role_code }) => role_code));
        if (roleCodes.has('SUPER_ADMIN'))
            return new Set(uniqueAssociationIds);
        if (!roleCodes.has('ASSOCIATION_ADMIN'))
            return new Set();
        const manageableAssociations = await this.prisma.associations.findMany({
            where: {
                id: { in: uniqueAssociationIds },
                OR: [
                    { owner_user_id: requestingUserId },
                    {
                        association_administrators: {
                            some: {
                                user_id: requestingUserId,
                                status: 'active',
                                permission_level: 'administrator',
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        return new Set(manageableAssociations.map(({ id }) => id));
    }
    sanitizeRulesContent(value) {
        if (value === null)
            return null;
        const sanitized = (0, sanitize_html_1.default)(value, {
            allowedTags: [
                'h1',
                'h2',
                'h3',
                'p',
                'strong',
                'em',
                's',
                'blockquote',
                'ul',
                'ol',
                'li',
                'br',
                'hr',
            ],
            allowedAttributes: {},
        }).trim();
        return sanitized === '' ? null : sanitized;
    }
    async findTournamentTypePlayerLimits(client, tournamentTypeId) {
        const tournamentType = await client.tournament_types.findUnique({
            where: { id: tournamentTypeId },
            select: {
                id: true,
                name: true,
                min_players_per_team: true,
                max_players_per_team: true,
            },
        });
        if (!tournamentType) {
            throw new common_1.NotFoundException(`El tipo de torneo con ID ${tournamentTypeId.toString()} no existe.`);
        }
        return tournamentType;
    }
    assertTournamentPlayerRangeWithinType(tournamentType, minimumPlayers, maximumPlayers) {
        if (minimumPlayers > maximumPlayers) {
            throw new common_1.BadRequestException('El mínimo de jugadores por equipo no puede superar el máximo.');
        }
        if (minimumPlayers < tournamentType.min_players_per_team ||
            maximumPlayers > tournamentType.max_players_per_team) {
            throw new common_1.BadRequestException(`El rango de jugadores por equipo para ${tournamentType.name} debe estar dentro de ${tournamentType.min_players_per_team} a ${tournamentType.max_players_per_team}.`);
        }
    }
    assertTournamentCapacityWithinType(tournamentType, maxTeams) {
        const normalizedName = tournamentType.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('es');
        const directElimination = normalizedName.includes('eliminacion') &&
            !normalizedName.includes('mixto');
        if (directElimination &&
            !competition_engine_1.DIRECT_KNOCKOUT_SIZES.includes(maxTeams))
            throw new common_1.BadRequestException('Un torneo de eliminación directa debe tener 8, 16 o 32 equipos.');
    }
    assertTeamRosterWithinTournamentLimits(memberCount, minimumPlayers, maximumPlayers) {
        if (memberCount < minimumPlayers) {
            const missingPlayers = minimumPlayers - memberCount;
            throw new common_1.BadRequestException(`El equipo tiene ${memberCount} jugador${memberCount === 1 ? '' : 'es'} activo${memberCount === 1 ? '' : 's'}. El torneo exige entre ${minimumPlayers} y ${maximumPlayers} jugadores por equipo; faltan ${missingPlayers}.`);
        }
        if (memberCount > maximumPlayers) {
            const extraPlayers = memberCount - maximumPlayers;
            throw new common_1.BadRequestException(`El equipo tiene ${memberCount} jugadores activos. El torneo permite entre ${minimumPlayers} y ${maximumPlayers} jugadores por equipo; debes retirar ${extraPlayers}.`);
        }
    }
    toEligibilityRules(tournament) {
        return {
            name: tournament.name,
            startDate: tournament.start_date,
            categoryName: tournament.category_name,
            minAge: tournament.category_min_age,
            maxAge: tournament.category_max_age,
            gender: tournament.category_gender,
        };
    }
    toEligibilityPlayer(player) {
        return {
            fullName: player.full_name,
            birthDate: player.birth_date,
            gender: player.gender,
        };
    }
    assertTeamCategoryEligibility(tournament, players) {
        const issues = (0, tournament_eligibility_1.getTournamentEligibilityIssues)(tournament, players);
        if (issues.length > 0) {
            throw new common_1.BadRequestException((0, tournament_eligibility_1.formatTournamentEligibilityError)(tournament, issues));
        }
    }
    async uploadSponsorLogos(sponsorInputs, files) {
        const referencedIndexes = sponsorInputs
            .map(({ logoFileIndex }) => logoFileIndex)
            .filter((index) => index !== undefined);
        const uniqueIndexes = new Set(referencedIndexes);
        const allFilesReferencedExactlyOnce = referencedIndexes.length === uniqueIndexes.size &&
            uniqueIndexes.size === files.length &&
            [...uniqueIndexes].every((index) => Number.isInteger(index) && index >= 0 && index < files.length);
        if (!allFilesReferencedExactlyOnce) {
            throw new common_1.BadRequestException('Los logos de sponsors no coinciden con la información del formulario.');
        }
        const uploaded = new Map();
        try {
            for (let index = 0; index < files.length; index += 1) {
                uploaded.set(index, await this.imageStorage.saveSponsorLogo(files[index]));
            }
            return uploaded;
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([...uploaded.values()]);
            throw error;
        }
    }
    async syncTournamentSponsors(client, tournamentId, sponsorInputs, sponsorLogoAssets = new Map()) {
        const retainedSponsorIds = [];
        const retainedSponsorKeys = new Set();
        const replacedImages = [];
        const agreementDates = sponsorInputs.length > 0
            ? await this.assertSponsorsEditable(client, tournamentId)
            : null;
        for (const sponsorInput of sponsorInputs) {
            const startDate = agreementDates?.startDate ?? null;
            const endDate = agreementDates?.endDate ?? null;
            const logoAsset = sponsorInput.logoFileIndex === undefined
                ? undefined
                : sponsorLogoAssets.get(sponsorInput.logoFileIndex);
            const sponsorData = this.sponsorData(sponsorInput, logoAsset);
            let sponsorId;
            if (sponsorInput.sponsorId) {
                sponsorId = BigInt(sponsorInput.sponsorId);
                const existingSponsor = await client.sponsors.findUnique({
                    where: { id: sponsorId },
                    select: { id: true, logo_url: true, logo_public_id: true },
                });
                if (!existingSponsor) {
                    throw new common_1.NotFoundException(`El patrocinador con ID ${sponsorId.toString()} no existe.`);
                }
                if (logoAsset) {
                    replacedImages.push({
                        url: existingSponsor.logo_url,
                        publicId: existingSponsor.logo_public_id,
                    });
                }
                await client.sponsors.update({
                    where: { id: sponsorId },
                    data: sponsorData,
                });
            }
            else {
                const existingSponsor = sponsorInput.taxId
                    ? await client.sponsors.findUnique({
                        where: { tax_id: sponsorInput.taxId },
                        select: { id: true, logo_url: true, logo_public_id: true },
                    })
                    : null;
                if (existingSponsor) {
                    sponsorId = existingSponsor.id;
                    if (logoAsset) {
                        replacedImages.push({
                            url: existingSponsor.logo_url,
                            publicId: existingSponsor.logo_public_id,
                        });
                    }
                    await client.sponsors.update({
                        where: { id: sponsorId },
                        data: sponsorData,
                    });
                }
                else {
                    const createdSponsor = await client.sponsors.create({
                        data: sponsorData,
                        select: { id: true },
                    });
                    sponsorId = createdSponsor.id;
                }
            }
            const sponsorKey = sponsorId.toString();
            if (retainedSponsorKeys.has(sponsorKey)) {
                throw new common_1.BadRequestException(`El patrocinador ${sponsorInput.name} está repetido en el torneo.`);
            }
            retainedSponsorKeys.add(sponsorKey);
            retainedSponsorIds.push(sponsorId);
            await client.tournament_sponsors.upsert({
                where: {
                    tournament_id_sponsor_id: {
                        tournament_id: tournamentId,
                        sponsor_id: sponsorId,
                    },
                },
                create: {
                    tournament_id: tournamentId,
                    sponsor_id: sponsorId,
                    sponsorship_level: sponsorInput.sponsorshipLevel ?? null,
                    contribution_type: sponsorInput.contributionType ?? 'money',
                    contribution_amount: sponsorInput.contributionAmount ?? null,
                    currency_code: sponsorInput.contributionCurrencyCode?.toUpperCase() ?? 'COP',
                    contribution_description: sponsorInput.contributionDescription ?? null,
                    agreement_start_date: startDate,
                    agreement_end_date: endDate,
                    status: sponsorInput.status ?? 'active',
                },
                update: {
                    sponsorship_level: sponsorInput.sponsorshipLevel ?? null,
                    contribution_type: sponsorInput.contributionType ?? 'money',
                    contribution_amount: sponsorInput.contributionAmount ?? null,
                    currency_code: sponsorInput.contributionCurrencyCode?.toUpperCase() ?? 'COP',
                    contribution_description: sponsorInput.contributionDescription ?? null,
                    agreement_start_date: startDate,
                    agreement_end_date: endDate,
                    status: sponsorInput.status ?? 'active',
                },
            });
        }
        await client.tournament_sponsors.deleteMany({
            where: {
                tournament_id: tournamentId,
                ...(retainedSponsorIds.length > 0
                    ? { sponsor_id: { notIn: retainedSponsorIds } }
                    : {}),
            },
        });
        return replacedImages;
    }
    async findTournamentInAssociation(client, associationId, tournamentId) {
        const tournament = await client.tournaments.findUnique({
            where: {
                id_association_id: {
                    id: tournamentId,
                    association_id: associationId,
                },
            },
            select: association_tournament_response_mapper_1.associationTournamentResponseSelect,
        });
        if (!tournament) {
            throw this.tournamentNotFound(tournamentId, associationId);
        }
        return tournament;
    }
    tournamentNotFound(tournamentId, associationId) {
        return new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe en la asociación ${associationId.toString()}.`);
    }
    isAvailable(tournament) {
        return (tournament.status === 'active' &&
            tournament_lifecycle_constants_1.PUBLIC_TOURNAMENT_PHASES.includes(tournament.phase));
    }
    mergeDates(tournament, updateTournamentDto) {
        return {
            startDate: updateTournamentDto.startDate === undefined
                ? tournament.start_date
                : new Date(updateTournamentDto.startDate),
            endDate: updateTournamentDto.endDate === undefined
                ? tournament.end_date
                : (this.toDate(updateTournamentDto.endDate) ?? null),
            registrationStartDate: updateTournamentDto.registrationStartDate === undefined
                ? tournament.registration_start_date
                : (this.toDate(updateTournamentDto.registrationStartDate) ?? null),
            registrationEndDate: updateTournamentDto.registrationEndDate === undefined
                ? tournament.registration_end_date
                : (this.toDate(updateTournamentDto.registrationEndDate) ?? null),
        };
    }
    assertValidDates(dates) {
        if (dates.endDate && dates.endDate < dates.startDate) {
            throw new common_1.BadRequestException('La fecha de finalización no puede ser anterior a la fecha de inicio.');
        }
        if (dates.registrationStartDate &&
            dates.registrationStartDate > dates.startDate) {
            throw new common_1.BadRequestException('La fecha de inicio de inscripciones no puede ser posterior al inicio del torneo.');
        }
        if (dates.registrationStartDate &&
            dates.registrationEndDate &&
            dates.registrationEndDate < dates.registrationStartDate) {
            throw new common_1.BadRequestException('La fecha de cierre de inscripciones no puede ser anterior a su fecha de inicio.');
        }
    }
    toDate(value) {
        return value === null || value === undefined ? value : new Date(value);
    }
    async deleteImageIfUnreferenced(image) {
        try {
            if (!image.url || (await this.isImageReferenced(image.url))) {
                return;
            }
            await this.imageStorage.delete(image);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`No fue posible completar la limpieza post-commit de la foto del torneo: ${message}`);
        }
    }
    async deleteUnreferencedImages(images) {
        for (const image of images) {
            await this.deleteImageIfUnreferenced(image);
        }
    }
    async deleteImagesWithoutMaskingError(images) {
        await Promise.all(images.map((image) => this.deleteImageWithoutMaskingError(image)));
    }
    async isImageReferenced(imageUrl) {
        const [association, tournament, team, sponsor] = await Promise.all([
            this.prisma.associations.findFirst({
                where: { OR: [{ logo_url: imageUrl }, { cover_url: imageUrl }] },
                select: { id: true },
            }),
            this.prisma.tournaments.findFirst({
                where: { photo_url: imageUrl },
                select: { id: true },
            }),
            this.prisma.teams.findFirst({
                where: { photo_url: imageUrl },
                select: { id: true },
            }),
            this.prisma.sponsors.findFirst({
                where: { logo_url: imageUrl },
                select: { id: true },
            }),
        ]);
        return Boolean(association || tournament || team || sponsor);
    }
    async deleteImageWithoutMaskingError(image) {
        try {
            if (image)
                await this.imageStorage.delete(image);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`No fue posible eliminar la imagen del torneo: ${message}`);
        }
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = TournamentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        associations_service_1.AssociationsService,
        image_storage_service_1.ImageStorageService,
        competition_access_service_1.CompetitionAccessService])
], TournamentsService);
//# sourceMappingURL=tournaments.service.js.map