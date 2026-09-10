import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type disciplinary_appealsModel = runtime.Types.Result.DefaultSelection<Prisma.$disciplinary_appealsPayload>;
export type AggregateDisciplinary_appeals = {
    _count: Disciplinary_appealsCountAggregateOutputType | null;
    _avg: Disciplinary_appealsAvgAggregateOutputType | null;
    _sum: Disciplinary_appealsSumAggregateOutputType | null;
    _min: Disciplinary_appealsMinAggregateOutputType | null;
    _max: Disciplinary_appealsMaxAggregateOutputType | null;
};
export type Disciplinary_appealsAvgAggregateOutputType = {
    id: number | null;
    disciplinary_action_id: number | null;
    player_id: number | null;
    reviewed_by: number | null;
};
export type Disciplinary_appealsSumAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    player_id: bigint | null;
    reviewed_by: bigint | null;
};
export type Disciplinary_appealsMinAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    player_id: bigint | null;
    message: string | null;
    status: string | null;
    reviewed_by: bigint | null;
    reviewed_at: Date | null;
    resolution_notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Disciplinary_appealsMaxAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    player_id: bigint | null;
    message: string | null;
    status: string | null;
    reviewed_by: bigint | null;
    reviewed_at: Date | null;
    resolution_notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Disciplinary_appealsCountAggregateOutputType = {
    id: number;
    disciplinary_action_id: number;
    player_id: number;
    message: number;
    status: number;
    reviewed_by: number;
    reviewed_at: number;
    resolution_notes: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Disciplinary_appealsAvgAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    player_id?: true;
    reviewed_by?: true;
};
export type Disciplinary_appealsSumAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    player_id?: true;
    reviewed_by?: true;
};
export type Disciplinary_appealsMinAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    player_id?: true;
    message?: true;
    status?: true;
    reviewed_by?: true;
    reviewed_at?: true;
    resolution_notes?: true;
    created_at?: true;
    updated_at?: true;
};
export type Disciplinary_appealsMaxAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    player_id?: true;
    message?: true;
    status?: true;
    reviewed_by?: true;
    reviewed_at?: true;
    resolution_notes?: true;
    created_at?: true;
    updated_at?: true;
};
export type Disciplinary_appealsCountAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    player_id?: true;
    message?: true;
    status?: true;
    reviewed_by?: true;
    reviewed_at?: true;
    resolution_notes?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Disciplinary_appealsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_appealsWhereInput;
    orderBy?: Prisma.disciplinary_appealsOrderByWithRelationInput | Prisma.disciplinary_appealsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_appealsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Disciplinary_appealsCountAggregateInputType;
    _avg?: Disciplinary_appealsAvgAggregateInputType;
    _sum?: Disciplinary_appealsSumAggregateInputType;
    _min?: Disciplinary_appealsMinAggregateInputType;
    _max?: Disciplinary_appealsMaxAggregateInputType;
};
export type GetDisciplinary_appealsAggregateType<T extends Disciplinary_appealsAggregateArgs> = {
    [P in keyof T & keyof AggregateDisciplinary_appeals]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDisciplinary_appeals[P]> : Prisma.GetScalarType<T[P], AggregateDisciplinary_appeals[P]>;
};
export type disciplinary_appealsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_appealsWhereInput;
    orderBy?: Prisma.disciplinary_appealsOrderByWithAggregationInput | Prisma.disciplinary_appealsOrderByWithAggregationInput[];
    by: Prisma.Disciplinary_appealsScalarFieldEnum[] | Prisma.Disciplinary_appealsScalarFieldEnum;
    having?: Prisma.disciplinary_appealsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Disciplinary_appealsCountAggregateInputType | true;
    _avg?: Disciplinary_appealsAvgAggregateInputType;
    _sum?: Disciplinary_appealsSumAggregateInputType;
    _min?: Disciplinary_appealsMinAggregateInputType;
    _max?: Disciplinary_appealsMaxAggregateInputType;
};
export type Disciplinary_appealsGroupByOutputType = {
    id: bigint;
    disciplinary_action_id: bigint;
    player_id: bigint;
    message: string;
    status: string;
    reviewed_by: bigint | null;
    reviewed_at: Date | null;
    resolution_notes: string | null;
    created_at: Date;
    updated_at: Date;
    _count: Disciplinary_appealsCountAggregateOutputType | null;
    _avg: Disciplinary_appealsAvgAggregateOutputType | null;
    _sum: Disciplinary_appealsSumAggregateOutputType | null;
    _min: Disciplinary_appealsMinAggregateOutputType | null;
    _max: Disciplinary_appealsMaxAggregateOutputType | null;
};
export type GetDisciplinary_appealsGroupByPayload<T extends disciplinary_appealsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Disciplinary_appealsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Disciplinary_appealsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Disciplinary_appealsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Disciplinary_appealsGroupByOutputType[P]>;
}>>;
export type disciplinary_appealsWhereInput = {
    AND?: Prisma.disciplinary_appealsWhereInput | Prisma.disciplinary_appealsWhereInput[];
    OR?: Prisma.disciplinary_appealsWhereInput[];
    NOT?: Prisma.disciplinary_appealsWhereInput | Prisma.disciplinary_appealsWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    message?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    status?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    reviewed_by?: Prisma.BigIntNullableFilter<"disciplinary_appeals"> | bigint | number | null;
    reviewed_at?: Prisma.DateTimeNullableFilter<"disciplinary_appeals"> | Date | string | null;
    resolution_notes?: Prisma.StringNullableFilter<"disciplinary_appeals"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
    disciplinary_action?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    player?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
};
export type disciplinary_appealsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolution_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    disciplinary_action?: Prisma.disciplinary_actionsOrderByWithRelationInput;
    player?: Prisma.usersOrderByWithRelationInput;
    reviewer?: Prisma.usersOrderByWithRelationInput;
};
export type disciplinary_appealsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    disciplinary_action_id?: bigint | number;
    AND?: Prisma.disciplinary_appealsWhereInput | Prisma.disciplinary_appealsWhereInput[];
    OR?: Prisma.disciplinary_appealsWhereInput[];
    NOT?: Prisma.disciplinary_appealsWhereInput | Prisma.disciplinary_appealsWhereInput[];
    player_id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    message?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    status?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    reviewed_by?: Prisma.BigIntNullableFilter<"disciplinary_appeals"> | bigint | number | null;
    reviewed_at?: Prisma.DateTimeNullableFilter<"disciplinary_appeals"> | Date | string | null;
    resolution_notes?: Prisma.StringNullableFilter<"disciplinary_appeals"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
    disciplinary_action?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    player?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
}, "id" | "disciplinary_action_id">;
export type disciplinary_appealsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolution_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.disciplinary_appealsCountOrderByAggregateInput;
    _avg?: Prisma.disciplinary_appealsAvgOrderByAggregateInput;
    _max?: Prisma.disciplinary_appealsMaxOrderByAggregateInput;
    _min?: Prisma.disciplinary_appealsMinOrderByAggregateInput;
    _sum?: Prisma.disciplinary_appealsSumOrderByAggregateInput;
};
export type disciplinary_appealsScalarWhereWithAggregatesInput = {
    AND?: Prisma.disciplinary_appealsScalarWhereWithAggregatesInput | Prisma.disciplinary_appealsScalarWhereWithAggregatesInput[];
    OR?: Prisma.disciplinary_appealsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.disciplinary_appealsScalarWhereWithAggregatesInput | Prisma.disciplinary_appealsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_appeals"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_appeals"> | bigint | number;
    player_id?: Prisma.BigIntWithAggregatesFilter<"disciplinary_appeals"> | bigint | number;
    message?: Prisma.StringWithAggregatesFilter<"disciplinary_appeals"> | string;
    status?: Prisma.StringWithAggregatesFilter<"disciplinary_appeals"> | string;
    reviewed_by?: Prisma.BigIntNullableWithAggregatesFilter<"disciplinary_appeals"> | bigint | number | null;
    reviewed_at?: Prisma.DateTimeNullableWithAggregatesFilter<"disciplinary_appeals"> | Date | string | null;
    resolution_notes?: Prisma.StringNullableWithAggregatesFilter<"disciplinary_appeals"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"disciplinary_appeals"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"disciplinary_appeals"> | Date | string;
};
export type disciplinary_appealsCreateInput = {
    id?: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    disciplinary_action: Prisma.disciplinary_actionsCreateNestedOneWithoutDisciplinary_appealsInput;
    player: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_playerInput;
    reviewer?: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_reviewerInput;
};
export type disciplinary_appealsUncheckedCreateInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    player_id: bigint | number;
    message: string;
    status?: string;
    reviewed_by?: bigint | number | null;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_action?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutDisciplinary_appealsNestedInput;
    player?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_appeals_playerNestedInput;
    reviewer?: Prisma.usersUpdateOneWithoutDisciplinary_appeals_reviewerNestedInput;
};
export type disciplinary_appealsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsCreateManyInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    player_id: bigint | number;
    message: string;
    status?: string;
    reviewed_by?: bigint | number | null;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Disciplinary_appealsNullableScalarRelationFilter = {
    is?: Prisma.disciplinary_appealsWhereInput | null;
    isNot?: Prisma.disciplinary_appealsWhereInput | null;
};
export type disciplinary_appealsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrder;
    reviewed_at?: Prisma.SortOrder;
    resolution_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type disciplinary_appealsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrder;
};
export type disciplinary_appealsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrder;
    reviewed_at?: Prisma.SortOrder;
    resolution_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type disciplinary_appealsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrder;
    reviewed_at?: Prisma.SortOrder;
    resolution_notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type disciplinary_appealsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    reviewed_by?: Prisma.SortOrder;
};
export type Disciplinary_appealsListRelationFilter = {
    every?: Prisma.disciplinary_appealsWhereInput;
    some?: Prisma.disciplinary_appealsWhereInput;
    none?: Prisma.disciplinary_appealsWhereInput;
};
export type disciplinary_appealsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type disciplinary_appealsCreateNestedOneWithoutDisciplinary_actionInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutDisciplinary_actionInput;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsUncheckedCreateNestedOneWithoutDisciplinary_actionInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutDisciplinary_actionInput;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsUpdateOneWithoutDisciplinary_actionNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutDisciplinary_actionInput;
    upsert?: Prisma.disciplinary_appealsUpsertWithoutDisciplinary_actionInput;
    disconnect?: Prisma.disciplinary_appealsWhereInput | boolean;
    delete?: Prisma.disciplinary_appealsWhereInput | boolean;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.disciplinary_appealsUpdateToOneWithWhereWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUpdateWithoutDisciplinary_actionInput>, Prisma.disciplinary_appealsUncheckedUpdateWithoutDisciplinary_actionInput>;
};
export type disciplinary_appealsUncheckedUpdateOneWithoutDisciplinary_actionNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutDisciplinary_actionInput;
    upsert?: Prisma.disciplinary_appealsUpsertWithoutDisciplinary_actionInput;
    disconnect?: Prisma.disciplinary_appealsWhereInput | boolean;
    delete?: Prisma.disciplinary_appealsWhereInput | boolean;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.disciplinary_appealsUpdateToOneWithWhereWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUpdateWithoutDisciplinary_actionInput>, Prisma.disciplinary_appealsUncheckedUpdateWithoutDisciplinary_actionInput>;
};
export type disciplinary_appealsCreateNestedManyWithoutPlayerInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput> | Prisma.disciplinary_appealsCreateWithoutPlayerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyPlayerInputEnvelope;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
};
export type disciplinary_appealsCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput> | Prisma.disciplinary_appealsCreateWithoutReviewerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyReviewerInputEnvelope;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
};
export type disciplinary_appealsUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput> | Prisma.disciplinary_appealsCreateWithoutPlayerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyPlayerInputEnvelope;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
};
export type disciplinary_appealsUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput> | Prisma.disciplinary_appealsCreateWithoutReviewerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyReviewerInputEnvelope;
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
};
export type disciplinary_appealsUpdateManyWithoutPlayerNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput> | Prisma.disciplinary_appealsCreateWithoutPlayerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput[];
    upsert?: Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutPlayerInput | Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyPlayerInputEnvelope;
    set?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    delete?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    update?: Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutPlayerInput | Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?: Prisma.disciplinary_appealsUpdateManyWithWhereWithoutPlayerInput | Prisma.disciplinary_appealsUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
};
export type disciplinary_appealsUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput> | Prisma.disciplinary_appealsCreateWithoutReviewerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutReviewerInput | Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyReviewerInputEnvelope;
    set?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    delete?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    update?: Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutReviewerInput | Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.disciplinary_appealsUpdateManyWithWhereWithoutReviewerInput | Prisma.disciplinary_appealsUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
};
export type disciplinary_appealsUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput> | Prisma.disciplinary_appealsCreateWithoutPlayerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutPlayerInput[];
    upsert?: Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutPlayerInput | Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutPlayerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyPlayerInputEnvelope;
    set?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    delete?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    update?: Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutPlayerInput | Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutPlayerInput[];
    updateMany?: Prisma.disciplinary_appealsUpdateManyWithWhereWithoutPlayerInput | Prisma.disciplinary_appealsUpdateManyWithWhereWithoutPlayerInput[];
    deleteMany?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
};
export type disciplinary_appealsUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput> | Prisma.disciplinary_appealsCreateWithoutReviewerInput[] | Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput | Prisma.disciplinary_appealsCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutReviewerInput | Prisma.disciplinary_appealsUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.disciplinary_appealsCreateManyReviewerInputEnvelope;
    set?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    disconnect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    delete?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    connect?: Prisma.disciplinary_appealsWhereUniqueInput | Prisma.disciplinary_appealsWhereUniqueInput[];
    update?: Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutReviewerInput | Prisma.disciplinary_appealsUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.disciplinary_appealsUpdateManyWithWhereWithoutReviewerInput | Prisma.disciplinary_appealsUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
};
export type disciplinary_appealsCreateWithoutDisciplinary_actionInput = {
    id?: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    player: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_playerInput;
    reviewer?: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_reviewerInput;
};
export type disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput = {
    id?: bigint | number;
    player_id: bigint | number;
    message: string;
    status?: string;
    reviewed_by?: bigint | number | null;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsCreateOrConnectWithoutDisciplinary_actionInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
};
export type disciplinary_appealsUpsertWithoutDisciplinary_actionInput = {
    update: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutDisciplinary_actionInput>;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedCreateWithoutDisciplinary_actionInput>;
    where?: Prisma.disciplinary_appealsWhereInput;
};
export type disciplinary_appealsUpdateToOneWithWhereWithoutDisciplinary_actionInput = {
    where?: Prisma.disciplinary_appealsWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutDisciplinary_actionInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutDisciplinary_actionInput>;
};
export type disciplinary_appealsUpdateWithoutDisciplinary_actionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    player?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_appeals_playerNestedInput;
    reviewer?: Prisma.usersUpdateOneWithoutDisciplinary_appeals_reviewerNestedInput;
};
export type disciplinary_appealsUncheckedUpdateWithoutDisciplinary_actionInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsCreateWithoutPlayerInput = {
    id?: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    disciplinary_action: Prisma.disciplinary_actionsCreateNestedOneWithoutDisciplinary_appealsInput;
    reviewer?: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_reviewerInput;
};
export type disciplinary_appealsUncheckedCreateWithoutPlayerInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    message: string;
    status?: string;
    reviewed_by?: bigint | number | null;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsCreateOrConnectWithoutPlayerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput>;
};
export type disciplinary_appealsCreateManyPlayerInputEnvelope = {
    data: Prisma.disciplinary_appealsCreateManyPlayerInput | Prisma.disciplinary_appealsCreateManyPlayerInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_appealsCreateWithoutReviewerInput = {
    id?: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    disciplinary_action: Prisma.disciplinary_actionsCreateNestedOneWithoutDisciplinary_appealsInput;
    player: Prisma.usersCreateNestedOneWithoutDisciplinary_appeals_playerInput;
};
export type disciplinary_appealsUncheckedCreateWithoutReviewerInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    player_id: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsCreateOrConnectWithoutReviewerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput>;
};
export type disciplinary_appealsCreateManyReviewerInputEnvelope = {
    data: Prisma.disciplinary_appealsCreateManyReviewerInput | Prisma.disciplinary_appealsCreateManyReviewerInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_appealsUpsertWithWhereUniqueWithoutPlayerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutPlayerInput>;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutPlayerInput>;
};
export type disciplinary_appealsUpdateWithWhereUniqueWithoutPlayerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutPlayerInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutPlayerInput>;
};
export type disciplinary_appealsUpdateManyWithWhereWithoutPlayerInput = {
    where: Prisma.disciplinary_appealsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateManyMutationInput, Prisma.disciplinary_appealsUncheckedUpdateManyWithoutPlayerInput>;
};
export type disciplinary_appealsScalarWhereInput = {
    AND?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
    OR?: Prisma.disciplinary_appealsScalarWhereInput[];
    NOT?: Prisma.disciplinary_appealsScalarWhereInput | Prisma.disciplinary_appealsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"disciplinary_appeals"> | bigint | number;
    message?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    status?: Prisma.StringFilter<"disciplinary_appeals"> | string;
    reviewed_by?: Prisma.BigIntNullableFilter<"disciplinary_appeals"> | bigint | number | null;
    reviewed_at?: Prisma.DateTimeNullableFilter<"disciplinary_appeals"> | Date | string | null;
    resolution_notes?: Prisma.StringNullableFilter<"disciplinary_appeals"> | string | null;
    created_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"disciplinary_appeals"> | Date | string;
};
export type disciplinary_appealsUpsertWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    update: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutReviewerInput>;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedCreateWithoutReviewerInput>;
};
export type disciplinary_appealsUpdateWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateWithoutReviewerInput, Prisma.disciplinary_appealsUncheckedUpdateWithoutReviewerInput>;
};
export type disciplinary_appealsUpdateManyWithWhereWithoutReviewerInput = {
    where: Prisma.disciplinary_appealsScalarWhereInput;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateManyMutationInput, Prisma.disciplinary_appealsUncheckedUpdateManyWithoutReviewerInput>;
};
export type disciplinary_appealsCreateManyPlayerInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    message: string;
    status?: string;
    reviewed_by?: bigint | number | null;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsCreateManyReviewerInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    player_id: bigint | number;
    message: string;
    status?: string;
    reviewed_at?: Date | string | null;
    resolution_notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type disciplinary_appealsUpdateWithoutPlayerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_action?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutDisciplinary_appealsNestedInput;
    reviewer?: Prisma.usersUpdateOneWithoutDisciplinary_appeals_reviewerNestedInput;
};
export type disciplinary_appealsUncheckedUpdateWithoutPlayerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsUncheckedUpdateManyWithoutPlayerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsUpdateWithoutReviewerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_action?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutDisciplinary_appealsNestedInput;
    player?: Prisma.usersUpdateOneRequiredWithoutDisciplinary_appeals_playerNestedInput;
};
export type disciplinary_appealsUncheckedUpdateWithoutReviewerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsUncheckedUpdateManyWithoutReviewerInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolution_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type disciplinary_appealsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    player_id?: boolean;
    message?: boolean;
    status?: boolean;
    reviewed_by?: boolean;
    reviewed_at?: boolean;
    resolution_notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_appeals"]>;
