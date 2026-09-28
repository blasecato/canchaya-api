import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type home_hero_slidesModel = runtime.Types.Result.DefaultSelection<Prisma.$home_hero_slidesPayload>;
export type AggregateHome_hero_slides = {
    _count: Home_hero_slidesCountAggregateOutputType | null;
    _avg: Home_hero_slidesAvgAggregateOutputType | null;
    _sum: Home_hero_slidesSumAggregateOutputType | null;
    _min: Home_hero_slidesMinAggregateOutputType | null;
    _max: Home_hero_slidesMaxAggregateOutputType | null;
};
export type Home_hero_slidesAvgAggregateOutputType = {
    position: number | null;
    updated_by: number | null;
};
export type Home_hero_slidesSumAggregateOutputType = {
    position: number | null;
    updated_by: bigint | null;
};
export type Home_hero_slidesMinAggregateOutputType = {
    slug: string | null;
    position: number | null;
    eyebrow: string | null;
    title: string | null;
    accent_title: string | null;
    description: string | null;
    cta_label: string | null;
    cta_to: string | null;
    thumbnail_title: string | null;
    image_url: string | null;
    image_public_id: string | null;
    updated_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Home_hero_slidesMaxAggregateOutputType = {
    slug: string | null;
    position: number | null;
    eyebrow: string | null;
    title: string | null;
    accent_title: string | null;
    description: string | null;
    cta_label: string | null;
    cta_to: string | null;
    thumbnail_title: string | null;
    image_url: string | null;
    image_public_id: string | null;
    updated_by: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Home_hero_slidesCountAggregateOutputType = {
    slug: number;
    position: number;
    eyebrow: number;
    title: number;
    accent_title: number;
    description: number;
    cta_label: number;
    cta_to: number;
    thumbnail_title: number;
    image_url: number;
    image_public_id: number;
    updated_by: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Home_hero_slidesAvgAggregateInputType = {
    position?: true;
    updated_by?: true;
};
export type Home_hero_slidesSumAggregateInputType = {
    position?: true;
    updated_by?: true;
};
export type Home_hero_slidesMinAggregateInputType = {
    slug?: true;
    position?: true;
    eyebrow?: true;
    title?: true;
    accent_title?: true;
    description?: true;
    cta_label?: true;
    cta_to?: true;
    thumbnail_title?: true;
    image_url?: true;
    image_public_id?: true;
    updated_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Home_hero_slidesMaxAggregateInputType = {
    slug?: true;
    position?: true;
    eyebrow?: true;
    title?: true;
    accent_title?: true;
    description?: true;
    cta_label?: true;
    cta_to?: true;
    thumbnail_title?: true;
    image_url?: true;
    image_public_id?: true;
    updated_by?: true;
    created_at?: true;
    updated_at?: true;
};
export type Home_hero_slidesCountAggregateInputType = {
    slug?: true;
    position?: true;
    eyebrow?: true;
    title?: true;
    accent_title?: true;
    description?: true;
    cta_label?: true;
    cta_to?: true;
    thumbnail_title?: true;
    image_url?: true;
    image_public_id?: true;
    updated_by?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Home_hero_slidesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.home_hero_slidesWhereInput;
    orderBy?: Prisma.home_hero_slidesOrderByWithRelationInput | Prisma.home_hero_slidesOrderByWithRelationInput[];
    cursor?: Prisma.home_hero_slidesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Home_hero_slidesCountAggregateInputType;
    _avg?: Home_hero_slidesAvgAggregateInputType;
    _sum?: Home_hero_slidesSumAggregateInputType;
    _min?: Home_hero_slidesMinAggregateInputType;
    _max?: Home_hero_slidesMaxAggregateInputType;
};
export type GetHome_hero_slidesAggregateType<T extends Home_hero_slidesAggregateArgs> = {
    [P in keyof T & keyof AggregateHome_hero_slides]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHome_hero_slides[P]> : Prisma.GetScalarType<T[P], AggregateHome_hero_slides[P]>;
};
export type home_hero_slidesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.home_hero_slidesWhereInput;
    orderBy?: Prisma.home_hero_slidesOrderByWithAggregationInput | Prisma.home_hero_slidesOrderByWithAggregationInput[];
    by: Prisma.Home_hero_slidesScalarFieldEnum[] | Prisma.Home_hero_slidesScalarFieldEnum;
    having?: Prisma.home_hero_slidesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Home_hero_slidesCountAggregateInputType | true;
    _avg?: Home_hero_slidesAvgAggregateInputType;
    _sum?: Home_hero_slidesSumAggregateInputType;
    _min?: Home_hero_slidesMinAggregateInputType;
    _max?: Home_hero_slidesMaxAggregateInputType;
};
export type Home_hero_slidesGroupByOutputType = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url: string | null;
    image_public_id: string | null;
    updated_by: bigint | null;
    created_at: Date;
    updated_at: Date;
    _count: Home_hero_slidesCountAggregateOutputType | null;
    _avg: Home_hero_slidesAvgAggregateOutputType | null;
    _sum: Home_hero_slidesSumAggregateOutputType | null;
    _min: Home_hero_slidesMinAggregateOutputType | null;
    _max: Home_hero_slidesMaxAggregateOutputType | null;
};
export type GetHome_hero_slidesGroupByPayload<T extends home_hero_slidesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Home_hero_slidesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Home_hero_slidesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Home_hero_slidesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Home_hero_slidesGroupByOutputType[P]>;
}>>;
export type home_hero_slidesWhereInput = {
    AND?: Prisma.home_hero_slidesWhereInput | Prisma.home_hero_slidesWhereInput[];
    OR?: Prisma.home_hero_slidesWhereInput[];
    NOT?: Prisma.home_hero_slidesWhereInput | Prisma.home_hero_slidesWhereInput[];
    slug?: Prisma.StringFilter<"home_hero_slides"> | string;
    position?: Prisma.IntFilter<"home_hero_slides"> | number;
    eyebrow?: Prisma.StringFilter<"home_hero_slides"> | string;
    title?: Prisma.StringFilter<"home_hero_slides"> | string;
    accent_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    description?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_label?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_to?: Prisma.StringFilter<"home_hero_slides"> | string;
    thumbnail_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    image_url?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    image_public_id?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    updated_by?: Prisma.BigIntNullableFilter<"home_hero_slides"> | bigint | number | null;
    created_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
};
export type home_hero_slidesOrderByWithRelationInput = {
    slug?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    accent_title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cta_label?: Prisma.SortOrder;
    cta_to?: Prisma.SortOrder;
    thumbnail_title?: Prisma.SortOrder;
    image_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type home_hero_slidesWhereUniqueInput = Prisma.AtLeast<{
    slug?: string;
    position?: number;
    AND?: Prisma.home_hero_slidesWhereInput | Prisma.home_hero_slidesWhereInput[];
    OR?: Prisma.home_hero_slidesWhereInput[];
    NOT?: Prisma.home_hero_slidesWhereInput | Prisma.home_hero_slidesWhereInput[];
    eyebrow?: Prisma.StringFilter<"home_hero_slides"> | string;
    title?: Prisma.StringFilter<"home_hero_slides"> | string;
    accent_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    description?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_label?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_to?: Prisma.StringFilter<"home_hero_slides"> | string;
    thumbnail_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    image_url?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    image_public_id?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    updated_by?: Prisma.BigIntNullableFilter<"home_hero_slides"> | bigint | number | null;
    created_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
}, "slug" | "position">;
export type home_hero_slidesOrderByWithAggregationInput = {
    slug?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    accent_title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cta_label?: Prisma.SortOrder;
    cta_to?: Prisma.SortOrder;
    thumbnail_title?: Prisma.SortOrder;
    image_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.home_hero_slidesCountOrderByAggregateInput;
    _avg?: Prisma.home_hero_slidesAvgOrderByAggregateInput;
    _max?: Prisma.home_hero_slidesMaxOrderByAggregateInput;
    _min?: Prisma.home_hero_slidesMinOrderByAggregateInput;
    _sum?: Prisma.home_hero_slidesSumOrderByAggregateInput;
};
export type home_hero_slidesScalarWhereWithAggregatesInput = {
    AND?: Prisma.home_hero_slidesScalarWhereWithAggregatesInput | Prisma.home_hero_slidesScalarWhereWithAggregatesInput[];
    OR?: Prisma.home_hero_slidesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.home_hero_slidesScalarWhereWithAggregatesInput | Prisma.home_hero_slidesScalarWhereWithAggregatesInput[];
    slug?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    position?: Prisma.IntWithAggregatesFilter<"home_hero_slides"> | number;
    eyebrow?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    title?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    accent_title?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    description?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    cta_label?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    cta_to?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    thumbnail_title?: Prisma.StringWithAggregatesFilter<"home_hero_slides"> | string;
    image_url?: Prisma.StringNullableWithAggregatesFilter<"home_hero_slides"> | string | null;
    image_public_id?: Prisma.StringNullableWithAggregatesFilter<"home_hero_slides"> | string | null;
    updated_by?: Prisma.BigIntNullableWithAggregatesFilter<"home_hero_slides"> | bigint | number | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"home_hero_slides"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"home_hero_slides"> | Date | string;
};
export type home_hero_slidesCreateInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    users?: Prisma.usersCreateNestedOneWithoutHome_hero_slidesInput;
};
export type home_hero_slidesUncheckedCreateInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    updated_by?: bigint | number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type home_hero_slidesUpdateInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneWithoutHome_hero_slidesNestedInput;
};
export type home_hero_slidesUncheckedUpdateInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesCreateManyInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    updated_by?: bigint | number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type home_hero_slidesUpdateManyMutationInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesUncheckedUpdateManyInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesCountOrderByAggregateInput = {
    slug?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    accent_title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cta_label?: Prisma.SortOrder;
    cta_to?: Prisma.SortOrder;
    thumbnail_title?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    image_public_id?: Prisma.SortOrder;
    updated_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type home_hero_slidesAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
    updated_by?: Prisma.SortOrder;
};
export type home_hero_slidesMaxOrderByAggregateInput = {
    slug?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    accent_title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cta_label?: Prisma.SortOrder;
    cta_to?: Prisma.SortOrder;
    thumbnail_title?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    image_public_id?: Prisma.SortOrder;
    updated_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type home_hero_slidesMinOrderByAggregateInput = {
    slug?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    eyebrow?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    accent_title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cta_label?: Prisma.SortOrder;
    cta_to?: Prisma.SortOrder;
    thumbnail_title?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    image_public_id?: Prisma.SortOrder;
    updated_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type home_hero_slidesSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
    updated_by?: Prisma.SortOrder;
};
export type Home_hero_slidesListRelationFilter = {
    every?: Prisma.home_hero_slidesWhereInput;
    some?: Prisma.home_hero_slidesWhereInput;
    none?: Prisma.home_hero_slidesWhereInput;
};
export type home_hero_slidesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type home_hero_slidesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput> | Prisma.home_hero_slidesCreateWithoutUsersInput[] | Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput | Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.home_hero_slidesCreateManyUsersInputEnvelope;
    connect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
};
export type home_hero_slidesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput> | Prisma.home_hero_slidesCreateWithoutUsersInput[] | Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput | Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.home_hero_slidesCreateManyUsersInputEnvelope;
    connect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
};
export type home_hero_slidesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput> | Prisma.home_hero_slidesCreateWithoutUsersInput[] | Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput | Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.home_hero_slidesUpsertWithWhereUniqueWithoutUsersInput | Prisma.home_hero_slidesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.home_hero_slidesCreateManyUsersInputEnvelope;
    set?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    disconnect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    delete?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    connect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    update?: Prisma.home_hero_slidesUpdateWithWhereUniqueWithoutUsersInput | Prisma.home_hero_slidesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.home_hero_slidesUpdateManyWithWhereWithoutUsersInput | Prisma.home_hero_slidesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.home_hero_slidesScalarWhereInput | Prisma.home_hero_slidesScalarWhereInput[];
};
export type home_hero_slidesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput> | Prisma.home_hero_slidesCreateWithoutUsersInput[] | Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput | Prisma.home_hero_slidesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.home_hero_slidesUpsertWithWhereUniqueWithoutUsersInput | Prisma.home_hero_slidesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.home_hero_slidesCreateManyUsersInputEnvelope;
    set?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    disconnect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    delete?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    connect?: Prisma.home_hero_slidesWhereUniqueInput | Prisma.home_hero_slidesWhereUniqueInput[];
    update?: Prisma.home_hero_slidesUpdateWithWhereUniqueWithoutUsersInput | Prisma.home_hero_slidesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.home_hero_slidesUpdateManyWithWhereWithoutUsersInput | Prisma.home_hero_slidesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.home_hero_slidesScalarWhereInput | Prisma.home_hero_slidesScalarWhereInput[];
};
export type home_hero_slidesCreateWithoutUsersInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type home_hero_slidesUncheckedCreateWithoutUsersInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type home_hero_slidesCreateOrConnectWithoutUsersInput = {
    where: Prisma.home_hero_slidesWhereUniqueInput;
    create: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput>;
};
export type home_hero_slidesCreateManyUsersInputEnvelope = {
    data: Prisma.home_hero_slidesCreateManyUsersInput | Prisma.home_hero_slidesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type home_hero_slidesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.home_hero_slidesWhereUniqueInput;
    update: Prisma.XOR<Prisma.home_hero_slidesUpdateWithoutUsersInput, Prisma.home_hero_slidesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.home_hero_slidesCreateWithoutUsersInput, Prisma.home_hero_slidesUncheckedCreateWithoutUsersInput>;
};
export type home_hero_slidesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.home_hero_slidesWhereUniqueInput;
    data: Prisma.XOR<Prisma.home_hero_slidesUpdateWithoutUsersInput, Prisma.home_hero_slidesUncheckedUpdateWithoutUsersInput>;
};
export type home_hero_slidesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.home_hero_slidesScalarWhereInput;
    data: Prisma.XOR<Prisma.home_hero_slidesUpdateManyMutationInput, Prisma.home_hero_slidesUncheckedUpdateManyWithoutUsersInput>;
};
export type home_hero_slidesScalarWhereInput = {
    AND?: Prisma.home_hero_slidesScalarWhereInput | Prisma.home_hero_slidesScalarWhereInput[];
    OR?: Prisma.home_hero_slidesScalarWhereInput[];
    NOT?: Prisma.home_hero_slidesScalarWhereInput | Prisma.home_hero_slidesScalarWhereInput[];
    slug?: Prisma.StringFilter<"home_hero_slides"> | string;
    position?: Prisma.IntFilter<"home_hero_slides"> | number;
    eyebrow?: Prisma.StringFilter<"home_hero_slides"> | string;
    title?: Prisma.StringFilter<"home_hero_slides"> | string;
    accent_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    description?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_label?: Prisma.StringFilter<"home_hero_slides"> | string;
    cta_to?: Prisma.StringFilter<"home_hero_slides"> | string;
    thumbnail_title?: Prisma.StringFilter<"home_hero_slides"> | string;
    image_url?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    image_public_id?: Prisma.StringNullableFilter<"home_hero_slides"> | string | null;
    updated_by?: Prisma.BigIntNullableFilter<"home_hero_slides"> | bigint | number | null;
    created_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"home_hero_slides"> | Date | string;
};
export type home_hero_slidesCreateManyUsersInput = {
    slug: string;
    position: number;
    eyebrow: string;
    title: string;
    accent_title: string;
    description: string;
    cta_label: string;
    cta_to: string;
    thumbnail_title: string;
    image_url?: string | null;
    image_public_id?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type home_hero_slidesUpdateWithoutUsersInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesUncheckedUpdateWithoutUsersInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesUncheckedUpdateManyWithoutUsersInput = {
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    eyebrow?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    accent_title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_label?: Prisma.StringFieldUpdateOperationsInput | string;
    cta_to?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail_title?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type home_hero_slidesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    slug?: boolean;
    position?: boolean;
    eyebrow?: boolean;
    title?: boolean;
    accent_title?: boolean;
    description?: boolean;
    cta_label?: boolean;
    cta_to?: boolean;
    thumbnail_title?: boolean;
    image_url?: boolean;
    image_public_id?: boolean;
    updated_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
}, ExtArgs["result"]["home_hero_slides"]>;
export type home_hero_slidesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    slug?: boolean;
    position?: boolean;
    eyebrow?: boolean;
    title?: boolean;
    accent_title?: boolean;
    description?: boolean;
    cta_label?: boolean;
    cta_to?: boolean;
    thumbnail_title?: boolean;
    image_url?: boolean;
    image_public_id?: boolean;
    updated_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
}, ExtArgs["result"]["home_hero_slides"]>;
export type home_hero_slidesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    slug?: boolean;
    position?: boolean;
    eyebrow?: boolean;
    title?: boolean;
    accent_title?: boolean;
    description?: boolean;
    cta_label?: boolean;
    cta_to?: boolean;
    thumbnail_title?: boolean;
    image_url?: boolean;
    image_public_id?: boolean;
    updated_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
}, ExtArgs["result"]["home_hero_slides"]>;
export type home_hero_slidesSelectScalar = {
    slug?: boolean;
    position?: boolean;
    eyebrow?: boolean;
    title?: boolean;
    accent_title?: boolean;
    description?: boolean;
    cta_label?: boolean;
    cta_to?: boolean;
    thumbnail_title?: boolean;
    image_url?: boolean;
    image_public_id?: boolean;
    updated_by?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type home_hero_slidesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"slug" | "position" | "eyebrow" | "title" | "accent_title" | "description" | "cta_label" | "cta_to" | "thumbnail_title" | "image_url" | "image_public_id" | "updated_by" | "created_at" | "updated_at", ExtArgs["result"]["home_hero_slides"]>;
export type home_hero_slidesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
};
export type home_hero_slidesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
};
export type home_hero_slidesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.home_hero_slides$usersArgs<ExtArgs>;
};
export type $home_hero_slidesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "home_hero_slides";
    objects: {
        users: Prisma.$usersPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        slug: string;
        position: number;
        eyebrow: string;
        title: string;
        accent_title: string;
        description: string;
        cta_label: string;
        cta_to: string;
        thumbnail_title: string;
        image_url: string | null;
        image_public_id: string | null;
        updated_by: bigint | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["home_hero_slides"]>;
    composites: {};
};
export type home_hero_slidesGetPayload<S extends boolean | null | undefined | home_hero_slidesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload, S>;
export type home_hero_slidesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<home_hero_slidesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Home_hero_slidesCountAggregateInputType | true;
};
export interface home_hero_slidesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['home_hero_slides'];
        meta: {
            name: 'home_hero_slides';
        };
    };
    findUnique<T extends home_hero_slidesFindUniqueArgs>(args: Prisma.SelectSubset<T, home_hero_slidesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends home_hero_slidesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, home_hero_slidesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends home_hero_slidesFindFirstArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesFindFirstArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends home_hero_slidesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends home_hero_slidesFindManyArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends home_hero_slidesCreateArgs>(args: Prisma.SelectSubset<T, home_hero_slidesCreateArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends home_hero_slidesCreateManyArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends home_hero_slidesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends home_hero_slidesDeleteArgs>(args: Prisma.SelectSubset<T, home_hero_slidesDeleteArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends home_hero_slidesUpdateArgs>(args: Prisma.SelectSubset<T, home_hero_slidesUpdateArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends home_hero_slidesDeleteManyArgs>(args?: Prisma.SelectSubset<T, home_hero_slidesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends home_hero_slidesUpdateManyArgs>(args: Prisma.SelectSubset<T, home_hero_slidesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends home_hero_slidesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, home_hero_slidesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends home_hero_slidesUpsertArgs>(args: Prisma.SelectSubset<T, home_hero_slidesUpsertArgs<ExtArgs>>): Prisma.Prisma__home_hero_slidesClient<runtime.Types.Result.GetResult<Prisma.$home_hero_slidesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends home_hero_slidesCountArgs>(args?: Prisma.Subset<T, home_hero_slidesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Home_hero_slidesCountAggregateOutputType> : number>;
    aggregate<T extends Home_hero_slidesAggregateArgs>(args: Prisma.Subset<T, Home_hero_slidesAggregateArgs>): Prisma.PrismaPromise<GetHome_hero_slidesAggregateType<T>>;
    groupBy<T extends home_hero_slidesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: home_hero_slidesGroupByArgs['orderBy'];
    } : {
        orderBy?: home_hero_slidesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, home_hero_slidesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHome_hero_slidesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: home_hero_slidesFieldRefs;
}
export interface Prisma__home_hero_slidesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.home_hero_slides$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.home_hero_slides$usersArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface home_hero_slidesFieldRefs {
    readonly slug: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly position: Prisma.FieldRef<"home_hero_slides", 'Int'>;
    readonly eyebrow: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly title: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly accent_title: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly description: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly cta_label: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly cta_to: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly thumbnail_title: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly image_url: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly image_public_id: Prisma.FieldRef<"home_hero_slides", 'String'>;
    readonly updated_by: Prisma.FieldRef<"home_hero_slides", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"home_hero_slides", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"home_hero_slides", 'DateTime'>;
}
export type home_hero_slidesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where: Prisma.home_hero_slidesWhereUniqueInput;
};
export type home_hero_slidesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where: Prisma.home_hero_slidesWhereUniqueInput;
};
export type home_hero_slidesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where?: Prisma.home_hero_slidesWhereInput;
    orderBy?: Prisma.home_hero_slidesOrderByWithRelationInput | Prisma.home_hero_slidesOrderByWithRelationInput[];
    cursor?: Prisma.home_hero_slidesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Home_hero_slidesScalarFieldEnum | Prisma.Home_hero_slidesScalarFieldEnum[];
};
export type home_hero_slidesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where?: Prisma.home_hero_slidesWhereInput;
    orderBy?: Prisma.home_hero_slidesOrderByWithRelationInput | Prisma.home_hero_slidesOrderByWithRelationInput[];
    cursor?: Prisma.home_hero_slidesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Home_hero_slidesScalarFieldEnum | Prisma.Home_hero_slidesScalarFieldEnum[];
};
export type home_hero_slidesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where?: Prisma.home_hero_slidesWhereInput;
    orderBy?: Prisma.home_hero_slidesOrderByWithRelationInput | Prisma.home_hero_slidesOrderByWithRelationInput[];
    cursor?: Prisma.home_hero_slidesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Home_hero_slidesScalarFieldEnum | Prisma.Home_hero_slidesScalarFieldEnum[];
};
export type home_hero_slidesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.home_hero_slidesCreateInput, Prisma.home_hero_slidesUncheckedCreateInput>;
};
export type home_hero_slidesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.home_hero_slidesCreateManyInput | Prisma.home_hero_slidesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type home_hero_slidesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    data: Prisma.home_hero_slidesCreateManyInput | Prisma.home_hero_slidesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.home_hero_slidesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type home_hero_slidesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.home_hero_slidesUpdateInput, Prisma.home_hero_slidesUncheckedUpdateInput>;
    where: Prisma.home_hero_slidesWhereUniqueInput;
};
export type home_hero_slidesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.home_hero_slidesUpdateManyMutationInput, Prisma.home_hero_slidesUncheckedUpdateManyInput>;
    where?: Prisma.home_hero_slidesWhereInput;
    limit?: number;
};
export type home_hero_slidesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.home_hero_slidesUpdateManyMutationInput, Prisma.home_hero_slidesUncheckedUpdateManyInput>;
    where?: Prisma.home_hero_slidesWhereInput;
    limit?: number;
    include?: Prisma.home_hero_slidesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type home_hero_slidesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where: Prisma.home_hero_slidesWhereUniqueInput;
    create: Prisma.XOR<Prisma.home_hero_slidesCreateInput, Prisma.home_hero_slidesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.home_hero_slidesUpdateInput, Prisma.home_hero_slidesUncheckedUpdateInput>;
};
export type home_hero_slidesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
    where: Prisma.home_hero_slidesWhereUniqueInput;
};
export type home_hero_slidesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.home_hero_slidesWhereInput;
    limit?: number;
};
export type home_hero_slides$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type home_hero_slidesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.home_hero_slidesSelect<ExtArgs> | null;
    omit?: Prisma.home_hero_slidesOmit<ExtArgs> | null;
    include?: Prisma.home_hero_slidesInclude<ExtArgs> | null;
};
