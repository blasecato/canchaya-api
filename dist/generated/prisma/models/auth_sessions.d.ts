import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type auth_sessionsModel = runtime.Types.Result.DefaultSelection<Prisma.$auth_sessionsPayload>;
export type AggregateAuth_sessions = {
    _count: Auth_sessionsCountAggregateOutputType | null;
    _avg: Auth_sessionsAvgAggregateOutputType | null;
    _sum: Auth_sessionsSumAggregateOutputType | null;
    _min: Auth_sessionsMinAggregateOutputType | null;
    _max: Auth_sessionsMaxAggregateOutputType | null;
};
export type Auth_sessionsAvgAggregateOutputType = {
    id: number | null;
    user_id: number | null;
};
export type Auth_sessionsSumAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
};
export type Auth_sessionsMinAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    jti_hash: string | null;
    expires_at: Date | null;
    revoked_at: Date | null;
    created_at: Date | null;
};
export type Auth_sessionsMaxAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    jti_hash: string | null;
    expires_at: Date | null;
    revoked_at: Date | null;
    created_at: Date | null;
};
export type Auth_sessionsCountAggregateOutputType = {
    id: number;
    user_id: number;
    jti_hash: number;
    expires_at: number;
    revoked_at: number;
    created_at: number;
    _all: number;
};
export type Auth_sessionsAvgAggregateInputType = {
    id?: true;
    user_id?: true;
};
export type Auth_sessionsSumAggregateInputType = {
    id?: true;
    user_id?: true;
};
export type Auth_sessionsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    jti_hash?: true;
    expires_at?: true;
    revoked_at?: true;
    created_at?: true;
};
export type Auth_sessionsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    jti_hash?: true;
    expires_at?: true;
    revoked_at?: true;
    created_at?: true;
};
export type Auth_sessionsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    jti_hash?: true;
    expires_at?: true;
    revoked_at?: true;
    created_at?: true;
    _all?: true;
};
export type Auth_sessionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.auth_sessionsWhereInput;
    orderBy?: Prisma.auth_sessionsOrderByWithRelationInput | Prisma.auth_sessionsOrderByWithRelationInput[];
    cursor?: Prisma.auth_sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Auth_sessionsCountAggregateInputType;
    _avg?: Auth_sessionsAvgAggregateInputType;
    _sum?: Auth_sessionsSumAggregateInputType;
    _min?: Auth_sessionsMinAggregateInputType;
    _max?: Auth_sessionsMaxAggregateInputType;
};
export type GetAuth_sessionsAggregateType<T extends Auth_sessionsAggregateArgs> = {
    [P in keyof T & keyof AggregateAuth_sessions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuth_sessions[P]> : Prisma.GetScalarType<T[P], AggregateAuth_sessions[P]>;
};
export type auth_sessionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.auth_sessionsWhereInput;
    orderBy?: Prisma.auth_sessionsOrderByWithAggregationInput | Prisma.auth_sessionsOrderByWithAggregationInput[];
    by: Prisma.Auth_sessionsScalarFieldEnum[] | Prisma.Auth_sessionsScalarFieldEnum;
    having?: Prisma.auth_sessionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Auth_sessionsCountAggregateInputType | true;
    _avg?: Auth_sessionsAvgAggregateInputType;
    _sum?: Auth_sessionsSumAggregateInputType;
    _min?: Auth_sessionsMinAggregateInputType;
    _max?: Auth_sessionsMaxAggregateInputType;
};
export type Auth_sessionsGroupByOutputType = {
    id: bigint;
    user_id: bigint;
    jti_hash: string;
    expires_at: Date;
    revoked_at: Date | null;
    created_at: Date;
    _count: Auth_sessionsCountAggregateOutputType | null;
    _avg: Auth_sessionsAvgAggregateOutputType | null;
    _sum: Auth_sessionsSumAggregateOutputType | null;
    _min: Auth_sessionsMinAggregateOutputType | null;
    _max: Auth_sessionsMaxAggregateOutputType | null;
};
export type GetAuth_sessionsGroupByPayload<T extends auth_sessionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Auth_sessionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Auth_sessionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Auth_sessionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Auth_sessionsGroupByOutputType[P]>;
}>>;
export type auth_sessionsWhereInput = {
    AND?: Prisma.auth_sessionsWhereInput | Prisma.auth_sessionsWhereInput[];
    OR?: Prisma.auth_sessionsWhereInput[];
    NOT?: Prisma.auth_sessionsWhereInput | Prisma.auth_sessionsWhereInput[];
    id?: Prisma.BigIntFilter<"auth_sessions"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"auth_sessions"> | bigint | number;
    jti_hash?: Prisma.StringFilter<"auth_sessions"> | string;
    expires_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
    revoked_at?: Prisma.DateTimeNullableFilter<"auth_sessions"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type auth_sessionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    jti_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    revoked_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type auth_sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    jti_hash?: string;
    AND?: Prisma.auth_sessionsWhereInput | Prisma.auth_sessionsWhereInput[];
    OR?: Prisma.auth_sessionsWhereInput[];
    NOT?: Prisma.auth_sessionsWhereInput | Prisma.auth_sessionsWhereInput[];
    user_id?: Prisma.BigIntFilter<"auth_sessions"> | bigint | number;
    expires_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
    revoked_at?: Prisma.DateTimeNullableFilter<"auth_sessions"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "jti_hash">;
export type auth_sessionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    jti_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    revoked_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.auth_sessionsCountOrderByAggregateInput;
    _avg?: Prisma.auth_sessionsAvgOrderByAggregateInput;
    _max?: Prisma.auth_sessionsMaxOrderByAggregateInput;
    _min?: Prisma.auth_sessionsMinOrderByAggregateInput;
    _sum?: Prisma.auth_sessionsSumOrderByAggregateInput;
};
export type auth_sessionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.auth_sessionsScalarWhereWithAggregatesInput | Prisma.auth_sessionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.auth_sessionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.auth_sessionsScalarWhereWithAggregatesInput | Prisma.auth_sessionsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"auth_sessions"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"auth_sessions"> | bigint | number;
    jti_hash?: Prisma.StringWithAggregatesFilter<"auth_sessions"> | string;
    expires_at?: Prisma.DateTimeWithAggregatesFilter<"auth_sessions"> | Date | string;
    revoked_at?: Prisma.DateTimeNullableWithAggregatesFilter<"auth_sessions"> | Date | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"auth_sessions"> | Date | string;
};
export type auth_sessionsCreateInput = {
    id?: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutAuth_sessionsInput;
};
export type auth_sessionsUncheckedCreateInput = {
    id?: bigint | number;
    user_id: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
};
export type auth_sessionsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutAuth_sessionsNestedInput;
};
export type auth_sessionsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsCreateManyInput = {
    id?: bigint | number;
    user_id: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
};
export type auth_sessionsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    jti_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    revoked_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type auth_sessionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type auth_sessionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    jti_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    revoked_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type auth_sessionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    jti_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    revoked_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type auth_sessionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Auth_sessionsListRelationFilter = {
    every?: Prisma.auth_sessionsWhereInput;
    some?: Prisma.auth_sessionsWhereInput;
    none?: Prisma.auth_sessionsWhereInput;
};
export type auth_sessionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type auth_sessionsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput> | Prisma.auth_sessionsCreateWithoutUsersInput[] | Prisma.auth_sessionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.auth_sessionsCreateOrConnectWithoutUsersInput | Prisma.auth_sessionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.auth_sessionsCreateManyUsersInputEnvelope;
    connect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
};
export type auth_sessionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput> | Prisma.auth_sessionsCreateWithoutUsersInput[] | Prisma.auth_sessionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.auth_sessionsCreateOrConnectWithoutUsersInput | Prisma.auth_sessionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.auth_sessionsCreateManyUsersInputEnvelope;
    connect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
};
export type auth_sessionsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput> | Prisma.auth_sessionsCreateWithoutUsersInput[] | Prisma.auth_sessionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.auth_sessionsCreateOrConnectWithoutUsersInput | Prisma.auth_sessionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.auth_sessionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.auth_sessionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.auth_sessionsCreateManyUsersInputEnvelope;
    set?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    disconnect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    delete?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    connect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    update?: Prisma.auth_sessionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.auth_sessionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.auth_sessionsUpdateManyWithWhereWithoutUsersInput | Prisma.auth_sessionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.auth_sessionsScalarWhereInput | Prisma.auth_sessionsScalarWhereInput[];
};
export type auth_sessionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput> | Prisma.auth_sessionsCreateWithoutUsersInput[] | Prisma.auth_sessionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.auth_sessionsCreateOrConnectWithoutUsersInput | Prisma.auth_sessionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.auth_sessionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.auth_sessionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.auth_sessionsCreateManyUsersInputEnvelope;
    set?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    disconnect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    delete?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    connect?: Prisma.auth_sessionsWhereUniqueInput | Prisma.auth_sessionsWhereUniqueInput[];
    update?: Prisma.auth_sessionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.auth_sessionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.auth_sessionsUpdateManyWithWhereWithoutUsersInput | Prisma.auth_sessionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.auth_sessionsScalarWhereInput | Prisma.auth_sessionsScalarWhereInput[];
};
export type auth_sessionsCreateWithoutUsersInput = {
    id?: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
};
export type auth_sessionsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
};
export type auth_sessionsCreateOrConnectWithoutUsersInput = {
    where: Prisma.auth_sessionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput>;
};
export type auth_sessionsCreateManyUsersInputEnvelope = {
    data: Prisma.auth_sessionsCreateManyUsersInput | Prisma.auth_sessionsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type auth_sessionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.auth_sessionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.auth_sessionsUpdateWithoutUsersInput, Prisma.auth_sessionsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.auth_sessionsCreateWithoutUsersInput, Prisma.auth_sessionsUncheckedCreateWithoutUsersInput>;
};
export type auth_sessionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.auth_sessionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.auth_sessionsUpdateWithoutUsersInput, Prisma.auth_sessionsUncheckedUpdateWithoutUsersInput>;
};
export type auth_sessionsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.auth_sessionsScalarWhereInput;
    data: Prisma.XOR<Prisma.auth_sessionsUpdateManyMutationInput, Prisma.auth_sessionsUncheckedUpdateManyWithoutUsersInput>;
};
export type auth_sessionsScalarWhereInput = {
    AND?: Prisma.auth_sessionsScalarWhereInput | Prisma.auth_sessionsScalarWhereInput[];
    OR?: Prisma.auth_sessionsScalarWhereInput[];
    NOT?: Prisma.auth_sessionsScalarWhereInput | Prisma.auth_sessionsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"auth_sessions"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"auth_sessions"> | bigint | number;
    jti_hash?: Prisma.StringFilter<"auth_sessions"> | string;
    expires_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
    revoked_at?: Prisma.DateTimeNullableFilter<"auth_sessions"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"auth_sessions"> | Date | string;
};
export type auth_sessionsCreateManyUsersInput = {
    id?: bigint | number;
    jti_hash: string;
    expires_at: Date | string;
    revoked_at?: Date | string | null;
    created_at?: Date | string;
};
export type auth_sessionsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jti_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revoked_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type auth_sessionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    jti_hash?: boolean;
    expires_at?: boolean;
    revoked_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auth_sessions"]>;
