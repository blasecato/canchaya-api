import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type disciplinary_actionsModel = runtime.Types.Result.DefaultSelection<Prisma.$disciplinary_actionsPayload>;
export type AggregateDisciplinary_actions = {
    _count: Disciplinary_actionsCountAggregateOutputType | null;
    _avg: Disciplinary_actionsAvgAggregateOutputType | null;
    _sum: Disciplinary_actionsSumAggregateOutputType | null;
    _min: Disciplinary_actionsMinAggregateOutputType | null;
    _max: Disciplinary_actionsMaxAggregateOutputType | null;
};
export type Disciplinary_actionsAvgAggregateOutputType = {
    id: number | null;
    tournament_id: number | null;
    match_id: number | null;
    team_id: number | null;
    player_id: number | null;
    reported_by: number | null;
    decided_by: number | null;
};
export type Disciplinary_actionsSumAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    match_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    reported_by: bigint | null;
    decided_by: bigint | null;
};
export type Disciplinary_actionsMinAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    match_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    card_type: string | null;
    reason: string | null;
    occurred_at: Date | null;
    reported_by: bigint | null;
    decision_status: string | null;
    decided_by: bigint | null;
    decided_at: Date | null;
    decision_notes: string | null;
    created_at: Date | null;
};
export type Disciplinary_actionsMaxAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    match_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    card_type: string | null;
    reason: string | null;
    occurred_at: Date | null;
    reported_by: bigint | null;
    decision_status: string | null;
    decided_by: bigint | null;
    decided_at: Date | null;
    decision_notes: string | null;
    created_at: Date | null;
};
export type Disciplinary_actionsCountAggregateOutputType = {
    id: number;
    tournament_id: number;
    match_id: number;
    team_id: number;
    player_id: number;
    card_type: number;
    reason: number;
    occurred_at: number;
    reported_by: number;
    decision_status: number;
    decided_by: number;
    decided_at: number;
    decision_notes: number;
    created_at: number;
    _all: number;
};
export type Disciplinary_actionsAvgAggregateInputType = {
    id?: true;
    tournament_id?: true;
    match_id?: true;
    team_id?: true;
    player_id?: true;
    reported_by?: true;
    decided_by?: true;
};
export type Disciplinary_actionsSumAggregateInputType = {
    id?: true;
    tournament_id?: true;
    match_id?: true;
    team_id?: true;
    player_id?: true;
    reported_by?: true;
    decided_by?: true;
};
export type Disciplinary_actionsMinAggregateInputType = {
    id?: true;
    tournament_id?: true;
    match_id?: true;
    team_id?: true;
    player_id?: true;
    card_type?: true;
    reason?: true;
    occurred_at?: true;
    reported_by?: true;
    decision_status?: true;
    decided_by?: true;
    decided_at?: true;
    decision_notes?: true;
    created_at?: true;
};
export type Disciplinary_actionsMaxAggregateInputType = {
    id?: true;
    tournament_id?: true;
    match_id?: true;
    team_id?: true;
    player_id?: true;
    card_type?: true;
    reason?: true;
    occurred_at?: true;
    reported_by?: true;
    decision_status?: true;
    decided_by?: true;
    decided_at?: true;
    decision_notes?: true;
    created_at?: true;
};
export type Disciplinary_actionsCountAggregateInputType = {
    id?: true;
    tournament_id?: true;
    match_id?: true;
    team_id?: true;
    player_id?: true;
    card_type?: true;
    reason?: true;
    occurred_at?: true;
    reported_by?: true;
    decision_status?: true;
    decided_by?: true;
    decided_at?: true;
    decision_notes?: true;
    created_at?: true;
    _all?: true;
};
export type Disciplinary_actionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithRelationInput | Prisma.disciplinary_actionsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_actionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Disciplinary_actionsCountAggregateInputType;
    _avg?: Disciplinary_actionsAvgAggregateInputType;
    _sum?: Disciplinary_actionsSumAggregateInputType;
    _min?: Disciplinary_actionsMinAggregateInputType;
    _max?: Disciplinary_actionsMaxAggregateInputType;
};
export type GetDisciplinary_actionsAggregateType<T extends Disciplinary_actionsAggregateArgs> = {
    [P in keyof T & keyof AggregateDisciplinary_actions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDisciplinary_actions[P]> : Prisma.GetScalarType<T[P], AggregateDisciplinary_actions[P]>;
};
export type disciplinary_actionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithAggregationInput | Prisma.disciplinary_actionsOrderByWithAggregationInput[];
    by: Prisma.Disciplinary_actionsScalarFieldEnum[] | Prisma.Disciplinary_actionsScalarFieldEnum;
    having?: Prisma.disciplinary_actionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Disciplinary_actionsCountAggregateInputType | true;
    _avg?: Disciplinary_actionsAvgAggregateInputType;
    _sum?: Disciplinary_actionsSumAggregateInputType;
    _min?: Disciplinary_actionsMinAggregateInputType;
    _max?: Disciplinary_actionsMaxAggregateInputType;
};
export type Disciplinary_actionsGroupByOutputType = {
    id: bigint;
    tournament_id: bigint;
    match_id: bigint | null;
    team_id: bigint;
    player_id: bigint;
    card_type: string;
    reason: string;
    occurred_at: Date;
    reported_by: bigint;
    decision_status: string;
    decided_by: bigint | null;
    decided_at: Date | null;
    decision_notes: string | null;
    created_at: Date;
    _count: Disciplinary_actionsCountAggregateOutputType | null;
    _avg: Disciplinary_actionsAvgAggregateOutputType | null;
    _sum: Disciplinary_actionsSumAggregateOutputType | null;
    _min: Disciplinary_actionsMinAggregateOutputType | null;
    _max: Disciplinary_actionsMaxAggregateOutputType | null;
};
export type GetDisciplinary_actionsGroupByPayload<T extends disciplinary_actionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Disciplinary_actionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Disciplinary_actionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Disciplinary_actionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Disciplinary_actionsGroupByOutputType[P]>;
}>>;
export type disciplinary_actionsWhereInput = {
    AND?: Prisma.disciplinary_actionsWhereInput | Prisma.disciplinary_actionsWhereInput[];
    OR?: Prisma.disciplinary_actionsWhereInput[];
    NOT?: Prisma.disciplinary_actionsWhereInput | Prisma.disciplinary_actionsWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    match_id?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    team_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    card_type?: Prisma.StringFilter<"disciplinary_actions"> | string;
    reason?: Prisma.StringFilter<"disciplinary_actions"> | string;
    occurred_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
    reported_by?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    decision_status?: Prisma.StringFilter<"disciplinary_actions"> | string;
    decided_by?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    decided_at?: Prisma.DateTimeNullableFilter<"disciplinary_actions"> | Date | string | null;
    decision_notes?: Prisma.StringNullableFilter<"disciplinary_actions"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    matches?: Prisma.XOR<Prisma.MatchesNullableScalarRelationFilter, Prisma.matchesWhereInput> | null;
    users_disciplinary_actions_reported_byTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_players?: Prisma.XOR<Prisma.Tournament_team_playersScalarRelationFilter, Prisma.tournament_team_playersWhereInput>;
    fines?: Prisma.XOR<Prisma.FinesNullableScalarRelationFilter, Prisma.finesWhereInput> | null;
    suspensions?: Prisma.XOR<Prisma.SuspensionsNullableScalarRelationFilter, Prisma.suspensionsWhereInput> | null;
};
export type disciplinary_actionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    card_type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    occurred_at?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decision_status?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    decided_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    decision_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersOrderByWithRelationInput;
    matches?: Prisma.matchesOrderByWithRelationInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersOrderByWithRelationInput;
    tournament_team_players?: Prisma.tournament_team_playersOrderByWithRelationInput;
    fines?: Prisma.finesOrderByWithRelationInput;
    suspensions?: Prisma.suspensionsOrderByWithRelationInput;
};
export type disciplinary_actionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.disciplinary_actionsWhereInput | Prisma.disciplinary_actionsWhereInput[];
    OR?: Prisma.disciplinary_actionsWhereInput[];
    NOT?: Prisma.disciplinary_actionsWhereInput | Prisma.disciplinary_actionsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    match_id?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    team_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    card_type?: Prisma.StringFilter<"disciplinary_actions"> | string;
    reason?: Prisma.StringFilter<"disciplinary_actions"> | string;
    occurred_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
    reported_by?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    decision_status?: Prisma.StringFilter<"disciplinary_actions"> | string;
    decided_by?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    decided_at?: Prisma.DateTimeNullableFilter<"disciplinary_actions"> | Date | string | null;
    decision_notes?: Prisma.StringNullableFilter<"disciplinary_actions"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    matches?: Prisma.XOR<Prisma.MatchesNullableScalarRelationFilter, Prisma.matchesWhereInput> | null;
    users_disciplinary_actions_reported_byTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_players?: Prisma.XOR<Prisma.Tournament_team_playersScalarRelationFilter, Prisma.tournament_team_playersWhereInput>;
    fines?: Prisma.XOR<Prisma.FinesNullableScalarRelationFilter, Prisma.finesWhereInput> | null;
    suspensions?: Prisma.XOR<Prisma.SuspensionsNullableScalarRelationFilter, Prisma.suspensionsWhereInput> | null;
}, "id">;
export type disciplinary_actionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    card_type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    occurred_at?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decision_status?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    decided_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    decision_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.disciplinary_actionsCountOrderByAggregateInput;
    _avg?: Prisma.disciplinary_actionsAvgOrderByAggregateInput;
    _max?: Prisma.disciplinary_actionsMaxOrderByAggregateInput;
    _min?: Prisma.disciplinary_actionsMinOrderByAggregateInput;
    _sum?: Prisma.disciplinary_actionsSumOrderByAggregateInput;
};
export type disciplinary_actionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.disciplinary_actionsScalarWhereWithAggregatesInput | Prisma.disciplinary_actionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.disciplinary_actionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.disciplinary_actionsScalarWhereWithAggregatesInput | Prisma.disciplinary_actionsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_actions"> | bigint | number;
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_actions"> | bigint | number;
    match_id?: Prisma.BigIntNullableWithAggregatesFilter<"disciplinary_actions"> | bigint | number | null;
    team_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_actions"> | bigint | number;
    player_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_actions"> | bigint | number;
    card_type?: Prisma.StringWithAggregatesFilter<"disciplinary_actions"> | string;
    reason?: Prisma.StringWithAggregatesFilter<"disciplinary_actions"> | string;
    occurred_at?: Prisma.DateTimeWithAggregatesFilter<"disciplinary_actions"> | Date | string;
    reported_by?: Prisma.BigIntWithAggregatesFilter<"disciplinary_actions"> | bigint | number;
    decision_status?: Prisma.StringWithAggregatesFilter<"disciplinary_actions"> | string;
    decided_by?: Prisma.BigIntNullableWithAggregatesFilter<"disciplinary_actions"> | bigint | number | null;
    decided_at?: Prisma.DateTimeNullableWithAggregatesFilter<"disciplinary_actions"> | Date | string | null;
    decision_notes?: Prisma.StringNullableWithAggregatesFilter<"disciplinary_actions"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"disciplinary_actions"> | Date | string;
};
export type disciplinary_actionsCreateInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsCreateManyInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
};
export type disciplinary_actionsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    card_type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    occurred_at?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decision_status?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrder;
    decided_at?: Prisma.SortOrder;
    decision_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_actionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrder;
};
export type disciplinary_actionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    card_type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    occurred_at?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decision_status?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrder;
    decided_at?: Prisma.SortOrder;
    decision_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_actionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    card_type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    occurred_at?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decision_status?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrder;
    decided_at?: Prisma.SortOrder;
    decision_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type disciplinary_actionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    reported_by?: Prisma.SortOrder;
    decided_by?: Prisma.SortOrder;
};
export type Disciplinary_actionsScalarRelationFilter = {
    is?: Prisma.disciplinary_actionsWhereInput;
    isNot?: Prisma.disciplinary_actionsWhereInput;
};
export type Disciplinary_actionsListRelationFilter = {
    every?: Prisma.disciplinary_actionsWhereInput;
    some?: Prisma.disciplinary_actionsWhereInput;
    none?: Prisma.disciplinary_actionsWhereInput;
};
export type disciplinary_actionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type disciplinary_actionsCreateNestedOneWithoutFinesInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutFinesInput>;
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutFinesInput;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsUpdateOneRequiredWithoutFinesNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutFinesInput>;
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutFinesInput;
    upsert?: Prisma.disciplinary_actionsUpsertWithoutFinesInput;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.disciplinary_actionsUpdateToOneWithWhereWithoutFinesInput, Prisma.disciplinary_actionsUpdateWithoutFinesInput>, Prisma.disciplinary_actionsUncheckedUpdateWithoutFinesInput>;
};
export type disciplinary_actionsCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput> | Prisma.disciplinary_actionsCreateWithoutMatchesInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput | Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyMatchesInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUncheckedCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput> | Prisma.disciplinary_actionsCreateWithoutMatchesInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput | Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyMatchesInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput> | Prisma.disciplinary_actionsCreateWithoutMatchesInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput | Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutMatchesInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyMatchesInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutMatchesInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutMatchesInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsUncheckedUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput> | Prisma.disciplinary_actionsCreateWithoutMatchesInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput | Prisma.disciplinary_actionsCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutMatchesInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyMatchesInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutMatchesInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutMatchesInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsCreateNestedOneWithoutSuspensionsInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedCreateWithoutSuspensionsInput>;
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutSuspensionsInput;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsUpdateOneRequiredWithoutSuspensionsNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedCreateWithoutSuspensionsInput>;
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutSuspensionsInput;
    upsert?: Prisma.disciplinary_actionsUpsertWithoutSuspensionsInput;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.disciplinary_actionsUpdateToOneWithWhereWithoutSuspensionsInput, Prisma.disciplinary_actionsUpdateWithoutSuspensionsInput>, Prisma.disciplinary_actionsUncheckedUpdateWithoutSuspensionsInput>;
};
export type disciplinary_actionsCreateNestedManyWithoutTournament_team_playersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyTournament_team_playersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUncheckedCreateNestedManyWithoutTournament_team_playersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyTournament_team_playersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUpdateManyWithoutTournament_team_playersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutTournament_team_playersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyTournament_team_playersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutTournament_team_playersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutTournament_team_playersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutTournament_team_playersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyTournament_team_playersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutTournament_team_playersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutTournament_team_playersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutTournament_team_playersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsCreateNestedManyWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsCreateNestedManyWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUncheckedCreateNestedManyWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUncheckedCreateNestedManyWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInputEnvelope;
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
};
export type disciplinary_actionsUpdateManyWithoutUsers_disciplinary_actions_decided_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsUpdateManyWithoutUsers_disciplinary_actions_reported_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_decided_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_decided_byTousersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_reported_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput> | Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[] | Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    connectOrCreate?: Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    upsert?: Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    createMany?: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInputEnvelope;
    set?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    delete?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    connect?: Prisma.disciplinary_actionsWhereUniqueInput | Prisma.disciplinary_actionsWhereUniqueInput[];
    update?: Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    updateMany?: Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_reported_byTousersInput[];
    deleteMany?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
};
export type disciplinary_actionsCreateWithoutFinesInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutFinesInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutFinesInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutFinesInput>;
};
export type disciplinary_actionsUpsertWithoutFinesInput = {
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutFinesInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutFinesInput>;
    where?: Prisma.disciplinary_actionsWhereInput;
};
export type disciplinary_actionsUpdateToOneWithWhereWithoutFinesInput = {
    where?: Prisma.disciplinary_actionsWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutFinesInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutFinesInput>;
};
export type disciplinary_actionsUpdateWithoutFinesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutFinesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsCreateWithoutMatchesInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutMatchesInput = {
    id?: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutMatchesInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput>;
};
export type disciplinary_actionsCreateManyMatchesInputEnvelope = {
    data: Prisma.disciplinary_actionsCreateManyMatchesInput | Prisma.disciplinary_actionsCreateManyMatchesInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_actionsUpsertWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutMatchesInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedCreateWithoutMatchesInput>;
};
export type disciplinary_actionsUpdateWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutMatchesInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutMatchesInput>;
};
export type disciplinary_actionsUpdateManyWithWhereWithoutMatchesInput = {
    where: Prisma.disciplinary_actionsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyWithoutMatchesInput>;
};
export type disciplinary_actionsScalarWhereInput = {
    AND?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
    OR?: Prisma.disciplinary_actionsScalarWhereInput[];
    NOT?: Prisma.disciplinary_actionsScalarWhereInput | Prisma.disciplinary_actionsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    match_id?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    team_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    card_type?: Prisma.StringFilter<"disciplinary_actions"> | string;
    reason?: Prisma.StringFilter<"disciplinary_actions"> | string;
    occurred_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
    reported_by?: Prisma.BigIntFilter<"disciplinary_actions"> | bigint | number;
    decision_status?: Prisma.StringFilter<"disciplinary_actions"> | string;
    decided_by?: Prisma.BigIntNullableFilter<"disciplinary_actions"> | bigint | number | null;
    decided_at?: Prisma.DateTimeNullableFilter<"disciplinary_actions"> | Date | string | null;
    decision_notes?: Prisma.StringNullableFilter<"disciplinary_actions"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_actions"> | Date | string;
};
export type disciplinary_actionsCreateWithoutSuspensionsInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutSuspensionsInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutSuspensionsInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedCreateWithoutSuspensionsInput>;
};
export type disciplinary_actionsUpsertWithoutSuspensionsInput = {
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutSuspensionsInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedCreateWithoutSuspensionsInput>;
    where?: Prisma.disciplinary_actionsWhereInput;
};
export type disciplinary_actionsUpdateToOneWithWhereWithoutSuspensionsInput = {
    where?: Prisma.disciplinary_actionsWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutSuspensionsInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutSuspensionsInput>;
};
export type disciplinary_actionsUpdateWithoutSuspensionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutSuspensionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsCreateWithoutTournament_team_playersInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput = {
    id?: bigint | number;
    match_id?: bigint | number | null;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutTournament_team_playersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput>;
};
export type disciplinary_actionsCreateManyTournament_team_playersInputEnvelope = {
    data: Prisma.disciplinary_actionsCreateManyTournament_team_playersInput | Prisma.disciplinary_actionsCreateManyTournament_team_playersInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_actionsUpsertWithWhereUniqueWithoutTournament_team_playersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutTournament_team_playersInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutTournament_team_playersInput>;
};
export type disciplinary_actionsUpdateWithWhereUniqueWithoutTournament_team_playersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutTournament_team_playersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutTournament_team_playersInput>;
};
export type disciplinary_actionsUpdateManyWithWhereWithoutTournament_team_playersInput = {
    where: Prisma.disciplinary_actionsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersInput>;
};
export type disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    users_disciplinary_actions_reported_byTousers: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput>;
};
export type disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInputEnvelope = {
    data: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInput | Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    id?: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersCreateNestedOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersInput;
    matches?: Prisma.matchesCreateNestedOneWithoutDisciplinary_actionsInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput;
    fines?: Prisma.finesCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
    fines?: Prisma.finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
    suspensions?: Prisma.suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput;
};
export type disciplinary_actionsCreateOrConnectWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput>;
};
export type disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInputEnvelope = {
    data: Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInput | Prisma.disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_decided_byTousersInput>;
};
export type disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput>;
};
export type disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    where: Prisma.disciplinary_actionsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_decided_byTousersInput>;
};
export type disciplinary_actionsUpsertWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput>;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedCreateWithoutUsers_disciplinary_actions_reported_byTousersInput>;
};
export type disciplinary_actionsUpdateWithWhereUniqueWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput, Prisma.disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput>;
};
export type disciplinary_actionsUpdateManyWithWhereWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    where: Prisma.disciplinary_actionsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_reported_byTousersInput>;
};
export type disciplinary_actionsCreateManyMatchesInput = {
    id?: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
};
export type disciplinary_actionsUpdateWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateManyWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsCreateManyTournament_team_playersInput = {
    id?: bigint | number;
    match_id?: bigint | number | null;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
};
export type disciplinary_actionsUpdateWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsCreateManyUsers_disciplinary_actions_decided_byTousersInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    reported_by: bigint | number;
    decision_status?: string;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
};
export type disciplinary_actionsCreateManyUsers_disciplinary_actions_reported_byTousersInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    match_id?: bigint | number | null;
    team_id: bigint | number;
    player_id: bigint | number;
    card_type?: string;
    reason: string;
    occurred_at?: Date | string;
    decision_status?: string;
    decided_by?: bigint | number | null;
    decided_at?: Date | string | null;
    decision_notes?: string | null;
    created_at?: Date | string;
};
export type disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    users_disciplinary_actions_reported_byTousers?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_actions_disciplinary_actions_reported_byTousersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_decided_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reported_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_disciplinary_actions_decided_byTousers?: Prisma.usersUpdateOneWithoutDisciplinary_actions_disciplinary_actions_decided_byTousersNestedInput;
    matches?: Prisma.matchesUpdateOneWithoutDisciplinary_actionsNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput;
    fines?: Prisma.finesUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fines?: Prisma.finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
    suspensions?: Prisma.suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput;
};
export type disciplinary_actionsUncheckedUpdateManyWithoutUsers_disciplinary_actions_reported_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    card_type?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    occurred_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision_status?: Prisma.StringFieldUpdateOperationsInput | string;
    decided_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    decided_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decision_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_actionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    match_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    card_type?: boolean;
    reason?: boolean;
    occurred_at?: boolean;
    reported_by?: boolean;
    decision_status?: boolean;
    decided_by?: boolean;
    decided_at?: boolean;
    decision_notes?: boolean;
    created_at?: boolean;
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
    fines?: boolean | Prisma.disciplinary_actions$finesArgs<ExtArgs>;
    suspensions?: boolean | Prisma.disciplinary_actions$suspensionsArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_actions"]>;
