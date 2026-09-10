import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { CreateDisciplinaryAppealDto } from './dto/create-disciplinary-appeal.dto';
import { DecideDisciplinaryActionDto } from './dto/decide-disciplinary-action.dto';
import { ListDisciplinaryActionsQueryDto } from './dto/list-disciplinary-actions-query.dto';
import { ResolveDisciplinaryAppealDto } from './dto/resolve-disciplinary-appeal.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';
import { UpdateDisciplinaryComplianceDto } from './dto/update-disciplinary-compliance.dto';
export declare class DisciplinaryActionsService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    create(requestingUserId: bigint, dto: CreateDisciplinaryActionDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    findReportOptions(requestingUserId: bigint, matchId: bigint): Promise<{
        matchId: string;
        tournamentId: string;
        tournamentName: string;
        tournamentPhase: string;
        matchDate: string | null;
        venue: string | null;
        teams: {
            id: string;
            name: string;
            players: {
                id: string;
                name: string;
                photoUrl: string | null;
                jerseyNumber: number | null;
            }[];
        }[];
    }>;
    findAll(requestingUserId: bigint, query: ListDisciplinaryActionsQueryDto): Promise<{
        items: {
            id: string;
            tournament: {
                id: string;
                name: string;
                phase: string;
            };
            match: {
                id: string;
                date: string | null;
                venue: string | null;
                status: string;
                score: string | null;
                homeTeam: string;
                awayTeam: string;
            } | null;
            team: {
                id: string;
                name: string;
            };
            player: {
                id: string;
                name: string;
                email: string;
                photoUrl: string | null;
                status: string;
                jerseyNumber: number | null;
            };
            cardType: string;
            reason: string;
            occurredAt: string;
            status: string;
            reportedBy: {
                id: string;
                name: string;
            };
            review: {
                by: {
                    id: string;
                    name: string;
                };
                at: string | null;
            } | null;
            decision: {
                by: {
                    id: string;
                    name: string;
                };
                at: string | null;
                notes: string | null;
            } | null;
            appealDeadline: string | null;
            canAppeal: boolean;
            appeal: {
                id: string;
                message: string;
                status: string;
                createdAt: string;
                resolutionNotes: string | null;
                reviewedAt: string | null;
                reviewedBy: {
                    id: string;
                    name: string;
                } | null;
            } | null;
            suspension: {
                id: string;
                matchesCount: number | null;
                servedMatches: number;
                startDate: string | null;
                endDate: string | null;
                reason: string | null;
                status: string;
                completedAt: string | null;
            } | null;
            fine: {
                id: string;
                amount: string;
                currencyCode: string;
                dueDate: string | null;
                status: string;
                paidAt: string | null;
                paymentReference: string | null;
                notes: string | null;
            } | null;
            accumulation: {
                nextAutomaticSuspensionAt: number;
                yellowCards: number;
                doubleYellowCards: number;
                redCards: number;
            };
            timeline: {
                id: string;
                type: string;
                message: string | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                actor: {
                    id: string;
                    name: string;
                };
                createdAt: string;
            }[];
            createdAt: string;
            updatedAt: string;
        }[];
        metrics: {
            total: number;
            reported: number;
            underReview: number;
            approved: number;
            dismissed: number;
            appealsPending: number;
        };
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
    }>;
    findOne(id: bigint, requestingUserId: bigint): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    startReview(id: bigint, requestingUserId: bigint): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    decide(id: bigint, requestingUserId: bigint, dto: DecideDisciplinaryActionDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    appeal(id: bigint, requestingUserId: bigint, dto: CreateDisciplinaryAppealDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    resolveAppeal(id: bigint, requestingUserId: bigint, dto: ResolveDisciplinaryAppealDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    updateCompliance(id: bigint, requestingUserId: bigint, dto: UpdateDisciplinaryComplianceDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    update(id: bigint, requestingUserId: bigint, dto: UpdateDisciplinaryActionDto): Promise<{
        id: string;
        tournament: {
            id: string;
            name: string;
            phase: string;
        };
        match: {
            id: string;
            date: string | null;
            venue: string | null;
            status: string;
            score: string | null;
            homeTeam: string;
            awayTeam: string;
        } | null;
        team: {
            id: string;
            name: string;
        };
        player: {
            id: string;
            name: string;
            email: string;
            photoUrl: string | null;
            status: string;
            jerseyNumber: number | null;
        };
        cardType: string;
        reason: string;
        occurredAt: string;
        status: string;
        reportedBy: {
            id: string;
            name: string;
        };
        review: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
        } | null;
        decision: {
            by: {
                id: string;
                name: string;
            };
            at: string | null;
            notes: string | null;
        } | null;
        appealDeadline: string | null;
        canAppeal: boolean;
        appeal: {
            id: string;
            message: string;
            status: string;
            createdAt: string;
            resolutionNotes: string | null;
            reviewedAt: string | null;
            reviewedBy: {
                id: string;
                name: string;
            } | null;
        } | null;
        suspension: {
            id: string;
            matchesCount: number | null;
            servedMatches: number;
            startDate: string | null;
            endDate: string | null;
            reason: string | null;
            status: string;
            completedAt: string | null;
        } | null;
        fine: {
            id: string;
            amount: string;
            currencyCode: string;
            dueDate: string | null;
            status: string;
            paidAt: string | null;
            paymentReference: string | null;
            notes: string | null;
        } | null;
        accumulation: {
            nextAutomaticSuspensionAt: number;
            yellowCards: number;
            doubleYellowCards: number;
            redCards: number;
        };
        timeline: {
            id: string;
            type: string;
            message: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            actor: {
                id: string;
                name: string;
            };
            createdAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    remove(id: bigint, requestingUserId: bigint): Promise<{
        deleted: boolean;
        id: string;
    }>;
    private findExisting;
    private buildVisibleWhere;
    private assertCanViewAction;
    private assertAcceptedRefereeAssignment;
    private assertValidSubject;
    private resolveAutomaticSuspension;
    private getAccumulationForActions;
    private accumulationKey;
    private toResponse;
    private toReportTeam;
    private toPerson;
    private createEvent;
    private findSuperAdminIds;
    private notifyMany;
    private buildMeasuresText;
    private calculateBlockedUntil;
    private addDays;
    private formatDate;
    private isUniqueConstraint;
}
