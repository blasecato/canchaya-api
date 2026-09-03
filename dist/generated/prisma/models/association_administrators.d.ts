import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type association_administratorsModel = runtime.Types.Result.DefaultSelection<Prisma.$association_administratorsPayload>;
export type AggregateAssociation_administrators = {
    _count: Association_administratorsCountAggregateOutputType | null;
    _avg: Association_administratorsAvgAggregateOutputType | null;
    _sum: Association_administratorsSumAggregateOutputType | null;
    _min: Association_administratorsMinAggregateOutputType | null;
    _max: Association_administratorsMaxAggregateOutputType | null;
};
export type Association_administratorsAvgAggregateOutputType = {
    association_id: number | null;
    user_id: number | null;
};
export type Association_administratorsSumAggregateOutputType = {
    association_id: bigint | null;
    user_id: bigint | null;
};
export type Association_administratorsMinAggregateOutputType = {
    association_id: bigint | null;
    user_id: bigint | null;
    permission_level: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Association_administratorsMaxAggregateOutputType = {
    association_id: bigint | null;
    user_id: bigint | null;
    permission_level: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Association_administratorsCountAggregateOutputType = {
    association_id: number;
    user_id: number;
    permission_level: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Association_administratorsAvgAggregateInputType = {
    association_id?: true;
    user_id?: true;
};
export type Association_administratorsSumAggregateInputType = {
    association_id?: true;
    user_id?: true;
};
export type Association_administratorsMinAggregateInputType = {
    association_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
};
export type Association_administratorsMaxAggregateInputType = {
    association_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
};
export type Association_administratorsCountAggregateInputType = {
    association_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Association_administratorsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.association_administratorsWhereInput;
    orderBy?: Prisma.association_administratorsOrderByWithRelationInput | Prisma.association_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.association_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Association_administratorsCountAggregateInputType;
    _avg?: Association_administratorsAvgAggregateInputType;
    _sum?: Association_administratorsSumAggregateInputType;
    _min?: Association_administratorsMinAggregateInputType;
    _max?: Association_administratorsMaxAggregateInputType;
};
export type GetAssociation_administratorsAggregateType<T extends Association_administratorsAggregateArgs> = {
    [P in keyof T & keyof AggregateAssociation_administrators]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssociation_administrators[P]> : Prisma.GetScalarType<T[P], AggregateAssociation_administrators[P]>;
};
export type association_administratorsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.association_administratorsWhereInput;
    orderBy?: Prisma.association_administratorsOrderByWithAggregationInput | Prisma.association_administratorsOrderByWithAggregationInput[];
    by: Prisma.Association_administratorsScalarFieldEnum[] | Prisma.Association_administratorsScalarFieldEnum;
    having?: Prisma.association_administratorsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Association_administratorsCountAggregateInputType | true;
    _avg?: Association_administratorsAvgAggregateInputType;
    _sum?: Association_administratorsSumAggregateInputType;
    _min?: Association_administratorsMinAggregateInputType;
    _max?: Association_administratorsMaxAggregateInputType;
};
export type Association_administratorsGroupByOutputType = {
    association_id: bigint;
    user_id: bigint;
    permission_level: string;
    status: string;
    created_at: Date;
    _count: Association_administratorsCountAggregateOutputType | null;
    _avg: Association_administratorsAvgAggregateOutputType | null;
    _sum: Association_administratorsSumAggregateOutputType | null;
    _min: Association_administratorsMinAggregateOutputType | null;
    _max: Association_administratorsMaxAggregateOutputType | null;
};
export type GetAssociation_administratorsGroupByPayload<T extends association_administratorsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Association_administratorsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Association_administratorsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Association_administratorsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Association_administratorsGroupByOutputType[P]>;
}>>;
export type association_administratorsWhereInput = {
    AND?: Prisma.association_administratorsWhereInput | Prisma.association_administratorsWhereInput[];
    OR?: Prisma.association_administratorsWhereInput[];
    NOT?: Prisma.association_administratorsWhereInput | Prisma.association_administratorsWhereInput[];
    association_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"association_administrators"> | string;
    status?: Prisma.StringFilter<"association_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"association_administrators"> | Date | string;
    associations?: Prisma.XOR<Prisma.AssociationsScalarRelationFilter, Prisma.associationsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type association_administratorsOrderByWithRelationInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    associations?: Prisma.associationsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type association_administratorsWhereUniqueInput = Prisma.AtLeast<{
    association_id_user_id?: Prisma.association_administratorsAssociation_idUser_idCompoundUniqueInput;
    AND?: Prisma.association_administratorsWhereInput | Prisma.association_administratorsWhereInput[];
    OR?: Prisma.association_administratorsWhereInput[];
    NOT?: Prisma.association_administratorsWhereInput | Prisma.association_administratorsWhereInput[];
    association_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"association_administrators"> | string;
    status?: Prisma.StringFilter<"association_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"association_administrators"> | Date | string;
    associations?: Prisma.XOR<Prisma.AssociationsScalarRelationFilter, Prisma.associationsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "association_id_user_id">;
export type association_administratorsOrderByWithAggregationInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.association_administratorsCountOrderByAggregateInput;
    _avg?: Prisma.association_administratorsAvgOrderByAggregateInput;
    _max?: Prisma.association_administratorsMaxOrderByAggregateInput;
    _min?: Prisma.association_administratorsMinOrderByAggregateInput;
    _sum?: Prisma.association_administratorsSumOrderByAggregateInput;
};
export type association_administratorsScalarWhereWithAggregatesInput = {
    AND?: Prisma.association_administratorsScalarWhereWithAggregatesInput | Prisma.association_administratorsScalarWhereWithAggregatesInput[];
    OR?: Prisma.association_administratorsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.association_administratorsScalarWhereWithAggregatesInput | Prisma.association_administratorsScalarWhereWithAggregatesInput[];
    association_id?: Prisma.BigIntWithAggregatesFilter<"association_administrators"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"association_administrators"> | bigint | number;
    permission_level?: Prisma.StringWithAggregatesFilter<"association_administrators"> | string;
    status?: Prisma.StringWithAggregatesFilter<"association_administrators"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"association_administrators"> | Date | string;
};
export type association_administratorsCreateInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    associations: Prisma.associationsCreateNestedOneWithoutAssociation_administratorsInput;
    users: Prisma.usersCreateNestedOneWithoutAssociation_administratorsInput;
};
export type association_administratorsUncheckedCreateInput = {
    association_id: bigint | number;
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsUpdateInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    associations?: Prisma.associationsUpdateOneRequiredWithoutAssociation_administratorsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutAssociation_administratorsNestedInput;
};
export type association_administratorsUncheckedUpdateInput = {
    association_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsCreateManyInput = {
    association_id: bigint | number;
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsUpdateManyMutationInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsUncheckedUpdateManyInput = {
    association_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsAssociation_idUser_idCompoundUniqueInput = {
    association_id: bigint | number;
    user_id: bigint | number;
};
export type association_administratorsCountOrderByAggregateInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type association_administratorsAvgOrderByAggregateInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type association_administratorsMaxOrderByAggregateInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type association_administratorsMinOrderByAggregateInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type association_administratorsSumOrderByAggregateInput = {
    association_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Association_administratorsListRelationFilter = {
    every?: Prisma.association_administratorsWhereInput;
    some?: Prisma.association_administratorsWhereInput;
    none?: Prisma.association_administratorsWhereInput;
};
export type association_administratorsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type association_administratorsCreateNestedManyWithoutAssociationsInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput> | Prisma.association_administratorsCreateWithoutAssociationsInput[] | Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput | Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput[];
    createMany?: Prisma.association_administratorsCreateManyAssociationsInputEnvelope;
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
};
export type association_administratorsUncheckedCreateNestedManyWithoutAssociationsInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput> | Prisma.association_administratorsCreateWithoutAssociationsInput[] | Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput | Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput[];
    createMany?: Prisma.association_administratorsCreateManyAssociationsInputEnvelope;
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
};
export type association_administratorsUpdateManyWithoutAssociationsNestedInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput> | Prisma.association_administratorsCreateWithoutAssociationsInput[] | Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput | Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput[];
    upsert?: Prisma.association_administratorsUpsertWithWhereUniqueWithoutAssociationsInput | Prisma.association_administratorsUpsertWithWhereUniqueWithoutAssociationsInput[];
    createMany?: Prisma.association_administratorsCreateManyAssociationsInputEnvelope;
    set?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    disconnect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    delete?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    update?: Prisma.association_administratorsUpdateWithWhereUniqueWithoutAssociationsInput | Prisma.association_administratorsUpdateWithWhereUniqueWithoutAssociationsInput[];
    updateMany?: Prisma.association_administratorsUpdateManyWithWhereWithoutAssociationsInput | Prisma.association_administratorsUpdateManyWithWhereWithoutAssociationsInput[];
    deleteMany?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
};
export type association_administratorsUncheckedUpdateManyWithoutAssociationsNestedInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput> | Prisma.association_administratorsCreateWithoutAssociationsInput[] | Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput | Prisma.association_administratorsCreateOrConnectWithoutAssociationsInput[];
    upsert?: Prisma.association_administratorsUpsertWithWhereUniqueWithoutAssociationsInput | Prisma.association_administratorsUpsertWithWhereUniqueWithoutAssociationsInput[];
    createMany?: Prisma.association_administratorsCreateManyAssociationsInputEnvelope;
    set?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    disconnect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    delete?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    update?: Prisma.association_administratorsUpdateWithWhereUniqueWithoutAssociationsInput | Prisma.association_administratorsUpdateWithWhereUniqueWithoutAssociationsInput[];
    updateMany?: Prisma.association_administratorsUpdateManyWithWhereWithoutAssociationsInput | Prisma.association_administratorsUpdateManyWithWhereWithoutAssociationsInput[];
    deleteMany?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
};
export type association_administratorsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput> | Prisma.association_administratorsCreateWithoutUsersInput[] | Prisma.association_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutUsersInput | Prisma.association_administratorsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.association_administratorsCreateManyUsersInputEnvelope;
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
};
export type association_administratorsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput> | Prisma.association_administratorsCreateWithoutUsersInput[] | Prisma.association_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutUsersInput | Prisma.association_administratorsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.association_administratorsCreateManyUsersInputEnvelope;
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
};
export type association_administratorsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput> | Prisma.association_administratorsCreateWithoutUsersInput[] | Prisma.association_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutUsersInput | Prisma.association_administratorsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.association_administratorsUpsertWithWhereUniqueWithoutUsersInput | Prisma.association_administratorsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.association_administratorsCreateManyUsersInputEnvelope;
    set?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    disconnect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    delete?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    update?: Prisma.association_administratorsUpdateWithWhereUniqueWithoutUsersInput | Prisma.association_administratorsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.association_administratorsUpdateManyWithWhereWithoutUsersInput | Prisma.association_administratorsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
};
export type association_administratorsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput> | Prisma.association_administratorsCreateWithoutUsersInput[] | Prisma.association_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.association_administratorsCreateOrConnectWithoutUsersInput | Prisma.association_administratorsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.association_administratorsUpsertWithWhereUniqueWithoutUsersInput | Prisma.association_administratorsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.association_administratorsCreateManyUsersInputEnvelope;
    set?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    disconnect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    delete?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    connect?: Prisma.association_administratorsWhereUniqueInput | Prisma.association_administratorsWhereUniqueInput[];
    update?: Prisma.association_administratorsUpdateWithWhereUniqueWithoutUsersInput | Prisma.association_administratorsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.association_administratorsUpdateManyWithWhereWithoutUsersInput | Prisma.association_administratorsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
};
export type association_administratorsCreateWithoutAssociationsInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutAssociation_administratorsInput;
};
export type association_administratorsUncheckedCreateWithoutAssociationsInput = {
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsCreateOrConnectWithoutAssociationsInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput>;
};
export type association_administratorsCreateManyAssociationsInputEnvelope = {
    data: Prisma.association_administratorsCreateManyAssociationsInput | Prisma.association_administratorsCreateManyAssociationsInput[];
    skipDuplicates?: boolean;
};
export type association_administratorsUpsertWithWhereUniqueWithoutAssociationsInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.association_administratorsUpdateWithoutAssociationsInput, Prisma.association_administratorsUncheckedUpdateWithoutAssociationsInput>;
    create: Prisma.XOR<Prisma.association_administratorsCreateWithoutAssociationsInput, Prisma.association_administratorsUncheckedCreateWithoutAssociationsInput>;
};
export type association_administratorsUpdateWithWhereUniqueWithoutAssociationsInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.association_administratorsUpdateWithoutAssociationsInput, Prisma.association_administratorsUncheckedUpdateWithoutAssociationsInput>;
};
export type association_administratorsUpdateManyWithWhereWithoutAssociationsInput = {
    where: Prisma.association_administratorsScalarWhereInput;
    data: Prisma.XOR<Prisma.association_administratorsUpdateManyMutationInput, Prisma.association_administratorsUncheckedUpdateManyWithoutAssociationsInput>;
};
export type association_administratorsScalarWhereInput = {
    AND?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
    OR?: Prisma.association_administratorsScalarWhereInput[];
    NOT?: Prisma.association_administratorsScalarWhereInput | Prisma.association_administratorsScalarWhereInput[];
    association_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"association_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"association_administrators"> | string;
    status?: Prisma.StringFilter<"association_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"association_administrators"> | Date | string;
};
export type association_administratorsCreateWithoutUsersInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    associations: Prisma.associationsCreateNestedOneWithoutAssociation_administratorsInput;
};
export type association_administratorsUncheckedCreateWithoutUsersInput = {
    association_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsCreateOrConnectWithoutUsersInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput>;
};
export type association_administratorsCreateManyUsersInputEnvelope = {
    data: Prisma.association_administratorsCreateManyUsersInput | Prisma.association_administratorsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type association_administratorsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.association_administratorsUpdateWithoutUsersInput, Prisma.association_administratorsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.association_administratorsCreateWithoutUsersInput, Prisma.association_administratorsUncheckedCreateWithoutUsersInput>;
};
export type association_administratorsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.association_administratorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.association_administratorsUpdateWithoutUsersInput, Prisma.association_administratorsUncheckedUpdateWithoutUsersInput>;
};
export type association_administratorsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.association_administratorsScalarWhereInput;
    data: Prisma.XOR<Prisma.association_administratorsUpdateManyMutationInput, Prisma.association_administratorsUncheckedUpdateManyWithoutUsersInput>;
};
export type association_administratorsCreateManyAssociationsInput = {
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsUpdateWithoutAssociationsInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutAssociation_administratorsNestedInput;
};
export type association_administratorsUncheckedUpdateWithoutAssociationsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsUncheckedUpdateManyWithoutAssociationsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsCreateManyUsersInput = {
    association_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type association_administratorsUpdateWithoutUsersInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    associations?: Prisma.associationsUpdateOneRequiredWithoutAssociation_administratorsNestedInput;
};
export type association_administratorsUncheckedUpdateWithoutUsersInput = {
    association_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsUncheckedUpdateManyWithoutUsersInput = {
    association_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type association_administratorsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    association_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["association_administrators"]>;
export type association_administratorsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    association_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["association_administrators"]>;
export type association_administratorsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    association_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["association_administrators"]>;
export type association_administratorsSelectScalar = {
    association_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type association_administratorsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"association_id" | "user_id" | "permission_level" | "status" | "created_at", ExtArgs["result"]["association_administrators"]>;
export type association_administratorsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type association_administratorsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type association_administratorsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    associations?: boolean | Prisma.associationsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $association_administratorsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "association_administrators";
    objects: {
        associations: Prisma.$associationsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        association_id: bigint;
        user_id: bigint;
        permission_level: string;
        status: string;
        created_at: Date;
    }, ExtArgs["result"]["association_administrators"]>;
    composites: {};
};
export type association_administratorsGetPayload<S extends boolean | null | undefined | association_administratorsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload, S>;
export type association_administratorsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<association_administratorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Association_administratorsCountAggregateInputType | true;
};
export interface association_administratorsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['association_administrators'];
        meta: {
            name: 'association_administrators';
        };
    };
    findUnique<T extends association_administratorsFindUniqueArgs>(args: Prisma.SelectSubset<T, association_administratorsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends association_administratorsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, association_administratorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends association_administratorsFindFirstArgs>(args?: Prisma.SelectSubset<T, association_administratorsFindFirstArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends association_administratorsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, association_administratorsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends association_administratorsFindManyArgs>(args?: Prisma.SelectSubset<T, association_administratorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends association_administratorsCreateArgs>(args: Prisma.SelectSubset<T, association_administratorsCreateArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends association_administratorsCreateManyArgs>(args?: Prisma.SelectSubset<T, association_administratorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends association_administratorsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, association_administratorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends association_administratorsDeleteArgs>(args: Prisma.SelectSubset<T, association_administratorsDeleteArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends association_administratorsUpdateArgs>(args: Prisma.SelectSubset<T, association_administratorsUpdateArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends association_administratorsDeleteManyArgs>(args?: Prisma.SelectSubset<T, association_administratorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends association_administratorsUpdateManyArgs>(args: Prisma.SelectSubset<T, association_administratorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends association_administratorsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, association_administratorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends association_administratorsUpsertArgs>(args: Prisma.SelectSubset<T, association_administratorsUpsertArgs<ExtArgs>>): Prisma.Prisma__association_administratorsClient<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends association_administratorsCountArgs>(args?: Prisma.Subset<T, association_administratorsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Association_administratorsCountAggregateOutputType> : number>;
    aggregate<T extends Association_administratorsAggregateArgs>(args: Prisma.Subset<T, Association_administratorsAggregateArgs>): Prisma.PrismaPromise<GetAssociation_administratorsAggregateType<T>>;
    groupBy<T extends association_administratorsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: association_administratorsGroupByArgs['orderBy'];
    } : {
        orderBy?: association_administratorsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, association_administratorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssociation_administratorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: association_administratorsFieldRefs;
}
export interface Prisma__association_administratorsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    associations<T extends Prisma.associationsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.associationsDefaultArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface association_administratorsFieldRefs {
    readonly association_id: Prisma.FieldRef<"association_administrators", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"association_administrators", 'BigInt'>;
    readonly permission_level: Prisma.FieldRef<"association_administrators", 'String'>;
    readonly status: Prisma.FieldRef<"association_administrators", 'String'>;
    readonly created_at: Prisma.FieldRef<"association_administrators", 'DateTime'>;
}
export type association_administratorsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where: Prisma.association_administratorsWhereUniqueInput;
};
export type association_administratorsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where: Prisma.association_administratorsWhereUniqueInput;
};
export type association_administratorsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where?: Prisma.association_administratorsWhereInput;
    orderBy?: Prisma.association_administratorsOrderByWithRelationInput | Prisma.association_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.association_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Association_administratorsScalarFieldEnum | Prisma.Association_administratorsScalarFieldEnum[];
};
export type association_administratorsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where?: Prisma.association_administratorsWhereInput;
    orderBy?: Prisma.association_administratorsOrderByWithRelationInput | Prisma.association_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.association_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Association_administratorsScalarFieldEnum | Prisma.Association_administratorsScalarFieldEnum[];
};
export type association_administratorsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where?: Prisma.association_administratorsWhereInput;
    orderBy?: Prisma.association_administratorsOrderByWithRelationInput | Prisma.association_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.association_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Association_administratorsScalarFieldEnum | Prisma.Association_administratorsScalarFieldEnum[];
};
export type association_administratorsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.association_administratorsCreateInput, Prisma.association_administratorsUncheckedCreateInput>;
};
export type association_administratorsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.association_administratorsCreateManyInput | Prisma.association_administratorsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type association_administratorsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    data: Prisma.association_administratorsCreateManyInput | Prisma.association_administratorsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.association_administratorsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type association_administratorsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.association_administratorsUpdateInput, Prisma.association_administratorsUncheckedUpdateInput>;
    where: Prisma.association_administratorsWhereUniqueInput;
};
export type association_administratorsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.association_administratorsUpdateManyMutationInput, Prisma.association_administratorsUncheckedUpdateManyInput>;
    where?: Prisma.association_administratorsWhereInput;
    limit?: number;
};
export type association_administratorsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.association_administratorsUpdateManyMutationInput, Prisma.association_administratorsUncheckedUpdateManyInput>;
    where?: Prisma.association_administratorsWhereInput;
    limit?: number;
    include?: Prisma.association_administratorsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type association_administratorsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where: Prisma.association_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.association_administratorsCreateInput, Prisma.association_administratorsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.association_administratorsUpdateInput, Prisma.association_administratorsUncheckedUpdateInput>;
};
export type association_administratorsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
    where: Prisma.association_administratorsWhereUniqueInput;
};
export type association_administratorsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.association_administratorsWhereInput;
    limit?: number;
};
export type association_administratorsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.association_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.association_administratorsOmit<ExtArgs> | null;
    include?: Prisma.association_administratorsInclude<ExtArgs> | null;
};
