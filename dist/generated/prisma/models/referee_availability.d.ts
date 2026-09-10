import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type referee_availabilityModel = runtime.Types.Result.DefaultSelection<Prisma.$referee_availabilityPayload>;
export type AggregateReferee_availability = {
    _count: Referee_availabilityCountAggregateOutputType | null;
    _avg: Referee_availabilityAvgAggregateOutputType | null;
    _sum: Referee_availabilitySumAggregateOutputType | null;
    _min: Referee_availabilityMinAggregateOutputType | null;
    _max: Referee_availabilityMaxAggregateOutputType | null;
};
export type Referee_availabilityAvgAggregateOutputType = {
    id: number | null;
    referee_id: number | null;
};
export type Referee_availabilitySumAggregateOutputType = {
    id: bigint | null;
    referee_id: bigint | null;
};
export type Referee_availabilityMinAggregateOutputType = {
    id: bigint | null;
    referee_id: bigint | null;
    starts_at: Date | null;
    ends_at: Date | null;
    notes: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Referee_availabilityMaxAggregateOutputType = {
    id: bigint | null;
    referee_id: bigint | null;
    starts_at: Date | null;
    ends_at: Date | null;
    notes: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Referee_availabilityCountAggregateOutputType = {
    id: number;
    referee_id: number;
    starts_at: number;
    ends_at: number;
    notes: number;
    status: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Referee_availabilityAvgAggregateInputType = {
    id?: true;
    referee_id?: true;
};
export type Referee_availabilitySumAggregateInputType = {
    id?: true;
    referee_id?: true;
};
export type Referee_availabilityMinAggregateInputType = {
    id?: true;
    referee_id?: true;
    starts_at?: true;
    ends_at?: true;
    notes?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type Referee_availabilityMaxAggregateInputType = {
    id?: true;
    referee_id?: true;
    starts_at?: true;
    ends_at?: true;
    notes?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type Referee_availabilityCountAggregateInputType = {
    id?: true;
    referee_id?: true;
    starts_at?: true;
    ends_at?: true;
    notes?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Referee_availabilityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_availabilityWhereInput;
    orderBy?: Prisma.referee_availabilityOrderByWithRelationInput | Prisma.referee_availabilityOrderByWithRelationInput[];
    cursor?: Prisma.referee_availabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Referee_availabilityCountAggregateInputType;
    _avg?: Referee_availabilityAvgAggregateInputType;
    _sum?: Referee_availabilitySumAggregateInputType;
    _min?: Referee_availabilityMinAggregateInputType;
    _max?: Referee_availabilityMaxAggregateInputType;
};
export type GetReferee_availabilityAggregateType<T extends Referee_availabilityAggregateArgs> = {
    [P in keyof T & keyof AggregateReferee_availability]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReferee_availability[P]> : Prisma.GetScalarType<T[P], AggregateReferee_availability[P]>;
};
export type referee_availabilityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_availabilityWhereInput;
    orderBy?: Prisma.referee_availabilityOrderByWithAggregationInput | Prisma.referee_availabilityOrderByWithAggregationInput[];
    by: Prisma.Referee_availabilityScalarFieldEnum[] | Prisma.Referee_availabilityScalarFieldEnum;
    having?: Prisma.referee_availabilityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Referee_availabilityCountAggregateInputType | true;
    _avg?: Referee_availabilityAvgAggregateInputType;
    _sum?: Referee_availabilitySumAggregateInputType;
    _min?: Referee_availabilityMinAggregateInputType;
    _max?: Referee_availabilityMaxAggregateInputType;
};
export type Referee_availabilityGroupByOutputType = {
    id: bigint;
    referee_id: bigint;
    starts_at: Date;
    ends_at: Date;
    notes: string | null;
    status: string;
    created_at: Date;
    updated_at: Date;
    _count: Referee_availabilityCountAggregateOutputType | null;
    _avg: Referee_availabilityAvgAggregateOutputType | null;
    _sum: Referee_availabilitySumAggregateOutputType | null;
    _min: Referee_availabilityMinAggregateOutputType | null;
    _max: Referee_availabilityMaxAggregateOutputType | null;
};
export type GetReferee_availabilityGroupByPayload<T extends referee_availabilityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Referee_availabilityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Referee_availabilityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Referee_availabilityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Referee_availabilityGroupByOutputType[P]>;
}>>;
export type referee_availabilityWhereInput = {
    AND?: Prisma.referee_availabilityWhereInput | Prisma.referee_availabilityWhereInput[];
    OR?: Prisma.referee_availabilityWhereInput[];
    NOT?: Prisma.referee_availabilityWhereInput | Prisma.referee_availabilityWhereInput[];
    id?: Prisma.BigIntFilter<"referee_availability"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"referee_availability"> | bigint | number;
    starts_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    ends_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    notes?: Prisma.StringNullableFilter<"referee_availability"> | string | null;
    status?: Prisma.StringFilter<"referee_availability"> | string;
    created_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    referee?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type referee_availabilityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    starts_at?: Prisma.SortOrder;
    ends_at?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    referee?: Prisma.usersOrderByWithRelationInput;
};
export type referee_availabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.referee_availabilityWhereInput | Prisma.referee_availabilityWhereInput[];
    OR?: Prisma.referee_availabilityWhereInput[];
    NOT?: Prisma.referee_availabilityWhereInput | Prisma.referee_availabilityWhereInput[];
    referee_id?: Prisma.BigIntFilter<"referee_availability"> | bigint | number;
    starts_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    ends_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    notes?: Prisma.StringNullableFilter<"referee_availability"> | string | null;
    status?: Prisma.StringFilter<"referee_availability"> | string;
    created_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    referee?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type referee_availabilityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    starts_at?: Prisma.SortOrder;
    ends_at?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.referee_availabilityCountOrderByAggregateInput;
    _avg?: Prisma.referee_availabilityAvgOrderByAggregateInput;
    _max?: Prisma.referee_availabilityMaxOrderByAggregateInput;
    _min?: Prisma.referee_availabilityMinOrderByAggregateInput;
    _sum?: Prisma.referee_availabilitySumOrderByAggregateInput;
};
export type referee_availabilityScalarWhereWithAggregatesInput = {
    AND?: Prisma.referee_availabilityScalarWhereWithAggregatesInput | Prisma.referee_availabilityScalarWhereWithAggregatesInput[];
    OR?: Prisma.referee_availabilityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.referee_availabilityScalarWhereWithAggregatesInput | Prisma.referee_availabilityScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"referee_availability"> | bigint | number;
    referee_id?: Prisma.BigIntWithAggregatesFilter<"referee_availability"> | bigint | number;
    starts_at?: Prisma.DateTimeWithAggregatesFilter<"referee_availability"> | Date | string;
    ends_at?: Prisma.DateTimeWithAggregatesFilter<"referee_availability"> | Date | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"referee_availability"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"referee_availability"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"referee_availability"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"referee_availability"> | Date | string;
};
export type referee_availabilityCreateInput = {
    id?: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    referee: Prisma.usersCreateNestedOneWithoutReferee_availabilityInput;
};
export type referee_availabilityUncheckedCreateInput = {
    id?: bigint | number;
    referee_id: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type referee_availabilityUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referee?: Prisma.usersUpdateOneRequiredWithoutReferee_availabilityNestedInput;
};
export type referee_availabilityUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilityCreateManyInput = {
    id?: bigint | number;
    referee_id: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type referee_availabilityUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilityUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    referee_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    starts_at?: Prisma.SortOrder;
    ends_at?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type referee_availabilityAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
};
export type referee_availabilityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    starts_at?: Prisma.SortOrder;
    ends_at?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type referee_availabilityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
    starts_at?: Prisma.SortOrder;
    ends_at?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type referee_availabilitySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    referee_id?: Prisma.SortOrder;
};
export type Referee_availabilityListRelationFilter = {
    every?: Prisma.referee_availabilityWhereInput;
    some?: Prisma.referee_availabilityWhereInput;
    none?: Prisma.referee_availabilityWhereInput;
};
export type referee_availabilityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type referee_availabilityCreateNestedManyWithoutRefereeInput = {
    create?: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput> | Prisma.referee_availabilityCreateWithoutRefereeInput[] | Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput[];
    connectOrCreate?: Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput | Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput[];
    createMany?: Prisma.referee_availabilityCreateManyRefereeInputEnvelope;
    connect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
};
export type referee_availabilityUncheckedCreateNestedManyWithoutRefereeInput = {
    create?: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput> | Prisma.referee_availabilityCreateWithoutRefereeInput[] | Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput[];
    connectOrCreate?: Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput | Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput[];
    createMany?: Prisma.referee_availabilityCreateManyRefereeInputEnvelope;
    connect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
};
export type referee_availabilityUpdateManyWithoutRefereeNestedInput = {
    create?: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput> | Prisma.referee_availabilityCreateWithoutRefereeInput[] | Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput[];
    connectOrCreate?: Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput | Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput[];
    upsert?: Prisma.referee_availabilityUpsertWithWhereUniqueWithoutRefereeInput | Prisma.referee_availabilityUpsertWithWhereUniqueWithoutRefereeInput[];
    createMany?: Prisma.referee_availabilityCreateManyRefereeInputEnvelope;
    set?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    disconnect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    delete?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    connect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    update?: Prisma.referee_availabilityUpdateWithWhereUniqueWithoutRefereeInput | Prisma.referee_availabilityUpdateWithWhereUniqueWithoutRefereeInput[];
    updateMany?: Prisma.referee_availabilityUpdateManyWithWhereWithoutRefereeInput | Prisma.referee_availabilityUpdateManyWithWhereWithoutRefereeInput[];
    deleteMany?: Prisma.referee_availabilityScalarWhereInput | Prisma.referee_availabilityScalarWhereInput[];
};
export type referee_availabilityUncheckedUpdateManyWithoutRefereeNestedInput = {
    create?: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput> | Prisma.referee_availabilityCreateWithoutRefereeInput[] | Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput[];
    connectOrCreate?: Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput | Prisma.referee_availabilityCreateOrConnectWithoutRefereeInput[];
    upsert?: Prisma.referee_availabilityUpsertWithWhereUniqueWithoutRefereeInput | Prisma.referee_availabilityUpsertWithWhereUniqueWithoutRefereeInput[];
    createMany?: Prisma.referee_availabilityCreateManyRefereeInputEnvelope;
    set?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    disconnect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    delete?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    connect?: Prisma.referee_availabilityWhereUniqueInput | Prisma.referee_availabilityWhereUniqueInput[];
    update?: Prisma.referee_availabilityUpdateWithWhereUniqueWithoutRefereeInput | Prisma.referee_availabilityUpdateWithWhereUniqueWithoutRefereeInput[];
    updateMany?: Prisma.referee_availabilityUpdateManyWithWhereWithoutRefereeInput | Prisma.referee_availabilityUpdateManyWithWhereWithoutRefereeInput[];
    deleteMany?: Prisma.referee_availabilityScalarWhereInput | Prisma.referee_availabilityScalarWhereInput[];
};
export type referee_availabilityCreateWithoutRefereeInput = {
    id?: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type referee_availabilityUncheckedCreateWithoutRefereeInput = {
    id?: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type referee_availabilityCreateOrConnectWithoutRefereeInput = {
    where: Prisma.referee_availabilityWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput>;
};
export type referee_availabilityCreateManyRefereeInputEnvelope = {
    data: Prisma.referee_availabilityCreateManyRefereeInput | Prisma.referee_availabilityCreateManyRefereeInput[];
    skipDuplicates?: boolean;
};
export type referee_availabilityUpsertWithWhereUniqueWithoutRefereeInput = {
    where: Prisma.referee_availabilityWhereUniqueInput;
    update: Prisma.XOR<Prisma.referee_availabilityUpdateWithoutRefereeInput, Prisma.referee_availabilityUncheckedUpdateWithoutRefereeInput>;
    create: Prisma.XOR<Prisma.referee_availabilityCreateWithoutRefereeInput, Prisma.referee_availabilityUncheckedCreateWithoutRefereeInput>;
};
export type referee_availabilityUpdateWithWhereUniqueWithoutRefereeInput = {
    where: Prisma.referee_availabilityWhereUniqueInput;
    data: Prisma.XOR<Prisma.referee_availabilityUpdateWithoutRefereeInput, Prisma.referee_availabilityUncheckedUpdateWithoutRefereeInput>;
};
export type referee_availabilityUpdateManyWithWhereWithoutRefereeInput = {
    where: Prisma.referee_availabilityScalarWhereInput;
    data: Prisma.XOR<Prisma.referee_availabilityUpdateManyMutationInput, Prisma.referee_availabilityUncheckedUpdateManyWithoutRefereeInput>;
};
export type referee_availabilityScalarWhereInput = {
    AND?: Prisma.referee_availabilityScalarWhereInput | Prisma.referee_availabilityScalarWhereInput[];
    OR?: Prisma.referee_availabilityScalarWhereInput[];
    NOT?: Prisma.referee_availabilityScalarWhereInput | Prisma.referee_availabilityScalarWhereInput[];
    id?: Prisma.BigIntFilter<"referee_availability"> | bigint | number;
    referee_id?: Prisma.BigIntFilter<"referee_availability"> | bigint | number;
    starts_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    ends_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    notes?: Prisma.StringNullableFilter<"referee_availability"> | string | null;
    status?: Prisma.StringFilter<"referee_availability"> | string;
    created_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"referee_availability"> | Date | string;
};
export type referee_availabilityCreateManyRefereeInput = {
    id?: bigint | number;
    starts_at: Date | string;
    ends_at: Date | string;
    notes?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type referee_availabilityUpdateWithoutRefereeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilityUncheckedUpdateWithoutRefereeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilityUncheckedUpdateManyWithoutRefereeInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    starts_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ends_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type referee_availabilitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    referee_id?: boolean;
    starts_at?: boolean;
    ends_at?: boolean;
    notes?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_availability"]>;
export type referee_availabilitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    referee_id?: boolean;
    starts_at?: boolean;
    ends_at?: boolean;
    notes?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_availability"]>;
export type referee_availabilitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    referee_id?: boolean;
    starts_at?: boolean;
    ends_at?: boolean;
    notes?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["referee_availability"]>;
export type referee_availabilitySelectScalar = {
    id?: boolean;
    referee_id?: boolean;
    starts_at?: boolean;
    ends_at?: boolean;
    notes?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type referee_availabilityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "referee_id" | "starts_at" | "ends_at" | "notes" | "status" | "created_at" | "updated_at", ExtArgs["result"]["referee_availability"]>;
export type referee_availabilityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type referee_availabilityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type referee_availabilityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    referee?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $referee_availabilityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "referee_availability";
    objects: {
        referee: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        referee_id: bigint;
        starts_at: Date;
        ends_at: Date;
        notes: string | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["referee_availability"]>;
    composites: {};
};
export type referee_availabilityGetPayload<S extends boolean | null | undefined | referee_availabilityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload, S>;
export type referee_availabilityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<referee_availabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Referee_availabilityCountAggregateInputType | true;
};
export interface referee_availabilityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['referee_availability'];
        meta: {
            name: 'referee_availability';
        };
    };
    findUnique<T extends referee_availabilityFindUniqueArgs>(args: Prisma.SelectSubset<T, referee_availabilityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends referee_availabilityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, referee_availabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends referee_availabilityFindFirstArgs>(args?: Prisma.SelectSubset<T, referee_availabilityFindFirstArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends referee_availabilityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, referee_availabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends referee_availabilityFindManyArgs>(args?: Prisma.SelectSubset<T, referee_availabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends referee_availabilityCreateArgs>(args: Prisma.SelectSubset<T, referee_availabilityCreateArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends referee_availabilityCreateManyArgs>(args?: Prisma.SelectSubset<T, referee_availabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends referee_availabilityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, referee_availabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends referee_availabilityDeleteArgs>(args: Prisma.SelectSubset<T, referee_availabilityDeleteArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends referee_availabilityUpdateArgs>(args: Prisma.SelectSubset<T, referee_availabilityUpdateArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends referee_availabilityDeleteManyArgs>(args?: Prisma.SelectSubset<T, referee_availabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends referee_availabilityUpdateManyArgs>(args: Prisma.SelectSubset<T, referee_availabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends referee_availabilityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, referee_availabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends referee_availabilityUpsertArgs>(args: Prisma.SelectSubset<T, referee_availabilityUpsertArgs<ExtArgs>>): Prisma.Prisma__referee_availabilityClient<runtime.Types.Result.GetResult<Prisma.$referee_availabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends referee_availabilityCountArgs>(args?: Prisma.Subset<T, referee_availabilityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Referee_availabilityCountAggregateOutputType> : number>;
    aggregate<T extends Referee_availabilityAggregateArgs>(args: Prisma.Subset<T, Referee_availabilityAggregateArgs>): Prisma.PrismaPromise<GetReferee_availabilityAggregateType<T>>;
    groupBy<T extends referee_availabilityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: referee_availabilityGroupByArgs['orderBy'];
    } : {
        orderBy?: referee_availabilityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, referee_availabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferee_availabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: referee_availabilityFieldRefs;
}
export interface Prisma__referee_availabilityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    referee<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface referee_availabilityFieldRefs {
    readonly id: Prisma.FieldRef<"referee_availability", 'BigInt'>;
    readonly referee_id: Prisma.FieldRef<"referee_availability", 'BigInt'>;
    readonly starts_at: Prisma.FieldRef<"referee_availability", 'DateTime'>;
    readonly ends_at: Prisma.FieldRef<"referee_availability", 'DateTime'>;
    readonly notes: Prisma.FieldRef<"referee_availability", 'String'>;
    readonly status: Prisma.FieldRef<"referee_availability", 'String'>;
    readonly created_at: Prisma.FieldRef<"referee_availability", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"referee_availability", 'DateTime'>;
}
export type referee_availabilityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where: Prisma.referee_availabilityWhereUniqueInput;
};
export type referee_availabilityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where: Prisma.referee_availabilityWhereUniqueInput;
};
export type referee_availabilityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where?: Prisma.referee_availabilityWhereInput;
    orderBy?: Prisma.referee_availabilityOrderByWithRelationInput | Prisma.referee_availabilityOrderByWithRelationInput[];
    cursor?: Prisma.referee_availabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_availabilityScalarFieldEnum | Prisma.Referee_availabilityScalarFieldEnum[];
};
export type referee_availabilityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where?: Prisma.referee_availabilityWhereInput;
    orderBy?: Prisma.referee_availabilityOrderByWithRelationInput | Prisma.referee_availabilityOrderByWithRelationInput[];
    cursor?: Prisma.referee_availabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_availabilityScalarFieldEnum | Prisma.Referee_availabilityScalarFieldEnum[];
};
export type referee_availabilityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where?: Prisma.referee_availabilityWhereInput;
    orderBy?: Prisma.referee_availabilityOrderByWithRelationInput | Prisma.referee_availabilityOrderByWithRelationInput[];
    cursor?: Prisma.referee_availabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Referee_availabilityScalarFieldEnum | Prisma.Referee_availabilityScalarFieldEnum[];
};
export type referee_availabilityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_availabilityCreateInput, Prisma.referee_availabilityUncheckedCreateInput>;
};
export type referee_availabilityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.referee_availabilityCreateManyInput | Prisma.referee_availabilityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type referee_availabilityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    data: Prisma.referee_availabilityCreateManyInput | Prisma.referee_availabilityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.referee_availabilityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type referee_availabilityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_availabilityUpdateInput, Prisma.referee_availabilityUncheckedUpdateInput>;
    where: Prisma.referee_availabilityWhereUniqueInput;
};
export type referee_availabilityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.referee_availabilityUpdateManyMutationInput, Prisma.referee_availabilityUncheckedUpdateManyInput>;
    where?: Prisma.referee_availabilityWhereInput;
    limit?: number;
};
export type referee_availabilityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.referee_availabilityUpdateManyMutationInput, Prisma.referee_availabilityUncheckedUpdateManyInput>;
    where?: Prisma.referee_availabilityWhereInput;
    limit?: number;
    include?: Prisma.referee_availabilityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type referee_availabilityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where: Prisma.referee_availabilityWhereUniqueInput;
    create: Prisma.XOR<Prisma.referee_availabilityCreateInput, Prisma.referee_availabilityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.referee_availabilityUpdateInput, Prisma.referee_availabilityUncheckedUpdateInput>;
};
export type referee_availabilityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
    where: Prisma.referee_availabilityWhereUniqueInput;
};
export type referee_availabilityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.referee_availabilityWhereInput;
    limit?: number;
};
export type referee_availabilityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.referee_availabilitySelect<ExtArgs> | null;
    omit?: Prisma.referee_availabilityOmit<ExtArgs> | null;
    include?: Prisma.referee_availabilityInclude<ExtArgs> | null;
};