export type disciplinary_appealsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    player_id?: boolean;
    message?: boolean;
    status?: boolean;
    reviewed_by?: boolean;
    reviewed_at?: boolean;
    resolution_notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_appeals"]>;
export type disciplinary_appealsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    player_id?: boolean;
    message?: boolean;
    status?: boolean;
    reviewed_by?: boolean;
    reviewed_at?: boolean;
    resolution_notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["disciplinary_appeals"]>;
export type disciplinary_appealsSelectScalar = {
    id?: boolean;
    disciplinary_action_id?: boolean;
    player_id?: boolean;
    message?: boolean;
    status?: boolean;
    reviewed_by?: boolean;
    reviewed_at?: boolean;
    resolution_notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type disciplinary_appealsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disciplinary_action_id" | "player_id" | "message" | "status" | "reviewed_by" | "reviewed_at" | "resolution_notes" | "created_at" | "updated_at", ExtArgs["result"]["disciplinary_appeals"]>;
export type disciplinary_appealsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
};
export type disciplinary_appealsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
};
export type disciplinary_appealsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_action?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    player?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>;
};
export type $disciplinary_appealsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "disciplinary_appeals";
    objects: {
        disciplinary_action: Prisma.$disciplinary_actionsPayload<ExtArgs>;
        player: Prisma.$usersPayload<ExtArgs>;
        reviewer: Prisma.$usersPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        disciplinary_action_id: bigint;
        player_id: bigint;
        message: string;
        status: string;
        reviewed_by: bigint | null;
        reviewed_at: Date | null;
        resolution_notes: string | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["disciplinary_appeals"]>;
    composites: {};
};
export type disciplinary_appealsGetPayload<S extends boolean | null | undefined | disciplinary_appealsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload, S>;
export type disciplinary_appealsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<disciplinary_appealsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Disciplinary_appealsCountAggregateInputType | true;
};
export interface disciplinary_appealsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['disciplinary_appeals'];
        meta: {
            name: 'disciplinary_appeals';
        };
    };
    findUnique<T extends disciplinary_appealsFindUniqueArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends disciplinary_appealsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends disciplinary_appealsFindFirstArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsFindFirstArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends disciplinary_appealsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends disciplinary_appealsFindManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends disciplinary_appealsCreateArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsCreateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends disciplinary_appealsCreateManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends disciplinary_appealsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends disciplinary_appealsDeleteArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsDeleteArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends disciplinary_appealsUpdateArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsUpdateArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends disciplinary_appealsDeleteManyArgs>(args?: Prisma.SelectSubset<T, disciplinary_appealsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends disciplinary_appealsUpdateManyArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends disciplinary_appealsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends disciplinary_appealsUpsertArgs>(args: Prisma.SelectSubset<T, disciplinary_appealsUpsertArgs<ExtArgs>>): Prisma.Prisma__disciplinary_appealsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_appealsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends disciplinary_appealsCountArgs>(args?: Prisma.Subset<T, disciplinary_appealsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Disciplinary_appealsCountAggregateOutputType> : number>;
    aggregate<T extends Disciplinary_appealsAggregateArgs>(args: Prisma.Subset<T, Disciplinary_appealsAggregateArgs>): Prisma.PrismaPromise<GetDisciplinary_appealsAggregateType<T>>;
    groupBy<T extends disciplinary_appealsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: disciplinary_appealsGroupByArgs['orderBy'];
    } : {
        orderBy?: disciplinary_appealsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, disciplinary_appealsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinary_appealsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: disciplinary_appealsFieldRefs;
}
export interface Prisma__disciplinary_appealsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disciplinary_action<T extends Prisma.disciplinary_actionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actionsDefaultArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    player<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewer<T extends Prisma.disciplinary_appeals$reviewerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_appeals$reviewerArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface disciplinary_appealsFieldRefs {
    readonly id: Prisma.FieldRef<"disciplinary_appeals", 'BigInt'>;
    readonly disciplinary_action_id: Prisma.FieldRef<"disciplinary_appeals", 'BigInt'>;
    readonly player_id: Prisma.FieldRef<"disciplinary_appeals", 'BigInt'>;
    readonly message: Prisma.FieldRef<"disciplinary_appeals", 'String'>;
    readonly status: Prisma.FieldRef<"disciplinary_appeals", 'String'>;
    readonly reviewed_by: Prisma.FieldRef<"disciplinary_appeals", 'BigInt'>;
    readonly reviewed_at: Prisma.FieldRef<"disciplinary_appeals", 'DateTime'>;
    readonly resolution_notes: Prisma.FieldRef<"disciplinary_appeals", 'String'>;
    readonly created_at: Prisma.FieldRef<"disciplinary_appeals", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"disciplinary_appeals", 'DateTime'>;
}
export type disciplinary_appealsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_appealsWhereInput;
    orderBy?: Prisma.disciplinary_appealsOrderByWithRelationInput | Prisma.disciplinary_appealsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_appealsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_appealsScalarFieldEnum | Prisma.Disciplinary_appealsScalarFieldEnum[];
};
export type disciplinary_appealsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_appealsWhereInput;
    orderBy?: Prisma.disciplinary_appealsOrderByWithRelationInput | Prisma.disciplinary_appealsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_appealsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_appealsScalarFieldEnum | Prisma.Disciplinary_appealsScalarFieldEnum[];
};
export type disciplinary_appealsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_appealsWhereInput;
    orderBy?: Prisma.disciplinary_appealsOrderByWithRelationInput | Prisma.disciplinary_appealsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_appealsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_appealsScalarFieldEnum | Prisma.Disciplinary_appealsScalarFieldEnum[];
};
export type disciplinary_appealsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_appealsCreateInput, Prisma.disciplinary_appealsUncheckedCreateInput>;
};
export type disciplinary_appealsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.disciplinary_appealsCreateManyInput | Prisma.disciplinary_appealsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type disciplinary_appealsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    data: Prisma.disciplinary_appealsCreateManyInput | Prisma.disciplinary_appealsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.disciplinary_appealsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_appealsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateInput, Prisma.disciplinary_appealsUncheckedUpdateInput>;
    where: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateManyMutationInput, Prisma.disciplinary_appealsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_appealsWhereInput;
    limit?: number;
};
export type disciplinary_appealsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.disciplinary_appealsUpdateManyMutationInput, Prisma.disciplinary_appealsUncheckedUpdateManyInput>;
    where?: Prisma.disciplinary_appealsWhereInput;
    limit?: number;
    include?: Prisma.disciplinary_appealsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type disciplinary_appealsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_appealsWhereUniqueInput;
    create: Prisma.XOR<Prisma.disciplinary_appealsCreateInput, Prisma.disciplinary_appealsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.disciplinary_appealsUpdateInput, Prisma.disciplinary_appealsUncheckedUpdateInput>;
};
export type disciplinary_appealsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
    where: Prisma.disciplinary_appealsWhereUniqueInput;
};
export type disciplinary_appealsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_appealsWhereInput;
    limit?: number;
};
export type disciplinary_appeals$reviewerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type disciplinary_appealsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_appealsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_appealsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_appealsInclude<ExtArgs> | null;
};
