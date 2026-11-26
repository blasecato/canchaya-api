import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type competition_templatesModel = runtime.Types.Result.DefaultSelection<Prisma.$competition_templatesPayload>;
export type AggregateCompetition_templates = {
    _count: Competition_templatesCountAggregateOutputType | null;
    _avg: Competition_templatesAvgAggregateOutputType | null;
    _sum: Competition_templatesSumAggregateOutputType | null;
    _min: Competition_templatesMinAggregateOutputType | null;
    _max: Competition_templatesMaxAggregateOutputType | null;
};
export type Competition_templatesAvgAggregateOutputType = {
    id: number | null;
    association_id: number | null;
    created_by: number | null;
};
export type Competition_templatesSumAggregateOutputType = {
    id: bigint | null;
    association_id: bigint | null;
    created_by: bigint | null;
};
export type Competition_templatesMinAggregateOutputType = {
    id: bigint | null;
    association_id: bigint | null;
    name: string | null;
    description: string | null;
    mode: string | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Competition_templatesMaxAggregateOutputType = {
    id: bigint | null;
    association_id: bigint | null;
    name: string | null;
    description: string | null;
    mode: string | null;
    created_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Competition_templatesCountAggregateOutputType = {
    id: number;
    association_id: number;
    name: number;
    description: number;
    mode: number;
    blueprints: number;
    created_by: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Competition_templatesAvgAggregateInputType = {
    id?: true;
    association_id?: true;
    created_by?: true;
};
export type Competition_templatesSumAggregateInputType = {
    id?: true;
    association_id?: true;
    created_by?: true;
};
export type Competition_templatesMinAggregateInputType = {
    id?: true;
    association_id?: true;
    name?: true;
    description?: true;
    mode?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Competition_templatesMaxAggregateInputType = {
    id?: true;
    association_id?: true;
    name?: true;
    description?: true;
    mode?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Competition_templatesCountAggregateInputType = {
    id?: true;
    association_id?: true;
    name?: true;
    description?: true;
    mode?: true;
    blueprints?: true;
    created_by?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Competition_templatesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.competition_templatesWhereInput;
    orderBy?: Prisma.competition_templatesOrderByWithRelationInput | Prisma.competition_templatesOrderByWithRelationInput[];
    cursor?: Prisma.competition_templatesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Competition_templatesCountAggregateInputType;
    _avg?: Competition_templatesAvgAggregateInputType;
    _sum?: Competition_templatesSumAggregateInputType;
    _min?: Competition_templatesMinAggregateInputType;
    _max?: Competition_templatesMaxAggregateInputType;
};
export type GetCompetition_templatesAggregateType<T extends Competition_templatesAggregateArgs> = {
    [P in keyof T & keyof AggregateCompetition_templates]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompetition_templates[P]> : Prisma.GetScalarType<T[P], AggregateCompetition_templates[P]>;
};
export type competition_templatesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.competition_templatesWhereInput;
    orderBy?: Prisma.competition_templatesOrderByWithAggregationInput | Prisma.competition_templatesOrderByWithAggregationInput[];
    by: Prisma.Competition_templatesScalarFieldEnum[] | Prisma.Competition_templatesScalarFieldEnum;
    having?: Prisma.competition_templatesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Competition_templatesCountAggregateInputType | true;
    _avg?: Competition_templatesAvgAggregateInputType;
    _sum?: Competition_templatesSumAggregateInputType;
    _min?: Competition_templatesMinAggregateInputType;
    _max?: Competition_templatesMaxAggregateInputType;
};
export type Competition_templatesGroupByOutputType = {
    id: bigint;
    association_id: bigint | null;
    name: string;
    description: string | null;
    mode: string;
    blueprints: runtime.JsonValue;
    created_by: bigint;
    created_at: Date;
    updated_at: Date;
    _count: Competition_templatesCountAggregateOutputType | null;
    _avg: Competition_templatesAvgAggregateOutputType | null;
    _sum: Competition_templatesSumAggregateOutputType | null;
    _min: Competition_templatesMinAggregateOutputType | null;
    _max: Competition_templatesMaxAggregateOutputType | null;
};
export type GetCompetition_templatesGroupByPayload<T extends competition_templatesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Competition_templatesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Competition_templatesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Competition_templatesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Competition_templatesGroupByOutputType[P]>;
}>>;
export type competition_templatesWhereInput = {
    AND?: Prisma.competition_templatesWhereInput | Prisma.competition_templatesWhereInput[];
    OR?: Prisma.competition_templatesWhereInput[];
    NOT?: Prisma.competition_templatesWhereInput | Prisma.competition_templatesWhereInput[];
    id?: Prisma.BigIntFilter<"competition_templates"> | bigint | number;
    association_id?: Prisma.BigIntNullableFilter<"competition_templates"> | bigint | number | null;
    name?: Prisma.StringFilter<"competition_templates"> | string;
    description?: Prisma.StringNullableFilter<"competition_templates"> | string | null;
    mode?: Prisma.StringFilter<"competition_templates"> | string;
    blueprints?: Prisma.JsonFilter<"competition_templates">;
    created_by?: Prisma.BigIntFilter<"competition_templates"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
    associations?: Prisma.XOR<Prisma.AssociationsNullableScalarRelationFilter, Prisma.associationsWhereInput> | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type competition_templatesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    blueprints?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    associations?: Prisma.associationsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type competition_templatesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.competition_templatesWhereInput | Prisma.competition_templatesWhereInput[];
    OR?: Prisma.competition_templatesWhereInput[];
    NOT?: Prisma.competition_templatesWhereInput | Prisma.competition_templatesWhereInput[];
    association_id?: Prisma.BigIntNullableFilter<"competition_templates"> | bigint | number | null;
    name?: Prisma.StringFilter<"competition_templates"> | string;
    description?: Prisma.StringNullableFilter<"competition_templates"> | string | null;
    mode?: Prisma.StringFilter<"competition_templates"> | string;
    blueprints?: Prisma.JsonFilter<"competition_templates">;
    created_by?: Prisma.BigIntFilter<"competition_templates"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
    associations?: Prisma.XOR<Prisma.AssociationsNullableScalarRelationFilter, Prisma.associationsWhereInput> | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type competition_templatesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    blueprints?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.competition_templatesCountOrderByAggregateInput;
    _avg?: Prisma.competition_templatesAvgOrderByAggregateInput;
    _max?: Prisma.competition_templatesMaxOrderByAggregateInput;
    _min?: Prisma.competition_templatesMinOrderByAggregateInput;
    _sum?: Prisma.competition_templatesSumOrderByAggregateInput;
};
export type competition_templatesScalarWhereWithAggregatesInput = {
    AND?: Prisma.competition_templatesScalarWhereWithAggregatesInput | Prisma.competition_templatesScalarWhereWithAggregatesInput[];
    OR?: Prisma.competition_templatesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.competition_templatesScalarWhereWithAggregatesInput | Prisma.competition_templatesScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"competition_templates"> | bigint | number;
    association_id?: Prisma.BigIntNullableWithAggregatesFilter<"competition_templates"> | bigint | number | null;
    name?: Prisma.StringWithAggregatesFilter<"competition_templates"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"competition_templates"> | string | null;
    mode?: Prisma.StringWithAggregatesFilter<"competition_templates"> | string;
    blueprints?: Prisma.JsonWithAggregatesFilter<"competition_templates">;
    created_by?: Prisma.BigIntWithAggregatesFilter<"competition_templates"> | bigint | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"competition_templates"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"competition_templates"> | Date | string;
};
export type competition_templatesCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    updated_at?: Date | string;
    associations?: Prisma.associationsCreateNestedOneWithoutCompetition_templatesInput;
    users: Prisma.usersCreateNestedOneWithoutCompetition_templatesInput;
};
export type competition_templatesUncheckedCreateInput = {
    id?: bigint | number;
    association_id?: bigint | number | null;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    associations?: Prisma.associationsUpdateOneWithoutCompetition_templatesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutCompetition_templatesNestedInput;
};
export type competition_templatesUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    association_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesCreateManyInput = {
    id?: bigint | number;
    association_id?: bigint | number | null;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    association_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Competition_templatesListRelationFilter = {
    every?: Prisma.competition_templatesWhereInput;
    some?: Prisma.competition_templatesWhereInput;
    none?: Prisma.competition_templatesWhereInput;
};
export type competition_templatesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type competition_templatesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    blueprints?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type competition_templatesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type competition_templatesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type competition_templatesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type competition_templatesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    association_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type competition_templatesCreateNestedManyWithoutAssociationsInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput> | Prisma.competition_templatesCreateWithoutAssociationsInput[] | Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput | Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput[];
    createMany?: Prisma.competition_templatesCreateManyAssociationsInputEnvelope;
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
};
export type competition_templatesUncheckedCreateNestedManyWithoutAssociationsInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput> | Prisma.competition_templatesCreateWithoutAssociationsInput[] | Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput | Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput[];
    createMany?: Prisma.competition_templatesCreateManyAssociationsInputEnvelope;
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
};
export type competition_templatesUpdateManyWithoutAssociationsNestedInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput> | Prisma.competition_templatesCreateWithoutAssociationsInput[] | Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput | Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput[];
    upsert?: Prisma.competition_templatesUpsertWithWhereUniqueWithoutAssociationsInput | Prisma.competition_templatesUpsertWithWhereUniqueWithoutAssociationsInput[];
    createMany?: Prisma.competition_templatesCreateManyAssociationsInputEnvelope;
    set?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    disconnect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    delete?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    update?: Prisma.competition_templatesUpdateWithWhereUniqueWithoutAssociationsInput | Prisma.competition_templatesUpdateWithWhereUniqueWithoutAssociationsInput[];
    updateMany?: Prisma.competition_templatesUpdateManyWithWhereWithoutAssociationsInput | Prisma.competition_templatesUpdateManyWithWhereWithoutAssociationsInput[];
    deleteMany?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
};
export type competition_templatesUncheckedUpdateManyWithoutAssociationsNestedInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput> | Prisma.competition_templatesCreateWithoutAssociationsInput[] | Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput | Prisma.competition_templatesCreateOrConnectWithoutAssociationsInput[];
    upsert?: Prisma.competition_templatesUpsertWithWhereUniqueWithoutAssociationsInput | Prisma.competition_templatesUpsertWithWhereUniqueWithoutAssociationsInput[];
    createMany?: Prisma.competition_templatesCreateManyAssociationsInputEnvelope;
    set?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    disconnect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    delete?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    update?: Prisma.competition_templatesUpdateWithWhereUniqueWithoutAssociationsInput | Prisma.competition_templatesUpdateWithWhereUniqueWithoutAssociationsInput[];
    updateMany?: Prisma.competition_templatesUpdateManyWithWhereWithoutAssociationsInput | Prisma.competition_templatesUpdateManyWithWhereWithoutAssociationsInput[];
    deleteMany?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type competition_templatesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput> | Prisma.competition_templatesCreateWithoutUsersInput[] | Prisma.competition_templatesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutUsersInput | Prisma.competition_templatesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.competition_templatesCreateManyUsersInputEnvelope;
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
};
export type competition_templatesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput> | Prisma.competition_templatesCreateWithoutUsersInput[] | Prisma.competition_templatesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutUsersInput | Prisma.competition_templatesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.competition_templatesCreateManyUsersInputEnvelope;
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
};
export type competition_templatesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput> | Prisma.competition_templatesCreateWithoutUsersInput[] | Prisma.competition_templatesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutUsersInput | Prisma.competition_templatesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.competition_templatesUpsertWithWhereUniqueWithoutUsersInput | Prisma.competition_templatesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.competition_templatesCreateManyUsersInputEnvelope;
    set?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    disconnect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    delete?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    update?: Prisma.competition_templatesUpdateWithWhereUniqueWithoutUsersInput | Prisma.competition_templatesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.competition_templatesUpdateManyWithWhereWithoutUsersInput | Prisma.competition_templatesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
};
export type competition_templatesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput> | Prisma.competition_templatesCreateWithoutUsersInput[] | Prisma.competition_templatesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.competition_templatesCreateOrConnectWithoutUsersInput | Prisma.competition_templatesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.competition_templatesUpsertWithWhereUniqueWithoutUsersInput | Prisma.competition_templatesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.competition_templatesCreateManyUsersInputEnvelope;
    set?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    disconnect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    delete?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    connect?: Prisma.competition_templatesWhereUniqueInput | Prisma.competition_templatesWhereUniqueInput[];
    update?: Prisma.competition_templatesUpdateWithWhereUniqueWithoutUsersInput | Prisma.competition_templatesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.competition_templatesUpdateManyWithWhereWithoutUsersInput | Prisma.competition_templatesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
};
export type competition_templatesCreateWithoutAssociationsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutCompetition_templatesInput;
};
export type competition_templatesUncheckedCreateWithoutAssociationsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesCreateOrConnectWithoutAssociationsInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    create: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput>;
};
export type competition_templatesCreateManyAssociationsInputEnvelope = {
    data: Prisma.competition_templatesCreateManyAssociationsInput | Prisma.competition_templatesCreateManyAssociationsInput[];
    skipDuplicates?: boolean;
};
export type competition_templatesUpsertWithWhereUniqueWithoutAssociationsInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    update: Prisma.XOR<Prisma.competition_templatesUpdateWithoutAssociationsInput, Prisma.competition_templatesUncheckedUpdateWithoutAssociationsInput>;
    create: Prisma.XOR<Prisma.competition_templatesCreateWithoutAssociationsInput, Prisma.competition_templatesUncheckedCreateWithoutAssociationsInput>;
};
export type competition_templatesUpdateWithWhereUniqueWithoutAssociationsInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    data: Prisma.XOR<Prisma.competition_templatesUpdateWithoutAssociationsInput, Prisma.competition_templatesUncheckedUpdateWithoutAssociationsInput>;
};
export type competition_templatesUpdateManyWithWhereWithoutAssociationsInput = {
    where: Prisma.competition_templatesScalarWhereInput;
    data: Prisma.XOR<Prisma.competition_templatesUpdateManyMutationInput, Prisma.competition_templatesUncheckedUpdateManyWithoutAssociationsInput>;
};
export type competition_templatesScalarWhereInput = {
    AND?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
    OR?: Prisma.competition_templatesScalarWhereInput[];
    NOT?: Prisma.competition_templatesScalarWhereInput | Prisma.competition_templatesScalarWhereInput[];
    id?: Prisma.BigIntFilter<"competition_templates"> | bigint | number;
    association_id?: Prisma.BigIntNullableFilter<"competition_templates"> | bigint | number | null;
    name?: Prisma.StringFilter<"competition_templates"> | string;
    description?: Prisma.StringNullableFilter<"competition_templates"> | string | null;
    mode?: Prisma.StringFilter<"competition_templates"> | string;
    blueprints?: Prisma.JsonFilter<"competition_templates">;
    created_by?: Prisma.BigIntFilter<"competition_templates"> | bigint | number;
    created_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"competition_templates"> | Date | string;
};
export type competition_templatesCreateWithoutUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    updated_at?: Date | string;
    associations?: Prisma.associationsCreateNestedOneWithoutCompetition_templatesInput;
};
export type competition_templatesUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    association_id?: bigint | number | null;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesCreateOrConnectWithoutUsersInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    create: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput>;
};
export type competition_templatesCreateManyUsersInputEnvelope = {
    data: Prisma.competition_templatesCreateManyUsersInput | Prisma.competition_templatesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type competition_templatesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    update: Prisma.XOR<Prisma.competition_templatesUpdateWithoutUsersInput, Prisma.competition_templatesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.competition_templatesCreateWithoutUsersInput, Prisma.competition_templatesUncheckedCreateWithoutUsersInput>;
};
export type competition_templatesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.competition_templatesWhereUniqueInput;
    data: Prisma.XOR<Prisma.competition_templatesUpdateWithoutUsersInput, Prisma.competition_templatesUncheckedUpdateWithoutUsersInput>;
};
export type competition_templatesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.competition_templatesScalarWhereInput;
    data: Prisma.XOR<Prisma.competition_templatesUpdateManyMutationInput, Prisma.competition_templatesUncheckedUpdateManyWithoutUsersInput>;
};
export type competition_templatesCreateManyAssociationsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by: bigint | number;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesUpdateWithoutAssociationsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutCompetition_templatesNestedInput;
};
export type competition_templatesUncheckedUpdateWithoutAssociationsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesUncheckedUpdateManyWithoutAssociationsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesCreateManyUsersInput = {
    id?: bigint | number;
    association_id?: bigint | number | null;
    name: string;
    description?: string | null;
    mode?: string;
    blueprints: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type competition_templatesUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    associations?: Prisma.associationsUpdateOneWithoutCompetition_templatesNestedInput;
};
export type competition_templatesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    association_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    association_id?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    blueprints?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type competition_templatesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    association_id?: boolean;
    name?: boolean;
    description?: boolean;
    mode?: boolean;
    blueprints?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["competition_templates"]>;
