import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type referee_assignment_eventsModel = runtime.Types.Result.DefaultSelection<Prisma.$referee_assignment_eventsPayload>;
export type AggregateReferee_assignment_events = {
    _count: Referee_assignment_eventsCountAggregateOutputType | null;
    _avg: Referee_assignment_eventsAvgAggregateOutputType | null;
    _sum: Referee_assignment_eventsSumAggregateOutputType | null;
    _min: Referee_assignment_eventsMinAggregateOutputType | null;
    _max: Referee_assignment_eventsMaxAggregateOutputType | null;
};
export type Referee_assignment_eventsAvgAggregateOutputType = {
    id: number | null;
    match_id: number | null;
    referee_id: number | null;
    actor_user_id: number | null;
};
export type Referee_assignment_eventsSumAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    referee_id: bigint | null;
    actor_user_id: bigint | null;
};
export type Referee_assignment_eventsMinAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    referee_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    previous_status: string | null;
    new_status: string | null;
    reason: string | null;
    created_at: Date | null;
};
export type Referee_assignment_eventsMaxAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    referee_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    previous_status: string | null;
    new_status: string | null;
    reason: string | null;
    created_at: Date | null;
};
export type Referee_assignment_eventsCountAggregateOutputType = {
    id: number;
    match_id: number;
    referee_id: number;
    actor_user_id: number;
    event_type: number;
    previous_status: number;
    new_status: number;
    reason: number;
    created_at: number;
    _all: number;
};
export type Referee_assignment_eventsAvgAggregateInputType = {
    id?: true;
    match_id?: true;
    referee_id?: true;
    actor_user_id?: true;
};
export type Referee_assignment_eventsSumAggregateInputType = {
    id?: true;
    match_id?: true;
    referee_id?: true;
    actor_user_id?: true;
};
export type Referee_assignment_eventsMinAggregateInputType = {
    id?: true;
    match_id?: true;
    referee_id?: true;
    actor_user_id?: true;
    event_type?: true;
    previous_status?: true;
    new_status?: true;
    reason?: true;
    created_at?: true;
};
export type Referee_assignment_eventsMaxAggregateInputType = {
    id?: true;
    match_id?: true;
    referee_id?: true;
    actor_user_id?: true;
    event_type?: true;
    previous_status?: true;
    new_status?: true;
    reason?: true;
    created_at?: true;
};
export type Referee_assignment_eventsCountAggregateInputType = {
    id?: true;
    match_id?: true;
    referee_id?: true;
    actor_user_id?: true;
    event_type?: true;
    previous_status?: true;
    new_status?: true;
    reason?: true;
    created_at?: true;
    _all?: true;
};
export type Referee_assignment_eventsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_assignment_eventsWhereInput;
    orderBy?: Prisma.referee_assignment_eventsOrderByWithRelationInput | Prisma.referee_assignment_eventsOrderByWithRelationInput[];
    cursor?: Prisma.referee_assignment_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Referee_assignment_eventsCountAggregateInputType;
    _avg?: Referee_assignment_eventsAvgAggregateInputType;
    _sum?: Referee_assignment_eventsSumAggregateInputType;
    _min?: Referee_assignment_eventsMinAggregateInputType;
    _max?: Referee_assignment_eventsMaxAggregateInputType;
};
export type GetReferee_assignment_eventsAggregateType<T extends Referee_assignment_eventsAggregateArgs> = {
    [P in keyof T & keyof AggregateReferee_assignment_events]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReferee_assignment_events[P]> : Prisma.GetScalarType<T[P], AggregateReferee_assignment_events[P]>;
};
export type referee_assignment_eventsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_assignment_eventsWhereInput;
    orderBy?: Prisma.referee_assignment_eventsOrderByWithAggregationInput | Prisma.referee_assignment_eventsOrderByWithAggregationInput[];
    by: Prisma.Referee_assignment_eventsScalarFieldEnum[] | Prisma.Referee_assignment_eventsScalarFieldEnum;
    having?: Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Referee_assignment_eventsCountAggregateInputType | true;
    _avg?: Referee_assignment_eventsAvgAggregateInputType;
    _sum?: Referee_assignment_eventsSumAggregateInputType;
    _min?: Referee_assignment_eventsMinAggregateInputType;
    _max?: Referee_assignment_eventsMaxAggregateInputType;
};
export type Referee_assignment_eventsGroupByOutputType = {
    id: bigint;
    match_id: bigint;
    referee_id: bigint;
    actor_user_id: bigint;
    event_type: string;
    previous_status: string | null;
    new_status: string;
    reason: string | null;
    created_at: Date;
    _count: Referee_assignment_eventsCountAggregateOutputType | null;
    _avg: Referee_assignment_eventsAvgAggregateOutputType | null;
    _sum: Referee_assignment_eventsSumAggregateOutputType | null;
    _min: Referee_assignment_eventsMinAggregateOutputType | null;
    _max: Referee_assignment_eventsMaxAggregateOutputType | null;
};
export type GetReferee_assignment_eventsGroupByPayload<T extends referee_assignment_eventsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Referee_assignment_eventsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Referee_assignment_eventsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Referee_assignment_eventsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Referee_assignment_eventsGroupByOutputType[P]>;
}>>;
export type referee_assignment_eventsWhereInput = {
    AND?: Prisma.referee_assignment_eventsWhereInput | Prisma.referee_assignment_eventsWhereInput[];
    OR?: Prisma.referee_assignment_eventsWhereInput[];
    NOT?: Prisma.referee_assignment_eventsWhereInput | Prisma.referee_assignment_eventsWhereInput[];
    id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    match_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"referee_assignment_events"> | string;
    previous_status?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    new_status?: Prisma.StringFilter<"referee_assignment_events"> | string;
    reason?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"referee_assignment_events"> | Date | string;
    assignment?: Prisma.XOR<Prisma.Match_refereesScalarRelationFilter, Prisma.match_refereesWhereInput>;
    match?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type referee_assignment_eventsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    previous_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    new_status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    assignment?: Prisma.match_refereesOrderByWithRelationInput;
    match?: Prisma.matchesOrderByWithRelationInput;
    actor?: Prisma.usersOrderByWithRelationInput;
};
export type referee_assignment_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.referee_assignment_eventsWhereInput | Prisma.referee_assignment_eventsWhereInput[];
    OR?: Prisma.referee_assignment_eventsWhereInput[];
    NOT?: Prisma.referee_assignment_eventsWhereInput | Prisma.referee_assignment_eventsWhereInput[];
    match_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"referee_assignment_events"> | string;
    previous_status?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    new_status?: Prisma.StringFilter<"referee_assignment_events"> | string;
    reason?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"referee_assignment_events"> | Date | string;
    assignment?: Prisma.XOR<Prisma.Match_refereesScalarRelationFilter, Prisma.match_refereesWhereInput>;
    match?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type referee_assignment_eventsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    previous_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    new_status?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.referee_assignment_eventsCountOrderByAggregateInput;
    _avg?: Prisma.referee_assignment_eventsAvgOrderByAggregateInput;
    _max?: Prisma.referee_assignment_eventsMaxOrderByAggregateInput;
    _min?: Prisma.referee_assignment_eventsMinOrderByAggregateInput;
    _sum?: Prisma.referee_assignment_eventsSumOrderByAggregateInput;
};
export type referee_assignment_eventsScalarWhereWithAggregatesInput = {
    AND?: Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput | Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput[];
    OR?: Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput | Prisma.referee_assignment_eventsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"referee_assignment_events"> | bigint | number;
    match_id?: Prisma.BigIntWithAggregatesFilter<"referee_assignment_events"> | bigint | number;
    referee_id?: Prisma.BigIntWithAggregatesFilter<"referee_assignment_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntWithAggregatesFilter<"referee_assignment_events"> | bigint | number;
    event_type?: Prisma.StringWithAggregatesFilter<"referee_assignment_events"> | string;
    previous_status?: Prisma.StringNullableWithAggregatesFilter<"referee_assignment_events"> | string | null;
    new_status?: Prisma.StringWithAggregatesFilter<"referee_assignment_events"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"referee_assignment_events"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"referee_assignment_events"> | Date | string;
};
export type referee_assignment_eventsCreateInput = {
    id?: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
    assignment: Prisma.match_refereesCreateNestedOneWithoutReferee_assignment_eventsInput;
    match: Prisma.matchesCreateNestedOneWithoutReferee_assignment_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutReferee_assignment_eventsInput;
};
export type referee_assignment_eventsUncheckedCreateInput = {
    id?: bigint | number;
    match_id: bigint | number;
    referee_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignment?: Prisma.match_refereesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
    match?: Prisma.matchesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
};
export type referee_assignment_eventsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsCreateManyInput = {
    id?: bigint | number;
    match_id: bigint | number;
    referee_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Referee_assignment_eventsListRelationFilter = {
    every?: Prisma.referee_assignment_eventsWhereInput;
    some?: Prisma.referee_assignment_eventsWhereInput;
    none?: Prisma.referee_assignment_eventsWhereInput;
};
export type referee_assignment_eventsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type referee_assignment_eventsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    previous_status?: Prisma.SortOrder;
    new_status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type referee_assignment_eventsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type referee_assignment_eventsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    previous_status?: Prisma.SortOrder;
    new_status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type referee_assignment_eventsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    previous_status?: Prisma.SortOrder;
    new_status?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type referee_assignment_eventsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type referee_assignment_eventsCreateNestedManyWithoutAssignmentInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput> | Prisma.referee_assignment_eventsCreateWithoutAssignmentInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyAssignmentInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput> | Prisma.referee_assignment_eventsCreateWithoutAssignmentInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyAssignmentInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput> | Prisma.referee_assignment_eventsCreateWithoutAssignmentInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutAssignmentInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutAssignmentInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyAssignmentInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutAssignmentInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutAssignmentInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutAssignmentInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutAssignmentInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput> | Prisma.referee_assignment_eventsCreateWithoutAssignmentInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutAssignmentInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutAssignmentInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutAssignmentInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyAssignmentInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutAssignmentInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutAssignmentInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutAssignmentInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutAssignmentInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsCreateNestedManyWithoutMatchInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput> | Prisma.referee_assignment_eventsCreateWithoutMatchInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyMatchInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUncheckedCreateNestedManyWithoutMatchInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput> | Prisma.referee_assignment_eventsCreateWithoutMatchInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyMatchInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUpdateManyWithoutMatchNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput> | Prisma.referee_assignment_eventsCreateWithoutMatchInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutMatchInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutMatchInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyMatchInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutMatchInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutMatchInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutMatchInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutMatchInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput> | Prisma.referee_assignment_eventsCreateWithoutMatchInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutMatchInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutMatchInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutMatchInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyMatchInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutMatchInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutMatchInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutMatchInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutMatchInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput> | Prisma.referee_assignment_eventsCreateWithoutActorInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput> | Prisma.referee_assignment_eventsCreateWithoutActorInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
};
export type referee_assignment_eventsUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput> | Prisma.referee_assignment_eventsCreateWithoutActorInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyActorInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutActorInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput> | Prisma.referee_assignment_eventsCreateWithoutActorInput[] | Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput | Prisma.referee_assignment_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.referee_assignment_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.referee_assignment_eventsCreateManyActorInputEnvelope;
    set?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    disconnect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    delete?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    connect?: Prisma.referee_assignment_eventsWhereUniqueInput | Prisma.referee_assignment_eventsWhereUniqueInput[];
    update?: Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.referee_assignment_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutActorInput | Prisma.referee_assignment_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
};
export type referee_assignment_eventsCreateWithoutAssignmentInput = {
    id?: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
    match: Prisma.matchesCreateNestedOneWithoutReferee_assignment_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutReferee_assignment_eventsInput;
};
export type referee_assignment_eventsUncheckedCreateWithoutAssignmentInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsCreateOrConnectWithoutAssignmentInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput>;
};
export type referee_assignment_eventsCreateManyAssignmentInputEnvelope = {
    data: Prisma.referee_assignment_eventsCreateManyAssignmentInput | Prisma.referee_assignment_eventsCreateManyAssignmentInput[];
    skipDuplicates?: boolean;
};
export type referee_assignment_eventsUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutAssignmentInput>;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutAssignmentInput>;
};
export type referee_assignment_eventsUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutAssignmentInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutAssignmentInput>;
};
export type referee_assignment_eventsUpdateManyWithWhereWithoutAssignmentInput = {
    where: Prisma.referee_assignment_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateManyMutationInput, Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentInput>;
};
export type referee_assignment_eventsScalarWhereInput = {
    AND?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
    OR?: Prisma.referee_assignment_eventsScalarWhereInput[];
    NOT?: Prisma.referee_assignment_eventsScalarWhereInput | Prisma.referee_assignment_eventsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    match_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"referee_assignment_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"referee_assignment_events"> | string;
    previous_status?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    new_status?: Prisma.StringFilter<"referee_assignment_events"> | string;
    reason?: Prisma.StringNullableFilter<"referee_assignment_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"referee_assignment_events"> | Date | string;
};
export type referee_assignment_eventsCreateWithoutMatchInput = {
    id?: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
    assignment: Prisma.match_refereesCreateNestedOneWithoutReferee_assignment_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutReferee_assignment_eventsInput;
};
export type referee_assignment_eventsUncheckedCreateWithoutMatchInput = {
    id?: bigint | number;
    referee_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsCreateOrConnectWithoutMatchInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput>;
};
export type referee_assignment_eventsCreateManyMatchInputEnvelope = {
    data: Prisma.referee_assignment_eventsCreateManyMatchInput | Prisma.referee_assignment_eventsCreateManyMatchInput[];
    skipDuplicates?: boolean;
};
export type referee_assignment_eventsUpsertWithWhereUniqueWithoutMatchInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutMatchInput>;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutMatchInput>;
};
export type referee_assignment_eventsUpdateWithWhereUniqueWithoutMatchInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutMatchInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutMatchInput>;
};
export type referee_assignment_eventsUpdateManyWithWhereWithoutMatchInput = {
    where: Prisma.referee_assignment_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateManyMutationInput, Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutMatchInput>;
};
export type referee_assignment_eventsCreateWithoutActorInput = {
    id?: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
    assignment: Prisma.match_refereesCreateNestedOneWithoutReferee_assignment_eventsInput;
    match: Prisma.matchesCreateNestedOneWithoutReferee_assignment_eventsInput;
};
export type referee_assignment_eventsUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    match_id: bigint | number;
    referee_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsCreateOrConnectWithoutActorInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput>;
};
export type referee_assignment_eventsCreateManyActorInputEnvelope = {
    data: Prisma.referee_assignment_eventsCreateManyActorInput | Prisma.referee_assignment_eventsCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type referee_assignment_eventsUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedCreateWithoutActorInput>;
};
export type referee_assignment_eventsUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateWithoutActorInput, Prisma.referee_assignment_eventsUncheckedUpdateWithoutActorInput>;
};
export type referee_assignment_eventsUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.referee_assignment_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateManyMutationInput, Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutActorInput>;
};
export type referee_assignment_eventsCreateManyAssignmentInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsUpdateWithoutAssignmentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match?: Prisma.matchesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
};
export type referee_assignment_eventsUncheckedUpdateWithoutAssignmentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsCreateManyMatchInput = {
    id?: bigint | number;
    referee_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsUpdateWithoutMatchInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignment?: Prisma.match_refereesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
};
export type referee_assignment_eventsUncheckedUpdateWithoutMatchInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutMatchInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsCreateManyActorInput = {
    id?: bigint | number;
    match_id: bigint | number;
    referee_id: bigint | number;
    event_type: string;
    previous_status?: string | null;
    new_status: string;
    reason?: string | null;
    created_at?: Date | string;
};
export type referee_assignment_eventsUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignment?: Prisma.match_refereesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
    match?: Prisma.matchesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput;
};
export type referee_assignment_eventsUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    previous_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    new_status?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_assignment_eventsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    referee_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    previous_status?: boolean;
    new_status?: boolean;
    reason?: boolean;
    created_at?: boolean;
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_assignment_events"]>;
export type referee_assignment_eventsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    referee_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    previous_status?: boolean;
    new_status?: boolean;
    reason?: boolean;
    created_at?: boolean;
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_assignment_events"]>;
export type referee_assignment_eventsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    referee_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    previous_status?: boolean;
    new_status?: boolean;
    reason?: boolean;
    created_at?: boolean;
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_assignment_events"]>;
export type referee_assignment_eventsSelectScalar = {
    id?: boolean;
    match_id?: boolean;
    referee_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    previous_status?: boolean;
    new_status?: boolean;
    reason?: boolean;
    created_at?: boolean;
};
export type referee_assignment_eventsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "match_id" | "referee_id" | "actor_user_id" | "event_type" | "previous_status" | "new_status" | "reason" | "created_at", ExtArgs["result"]["referee_assignment_events"]>;
export type referee_assignment_eventsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type referee_assignment_eventsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type referee_assignment_eventsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignment?: boolean | Prisma.match_refereesDefaultArgs<ExtArgs>;
    match?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $referee_assignment_eventsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "referee_assignment_events";
    objects: {
        assignment: Prisma.$match_refereesPayload<ExtArgs>;
        match: Prisma.$matchesPayload<ExtArgs>;
        actor: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        match_id: bigint;
        referee_id: bigint;
        actor_user_id: bigint;
        event_type: string;
        previous_status: string | null;
        new_status: string;
        reason: string | null;
        created_at: Date;
    }, ExtArgs["result"]["referee_assignment_events"]>;
    composites: {};
};
export type referee_assignment_eventsGetPayload<S extends boolean | null | undefined | referee_assignment_eventsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload, S>;
export type referee_assignment_eventsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<referee_assignment_eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Referee_assignment_eventsCountAggregateInputType | true;
};
export interface referee_assignment_eventsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['referee_assignment_events'];
        meta: {
            name: 'referee_assignment_events';
        };
    };
    findUnique<T extends referee_assignment_eventsFindUniqueArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends referee_assignment_eventsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends referee_assignment_eventsFindFirstArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsFindFirstArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends referee_assignment_eventsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends referee_assignment_eventsFindManyArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends referee_assignment_eventsCreateArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsCreateArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends referee_assignment_eventsCreateManyArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends referee_assignment_eventsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends referee_assignment_eventsDeleteArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsDeleteArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends referee_assignment_eventsUpdateArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsUpdateArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends referee_assignment_eventsDeleteManyArgs>(args?: Prisma.SelectSubset<T, referee_assignment_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends referee_assignment_eventsUpdateManyArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends referee_assignment_eventsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends referee_assignment_eventsUpsertArgs>(args: Prisma.SelectSubset<T, referee_assignment_eventsUpsertArgs<ExtArgs>>): Prisma.Prisma__referee_assignment_eventsClient<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends referee_assignment_eventsCountArgs>(args?: Prisma.Subset<T, referee_assignment_eventsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Referee_assignment_eventsCountAggregateOutputType> : number>;
    aggregate<T extends Referee_assignment_eventsAggregateArgs>(args: Prisma.Subset<T, Referee_assignment_eventsAggregateArgs>): Prisma.PrismaPromise<GetReferee_assignment_eventsAggregateType<T>>;
    groupBy<T extends referee_assignment_eventsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: referee_assignment_eventsGroupByArgs['orderBy'];
    } : {
        orderBy?: referee_assignment_eventsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, referee_assignment_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferee_assignment_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: referee_assignment_eventsFieldRefs;
}
export interface Prisma__referee_assignment_eventsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assignment<T extends Prisma.match_refereesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.match_refereesDefaultArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    match<T extends Prisma.matchesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.matchesDefaultArgs<ExtArgs>>): Prisma.Prisma__matchesClient<runtime.Types.Result.GetResult<Prisma.$matchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface referee_assignment_eventsFieldRefs {
    readonly id: Prisma.FieldRef<"referee_assignment_events", 'BigInt'>;
    readonly match_id: Prisma.FieldRef<"referee_assignment_events", 'BigInt'>;
    readonly referee_id: Prisma.FieldRef<"referee_assignment_events", 'BigInt'>;
    readonly actor_user_id: Prisma.FieldRef<"referee_assignment_events", 'BigInt'>;
    readonly event_type: Prisma.FieldRef<"referee_assignment_events", 'String'>;
    readonly previous_status: Prisma.FieldRef<"referee_assignment_events", 'String'>;
    readonly new_status: Prisma.FieldRef<"referee_assignment_events", 'String'>;
    readonly reason: Prisma.FieldRef<"referee_assignment_events", 'String'>;
    readonly created_at: Prisma.FieldRef<"referee_assignment_events", 'DateTime'>;
}
export type referee_assignment_eventsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
};
export type referee_assignment_eventsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
};
export type referee_assignment_eventsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where?: Prisma.referee_assignment_eventsWhereInput;
    orderBy?: Prisma.referee_assignment_eventsOrderByWithRelationInput | Prisma.referee_assignment_eventsOrderByWithRelationInput[];
    cursor?: Prisma.referee_assignment_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_assignment_eventsScalarFieldEnum | Prisma.Referee_assignment_eventsScalarFieldEnum[];
};
export type referee_assignment_eventsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where?: Prisma.referee_assignment_eventsWhereInput;
    orderBy?: Prisma.referee_assignment_eventsOrderByWithRelationInput | Prisma.referee_assignment_eventsOrderByWithRelationInput[];
    cursor?: Prisma.referee_assignment_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_assignment_eventsScalarFieldEnum | Prisma.Referee_assignment_eventsScalarFieldEnum[];
};
export type referee_assignment_eventsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where?: Prisma.referee_assignment_eventsWhereInput;
    orderBy?: Prisma.referee_assignment_eventsOrderByWithRelationInput | Prisma.referee_assignment_eventsOrderByWithRelationInput[];
    cursor?: Prisma.referee_assignment_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_assignment_eventsScalarFieldEnum | Prisma.Referee_assignment_eventsScalarFieldEnum[];
};
export type referee_assignment_eventsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_assignment_eventsCreateInput, Prisma.referee_assignment_eventsUncheckedCreateInput>;
};
export type referee_assignment_eventsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.referee_assignment_eventsCreateManyInput | Prisma.referee_assignment_eventsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type referee_assignment_eventsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    data: Prisma.referee_assignment_eventsCreateManyInput | Prisma.referee_assignment_eventsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.referee_assignment_eventsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type referee_assignment_eventsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateInput, Prisma.referee_assignment_eventsUncheckedUpdateInput>;
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
};
export type referee_assignment_eventsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateManyMutationInput, Prisma.referee_assignment_eventsUncheckedUpdateManyInput>;
    where?: Prisma.referee_assignment_eventsWhereInput;
    limit?: number;
};
export type referee_assignment_eventsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_assignment_eventsUpdateManyMutationInput, Prisma.referee_assignment_eventsUncheckedUpdateManyInput>;
    where?: Prisma.referee_assignment_eventsWhereInput;
    limit?: number;
    include?: Prisma.referee_assignment_eventsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type referee_assignment_eventsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_assignment_eventsCreateInput, Prisma.referee_assignment_eventsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.referee_assignment_eventsUpdateInput, Prisma.referee_assignment_eventsUncheckedUpdateInput>;
};
export type referee_assignment_eventsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
    where: Prisma.referee_assignment_eventsWhereUniqueInput;
};
export type referee_assignment_eventsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_assignment_eventsWhereInput;
    limit?: number;
};
export type referee_assignment_eventsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_assignment_eventsSelect<ExtArgs> | null;
    omit?: Prisma.referee_assignment_eventsOmit<ExtArgs> | null;
    include?: Prisma.referee_assignment_eventsInclude<ExtArgs> | null;
};
