import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type suspensionsModel = runtime.Types.Result.DefaultSelection<Prisma.$suspensionsPayload>;
export type AggregateSuspensions = {
    _count: SuspensionsCountAggregateOutputType | null;
    _avg: SuspensionsAvgAggregateOutputType | null;
    _sum: SuspensionsSumAggregateOutputType | null;
    _min: SuspensionsMinAggregateOutputType | null;
    _max: SuspensionsMaxAggregateOutputType | null;
};
export type SuspensionsAvgAggregateOutputType = {
    id: number | null;
    disciplinary_action_id: number | null;
    matches_count: number | null;
    served_matches: number | null;
    created_by: number | null;
};
export type SuspensionsSumAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    matches_count: number | null;
    served_matches: number | null;
    created_by: bigint | null;
};
export type SuspensionsMinAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    matches_count: number | null;
    start_date: Date | null;
    end_date: Date | null;
    reason: string | null;
    status: string | null;
    served_matches: number | null;
    completed_at: Date | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SuspensionsMaxAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    matches_count: number | null;
    start_date: Date | null;
    end_date: Date | null;
    reason: string | null;
    status: string | null;
    served_matches: number | null;
    completed_at: Date | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SuspensionsCountAggregateOutputType = {
    id: number;
    disciplinary_action_id: number;
    matches_count: number;
    start_date: number;
    end_date: number;
    reason: number;
    status: number;
    served_matches: number;
    completed_at: number;
    created_by: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type SuspensionsAvgAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    matches_count?: true;
    served_matches?: true;
    created_by?: true;
};
export type SuspensionsSumAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    matches_count?: true;
    served_matches?: true;
    created_by?: true;
};
export type SuspensionsMinAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    matches_count?: true;
    start_date?: true;
    end_date?: true;
    reason?: true;
    status?: true;
    served_matches?: true;
    completed_at?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type SuspensionsMaxAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    matches_count?: true;
    start_date?: true;
    end_date?: true;
    reason?: true;
    status?: true;
    served_matches?: true;
    completed_at?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type SuspensionsCountAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    matches_count?: true;
    start_date?: true;
    end_date?: true;
    reason?: true;
    status?: true;
    served_matches?: true;
    completed_at?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type SuspensionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.suspensionsWhereInput;
    orderBy?: Prisma.suspensionsOrderByWithRelationInput | Prisma.suspensionsOrderByWithRelationInput[];
    cursor?: Prisma.suspensionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SuspensionsCountAggregateInputType;
    _avg?: SuspensionsAvgAggregateInputType;
    _sum?: SuspensionsSumAggregateInputType;
    _min?: SuspensionsMinAggregateInputType;
    _max?: SuspensionsMaxAggregateInputType;
};
export type GetSuspensionsAggregateType<T extends SuspensionsAggregateArgs> = {
    [P in keyof T & keyof AggregateSuspensions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSuspensions[P]> : Prisma.GetScalarType<T[P], AggregateSuspensions[P]>;
};
export type suspensionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.suspensionsWhereInput;
    orderBy?: Prisma.suspensionsOrderByWithAggregationInput | Prisma.suspensionsOrderByWithAggregationInput[];
    by: Prisma.SuspensionsScalarFieldEnum[] | Prisma.SuspensionsScalarFieldEnum;
    having?: Prisma.suspensionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SuspensionsCountAggregateInputType | true;
    _avg?: SuspensionsAvgAggregateInputType;
    _sum?: SuspensionsSumAggregateInputType;
    _min?: SuspensionsMinAggregateInputType;
    _max?: SuspensionsMaxAggregateInputType;
};
export type SuspensionsGroupByOutputType = {
    id: bigint;
    disciplinary_action_id: bigint;
    matches_count: number | null;
    start_date: Date | null;
    end_date: Date | null;
    reason: string | null;
    status: string;
    served_matches: number;
    completed_at: Date | null;
    created_by: bigint;
    created_at: Date;
    updated_at: Date;
    _count: SuspensionsCountAggregateOutputType | null;
    _avg: SuspensionsAvgAggregateOutputType | null;
    _sum: SuspensionsSumAggregateOutputType | null;
    _min: SuspensionsMinAggregateOutputType | null;
    _max: SuspensionsMaxAggregateOutputType | null;
};
export type GetSuspensionsGroupByPayload<T extends suspensionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SuspensionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SuspensionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SuspensionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SuspensionsGroupByOutputType[P]>;
}>>;
export type suspensionsWhereInput = {
    AND?: Prisma.suspensionsWhereInput | Prisma.suspensionsWhereInput[];
    OR?: Prisma.suspensionsWhereInput[];
    NOT?: Prisma.suspensionsWhereInput | Prisma.suspensionsWhereInput[];
    id?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    matches_count?: Prisma.IntNullableFilter<"suspensions"> | number | null;
    start_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    end_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    reason?: Prisma.StringNullableFilter<"suspensions"> | string | null;
    status?: Prisma.StringFilter<"suspensions"> | string;
    served_matches?: Prisma.IntFilter<"suspensions"> | number;
    completed_at?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    created_by?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
    disciplinary_actions?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type suspensionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    end_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    completed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    disciplinary_actions?: Prisma.disciplinary_actionsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type suspensionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    disciplinary_action_id?: bigint | number;
    AND?: Prisma.suspensionsWhereInput | Prisma.suspensionsWhereInput[];
    OR?: Prisma.suspensionsWhereInput[];
    NOT?: Prisma.suspensionsWhereInput | Prisma.suspensionsWhereInput[];
    matches_count?: Prisma.IntNullableFilter<"suspensions"> | number | null;
    start_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    end_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    reason?: Prisma.StringNullableFilter<"suspensions"> | string | null;
    status?: Prisma.StringFilter<"suspensions"> | string;
    served_matches?: Prisma.IntFilter<"suspensions"> | number;
    completed_at?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    created_by?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
    disciplinary_actions?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "disciplinary_action_id">;
export type suspensionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    end_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    completed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.suspensionsCountOrderByAggregateInput;
    _avg?: Prisma.suspensionsAvgOrderByAggregateInput;
    _max?: Prisma.suspensionsMaxOrderByAggregateInput;
    _min?: Prisma.suspensionsMinOrderByAggregateInput;
    _sum?: Prisma.suspensionsSumOrderByAggregateInput;
};
export type suspensionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.suspensionsScalarWhereWithAggregatesInput | Prisma.suspensionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.suspensionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.suspensionsScalarWhereWithAggregatesInput | Prisma.suspensionsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"suspensions"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntWithAggregatesFilter<"suspensions"> | bigint | number;
    matches_count?: Prisma.IntNullableWithAggregatesFilter<"suspensions"> | number | null;
    start_date?: Prisma.DateTimeNullableWithAggregatesFilter<"suspensions"> | Date | string | null;
    end_date?: Prisma.DateTimeNullableWithAggregatesFilter<"suspensions"> | Date | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"suspensions"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"suspensions"> | string;
    served_matches?: Prisma.IntWithAggregatesFilter<"suspensions"> | number;
    completed_at?: Prisma.DateTimeNullableWithAggregatesFilter<"suspensions"> | Date | string | null;
    created_by?: Prisma.BigIntWithAggregatesFilter<"suspensions"> | bigint | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"suspensions"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"suspensions"> | Date | string;
};
export type suspensionsCreateInput = {
    id?: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    disciplinary_actions: Prisma.disciplinary_actionsCreateNestedOneWithoutSuspensionsInput;
    users: Prisma.usersCreateNestedOneWithoutSuspensionsInput;
};
export type suspensionsUncheckedCreateInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type suspensionsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutSuspensionsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutSuspensionsNestedInput;
};
export type suspensionsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type suspensionsCreateManyInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type suspensionsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type suspensionsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SuspensionsNullableScalarRelationFilter = {
    is?: Prisma.suspensionsWhereInput | null;
    isNot?: Prisma.suspensionsWhereInput | null;
};
export type suspensionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrder;
    start_date?: Prisma.SortOrder;
    end_date?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    completed_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type suspensionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type suspensionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrder;
    start_date?: Prisma.SortOrder;
    end_date?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    completed_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type suspensionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrder;
    start_date?: Prisma.SortOrder;
    end_date?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    completed_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type suspensionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    matches_count?: Prisma.SortOrder;
    served_matches?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type SuspensionsListRelationFilter = {
    every?: Prisma.suspensionsWhereInput;
    some?: Prisma.suspensionsWhereInput;
    none?: Prisma.suspensionsWhereInput;
};
export type suspensionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type suspensionsCreateNestedOneWithoutDisciplinary_actionsInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutDisciplinary_actionsInput;
    connect?: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsUncheckedCreateNestedOneWithoutDisciplinary_actionsInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutDisciplinary_actionsInput;
    connect?: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsUpdateOneWithoutDisciplinary_actionsNestedInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutDisciplinary_actionsInput;
    upsert?: Prisma.suspensionsUpsertWithoutDisciplinary_actionsInput;
    disconnect?: Prisma.suspensionsWhereInput | boolean;
    delete?: Prisma.suspensionsWhereInput | boolean;
    connect?: Prisma.suspensionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.suspensionsUpdateToOneWithWhereWithoutDisciplinary_actionsInput, Prisma.suspensionsUpdateWithoutDisciplinary_actionsInput>, Prisma.suspensionsUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type suspensionsUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutDisciplinary_actionsInput;
    upsert?: Prisma.suspensionsUpsertWithoutDisciplinary_actionsInput;
    disconnect?: Prisma.suspensionsWhereInput | boolean;
    delete?: Prisma.suspensionsWhereInput | boolean;
    connect?: Prisma.suspensionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.suspensionsUpdateToOneWithWhereWithoutDisciplinary_actionsInput, Prisma.suspensionsUpdateWithoutDisciplinary_actionsInput>, Prisma.suspensionsUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type suspensionsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput> | Prisma.suspensionsCreateWithoutUsersInput[] | Prisma.suspensionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutUsersInput | Prisma.suspensionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.suspensionsCreateManyUsersInputEnvelope;
    connect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
};
export type suspensionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput> | Prisma.suspensionsCreateWithoutUsersInput[] | Prisma.suspensionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutUsersInput | Prisma.suspensionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.suspensionsCreateManyUsersInputEnvelope;
    connect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
};
export type suspensionsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput> | Prisma.suspensionsCreateWithoutUsersInput[] | Prisma.suspensionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutUsersInput | Prisma.suspensionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.suspensionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.suspensionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.suspensionsCreateManyUsersInputEnvelope;
    set?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    disconnect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    delete?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    connect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    update?: Prisma.suspensionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.suspensionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.suspensionsUpdateManyWithWhereWithoutUsersInput | Prisma.suspensionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.suspensionsScalarWhereInput | Prisma.suspensionsScalarWhereInput[];
};
export type suspensionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput> | Prisma.suspensionsCreateWithoutUsersInput[] | Prisma.suspensionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.suspensionsCreateOrConnectWithoutUsersInput | Prisma.suspensionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.suspensionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.suspensionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.suspensionsCreateManyUsersInputEnvelope;
    set?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    disconnect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    delete?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    connect?: Prisma.suspensionsWhereUniqueInput | Prisma.suspensionsWhereUniqueInput[];
    update?: Prisma.suspensionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.suspensionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.suspensionsUpdateManyWithWhereWithoutUsersInput | Prisma.suspensionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.suspensionsScalarWhereInput | Prisma.suspensionsScalarWhereInput[];
};
export type suspensionsCreateWithoutDisciplinary_actionsInput = {
    id?: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutSuspensionsInput;
};
export type suspensionsUncheckedCreateWithoutDisciplinary_actionsInput = {
    id?: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type suspensionsCreateOrConnectWithoutDisciplinary_actionsInput = {
    where: Prisma.suspensionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
};
export type suspensionsUpsertWithoutDisciplinary_actionsInput = {
    update: Prisma.XOR<Prisma.suspensionsUpdateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedUpdateWithoutDisciplinary_actionsInput>;
    create: Prisma.XOR<Prisma.suspensionsCreateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedCreateWithoutDisciplinary_actionsInput>;
    where?: Prisma.suspensionsWhereInput;
};
export type suspensionsUpdateToOneWithWhereWithoutDisciplinary_actionsInput = {
    where?: Prisma.suspensionsWhereInput;
    data: Prisma.XOR<Prisma.suspensionsUpdateWithoutDisciplinary_actionsInput, Prisma.suspensionsUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type suspensionsUpdateWithoutDisciplinary_actionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutSuspensionsNestedInput;
};
export type suspensionsUncheckedUpdateWithoutDisciplinary_actionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type suspensionsCreateWithoutUsersInput = {
    id?: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    disciplinary_actions: Prisma.disciplinary_actionsCreateNestedOneWithoutSuspensionsInput;
};
export type suspensionsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type suspensionsCreateOrConnectWithoutUsersInput = {
    where: Prisma.suspensionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput>;
};
export type suspensionsCreateManyUsersInputEnvelope = {
    data: Prisma.suspensionsCreateManyUsersInput | Prisma.suspensionsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type suspensionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.suspensionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.suspensionsUpdateWithoutUsersInput, Prisma.suspensionsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.suspensionsCreateWithoutUsersInput, Prisma.suspensionsUncheckedCreateWithoutUsersInput>;
};
export type suspensionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.suspensionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.suspensionsUpdateWithoutUsersInput, Prisma.suspensionsUncheckedUpdateWithoutUsersInput>;
};
export type suspensionsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.suspensionsScalarWhereInput;
    data: Prisma.XOR<Prisma.suspensionsUpdateManyMutationInput, Prisma.suspensionsUncheckedUpdateManyWithoutUsersInput>;
};
export type suspensionsScalarWhereInput = {
    AND?: Prisma.suspensionsScalarWhereInput | Prisma.suspensionsScalarWhereInput[];
    OR?: Prisma.suspensionsScalarWhereInput[];
    NOT?: Prisma.suspensionsScalarWhereInput | Prisma.suspensionsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    matches_count?: Prisma.IntNullableFilter<"suspensions"> | number | null;
    start_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    end_date?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    reason?: Prisma.StringNullableFilter<"suspensions"> | string | null;
    status?: Prisma.StringFilter<"suspensions"> | string;
    served_matches?: Prisma.IntFilter<"suspensions"> | number;
    completed_at?: Prisma.DateTimeNullableFilter<"suspensions"> | Date | string | null;
    created_by?: Prisma.BigIntFilter<"suspensions"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"suspensions"> | Date | string;
};
export type suspensionsCreateManyUsersInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    matches_count?: number | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    reason?: string | null;
    status?: string;
    served_matches?: number;
    completed_at?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type suspensionsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutSuspensionsNestedInput;
};
export type suspensionsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type suspensionsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    matches_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    served_matches?: Prisma.IntFieldUpdateOperationsInput | number;
    completed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type suspensionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    matches_count?: boolean;
    start_date?: boolean;
    end_date?: boolean;
    reason?: boolean;
    status?: boolean;
    served_matches?: boolean;
    completed_at?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["suspensions"]>;
