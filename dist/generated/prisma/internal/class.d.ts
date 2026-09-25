import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get auth_sessions(): Prisma.auth_sessionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get association_administrators(): Prisma.association_administratorsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get associations(): Prisma.associationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get association_announcements(): Prisma.association_announcementsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disciplinary_actions(): Prisma.disciplinary_actionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fines(): Prisma.finesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get match_referees(): Prisma.match_refereesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get matches(): Prisma.matchesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get referee_availability(): Prisma.referee_availabilityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get referee_assignment_events(): Prisma.referee_assignment_eventsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get player_match_stats(): Prisma.player_match_statsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get roles(): Prisma.rolesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sponsors(): Prisma.sponsorsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get suspensions(): Prisma.suspensionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disciplinary_appeals(): Prisma.disciplinary_appealsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disciplinary_events(): Prisma.disciplinary_eventsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get team_members(): Prisma.team_membersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get teams(): Prisma.teamsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_administrators(): Prisma.tournament_administratorsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_referees(): Prisma.tournament_refereesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_sponsors(): Prisma.tournament_sponsorsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_team_players(): Prisma.tournament_team_playersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_team_registrations(): Prisma.tournament_team_registrationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notifications(): Prisma.notificationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification_preferences(): Prisma.notification_preferencesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_registration_events(): Prisma.tournament_registration_eventsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_lifecycle_events(): Prisma.tournament_lifecycle_eventsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournament_types(): Prisma.tournament_typesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tournaments(): Prisma.tournamentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user_roles(): Prisma.user_rolesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get users(): Prisma.usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
