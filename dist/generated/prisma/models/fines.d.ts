import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type finesModel = runtime.Types.Result.DefaultSelection<Prisma.$finesPayload>;
export type AggregateFines = {
    _count: FinesCountAggregateOutputType | null;
    _avg: FinesAvgAggregateOutputType | null;
    _sum: FinesSumAggregateOutputType | null;
    _min: FinesMinAggregateOutputType | null;
    _max: FinesMaxAggregateOutputType | null;
};
export type FinesAvgAggregateOutputType = {
    id: number | null;
    disciplinary_action_id: number | null;
    amount: runtime.Decimal | null;
    created_by: number | null;
};
export type FinesSumAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    amount: runtime.Decimal | null;
    created_by: bigint | null;
};
export type FinesMinAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    amount: runtime.Decimal | null;
    currency_code: string | null;
    due_date: Date | null;
    payment_status: string | null;
    paid_at: Date | null;
    payment_reference: string | null;
    notes: string | null;
    created_by: bigint | null;
    created_at: Date | null;
};
export type FinesMaxAggregateOutputType = {
    id: bigint | null;
    disciplinary_action_id: bigint | null;
    amount: runtime.Decimal | null;
    currency_code: string | null;
    due_date: Date | null;
    payment_status: string | null;
    paid_at: Date | null;
    payment_reference: string | null;
    notes: string | null;
    created_by: bigint | null;
    created_at: Date | null;
};
export type FinesCountAggregateOutputType = {
    id: number;
    disciplinary_action_id: number;
    amount: number;
    currency_code: number;
    due_date: number;
    payment_status: number;
    paid_at: number;
    payment_reference: number;
    notes: number;
    created_by: number;
    created_at: number;
    _all: number;
};
export type FinesAvgAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    amount?: true;
    created_by?: true;
};
export type FinesSumAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    amount?: true;
    created_by?: true;
};
export type FinesMinAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    amount?: true;
    currency_code?: true;
    due_date?: true;
    payment_status?: true;
    paid_at?: true;
    payment_reference?: true;
    notes?: true;
    created_by?: true;
    created_at?: true;
};
export type FinesMaxAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    amount?: true;
    currency_code?: true;
    due_date?: true;
    payment_status?: true;
    paid_at?: true;
    payment_reference?: true;
    notes?: true;
    created_by?: true;
    created_at?: true;
};
export type FinesCountAggregateInputType = {
    id?: true;
    disciplinary_action_id?: true;
    amount?: true;
    currency_code?: true;
    due_date?: true;
    payment_status?: true;
    paid_at?: true;
    payment_reference?: true;
    notes?: true;
    created_by?: true;
    created_at?: true;
    _all?: true;
};
export type FinesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finesWhereInput;
    orderBy?: Prisma.finesOrderByWithRelationInput | Prisma.finesOrderByWithRelationInput[];
    cursor?: Prisma.finesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FinesCountAggregateInputType;
    _avg?: FinesAvgAggregateInputType;
    _sum?: FinesSumAggregateInputType;
    _min?: FinesMinAggregateInputType;
    _max?: FinesMaxAggregateInputType;
};
export type GetFinesAggregateType<T extends FinesAggregateArgs> = {
    [P in keyof T & keyof AggregateFines]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFines[P]> : Prisma.GetScalarType<T[P], AggregateFines[P]>;
};
export type finesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finesWhereInput;
    orderBy?: Prisma.finesOrderByWithAggregationInput | Prisma.finesOrderByWithAggregationInput[];
    by: Prisma.FinesScalarFieldEnum[] | Prisma.FinesScalarFieldEnum;
    having?: Prisma.finesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinesCountAggregateInputType | true;
    _avg?: FinesAvgAggregateInputType;
    _sum?: FinesSumAggregateInputType;
    _min?: FinesMinAggregateInputType;
    _max?: FinesMaxAggregateInputType;
};
export type FinesGroupByOutputType = {
    id: bigint;
    disciplinary_action_id: bigint;
    amount: runtime.Decimal;
    currency_code: string;
    due_date: Date | null;
    payment_status: string;
    paid_at: Date | null;
    payment_reference: string | null;
    notes: string | null;
    created_by: bigint;
    created_at: Date;
    _count: FinesCountAggregateOutputType | null;
    _avg: FinesAvgAggregateOutputType | null;
    _sum: FinesSumAggregateOutputType | null;
    _min: FinesMinAggregateOutputType | null;
    _max: FinesMaxAggregateOutputType | null;
};
export type GetFinesGroupByPayload<T extends finesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinesGroupByOutputType[P]>;
}>>;
export type finesWhereInput = {
    AND?: Prisma.finesWhereInput | Prisma.finesWhereInput[];
    OR?: Prisma.finesWhereInput[];
    NOT?: Prisma.finesWhereInput | Prisma.finesWhereInput[];
    id?: Prisma.BigIntFilter<"fines"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"fines"> | bigint | number;
    amount?: Prisma.DecimalFilter<"fines"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFilter<"fines"> | string;
    due_date?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_status?: Prisma.StringFilter<"fines"> | string;
    paid_at?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_reference?: Prisma.StringNullableFilter<"fines"> | string | null;
    notes?: Prisma.StringNullableFilter<"fines"> | string | null;
    created_by?: Prisma.BigIntFilter<"fines"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"fines"> | Date | string;
    disciplinary_actions?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type finesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    due_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    payment_status?: Prisma.SortOrder;
    paid_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    payment_reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    disciplinary_actions?: Prisma.disciplinary_actionsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type finesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    disciplinary_action_id?: bigint | number;
    AND?: Prisma.finesWhereInput | Prisma.finesWhereInput[];
    OR?: Prisma.finesWhereInput[];
    NOT?: Prisma.finesWhereInput | Prisma.finesWhereInput[];
    amount?: Prisma.DecimalFilter<"fines"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFilter<"fines"> | string;
    due_date?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_status?: Prisma.StringFilter<"fines"> | string;
    paid_at?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_reference?: Prisma.StringNullableFilter<"fines"> | string | null;
    notes?: Prisma.StringNullableFilter<"fines"> | string | null;
    created_by?: Prisma.BigIntFilter<"fines"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"fines"> | Date | string;
    disciplinary_actions?: Prisma.XOR<Prisma.Disciplinary_actionsScalarRelationFilter, Prisma.disciplinary_actionsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "disciplinary_action_id">;
export type finesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    due_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    payment_status?: Prisma.SortOrder;
    paid_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    payment_reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.finesCountOrderByAggregateInput;
    _avg?: Prisma.finesAvgOrderByAggregateInput;
    _max?: Prisma.finesMaxOrderByAggregateInput;
    _min?: Prisma.finesMinOrderByAggregateInput;
    _sum?: Prisma.finesSumOrderByAggregateInput;
};
export type finesScalarWhereWithAggregatesInput = {
    AND?: Prisma.finesScalarWhereWithAggregatesInput | Prisma.finesScalarWhereWithAggregatesInput[];
    OR?: Prisma.finesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.finesScalarWhereWithAggregatesInput | Prisma.finesScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"fines"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntWithAggregatesFilter<"fines"> | bigint | number;
    amount?: Prisma.DecimalWithAggregatesFilter<"fines"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringWithAggregatesFilter<"fines"> | string;
    due_date?: Prisma.DateTimeNullableWithAggregatesFilter<"fines"> | Date | string | null;
    payment_status?: Prisma.StringWithAggregatesFilter<"fines"> | string;
    paid_at?: Prisma.DateTimeNullableWithAggregatesFilter<"fines"> | Date | string | null;
    payment_reference?: Prisma.StringNullableWithAggregatesFilter<"fines"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"fines"> | string | null;
    created_by?: Prisma.BigIntWithAggregatesFilter<"fines"> | bigint | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"fines"> | Date | string;
};
export type finesCreateInput = {
    id?: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_at?: Date | string;
    disciplinary_actions: Prisma.disciplinary_actionsCreateNestedOneWithoutFinesInput;
    users: Prisma.usersCreateNestedOneWithoutFinesInput;
};
export type finesUncheckedCreateInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_by: bigint | number;
    created_at?: Date | string;
};
export type finesUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutFinesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutFinesNestedInput;
};
export type finesUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type finesCreateManyInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_by: bigint | number;
    created_at?: Date | string;
};
export type finesUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type finesUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinesNullableScalarRelationFilter = {
    is?: Prisma.finesWhereInput | null;
    isNot?: Prisma.finesWhereInput | null;
};
export type finesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    due_date?: Prisma.SortOrder;
    payment_status?: Prisma.SortOrder;
    paid_at?: Prisma.SortOrder;
    payment_reference?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type finesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type finesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    due_date?: Prisma.SortOrder;
    payment_status?: Prisma.SortOrder;
    paid_at?: Prisma.SortOrder;
    payment_reference?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type finesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    due_date?: Prisma.SortOrder;
    payment_status?: Prisma.SortOrder;
    paid_at?: Prisma.SortOrder;
    payment_reference?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type finesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    disciplinary_action_id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type FinesListRelationFilter = {
    every?: Prisma.finesWhereInput;
    some?: Prisma.finesWhereInput;
    none?: Prisma.finesWhereInput;
};
export type finesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type finesCreateNestedOneWithoutDisciplinary_actionsInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutDisciplinary_actionsInput;
    connect?: Prisma.finesWhereUniqueInput;
};
export type finesUncheckedCreateNestedOneWithoutDisciplinary_actionsInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutDisciplinary_actionsInput;
    connect?: Prisma.finesWhereUniqueInput;
};
export type finesUpdateOneWithoutDisciplinary_actionsNestedInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutDisciplinary_actionsInput;
    upsert?: Prisma.finesUpsertWithoutDisciplinary_actionsInput;
    disconnect?: Prisma.finesWhereInput | boolean;
    delete?: Prisma.finesWhereInput | boolean;
    connect?: Prisma.finesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.finesUpdateToOneWithWhereWithoutDisciplinary_actionsInput, Prisma.finesUpdateWithoutDisciplinary_actionsInput>, Prisma.finesUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type finesUncheckedUpdateOneWithoutDisciplinary_actionsNestedInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutDisciplinary_actionsInput;
    upsert?: Prisma.finesUpsertWithoutDisciplinary_actionsInput;
    disconnect?: Prisma.finesWhereInput | boolean;
    delete?: Prisma.finesWhereInput | boolean;
    connect?: Prisma.finesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.finesUpdateToOneWithWhereWithoutDisciplinary_actionsInput, Prisma.finesUpdateWithoutDisciplinary_actionsInput>, Prisma.finesUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type finesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput> | Prisma.finesCreateWithoutUsersInput[] | Prisma.finesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutUsersInput | Prisma.finesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.finesCreateManyUsersInputEnvelope;
    connect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
};
export type finesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput> | Prisma.finesCreateWithoutUsersInput[] | Prisma.finesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutUsersInput | Prisma.finesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.finesCreateManyUsersInputEnvelope;
    connect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
};
export type finesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput> | Prisma.finesCreateWithoutUsersInput[] | Prisma.finesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutUsersInput | Prisma.finesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.finesUpsertWithWhereUniqueWithoutUsersInput | Prisma.finesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.finesCreateManyUsersInputEnvelope;
    set?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    disconnect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    delete?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    connect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    update?: Prisma.finesUpdateWithWhereUniqueWithoutUsersInput | Prisma.finesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.finesUpdateManyWithWhereWithoutUsersInput | Prisma.finesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.finesScalarWhereInput | Prisma.finesScalarWhereInput[];
};
export type finesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput> | Prisma.finesCreateWithoutUsersInput[] | Prisma.finesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.finesCreateOrConnectWithoutUsersInput | Prisma.finesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.finesUpsertWithWhereUniqueWithoutUsersInput | Prisma.finesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.finesCreateManyUsersInputEnvelope;
    set?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    disconnect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    delete?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    connect?: Prisma.finesWhereUniqueInput | Prisma.finesWhereUniqueInput[];
    update?: Prisma.finesUpdateWithWhereUniqueWithoutUsersInput | Prisma.finesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.finesUpdateManyWithWhereWithoutUsersInput | Prisma.finesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.finesScalarWhereInput | Prisma.finesScalarWhereInput[];
};
export type finesCreateWithoutDisciplinary_actionsInput = {
    id?: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutFinesInput;
};
export type finesUncheckedCreateWithoutDisciplinary_actionsInput = {
    id?: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_by: bigint | number;
    created_at?: Date | string;
};
export type finesCreateOrConnectWithoutDisciplinary_actionsInput = {
    where: Prisma.finesWhereUniqueInput;
    create: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
};
export type finesUpsertWithoutDisciplinary_actionsInput = {
    update: Prisma.XOR<Prisma.finesUpdateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedUpdateWithoutDisciplinary_actionsInput>;
    create: Prisma.XOR<Prisma.finesCreateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedCreateWithoutDisciplinary_actionsInput>;
    where?: Prisma.finesWhereInput;
};
export type finesUpdateToOneWithWhereWithoutDisciplinary_actionsInput = {
    where?: Prisma.finesWhereInput;
    data: Prisma.XOR<Prisma.finesUpdateWithoutDisciplinary_actionsInput, Prisma.finesUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type finesUpdateWithoutDisciplinary_actionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutFinesNestedInput;
};
export type finesUncheckedUpdateWithoutDisciplinary_actionsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type finesCreateWithoutUsersInput = {
    id?: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_at?: Date | string;
    disciplinary_actions: Prisma.disciplinary_actionsCreateNestedOneWithoutFinesInput;
};
export type finesUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_at?: Date | string;
};
export type finesCreateOrConnectWithoutUsersInput = {
    where: Prisma.finesWhereUniqueInput;
    create: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput>;
};
export type finesCreateManyUsersInputEnvelope = {
    data: Prisma.finesCreateManyUsersInput | Prisma.finesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type finesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.finesWhereUniqueInput;
    update: Prisma.XOR<Prisma.finesUpdateWithoutUsersInput, Prisma.finesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.finesCreateWithoutUsersInput, Prisma.finesUncheckedCreateWithoutUsersInput>;
};
export type finesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.finesWhereUniqueInput;
    data: Prisma.XOR<Prisma.finesUpdateWithoutUsersInput, Prisma.finesUncheckedUpdateWithoutUsersInput>;
};
export type finesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.finesScalarWhereInput;
    data: Prisma.XOR<Prisma.finesUpdateManyMutationInput, Prisma.finesUncheckedUpdateManyWithoutUsersInput>;
};
export type finesScalarWhereInput = {
    AND?: Prisma.finesScalarWhereInput | Prisma.finesScalarWhereInput[];
    OR?: Prisma.finesScalarWhereInput[];
    NOT?: Prisma.finesScalarWhereInput | Prisma.finesScalarWhereInput[];
    id?: Prisma.BigIntFilter<"fines"> | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFilter<"fines"> | bigint | number;
    amount?: Prisma.DecimalFilter<"fines"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFilter<"fines"> | string;
    due_date?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_status?: Prisma.StringFilter<"fines"> | string;
    paid_at?: Prisma.DateTimeNullableFilter<"fines"> | Date | string | null;
    payment_reference?: Prisma.StringNullableFilter<"fines"> | string | null;
    notes?: Prisma.StringNullableFilter<"fines"> | string | null;
    created_by?: Prisma.BigIntFilter<"fines"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"fines"> | Date | string;
};
export type finesCreateManyUsersInput = {
    id?: bigint | number;
    disciplinary_action_id: bigint | number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: string;
    due_date?: Date | string | null;
    payment_status?: string;
    paid_at?: Date | string | null;
    payment_reference?: string | null;
    notes?: string | null;
    created_at?: Date | string;
};
export type finesUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateOneRequiredWithoutFinesNestedInput;
};
export type finesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type finesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    disciplinary_action_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    due_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_status?: Prisma.StringFieldUpdateOperationsInput | string;
    paid_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    payment_reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type finesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    amount?: boolean;
    currency_code?: boolean;
    due_date?: boolean;
    payment_status?: boolean;
    paid_at?: boolean;
    payment_reference?: boolean;
    notes?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fines"]>;