export type auth_sessionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    jti_hash?: boolean;
    expires_at?: boolean;
    revoked_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auth_sessions"]>;
export type auth_sessionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    jti_hash?: boolean;
    expires_at?: boolean;
    revoked_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auth_sessions"]>;
export type auth_sessionsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    jti_hash?: boolean;
    expires_at?: boolean;
    revoked_at?: boolean;
    created_at?: boolean;
};
export type auth_sessionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "jti_hash" | "expires_at" | "revoked_at" | "created_at", ExtArgs["result"]["auth_sessions"]>;
export type auth_sessionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type auth_sessionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type auth_sessionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $auth_sessionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "auth_sessions";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        user_id: bigint;
        jti_hash: string;
        expires_at: Date;
        revoked_at: Date | null;
        created_at: Date;
    }, ExtArgs["result"]["auth_sessions"]>;
    composites: {};
};
export type auth_sessionsGetPayload<S extends boolean | null | undefined | auth_sessionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload, S>;
export type auth_sessionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<auth_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Auth_sessionsCountAggregateInputType | true;
};
export interface auth_sessionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['auth_sessions'];
        meta: {
            name: 'auth_sessions';
        };
    };
    findUnique<T extends auth_sessionsFindUniqueArgs>(args: Prisma.SelectSubset<T, auth_sessionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends auth_sessionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, auth_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends auth_sessionsFindFirstArgs>(args?: Prisma.SelectSubset<T, auth_sessionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends auth_sessionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, auth_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends auth_sessionsFindManyArgs>(args?: Prisma.SelectSubset<T, auth_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends auth_sessionsCreateArgs>(args: Prisma.SelectSubset<T, auth_sessionsCreateArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends auth_sessionsCreateManyArgs>(args?: Prisma.SelectSubset<T, auth_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends auth_sessionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, auth_sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends auth_sessionsDeleteArgs>(args: Prisma.SelectSubset<T, auth_sessionsDeleteArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends auth_sessionsUpdateArgs>(args: Prisma.SelectSubset<T, auth_sessionsUpdateArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends auth_sessionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, auth_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends auth_sessionsUpdateManyArgs>(args: Prisma.SelectSubset<T, auth_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends auth_sessionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, auth_sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends auth_sessionsUpsertArgs>(args: Prisma.SelectSubset<T, auth_sessionsUpsertArgs<ExtArgs>>): Prisma.Prisma__auth_sessionsClient<runtime.Types.Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends auth_sessionsCountArgs>(args?: Prisma.Subset<T, auth_sessionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Auth_sessionsCountAggregateOutputType> : number>;
    aggregate<T extends Auth_sessionsAggregateArgs>(args: Prisma.Subset<T, Auth_sessionsAggregateArgs>): Prisma.PrismaPromise<GetAuth_sessionsAggregateType<T>>;
    groupBy<T extends auth_sessionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: auth_sessionsGroupByArgs['orderBy'];
    } : {
        orderBy?: auth_sessionsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, auth_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: auth_sessionsFieldRefs;
}
export interface Prisma__auth_sessionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface auth_sessionsFieldRefs {
    readonly id: Prisma.FieldRef<"auth_sessions", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"auth_sessions", 'BigInt'>;
    readonly jti_hash: Prisma.FieldRef<"auth_sessions", 'String'>;
    readonly expires_at: Prisma.FieldRef<"auth_sessions", 'DateTime'>;
    readonly revoked_at: Prisma.FieldRef<"auth_sessions", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"auth_sessions", 'DateTime'>;
}
export type auth_sessionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where: Prisma.auth_sessionsWhereUniqueInput;
};
export type auth_sessionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where: Prisma.auth_sessionsWhereUniqueInput;
};
export type auth_sessionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where?: Prisma.auth_sessionsWhereInput;
    orderBy?: Prisma.auth_sessionsOrderByWithRelationInput | Prisma.auth_sessionsOrderByWithRelationInput[];
    cursor?: Prisma.auth_sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Auth_sessionsScalarFieldEnum | Prisma.Auth_sessionsScalarFieldEnum[];
};
export type auth_sessionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where?: Prisma.auth_sessionsWhereInput;
    orderBy?: Prisma.auth_sessionsOrderByWithRelationInput | Prisma.auth_sessionsOrderByWithRelationInput[];
    cursor?: Prisma.auth_sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Auth_sessionsScalarFieldEnum | Prisma.Auth_sessionsScalarFieldEnum[];
};
export type auth_sessionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where?: Prisma.auth_sessionsWhereInput;
    orderBy?: Prisma.auth_sessionsOrderByWithRelationInput | Prisma.auth_sessionsOrderByWithRelationInput[];
    cursor?: Prisma.auth_sessionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Auth_sessionsScalarFieldEnum | Prisma.Auth_sessionsScalarFieldEnum[];
};
export type auth_sessionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.auth_sessionsCreateInput, Prisma.auth_sessionsUncheckedCreateInput>;
};
export type auth_sessionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.auth_sessionsCreateManyInput | Prisma.auth_sessionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type auth_sessionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    data: Prisma.auth_sessionsCreateManyInput | Prisma.auth_sessionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.auth_sessionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type auth_sessionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.auth_sessionsUpdateInput, Prisma.auth_sessionsUncheckedUpdateInput>;
    where: Prisma.auth_sessionsWhereUniqueInput;
};
export type auth_sessionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.auth_sessionsUpdateManyMutationInput, Prisma.auth_sessionsUncheckedUpdateManyInput>;
    where?: Prisma.auth_sessionsWhereInput;
    limit?: number;
};
export type auth_sessionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.auth_sessionsUpdateManyMutationInput, Prisma.auth_sessionsUncheckedUpdateManyInput>;
    where?: Prisma.auth_sessionsWhereInput;
    limit?: number;
    include?: Prisma.auth_sessionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type auth_sessionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where: Prisma.auth_sessionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.auth_sessionsCreateInput, Prisma.auth_sessionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.auth_sessionsUpdateInput, Prisma.auth_sessionsUncheckedUpdateInput>;
};
export type auth_sessionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
    where: Prisma.auth_sessionsWhereUniqueInput;
};
export type auth_sessionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.auth_sessionsWhereInput;
    limit?: number;
};
export type auth_sessionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.auth_sessionsSelect<ExtArgs> | null;
    omit?: Prisma.auth_sessionsOmit<ExtArgs> | null;
    include?: Prisma.auth_sessionsInclude<ExtArgs> | null;
};
