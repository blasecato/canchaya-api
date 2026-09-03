import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type associationsModel = runtime.Types.Result.DefaultSelection<Prisma.$associationsPayload>;
export type AggregateAssociations = {
    _count: AssociationsCountAggregateOutputType | null;
    _avg: AssociationsAvgAggregateOutputType | null;
    _sum: AssociationsSumAggregateOutputType | null;
    _min: AssociationsMinAggregateOutputType | null;
    _max: AssociationsMaxAggregateOutputType | null;
};
export type AssociationsAvgAggregateOutputType = {
    id: number | null;
    owner_user_id: number | null;
};
export type AssociationsSumAggregateOutputType = {
    id: bigint | null;
    owner_user_id: bigint | null;
};
export type AssociationsMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    city: string | null;
    address: string | null;
    tax_id: string | null;
    email: string | null;
    phone: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    cover_url: string | null;
    cover_public_id: string | null;
    owner_user_id: bigint | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type AssociationsMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    city: string | null;
    address: string | null;
    tax_id: string | null;
    email: string | null;
    phone: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    cover_url: string | null;
    cover_public_id: string | null;
    owner_user_id: bigint | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type AssociationsCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    city: number;
    address: number;
    tax_id: number;
    email: number;
    phone: number;
    logo_url: number;
    logo_public_id: number;
    cover_url: number;
    cover_public_id: number;
    owner_user_id: number;
    status: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type AssociationsAvgAggregateInputType = {
    id?: true;
    owner_user_id?: true;
};
export type AssociationsSumAggregateInputType = {
    id?: true;
    owner_user_id?: true;
};
export type AssociationsMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    city?: true;
    address?: true;
    tax_id?: true;
    email?: true;
    phone?: true;
    logo_url?: true;
    logo_public_id?: true;
    cover_url?: true;
    cover_public_id?: true;
    owner_user_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type AssociationsMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    city?: true;
    address?: true;
    tax_id?: true;
    email?: true;
    phone?: true;
    logo_url?: true;
    logo_public_id?: true;
    cover_url?: true;
    cover_public_id?: true;
    owner_user_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type AssociationsCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    city?: true;
    address?: true;
    tax_id?: true;
    email?: true;
    phone?: true;
    logo_url?: true;
    logo_public_id?: true;
    cover_url?: true;
    cover_public_id?: true;
    owner_user_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type AssociationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.associationsWhereInput;
    orderBy?: Prisma.associationsOrderByWithRelationInput | Prisma.associationsOrderByWithRelationInput[];
    cursor?: Prisma.associationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AssociationsCountAggregateInputType;
    _avg?: AssociationsAvgAggregateInputType;
    _sum?: AssociationsSumAggregateInputType;
    _min?: AssociationsMinAggregateInputType;
    _max?: AssociationsMaxAggregateInputType;
};
export type GetAssociationsAggregateType<T extends AssociationsAggregateArgs> = {
    [P in keyof T & keyof AggregateAssociations]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssociations[P]> : Prisma.GetScalarType<T[P], AggregateAssociations[P]>;
};
export type associationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.associationsWhereInput;
    orderBy?: Prisma.associationsOrderByWithAggregationInput | Prisma.associationsOrderByWithAggregationInput[];
    by: Prisma.AssociationsScalarFieldEnum[] | Prisma.AssociationsScalarFieldEnum;
    having?: Prisma.associationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssociationsCountAggregateInputType | true;
    _avg?: AssociationsAvgAggregateInputType;
    _sum?: AssociationsSumAggregateInputType;
    _min?: AssociationsMinAggregateInputType;
    _max?: AssociationsMaxAggregateInputType;
};
export type AssociationsGroupByOutputType = {
    id: bigint;
    name: string;
    description: string | null;
    city: string;
    address: string | null;
    tax_id: string | null;
    email: string | null;
    phone: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    cover_url: string;
    cover_public_id: string | null;
    owner_user_id: bigint;
    status: string;
    created_at: Date;
    updated_at: Date;
    _count: AssociationsCountAggregateOutputType | null;
    _avg: AssociationsAvgAggregateOutputType | null;
    _sum: AssociationsSumAggregateOutputType | null;
    _min: AssociationsMinAggregateOutputType | null;
    _max: AssociationsMaxAggregateOutputType | null;
};
export type GetAssociationsGroupByPayload<T extends associationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssociationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssociationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssociationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssociationsGroupByOutputType[P]>;
}>>;
export type associationsWhereInput = {
    AND?: Prisma.associationsWhereInput | Prisma.associationsWhereInput[];
    OR?: Prisma.associationsWhereInput[];
    NOT?: Prisma.associationsWhereInput | Prisma.associationsWhereInput[];
    id?: Prisma.BigIntFilter<"associations"> | bigint | number;
    name?: Prisma.StringFilter<"associations"> | string;
    description?: Prisma.StringNullableFilter<"associations"> | string | null;
    city?: Prisma.StringFilter<"associations"> | string;
    address?: Prisma.StringNullableFilter<"associations"> | string | null;
    tax_id?: Prisma.StringNullableFilter<"associations"> | string | null;
    email?: Prisma.StringNullableFilter<"associations"> | string | null;
    phone?: Prisma.StringNullableFilter<"associations"> | string | null;
    logo_url?: Prisma.StringNullableFilter<"associations"> | string | null;
    logo_public_id?: Prisma.StringNullableFilter<"associations"> | string | null;
    cover_url?: Prisma.StringFilter<"associations"> | string;
    cover_public_id?: Prisma.StringNullableFilter<"associations"> | string | null;
    owner_user_id?: Prisma.BigIntFilter<"associations"> | bigint | number;
    status?: Prisma.StringFilter<"associations"> | string;
    created_at?: Prisma.DateTimeFilter<"associations"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"associations"> | Date | string;
    association_administrators?: Prisma.Association_administratorsListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournaments?: Prisma.TournamentsListRelationFilter;
};
export type associationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    tax_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    cover_url?: Prisma.SortOrder;
    cover_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    association_administrators?: Prisma.association_administratorsOrderByRelationAggregateInput;
    users?: Prisma.usersOrderByWithRelationInput;
    tournaments?: Prisma.tournamentsOrderByRelationAggregateInput;
};
export type associationsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    tax_id?: string;
    owner_user_id?: bigint | number;
    AND?: Prisma.associationsWhereInput | Prisma.associationsWhereInput[];
    OR?: Prisma.associationsWhereInput[];
    NOT?: Prisma.associationsWhereInput | Prisma.associationsWhereInput[];
    name?: Prisma.StringFilter<"associations"> | string;
    description?: Prisma.StringNullableFilter<"associations"> | string | null;
    city?: Prisma.StringFilter<"associations"> | string;
    address?: Prisma.StringNullableFilter<"associations"> | string | null;
    email?: Prisma.StringNullableFilter<"associations"> | string | null;
    phone?: Prisma.StringNullableFilter<"associations"> | string | null;
    logo_url?: Prisma.StringNullableFilter<"associations"> | string | null;
    logo_public_id?: Prisma.StringNullableFilter<"associations"> | string | null;
    cover_url?: Prisma.StringFilter<"associations"> | string;
    cover_public_id?: Prisma.StringNullableFilter<"associations"> | string | null;
    status?: Prisma.StringFilter<"associations"> | string;
    created_at?: Prisma.DateTimeFilter<"associations"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"associations"> | Date | string;
    association_administrators?: Prisma.Association_administratorsListRelationFilter;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournaments?: Prisma.TournamentsListRelationFilter;
}, "id" | "tax_id" | "owner_user_id">;
export type associationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    tax_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    cover_url?: Prisma.SortOrder;
    cover_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.associationsCountOrderByAggregateInput;
    _avg?: Prisma.associationsAvgOrderByAggregateInput;
    _max?: Prisma.associationsMaxOrderByAggregateInput;
    _min?: Prisma.associationsMinOrderByAggregateInput;
    _sum?: Prisma.associationsSumOrderByAggregateInput;
};
export type associationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.associationsScalarWhereWithAggregatesInput | Prisma.associationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.associationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.associationsScalarWhereWithAggregatesInput | Prisma.associationsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"associations"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"associations"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    city?: Prisma.StringWithAggregatesFilter<"associations"> | string;
    address?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    tax_id?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    logo_url?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    logo_public_id?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    cover_url?: Prisma.StringWithAggregatesFilter<"associations"> | string;
    cover_public_id?: Prisma.StringNullableWithAggregatesFilter<"associations"> | string | null;
    owner_user_id?: Prisma.BigIntWithAggregatesFilter<"associations"> | bigint | number;
    status?: Prisma.StringWithAggregatesFilter<"associations"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"associations"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"associations"> | Date | string;
};
export type associationsCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsCreateNestedManyWithoutAssociationsInput;
    users: Prisma.usersCreateNestedOneWithoutAssociationsInput;
    tournaments?: Prisma.tournamentsCreateNestedManyWithoutAssociationsInput;
};
export type associationsUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    owner_user_id: bigint | number;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedCreateNestedManyWithoutAssociationsInput;
    tournaments?: Prisma.tournamentsUncheckedCreateNestedManyWithoutAssociationsInput;
};
export type associationsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUpdateManyWithoutAssociationsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutAssociationsNestedInput;
    tournaments?: Prisma.tournamentsUpdateManyWithoutAssociationsNestedInput;
};
export type associationsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    owner_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedUpdateManyWithoutAssociationsNestedInput;
    tournaments?: Prisma.tournamentsUncheckedUpdateManyWithoutAssociationsNestedInput;
};
export type associationsCreateManyInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    owner_user_id: bigint | number;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type associationsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type associationsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    owner_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssociationsScalarRelationFilter = {
    is?: Prisma.associationsWhereInput;
    isNot?: Prisma.associationsWhereInput;
};
export type associationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    cover_url?: Prisma.SortOrder;
    cover_public_id?: Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type associationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
};
export type associationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    cover_url?: Prisma.SortOrder;
    cover_public_id?: Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type associationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    cover_url?: Prisma.SortOrder;
    cover_public_id?: Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type associationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    owner_user_id?: Prisma.SortOrder;
};
export type AssociationsNullableScalarRelationFilter = {
    is?: Prisma.associationsWhereInput | null;
    isNot?: Prisma.associationsWhereInput | null;
};
export type associationsCreateNestedOneWithoutAssociation_administratorsInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedCreateWithoutAssociation_administratorsInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutAssociation_administratorsInput;
    connect?: Prisma.associationsWhereUniqueInput;
};
export type associationsUpdateOneRequiredWithoutAssociation_administratorsNestedInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedCreateWithoutAssociation_administratorsInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutAssociation_administratorsInput;
    upsert?: Prisma.associationsUpsertWithoutAssociation_administratorsInput;
    connect?: Prisma.associationsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.associationsUpdateToOneWithWhereWithoutAssociation_administratorsInput, Prisma.associationsUpdateWithoutAssociation_administratorsInput>, Prisma.associationsUncheckedUpdateWithoutAssociation_administratorsInput>;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type associationsCreateNestedOneWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutTournamentsInput, Prisma.associationsUncheckedCreateWithoutTournamentsInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutTournamentsInput;
    connect?: Prisma.associationsWhereUniqueInput;
};
export type associationsUpdateOneRequiredWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutTournamentsInput, Prisma.associationsUncheckedCreateWithoutTournamentsInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutTournamentsInput;
    upsert?: Prisma.associationsUpsertWithoutTournamentsInput;
    connect?: Prisma.associationsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.associationsUpdateToOneWithWhereWithoutTournamentsInput, Prisma.associationsUpdateWithoutTournamentsInput>, Prisma.associationsUncheckedUpdateWithoutTournamentsInput>;
};
export type associationsCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutUsersInput;
    connect?: Prisma.associationsWhereUniqueInput;
};
export type associationsUncheckedCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutUsersInput;
    connect?: Prisma.associationsWhereUniqueInput;
};
export type associationsUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.associationsUpsertWithoutUsersInput;
    disconnect?: Prisma.associationsWhereInput | boolean;
    delete?: Prisma.associationsWhereInput | boolean;
    connect?: Prisma.associationsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.associationsUpdateToOneWithWhereWithoutUsersInput, Prisma.associationsUpdateWithoutUsersInput>, Prisma.associationsUncheckedUpdateWithoutUsersInput>;
};
export type associationsUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.associationsCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.associationsUpsertWithoutUsersInput;
    disconnect?: Prisma.associationsWhereInput | boolean;
    delete?: Prisma.associationsWhereInput | boolean;
    connect?: Prisma.associationsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.associationsUpdateToOneWithWhereWithoutUsersInput, Prisma.associationsUpdateWithoutUsersInput>, Prisma.associationsUncheckedUpdateWithoutUsersInput>;
};
export type associationsCreateWithoutAssociation_administratorsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutAssociationsInput;
    tournaments?: Prisma.tournamentsCreateNestedManyWithoutAssociationsInput;
};
export type associationsUncheckedCreateWithoutAssociation_administratorsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    owner_user_id: bigint | number;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournaments?: Prisma.tournamentsUncheckedCreateNestedManyWithoutAssociationsInput;
};
export type associationsCreateOrConnectWithoutAssociation_administratorsInput = {
    where: Prisma.associationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.associationsCreateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedCreateWithoutAssociation_administratorsInput>;
};
export type associationsUpsertWithoutAssociation_administratorsInput = {
    update: Prisma.XOR<Prisma.associationsUpdateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedUpdateWithoutAssociation_administratorsInput>;
    create: Prisma.XOR<Prisma.associationsCreateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedCreateWithoutAssociation_administratorsInput>;
    where?: Prisma.associationsWhereInput;
};
export type associationsUpdateToOneWithWhereWithoutAssociation_administratorsInput = {
    where?: Prisma.associationsWhereInput;
    data: Prisma.XOR<Prisma.associationsUpdateWithoutAssociation_administratorsInput, Prisma.associationsUncheckedUpdateWithoutAssociation_administratorsInput>;
};
export type associationsUpdateWithoutAssociation_administratorsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutAssociationsNestedInput;
    tournaments?: Prisma.tournamentsUpdateManyWithoutAssociationsNestedInput;
};
export type associationsUncheckedUpdateWithoutAssociation_administratorsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    owner_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUncheckedUpdateManyWithoutAssociationsNestedInput;
};
export type associationsCreateWithoutTournamentsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsCreateNestedManyWithoutAssociationsInput;
    users: Prisma.usersCreateNestedOneWithoutAssociationsInput;
};
export type associationsUncheckedCreateWithoutTournamentsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    owner_user_id: bigint | number;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedCreateNestedManyWithoutAssociationsInput;
};
export type associationsCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.associationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.associationsCreateWithoutTournamentsInput, Prisma.associationsUncheckedCreateWithoutTournamentsInput>;
};
export type associationsUpsertWithoutTournamentsInput = {
    update: Prisma.XOR<Prisma.associationsUpdateWithoutTournamentsInput, Prisma.associationsUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.associationsCreateWithoutTournamentsInput, Prisma.associationsUncheckedCreateWithoutTournamentsInput>;
    where?: Prisma.associationsWhereInput;
};
export type associationsUpdateToOneWithWhereWithoutTournamentsInput = {
    where?: Prisma.associationsWhereInput;
    data: Prisma.XOR<Prisma.associationsUpdateWithoutTournamentsInput, Prisma.associationsUncheckedUpdateWithoutTournamentsInput>;
};
export type associationsUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUpdateManyWithoutAssociationsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutAssociationsNestedInput;
};
export type associationsUncheckedUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    owner_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedUpdateManyWithoutAssociationsNestedInput;
};
export type associationsCreateWithoutUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsCreateNestedManyWithoutAssociationsInput;
    tournaments?: Prisma.tournamentsCreateNestedManyWithoutAssociationsInput;
};
export type associationsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    city: string;
    address?: string | null;
    tax_id?: string | null;
    email?: string | null;
    phone?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    cover_url: string;
    cover_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedCreateNestedManyWithoutAssociationsInput;
    tournaments?: Prisma.tournamentsUncheckedCreateNestedManyWithoutAssociationsInput;
};
export type associationsCreateOrConnectWithoutUsersInput = {
    where: Prisma.associationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
};
export type associationsUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.associationsUpdateWithoutUsersInput, Prisma.associationsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.associationsCreateWithoutUsersInput, Prisma.associationsUncheckedCreateWithoutUsersInput>;
    where?: Prisma.associationsWhereInput;
};
export type associationsUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.associationsWhereInput;
    data: Prisma.XOR<Prisma.associationsUpdateWithoutUsersInput, Prisma.associationsUncheckedUpdateWithoutUsersInput>;
};
export type associationsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUpdateManyWithoutAssociationsNestedInput;
    tournaments?: Prisma.tournamentsUpdateManyWithoutAssociationsNestedInput;
};
export type associationsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cover_url?: Prisma.StringFieldUpdateOperationsInput | string;
    cover_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    association_administrators?: Prisma.association_administratorsUncheckedUpdateManyWithoutAssociationsNestedInput;
    tournaments?: Prisma.tournamentsUncheckedUpdateManyWithoutAssociationsNestedInput;
};
export type AssociationsCountOutputType = {
    association_administrators: number;
    tournaments: number;
};
export type AssociationsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    association_administrators?: boolean | AssociationsCountOutputTypeCountAssociation_administratorsArgs;
    tournaments?: boolean | AssociationsCountOutputTypeCountTournamentsArgs;
};
export type AssociationsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssociationsCountOutputTypeSelect<ExtArgs> | null;
};
export type AssociationsCountOutputTypeCountAssociation_administratorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.association_administratorsWhereInput;
};
export type AssociationsCountOutputTypeCountTournamentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournamentsWhereInput;
};
export type associationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    city?: boolean;
    address?: boolean;
    tax_id?: boolean;
    email?: boolean;
    phone?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    cover_url?: boolean;
    cover_public_id?: boolean;
    owner_user_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    association_administrators?: boolean | Prisma.associations$association_administratorsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.associations$tournamentsArgs<ExtArgs>;
    _count?: boolean | Prisma.AssociationsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["associations"]>;
