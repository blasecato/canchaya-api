import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type disciplinary_eventsModel = runtime.Types.Result.DefaultSelection<Prisma.$disciplinary_eventsPayload>;
export type AggregateDisciplinary_events = {
    _count: Disciplinary_eventsCountAggregateOutputType | null;
    _avg: Disciplinary_eventsAvgAggregateOutputType | null;
    _sum: Disciplinary_eventsSumAggregateOutputType | null;
    _min: Disciplinary_eventsMinAggregateOutputType | null;
    _max: Disciplinary_eventsMaxAggregateOutputType | null;
};
export type Disciplinary_eventsAvgAggregateOutputType = {
    id: number | null;
    disciplinary_action_id: number | null;
    actor_user_id: number | null;
};
export type Disciplinary_eventsSumAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    actor_user_id: bigint | null;
};
export type Disciplinary_eventsMinAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Disciplinary_eventsMaxAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Disciplinary_eventsCountAggregateOutputType = {
    id: number;
    disciplinary_action_id: number;
    actor_user_id: number;
    event_type: number;
    message: number;
    metadata: number;
    created_at: number;
    _all: number;
};
export type Disciplinary_eventsAvgAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    actor_user_id?: true;
};
export type Disciplinary_eventsSumAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    actor_user_id?: true;
};
export type Disciplinary_eventsMinAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    created_at?: true;
};
export type Disciplinary_eventsMaxAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    created_at?: true;
};
export type Disciplinary_eventsCountAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    metadata?: true;
    created_at?: true;
    _all?: true;
};
export type Disciplinary_eventsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_eventsWhereInput;
    orderBy?: Prisma.disciplinary_eventsOrderByWithRelationInput | Prisma.disciplinary_eventsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Disciplinary_eventsCountAggregateInputType;
    _avg?: Disciplinary_eventsAvgAggregateInputType;
    _sum?: Disciplinary_eventsSumAggregateInputType;
    _min?: Disciplinary_eventsMinAggregateInputType;
    _max?: Disciplinary_eventsMaxAggregateInputType;
};
export type GetDisciplinary_eventsAggregateType<T extends Disciplinary_eventsAggregateArgs> = {
    [P in keyof T & keyof AggregateDisciplinary_events]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDisciplinary_events[P]> : Prisma.GetScalarType<T[P], AggregateDisciplinary_events[P]>;
};
export type disciplinary_eventsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_eventsWhereInput;
    orderBy?: Prisma.disciplinary_eventsOrderByWithAggregationInput | Prisma.disciplinary_eventsOrderByWithAggregationInput[];
    by: Prisma.Disciplinary_eventsScalarFieldEnum[] | Prisma.Disciplinary_eventsScalarFieldEnum;
    having?: Prisma.disciplinary_eventsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Disciplinary_eventsCountAggregateInputType | true;
    _avg?: Disciplinary_eventsAvgAggregateInputType;
    _sum?: Disciplinary_eventsSumAggregateInputType;
    _min?: Disciplinary_eventsMinAggregateInputType;
    _max?: Disciplinary_eventsMaxAggregateInputType;
};
export type Disciplinary_eventsGroupByOutputType = {
    id: bigint;
    disciplinary_action_id: bigint;
    actor_user_id: bigint;
    event_type: string;
    message: string | null;
    metadata: runtime.JsonValue | null;
    created_at: Date;
    _count: Disciplinary_eventsCountAggregateOutputType | null;
    _avg: Disciplinary_eventsAvgAggregateOutputType | null;
    _sum: Disciplinary_eventsSumAggregateOutputType | null;
    _min: Disciplinary_eventsMinAggregateOutputType | null;
    _max: Disciplinary_eventsMaxAggregateOutputType | null;
};
export type GetDisciplinary_eventsGroupByPayload<T extends disciplinary_eventsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Disciplinary_eventsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Disciplinary_eventsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Disciplinary_eventsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Disciplinary_eventsGroupByOutputType[P]>;
}>>;
export type disciplinary_eventsWhereInput = {
    AND?: Prisma.disciplinary_eventsWhereInput | Prisma.disciplinary_eventsWhereInput[];
    OR?: Prisma.disciplinary_eventsWhereInput[];
    NOT?: Prisma.disciplinary_eventsWhereInput | Prisma.disciplinary_eventsWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"disciplinary_events"> | string;
    message?: Prisma.StringNullableFilter<"disciplinary_events"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"disciplinary_events">;
    created_at?: Prisma.DateTimeFilter<"disciplinary_events"> | Date | string;
    disciplinary_action?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type disciplinary_eventsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    disciplinary_action?: Prisma.disciplinary_actionsOrderByWithRelationInput;
    actor?: Prisma.usersOrderByWithRelationInput;
};
export type disciplinary_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.disciplinary_eventsWhereInput | Prisma.disciplinary_eventsWhereInput[];
    OR?: Prisma.disciplinary_eventsWhereInput[];
    NOT?: Prisma.disciplinary_eventsWhereInput | Prisma.disciplinary_eventsWhereInput[];
    disciplinary_action_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"disciplinary_events"> | string;
    message?: Prisma.StringNullableFilter<"disciplinary_events"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"disciplinary_events">;
    created_at?: Prisma.DateTimeFilter<"disciplinary_events"> | Date | string;
    disciplinary_action?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type disciplinary_eventsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.disciplinary_eventsCountOrderByAggregateInput;
    _avg?: Prisma.disciplinary_eventsAvgOrderByAggregateInput;
    _max?: Prisma.disciplinary_eventsMaxOrderByAggregateInput;
    _min?: Prisma.disciplinary_eventsMinOrderByAggregateInput;
    _sum?: Prisma.disciplinary_eventsSumOrderByAggregateInput;
};
export type disciplinary_eventsScalarWhereWithAggregatesInput = {
    AND?: Prisma.disciplinary_eventsScalarWhereWithAggregatesInput | Prisma.disciplinary_eventsScalarWhereWithAggregatesInput[];
    OR?: Prisma.disciplinary_eventsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.disciplinary_eventsScalarWhereWithAggregatesInput | Prisma.disciplinary_eventsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_events"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_events"> | bigint | number;
    event_type?: Prisma.StringWithAggregatesFilter<"disciplinary_events"> | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"disciplinary_events"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"disciplinary_events">;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"disciplinary_events"> | Date | string;
};
export type disciplinary_eventsCreateInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    disciplinary_action: Prisma.disciplinary_actionsCreateNestedOneWithoutDisciplinary_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutDisciplinary_eventsInput;
};
export type disciplinary_eventsUncheckedCreateInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_action?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutDisciplinary_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_eventsNestedInput;
};
export type disciplinary_eventsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsCreateManyInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Disciplinary_eventsListRelationFilter = {
    every?: Prisma.disciplinary_eventsWhereInput;
    some?: Prisma.disciplinary_eventsWhereInput;
    none?: Prisma.disciplinary_eventsWhereInput;
};
export type disciplinary_eventsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type disciplinary_eventsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_eventsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type disciplinary_eventsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_eventsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_eventsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type disciplinary_eventsCreateNestedManyWithoutDisciplinary_actionInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput> | Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyDisciplinary_actionInputEnvelope;
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
};
export type disciplinary_eventsUncheckedCreateNestedManyWithoutDisciplinary_actionInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput> | Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyDisciplinary_actionInputEnvelope;
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
};
export type disciplinary_eventsUpdateManyWithoutDisciplinary_actionNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput> | Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput[];
    upsert?: Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutDisciplinary_actionInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyDisciplinary_actionInputEnvelope;
    set?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    delete?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    update?: Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutDisciplinary_actionInput[];
    updateMany?: Prisma.disciplinary_eventsUpdateManyWithWhereWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpdateManyWithWhereWithoutDisciplinary_actionInput[];
    deleteMany?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
};
export type disciplinary_eventsUncheckedUpdateManyWithoutDisciplinary_actionNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput> | Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput[];
    upsert?: Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutDisciplinary_actionInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyDisciplinary_actionInputEnvelope;
    set?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    delete?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    update?: Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutDisciplinary_actionInput[];
    updateMany?: Prisma.disciplinary_eventsUpdateManyWithWhereWithoutDisciplinary_actionInput | Prisma.disciplinary_eventsUpdateManyWithWhereWithoutDisciplinary_actionInput[];
    deleteMany?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
};
export type disciplinary_eventsCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput> | Prisma.disciplinary_eventsCreateWithoutActorInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput | Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
};
export type disciplinary_eventsUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput> | Prisma.disciplinary_eventsCreateWithoutActorInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput | Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
};
export type disciplinary_eventsUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput> | Prisma.disciplinary_eventsCreateWithoutActorInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput | Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyActorInputEnvelope;
    set?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    delete?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    update?: Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.disciplinary_eventsUpdateManyWithWhereWithoutActorInput | Prisma.disciplinary_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
};
export type disciplinary_eventsUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput> | Prisma.disciplinary_eventsCreateWithoutActorInput[] | Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput | Prisma.disciplinary_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.disciplinary_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.disciplinary_eventsCreateManyActorInputEnvelope;
    set?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    delete?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    connect?: Prisma.disciplinary_eventsWhereUniqueInput | Prisma.disciplinary_eventsWhereUniqueInput[];
    update?: Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.disciplinary_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.disciplinary_eventsUpdateManyWithWhereWithoutActorInput | Prisma.disciplinary_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
};
export type disciplinary_eventsCreateWithoutDisciplinary_actionInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    actor: Prisma.usersCreateNestedOneWithoutDisciplinary_eventsInput;
};
export type disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsCreateOrConnectWithoutDisciplinary_actionInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput>;
};
export type disciplinary_eventsCreateManyDisciplinary_actionInputEnvelope = {
    data: Prisma.disciplinary_eventsCreateManyDisciplinary_actionInput | Prisma.disciplinary_eventsCreateManyDisciplinary_actionInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_eventsUpsertWithWhereUniqueWithoutDisciplinary_actionInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_eventsUpdateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedUpdateWithoutDisciplinary_actionInput>;
    create: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedCreateWithoutDisciplinary_actionInput>;
};
export type disciplinary_eventsUpdateWithWhereUniqueWithoutDisciplinary_actionInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateWithoutDisciplinary_actionInput, Prisma.disciplinary_eventsUncheckedUpdateWithoutDisciplinary_actionInput>;
};
export type disciplinary_eventsUpdateManyWithWhereWithoutDisciplinary_actionInput = {
    where: Prisma.disciplinary_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateManyMutationInput, Prisma.disciplinary_eventsUncheckedUpdateManyWithoutDisciplinary_actionInput>;
};
export type disciplinary_eventsScalarWhereInput = {
    AND?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
    OR?: Prisma.disciplinary_eventsScalarWhereInput[];
    NOT?: Prisma.disciplinary_eventsScalarWhereInput | Prisma.disciplinary_eventsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"disciplinary_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"disciplinary_events"> | string;
    message?: Prisma.StringNullableFilter<"disciplinary_events"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"disciplinary_events">;
    created_at?: Prisma.DateTimeFilter<"disciplinary_events"> | Date | string;
};
export type disciplinary_eventsCreateWithoutActorInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    disciplinary_action: Prisma.disciplinary_actionsCreateNestedOneWithoutDisciplinary_eventsInput;
};
export type disciplinary_eventsUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsCreateOrConnectWithoutActorInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput>;
};
export type disciplinary_eventsCreateManyActorInputEnvelope = {
    data: Prisma.disciplinary_eventsCreateManyActorInput | Prisma.disciplinary_eventsCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_eventsUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_eventsUpdateWithoutActorInput, Prisma.disciplinary_eventsUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.disciplinary_eventsCreateWithoutActorInput, Prisma.disciplinary_eventsUncheckedCreateWithoutActorInput>;
};
export type disciplinary_eventsUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateWithoutActorInput, Prisma.disciplinary_eventsUncheckedUpdateWithoutActorInput>;
};
export type disciplinary_eventsUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.disciplinary_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateManyMutationInput, Prisma.disciplinary_eventsUncheckedUpdateManyWithoutActorInput>;
};
export type disciplinary_eventsCreateManyDisciplinary_actionInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsUpdateWithoutDisciplinary_actionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_eventsNestedInput;
};
export type disciplinary_eventsUncheckedUpdateWithoutDisciplinary_actionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsUncheckedUpdateManyWithoutDisciplinary_actionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsCreateManyActorInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    event_type: string;
    message?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
};
export type disciplinary_eventsUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_action?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutDisciplinary_eventsNestedInput;
};
export type disciplinary_eventsUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_eventsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_events"]>;
export type disciplinary_eventsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_events"]>;
export type disciplinary_eventsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    metadata?: boolean;
    created_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_events"]>;
