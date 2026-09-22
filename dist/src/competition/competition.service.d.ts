import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdvanceCompetitionDto, CompetitionScheduleDto, PreviewCompetitionDto } from './competition.dto';
import { type CompetitionPlan, type CompetitionStage } from './competition.engine';
export declare function scheduleFixtures(stage: CompetitionStage, schedule: CompetitionScheduleDto): {
    matchDate: string | null;
    key: string;
    home: string;
    away: string;
    round: number;
    group: string;
    venue?: string | null;
    durationMinutes?: number;
}[];
export declare function assignApprovedTeamToCompetition(tx: Prisma.TransactionClient, tournamentId: bigint, teamId: bigint): Promise<void>;
export declare class CompetitionService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    private tournament;
    options(id: bigint, actor: bigint): Promise<{
        teams: {
            id: string;
            name: string;
        }[];
        capacity: number;
        pendingSlots: number;
        originalType: string;
        phase: string;
        startDate: string;
        venue: string | null;
        blockers: string[];
        suggestions: {
            totalMatches: number;
            minimumMatches: number;
            groupSizes: number[];
            qualified: number;
            byes: number;
            config: import("./competition.engine").CompetitionConfig;
            label: string;
        }[];
    }>;
    private prepare;
    preview(id: bigint, actor: bigint, dto: PreviewCompetitionDto): Promise<{
        plan: CompetitionPlan;
        fixtures: import("./competition.engine").Fixture[];
        summary: {
            totalMatches: number;
            minimumMatches: number;
            groupSizes: number[];
            qualified: number;
            byes: number;
        };
        label: string;
    }>;
    generate(id: bigint, actor: bigint, dto: PreviewCompetitionDto): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: CompetitionPlan;
        label: string;
        teams: {
            id: string;
            teamId: string | null;
            name: string;
            placeholder: boolean;
        }[];
        stages: {
            tables: {
                group: string;
                rows: import("./competition.engine").Standing[];
            }[];
            matches: {
                id: string | null;
                matchDate: string | null;
                venue: string | null;
                status: string;
                homeScore: number | null;
                awayScore: number | null;
                homePenalties: number | null;
                awayPenalties: number | null;
                refereeName: string | null;
                refereeStatus: string | null;
                key: string;
                home: string;
                away: string;
                round: number;
                group: string;
                durationMinutes?: number;
            }[];
            id: number;
            label: string;
            kind: "points" | "knockout";
            groups: {
                name: string;
                teams: string[];
            }[];
            fixtures: import("./competition.engine").Fixture[];
            byes: string[];
            resolved: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
    }>;
    get(id: bigint, actor: bigint): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: CompetitionPlan;
        label: string;
        teams: {
            id: string;
            teamId: string | null;
            name: string;
            placeholder: boolean;
        }[];
        stages: {
            tables: {
                group: string;
                rows: import("./competition.engine").Standing[];
            }[];
            matches: {
                id: string | null;
                matchDate: string | null;
                venue: string | null;
                status: string;
                homeScore: number | null;
                awayScore: number | null;
                homePenalties: number | null;
                awayPenalties: number | null;
                refereeName: string | null;
                refereeStatus: string | null;
                key: string;
                home: string;
                away: string;
                round: number;
                group: string;
                durationMinutes?: number;
            }[];
            id: number;
            label: string;
            kind: "points" | "knockout";
            groups: {
                name: string;
                teams: string[];
            }[];
            fixtures: import("./competition.engine").Fixture[];
            byes: string[];
            resolved: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
    }>;
    advance(id: bigint, actor: bigint, dto: AdvanceCompetitionDto): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: CompetitionPlan;
        label: string;
        teams: {
            id: string;
            teamId: string | null;
            name: string;
            placeholder: boolean;
        }[];
        stages: {
            tables: {
                group: string;
                rows: import("./competition.engine").Standing[];
            }[];
            matches: {
                id: string | null;
                matchDate: string | null;
                venue: string | null;
                status: string;
                homeScore: number | null;
                awayScore: number | null;
                homePenalties: number | null;
                awayPenalties: number | null;
                refereeName: string | null;
                refereeStatus: string | null;
                key: string;
                home: string;
                away: string;
                round: number;
                group: string;
                durationMinutes?: number;
            }[];
            id: number;
            label: string;
            kind: "points" | "knockout";
            groups: {
                name: string;
                teams: string[];
            }[];
            fixtures: import("./competition.engine").Fixture[];
            byes: string[];
            resolved: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
    }>;
    private scores;
    private checkDates;
    private competitors;
}