export type suspensionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    matches_count?: boolean;
    start_date?: boolean;
    end_date?: boolean;
    reason?: boolean;
    status?: boolean;
    served_matches?: boolean;
    completed_at?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["suspensions"]>;
export type suspensionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    matches_count?: boolean;
    start_date?: boolean;
    end_date?: boolean;
    reason?: boolean;
    status?: boolean;
    served_matches?: boolean;
    completed_at?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["suspensions"]>;
export type suspensionsSelectScalar = {
    id?: boolean;
    disciplinary_action_id?: boolean;
    matches_count?: boolean;
    start_date?: boolean;
    end_date?: boolean;
    reason?: boolean;
    status?: boolean;
    served_matches?: boolean;
    completed_at?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type suspensionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disciplinary_action_id" | "matches_count" | "start_date" | "end_date" | "reason" | "status" | "served_matches" | "completed_at" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["suspensions"]>;
export type suspensionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type suspensionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type suspensionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $suspensionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "suspensions";
    objects: {
        disciplinary_actions: Prisma.$disciplinary_actionsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
        reason: string | null;
        status: string;
        served_matches: number;
        completed_at: Date | null;
        created_by: bigint;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["suspensions"]>;
    composites: {};
};
export type suspensionsGetPayload<S extends boolean | null | undefined | suspensionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$suspensionsPayload, S>;
export type suspensionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<suspensionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SuspensionsCountAggregateInputType | true;
};
export interface suspensionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['suspensions'];
        meta: {
            name: 'suspensions';
        };
    };
    findUnique<T extends suspensionsFindUniqueArgs>(args: Prisma.SelectSubset<T, suspensionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends suspensionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, suspensionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends suspensionsFindFirstArgs>(args?: Prisma.SelectSubset<T, suspensionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends suspensionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, suspensionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends suspensionsFindManyArgs>(args?: Prisma.SelectSubset<T, suspensionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends suspensionsCreateArgs>(args: Prisma.SelectSubset<T, suspensionsCreateArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends suspensionsCreateManyArgs>(args?: Prisma.SelectSubset<T, suspensionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends suspensionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, suspensionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends suspensionsDeleteArgs>(args: Prisma.SelectSubset<T, suspensionsDeleteArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends suspensionsUpdateArgs>(args: Prisma.SelectSubset<T, suspensionsUpdateArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends suspensionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, suspensionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends suspensionsUpdateManyArgs>(args: Prisma.SelectSubset<T, suspensionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends suspensionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, suspensionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends suspensionsUpsertArgs>(args: Prisma.SelectSubset<T, suspensionsUpsertArgs<ExtArgs>>): Prisma.Prisma__suspensionsClient<runtime.Types.Result.GetResult<Prisma.$suspensionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends suspensionsCountArgs>(args?: Prisma.Subset<T, suspensionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SuspensionsCountAggregateOutputType> : number>;
    aggregate<T extends SuspensionsAggregateArgs>(args: Prisma.Subset<T, SuspensionsAggregateArgs>): Prisma.PrismaPromise<GetSuspensionsAggregateType<T>>;
    groupBy<T extends suspensionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: suspensionsGroupByArgs['orderBy'];
    } : {
        orderBy?: suspensionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, suspensionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuspensionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: suspensionsFieldRefs;
}
export interface Prisma__suspensionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disciplinary_actions<T extends Prisma.disciplinary_actionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actionsDefaultArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface suspensionsFieldRefs {
    readonly id: Prisma.FieldRef<"suspensions", 'BigInt'>;
    readonly disciplinary_action_id: Prisma.FieldRef<"suspensions", 'BigInt'>;
    readonly matches_count: Prisma.FieldRef<"suspensions", 'Int'>;
    readonly start_date: Prisma.FieldRef<"suspensions", 'DateTime'>;
    readonly end_date: Prisma.FieldRef<"suspensions", 'DateTime'>;
    readonly reason: Prisma.FieldRef<"suspensions", 'String'>;
    readonly status: Prisma.FieldRef<"suspensions", 'String'>;
    readonly served_matches: Prisma.FieldRef<"suspensions", 'Int'>;
    readonly completed_at: Prisma.FieldRef<"suspensions", 'DateTime'>;
    readonly created_by: Prisma.FieldRef<"suspensions", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"suspensions", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"suspensions", 'DateTime'>;
}
export type suspensionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where?: Prisma.suspensionsWhereInput;
    orderBy?: Prisma.suspensionsOrderByWithRelationInput | Prisma.suspensionsOrderByWithRelationInput[];
    cursor?: Prisma.suspensionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SuspensionsScalarFieldEnum | Prisma.SuspensionsScalarFieldEnum[];
};
export type suspensionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where?: Prisma.suspensionsWhereInput;
    orderBy?: Prisma.suspensionsOrderByWithRelationInput | Prisma.suspensionsOrderByWithRelationInput[];
    cursor?: Prisma.suspensionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SuspensionsScalarFieldEnum | Prisma.SuspensionsScalarFieldEnum[];
};
export type suspensionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where?: Prisma.suspensionsWhereInput;
    orderBy?: Prisma.suspensionsOrderByWithRelationInput | Prisma.suspensionsOrderByWithRelationInput[];
    cursor?: Prisma.suspensionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SuspensionsScalarFieldEnum | Prisma.SuspensionsScalarFieldEnum[];
};
export type suspensionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.suspensionsCreateInput, Prisma.suspensionsUncheckedCreateInput>;
};
export type suspensionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.suspensionsCreateManyInput | Prisma.suspensionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type suspensionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    data: Prisma.suspensionsCreateManyInput | Prisma.suspensionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.suspensionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type suspensionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.suspensionsUpdateInput, Prisma.suspensionsUncheckedUpdateInput>;
    where: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.suspensionsUpdateManyMutationInput, Prisma.suspensionsUncheckedUpdateManyInput>;
    where?: Prisma.suspensionsWhereInput;
    limit?: number;
};
export type suspensionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.suspensionsUpdateManyMutationInput, Prisma.suspensionsUncheckedUpdateManyInput>;
    where?: Prisma.suspensionsWhereInput;
    limit?: number;
    include?: Prisma.suspensionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type suspensionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where: Prisma.suspensionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.suspensionsCreateInput, Prisma.suspensionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.suspensionsUpdateInput, Prisma.suspensionsUncheckedUpdateInput>;
};
export type suspensionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
    where: Prisma.suspensionsWhereUniqueInput;
};
export type suspensionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.suspensionsWhereInput;
    limit?: number;
};
export type suspensionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.suspensionsSelect<ExtArgs> | null;
    omit?: Prisma.suspensionsOmit<ExtArgs> | null;
    include?: Prisma.suspensionsInclude<ExtArgs> | null;
};