export type disciplinary_eventsSelectScalar = {
    id?: boolean;
    disciplinary_action_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    metadata?: boolean;
    created_at?: boolean;
};
export type disciplinary_eventsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disciplinary_action_id" | "actor_user_id" | "event_type" | "message" | "metadata" | "created_at", ExtArgs["result"]["disciplinary_events"]>;
export type disciplinary_eventsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type disciplinary_eventsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type disciplinary_eventsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $disciplinary_eventsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "disciplinary_events";
    objects: {
        disciplinary_action: Prisma.$disciplinary_actionsPayload<ExtArgs>;
        actor: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        disciplinary_action_id: bigint;
        actor_user_id: bigint;
        event_type: string;
        message: string | null;
        metadata: runtime.JsonValue | null;
        created_at: Date;
    }, ExtArgs["result"]["disciplinary_events"]>;
    composites: {};
};
export type disciplinary_eventsGetPayload<S extends boolean | null | undefined | disciplinary_eventsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload, S>;
export type disciplinary_eventsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<disciplinary_eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Disciplinary_eventsCountAggregateInputType | true;
};
export interface disciplinary_eventsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['disciplinary_events'];
        meta: {
            name: 'disciplinary_events';
        };
    };
    findUnique<T extends disciplinary_eventsFindUniqueArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends disciplinary_eventsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends disciplinary_eventsFindFirstArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsFindFirstArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends disciplinary_eventsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends disciplinary_eventsFindManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends disciplinary_eventsCreateArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsCreateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends disciplinary_eventsCreateManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends disciplinary_eventsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends disciplinary_eventsDeleteArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsDeleteArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends disciplinary_eventsUpdateArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsUpdateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends disciplinary_eventsDeleteManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends disciplinary_eventsUpdateManyArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends disciplinary_eventsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends disciplinary_eventsUpsertArgs>(args: Prisma.SelectSubset<T, disciplinary_eventsUpsertArgs<ExtArgs>>): Prisma.Prisma__disciplinary_eventsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_eventsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends disciplinary_eventsCountArgs>(args?: Prisma.Subset<T, disciplinary_eventsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Disciplinary_eventsCountAggregateOutputType> : number>;
    aggregate<T extends Disciplinary_eventsAggregateArgs>(args: Prisma.Subset<T, Disciplinary_eventsAggregateArgs>): Prisma.PrismaPromise<GetDisciplinary_eventsAggregateType<T>>;
    groupBy<T extends disciplinary_eventsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: disciplinary_eventsGroupByArgs['orderBy'];
    } : {
        orderBy?: disciplinary_eventsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, disciplinary_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinary_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: disciplinary_eventsFieldRefs;
}
export interface Prisma__disciplinary_eventsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disciplinary_action<T extends Prisma.disciplinary_actionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actionsDefaultArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface disciplinary_eventsFieldRefs {
    readonly id: Prisma.FieldRef<"disciplinary_events", 'BigInt'>;
    readonly disciplinary_action_id: Prisma.FieldRef<"disciplinary_events", 'BigInt'>;
    readonly actor_user_id: Prisma.FieldRef<"disciplinary_events", 'BigInt'>;
    readonly event_type: Prisma.FieldRef<"disciplinary_events", 'String'>;
    readonly message: Prisma.FieldRef<"disciplinary_events", 'String'>;
    readonly metadata: Prisma.FieldRef<"disciplinary_events", 'Json'>;
    readonly created_at: Prisma.FieldRef<"disciplinary_events", 'DateTime'>;
}
export type disciplinary_eventsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_eventsWhereUniqueInput;
};
export type disciplinary_eventsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_eventsWhereUniqueInput;
};
export type disciplinary_eventsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_eventsWhereInput;
    orderBy?: Prisma.disciplinary_eventsOrderByWithRelationInput | Prisma.disciplinary_eventsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_eventsScalarFieldEnum | Prisma.Disciplinary_eventsScalarFieldEnum[];
};
export type disciplinary_eventsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_eventsWhereInput;
    orderBy?: Prisma.disciplinary_eventsOrderByWithRelationInput | Prisma.disciplinary_eventsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_eventsScalarFieldEnum | Prisma.Disciplinary_eventsScalarFieldEnum[];
};
export type disciplinary_eventsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_eventsWhereInput;
    orderBy?: Prisma.disciplinary_eventsOrderByWithRelationInput | Prisma.disciplinary_eventsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_eventsScalarFieldEnum | Prisma.Disciplinary_eventsScalarFieldEnum[];
};
export type disciplinary_eventsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_eventsCreateInput, Prisma.disciplinary_eventsUncheckedCreateInput>;
};
export type disciplinary_eventsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.disciplinary_eventsCreateManyInput | Prisma.disciplinary_eventsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_eventsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    data: Prisma.disciplinary_eventsCreateManyInput | Prisma.disciplinary_eventsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.disciplinary_eventsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_eventsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateInput, Prisma.disciplinary_eventsUncheckedUpdateInput>;
    where: Prisma.disciplinary_eventsWhereUniqueInput;
};
export type disciplinary_eventsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateManyMutationInput, Prisma.disciplinary_eventsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_eventsWhereInput;
    limit?: number;
};
export type disciplinary_eventsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_eventsUpdateManyMutationInput, Prisma.disciplinary_eventsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_eventsWhereInput;
    limit?: number;
    include?: Prisma.disciplinary_eventsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_eventsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_eventsCreateInput, Prisma.disciplinary_eventsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.disciplinary_eventsUpdateInput, Prisma.disciplinary_eventsUncheckedUpdateInput>;
};
export type disciplinary_eventsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_eventsWhereUniqueInput;
};
export type disciplinary_eventsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_eventsWhereInput;
    limit?: number;
};
export type disciplinary_eventsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_eventsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_eventsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_eventsInclude<ExtArgs> | null;
};
