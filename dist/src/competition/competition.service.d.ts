import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdvanceCompetitionDto, CompetitionScheduleDto, CreateCompetitionTemplateDto, PreviewCompetitionDto, UpdateCompetitionLineupDto } from './competition.dto';
import { type CompetitionConfig, type CompetitionPlan, type CompetitionStage } from './competition.engine';
import { type StageBlueprint } from './competition.pipeline';
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
        hasPlan: boolean;
        canReorganize: boolean;
        totalMatches: number;
        playedMatches: number;
        playedPairings: string[][];
        currentConfig: CompetitionConfig | null;
        currentBlueprints: StageBlueprint[] | null;
        currentOrganizationMode: "planned" | "on_the_fly";
        currentSeed: string | null;
        currentLabel: string | null;
        planTeamIds: string[];
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
            config: CompetitionConfig;
            label: string;
        }[];
        templates: {
            id: string;
            name: string;
            description: string | null;
            mode: "planned" | "on_the_fly";
            blueprints: StageBlueprint[];
            label: string;
            isGlobal: boolean;
            createdAt: string;
        }[];
    }>;
    private prepare;
    private static readonly PLAYED_STATUSES;
    private collectPlayedResults;
    private retireCompetitionFixtures;
    private restorePlayedResults;
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
        reorganization: null;
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
        needsNextStageConfig?: undefined;
        canFinishHere?: undefined;
    } | {
        reorganization: null;
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
            blueprintIndex?: number;
            isPlayIn?: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
        needsNextStageConfig: boolean;
        canFinishHere: boolean;
    }>;
    updateLineup(id: bigint, actor: bigint, dto: UpdateCompetitionLineupDto): Promise<{
        lineup: {
            movedTeams: number;
            updatedMatches: number;
            playedMatches: number;
            freedSlots: number;
            removedMatches?: undefined;
        } | {
            movedTeams: number;
            updatedMatches: number;
            removedMatches: number;
            playedMatches: number;
            freedSlots?: undefined;
        };
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
        needsNextStageConfig?: undefined;
        canFinishHere?: undefined;
    } | {
        lineup: {
            movedTeams: number;
            updatedMatches: number;
            playedMatches: number;
            freedSlots: number;
            removedMatches?: undefined;
        } | {
            movedTeams: number;
            updatedMatches: number;
            removedMatches: number;
            playedMatches: number;
            freedSlots?: undefined;
        };
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
            blueprintIndex?: number;
            isPlayIn?: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
        needsNextStageConfig: boolean;
        canFinishHere: boolean;
    }>;
    get(id: bigint, actor: bigint): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
        needsNextStageConfig?: undefined;
        canFinishHere?: undefined;
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
            blueprintIndex?: number;
            isPlayIn?: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
        needsNextStageConfig: boolean;
        canFinishHere: boolean;
    }>;
    advance(id: bigint, actor: bigint, dto: AdvanceCompetitionDto): Promise<{
        plan: null;
        stages: never[];
        teams: never[];
        label: null;
        canAdvance: boolean;
        advanceBlocker: null;
        needsNextStageConfig?: undefined;
        canFinishHere?: undefined;
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
            blueprintIndex?: number;
            isPlayIn?: boolean;
        }[];
        canAdvance: boolean;
        advanceBlocker: string | null;
        needsNextStageConfig: boolean;
        canFinishHere: boolean;
    }>;
    private findTemplatesForAssociation;
    listTemplates(tournamentId: bigint, actor: bigint): Promise<{
        id: string;
        name: string;
        description: string | null;
        mode: "planned" | "on_the_fly";
        blueprints: StageBlueprint[];
        label: string;
        isGlobal: boolean;
        createdAt: string;
    }[]>;
    createTemplate(tournamentId: bigint, actor: bigint, dto: CreateCompetitionTemplateDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        mode: "planned" | "on_the_fly";
        blueprints: StageBlueprint[];
        label: string;
        isGlobal: boolean;
        createdAt: string;
    }>;
    deleteTemplate(tournamentId: bigint, templateId: bigint, actor: bigint): Promise<{
        deleted: boolean;
        id: string;
    }>;
    private scores;
    private checkDates;
    private competitors;
}