export type finesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    amount?: boolean;
    currency_code?: boolean;
    due_date?: boolean;
    payment_status?: boolean;
    paid_at?: boolean;
    payment_reference?: boolean;
    notes?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fines"]>;
export type finesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    disciplinary_action_id?: boolean;
    amount?: boolean;
    currency_code?: boolean;
    due_date?: boolean;
    payment_status?: boolean;
    paid_at?: boolean;
    payment_reference?: boolean;
    notes?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fines"]>;
export type finesSelectScalar = {
    id?: boolean;
    disciplinary_action_id?: boolean;
    amount?: boolean;
    currency_code?: boolean;
    due_date?: boolean;
    payment_status?: boolean;
    paid_at?: boolean;
    payment_reference?: boolean;
    notes?: boolean;
    created_by?: boolean;
    created_at?: boolean;
};
export type finesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "disciplinary_action_id" | "amount" | "currency_code" | "due_date" | "payment_status" | "paid_at" | "payment_reference" | "notes" | "created_by" | "created_at", ExtArgs["result"]["fines"]>;
export type finesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type finesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type finesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.disciplinary_actionsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $finesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "fines";
    objects: {
        disciplinary_actions: Prisma.$disciplinary_actionsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        disciplinary_action_id: bigint;
        amount: runtime.Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
        created_at: Date;
    }, ExtArgs["result"]["fines"]>;
    composites: {};
};
export type finesGetPayload<S extends boolean | null | undefined | finesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$finesPayload, S>;
export type finesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<finesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinesCountAggregateInputType | true;
};
export interface finesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['fines'];
        meta: {
            name: 'fines';
        };
    };
    findUnique<T extends finesFindUniqueArgs>(args: Prisma.SelectSubset<T, finesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends finesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, finesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends finesFindFirstArgs>(args?: Prisma.SelectSubset<T, finesFindFirstArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends finesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, finesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends finesFindManyArgs>(args?: Prisma.SelectSubset<T, finesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends finesCreateArgs>(args: Prisma.SelectSubset<T, finesCreateArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends finesCreateManyArgs>(args?: Prisma.SelectSubset<T, finesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends finesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, finesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends finesDeleteArgs>(args: Prisma.SelectSubset<T, finesDeleteArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends finesUpdateArgs>(args: Prisma.SelectSubset<T, finesUpdateArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends finesDeleteManyArgs>(args?: Prisma.SelectSubset<T, finesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends finesUpdateManyArgs>(args: Prisma.SelectSubset<T, finesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends finesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, finesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends finesUpsertArgs>(args: Prisma.SelectSubset<T, finesUpsertArgs<ExtArgs>>): Prisma.Prisma__finesClient<runtime.Types.Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends finesCountArgs>(args?: Prisma.Subset<T, finesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinesCountAggregateOutputType> : number>;
    aggregate<T extends FinesAggregateArgs>(args: Prisma.Subset<T, FinesAggregateArgs>): Prisma.PrismaPromise<GetFinesAggregateType<T>>;
    groupBy<T extends finesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: finesGroupByArgs['orderBy'];
    } : {
        orderBy?: finesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, finesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: finesFieldRefs;
}
export interface Prisma__finesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disciplinary_actions<T extends Prisma.disciplinary_actionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.disciplinary_actionsDefaultArgs<ExtArgs>>): Prisma.Prisma__disciplinary_actionsClient<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface finesFieldRefs {
    readonly id: Prisma.FieldRef<"fines", 'BigInt'>;
    readonly disciplinary_action_id: Prisma.FieldRef<"fines", 'BigInt'>;
    readonly amount: Prisma.FieldRef<"fines", 'Decimal'>;
    readonly currency_code: Prisma.FieldRef<"fines", 'String'>;
    readonly due_date: Prisma.FieldRef<"fines", 'DateTime'>;
    readonly payment_status: Prisma.FieldRef<"fines", 'String'>;
    readonly paid_at: Prisma.FieldRef<"fines", 'DateTime'>;
    readonly payment_reference: Prisma.FieldRef<"fines", 'String'>;
    readonly notes: Prisma.FieldRef<"fines", 'String'>;
    readonly created_by: Prisma.FieldRef<"fines", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"fines", 'DateTime'>;
}
export type finesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where: Prisma.finesWhereUniqueInput;
};
export type finesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where: Prisma.finesWhereUniqueInput;
};
export type finesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where?: Prisma.finesWhereInput;
    orderBy?: Prisma.finesOrderByWithRelationInput | Prisma.finesOrderByWithRelationInput[];
    cursor?: Prisma.finesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinesScalarFieldEnum | Prisma.FinesScalarFieldEnum[];
};
export type finesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where?: Prisma.finesWhereInput;
    orderBy?: Prisma.finesOrderByWithRelationInput | Prisma.finesOrderByWithRelationInput[];
    cursor?: Prisma.finesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinesScalarFieldEnum | Prisma.FinesScalarFieldEnum[];
};
export type finesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where?: Prisma.finesWhereInput;
    orderBy?: Prisma.finesOrderByWithRelationInput | Prisma.finesOrderByWithRelationInput[];
    cursor?: Prisma.finesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinesScalarFieldEnum | Prisma.FinesScalarFieldEnum[];
};
export type finesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finesCreateInput, Prisma.finesUncheckedCreateInput>;
};
export type finesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.finesCreateManyInput | Prisma.finesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type finesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    data: Prisma.finesCreateManyInput | Prisma.finesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.finesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type finesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finesUpdateInput, Prisma.finesUncheckedUpdateInput>;
    where: Prisma.finesWhereUniqueInput;
};
export type finesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.finesUpdateManyMutationInput, Prisma.finesUncheckedUpdateManyInput>;
    where?: Prisma.finesWhereInput;
    limit?: number;
};
export type finesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finesUpdateManyMutationInput, Prisma.finesUncheckedUpdateManyInput>;
    where?: Prisma.finesWhereInput;
    limit?: number;
    include?: Prisma.finesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type finesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where: Prisma.finesWhereUniqueInput;
    create: Prisma.XOR<Prisma.finesCreateInput, Prisma.finesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.finesUpdateInput, Prisma.finesUncheckedUpdateInput>;
};
export type finesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
    where: Prisma.finesWhereUniqueInput;
};
export type finesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finesWhereInput;
    limit?: number;
};
export type finesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finesSelect<ExtArgs> | null;
    omit?: Prisma.finesOmit<ExtArgs> | null;
    include?: Prisma.finesInclude<ExtArgs> | null;
};
