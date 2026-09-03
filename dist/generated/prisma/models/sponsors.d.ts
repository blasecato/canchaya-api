import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type sponsorsModel = runtime.Types.Result.DefaultSelection<Prisma.$sponsorsPayload>;
export type AggregateSponsors = {
    _count: SponsorsCountAggregateOutputType | null;
    _avg: SponsorsAvgAggregateOutputType | null;
    _sum: SponsorsSumAggregateOutputType | null;
    _min: SponsorsMinAggregateOutputType | null;
    _max: SponsorsMaxAggregateOutputType | null;
};
export type SponsorsAvgAggregateOutputType = {
    id: number | null;
};
export type SponsorsSumAggregateOutputType = {
    id: bigint | null;
};
export type SponsorsMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    tax_id: string | null;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
    website_url: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SponsorsMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    tax_id: string | null;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
    website_url: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SponsorsCountAggregateOutputType = {
    id: number;
    name: number;
    tax_id: number;
    contact_name: number;
    email: number;
    phone: number;
    website_url: number;
    logo_url: number;
    logo_public_id: number;
    status: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type SponsorsAvgAggregateInputType = {
    id?: true;
};
export type SponsorsSumAggregateInputType = {
    id?: true;
};
export type SponsorsMinAggregateInputType = {
    id?: true;
    name?: true;
    tax_id?: true;
    contact_name?: true;
    email?: true;
    phone?: true;
    website_url?: true;
    logo_url?: true;
    logo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type SponsorsMaxAggregateInputType = {
    id?: true;
    name?: true;
    tax_id?: true;
    contact_name?: true;
    email?: true;
    phone?: true;
    website_url?: true;
    logo_url?: true;
    logo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type SponsorsCountAggregateInputType = {
    id?: true;
    name?: true;
    tax_id?: true;
    contact_name?: true;
    email?: true;
    phone?: true;
    website_url?: true;
    logo_url?: true;
    logo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type SponsorsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sponsorsWhereInput;
    orderBy?: Prisma.sponsorsOrderByWithRelationInput | Prisma.sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SponsorsCountAggregateInputType;
    _avg?: SponsorsAvgAggregateInputType;
    _sum?: SponsorsSumAggregateInputType;
    _min?: SponsorsMinAggregateInputType;
    _max?: SponsorsMaxAggregateInputType;
};
export type GetSponsorsAggregateType<T extends SponsorsAggregateArgs> = {
    [P in keyof T & keyof AggregateSponsors]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSponsors[P]> : Prisma.GetScalarType<T[P], AggregateSponsors[P]>;
};
export type sponsorsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sponsorsWhereInput;
    orderBy?: Prisma.sponsorsOrderByWithAggregationInput | Prisma.sponsorsOrderByWithAggregationInput[];
    by: Prisma.SponsorsScalarFieldEnum[] | Prisma.SponsorsScalarFieldEnum;
    having?: Prisma.sponsorsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SponsorsCountAggregateInputType | true;
    _avg?: SponsorsAvgAggregateInputType;
    _sum?: SponsorsSumAggregateInputType;
    _min?: SponsorsMinAggregateInputType;
    _max?: SponsorsMaxAggregateInputType;
};
export type SponsorsGroupByOutputType = {
    id: bigint;
    name: string;
    tax_id: string | null;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
    website_url: string | null;
    logo_url: string | null;
    logo_public_id: string | null;
    status: string;
    created_at: Date;
    updated_at: Date;
    _count: SponsorsCountAggregateOutputType | null;
    _avg: SponsorsAvgAggregateOutputType | null;
    _sum: SponsorsSumAggregateOutputType | null;
    _min: SponsorsMinAggregateOutputType | null;
    _max: SponsorsMaxAggregateOutputType | null;
};
export type GetSponsorsGroupByPayload<T extends sponsorsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SponsorsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SponsorsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SponsorsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SponsorsGroupByOutputType[P]>;
}>>;
export type sponsorsWhereInput = {
    AND?: Prisma.sponsorsWhereInput | Prisma.sponsorsWhereInput[];
    OR?: Prisma.sponsorsWhereInput[];
    NOT?: Prisma.sponsorsWhereInput | Prisma.sponsorsWhereInput[];
    id?: Prisma.BigIntFilter<"sponsors"> | bigint | number;
    name?: Prisma.StringFilter<"sponsors"> | string;
    tax_id?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    contact_name?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    email?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    phone?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    website_url?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    logo_url?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    logo_public_id?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    status?: Prisma.StringFilter<"sponsors"> | string;
    created_at?: Prisma.DateTimeFilter<"sponsors"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"sponsors"> | Date | string;
    tournament_sponsors?: Prisma.Tournament_sponsorsListRelationFilter;
};
export type sponsorsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    contact_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    website_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    tournament_sponsors?: Prisma.tournament_sponsorsOrderByRelationAggregateInput;
};
export type sponsorsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    tax_id?: string;
    AND?: Prisma.sponsorsWhereInput | Prisma.sponsorsWhereInput[];
    OR?: Prisma.sponsorsWhereInput[];
    NOT?: Prisma.sponsorsWhereInput | Prisma.sponsorsWhereInput[];
    name?: Prisma.StringFilter<"sponsors"> | string;
    contact_name?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    email?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    phone?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    website_url?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    logo_url?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    logo_public_id?: Prisma.StringNullableFilter<"sponsors"> | string | null;
    status?: Prisma.StringFilter<"sponsors"> | string;
    created_at?: Prisma.DateTimeFilter<"sponsors"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"sponsors"> | Date | string;
    tournament_sponsors?: Prisma.Tournament_sponsorsListRelationFilter;
}, "id" | "tax_id">;
export type sponsorsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    contact_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    website_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.sponsorsCountOrderByAggregateInput;
    _avg?: Prisma.sponsorsAvgOrderByAggregateInput;
    _max?: Prisma.sponsorsMaxOrderByAggregateInput;
    _min?: Prisma.sponsorsMinOrderByAggregateInput;
    _sum?: Prisma.sponsorsSumOrderByAggregateInput;
};
export type sponsorsScalarWhereWithAggregatesInput = {
    AND?: Prisma.sponsorsScalarWhereWithAggregatesInput | Prisma.sponsorsScalarWhereWithAggregatesInput[];
    OR?: Prisma.sponsorsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.sponsorsScalarWhereWithAggregatesInput | Prisma.sponsorsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"sponsors"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"sponsors"> | string;
    tax_id?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    contact_name?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    website_url?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    logo_url?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    logo_public_id?: Prisma.StringNullableWithAggregatesFilter<"sponsors"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"sponsors"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"sponsors"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"sponsors"> | Date | string;
};
export type sponsorsCreateInput = {
    id?: bigint | number;
    name: string;
    tax_id?: string | null;
    contact_name?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournament_sponsors?: Prisma.tournament_sponsorsCreateNestedManyWithoutSponsorsInput;
};
export type sponsorsUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    tax_id?: string | null;
    contact_name?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournament_sponsors?: Prisma.tournament_sponsorsUncheckedCreateNestedManyWithoutSponsorsInput;
};
export type sponsorsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_sponsors?: Prisma.tournament_sponsorsUpdateManyWithoutSponsorsNestedInput;
};
export type sponsorsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_sponsors?: Prisma.tournament_sponsorsUncheckedUpdateManyWithoutSponsorsNestedInput;
};
export type sponsorsCreateManyInput = {
    id?: bigint | number;
    name: string;
    tax_id?: string | null;
    contact_name?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type sponsorsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type sponsorsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type sponsorsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    contact_name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    website_url?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type sponsorsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type sponsorsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    contact_name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    website_url?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type sponsorsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_id?: Prisma.SortOrder;
    contact_name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    website_url?: Prisma.SortOrder;
    logo_url?: Prisma.SortOrder;
    logo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type sponsorsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SponsorsScalarRelationFilter = {
    is?: Prisma.sponsorsWhereInput;
    isNot?: Prisma.sponsorsWhereInput;
};
export type sponsorsCreateNestedOneWithoutTournament_sponsorsInput = {
    create?: Prisma.XOR<Prisma.sponsorsCreateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedCreateWithoutTournament_sponsorsInput>;
    connectOrCreate?: Prisma.sponsorsCreateOrConnectWithoutTournament_sponsorsInput;
    connect?: Prisma.sponsorsWhereUniqueInput;
};
export type sponsorsUpdateOneRequiredWithoutTournament_sponsorsNestedInput = {
    create?: Prisma.XOR<Prisma.sponsorsCreateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedCreateWithoutTournament_sponsorsInput>;
    connectOrCreate?: Prisma.sponsorsCreateOrConnectWithoutTournament_sponsorsInput;
    upsert?: Prisma.sponsorsUpsertWithoutTournament_sponsorsInput;
    connect?: Prisma.sponsorsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.sponsorsUpdateToOneWithWhereWithoutTournament_sponsorsInput, Prisma.sponsorsUpdateWithoutTournament_sponsorsInput>, Prisma.sponsorsUncheckedUpdateWithoutTournament_sponsorsInput>;
};
export type sponsorsCreateWithoutTournament_sponsorsInput = {
    id?: bigint | number;
    name: string;
    tax_id?: string | null;
    contact_name?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type sponsorsUncheckedCreateWithoutTournament_sponsorsInput = {
    id?: bigint | number;
    name: string;
    tax_id?: string | null;
    contact_name?: string | null;
    email?: string | null;
    phone?: string | null;
    website_url?: string | null;
    logo_url?: string | null;
    logo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type sponsorsCreateOrConnectWithoutTournament_sponsorsInput = {
    where: Prisma.sponsorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.sponsorsCreateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedCreateWithoutTournament_sponsorsInput>;
};
export type sponsorsUpsertWithoutTournament_sponsorsInput = {
    update: Prisma.XOR<Prisma.sponsorsUpdateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedUpdateWithoutTournament_sponsorsInput>;
    create: Prisma.XOR<Prisma.sponsorsCreateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedCreateWithoutTournament_sponsorsInput>;
    where?: Prisma.sponsorsWhereInput;
};
export type sponsorsUpdateToOneWithWhereWithoutTournament_sponsorsInput = {
    where?: Prisma.sponsorsWhereInput;
    data: Prisma.XOR<Prisma.sponsorsUpdateWithoutTournament_sponsorsInput, Prisma.sponsorsUncheckedUpdateWithoutTournament_sponsorsInput>;
};
export type sponsorsUpdateWithoutTournament_sponsorsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type sponsorsUncheckedUpdateWithoutTournament_sponsorsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SponsorsCountOutputType = {
    tournament_sponsors: number;
};
export type SponsorsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournament_sponsors?: boolean | SponsorsCountOutputTypeCountTournament_sponsorsArgs;
};
export type SponsorsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SponsorsCountOutputTypeSelect<ExtArgs> | null;
};
export type SponsorsCountOutputTypeCountTournament_sponsorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_sponsorsWhereInput;
};
export type sponsorsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tax_id?: boolean;
    contact_name?: boolean;
    email?: boolean;
    phone?: boolean;
    website_url?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    tournament_sponsors?: boolean | Prisma.sponsors$tournament_sponsorsArgs<ExtArgs>;
    _count?: boolean | Prisma.SponsorsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sponsors"]>;
