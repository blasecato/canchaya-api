import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type match_refereesModel = runtime.Types.Result.DefaultSelection<Prisma.$match_refereesPayload>;
export type AggregateMatch_referees = {
    _count: Match_refereesCountAggregateOutputType | null;
    _avg: Match_refereesAvgAggregateOutputType | null;
    _sum: Match_refereesSumAggregateOutputType | null;
    _min: Match_refereesMinAggregateOutputType | null;
    _max: Match_refereesMaxAggregateOutputType | null;
};
export type Match_refereesAvgAggregateOutputType = {
    match_id: number | null;
    tournament_id: number | null;
    referee_id: number | null;
    assigned_by: number | null;
    replaced_referee_id: number | null;
};
export type Match_refereesSumAggregateOutputType = {
    match_id: bigint | null;
    tournament_id: bigint | null;
    referee_id: bigint | null;
    assigned_by: bigint | null;
    replaced_referee_id: bigint | null;
};
export type Match_refereesMinAggregateOutputType = {
    match_id: bigint | null;
    tournament_id: bigint | null;
    referee_id: bigint | null;
    referee_role: string | null;
    assignment_status: string | null;
    assigned_by: bigint | null;
    responded_at: Date | null;
    response_notes: string | null;
    replaced_referee_id: bigint | null;
    replacement_reason: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Match_refereesMaxAggregateOutputType = {
    match_id: bigint | null;
    tournament_id: bigint | null;
    referee_id: bigint | null;
    referee_role: string | null;
    assignment_status: string | null;
    assigned_by: bigint | null;
    responded_at: Date | null;
    response_notes: string | null;
    replaced_referee_id: bigint | null;
    replacement_reason: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Match_refereesCountAggregateOutputType = {
    match_id: number;
    tournament_id: number;
    referee_id: number;
    referee_role: number;
    assignment_status: number;
    assigned_by: number;
    responded_at: number;
    response_notes: number;
    replaced_referee_id: number;
    replacement_reason: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Match_refereesAvgAggregateInputType = {
    match_id?: true;
    tournament_id?: true;
    referee_id?: true;
    assigned_by?: true;
    replaced_referee_id?: true;
};
export type Match_refereesSumAggregateInputType = {
    match_id?: true;
    tournament_id?: true;
    referee_id?: true;
    assigned_by?: true;
    replaced_referee_id?: true;
};
export type Match_refereesMinAggregateInputType = {
    match_id?: true;
    tournament_id?: true;
    referee_id?: true;
    referee_role?: true;
    assignment_status?: true;
    assigned_by?: true;
    responded_at?: true;
    response_notes?: true;
    replaced_referee_id?: true;
    replacement_reason?: true;
    created_at?: true;
    updated_at?: true;
};
export type Match_refereesMaxAggregateInputType = {
    match_id?: true;
    tournament_id?: true;
    referee_id?: true;
    referee_role?: true;
    assignment_status?: true;
    assigned_by?: true;
    responded_at?: true;
    response_notes?: true;
    replaced_referee_id?: true;
    replacement_reason?: true;
    created_at?: true;
    updated_at?: true;
};
export type Match_refereesCountAggregateInputType = {
    match_id?: true;
    tournament_id?: true;
    referee_id?: true;
    referee_role?: true;
    assignment_status?: true;
    assigned_by?: true;
    responded_at?: true;
    response_notes?: true;
    replaced_referee_id?: true;
    replacement_reason?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Match_refereesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithRelationInput | Prisma.match_refereesOrderByWithRelationInput[];
    cursor?: Prisma.match_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Match_refereesCountAggregateInputType;
    _avg?: Match_refereesAvgAggregateInputType;
    _sum?: Match_refereesSumAggregateInputType;
    _min?: Match_refereesMinAggregateInputType;
    _max?: Match_refereesMaxAggregateInputType;
};
export type GetMatch_refereesAggregateType<T extends Match_refereesAggregateArgs> = {
    [P in keyof T & keyof AggregateMatch_referees]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMatch_referees[P]> : Prisma.GetScalarType<T[P], AggregateMatch_referees[P]>;
};
export type match_refereesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithAggregationInput | Prisma.match_refereesOrderByWithAggregationInput[];
    by: Prisma.Match_refereesScalarFieldEnum[] | Prisma.Match_refereesScalarFieldEnum;
    having?: Prisma.match_refereesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Match_refereesCountAggregateInputType | true;
    _avg?: Match_refereesAvgAggregateInputType;
    _sum?: Match_refereesSumAggregateInputType;
    _min?: Match_refereesMinAggregateInputType;
    _max?: Match_refereesMaxAggregateInputType;
};
export type Match_refereesGroupByOutputType = {
    match_id: bigint;
    tournament_id: bigint;
    referee_id: bigint;
    referee_role: string;
    assignment_status: string;
    assigned_by: bigint | null;
    responded_at: Date | null;
    response_notes: string | null;
    replaced_referee_id: bigint | null;
    replacement_reason: string | null;
    created_at: Date;
    updated_at: Date;
    _count: Match_refereesCountAggregateOutputType | null;
    _avg: Match_refereesAvgAggregateOutputType | null;
    _sum: Match_refereesSumAggregateOutputType | null;
    _min: Match_refereesMinAggregateOutputType | null;
    _max: Match_refereesMaxAggregateOutputType | null;
};
export type GetMatch_refereesGroupByPayload<T extends match_refereesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Match_refereesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Match_refereesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Match_refereesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Match_refereesGroupByOutputType[P]>;
}>>;
export type match_refereesWhereInput = {
    AND?: Prisma.match_refereesWhereInput | Prisma.match_refereesWhereInput[];
    OR?: Prisma.match_refereesWhereInput[];
    NOT?: Prisma.match_refereesWhereInput | Prisma.match_refereesWhereInput[];
    match_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_role?: Prisma.StringFilter<"match_referees"> | string;
    assignment_status?: Prisma.StringFilter<"match_referees"> | string;
    assigned_by?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    responded_at?: Prisma.DateTimeNullableFilter<"match_referees"> | Date | string | null;
    response_notes?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    replaced_referee_id?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    replacement_reason?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    created_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
    matches?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    tournament_referees?: Prisma.XOR<Prisma.Tournament_refereesScalarRelationFilter, Prisma.tournament_refereesWhereInput>;
    assigned_by_user?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    replaced_referee?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    referee_assignment_events?: Prisma.Referee_assignment_eventsListRelationFilter;
};
export type match_refereesOrderByWithRelationInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    referee_role?: Prisma.SortOrder;
    assignment_status?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    responded_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    response_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    replacement_reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    matches?: Prisma.matchesOrderByWithRelationInput;
    tournament_referees?: Prisma.tournament_refereesOrderByWithRelationInput;
    assigned_by_user?: Prisma.usersOrderByWithRelationInput;
    replaced_referee?: Prisma.usersOrderByWithRelationInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsOrderByRelationAggregateInput;
};
export type match_refereesWhereUniqueInput = Prisma.AtLeast<{
    match_id?: bigint | number;
    match_id_referee_id?: Prisma.match_refereesMatch_idReferee_idCompoundUniqueInput;
    AND?: Prisma.match_refereesWhereInput | Prisma.match_refereesWhereInput[];
    OR?: Prisma.match_refereesWhereInput[];
    NOT?: Prisma.match_refereesWhereInput | Prisma.match_refereesWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_role?: Prisma.StringFilter<"match_referees"> | string;
    assignment_status?: Prisma.StringFilter<"match_referees"> | string;
    assigned_by?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    responded_at?: Prisma.DateTimeNullableFilter<"match_referees"> | Date | string | null;
    response_notes?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    replaced_referee_id?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    replacement_reason?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    created_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
    matches?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    tournament_referees?: Prisma.XOR<Prisma.Tournament_refereesScalarRelationFilter, Prisma.tournament_refereesWhereInput>;
    assigned_by_user?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    replaced_referee?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    referee_assignment_events?: Prisma.Referee_assignment_eventsListRelationFilter;
}, "match_id_referee_id" | "match_id">;
export type match_refereesOrderByWithAggregationInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    referee_role?: Prisma.SortOrder;
    assignment_status?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    responded_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    response_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    replacement_reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.match_refereesCountOrderByAggregateInput;
    _avg?: Prisma.match_refereesAvgOrderByAggregateInput;
    _max?: Prisma.match_refereesMaxOrderByAggregateInput;
    _min?: Prisma.match_refereesMinOrderByAggregateInput;
    _sum?: Prisma.match_refereesSumOrderByAggregateInput;
};
export type match_refereesScalarWhereWithAggregatesInput = {
    AND?: Prisma.match_refereesScalarWhereWithAggregatesInput | Prisma.match_refereesScalarWhereWithAggregatesInput[];
    OR?: Prisma.match_refereesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.match_refereesScalarWhereWithAggregatesInput | Prisma.match_refereesScalarWhereWithAggregatesInput[];
    match_id?: Prisma.BigIntWithAggregatesFilter<"match_referees"> | bigint | number;
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"match_referees"> | bigint | number;
    referee_id?: Prisma.BigIntWithAggregatesFilter<"match_referees"> | bigint | number;
    referee_role?: Prisma.StringWithAggregatesFilter<"match_referees"> | string;
    assignment_status?: Prisma.StringWithAggregatesFilter<"match_referees"> | string;
    assigned_by?: Prisma.BigIntNullableWithAggregatesFilter<"match_referees"> | bigint | number | null;
    responded_at?: Prisma.DateTimeNullableWithAggregatesFilter<"match_referees"> | Date | string | null;
    response_notes?: Prisma.StringNullableWithAggregatesFilter<"match_referees"> | string | null;
    replaced_referee_id?: Prisma.BigIntNullableWithAggregatesFilter<"match_referees"> | bigint | number | null;
    replacement_reason?: Prisma.StringNullableWithAggregatesFilter<"match_referees"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"match_referees"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"match_referees"> | Date | string;
};
export type match_refereesCreateInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutMatch_refereesInput;
    tournament_referees: Prisma.tournament_refereesCreateNestedOneWithoutMatch_refereesInput;
    assigned_by_user?: Prisma.usersCreateNestedOneWithoutMatch_referees_assigned_byInput;
    replaced_referee?: Prisma.usersCreateNestedOneWithoutMatch_referees_replaced_refereeInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUncheckedCreateInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUpdateInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    tournament_referees?: Prisma.tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    assigned_by_user?: Prisma.usersUpdateOneWithoutMatch_referees_assigned_byNestedInput;
    replaced_referee?: Prisma.usersUpdateOneWithoutMatch_referees_replaced_refereeNestedInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesCreateManyInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesUpdateManyMutationInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesUncheckedUpdateManyInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesMatch_idReferee_idCompoundUniqueInput = {
    match_id: bigint | number;
    referee_id: bigint | number;
};
export type match_refereesCountOrderByAggregateInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    referee_role?: Prisma.SortOrder;
    assignment_status?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrder;
    responded_at?: Prisma.SortOrder;
    response_notes?: Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrder;
    replacement_reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type match_refereesAvgOrderByAggregateInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrder;
};
export type match_refereesMaxOrderByAggregateInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    referee_role?: Prisma.SortOrder;
    assignment_status?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrder;
    responded_at?: Prisma.SortOrder;
    response_notes?: Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrder;
    replacement_reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type match_refereesMinOrderByAggregateInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    referee_role?: Prisma.SortOrder;
    assignment_status?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrder;
    responded_at?: Prisma.SortOrder;
    response_notes?: Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrder;
    replacement_reason?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type match_refereesSumOrderByAggregateInput = {
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    assigned_by?: Prisma.SortOrder;
    replaced_referee_id?: Prisma.SortOrder;
};
export type Match_refereesListRelationFilter = {
    every?: Prisma.match_refereesWhereInput;
    some?: Prisma.match_refereesWhereInput;
    none?: Prisma.match_refereesWhereInput;
};
export type match_refereesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type Match_refereesScalarRelationFilter = {
    is?: Prisma.match_refereesWhereInput;
    isNot?: Prisma.match_refereesWhereInput;
};
export type match_refereesCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput> | Prisma.match_refereesCreateWithoutMatchesInput[] | Prisma.match_refereesUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutMatchesInput | Prisma.match_refereesCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.match_refereesCreateManyMatchesInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUncheckedCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput> | Prisma.match_refereesCreateWithoutMatchesInput[] | Prisma.match_refereesUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutMatchesInput | Prisma.match_refereesCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.match_refereesCreateManyMatchesInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput> | Prisma.match_refereesCreateWithoutMatchesInput[] | Prisma.match_refereesUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutMatchesInput | Prisma.match_refereesCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutMatchesInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.match_refereesCreateManyMatchesInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutMatchesInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutMatchesInput | Prisma.match_refereesUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesUncheckedUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput> | Prisma.match_refereesCreateWithoutMatchesInput[] | Prisma.match_refereesUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutMatchesInput | Prisma.match_refereesCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutMatchesInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.match_refereesCreateManyMatchesInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutMatchesInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutMatchesInput | Prisma.match_refereesUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesCreateNestedOneWithoutReferee_assignment_eventsInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedCreateWithoutReferee_assignment_eventsInput>;
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReferee_assignment_eventsInput;
    connect?: Prisma.match_refereesWhereUniqueInput;
};
export type match_refereesUpdateOneRequiredWithoutReferee_assignment_eventsNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedCreateWithoutReferee_assignment_eventsInput>;
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReferee_assignment_eventsInput;
    upsert?: Prisma.match_refereesUpsertWithoutReferee_assignment_eventsInput;
    connect?: Prisma.match_refereesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.match_refereesUpdateToOneWithWhereWithoutReferee_assignment_eventsInput, Prisma.match_refereesUpdateWithoutReferee_assignment_eventsInput>, Prisma.match_refereesUncheckedUpdateWithoutReferee_assignment_eventsInput>;
};
export type match_refereesCreateNestedManyWithoutTournament_refereesInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput> | Prisma.match_refereesCreateWithoutTournament_refereesInput[] | Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput | Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput[];
    createMany?: Prisma.match_refereesCreateManyTournament_refereesInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUncheckedCreateNestedManyWithoutTournament_refereesInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput> | Prisma.match_refereesCreateWithoutTournament_refereesInput[] | Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput | Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput[];
    createMany?: Prisma.match_refereesCreateManyTournament_refereesInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUpdateManyWithoutTournament_refereesNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput> | Prisma.match_refereesCreateWithoutTournament_refereesInput[] | Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput | Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutTournament_refereesInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutTournament_refereesInput[];
    createMany?: Prisma.match_refereesCreateManyTournament_refereesInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutTournament_refereesInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutTournament_refereesInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutTournament_refereesInput | Prisma.match_refereesUpdateManyWithWhereWithoutTournament_refereesInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesUncheckedUpdateManyWithoutTournament_refereesNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput> | Prisma.match_refereesCreateWithoutTournament_refereesInput[] | Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput | Prisma.match_refereesCreateOrConnectWithoutTournament_refereesInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutTournament_refereesInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutTournament_refereesInput[];
    createMany?: Prisma.match_refereesCreateManyTournament_refereesInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutTournament_refereesInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutTournament_refereesInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutTournament_refereesInput | Prisma.match_refereesUpdateManyWithWhereWithoutTournament_refereesInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesCreateNestedManyWithoutAssigned_by_userInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput> | Prisma.match_refereesCreateWithoutAssigned_by_userInput[] | Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput | Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput[];
    createMany?: Prisma.match_refereesCreateManyAssigned_by_userInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesCreateNestedManyWithoutReplaced_refereeInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput> | Prisma.match_refereesCreateWithoutReplaced_refereeInput[] | Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput | Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput[];
    createMany?: Prisma.match_refereesCreateManyReplaced_refereeInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUncheckedCreateNestedManyWithoutAssigned_by_userInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput> | Prisma.match_refereesCreateWithoutAssigned_by_userInput[] | Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput | Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput[];
    createMany?: Prisma.match_refereesCreateManyAssigned_by_userInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUncheckedCreateNestedManyWithoutReplaced_refereeInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput> | Prisma.match_refereesCreateWithoutReplaced_refereeInput[] | Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput | Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput[];
    createMany?: Prisma.match_refereesCreateManyReplaced_refereeInputEnvelope;
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
};
export type match_refereesUpdateManyWithoutAssigned_by_userNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput> | Prisma.match_refereesCreateWithoutAssigned_by_userInput[] | Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput | Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutAssigned_by_userInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutAssigned_by_userInput[];
    createMany?: Prisma.match_refereesCreateManyAssigned_by_userInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutAssigned_by_userInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutAssigned_by_userInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutAssigned_by_userInput | Prisma.match_refereesUpdateManyWithWhereWithoutAssigned_by_userInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesUpdateManyWithoutReplaced_refereeNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput> | Prisma.match_refereesCreateWithoutReplaced_refereeInput[] | Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput | Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutReplaced_refereeInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutReplaced_refereeInput[];
    createMany?: Prisma.match_refereesCreateManyReplaced_refereeInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutReplaced_refereeInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutReplaced_refereeInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutReplaced_refereeInput | Prisma.match_refereesUpdateManyWithWhereWithoutReplaced_refereeInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesUncheckedUpdateManyWithoutAssigned_by_userNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput> | Prisma.match_refereesCreateWithoutAssigned_by_userInput[] | Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput | Prisma.match_refereesCreateOrConnectWithoutAssigned_by_userInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutAssigned_by_userInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutAssigned_by_userInput[];
    createMany?: Prisma.match_refereesCreateManyAssigned_by_userInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutAssigned_by_userInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutAssigned_by_userInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutAssigned_by_userInput | Prisma.match_refereesUpdateManyWithWhereWithoutAssigned_by_userInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesUncheckedUpdateManyWithoutReplaced_refereeNestedInput = {
    create?: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput> | Prisma.match_refereesCreateWithoutReplaced_refereeInput[] | Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput[];
    connectOrCreate?: Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput | Prisma.match_refereesCreateOrConnectWithoutReplaced_refereeInput[];
    upsert?: Prisma.match_refereesUpsertWithWhereUniqueWithoutReplaced_refereeInput | Prisma.match_refereesUpsertWithWhereUniqueWithoutReplaced_refereeInput[];
    createMany?: Prisma.match_refereesCreateManyReplaced_refereeInputEnvelope;
    set?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    disconnect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    delete?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    connect?: Prisma.match_refereesWhereUniqueInput | Prisma.match_refereesWhereUniqueInput[];
    update?: Prisma.match_refereesUpdateWithWhereUniqueWithoutReplaced_refereeInput | Prisma.match_refereesUpdateWithWhereUniqueWithoutReplaced_refereeInput[];
    updateMany?: Prisma.match_refereesUpdateManyWithWhereWithoutReplaced_refereeInput | Prisma.match_refereesUpdateManyWithWhereWithoutReplaced_refereeInput[];
    deleteMany?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
};
export type match_refereesCreateWithoutMatchesInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournament_referees: Prisma.tournament_refereesCreateNestedOneWithoutMatch_refereesInput;
    assigned_by_user?: Prisma.usersCreateNestedOneWithoutMatch_referees_assigned_byInput;
    replaced_referee?: Prisma.usersCreateNestedOneWithoutMatch_referees_replaced_refereeInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUncheckedCreateWithoutMatchesInput = {
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesCreateOrConnectWithoutMatchesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput>;
};
export type match_refereesCreateManyMatchesInputEnvelope = {
    data: Prisma.match_refereesCreateManyMatchesInput | Prisma.match_refereesCreateManyMatchesInput[];
    skipDuplicates?: boolean;
};
export type match_refereesUpsertWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.match_refereesUpdateWithoutMatchesInput, Prisma.match_refereesUncheckedUpdateWithoutMatchesInput>;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutMatchesInput, Prisma.match_refereesUncheckedCreateWithoutMatchesInput>;
};
export type match_refereesUpdateWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateWithoutMatchesInput, Prisma.match_refereesUncheckedUpdateWithoutMatchesInput>;
};
export type match_refereesUpdateManyWithWhereWithoutMatchesInput = {
    where: Prisma.match_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyWithoutMatchesInput>;
};
export type match_refereesScalarWhereInput = {
    AND?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
    OR?: Prisma.match_refereesScalarWhereInput[];
    NOT?: Prisma.match_refereesScalarWhereInput | Prisma.match_refereesScalarWhereInput[];
    match_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"match_referees"> | bigint | number;
    referee_role?: Prisma.StringFilter<"match_referees"> | string;
    assignment_status?: Prisma.StringFilter<"match_referees"> | string;
    assigned_by?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    responded_at?: Prisma.DateTimeNullableFilter<"match_referees"> | Date | string | null;
    response_notes?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    replaced_referee_id?: Prisma.BigIntNullableFilter<"match_referees"> | bigint | number | null;
    replacement_reason?: Prisma.StringNullableFilter<"match_referees"> | string | null;
    created_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"match_referees"> | Date | string;
};
export type match_refereesCreateWithoutReferee_assignment_eventsInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutMatch_refereesInput;
    tournament_referees: Prisma.tournament_refereesCreateNestedOneWithoutMatch_refereesInput;
    assigned_by_user?: Prisma.usersCreateNestedOneWithoutMatch_referees_assigned_byInput;
    replaced_referee?: Prisma.usersCreateNestedOneWithoutMatch_referees_replaced_refereeInput;
};
export type match_refereesUncheckedCreateWithoutReferee_assignment_eventsInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesCreateOrConnectWithoutReferee_assignment_eventsInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedCreateWithoutReferee_assignment_eventsInput>;
};
export type match_refereesUpsertWithoutReferee_assignment_eventsInput = {
    update: Prisma.XOR<Prisma.match_refereesUpdateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedUpdateWithoutReferee_assignment_eventsInput>;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedCreateWithoutReferee_assignment_eventsInput>;
    where?: Prisma.match_refereesWhereInput;
};
export type match_refereesUpdateToOneWithWhereWithoutReferee_assignment_eventsInput = {
    where?: Prisma.match_refereesWhereInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateWithoutReferee_assignment_eventsInput, Prisma.match_refereesUncheckedUpdateWithoutReferee_assignment_eventsInput>;
};
export type match_refereesUpdateWithoutReferee_assignment_eventsInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    tournament_referees?: Prisma.tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    assigned_by_user?: Prisma.usersUpdateOneWithoutMatch_referees_assigned_byNestedInput;
    replaced_referee?: Prisma.usersUpdateOneWithoutMatch_referees_replaced_refereeNestedInput;
};
export type match_refereesUncheckedUpdateWithoutReferee_assignment_eventsInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesCreateWithoutTournament_refereesInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutMatch_refereesInput;
    assigned_by_user?: Prisma.usersCreateNestedOneWithoutMatch_referees_assigned_byInput;
    replaced_referee?: Prisma.usersCreateNestedOneWithoutMatch_referees_replaced_refereeInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUncheckedCreateWithoutTournament_refereesInput = {
    match_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesCreateOrConnectWithoutTournament_refereesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput>;
};
export type match_refereesCreateManyTournament_refereesInputEnvelope = {
    data: Prisma.match_refereesCreateManyTournament_refereesInput | Prisma.match_refereesCreateManyTournament_refereesInput[];
    skipDuplicates?: boolean;
};
export type match_refereesUpsertWithWhereUniqueWithoutTournament_refereesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.match_refereesUpdateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedUpdateWithoutTournament_refereesInput>;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedCreateWithoutTournament_refereesInput>;
};
export type match_refereesUpdateWithWhereUniqueWithoutTournament_refereesInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateWithoutTournament_refereesInput, Prisma.match_refereesUncheckedUpdateWithoutTournament_refereesInput>;
};
export type match_refereesUpdateManyWithWhereWithoutTournament_refereesInput = {
    where: Prisma.match_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyWithoutTournament_refereesInput>;
};
export type match_refereesCreateWithoutAssigned_by_userInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutMatch_refereesInput;
    tournament_referees: Prisma.tournament_refereesCreateNestedOneWithoutMatch_refereesInput;
    replaced_referee?: Prisma.usersCreateNestedOneWithoutMatch_referees_replaced_refereeInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUncheckedCreateWithoutAssigned_by_userInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesCreateOrConnectWithoutAssigned_by_userInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput>;
};
export type match_refereesCreateManyAssigned_by_userInputEnvelope = {
    data: Prisma.match_refereesCreateManyAssigned_by_userInput | Prisma.match_refereesCreateManyAssigned_by_userInput[];
    skipDuplicates?: boolean;
};
export type match_refereesCreateWithoutReplaced_refereeInput = {
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutMatch_refereesInput;
    tournament_referees: Prisma.tournament_refereesCreateNestedOneWithoutMatch_refereesInput;
    assigned_by_user?: Prisma.usersCreateNestedOneWithoutMatch_referees_assigned_byInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesUncheckedCreateWithoutReplaced_refereeInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedCreateNestedManyWithoutAssignmentInput;
};
export type match_refereesCreateOrConnectWithoutReplaced_refereeInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput>;
};
export type match_refereesCreateManyReplaced_refereeInputEnvelope = {
    data: Prisma.match_refereesCreateManyReplaced_refereeInput | Prisma.match_refereesCreateManyReplaced_refereeInput[];
    skipDuplicates?: boolean;
};
export type match_refereesUpsertWithWhereUniqueWithoutAssigned_by_userInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.match_refereesUpdateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedUpdateWithoutAssigned_by_userInput>;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedCreateWithoutAssigned_by_userInput>;
};
export type match_refereesUpdateWithWhereUniqueWithoutAssigned_by_userInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateWithoutAssigned_by_userInput, Prisma.match_refereesUncheckedUpdateWithoutAssigned_by_userInput>;
};
export type match_refereesUpdateManyWithWhereWithoutAssigned_by_userInput = {
    where: Prisma.match_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyWithoutAssigned_by_userInput>;
};
export type match_refereesUpsertWithWhereUniqueWithoutReplaced_refereeInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.match_refereesUpdateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedUpdateWithoutReplaced_refereeInput>;
    create: Prisma.XOR<Prisma.match_refereesCreateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedCreateWithoutReplaced_refereeInput>;
};
export type match_refereesUpdateWithWhereUniqueWithoutReplaced_refereeInput = {
    where: Prisma.match_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateWithoutReplaced_refereeInput, Prisma.match_refereesUncheckedUpdateWithoutReplaced_refereeInput>;
};
export type match_refereesUpdateManyWithWhereWithoutReplaced_refereeInput = {
    where: Prisma.match_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyWithoutReplaced_refereeInput>;
};
export type match_refereesCreateManyMatchesInput = {
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesUpdateWithoutMatchesInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_referees?: Prisma.tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    assigned_by_user?: Prisma.usersUpdateOneWithoutMatch_referees_assigned_byNestedInput;
    replaced_referee?: Prisma.usersUpdateOneWithoutMatch_referees_replaced_refereeNestedInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateWithoutMatchesInput = {
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateManyWithoutMatchesInput = {
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesCreateManyTournament_refereesInput = {
    match_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesUpdateWithoutTournament_refereesInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    assigned_by_user?: Prisma.usersUpdateOneWithoutMatch_referees_assigned_byNestedInput;
    replaced_referee?: Prisma.usersUpdateOneWithoutMatch_referees_replaced_refereeNestedInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateWithoutTournament_refereesInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateManyWithoutTournament_refereesInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesCreateManyAssigned_by_userInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replaced_referee_id?: bigint | number | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesCreateManyReplaced_refereeInput = {
    match_id: bigint | number;
    tournament_id: bigint | number;
    referee_id: bigint | number;
    referee_role?: string;
    assignment_status?: string;
    assigned_by?: bigint | number | null;
    responded_at?: Date | string | null;
    response_notes?: string | null;
    replacement_reason?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type match_refereesUpdateWithoutAssigned_by_userInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    tournament_referees?: Prisma.tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    replaced_referee?: Prisma.usersUpdateOneWithoutMatch_referees_replaced_refereeNestedInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateWithoutAssigned_by_userInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateManyWithoutAssigned_by_userInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replaced_referee_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type match_refereesUpdateWithoutReplaced_refereeInput = {
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    tournament_referees?: Prisma.tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput;
    assigned_by_user?: Prisma.usersUpdateOneWithoutMatch_referees_assigned_byNestedInput;
    referee_assignment_events?: Prisma.referee_assignment_eventsUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateWithoutReplaced_refereeInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee_assignment_events?: Prisma.referee_assignment_eventsUncheckedUpdateManyWithoutAssignmentNestedInput;
};
export type match_refereesUncheckedUpdateManyWithoutReplaced_refereeInput = {
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_role?: Prisma.StringFieldUpdateOperationsInput | string;
    assignment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    assigned_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    responded_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    response_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    replacement_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Match_refereesCountOutputType = {
    referee_assignment_events: number;
};
export type Match_refereesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    referee_assignment_events?: boolean | Match_refereesCountOutputTypeCountReferee_assignment_eventsArgs;
};
export type Match_refereesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Match_refereesCountOutputTypeSelect<ExtArgs> | null;
};
export type Match_refereesCountOutputTypeCountReferee_assignment_eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_assignment_eventsWhereInput;
};
export type match_refereesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    match_id?: boolean;
    tournament_id?: boolean;
    referee_id?: boolean;
    referee_role?: boolean;
    assignment_status?: boolean;
    assigned_by?: boolean;
    responded_at?: boolean;
    response_notes?: boolean;
    replaced_referee_id?: boolean;
    replacement_reason?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
    referee_assignment_events?: boolean | Prisma.match_referees$referee_assignment_eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.Match_refereesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["match_referees"]>;
export type match_refereesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    match_id?: boolean;
    tournament_id?: boolean;
    referee_id?: boolean;
    referee_role?: boolean;
    assignment_status?: boolean;
    assigned_by?: boolean;
    responded_at?: boolean;
    response_notes?: boolean;
    replaced_referee_id?: boolean;
    replacement_reason?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
}, ExtArgs["result"]["match_referees"]>;
export type match_refereesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    match_id?: boolean;
    tournament_id?: boolean;
    referee_id?: boolean;
    referee_role?: boolean;
    assignment_status?: boolean;
    assigned_by?: boolean;
    responded_at?: boolean;
    response_notes?: boolean;
    replaced_referee_id?: boolean;
    replacement_reason?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
}, ExtArgs["result"]["match_referees"]>;
export type match_refereesSelectScalar = {
    match_id?: boolean;
    tournament_id?: boolean;
    referee_id?: boolean;
    referee_role?: boolean;
    assignment_status?: boolean;
    assigned_by?: boolean;
    responded_at?: boolean;
    response_notes?: boolean;
    replaced_referee_id?: boolean;
    replacement_reason?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type match_refereesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"match_id" | "tournament_id" | "referee_id" | "referee_role" | "assignment_status" | "assigned_by" | "responded_at" | "response_notes" | "replaced_referee_id" | "replacement_reason" | "created_at" | "updated_at", ExtArgs["result"]["match_referees"]>;
export type match_refereesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
    referee_assignment_events?: boolean | Prisma.match_referees$referee_assignment_eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.Match_refereesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type match_refereesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
};
export type match_refereesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_referees?: boolean | Prisma.tournament_refereesDefaultArgs<ExtArgs>;
    assigned_by_user?: boolean | Prisma.match_referees$assigned_by_userArgs<ExtArgs>;
    replaced_referee?: boolean | Prisma.match_referees$replaced_refereeArgs<ExtArgs>;
};
export type $match_refereesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "match_referees";
    objects: {
        matches: Prisma.$matchesPayload<ExtArgs>;
        tournament_referees: Prisma.$tournament_refereesPayload<ExtArgs>;
        assigned_by_user: Prisma.$usersPayload<ExtArgs> | null;
        replaced_referee: Prisma.$usersPayload<ExtArgs> | null;
        referee_assignment_events: Prisma.$referee_assignment_eventsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        match_id: bigint;
        tournament_id: bigint;
        referee_id: bigint;
        referee_role: string;
        assignment_status: string;
        assigned_by: bigint | null;
        responded_at: Date | null;
        response_notes: string | null;
        replaced_referee_id: bigint | null;
        replacement_reason: string | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["match_referees"]>;
    composites: {};
};
export type match_refereesGetPayload<S extends boolean | null | undefined | match_refereesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$match_refereesPayload, S>;
export type match_refereesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<match_refereesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Match_refereesCountAggregateInputType | true;
};
export interface match_refereesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['match_referees'];
        meta: {
            name: 'match_referees';
        };
    };
    findUnique<T extends match_refereesFindUniqueArgs>(args: Prisma.SelectSubset<T, match_refereesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends match_refereesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, match_refereesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends match_refereesFindFirstArgs>(args?: Prisma.SelectSubset<T, match_refereesFindFirstArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends match_refereesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, match_refereesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends match_refereesFindManyArgs>(args?: Prisma.SelectSubset<T, match_refereesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends match_refereesCreateArgs>(args: Prisma.SelectSubset<T, match_refereesCreateArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends match_refereesCreateManyArgs>(args?: Prisma.SelectSubset<T, match_refereesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends match_refereesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, match_refereesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends match_refereesDeleteArgs>(args: Prisma.SelectSubset<T, match_refereesDeleteArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends match_refereesUpdateArgs>(args: Prisma.SelectSubset<T, match_refereesUpdateArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends match_refereesDeleteManyArgs>(args?: Prisma.SelectSubset<T, match_refereesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends match_refereesUpdateManyArgs>(args: Prisma.SelectSubset<T, match_refereesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends match_refereesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, match_refereesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends match_refereesUpsertArgs>(args: Prisma.SelectSubset<T, match_refereesUpsertArgs<ExtArgs>>): Prisma.Prisma__match_refereesClient<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends match_refereesCountArgs>(args?: Prisma.Subset<T, match_refereesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Match_refereesCountAggregateOutputType> : number>;
    aggregate<T extends Match_refereesAggregateArgs>(args: Prisma.Subset<T, Match_refereesAggregateArgs>): Prisma.PrismaPromise<GetMatch_refereesAggregateType<T>>;
    groupBy<T extends match_refereesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: match_refereesGroupByArgs['orderBy'];
    } : {
        orderBy?: match_refereesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, match_refereesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatch_refereesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: match_refereesFieldRefs;
}
export interface Prisma__match_refereesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    matches<T extends Prisma.matchesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.matchesDefaultArgs<ExtArgs>>): Prisma.Prisma__matchesClient<runtime.Types.Result.GetResult<Prisma.$matchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_referees<T extends Prisma.tournament_refereesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_refereesDefaultArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assigned_by_user<T extends Prisma.match_referees$assigned_by_userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.match_referees$assigned_by_userArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    replaced_referee<T extends Prisma.match_referees$replaced_refereeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.match_referees$replaced_refereeArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    referee_assignment_events<T extends Prisma.match_referees$referee_assignment_eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.match_referees$referee_assignment_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_assignment_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface match_refereesFieldRefs {
    readonly match_id: Prisma.FieldRef<"match_referees", 'BigInt'>;
    readonly tournament_id: Prisma.FieldRef<"match_referees", 'BigInt'>;
    readonly referee_id: Prisma.FieldRef<"match_referees", 'BigInt'>;
    readonly referee_role: Prisma.FieldRef<"match_referees", 'String'>;
    readonly assignment_status: Prisma.FieldRef<"match_referees", 'String'>;
    readonly assigned_by: Prisma.FieldRef<"match_referees", 'BigInt'>;
    readonly responded_at: Prisma.FieldRef<"match_referees", 'DateTime'>;
    readonly response_notes: Prisma.FieldRef<"match_referees", 'String'>;
    readonly replaced_referee_id: Prisma.FieldRef<"match_referees", 'BigInt'>;
    readonly replacement_reason: Prisma.FieldRef<"match_referees", 'String'>;
    readonly created_at: Prisma.FieldRef<"match_referees", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"match_referees", 'DateTime'>;
}
export type match_refereesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where: Prisma.match_refereesWhereUniqueInput;
};
export type match_refereesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where: Prisma.match_refereesWhereUniqueInput;
};
export type match_refereesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithRelationInput | Prisma.match_refereesOrderByWithRelationInput[];
    cursor?: Prisma.match_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Match_refereesScalarFieldEnum | Prisma.Match_refereesScalarFieldEnum[];
};
export type match_refereesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithRelationInput | Prisma.match_refereesOrderByWithRelationInput[];
    cursor?: Prisma.match_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Match_refereesScalarFieldEnum | Prisma.Match_refereesScalarFieldEnum[];
};
export type match_refereesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithRelationInput | Prisma.match_refereesOrderByWithRelationInput[];
    cursor?: Prisma.match_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Match_refereesScalarFieldEnum | Prisma.Match_refereesScalarFieldEnum[];
};
export type match_refereesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.match_refereesCreateInput, Prisma.match_refereesUncheckedCreateInput>;
};
export type match_refereesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.match_refereesCreateManyInput | Prisma.match_refereesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type match_refereesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    data: Prisma.match_refereesCreateManyInput | Prisma.match_refereesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.match_refereesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type match_refereesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.match_refereesUpdateInput, Prisma.match_refereesUncheckedUpdateInput>;
    where: Prisma.match_refereesWhereUniqueInput;
};
export type match_refereesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyInput>;
    where?: Prisma.match_refereesWhereInput;
    limit?: number;
};
export type match_refereesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.match_refereesUpdateManyMutationInput, Prisma.match_refereesUncheckedUpdateManyInput>;
    where?: Prisma.match_refereesWhereInput;
    limit?: number;
    include?: Prisma.match_refereesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type match_refereesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where: Prisma.match_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.match_refereesCreateInput, Prisma.match_refereesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.match_refereesUpdateInput, Prisma.match_refereesUncheckedUpdateInput>;
};
export type match_refereesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where: Prisma.match_refereesWhereUniqueInput;
};
export type match_refereesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.match_refereesWhereInput;
    limit?: number;
};
export type match_referees$assigned_by_userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type match_referees$replaced_refereeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type match_referees$referee_assignment_eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type match_refereesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
};
