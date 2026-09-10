import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_lifecycle_eventsModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_lifecycle_eventsPayload>;
export type AggregateTournament_lifecycle_events = {
    _count: Tournament_lifecycle_eventsCountAggregateOutputType | null;
    _avg: Tournament_lifecycle_eventsAvgAggregateOutputType | null;
    _sum: Tournament_lifecycle_eventsSumAggregateOutputType | null;
    _min: Tournament_lifecycle_eventsMinAggregateOutputType | null;
    _max: Tournament_lifecycle_eventsMaxAggregateOutputType | null;
};
export type Tournament_lifecycle_eventsAvgAggregateOutputType = {
    id: number | null;
    tournament_id: number | null;
    actor_user_id: number | null;
};
export type Tournament_lifecycle_eventsSumAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    actor_user_id: bigint | null;
};
export type Tournament_lifecycle_eventsMinAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    actor_user_id: bigint | null;
    from_phase: string | null;
    to_phase: string | null;
    reason: string | null;
    created_at: Date | null;
};
export type Tournament_lifecycle_eventsMaxAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    actor_user_id: bigint | null;
    from_phase: string | null;
    to_phase: string | null;
    reason: string | null;
    created_at: Date | null;
};
export type Tournament_lifecycle_eventsCountAggregateOutputType = {
    id: number;
    tournament_id: number;
    actor_user_id: number;
    from_phase: number;
    to_phase: number;
    reason: number;
    created_at: number;
    _all: number;
};
export type Tournament_lifecycle_eventsAvgAggregateInputType = {
    id?: true;
    tournament_id?: true;
    actor_user_id?: true;
};
export type Tournament_lifecycle_eventsSumAggregateInputType = {
    id?: true;
    tournament_id?: true;
    actor_user_id?: true;
};
export type Tournament_lifecycle_eventsMinAggregateInputType = {
    id?: true;
    tournament_id?: true;
    actor_user_id?: true;
    from_phase?: true;
    to_phase?: true;
    reason?: true;
    created_at?: true;
};
export type Tournament_lifecycle_eventsMaxAggregateInputType = {
    id?: true;
    tournament_id?: true;
    actor_user_id?: true;
    from_phase?: true;
    to_phase?: true;
    reason?: true;
    created_at?: true;
};
export type Tournament_lifecycle_eventsCountAggregateInputType = {
    id?: true;
    tournament_id?: true;
    actor_user_id?: true;
    from_phase?: true;
    to_phase?: true;
    reason?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_lifecycle_eventsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    orderBy?: Prisma.tournament_lifecycle_eventsOrderByWithRelationInput | Prisma.tournament_lifecycle_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_lifecycle_eventsCountAggregateInputType;
    _avg?: Tournament_lifecycle_eventsAvgAggregateInputType;
    _sum?: Tournament_lifecycle_eventsSumAggregateInputType;
    _min?: Tournament_lifecycle_eventsMinAggregateInputType;
    _max?: Tournament_lifecycle_eventsMaxAggregateInputType;
};
export type GetTournament_lifecycle_eventsAggregateType<T extends Tournament_lifecycle_eventsAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_lifecycle_events]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_lifecycle_events[P]> : Prisma.GetScalarType<T[P], AggregateTournament_lifecycle_events[P]>;
};
export type tournament_lifecycle_eventsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    orderBy?: Prisma.tournament_lifecycle_eventsOrderByWithAggregationInput | Prisma.tournament_lifecycle_eventsOrderByWithAggregationInput[];
    by: Prisma.Tournament_lifecycle_eventsScalarFieldEnum[] | Prisma.Tournament_lifecycle_eventsScalarFieldEnum;
    having?: Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_lifecycle_eventsCountAggregateInputType | true;
    _avg?: Tournament_lifecycle_eventsAvgAggregateInputType;
    _sum?: Tournament_lifecycle_eventsSumAggregateInputType;
    _min?: Tournament_lifecycle_eventsMinAggregateInputType;
    _max?: Tournament_lifecycle_eventsMaxAggregateInputType;
};
export type Tournament_lifecycle_eventsGroupByOutputType = {
    id: bigint;
    tournament_id: bigint;
    actor_user_id: bigint;
    from_phase: string | null;
    to_phase: string;
    reason: string | null;
    created_at: Date;
    _count: Tournament_lifecycle_eventsCountAggregateOutputType | null;
    _avg: Tournament_lifecycle_eventsAvgAggregateOutputType | null;
    _sum: Tournament_lifecycle_eventsSumAggregateOutputType | null;
    _min: Tournament_lifecycle_eventsMinAggregateOutputType | null;
    _max: Tournament_lifecycle_eventsMaxAggregateOutputType | null;
};
export type GetTournament_lifecycle_eventsGroupByPayload<T extends tournament_lifecycle_eventsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_lifecycle_eventsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_lifecycle_eventsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_lifecycle_eventsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_lifecycle_eventsGroupByOutputType[P]>;
}>>;
export type tournament_lifecycle_eventsWhereInput = {
    AND?: Prisma.tournament_lifecycle_eventsWhereInput | Prisma.tournament_lifecycle_eventsWhereInput[];
    OR?: Prisma.tournament_lifecycle_eventsWhereInput[];
    NOT?: Prisma.tournament_lifecycle_eventsWhereInput | Prisma.tournament_lifecycle_eventsWhereInput[];
    id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    from_phase?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    to_phase?: Prisma.StringFilter<"tournament_lifecycle_events"> | string;
    reason?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_lifecycle_events"> | Date | string;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type tournament_lifecycle_eventsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    from_phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    to_phase?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    tournaments?: Prisma.tournamentsOrderByWithRelationInput;
    actor?: Prisma.usersOrderByWithRelationInput;
};
export type tournament_lifecycle_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.tournament_lifecycle_eventsWhereInput | Prisma.tournament_lifecycle_eventsWhereInput[];
    OR?: Prisma.tournament_lifecycle_eventsWhereInput[];
    NOT?: Prisma.tournament_lifecycle_eventsWhereInput | Prisma.tournament_lifecycle_eventsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    from_phase?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    to_phase?: Prisma.StringFilter<"tournament_lifecycle_events"> | string;
    reason?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_lifecycle_events"> | Date | string;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type tournament_lifecycle_eventsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    from_phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    to_phase?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_lifecycle_eventsCountOrderByAggregateInput;
    _avg?: Prisma.tournament_lifecycle_eventsAvgOrderByAggregateInput;
    _max?: Prisma.tournament_lifecycle_eventsMaxOrderByAggregateInput;
    _min?: Prisma.tournament_lifecycle_eventsMinOrderByAggregateInput;
    _sum?: Prisma.tournament_lifecycle_eventsSumOrderByAggregateInput;
};
export type tournament_lifecycle_eventsScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput | Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput | Prisma.tournament_lifecycle_eventsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"tournament_lifecycle_events"> | bigint | number;
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_lifecycle_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntWithAggregatesFilter<"tournament_lifecycle_events"> | bigint | number;
    from_phase?: Prisma.StringNullableWithAggregatesFilter<"tournament_lifecycle_events"> | string | null;
    to_phase?: Prisma.StringWithAggregatesFilter<"tournament_lifecycle_events"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"tournament_lifecycle_events"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_lifecycle_events"> | Date | string;
};
export type tournament_lifecycle_eventsCreateInput = {
    id?: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_lifecycle_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutTournament_lifecycle_eventsInput;
};
export type tournament_lifecycle_eventsUncheckedCreateInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    actor_user_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_lifecycle_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutTournament_lifecycle_eventsNestedInput;
};
export type tournament_lifecycle_eventsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsCreateManyInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    actor_user_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    from_phase?: Prisma.SortOrder;
    to_phase?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_lifecycle_eventsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type tournament_lifecycle_eventsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    from_phase?: Prisma.SortOrder;
    to_phase?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_lifecycle_eventsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    from_phase?: Prisma.SortOrder;
    to_phase?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_lifecycle_eventsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type Tournament_lifecycle_eventsListRelationFilter = {
    every?: Prisma.tournament_lifecycle_eventsWhereInput;
    some?: Prisma.tournament_lifecycle_eventsWhereInput;
    none?: Prisma.tournament_lifecycle_eventsWhereInput;
};
export type tournament_lifecycle_eventsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_lifecycle_eventsCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
};
export type tournament_lifecycle_eventsUncheckedCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
};
export type tournament_lifecycle_eventsUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    update?: Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
};
export type tournament_lifecycle_eventsUncheckedUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    update?: Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
};
export type tournament_lifecycle_eventsCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_lifecycle_eventsCreateWithoutActorInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
};
export type tournament_lifecycle_eventsUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_lifecycle_eventsCreateWithoutActorInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
};
export type tournament_lifecycle_eventsUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_lifecycle_eventsCreateWithoutActorInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyActorInputEnvelope;
    set?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    update?: Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutActorInput | Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
};
export type tournament_lifecycle_eventsUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_lifecycle_eventsCreateWithoutActorInput[] | Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_lifecycle_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.tournament_lifecycle_eventsCreateManyActorInputEnvelope;
    set?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_lifecycle_eventsWhereUniqueInput | Prisma.tournament_lifecycle_eventsWhereUniqueInput[];
    update?: Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutActorInput | Prisma.tournament_lifecycle_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
};
export type tournament_lifecycle_eventsCreateWithoutTournamentsInput = {
    id?: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
    actor: Prisma.usersCreateNestedOneWithoutTournament_lifecycle_eventsInput;
};
export type tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_lifecycle_eventsCreateManyTournamentsInputEnvelope = {
    data: Prisma.tournament_lifecycle_eventsCreateManyTournamentsInput | Prisma.tournament_lifecycle_eventsCreateManyTournamentsInput[];
    skipDuplicates?: boolean;
};
export type tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateWithoutTournamentsInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_lifecycle_eventsUpdateManyWithWhereWithoutTournamentsInput = {
    where: Prisma.tournament_lifecycle_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateManyMutationInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateManyWithoutTournamentsInput>;
};
export type tournament_lifecycle_eventsScalarWhereInput = {
    AND?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
    OR?: Prisma.tournament_lifecycle_eventsScalarWhereInput[];
    NOT?: Prisma.tournament_lifecycle_eventsScalarWhereInput | Prisma.tournament_lifecycle_eventsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_lifecycle_events"> | bigint | number;
    from_phase?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    to_phase?: Prisma.StringFilter<"tournament_lifecycle_events"> | string;
    reason?: Prisma.StringNullableFilter<"tournament_lifecycle_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_lifecycle_events"> | Date | string;
};
export type tournament_lifecycle_eventsCreateWithoutActorInput = {
    id?: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_lifecycle_eventsInput;
};
export type tournament_lifecycle_eventsUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsCreateOrConnectWithoutActorInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput>;
};
export type tournament_lifecycle_eventsCreateManyActorInputEnvelope = {
    data: Prisma.tournament_lifecycle_eventsCreateManyActorInput | Prisma.tournament_lifecycle_eventsCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type tournament_lifecycle_eventsUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedCreateWithoutActorInput>;
};
export type tournament_lifecycle_eventsUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateWithoutActorInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateWithoutActorInput>;
};
export type tournament_lifecycle_eventsUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.tournament_lifecycle_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateManyMutationInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateManyWithoutActorInput>;
};
export type tournament_lifecycle_eventsCreateManyTournamentsInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.usersUpdateOneRequiredWithoutTournament_lifecycle_eventsNestedInput;
};
export type tournament_lifecycle_eventsUncheckedUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsUncheckedUpdateManyWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsCreateManyActorInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    from_phase?: string | null;
    to_phase: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type tournament_lifecycle_eventsUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_lifecycle_eventsNestedInput;
};
export type tournament_lifecycle_eventsUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    from_phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_phase?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_lifecycle_eventsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    actor_user_id?: boolean;
    from_phase?: boolean;
    to_phase?: boolean;
    reason?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_lifecycle_events"]>;