export type sponsorsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tax_id?: boolean;
    contact_name?: boolean;
    email?: boolean;
    phone?: boolean;
    website_url?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["sponsors"]>;
export type sponsorsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tax_id?: boolean;
    contact_name?: boolean;
    email?: boolean;
    phone?: boolean;
    website_url?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["sponsors"]>;
export type sponsorsSelectScalar = {
    id?: boolean;
    name?: boolean;
    tax_id?: boolean;
    contact_name?: boolean;
    email?: boolean;
    phone?: boolean;
    website_url?: boolean;
    logo_url?: boolean;
    logo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type sponsorsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "tax_id" | "contact_name" | "email" | "phone" | "website_url" | "logo_url" | "logo_public_id" | "status" | "created_at" | "updated_at", ExtArgs["result"]["sponsors"]>;
export type sponsorsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournament_sponsors?: boolean | Prisma.sponsors$tournament_sponsorsArgs<ExtArgs>;
    _count?: boolean | Prisma.SponsorsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type sponsorsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type sponsorsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $sponsorsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "sponsors";
    objects: {
        tournament_sponsors: Prisma.$tournament_sponsorsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        email: string | null;
        phone: string | null;
        website_url: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["sponsors"]>;
    composites: {};
};
export type sponsorsGetPayload<S extends boolean | null | undefined | sponsorsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$sponsorsPayload, S>;
export type sponsorsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<sponsorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SponsorsCountAggregateInputType | true;
};
export interface sponsorsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['sponsors'];
        meta: {
            name: 'sponsors';
        };
    };
    findUnique<T extends sponsorsFindUniqueArgs>(args: Prisma.SelectSubset<T, sponsorsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends sponsorsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, sponsorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends sponsorsFindFirstArgs>(args?: Prisma.SelectSubset<T, sponsorsFindFirstArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends sponsorsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, sponsorsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends sponsorsFindManyArgs>(args?: Prisma.SelectSubset<T, sponsorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends sponsorsCreateArgs>(args: Prisma.SelectSubset<T, sponsorsCreateArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends sponsorsCreateManyArgs>(args?: Prisma.SelectSubset<T, sponsorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends sponsorsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, sponsorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends sponsorsDeleteArgs>(args: Prisma.SelectSubset<T, sponsorsDeleteArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends sponsorsUpdateArgs>(args: Prisma.SelectSubset<T, sponsorsUpdateArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends sponsorsDeleteManyArgs>(args?: Prisma.SelectSubset<T, sponsorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends sponsorsUpdateManyArgs>(args: Prisma.SelectSubset<T, sponsorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends sponsorsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, sponsorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends sponsorsUpsertArgs>(args: Prisma.SelectSubset<T, sponsorsUpsertArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends sponsorsCountArgs>(args?: Prisma.Subset<T, sponsorsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SponsorsCountAggregateOutputType> : number>;
    aggregate<T extends SponsorsAggregateArgs>(args: Prisma.Subset<T, SponsorsAggregateArgs>): Prisma.PrismaPromise<GetSponsorsAggregateType<T>>;
    groupBy<T extends sponsorsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: sponsorsGroupByArgs['orderBy'];
    } : {
        orderBy?: sponsorsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, sponsorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSponsorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: sponsorsFieldRefs;
}
export interface Prisma__sponsorsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tournament_sponsors<T extends Prisma.sponsors$tournament_sponsorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.sponsors$tournament_sponsorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface sponsorsFieldRefs {
    readonly id: Prisma.FieldRef<"sponsors", 'BigInt'>;
    readonly name: Prisma.FieldRef<"sponsors", 'String'>;
    readonly tax_id: Prisma.FieldRef<"sponsors", 'String'>;
    readonly contact_name: Prisma.FieldRef<"sponsors", 'String'>;
    readonly email: Prisma.FieldRef<"sponsors", 'String'>;
    readonly phone: Prisma.FieldRef<"sponsors", 'String'>;
    readonly website_url: Prisma.FieldRef<"sponsors", 'String'>;
    readonly logo_url: Prisma.FieldRef<"sponsors", 'String'>;
    readonly logo_public_id: Prisma.FieldRef<"sponsors", 'String'>;
    readonly status: Prisma.FieldRef<"sponsors", 'String'>;
    readonly created_at: Prisma.FieldRef<"sponsors", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"sponsors", 'DateTime'>;
}
export type sponsorsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where: Prisma.sponsorsWhereUniqueInput;
};
export type sponsorsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where: Prisma.sponsorsWhereUniqueInput;
};
export type sponsorsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where?: Prisma.sponsorsWhereInput;
    orderBy?: Prisma.sponsorsOrderByWithRelationInput | Prisma.sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SponsorsScalarFieldEnum | Prisma.SponsorsScalarFieldEnum[];
};
export type sponsorsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where?: Prisma.sponsorsWhereInput;
    orderBy?: Prisma.sponsorsOrderByWithRelationInput | Prisma.sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SponsorsScalarFieldEnum | Prisma.SponsorsScalarFieldEnum[];
};
export type sponsorsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where?: Prisma.sponsorsWhereInput;
    orderBy?: Prisma.sponsorsOrderByWithRelationInput | Prisma.sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SponsorsScalarFieldEnum | Prisma.SponsorsScalarFieldEnum[];
};
export type sponsorsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sponsorsCreateInput, Prisma.sponsorsUncheckedCreateInput>;
};
export type sponsorsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.sponsorsCreateManyInput | Prisma.sponsorsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type sponsorsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    data: Prisma.sponsorsCreateManyInput | Prisma.sponsorsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type sponsorsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sponsorsUpdateInput, Prisma.sponsorsUncheckedUpdateInput>;
    where: Prisma.sponsorsWhereUniqueInput;
};
export type sponsorsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.sponsorsUpdateManyMutationInput, Prisma.sponsorsUncheckedUpdateManyInput>;
    where?: Prisma.sponsorsWhereInput;
    limit?: number;
};
export type sponsorsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.sponsorsUpdateManyMutationInput, Prisma.sponsorsUncheckedUpdateManyInput>;
    where?: Prisma.sponsorsWhereInput;
    limit?: number;
};
export type sponsorsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where: Prisma.sponsorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.sponsorsCreateInput, Prisma.sponsorsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.sponsorsUpdateInput, Prisma.sponsorsUncheckedUpdateInput>;
};
export type sponsorsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
    where: Prisma.sponsorsWhereUniqueInput;
};
export type sponsorsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sponsorsWhereInput;
    limit?: number;
};
export type sponsors$tournament_sponsorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    where?: Prisma.tournament_sponsorsWhereInput;
    orderBy?: Prisma.tournament_sponsorsOrderByWithRelationInput | Prisma.tournament_sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_sponsorsScalarFieldEnum | Prisma.Tournament_sponsorsScalarFieldEnum[];
};
export type sponsorsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.sponsorsOmit<ExtArgs> | null;
    include?: Prisma.sponsorsInclude<ExtArgs> | null;
};
