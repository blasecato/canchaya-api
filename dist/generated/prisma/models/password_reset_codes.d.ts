import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type password_reset_codesModel = runtime.Types.Result.DefaultSelection<Prisma.$password_reset_codesPayload>;
export type AggregatePassword_reset_codes = {
    _count: Password_reset_codesCountAggregateOutputType | null;
    _avg: Password_reset_codesAvgAggregateOutputType | null;
    _sum: Password_reset_codesSumAggregateOutputType | null;
    _min: Password_reset_codesMinAggregateOutputType | null;
    _max: Password_reset_codesMaxAggregateOutputType | null;
};
export type Password_reset_codesAvgAggregateOutputType = {
    id: number | null;
    user_id: number | null;
    attempts: number | null;
};
export type Password_reset_codesSumAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    attempts: number | null;
};
export type Password_reset_codesMinAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    code_hash: string | null;
    expires_at: Date | null;
    consumed_at: Date | null;
    attempts: number | null;
    requested_ip: string | null;
    created_at: Date | null;
};
export type Password_reset_codesMaxAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    code_hash: string | null;
    expires_at: Date | null;
    consumed_at: Date | null;
    attempts: number | null;
    requested_ip: string | null;
    created_at: Date | null;
};
export type Password_reset_codesCountAggregateOutputType = {
    id: number;
    user_id: number;
    code_hash: number;
    expires_at: number;
    consumed_at: number;
    attempts: number;
    requested_ip: number;
    created_at: number;
    _all: number;
};
export type Password_reset_codesAvgAggregateInputType = {
    id?: true;
    user_id?: true;
    attempts?: true;
};
export type Password_reset_codesSumAggregateInputType = {
    id?: true;
    user_id?: true;
    attempts?: true;
};
export type Password_reset_codesMinAggregateInputType = {
    id?: true;
    user_id?: true;
    code_hash?: true;
    expires_at?: true;
    consumed_at?: true;
    attempts?: true;
    requested_ip?: true;
    created_at?: true;
};
export type Password_reset_codesMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    code_hash?: true;
    expires_at?: true;
    consumed_at?: true;
    attempts?: true;
    requested_ip?: true;
    created_at?: true;
};
export type Password_reset_codesCountAggregateInputType = {
    id?: true;
    user_id?: true;
    code_hash?: true;
    expires_at?: true;
    consumed_at?: true;
    attempts?: true;
    requested_ip?: true;
    created_at?: true;
    _all?: true;
};
export type Password_reset_codesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_codesWhereInput;
    orderBy?: Prisma.password_reset_codesOrderByWithRelationInput | Prisma.password_reset_codesOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Password_reset_codesCountAggregateInputType;
    _avg?: Password_reset_codesAvgAggregateInputType;
    _sum?: Password_reset_codesSumAggregateInputType;
    _min?: Password_reset_codesMinAggregateInputType;
    _max?: Password_reset_codesMaxAggregateInputType;
};
export type GetPassword_reset_codesAggregateType<T extends Password_reset_codesAggregateArgs> = {
    [P in keyof T & keyof AggregatePassword_reset_codes]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePassword_reset_codes[P]> : Prisma.GetScalarType<T[P], AggregatePassword_reset_codes[P]>;
};
export type password_reset_codesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_codesWhereInput;
    orderBy?: Prisma.password_reset_codesOrderByWithAggregationInput | Prisma.password_reset_codesOrderByWithAggregationInput[];
    by: Prisma.Password_reset_codesScalarFieldEnum[] | Prisma.Password_reset_codesScalarFieldEnum;
    having?: Prisma.password_reset_codesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Password_reset_codesCountAggregateInputType | true;
    _avg?: Password_reset_codesAvgAggregateInputType;
    _sum?: Password_reset_codesSumAggregateInputType;
    _min?: Password_reset_codesMinAggregateInputType;
    _max?: Password_reset_codesMaxAggregateInputType;
};
export type Password_reset_codesGroupByOutputType = {
    id: bigint;
    user_id: bigint;
    code_hash: string;
    expires_at: Date;
    consumed_at: Date | null;
    attempts: number;
    requested_ip: string | null;
    created_at: Date;
    _count: Password_reset_codesCountAggregateOutputType | null;
    _avg: Password_reset_codesAvgAggregateOutputType | null;
    _sum: Password_reset_codesSumAggregateOutputType | null;
    _min: Password_reset_codesMinAggregateOutputType | null;
    _max: Password_reset_codesMaxAggregateOutputType | null;
};
export type GetPassword_reset_codesGroupByPayload<T extends password_reset_codesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Password_reset_codesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Password_reset_codesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Password_reset_codesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Password_reset_codesGroupByOutputType[P]>;
}>>;
export type password_reset_codesWhereInput = {
    AND?: Prisma.password_reset_codesWhereInput | Prisma.password_reset_codesWhereInput[];
    OR?: Prisma.password_reset_codesWhereInput[];
    NOT?: Prisma.password_reset_codesWhereInput | Prisma.password_reset_codesWhereInput[];
    id?: Prisma.BigIntFilter<"password_reset_codes"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"password_reset_codes"> | bigint | number;
    code_hash?: Prisma.StringFilter<"password_reset_codes"> | string;
    expires_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
    consumed_at?: Prisma.DateTimeNullableFilter<"password_reset_codes"> | Date | string | null;
    attempts?: Prisma.IntFilter<"password_reset_codes"> | number;
    requested_ip?: Prisma.StringNullableFilter<"password_reset_codes"> | string | null;
    created_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type password_reset_codesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    code_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    consumed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    requested_ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type password_reset_codesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.password_reset_codesWhereInput | Prisma.password_reset_codesWhereInput[];
    OR?: Prisma.password_reset_codesWhereInput[];
    NOT?: Prisma.password_reset_codesWhereInput | Prisma.password_reset_codesWhereInput[];
    user_id?: Prisma.BigIntFilter<"password_reset_codes"> | bigint | number;
    code_hash?: Prisma.StringFilter<"password_reset_codes"> | string;
    expires_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
    consumed_at?: Prisma.DateTimeNullableFilter<"password_reset_codes"> | Date | string | null;
    attempts?: Prisma.IntFilter<"password_reset_codes"> | number;
    requested_ip?: Prisma.StringNullableFilter<"password_reset_codes"> | string | null;
    created_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type password_reset_codesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    code_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    consumed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    requested_ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.password_reset_codesCountOrderByAggregateInput;
    _avg?: Prisma.password_reset_codesAvgOrderByAggregateInput;
    _max?: Prisma.password_reset_codesMaxOrderByAggregateInput;
    _min?: Prisma.password_reset_codesMinOrderByAggregateInput;
    _sum?: Prisma.password_reset_codesSumOrderByAggregateInput;
};
export type password_reset_codesScalarWhereWithAggregatesInput = {
    AND?: Prisma.password_reset_codesScalarWhereWithAggregatesInput | Prisma.password_reset_codesScalarWhereWithAggregatesInput[];
    OR?: Prisma.password_reset_codesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.password_reset_codesScalarWhereWithAggregatesInput | Prisma.password_reset_codesScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"password_reset_codes"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"password_reset_codes"> | bigint | number;
    code_hash?: Prisma.StringWithAggregatesFilter<"password_reset_codes"> | string;
    expires_at?: Prisma.DateTimeWithAggregatesFilter<"password_reset_codes"> | Date | string;
    consumed_at?: Prisma.DateTimeNullableWithAggregatesFilter<"password_reset_codes"> | Date | string | null;
    attempts?: Prisma.IntWithAggregatesFilter<"password_reset_codes"> | number;
    requested_ip?: Prisma.StringNullableWithAggregatesFilter<"password_reset_codes"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"password_reset_codes"> | Date | string;
};
export type password_reset_codesCreateInput = {
    id?: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutPassword_reset_codesInput;
};
export type password_reset_codesUncheckedCreateInput = {
    id?: bigint | number;
    user_id: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
};
export type password_reset_codesUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutPassword_reset_codesNestedInput;
};
export type password_reset_codesUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesCreateManyInput = {
    id?: bigint | number;
    user_id: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
};
export type password_reset_codesUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    code_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    consumed_at?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    requested_ip?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_codesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type password_reset_codesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    code_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    consumed_at?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    requested_ip?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_codesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    code_hash?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
    consumed_at?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    requested_ip?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type password_reset_codesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type Password_reset_codesListRelationFilter = {
    every?: Prisma.password_reset_codesWhereInput;
    some?: Prisma.password_reset_codesWhereInput;
    none?: Prisma.password_reset_codesWhereInput;
};
export type password_reset_codesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type password_reset_codesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput> | Prisma.password_reset_codesCreateWithoutUsersInput[] | Prisma.password_reset_codesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.password_reset_codesCreateOrConnectWithoutUsersInput | Prisma.password_reset_codesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.password_reset_codesCreateManyUsersInputEnvelope;
    connect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
};
export type password_reset_codesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput> | Prisma.password_reset_codesCreateWithoutUsersInput[] | Prisma.password_reset_codesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.password_reset_codesCreateOrConnectWithoutUsersInput | Prisma.password_reset_codesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.password_reset_codesCreateManyUsersInputEnvelope;
    connect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
};
export type password_reset_codesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput> | Prisma.password_reset_codesCreateWithoutUsersInput[] | Prisma.password_reset_codesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.password_reset_codesCreateOrConnectWithoutUsersInput | Prisma.password_reset_codesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.password_reset_codesUpsertWithWhereUniqueWithoutUsersInput | Prisma.password_reset_codesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.password_reset_codesCreateManyUsersInputEnvelope;
    set?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    disconnect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    delete?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    connect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    update?: Prisma.password_reset_codesUpdateWithWhereUniqueWithoutUsersInput | Prisma.password_reset_codesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.password_reset_codesUpdateManyWithWhereWithoutUsersInput | Prisma.password_reset_codesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.password_reset_codesScalarWhereInput | Prisma.password_reset_codesScalarWhereInput[];
};
export type password_reset_codesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput> | Prisma.password_reset_codesCreateWithoutUsersInput[] | Prisma.password_reset_codesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.password_reset_codesCreateOrConnectWithoutUsersInput | Prisma.password_reset_codesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.password_reset_codesUpsertWithWhereUniqueWithoutUsersInput | Prisma.password_reset_codesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.password_reset_codesCreateManyUsersInputEnvelope;
    set?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    disconnect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    delete?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    connect?: Prisma.password_reset_codesWhereUniqueInput | Prisma.password_reset_codesWhereUniqueInput[];
    update?: Prisma.password_reset_codesUpdateWithWhereUniqueWithoutUsersInput | Prisma.password_reset_codesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.password_reset_codesUpdateManyWithWhereWithoutUsersInput | Prisma.password_reset_codesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.password_reset_codesScalarWhereInput | Prisma.password_reset_codesScalarWhereInput[];
};
export type password_reset_codesCreateWithoutUsersInput = {
    id?: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
};
export type password_reset_codesUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
};
export type password_reset_codesCreateOrConnectWithoutUsersInput = {
    where: Prisma.password_reset_codesWhereUniqueInput;
    create: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput>;
};
export type password_reset_codesCreateManyUsersInputEnvelope = {
    data: Prisma.password_reset_codesCreateManyUsersInput | Prisma.password_reset_codesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type password_reset_codesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.password_reset_codesWhereUniqueInput;
    update: Prisma.XOR<Prisma.password_reset_codesUpdateWithoutUsersInput, Prisma.password_reset_codesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.password_reset_codesCreateWithoutUsersInput, Prisma.password_reset_codesUncheckedCreateWithoutUsersInput>;
};
export type password_reset_codesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.password_reset_codesWhereUniqueInput;
    data: Prisma.XOR<Prisma.password_reset_codesUpdateWithoutUsersInput, Prisma.password_reset_codesUncheckedUpdateWithoutUsersInput>;
};
export type password_reset_codesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.password_reset_codesScalarWhereInput;
    data: Prisma.XOR<Prisma.password_reset_codesUpdateManyMutationInput, Prisma.password_reset_codesUncheckedUpdateManyWithoutUsersInput>;
};
export type password_reset_codesScalarWhereInput = {
    AND?: Prisma.password_reset_codesScalarWhereInput | Prisma.password_reset_codesScalarWhereInput[];
    OR?: Prisma.password_reset_codesScalarWhereInput[];
    NOT?: Prisma.password_reset_codesScalarWhereInput | Prisma.password_reset_codesScalarWhereInput[];
    id?: Prisma.BigIntFilter<"password_reset_codes"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"password_reset_codes"> | bigint | number;
    code_hash?: Prisma.StringFilter<"password_reset_codes"> | string;
    expires_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
    consumed_at?: Prisma.DateTimeNullableFilter<"password_reset_codes"> | Date | string | null;
    attempts?: Prisma.IntFilter<"password_reset_codes"> | number;
    requested_ip?: Prisma.StringNullableFilter<"password_reset_codes"> | string | null;
    created_at?: Prisma.DateTimeFilter<"password_reset_codes"> | Date | string;
};
export type password_reset_codesCreateManyUsersInput = {
    id?: bigint | number;
    code_hash: string;
    expires_at: Date | string;
    consumed_at?: Date | string | null;
    attempts?: number;
    requested_ip?: string | null;
    created_at?: Date | string;
};
export type password_reset_codesUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    code_hash?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    consumed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    requested_ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type password_reset_codesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    code_hash?: boolean;
    expires_at?: boolean;
    consumed_at?: boolean;
    attempts?: boolean;
    requested_ip?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["password_reset_codes"]>;
