import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly auth_sessions: "auth_sessions";
    readonly association_administrators: "association_administrators";
    readonly associations: "associations";
    readonly association_announcements: "association_announcements";
    readonly disciplinary_actions: "disciplinary_actions";
    readonly fines: "fines";
    readonly match_referees: "match_referees";
    readonly matches: "matches";
    readonly referee_availability: "referee_availability";
    readonly referee_assignment_events: "referee_assignment_events";
    readonly player_match_stats: "player_match_stats";
    readonly roles: "roles";
    readonly sponsors: "sponsors";
    readonly suspensions: "suspensions";
    readonly disciplinary_appeals: "disciplinary_appeals";
    readonly disciplinary_events: "disciplinary_events";
    readonly team_members: "team_members";
    readonly teams: "teams";
    readonly tournament_administrators: "tournament_administrators";
    readonly tournament_referees: "tournament_referees";
    readonly tournament_sponsors: "tournament_sponsors";
    readonly tournament_team_players: "tournament_team_players";
    readonly tournament_team_registrations: "tournament_team_registrations";
    readonly notifications: "notifications";
    readonly notification_preferences: "notification_preferences";
    readonly tournament_registration_events: "tournament_registration_events";
    readonly tournament_lifecycle_events: "tournament_lifecycle_events";
    readonly tournament_types: "tournament_types";
    readonly tournaments: "tournaments";
    readonly user_roles: "user_roles";
    readonly users: "users";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "auth_sessions" | "association_administrators" | "associations" | "association_announcements" | "disciplinary_actions" | "fines" | "match_referees" | "matches" | "referee_availability" | "referee_assignment_events" | "player_match_stats" | "roles" | "sponsors" | "suspensions" | "disciplinary_appeals" | "disciplinary_events" | "team_members" | "teams" | "tournament_administrators" | "tournament_referees" | "tournament_sponsors" | "tournament_team_players" | "tournament_team_registrations" | "notifications" | "notification_preferences" | "tournament_registration_events" | "tournament_lifecycle_events" | "tournament_types" | "tournaments" | "user_roles" | "users";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        auth_sessions: {
            payload: Prisma.$auth_sessionsPayload<ExtArgs>;
            fields: Prisma.auth_sessionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.auth_sessionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.auth_sessionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                findFirst: {
                    args: Prisma.auth_sessionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.auth_sessionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                findMany: {
                    args: Prisma.auth_sessionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>[];
                };
                create: {
                    args: Prisma.auth_sessionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                createMany: {
                    args: Prisma.auth_sessionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.auth_sessionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>[];
                };
                delete: {
                    args: Prisma.auth_sessionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                update: {
                    args: Prisma.auth_sessionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                deleteMany: {
                    args: Prisma.auth_sessionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.auth_sessionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.auth_sessionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>[];
                };
                upsert: {
                    args: Prisma.auth_sessionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$auth_sessionsPayload>;
                };
                aggregate: {
                    args: Prisma.Auth_sessionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuth_sessions>;
                };
                groupBy: {
                    args: Prisma.auth_sessionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Auth_sessionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.auth_sessionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Auth_sessionsCountAggregateOutputType> | number;
                };
            };
        };
        association_administrators: {
            payload: Prisma.$association_administratorsPayload<ExtArgs>;
            fields: Prisma.association_administratorsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.association_administratorsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.association_administratorsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                findFirst: {
                    args: Prisma.association_administratorsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.association_administratorsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                findMany: {
                    args: Prisma.association_administratorsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>[];
                };
                create: {
                    args: Prisma.association_administratorsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                createMany: {
                    args: Prisma.association_administratorsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.association_administratorsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>[];
                };
                delete: {
                    args: Prisma.association_administratorsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                update: {
                    args: Prisma.association_administratorsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                deleteMany: {
                    args: Prisma.association_administratorsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.association_administratorsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.association_administratorsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>[];
                };
                upsert: {
                    args: Prisma.association_administratorsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_administratorsPayload>;
                };
                aggregate: {
                    args: Prisma.Association_administratorsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssociation_administrators>;
                };
                groupBy: {
                    args: Prisma.association_administratorsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Association_administratorsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.association_administratorsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Association_administratorsCountAggregateOutputType> | number;
                };
            };
        };
        associations: {
            payload: Prisma.$associationsPayload<ExtArgs>;
            fields: Prisma.associationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.associationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.associationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                findFirst: {
                    args: Prisma.associationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.associationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                findMany: {
                    args: Prisma.associationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>[];
                };
                create: {
                    args: Prisma.associationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                createMany: {
                    args: Prisma.associationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.associationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>[];
                };
                delete: {
                    args: Prisma.associationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                update: {
                    args: Prisma.associationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                deleteMany: {
                    args: Prisma.associationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.associationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.associationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>[];
                };
                upsert: {
                    args: Prisma.associationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$associationsPayload>;
                };
                aggregate: {
                    args: Prisma.AssociationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssociations>;
                };
                groupBy: {
                    args: Prisma.associationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssociationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.associationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssociationsCountAggregateOutputType> | number;
                };
            };
        };
        association_announcements: {
            payload: Prisma.$association_announcementsPayload<ExtArgs>;
            fields: Prisma.association_announcementsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.association_announcementsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.association_announcementsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                findFirst: {
                    args: Prisma.association_announcementsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.association_announcementsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                findMany: {
                    args: Prisma.association_announcementsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>[];
                };
                create: {
                    args: Prisma.association_announcementsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                createMany: {
                    args: Prisma.association_announcementsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.association_announcementsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>[];
                };
                delete: {
                    args: Prisma.association_announcementsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                update: {
                    args: Prisma.association_announcementsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                deleteMany: {
                    args: Prisma.association_announcementsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.association_announcementsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.association_announcementsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>[];
                };
                upsert: {
                    args: Prisma.association_announcementsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$association_announcementsPayload>;
                };
                aggregate: {
                    args: Prisma.Association_announcementsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssociation_announcements>;
                };
                groupBy: {
                    args: Prisma.association_announcementsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Association_announcementsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.association_announcementsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Association_announcementsCountAggregateOutputType> | number;
                };
            };
        };
        disciplinary_actions: {
            payload: Prisma.$disciplinary_actionsPayload<ExtArgs>;
            fields: Prisma.disciplinary_actionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.disciplinary_actionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.disciplinary_actionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                findFirst: {
                    args: Prisma.disciplinary_actionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.disciplinary_actionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                findMany: {
                    args: Prisma.disciplinary_actionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>[];
                };
                create: {
                    args: Prisma.disciplinary_actionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                createMany: {
                    args: Prisma.disciplinary_actionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.disciplinary_actionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>[];
                };
                delete: {
                    args: Prisma.disciplinary_actionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                update: {
                    args: Prisma.disciplinary_actionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                deleteMany: {
                    args: Prisma.disciplinary_actionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.disciplinary_actionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.disciplinary_actionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>[];
                };
                upsert: {
                    args: Prisma.disciplinary_actionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_actionsPayload>;
                };
                aggregate: {
                    args: Prisma.Disciplinary_actionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisciplinary_actions>;
                };
                groupBy: {
                    args: Prisma.disciplinary_actionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_actionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.disciplinary_actionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_actionsCountAggregateOutputType> | number;
                };
            };
        };
        fines: {
            payload: Prisma.$finesPayload<ExtArgs>;
            fields: Prisma.finesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.finesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.finesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                findFirst: {
                    args: Prisma.finesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.finesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                findMany: {
                    args: Prisma.finesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>[];
                };
                create: {
                    args: Prisma.finesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                createMany: {
                    args: Prisma.finesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.finesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>[];
                };
                delete: {
                    args: Prisma.finesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                update: {
                    args: Prisma.finesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                deleteMany: {
                    args: Prisma.finesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.finesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.finesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>[];
                };
                upsert: {
                    args: Prisma.finesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finesPayload>;
                };
                aggregate: {
                    args: Prisma.FinesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFines>;
                };
                groupBy: {
                    args: Prisma.finesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.finesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinesCountAggregateOutputType> | number;
                };
            };
        };
        match_referees: {
            payload: Prisma.$match_refereesPayload<ExtArgs>;
            fields: Prisma.match_refereesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.match_refereesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.match_refereesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                findFirst: {
                    args: Prisma.match_refereesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.match_refereesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                findMany: {
                    args: Prisma.match_refereesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>[];
                };
                create: {
                    args: Prisma.match_refereesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                createMany: {
                    args: Prisma.match_refereesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.match_refereesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>[];
                };
                delete: {
                    args: Prisma.match_refereesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                update: {
                    args: Prisma.match_refereesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                deleteMany: {
                    args: Prisma.match_refereesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.match_refereesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.match_refereesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>[];
                };
                upsert: {
                    args: Prisma.match_refereesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$match_refereesPayload>;
                };
                aggregate: {
                    args: Prisma.Match_refereesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMatch_referees>;
                };
                groupBy: {
                    args: Prisma.match_refereesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Match_refereesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.match_refereesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Match_refereesCountAggregateOutputType> | number;
                };
            };
        };
        matches: {
            payload: Prisma.$matchesPayload<ExtArgs>;
            fields: Prisma.matchesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.matchesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.matchesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                findFirst: {
                    args: Prisma.matchesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.matchesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                findMany: {
                    args: Prisma.matchesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>[];
                };
                create: {
                    args: Prisma.matchesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                createMany: {
                    args: Prisma.matchesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.matchesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>[];
                };
                delete: {
                    args: Prisma.matchesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                update: {
                    args: Prisma.matchesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                deleteMany: {
                    args: Prisma.matchesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.matchesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.matchesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>[];
                };
                upsert: {
                    args: Prisma.matchesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$matchesPayload>;
                };
                aggregate: {
                    args: Prisma.MatchesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMatches>;
                };
                groupBy: {
                    args: Prisma.matchesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MatchesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.matchesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MatchesCountAggregateOutputType> | number;
                };
            };
        };
        referee_availability: {
            payload: Prisma.$referee_availabilityPayload<ExtArgs>;
            fields: Prisma.referee_availabilityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.referee_availabilityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.referee_availabilityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                findFirst: {
                    args: Prisma.referee_availabilityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.referee_availabilityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                findMany: {
                    args: Prisma.referee_availabilityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>[];
                };
                create: {
                    args: Prisma.referee_availabilityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                createMany: {
                    args: Prisma.referee_availabilityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.referee_availabilityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>[];
                };
                delete: {
                    args: Prisma.referee_availabilityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                update: {
                    args: Prisma.referee_availabilityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                deleteMany: {
                    args: Prisma.referee_availabilityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.referee_availabilityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.referee_availabilityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>[];
                };
                upsert: {
                    args: Prisma.referee_availabilityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_availabilityPayload>;
                };
                aggregate: {
                    args: Prisma.Referee_availabilityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReferee_availability>;
                };
                groupBy: {
                    args: Prisma.referee_availabilityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Referee_availabilityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.referee_availabilityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Referee_availabilityCountAggregateOutputType> | number;
                };
            };
        };
        referee_assignment_events: {
            payload: Prisma.$referee_assignment_eventsPayload<ExtArgs>;
            fields: Prisma.referee_assignment_eventsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.referee_assignment_eventsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.referee_assignment_eventsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                findFirst: {
                    args: Prisma.referee_assignment_eventsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.referee_assignment_eventsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                findMany: {
                    args: Prisma.referee_assignment_eventsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>[];
                };
                create: {
                    args: Prisma.referee_assignment_eventsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                createMany: {
                    args: Prisma.referee_assignment_eventsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.referee_assignment_eventsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>[];
                };
                delete: {
                    args: Prisma.referee_assignment_eventsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                update: {
                    args: Prisma.referee_assignment_eventsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                deleteMany: {
                    args: Prisma.referee_assignment_eventsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.referee_assignment_eventsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.referee_assignment_eventsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>[];
                };
                upsert: {
                    args: Prisma.referee_assignment_eventsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$referee_assignment_eventsPayload>;
                };
                aggregate: {
                    args: Prisma.Referee_assignment_eventsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReferee_assignment_events>;
                };
                groupBy: {
                    args: Prisma.referee_assignment_eventsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Referee_assignment_eventsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.referee_assignment_eventsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Referee_assignment_eventsCountAggregateOutputType> | number;
                };
            };
        };
        player_match_stats: {
            payload: Prisma.$player_match_statsPayload<ExtArgs>;
            fields: Prisma.player_match_statsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.player_match_statsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.player_match_statsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                findFirst: {
                    args: Prisma.player_match_statsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.player_match_statsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                findMany: {
                    args: Prisma.player_match_statsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>[];
                };
                create: {
                    args: Prisma.player_match_statsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                createMany: {
                    args: Prisma.player_match_statsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.player_match_statsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>[];
                };
                delete: {
                    args: Prisma.player_match_statsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                update: {
                    args: Prisma.player_match_statsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                deleteMany: {
                    args: Prisma.player_match_statsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.player_match_statsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.player_match_statsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>[];
                };
                upsert: {
                    args: Prisma.player_match_statsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$player_match_statsPayload>;
                };
                aggregate: {
                    args: Prisma.Player_match_statsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlayer_match_stats>;
                };
                groupBy: {
                    args: Prisma.player_match_statsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Player_match_statsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.player_match_statsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Player_match_statsCountAggregateOutputType> | number;
                };
            };
        };
        roles: {
            payload: Prisma.$rolesPayload<ExtArgs>;
            fields: Prisma.rolesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.rolesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findFirst: {
                    args: Prisma.rolesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findMany: {
                    args: Prisma.rolesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                create: {
                    args: Prisma.rolesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                createMany: {
                    args: Prisma.rolesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                delete: {
                    args: Prisma.rolesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                update: {
                    args: Prisma.rolesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                deleteMany: {
                    args: Prisma.rolesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.rolesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                upsert: {
                    args: Prisma.rolesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                aggregate: {
                    args: Prisma.RolesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoles>;
                };
                groupBy: {
                    args: Prisma.rolesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.rolesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesCountAggregateOutputType> | number;
                };
            };
        };
        sponsors: {
            payload: Prisma.$sponsorsPayload<ExtArgs>;
            fields: Prisma.sponsorsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.sponsorsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.sponsorsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                findFirst: {
                    args: Prisma.sponsorsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.sponsorsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                findMany: {
                    args: Prisma.sponsorsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>[];
                };
                create: {
                    args: Prisma.sponsorsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                createMany: {
                    args: Prisma.sponsorsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.sponsorsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>[];
                };
                delete: {
                    args: Prisma.sponsorsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                update: {
                    args: Prisma.sponsorsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                deleteMany: {
                    args: Prisma.sponsorsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.sponsorsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.sponsorsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>[];
                };
                upsert: {
                    args: Prisma.sponsorsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sponsorsPayload>;
                };
                aggregate: {
                    args: Prisma.SponsorsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSponsors>;
                };
                groupBy: {
                    args: Prisma.sponsorsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SponsorsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.sponsorsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SponsorsCountAggregateOutputType> | number;
                };
            };
        };
        suspensions: {
            payload: Prisma.$suspensionsPayload<ExtArgs>;
            fields: Prisma.suspensionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.suspensionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.suspensionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                findFirst: {
                    args: Prisma.suspensionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.suspensionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                findMany: {
                    args: Prisma.suspensionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>[];
                };
                create: {
                    args: Prisma.suspensionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                createMany: {
                    args: Prisma.suspensionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.suspensionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>[];
                };
                delete: {
                    args: Prisma.suspensionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                update: {
                    args: Prisma.suspensionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                deleteMany: {
                    args: Prisma.suspensionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.suspensionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.suspensionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>[];
                };
                upsert: {
                    args: Prisma.suspensionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$suspensionsPayload>;
                };
                aggregate: {
                    args: Prisma.SuspensionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSuspensions>;
                };
                groupBy: {
                    args: Prisma.suspensionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SuspensionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.suspensionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SuspensionsCountAggregateOutputType> | number;
                };
            };
        };
        disciplinary_appeals: {
            payload: Prisma.$disciplinary_appealsPayload<ExtArgs>;
            fields: Prisma.disciplinary_appealsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.disciplinary_appealsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.disciplinary_appealsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                findFirst: {
                    args: Prisma.disciplinary_appealsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.disciplinary_appealsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                findMany: {
                    args: Prisma.disciplinary_appealsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>[];
                };
                create: {
                    args: Prisma.disciplinary_appealsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                createMany: {
                    args: Prisma.disciplinary_appealsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.disciplinary_appealsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>[];
                };
                delete: {
                    args: Prisma.disciplinary_appealsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                update: {
                    args: Prisma.disciplinary_appealsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                deleteMany: {
                    args: Prisma.disciplinary_appealsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.disciplinary_appealsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.disciplinary_appealsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>[];
                };
                upsert: {
                    args: Prisma.disciplinary_appealsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_appealsPayload>;
                };
                aggregate: {
                    args: Prisma.Disciplinary_appealsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisciplinary_appeals>;
                };
                groupBy: {
                    args: Prisma.disciplinary_appealsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_appealsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.disciplinary_appealsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_appealsCountAggregateOutputType> | number;
                };
            };
        };
        disciplinary_events: {
            payload: Prisma.$disciplinary_eventsPayload<ExtArgs>;
            fields: Prisma.disciplinary_eventsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.disciplinary_eventsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.disciplinary_eventsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                findFirst: {
                    args: Prisma.disciplinary_eventsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.disciplinary_eventsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                findMany: {
                    args: Prisma.disciplinary_eventsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>[];
                };
                create: {
                    args: Prisma.disciplinary_eventsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                createMany: {
                    args: Prisma.disciplinary_eventsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.disciplinary_eventsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>[];
                };
                delete: {
                    args: Prisma.disciplinary_eventsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                update: {
                    args: Prisma.disciplinary_eventsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                deleteMany: {
                    args: Prisma.disciplinary_eventsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.disciplinary_eventsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.disciplinary_eventsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>[];
                };
                upsert: {
                    args: Prisma.disciplinary_eventsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$disciplinary_eventsPayload>;
                };
                aggregate: {
                    args: Prisma.Disciplinary_eventsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisciplinary_events>;
                };
                groupBy: {
                    args: Prisma.disciplinary_eventsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_eventsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.disciplinary_eventsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Disciplinary_eventsCountAggregateOutputType> | number;
                };
            };
        };
        team_members: {
            payload: Prisma.$team_membersPayload<ExtArgs>;
            fields: Prisma.team_membersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.team_membersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.team_membersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                findFirst: {
                    args: Prisma.team_membersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.team_membersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                findMany: {
                    args: Prisma.team_membersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>[];
                };
                create: {
                    args: Prisma.team_membersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                createMany: {
                    args: Prisma.team_membersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.team_membersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>[];
                };
                delete: {
                    args: Prisma.team_membersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                update: {
                    args: Prisma.team_membersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                deleteMany: {
                    args: Prisma.team_membersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.team_membersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.team_membersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>[];
                };
                upsert: {
                    args: Prisma.team_membersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$team_membersPayload>;
                };
                aggregate: {
                    args: Prisma.Team_membersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTeam_members>;
                };
                groupBy: {
                    args: Prisma.team_membersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Team_membersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.team_membersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Team_membersCountAggregateOutputType> | number;
                };
            };
        };
        teams: {
            payload: Prisma.$teamsPayload<ExtArgs>;
            fields: Prisma.teamsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.teamsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.teamsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                findFirst: {
                    args: Prisma.teamsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.teamsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                findMany: {
                    args: Prisma.teamsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>[];
                };
                create: {
                    args: Prisma.teamsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                createMany: {
                    args: Prisma.teamsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.teamsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>[];
                };
                delete: {
                    args: Prisma.teamsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                update: {
                    args: Prisma.teamsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                deleteMany: {
                    args: Prisma.teamsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.teamsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.teamsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>[];
                };
                upsert: {
                    args: Prisma.teamsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teamsPayload>;
                };
                aggregate: {
                    args: Prisma.TeamsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTeams>;
                };
                groupBy: {
                    args: Prisma.teamsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TeamsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.teamsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TeamsCountAggregateOutputType> | number;
                };
            };
        };
        tournament_administrators: {
            payload: Prisma.$tournament_administratorsPayload<ExtArgs>;
            fields: Prisma.tournament_administratorsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_administratorsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_administratorsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_administratorsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_administratorsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                findMany: {
                    args: Prisma.tournament_administratorsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>[];
                };
                create: {
                    args: Prisma.tournament_administratorsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                createMany: {
                    args: Prisma.tournament_administratorsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_administratorsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>[];
                };
                delete: {
                    args: Prisma.tournament_administratorsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                update: {
                    args: Prisma.tournament_administratorsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_administratorsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_administratorsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_administratorsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_administratorsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_administratorsPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_administratorsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_administrators>;
                };
                groupBy: {
                    args: Prisma.tournament_administratorsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_administratorsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_administratorsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_administratorsCountAggregateOutputType> | number;
                };
            };
        };
        tournament_referees: {
            payload: Prisma.$tournament_refereesPayload<ExtArgs>;
            fields: Prisma.tournament_refereesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_refereesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_refereesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_refereesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_refereesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                findMany: {
                    args: Prisma.tournament_refereesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>[];
                };
                create: {
                    args: Prisma.tournament_refereesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                createMany: {
                    args: Prisma.tournament_refereesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_refereesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>[];
                };
                delete: {
                    args: Prisma.tournament_refereesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                update: {
                    args: Prisma.tournament_refereesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_refereesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_refereesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_refereesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_refereesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_refereesPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_refereesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_referees>;
                };
                groupBy: {
                    args: Prisma.tournament_refereesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_refereesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_refereesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_refereesCountAggregateOutputType> | number;
                };
            };
        };
        tournament_sponsors: {
            payload: Prisma.$tournament_sponsorsPayload<ExtArgs>;
            fields: Prisma.tournament_sponsorsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_sponsorsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_sponsorsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_sponsorsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_sponsorsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                findMany: {
                    args: Prisma.tournament_sponsorsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>[];
                };
                create: {
                    args: Prisma.tournament_sponsorsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                createMany: {
                    args: Prisma.tournament_sponsorsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_sponsorsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>[];
                };
                delete: {
                    args: Prisma.tournament_sponsorsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                update: {
                    args: Prisma.tournament_sponsorsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_sponsorsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_sponsorsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_sponsorsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_sponsorsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_sponsorsPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_sponsorsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_sponsors>;
                };
                groupBy: {
                    args: Prisma.tournament_sponsorsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_sponsorsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_sponsorsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_sponsorsCountAggregateOutputType> | number;
                };
            };
        };
        tournament_team_players: {
            payload: Prisma.$tournament_team_playersPayload<ExtArgs>;
            fields: Prisma.tournament_team_playersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_team_playersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_team_playersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_team_playersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_team_playersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                findMany: {
                    args: Prisma.tournament_team_playersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>[];
                };
                create: {
                    args: Prisma.tournament_team_playersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                createMany: {
                    args: Prisma.tournament_team_playersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_team_playersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>[];
                };
                delete: {
                    args: Prisma.tournament_team_playersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                update: {
                    args: Prisma.tournament_team_playersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_team_playersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_team_playersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_team_playersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_team_playersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_playersPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_team_playersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_team_players>;
                };
                groupBy: {
                    args: Prisma.tournament_team_playersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_team_playersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_team_playersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_team_playersCountAggregateOutputType> | number;
                };
            };
        };
        tournament_team_registrations: {
            payload: Prisma.$tournament_team_registrationsPayload<ExtArgs>;
            fields: Prisma.tournament_team_registrationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_team_registrationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_team_registrationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_team_registrationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_team_registrationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                findMany: {
                    args: Prisma.tournament_team_registrationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>[];
                };
                create: {
                    args: Prisma.tournament_team_registrationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                createMany: {
                    args: Prisma.tournament_team_registrationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_team_registrationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>[];
                };
                delete: {
                    args: Prisma.tournament_team_registrationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                update: {
                    args: Prisma.tournament_team_registrationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_team_registrationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_team_registrationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_team_registrationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_team_registrationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_team_registrationsPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_team_registrationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_team_registrations>;
                };
                groupBy: {
                    args: Prisma.tournament_team_registrationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_team_registrationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_team_registrationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_team_registrationsCountAggregateOutputType> | number;
                };
            };
        };
        notifications: {
            payload: Prisma.$notificationsPayload<ExtArgs>;
            fields: Prisma.notificationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.notificationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                findFirst: {
                    args: Prisma.notificationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                findMany: {
                    args: Prisma.notificationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                create: {
                    args: Prisma.notificationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                createMany: {
                    args: Prisma.notificationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.notificationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                delete: {
                    args: Prisma.notificationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                update: {
                    args: Prisma.notificationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                deleteMany: {
                    args: Prisma.notificationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.notificationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.notificationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                upsert: {
                    args: Prisma.notificationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotifications>;
                };
                groupBy: {
                    args: Prisma.notificationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.notificationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationsCountAggregateOutputType> | number;
                };
            };
        };
        notification_preferences: {
            payload: Prisma.$notification_preferencesPayload<ExtArgs>;
            fields: Prisma.notification_preferencesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.notification_preferencesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.notification_preferencesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                findFirst: {
                    args: Prisma.notification_preferencesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.notification_preferencesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                findMany: {
                    args: Prisma.notification_preferencesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>[];
                };
                create: {
                    args: Prisma.notification_preferencesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                createMany: {
                    args: Prisma.notification_preferencesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.notification_preferencesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>[];
                };
                delete: {
                    args: Prisma.notification_preferencesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                update: {
                    args: Prisma.notification_preferencesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                deleteMany: {
                    args: Prisma.notification_preferencesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.notification_preferencesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.notification_preferencesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>[];
                };
                upsert: {
                    args: Prisma.notification_preferencesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notification_preferencesPayload>;
                };
                aggregate: {
                    args: Prisma.Notification_preferencesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification_preferences>;
                };
                groupBy: {
                    args: Prisma.notification_preferencesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Notification_preferencesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.notification_preferencesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Notification_preferencesCountAggregateOutputType> | number;
                };
            };
        };
        tournament_registration_events: {
            payload: Prisma.$tournament_registration_eventsPayload<ExtArgs>;
            fields: Prisma.tournament_registration_eventsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_registration_eventsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_registration_eventsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_registration_eventsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_registration_eventsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                findMany: {
                    args: Prisma.tournament_registration_eventsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>[];
                };
                create: {
                    args: Prisma.tournament_registration_eventsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                createMany: {
                    args: Prisma.tournament_registration_eventsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_registration_eventsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>[];
                };
                delete: {
                    args: Prisma.tournament_registration_eventsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                update: {
                    args: Prisma.tournament_registration_eventsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_registration_eventsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_registration_eventsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_registration_eventsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_registration_eventsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_registration_eventsPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_registration_eventsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_registration_events>;
                };
                groupBy: {
                    args: Prisma.tournament_registration_eventsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_registration_eventsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_registration_eventsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_registration_eventsCountAggregateOutputType> | number;
                };
            };
        };
        tournament_lifecycle_events: {
            payload: Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>;
            fields: Prisma.tournament_lifecycle_eventsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_lifecycle_eventsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_lifecycle_eventsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_lifecycle_eventsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_lifecycle_eventsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                findMany: {
                    args: Prisma.tournament_lifecycle_eventsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>[];
                };
                create: {
                    args: Prisma.tournament_lifecycle_eventsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                createMany: {
                    args: Prisma.tournament_lifecycle_eventsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_lifecycle_eventsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>[];
                };
                delete: {
                    args: Prisma.tournament_lifecycle_eventsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                update: {
                    args: Prisma.tournament_lifecycle_eventsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_lifecycle_eventsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_lifecycle_eventsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_lifecycle_eventsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_lifecycle_eventsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_lifecycle_eventsPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_lifecycle_eventsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_lifecycle_events>;
                };
                groupBy: {
                    args: Prisma.tournament_lifecycle_eventsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_lifecycle_eventsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_lifecycle_eventsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_lifecycle_eventsCountAggregateOutputType> | number;
                };
            };
        };
        tournament_types: {
            payload: Prisma.$tournament_typesPayload<ExtArgs>;
            fields: Prisma.tournament_typesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournament_typesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournament_typesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                findFirst: {
                    args: Prisma.tournament_typesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournament_typesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                findMany: {
                    args: Prisma.tournament_typesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>[];
                };
                create: {
                    args: Prisma.tournament_typesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                createMany: {
                    args: Prisma.tournament_typesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournament_typesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>[];
                };
                delete: {
                    args: Prisma.tournament_typesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                update: {
                    args: Prisma.tournament_typesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                deleteMany: {
                    args: Prisma.tournament_typesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournament_typesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournament_typesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>[];
                };
                upsert: {
                    args: Prisma.tournament_typesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournament_typesPayload>;
                };
                aggregate: {
                    args: Prisma.Tournament_typesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournament_types>;
                };
                groupBy: {
                    args: Prisma.tournament_typesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_typesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournament_typesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tournament_typesCountAggregateOutputType> | number;
                };
            };
        };
        tournaments: {
            payload: Prisma.$tournamentsPayload<ExtArgs>;
            fields: Prisma.tournamentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tournamentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tournamentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                findFirst: {
                    args: Prisma.tournamentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tournamentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                findMany: {
                    args: Prisma.tournamentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>[];
                };
                create: {
                    args: Prisma.tournamentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                createMany: {
                    args: Prisma.tournamentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tournamentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>[];
                };
                delete: {
                    args: Prisma.tournamentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                update: {
                    args: Prisma.tournamentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                deleteMany: {
                    args: Prisma.tournamentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tournamentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tournamentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>[];
                };
                upsert: {
                    args: Prisma.tournamentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tournamentsPayload>;
                };
                aggregate: {
                    args: Prisma.TournamentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTournaments>;
                };
                groupBy: {
                    args: Prisma.tournamentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TournamentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tournamentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TournamentsCountAggregateOutputType> | number;
                };
            };
        };
        user_roles: {
            payload: Prisma.$user_rolesPayload<ExtArgs>;
            fields: Prisma.user_rolesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.user_rolesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.user_rolesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                findFirst: {
                    args: Prisma.user_rolesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.user_rolesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                findMany: {
                    args: Prisma.user_rolesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>[];
                };
                create: {
                    args: Prisma.user_rolesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                createMany: {
                    args: Prisma.user_rolesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.user_rolesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>[];
                };
                delete: {
                    args: Prisma.user_rolesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                update: {
                    args: Prisma.user_rolesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                deleteMany: {
                    args: Prisma.user_rolesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.user_rolesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.user_rolesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>[];
                };
                upsert: {
                    args: Prisma.user_rolesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_rolesPayload>;
                };
                aggregate: {
                    args: Prisma.User_rolesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser_roles>;
                };
                groupBy: {
                    args: Prisma.user_rolesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_rolesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.user_rolesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_rolesCountAggregateOutputType> | number;
                };
            };
        };
        users: {
            payload: Prisma.$usersPayload<ExtArgs>;
            fields: Prisma.usersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findFirst: {
                    args: Prisma.usersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findMany: {
                    args: Prisma.usersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                create: {
                    args: Prisma.usersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                createMany: {
                    args: Prisma.usersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                delete: {
                    args: Prisma.usersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                update: {
                    args: Prisma.usersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                deleteMany: {
                    args: Prisma.usersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                upsert: {
                    args: Prisma.usersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                aggregate: {
                    args: Prisma.UsersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsers>;
                };
                groupBy: {
                    args: Prisma.usersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Auth_sessionsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly jti_hash: "jti_hash";
    readonly expires_at: "expires_at";
    readonly revoked_at: "revoked_at";
    readonly created_at: "created_at";
};
export type Auth_sessionsScalarFieldEnum = (typeof Auth_sessionsScalarFieldEnum)[keyof typeof Auth_sessionsScalarFieldEnum];
export declare const Association_administratorsScalarFieldEnum: {
    readonly association_id: "association_id";
    readonly user_id: "user_id";
    readonly permission_level: "permission_level";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Association_administratorsScalarFieldEnum = (typeof Association_administratorsScalarFieldEnum)[keyof typeof Association_administratorsScalarFieldEnum];
export declare const AssociationsScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly city: "city";
    readonly address: "address";
    readonly tax_id: "tax_id";
    readonly email: "email";
    readonly phone: "phone";
    readonly logo_url: "logo_url";
    readonly logo_public_id: "logo_public_id";
    readonly cover_url: "cover_url";
    readonly cover_public_id: "cover_public_id";
    readonly owner_user_id: "owner_user_id";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type AssociationsScalarFieldEnum = (typeof AssociationsScalarFieldEnum)[keyof typeof AssociationsScalarFieldEnum];
export declare const Association_announcementsScalarFieldEnum: {
    readonly id: "id";
    readonly association_id: "association_id";
    readonly title: "title";
    readonly description: "description";
    readonly image_url: "image_url";
    readonly image_public_id: "image_public_id";
    readonly starts_on: "starts_on";
    readonly ends_on: "ends_on";
    readonly contact_phone: "contact_phone";
    readonly address: "address";
    readonly registration_fee: "registration_fee";
    readonly registration_starts_on: "registration_starts_on";
    readonly tournament_starts_on: "tournament_starts_on";
    readonly first_place_prize: "first_place_prize";
    readonly second_place_prize: "second_place_prize";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Association_announcementsScalarFieldEnum = (typeof Association_announcementsScalarFieldEnum)[keyof typeof Association_announcementsScalarFieldEnum];
export declare const Disciplinary_actionsScalarFieldEnum: {
    readonly id: "id";
    readonly tournament_id: "tournament_id";
    readonly match_id: "match_id";
    readonly team_id: "team_id";
    readonly player_id: "player_id";
    readonly card_type: "card_type";
    readonly reason: "reason";
    readonly occurred_at: "occurred_at";
    readonly reported_by: "reported_by";
    readonly decision_status: "decision_status";
    readonly review_started_by: "review_started_by";
    readonly review_started_at: "review_started_at";
    readonly decided_by: "decided_by";
    readonly decided_at: "decided_at";
    readonly decision_notes: "decision_notes";
    readonly appeal_deadline: "appeal_deadline";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Disciplinary_actionsScalarFieldEnum = (typeof Disciplinary_actionsScalarFieldEnum)[keyof typeof Disciplinary_actionsScalarFieldEnum];
export declare const FinesScalarFieldEnum: {
    readonly id: "id";
    readonly disciplinary_action_id: "disciplinary_action_id";
    readonly amount: "amount";
    readonly currency_code: "currency_code";
    readonly due_date: "due_date";
    readonly payment_status: "payment_status";
    readonly paid_at: "paid_at";
    readonly payment_reference: "payment_reference";
    readonly notes: "notes";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type FinesScalarFieldEnum = (typeof FinesScalarFieldEnum)[keyof typeof FinesScalarFieldEnum];
export declare const Match_refereesScalarFieldEnum: {
    readonly match_id: "match_id";
    readonly tournament_id: "tournament_id";
    readonly referee_id: "referee_id";
    readonly referee_role: "referee_role";
    readonly assignment_status: "assignment_status";
    readonly assigned_by: "assigned_by";
    readonly responded_at: "responded_at";
    readonly response_notes: "response_notes";
    readonly replaced_referee_id: "replaced_referee_id";
    readonly replacement_reason: "replacement_reason";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Match_refereesScalarFieldEnum = (typeof Match_refereesScalarFieldEnum)[keyof typeof Match_refereesScalarFieldEnum];
export declare const MatchesScalarFieldEnum: {
    readonly id: "id";
    readonly tournament_id: "tournament_id";
    readonly competition_key: "competition_key";
    readonly home_penalties: "home_penalties";
    readonly away_penalties: "away_penalties";
    readonly home_team_id: "home_team_id";
    readonly away_team_id: "away_team_id";
    readonly match_date: "match_date";
    readonly venue: "venue";
    readonly stage: "stage";
    readonly round_number: "round_number";
    readonly home_score: "home_score";
    readonly away_score: "away_score";
    readonly status: "status";
    readonly duration_minutes: "duration_minutes";
    readonly notes: "notes";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type MatchesScalarFieldEnum = (typeof MatchesScalarFieldEnum)[keyof typeof MatchesScalarFieldEnum];
export declare const Referee_availabilityScalarFieldEnum: {
    readonly id: "id";
    readonly referee_id: "referee_id";
    readonly starts_at: "starts_at";
    readonly ends_at: "ends_at";
    readonly notes: "notes";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Referee_availabilityScalarFieldEnum = (typeof Referee_availabilityScalarFieldEnum)[keyof typeof Referee_availabilityScalarFieldEnum];
export declare const Referee_assignment_eventsScalarFieldEnum: {
    readonly id: "id";
    readonly match_id: "match_id";
    readonly referee_id: "referee_id";
    readonly actor_user_id: "actor_user_id";
    readonly event_type: "event_type";
    readonly previous_status: "previous_status";
    readonly new_status: "new_status";
    readonly reason: "reason";
    readonly created_at: "created_at";
};
export type Referee_assignment_eventsScalarFieldEnum = (typeof Referee_assignment_eventsScalarFieldEnum)[keyof typeof Referee_assignment_eventsScalarFieldEnum];
export declare const Player_match_statsScalarFieldEnum: {
    readonly id: "id";
    readonly match_id: "match_id";
    readonly tournament_id: "tournament_id";
    readonly team_id: "team_id";
    readonly player_id: "player_id";
    readonly goals: "goals";
    readonly assists: "assists";
    readonly yellow_cards: "yellow_cards";
    readonly red_cards: "red_cards";
    readonly minutes_played: "minutes_played";
    readonly created_at: "created_at";
};
export type Player_match_statsScalarFieldEnum = (typeof Player_match_statsScalarFieldEnum)[keyof typeof Player_match_statsScalarFieldEnum];
export declare const RolesScalarFieldEnum: {
    readonly code: "code";
    readonly name: "name";
    readonly description: "description";
    readonly created_at: "created_at";
};
export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum];
export declare const SponsorsScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly tax_id: "tax_id";
    readonly contact_name: "contact_name";
    readonly email: "email";
    readonly phone: "phone";
    readonly website_url: "website_url";
    readonly logo_url: "logo_url";
    readonly logo_public_id: "logo_public_id";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type SponsorsScalarFieldEnum = (typeof SponsorsScalarFieldEnum)[keyof typeof SponsorsScalarFieldEnum];
export declare const SuspensionsScalarFieldEnum: {
    readonly id: "id";
    readonly disciplinary_action_id: "disciplinary_action_id";
    readonly matches_count: "matches_count";
    readonly start_date: "start_date";
    readonly end_date: "end_date";
    readonly reason: "reason";
    readonly status: "status";
    readonly served_matches: "served_matches";
    readonly completed_at: "completed_at";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type SuspensionsScalarFieldEnum = (typeof SuspensionsScalarFieldEnum)[keyof typeof SuspensionsScalarFieldEnum];
export declare const Disciplinary_appealsScalarFieldEnum: {
    readonly id: "id";
    readonly disciplinary_action_id: "disciplinary_action_id";
    readonly player_id: "player_id";
    readonly message: "message";
    readonly status: "status";
    readonly reviewed_by: "reviewed_by";
    readonly reviewed_at: "reviewed_at";
    readonly resolution_notes: "resolution_notes";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Disciplinary_appealsScalarFieldEnum = (typeof Disciplinary_appealsScalarFieldEnum)[keyof typeof Disciplinary_appealsScalarFieldEnum];
export declare const Disciplinary_eventsScalarFieldEnum: {
    readonly id: "id";
    readonly disciplinary_action_id: "disciplinary_action_id";
    readonly actor_user_id: "actor_user_id";
    readonly event_type: "event_type";
    readonly message: "message";
    readonly metadata: "metadata";
    readonly created_at: "created_at";
};
export type Disciplinary_eventsScalarFieldEnum = (typeof Disciplinary_eventsScalarFieldEnum)[keyof typeof Disciplinary_eventsScalarFieldEnum];
export declare const Team_membersScalarFieldEnum: {
    readonly team_id: "team_id";
    readonly user_id: "user_id";
    readonly member_role: "member_role";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Team_membersScalarFieldEnum = (typeof Team_membersScalarFieldEnum)[keyof typeof Team_membersScalarFieldEnum];
export declare const TeamsScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly sport_type: "sport_type";
    readonly modality: "modality";
    readonly primary_color: "primary_color";
    readonly secondary_color: "secondary_color";
    readonly captain_user_id: "captain_user_id";
    readonly created_by: "created_by";
    readonly photo_url: "photo_url";
    readonly photo_public_id: "photo_public_id";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type TeamsScalarFieldEnum = (typeof TeamsScalarFieldEnum)[keyof typeof TeamsScalarFieldEnum];
export declare const Tournament_administratorsScalarFieldEnum: {
    readonly tournament_id: "tournament_id";
    readonly user_id: "user_id";
    readonly permission_level: "permission_level";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Tournament_administratorsScalarFieldEnum = (typeof Tournament_administratorsScalarFieldEnum)[keyof typeof Tournament_administratorsScalarFieldEnum];
export declare const Tournament_refereesScalarFieldEnum: {
    readonly tournament_id: "tournament_id";
    readonly user_id: "user_id";
    readonly certification_number: "certification_number";
    readonly category: "category";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Tournament_refereesScalarFieldEnum = (typeof Tournament_refereesScalarFieldEnum)[keyof typeof Tournament_refereesScalarFieldEnum];
export declare const Tournament_sponsorsScalarFieldEnum: {
    readonly tournament_id: "tournament_id";
    readonly sponsor_id: "sponsor_id";
    readonly sponsorship_level: "sponsorship_level";
    readonly contribution_type: "contribution_type";
    readonly contribution_amount: "contribution_amount";
    readonly currency_code: "currency_code";
    readonly contribution_description: "contribution_description";
    readonly agreement_start_date: "agreement_start_date";
    readonly agreement_end_date: "agreement_end_date";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Tournament_sponsorsScalarFieldEnum = (typeof Tournament_sponsorsScalarFieldEnum)[keyof typeof Tournament_sponsorsScalarFieldEnum];
export declare const Tournament_team_playersScalarFieldEnum: {
    readonly tournament_id: "tournament_id";
    readonly team_id: "team_id";
    readonly player_id: "player_id";
    readonly jersey_number: "jersey_number";
    readonly position: "position";
    readonly is_captain: "is_captain";
    readonly registration_status: "registration_status";
    readonly created_at: "created_at";
};
export type Tournament_team_playersScalarFieldEnum = (typeof Tournament_team_playersScalarFieldEnum)[keyof typeof Tournament_team_playersScalarFieldEnum];
export declare const Tournament_team_registrationsScalarFieldEnum: {
    readonly tournament_id: "tournament_id";
    readonly association_id: "association_id";
    readonly team_id: "team_id";
    readonly requested_by: "requested_by";
    readonly request_status: "request_status";
    readonly reviewed_by: "reviewed_by";
    readonly review_notes: "review_notes";
    readonly reviewed_at: "reviewed_at";
    readonly payment_status: "payment_status";
    readonly amount_paid: "amount_paid";
    readonly payment_notes: "payment_notes";
    readonly payment_updated_by: "payment_updated_by";
    readonly payment_updated_at: "payment_updated_at";
    readonly group_name: "group_name";
    readonly seed: "seed";
    readonly points: "points";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Tournament_team_registrationsScalarFieldEnum = (typeof Tournament_team_registrationsScalarFieldEnum)[keyof typeof Tournament_team_registrationsScalarFieldEnum];
export declare const NotificationsScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly type: "type";
    readonly event_code: "event_code";
    readonly deduplication_key: "deduplication_key";
    readonly title: "title";
    readonly message: "message";
    readonly entity_type: "entity_type";
    readonly entity_id: "entity_id";
    readonly metadata: "metadata";
    readonly scheduled_for: "scheduled_for";
    readonly read_at: "read_at";
    readonly created_at: "created_at";
};
export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum];
export declare const Notification_preferencesScalarFieldEnum: {
    readonly user_id: "user_id";
    readonly match_scheduled_enabled: "match_scheduled_enabled";
    readonly match_updates_enabled: "match_updates_enabled";
    readonly match_reminders_enabled: "match_reminders_enabled";
    readonly reminder_hours_before: "reminder_hours_before";
    readonly email_enabled: "email_enabled";
    readonly whatsapp_enabled: "whatsapp_enabled";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Notification_preferencesScalarFieldEnum = (typeof Notification_preferencesScalarFieldEnum)[keyof typeof Notification_preferencesScalarFieldEnum];
export declare const Tournament_registration_eventsScalarFieldEnum: {
    readonly id: "id";
    readonly tournament_id: "tournament_id";
    readonly team_id: "team_id";
    readonly actor_user_id: "actor_user_id";
    readonly event_type: "event_type";
    readonly message: "message";
    readonly created_at: "created_at";
};
export type Tournament_registration_eventsScalarFieldEnum = (typeof Tournament_registration_eventsScalarFieldEnum)[keyof typeof Tournament_registration_eventsScalarFieldEnum];
export declare const Tournament_lifecycle_eventsScalarFieldEnum: {
    readonly id: "id";
    readonly tournament_id: "tournament_id";
    readonly actor_user_id: "actor_user_id";
    readonly from_phase: "from_phase";
    readonly to_phase: "to_phase";
    readonly reason: "reason";
    readonly created_at: "created_at";
};
export type Tournament_lifecycle_eventsScalarFieldEnum = (typeof Tournament_lifecycle_eventsScalarFieldEnum)[keyof typeof Tournament_lifecycle_eventsScalarFieldEnum];
export declare const Tournament_typesScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly min_players_per_team: "min_players_per_team";
    readonly max_players_per_team: "max_players_per_team";
    readonly instructions: "instructions";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Tournament_typesScalarFieldEnum = (typeof Tournament_typesScalarFieldEnum)[keyof typeof Tournament_typesScalarFieldEnum];
export declare const TournamentsScalarFieldEnum: {
    readonly id: "id";
    readonly association_id: "association_id";
    readonly name: "name";
    readonly competition_plan: "competition_plan";
    readonly description: "description";
    readonly tournament_type_id: "tournament_type_id";
    readonly sport_type: "sport_type";
    readonly modality: "modality";
    readonly category_name: "category_name";
    readonly category_min_age: "category_min_age";
    readonly category_max_age: "category_max_age";
    readonly category_gender: "category_gender";
    readonly start_date: "start_date";
    readonly end_date: "end_date";
    readonly registration_start_date: "registration_start_date";
    readonly registration_end_date: "registration_end_date";
    readonly registration_fee: "registration_fee";
    readonly currency_code: "currency_code";
    readonly grand_prize: "grand_prize";
    readonly second_prize: "second_prize";
    readonly third_prize: "third_prize";
    readonly max_teams: "max_teams";
    readonly min_players_per_team: "min_players_per_team";
    readonly max_players_per_team: "max_players_per_team";
    readonly location_name: "location_name";
    readonly location_address: "location_address";
    readonly rules_url: "rules_url";
    readonly rules_content: "rules_content";
    readonly photo_url: "photo_url";
    readonly photo_public_id: "photo_public_id";
    readonly phase: "phase";
    readonly status: "status";
    readonly created_by: "created_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type TournamentsScalarFieldEnum = (typeof TournamentsScalarFieldEnum)[keyof typeof TournamentsScalarFieldEnum];
export declare const User_rolesScalarFieldEnum: {
    readonly user_id: "user_id";
    readonly role_code: "role_code";
    readonly created_at: "created_at";
};
export type User_rolesScalarFieldEnum = (typeof User_rolesScalarFieldEnum)[keyof typeof User_rolesScalarFieldEnum];
export declare const UsersScalarFieldEnum: {
    readonly id: "id";
    readonly id_number: "id_number";
    readonly document_type: "document_type";
    readonly full_name: "full_name";
    readonly birth_date: "birth_date";
    readonly birth_city: "birth_city";
    readonly gender: "gender";
    readonly email: "email";
    readonly phone: "phone";
    readonly photo_url: "photo_url";
    readonly photo_public_id: "photo_public_id";
    readonly document_front_url: "document_front_url";
    readonly document_front_public_id: "document_front_public_id";
    readonly document_front_format: "document_front_format";
    readonly document_back_url: "document_back_url";
    readonly document_back_public_id: "document_back_public_id";
    readonly document_back_format: "document_back_format";
    readonly identity_verified_at: "identity_verified_at";
    readonly identity_verification_status: "identity_verification_status";
    readonly identity_verification_details: "identity_verification_details";
    readonly identity_verification_checked_at: "identity_verification_checked_at";
    readonly password_hash: "password_hash";
    readonly status: "status";
    readonly blocked_until: "blocked_until";
    readonly block_reason: "block_reason";
    readonly blocked_by: "blocked_by";
    readonly block_source_action_id: "block_source_action_id";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    auth_sessions?: Prisma.auth_sessionsOmit;
    association_administrators?: Prisma.association_administratorsOmit;
    associations?: Prisma.associationsOmit;
    association_announcements?: Prisma.association_announcementsOmit;
    disciplinary_actions?: Prisma.disciplinary_actionsOmit;
    fines?: Prisma.finesOmit;
    match_referees?: Prisma.match_refereesOmit;
    matches?: Prisma.matchesOmit;
    referee_availability?: Prisma.referee_availabilityOmit;
    referee_assignment_events?: Prisma.referee_assignment_eventsOmit;
    player_match_stats?: Prisma.player_match_statsOmit;
    roles?: Prisma.rolesOmit;
    sponsors?: Prisma.sponsorsOmit;
    suspensions?: Prisma.suspensionsOmit;
    disciplinary_appeals?: Prisma.disciplinary_appealsOmit;
    disciplinary_events?: Prisma.disciplinary_eventsOmit;
    team_members?: Prisma.team_membersOmit;
    teams?: Prisma.teamsOmit;
    tournament_administrators?: Prisma.tournament_administratorsOmit;
    tournament_referees?: Prisma.tournament_refereesOmit;
    tournament_sponsors?: Prisma.tournament_sponsorsOmit;
    tournament_team_players?: Prisma.tournament_team_playersOmit;
    tournament_team_registrations?: Prisma.tournament_team_registrationsOmit;
    notifications?: Prisma.notificationsOmit;
    notification_preferences?: Prisma.notification_preferencesOmit;
    tournament_registration_events?: Prisma.tournament_registration_eventsOmit;
    tournament_lifecycle_events?: Prisma.tournament_lifecycle_eventsOmit;
    tournament_types?: Prisma.tournament_typesOmit;
    tournaments?: Prisma.tournamentsOmit;
    user_roles?: Prisma.user_rolesOmit;
    users?: Prisma.usersOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