export type associationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    city?: boolean;
    address?: boolean;
    tax_id?: boolean;
    email?: boolean;
    phone?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    cover_url?: boolean;
    cover_public_id?: boolean;
    owner_user_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["associations"]>;
export type associationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    city?: boolean;
    address?: boolean;
    tax_id?: boolean;
    email?: boolean;
    phone?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    cover_url?: boolean;
    cover_public_id?: boolean;
    owner_user_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["associations"]>;
export type associationsSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    city?: boolean;
    address?: boolean;
    tax_id?: boolean;
    email?: boolean;
    phone?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    cover_url?: boolean;
    cover_public_id?: boolean;
    owner_user_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type associationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "city" | "address" | "tax_id" | "email" | "phone" | "logo_url" | "logo_public_id" | "cover_url" | "cover_public_id" | "owner_user_id" | "status" | "created_at" | "updated_at", ExtArgs["result"]["associations"]>;
export type associationsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    association_administrators?: boolean | Prisma.associations$association_administratorsArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.associations$tournamentsArgs<ExtArgs>;
    _count?: boolean | Prisma.AssociationsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type associationsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type associationsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $associationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "associations";
    objects: {
        association_administrators: Prisma.$association_administratorsPayload<ExtArgs>[];
        users: Prisma.$usersPayload<ExtArgs>;
        tournaments: Prisma.$tournamentsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        description: string | null;
        city: string;
        address: string | null;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        cover_url: string;
        cover_public_id: string | null;
        owner_user_id: bigint;
        status: string;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["associations"]>;
    composites: {};
};
export type associationsGetPayload<S extends boolean | null | undefined | associationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$associationsPayload, S>;
export type associationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<associationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssociationsCountAggregateInputType | true;
};
export interface associationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['associations'];
        meta: {
            name: 'associations';
        };
    };
    findUnique<T extends associationsFindUniqueArgs>(args: Prisma.SelectSubset<T, associationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends associationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, associationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends associationsFindFirstArgs>(args?: Prisma.SelectSubset<T, associationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends associationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, associationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends associationsFindManyArgs>(args?: Prisma.SelectSubset<T, associationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends associationsCreateArgs>(args: Prisma.SelectSubset<T, associationsCreateArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends associationsCreateManyArgs>(args?: Prisma.SelectSubset<T, associationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends associationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, associationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends associationsDeleteArgs>(args: Prisma.SelectSubset<T, associationsDeleteArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends associationsUpdateArgs>(args: Prisma.SelectSubset<T, associationsUpdateArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends associationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, associationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends associationsUpdateManyArgs>(args: Prisma.SelectSubset<T, associationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends associationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, associationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends associationsUpsertArgs>(args: Prisma.SelectSubset<T, associationsUpsertArgs<ExtArgs>>): Prisma.Prisma__associationsClient<runtime.Types.Result.GetResult<Prisma.$associationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends associationsCountArgs>(args?: Prisma.Subset<T, associationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssociationsCountAggregateOutputType> : number>;
    aggregate<T extends AssociationsAggregateArgs>(args: Prisma.Subset<T, AssociationsAggregateArgs>): Prisma.PrismaPromise<GetAssociationsAggregateType<T>>;
    groupBy<T extends associationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: associationsGroupByArgs['orderBy'];
    } : {
        orderBy?: associationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, associationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssociationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: associationsFieldRefs;
}
export interface Prisma__associationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    association_administrators<T extends Prisma.associations$association_administratorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.associations$association_administratorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$association_administratorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournaments<T extends Prisma.associations$tournamentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.associations$tournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface associationsFieldRefs {
    readonly id: Prisma.FieldRef<"associations", 'BigInt'>;
    readonly name: Prisma.FieldRef<"associations", 'String'>;
    readonly description: Prisma.FieldRef<"associations", 'String'>;
    readonly city: Prisma.FieldRef<"associations", 'String'>;
    readonly address: Prisma.FieldRef<"associations", 'String'>;
    readonly tax_id: Prisma.FieldRef<"associations", 'String'>;
    readonly email: Prisma.FieldRef<"associations", 'String'>;
    readonly phone: Prisma.FieldRef<"associations", 'String'>;
    readonly logo_url: Prisma.FieldRef<"associations", 'String'>;
    readonly logo_public_id: Prisma.FieldRef<"associations", 'String'>;
    readonly cover_url: Prisma.FieldRef<"associations", 'String'>;
    readonly cover_public_id: Prisma.FieldRef<"associations", 'String'>;
    readonly owner_user_id: Prisma.FieldRef<"associations", 'BigInt'>;
    readonly status: Prisma.FieldRef<"associations", 'String'>;
    readonly created_at: Prisma.FieldRef<"associations", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"associations", 'DateTime'>;
}
export type associationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where: Prisma.associationsWhereUniqueInput;
};
export type associationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where: Prisma.associationsWhereUniqueInput;
};
export type associationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where?: Prisma.associationsWhereInput;
    orderBy?: Prisma.associationsOrderByWithRelationInput | Prisma.associationsOrderByWithRelationInput[];
    cursor?: Prisma.associationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssociationsScalarFieldEnum | Prisma.AssociationsScalarFieldEnum[];
};
export type associationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where?: Prisma.associationsWhereInput;
    orderBy?: Prisma.associationsOrderByWithRelationInput | Prisma.associationsOrderByWithRelationInput[];
    cursor?: Prisma.associationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssociationsScalarFieldEnum | Prisma.AssociationsScalarFieldEnum[];
};
export type associationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where?: Prisma.associationsWhereInput;
    orderBy?: Prisma.associationsOrderByWithRelationInput | Prisma.associationsOrderByWithRelationInput[];
    cursor?: Prisma.associationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssociationsScalarFieldEnum | Prisma.AssociationsScalarFieldEnum[];
};
export type associationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.associationsCreateInput, Prisma.associationsUncheckedCreateInput>;
};
export type associationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.associationsCreateManyInput | Prisma.associationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type associationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    data: Prisma.associationsCreateManyInput | Prisma.associationsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.associationsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type associationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.associationsUpdateInput, Prisma.associationsUncheckedUpdateInput>;
    where: Prisma.associationsWhereUniqueInput;
};
export type associationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.associationsUpdateManyMutationInput, Prisma.associationsUncheckedUpdateManyInput>;
    where?: Prisma.associationsWhereInput;
    limit?: number;
};
export type associationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.associationsUpdateManyMutationInput, Prisma.associationsUncheckedUpdateManyInput>;
    where?: Prisma.associationsWhereInput;
    limit?: number;
    include?: Prisma.associationsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type associationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where: Prisma.associationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.associationsCreateInput, Prisma.associationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.associationsUpdateInput, Prisma.associationsUncheckedUpdateInput>;
};
export type associationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
    where: Prisma.associationsWhereUniqueInput;
};
export type associationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.associationsWhereInput;
    limit?: number;
};
export type associations$association_administratorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type associations$tournamentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournamentsSelect<ExtArgs> | null;
    omit?: Prisma.tournamentsOmit<ExtArgs> | null;
    include?: Prisma.tournamentsInclude<ExtArgs> | null;
    where?: Prisma.tournamentsWhereInput;
    orderBy?: Prisma.tournamentsOrderByWithRelationInput | Prisma.tournamentsOrderByWithRelationInput[];
    cursor?: Prisma.tournamentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TournamentsScalarFieldEnum | Prisma.TournamentsScalarFieldEnum[];
};
export type associationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.associationsSelect<ExtArgs> | null;
    omit?: Prisma.associationsOmit<ExtArgs> | null;
    include?: Prisma.associationsInclude<ExtArgs> | null;
};