export type competition_templatesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    association_id?: boolean;
    name?: boolean;
    description?: boolean;
    mode?: boolean;
    blueprints?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["competition_templates"]>;
export type competition_templatesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    association_id?: boolean;
    name?: boolean;
    description?: boolean;
    mode?: boolean;
    blueprints?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["competition_templates"]>;
export type competition_templatesSelectScalar = {
    id?: boolean;
    association_id?: boolean;
    name?: boolean;
    description?: boolean;
    mode?: boolean;
    blueprints?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type competition_templatesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "association_id" | "name" | "description" | "mode" | "blueprints" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["competition_templates"]>;
export type competition_templatesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type competition_templatesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type competition_templatesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.competition_templates$associationsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $competition_templatesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "competition_templates";
    objects: {
        associations: Prisma.$associationsPayload<ExtArgs> | null;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        association_id: bigint | null;
        name: string;
        description: string | null;
        mode: string;
        blueprints: runtime.JsonValue;
        created_by: bigint;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["competition_templates"]>;
    composites: {};
};
export type competition_templatesGetPayload<S extends boolean | null | undefined | competition_templatesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload, S>;
export type competition_templatesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<competition_templatesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Competition_templatesCountAggregateInputType | true;
};
export interface competition_templatesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['competition_templates'];
        meta: {
            name: 'competition_templates';
        };
    };
    findUnique<T extends competition_templatesFindUniqueArgs>(args: Prisma.SelectSubset<T, competition_templatesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends competition_templatesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, competition_templatesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends competition_templatesFindFirstArgs>(args?: Prisma.SelectSubset<T, competition_templatesFindFirstArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends competition_templatesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, competition_templatesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends competition_templatesFindManyArgs>(args?: Prisma.SelectSubset<T, competition_templatesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends competition_templatesCreateArgs>(args: Prisma.SelectSubset<T, competition_templatesCreateArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends competition_templatesCreateManyArgs>(args?: Prisma.SelectSubset<T, competition_templatesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends competition_templatesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, competition_templatesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends competition_templatesDeleteArgs>(args: Prisma.SelectSubset<T, competition_templatesDeleteArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends competition_templatesUpdateArgs>(args: Prisma.SelectSubset<T, competition_templatesUpdateArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends competition_templatesDeleteManyArgs>(args?: Prisma.SelectSubset<T, competition_templatesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends competition_templatesUpdateManyArgs>(args: Prisma.SelectSubset<T, competition_templatesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends competition_templatesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, competition_templatesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends competition_templatesUpsertArgs>(args: Prisma.SelectSubset<T, competition_templatesUpsertArgs<ExtArgs>>): Prisma.Prisma__competition_templatesClient<runtime.Types.Result.GetResult<Prisma.$competition_templatesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends competition_templatesCountArgs>(args?: Prisma.Subset<T, competition_templatesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Competition_templatesCountAggregateOutputType> : number>;
    aggregate<T extends Competition_templatesAggregateArgs>(args: Prisma.Subset<T, Competition_templatesAggregateArgs>): Prisma.PrismaPromise<GetCompetition_templatesAggregateType<T>>;
    groupBy<T extends competition_templatesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: competition_templatesGroupByArgs['orderBy'];
    } : {
        orderBy?: competition_templatesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, competition_templatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompetition_templatesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: competition_templatesFieldRefs;
}
export interface Prisma__competition_templatesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    associations<T extends Prisma.competition_templates$associationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.competition_templates$associationsArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface competition_templatesFieldRefs {
    readonly id: Prisma.FieldRef<"competition_templates", 'BigInt'>;
    readonly association_id: Prisma.FieldRef<"competition_templates", 'BigInt'>;
    readonly name: Prisma.FieldRef<"competition_templates", 'String'>;
    readonly description: Prisma.FieldRef<"competition_templates", 'String'>;
    readonly mode: Prisma.FieldRef<"competition_templates", 'String'>;
    readonly blueprints: Prisma.FieldRef<"competition_templates", 'Json'>;
    readonly created_by: Prisma.FieldRef<"competition_templates", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"competition_templates", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"competition_templates", 'DateTime'>;
}
export type competition_templatesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where: Prisma.competition_templatesWhereUniqueInput;
};
export type competition_templatesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where: Prisma.competition_templatesWhereUniqueInput;
};
export type competition_templatesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where?: Prisma.competition_templatesWhereInput;
    orderBy?: Prisma.competition_templatesOrderByWithRelationInput | Prisma.competition_templatesOrderByWithRelationInput[];
    cursor?: Prisma.competition_templatesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Competition_templatesScalarFieldEnum | Prisma.Competition_templatesScalarFieldEnum[];
};
export type competition_templatesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where?: Prisma.competition_templatesWhereInput;
    orderBy?: Prisma.competition_templatesOrderByWithRelationInput | Prisma.competition_templatesOrderByWithRelationInput[];
    cursor?: Prisma.competition_templatesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Competition_templatesScalarFieldEnum | Prisma.Competition_templatesScalarFieldEnum[];
};
export type competition_templatesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where?: Prisma.competition_templatesWhereInput;
    orderBy?: Prisma.competition_templatesOrderByWithRelationInput | Prisma.competition_templatesOrderByWithRelationInput[];
    cursor?: Prisma.competition_templatesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Competition_templatesScalarFieldEnum | Prisma.Competition_templatesScalarFieldEnum[];
};
export type competition_templatesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.competition_templatesCreateInput, Prisma.competition_templatesUncheckedCreateInput>;
};
export type competition_templatesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.competition_templatesCreateManyInput | Prisma.competition_templatesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type competition_templatesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    data: Prisma.competition_templatesCreateManyInput | Prisma.competition_templatesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.competition_templatesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type competition_templatesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.competition_templatesUpdateInput, Prisma.competition_templatesUncheckedUpdateInput>;
    where: Prisma.competition_templatesWhereUniqueInput;
};
export type competition_templatesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.competition_templatesUpdateManyMutationInput, Prisma.competition_templatesUncheckedUpdateManyInput>;
    where?: Prisma.competition_templatesWhereInput;
    limit?: number;
};
export type competition_templatesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.competition_templatesUpdateManyMutationInput, Prisma.competition_templatesUncheckedUpdateManyInput>;
    where?: Prisma.competition_templatesWhereInput;
    limit?: number;
    include?: Prisma.competition_templatesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type competition_templatesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where: Prisma.competition_templatesWhereUniqueInput;
    create: Prisma.XOR<Prisma.competition_templatesCreateInput, Prisma.competition_templatesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.competition_templatesUpdateInput, Prisma.competition_templatesUncheckedUpdateInput>;
};
export type competition_templatesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
    where: Prisma.competition_templatesWhereUniqueInput;
};
export type competition_templatesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.competition_templatesWhereInput;
    limit?: number;
};
export type competition_templates$associationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where?: Prisma.associationsWhereInput;
};
export type competition_templatesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.competition_templatesSelect<ExtArgs> | null;
    omit?: Prisma.competition_templatesOmit<ExtArgs> | null;
    include?: Prisma.competition_templatesInclude<ExtArgs> | null;
};