export type tournament_lifecycle_eventsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    actor_user_id?: boolean;
    from_phase?: boolean;
    to_phase?: boolean;
    reason?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_lifecycle_events"]>;
export type tournament_lifecycle_eventsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    actor_user_id?: boolean;
    from_phase?: boolean;
    to_phase?: boolean;
    reason?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_lifecycle_events"]>;
export type tournament_lifecycle_eventsSelectScalar = {
    id?: boolean;
    tournament_id?: boolean;
    actor_user_id?: boolean;
    from_phase?: boolean;
    to_phase?: boolean;
    reason?: boolean;
    created_at?: boolean;
};
export type tournament_lifecycle_eventsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tournament_id" | "actor_user_id" | "from_phase" | "to_phase" | "reason" | "created_at", ExtArgs["result"]["tournament_lifecycle_events"]>;
export type tournament_lifecycle_eventsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_lifecycle_eventsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_lifecycle_eventsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $tournament_lifecycle_eventsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_lifecycle_events";
    objects: {
        tournaments: Prisma.$tournamentsPayload<ExtArgs>;
        actor: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        tournament_id: bigint;
        actor_user_id: bigint;
        from_phase: string | null;
        to_phase: string;
        reason: string | null;
        created_at: Date;
    }, ExtArgs["result"]["tournament_lifecycle_events"]>;
    composites: {};
};
export type tournament_lifecycle_eventsGetPayload<S extends boolean | null | undefined | tournament_lifecycle_eventsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload, S>;
export type tournament_lifecycle_eventsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_lifecycle_eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_lifecycle_eventsCountAggregateInputType | true;
};
export interface tournament_lifecycle_eventsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_lifecycle_events'];
        meta: {
            name: 'tournament_lifecycle_events';
        };
    };
    findUnique<T extends tournament_lifecycle_eventsFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_lifecycle_eventsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_lifecycle_eventsFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_lifecycle_eventsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_lifecycle_eventsFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_lifecycle_eventsCreateArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_lifecycle_eventsCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_lifecycle_eventsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_lifecycle_eventsDeleteArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_lifecycle_eventsUpdateArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_lifecycle_eventsDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_lifecycle_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_lifecycle_eventsUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_lifecycle_eventsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_lifecycle_eventsUpsertArgs>(args: Prisma.SelectSubset<T, tournament_lifecycle_eventsUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_lifecycle_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_lifecycle_eventsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_lifecycle_eventsCountArgs>(args?: Prisma.Subset<T, tournament_lifecycle_eventsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_lifecycle_eventsCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_lifecycle_eventsAggregateArgs>(args: Prisma.Subset<T, Tournament_lifecycle_eventsAggregateArgs>): Prisma.PrismaPromise<GetTournament_lifecycle_eventsAggregateType<T>>;
    groupBy<T extends tournament_lifecycle_eventsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_lifecycle_eventsGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_lifecycle_eventsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_lifecycle_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_lifecycle_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_lifecycle_eventsFieldRefs;
}
export interface Prisma__tournament_lifecycle_eventsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tournaments<T extends Prisma.tournamentsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournamentsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournamentsClient<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_lifecycle_eventsFieldRefs {
    readonly id: Prisma.FieldRef<"tournament_lifecycle_events", 'BigInt'>;
    readonly tournament_id: Prisma.FieldRef<"tournament_lifecycle_events", 'BigInt'>;
    readonly actor_user_id: Prisma.FieldRef<"tournament_lifecycle_events", 'BigInt'>;
    readonly from_phase: Prisma.FieldRef<"tournament_lifecycle_events", 'String'>;
    readonly to_phase: Prisma.FieldRef<"tournament_lifecycle_events", 'String'>;
    readonly reason: Prisma.FieldRef<"tournament_lifecycle_events", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_lifecycle_events", 'DateTime'>;
}
export type tournament_lifecycle_eventsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
};
export type tournament_lifecycle_eventsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
};
export type tournament_lifecycle_eventsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    orderBy?: Prisma.tournament_lifecycle_eventsOrderByWithRelationInput | Prisma.tournament_lifecycle_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_lifecycle_eventsScalarFieldEnum | Prisma.Tournament_lifecycle_eventsScalarFieldEnum[];
};
export type tournament_lifecycle_eventsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    orderBy?: Prisma.tournament_lifecycle_eventsOrderByWithRelationInput | Prisma.tournament_lifecycle_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_lifecycle_eventsScalarFieldEnum | Prisma.Tournament_lifecycle_eventsScalarFieldEnum[];
};
export type tournament_lifecycle_eventsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    orderBy?: Prisma.tournament_lifecycle_eventsOrderByWithRelationInput | Prisma.tournament_lifecycle_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_lifecycle_eventsScalarFieldEnum | Prisma.Tournament_lifecycle_eventsScalarFieldEnum[];
};
export type tournament_lifecycle_eventsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateInput, Prisma.tournament_lifecycle_eventsUncheckedCreateInput>;
};
export type tournament_lifecycle_eventsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_lifecycle_eventsCreateManyInput | Prisma.tournament_lifecycle_eventsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_lifecycle_eventsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    data: Prisma.tournament_lifecycle_eventsCreateManyInput | Prisma.tournament_lifecycle_eventsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_lifecycle_eventsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_lifecycle_eventsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateInput>;
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
};
export type tournament_lifecycle_eventsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateManyMutationInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    limit?: number;
};
export type tournament_lifecycle_eventsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateManyMutationInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    limit?: number;
    include?: Prisma.tournament_lifecycle_eventsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_lifecycle_eventsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_lifecycle_eventsCreateInput, Prisma.tournament_lifecycle_eventsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_lifecycle_eventsUpdateInput, Prisma.tournament_lifecycle_eventsUncheckedUpdateInput>;
};
export type tournament_lifecycle_eventsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_lifecycle_eventsWhereUniqueInput;
};
export type tournament_lifecycle_eventsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_lifecycle_eventsWhereInput;
    limit?: number;
};
export type tournament_lifecycle_eventsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_lifecycle_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_lifecycle_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_lifecycle_eventsInclude<ExtArgs> | null;
};