export type password_reset_codesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    code_hash?: boolean;
    expires_at?: boolean;
    consumed_at?: boolean;
    attempts?: boolean;
    requested_ip?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["password_reset_codes"]>;
export type password_reset_codesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    code_hash?: boolean;
    expires_at?: boolean;
    consumed_at?: boolean;
    attempts?: boolean;
    requested_ip?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["password_reset_codes"]>;
export type password_reset_codesSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    code_hash?: boolean;
    expires_at?: boolean;
    consumed_at?: boolean;
    attempts?: boolean;
    requested_ip?: boolean;
    created_at?: boolean;
};
export type password_reset_codesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "code_hash" | "expires_at" | "consumed_at" | "attempts" | "requested_ip" | "created_at", ExtArgs["result"]["password_reset_codes"]>;
export type password_reset_codesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type password_reset_codesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type password_reset_codesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $password_reset_codesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "password_reset_codes";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        user_id: bigint;
        code_hash: string;
        expires_at: Date;
        consumed_at: Date | null;
        attempts: number;
        requested_ip: string | null;
        created_at: Date;
    }, ExtArgs["result"]["password_reset_codes"]>;
    composites: {};
};
export type password_reset_codesGetPayload<S extends boolean | null | undefined | password_reset_codesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload, S>;
export type password_reset_codesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<password_reset_codesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Password_reset_codesCountAggregateInputType | true;
};
export interface password_reset_codesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['password_reset_codes'];
        meta: {
            name: 'password_reset_codes';
        };
    };
    findUnique<T extends password_reset_codesFindUniqueArgs>(args: Prisma.SelectSubset<T, password_reset_codesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends password_reset_codesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, password_reset_codesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends password_reset_codesFindFirstArgs>(args?: Prisma.SelectSubset<T, password_reset_codesFindFirstArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends password_reset_codesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, password_reset_codesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends password_reset_codesFindManyArgs>(args?: Prisma.SelectSubset<T, password_reset_codesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends password_reset_codesCreateArgs>(args: Prisma.SelectSubset<T, password_reset_codesCreateArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends password_reset_codesCreateManyArgs>(args?: Prisma.SelectSubset<T, password_reset_codesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends password_reset_codesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, password_reset_codesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends password_reset_codesDeleteArgs>(args: Prisma.SelectSubset<T, password_reset_codesDeleteArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends password_reset_codesUpdateArgs>(args: Prisma.SelectSubset<T, password_reset_codesUpdateArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends password_reset_codesDeleteManyArgs>(args?: Prisma.SelectSubset<T, password_reset_codesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends password_reset_codesUpdateManyArgs>(args: Prisma.SelectSubset<T, password_reset_codesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends password_reset_codesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, password_reset_codesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends password_reset_codesUpsertArgs>(args: Prisma.SelectSubset<T, password_reset_codesUpsertArgs<ExtArgs>>): Prisma.Prisma__password_reset_codesClient<runtime.Types.Result.GetResult<Prisma.$password_reset_codesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends password_reset_codesCountArgs>(args?: Prisma.Subset<T, password_reset_codesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Password_reset_codesCountAggregateOutputType> : number>;
    aggregate<T extends Password_reset_codesAggregateArgs>(args: Prisma.Subset<T, Password_reset_codesAggregateArgs>): Prisma.PrismaPromise<GetPassword_reset_codesAggregateType<T>>;
    groupBy<T extends password_reset_codesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: password_reset_codesGroupByArgs['orderBy'];
    } : {
        orderBy?: password_reset_codesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, password_reset_codesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassword_reset_codesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: password_reset_codesFieldRefs;
}
export interface Prisma__password_reset_codesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface password_reset_codesFieldRefs {
    readonly id: Prisma.FieldRef<"password_reset_codes", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"password_reset_codes", 'BigInt'>;
    readonly code_hash: Prisma.FieldRef<"password_reset_codes", 'String'>;
    readonly expires_at: Prisma.FieldRef<"password_reset_codes", 'DateTime'>;
    readonly consumed_at: Prisma.FieldRef<"password_reset_codes", 'DateTime'>;
    readonly attempts: Prisma.FieldRef<"password_reset_codes", 'Int'>;
    readonly requested_ip: Prisma.FieldRef<"password_reset_codes", 'String'>;
    readonly created_at: Prisma.FieldRef<"password_reset_codes", 'DateTime'>;
}
export type password_reset_codesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where: Prisma.password_reset_codesWhereUniqueInput;
};
export type password_reset_codesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where: Prisma.password_reset_codesWhereUniqueInput;
};
export type password_reset_codesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where?: Prisma.password_reset_codesWhereInput;
    orderBy?: Prisma.password_reset_codesOrderByWithRelationInput | Prisma.password_reset_codesOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_codesScalarFieldEnum | Prisma.Password_reset_codesScalarFieldEnum[];
};
export type password_reset_codesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where?: Prisma.password_reset_codesWhereInput;
    orderBy?: Prisma.password_reset_codesOrderByWithRelationInput | Prisma.password_reset_codesOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_codesScalarFieldEnum | Prisma.Password_reset_codesScalarFieldEnum[];
};
export type password_reset_codesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where?: Prisma.password_reset_codesWhereInput;
    orderBy?: Prisma.password_reset_codesOrderByWithRelationInput | Prisma.password_reset_codesOrderByWithRelationInput[];
    cursor?: Prisma.password_reset_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Password_reset_codesScalarFieldEnum | Prisma.Password_reset_codesScalarFieldEnum[];
};
export type password_reset_codesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_codesCreateInput, Prisma.password_reset_codesUncheckedCreateInput>;
};
export type password_reset_codesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.password_reset_codesCreateManyInput | Prisma.password_reset_codesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type password_reset_codesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    data: Prisma.password_reset_codesCreateManyInput | Prisma.password_reset_codesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.password_reset_codesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type password_reset_codesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_codesUpdateInput, Prisma.password_reset_codesUncheckedUpdateInput>;
    where: Prisma.password_reset_codesWhereUniqueInput;
};
export type password_reset_codesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.password_reset_codesUpdateManyMutationInput, Prisma.password_reset_codesUncheckedUpdateManyInput>;
    where?: Prisma.password_reset_codesWhereInput;
    limit?: number;
};
export type password_reset_codesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.password_reset_codesUpdateManyMutationInput, Prisma.password_reset_codesUncheckedUpdateManyInput>;
    where?: Prisma.password_reset_codesWhereInput;
    limit?: number;
    include?: Prisma.password_reset_codesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type password_reset_codesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where: Prisma.password_reset_codesWhereUniqueInput;
    create: Prisma.XOR<Prisma.password_reset_codesCreateInput, Prisma.password_reset_codesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.password_reset_codesUpdateInput, Prisma.password_reset_codesUncheckedUpdateInput>;
};
export type password_reset_codesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
    where: Prisma.password_reset_codesWhereUniqueInput;
};
export type password_reset_codesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.password_reset_codesWhereInput;
    limit?: number;
};
export type password_reset_codesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.password_reset_codesSelect<ExtArgs> | null;
    omit?: Prisma.password_reset_codesOmit<ExtArgs> | null;
    include?: Prisma.password_reset_codesInclude<ExtArgs> | null;
};
