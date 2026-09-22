import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { AdvanceCompetitionDto, PreviewCompetitionDto } from './competition.dto';
import { CompetitionService } from './competition.service';
export declare class CompetitionController {
    private readonly service;
    constructor(service: CompetitionService);
    get(id: bigint, req: AuthenticatedRequest): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: import("./competition.engine").CompetitionPlan;
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
    options(id: bigint, req: AuthenticatedRequest): Promise<{
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
    preview(id: bigint, req: AuthenticatedRequest, dto: PreviewCompetitionDto): Promise<{
        plan: import("./competition.engine").CompetitionPlan;
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
    generate(id: bigint, req: AuthenticatedRequest, dto: PreviewCompetitionDto): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: import("./competition.engine").CompetitionPlan;
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
    advance(id: bigint, req: AuthenticatedRequest, dto: AdvanceCompetitionDto): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
    } | {
        plan: import("./competition.engine").CompetitionPlan;
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
}