export type disciplinary_actionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    match_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    card_type?: boolean;
    reason?: boolean;
    occurred_at?: boolean;
    reported_by?: boolean;
    decision_status?: boolean;
    decided_by?: boolean;
    decided_at?: boolean;
    decision_notes?: boolean;
    created_at?: boolean;
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_actions"]>;
export type disciplinary_actionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    match_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    card_type?: boolean;
    reason?: boolean;
    occurred_at?: boolean;
    reported_by?: boolean;
    decision_status?: boolean;
    decided_by?: boolean;
    decided_at?: boolean;
    decision_notes?: boolean;
    created_at?: boolean;
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_actions"]>;
export type disciplinary_actionsSelectScalar = {
    id?: boolean;
    tournament_id?: boolean;
    match_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    card_type?: boolean;
    reason?: boolean;
    occurred_at?: boolean;
    reported_by?: boolean;
    decision_status?: boolean;
    decided_by?: boolean;
    decided_at?: boolean;
    decision_notes?: boolean;
    created_at?: boolean;
};
export type disciplinary_actionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tournament_id" | "match_id" | "team_id" | "player_id" | "card_type" | "reason" | "occurred_at" | "reported_by" | "decision_status" | "decided_by" | "decided_at" | "decision_notes" | "created_at", ExtArgs["result"]["disciplinary_actions"]>;
export type disciplinary_actionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
    fines?: boolean | Prisma.disciplinary_actions$finesArgs<ExtArgs>;
    suspensions?: boolean | Prisma.disciplinary_actions$suspensionsArgs<ExtArgs>;
};
export type disciplinary_actionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
};
export type disciplinary_actionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users_disciplinary_actions_decided_byTousers?: boolean | Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>;
    matches?: boolean | Prisma.disciplinary_actions$matchesArgs<ExtArgs>;
    users_disciplinary_actions_reported_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
};
export type $disciplinary_actionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "disciplinary_actions";
    objects: {
        users_disciplinary_actions_decided_byTousers: Prisma.$usersPayload<ExtArgs> | null;
        matches: Prisma.$matchesPayload<ExtArgs> | null;
        users_disciplinary_actions_reported_byTousers: Prisma.$usersPayload<ExtArgs>;
        tournament_team_players: Prisma.$tournament_team_playersPayload<ExtArgs>;
        fines: Prisma.$finesPayload<ExtArgs> | null;
        suspensions: Prisma.$suspensionsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
        created_at: Date;
    }, ExtArgs["result"]["disciplinary_actions"]>;
    composites: {};
};
export type disciplinary_actionsGetPayload<S extends boolean | null | undefined | disciplinary_actionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload, S>;
export type disciplinary_actionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<disciplinary_actionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Disciplinary_actionsCountAggregateInputType | true;
};
export interface disciplinary_actionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['disciplinary_actions'];
        meta: {
            name: 'disciplinary_actions';
        };
    };
    findUnique<T extends disciplinary_actionsFindUniqueArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends disciplinary_actionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends disciplinary_actionsFindFirstArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends disciplinary_actionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends disciplinary_actionsFindManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends disciplinary_actionsCreateArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsCreateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends disciplinary_actionsCreateManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends disciplinary_actionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends disciplinary_actionsDeleteArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsDeleteArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends disciplinary_actionsUpdateArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsUpdateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends disciplinary_actionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_actionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends disciplinary_actionsUpdateManyArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends disciplinary_actionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends disciplinary_actionsUpsertArgs>(args: Prisma.SelectSubset<T, disciplinary_actionsUpsertArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends disciplinary_actionsCountArgs>(args?: Prisma.Subset<T, disciplinary_actionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Disciplinary_actionsCountAggregateOutputType> : number>;
    aggregate<T extends Disciplinary_actionsAggregateArgs>(args: Prisma.Subset<T, Disciplinary_actionsAggregateArgs>): Prisma.PrismaPromise<GetDisciplinary_actionsAggregateType<T>>;
    groupBy<T extends disciplinary_actionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: disciplinary_actionsGroupByArgs['orderBy'];
    } : {
        orderBy?: disciplinary_actionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, disciplinary_actionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinary_actionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: disciplinary_actionsFieldRefs;
}
export interface Prisma__disciplinary_actionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users_disciplinary_actions_decided_byTousers<T extends Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    matches<T extends Prisma.disciplinary_actions$matchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actions$matchesArgs<ExtArgs>>): Prisma.Prisma__matchesClient<runtime.Types.Result.GetResult<Prisma.$matchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    users_disciplinary_actions_reported_byTousers<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_team_players<T extends Prisma.tournament_team_playersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_playersDefaultArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fines<T extends Prisma.disciplinary_actions$finesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actions$finesArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    suspensions<T extends Prisma.disciplinary_actions$suspensionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actions$suspensionsArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface disciplinary_actionsFieldRefs {
    readonly id: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly tournament_id: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly match_id: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly team_id: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly player_id: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly card_type: Prisma.FieldRef<"disciplinary_actions", 'String'>;
    readonly reason: Prisma.FieldRef<"disciplinary_actions", 'String'>;
    readonly occurred_at: Prisma.FieldRef<"disciplinary_actions", 'DateTime'>;
    readonly reported_by: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly decision_status: Prisma.FieldRef<"disciplinary_actions", 'String'>;
    readonly decided_by: Prisma.FieldRef<"disciplinary_actions", 'BigInt'>;
    readonly decided_at: Prisma.FieldRef<"disciplinary_actions", 'DateTime'>;
    readonly decision_notes: Prisma.FieldRef<"disciplinary_actions", 'String'>;
    readonly created_at: Prisma.FieldRef<"disciplinary_actions", 'DateTime'>;
}
export type disciplinary_actionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithRelationInput | Prisma.disciplinary_actionsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_actionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_actionsScalarFieldEnum | Prisma.Disciplinary_actionsScalarFieldEnum[];
};
export type disciplinary_actionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithRelationInput | Prisma.disciplinary_actionsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_actionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_actionsScalarFieldEnum | Prisma.Disciplinary_actionsScalarFieldEnum[];
};
export type disciplinary_actionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithRelationInput | Prisma.disciplinary_actionsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_actionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_actionsScalarFieldEnum | Prisma.Disciplinary_actionsScalarFieldEnum[];
};
export type disciplinary_actionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_actionsCreateInput, Prisma.disciplinary_actionsUncheckedCreateInput>;
};
export type disciplinary_actionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.disciplinary_actionsCreateManyInput | Prisma.disciplinary_actionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_actionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    data: Prisma.disciplinary_actionsCreateManyInput | Prisma.disciplinary_actionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.disciplinary_actionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_actionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateInput, Prisma.disciplinary_actionsUncheckedUpdateInput>;
    where: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_actionsWhereInput;
    limit?: number;
};
export type disciplinary_actionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_actionsUpdateManyMutationInput, Prisma.disciplinary_actionsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_actionsWhereInput;
    limit?: number;
    include?: Prisma.disciplinary_actionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_actionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_actionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_actionsCreateInput, Prisma.disciplinary_actionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.disciplinary_actionsUpdateInput, Prisma.disciplinary_actionsUncheckedUpdateInput>;
};
export type disciplinary_actionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_actionsWhereUniqueInput;
};
export type disciplinary_actionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_actionsWhereInput;
    limit?: number;
};
export type disciplinary_actions$users_disciplinary_actions_decided_byTousersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type disciplinary_actions$matchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.matchesSelect<ExtArgs> | null;
    omit?: Prisma.matchesOmit<ExtArgs> | null;
    include?: Prisma.matchesInclude<ExtArgs> | null;
    where?: Prisma.matchesWhereInput;
};
export type disciplinary_actions$finesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where?: Prisma.finesWhereInput;
};
export type disciplinary_actions$suspensionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where?: Prisma.suspensionsWhereInput;
};
export type disciplinary_actionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
};
