import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_sponsorsModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_sponsorsPayload>;
export type AggregateTournament_sponsors = {
    _count: Tournament_sponsorsCountAggregateOutputType | null;
    _avg: Tournament_sponsorsAvgAggregateOutputType | null;
    _sum: Tournament_sponsorsSumAggregateOutputType | null;
    _min: Tournament_sponsorsMinAggregateOutputType | null;
    _max: Tournament_sponsorsMaxAggregateOutputType | null;
};
export type Tournament_sponsorsAvgAggregateOutputType = {
    tournament_id: number | null;
    sponsor_id: number | null;
    contribution_amount: runtime.Decimal | null;
};
export type Tournament_sponsorsSumAggregateOutputType = {
    tournament_id: bigint | null;
    sponsor_id: bigint | null;
    contribution_amount: runtime.Decimal | null;
};
export type Tournament_sponsorsMinAggregateOutputType = {
    tournament_id: bigint | null;
    sponsor_id: bigint | null;
    sponsorship_level: string | null;
    contribution_type: string | null;
    contribution_amount: runtime.Decimal | null;
    currency_code: string | null;
    contribution_description: string | null;
    agreement_start_date: Date | null;
    agreement_end_date: Date | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_sponsorsMaxAggregateOutputType = {
    tournament_id: bigint | null;
    sponsor_id: bigint | null;
    sponsorship_level: string | null;
    contribution_type: string | null;
    contribution_amount: runtime.Decimal | null;
    currency_code: string | null;
    contribution_description: string | null;
    agreement_start_date: Date | null;
    agreement_end_date: Date | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_sponsorsCountAggregateOutputType = {
    tournament_id: number;
    sponsor_id: number;
    sponsorship_level: number;
    contribution_type: number;
    contribution_amount: number;
    currency_code: number;
    contribution_description: number;
    agreement_start_date: number;
    agreement_end_date: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Tournament_sponsorsAvgAggregateInputType = {
    tournament_id?: true;
    sponsor_id?: true;
    contribution_amount?: true;
};
export type Tournament_sponsorsSumAggregateInputType = {
    tournament_id?: true;
    sponsor_id?: true;
    contribution_amount?: true;
};
export type Tournament_sponsorsMinAggregateInputType = {
    tournament_id?: true;
    sponsor_id?: true;
    sponsorship_level?: true;
    contribution_type?: true;
    contribution_amount?: true;
    currency_code?: true;
    contribution_description?: true;
    agreement_start_date?: true;
    agreement_end_date?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_sponsorsMaxAggregateInputType = {
    tournament_id?: true;
    sponsor_id?: true;
    sponsorship_level?: true;
    contribution_type?: true;
    contribution_amount?: true;
    currency_code?: true;
    contribution_description?: true;
    agreement_start_date?: true;
    agreement_end_date?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_sponsorsCountAggregateInputType = {
    tournament_id?: true;
    sponsor_id?: true;
    sponsorship_level?: true;
    contribution_type?: true;
    contribution_amount?: true;
    currency_code?: true;
    contribution_description?: true;
    agreement_start_date?: true;
    agreement_end_date?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_sponsorsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_sponsorsWhereInput;
    orderBy?: Prisma.tournament_sponsorsOrderByWithRelationInput | Prisma.tournament_sponsorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_sponsorsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_sponsorsCountAggregateInputType;
    _avg?: Tournament_sponsorsAvgAggregateInputType;
    _sum?: Tournament_sponsorsSumAggregateInputType;
    _min?: Tournament_sponsorsMinAggregateInputType;
    _max?: Tournament_sponsorsMaxAggregateInputType;
};
export type GetTournament_sponsorsAggregateType<T extends Tournament_sponsorsAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_sponsors]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_sponsors[P]> : Prisma.GetScalarType<T[P], AggregateTournament_sponsors[P]>;
};
export type tournament_sponsorsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_sponsorsWhereInput;
    orderBy?: Prisma.tournament_sponsorsOrderByWithAggregationInput | Prisma.tournament_sponsorsOrderByWithAggregationInput[];
    by: Prisma.Tournament_sponsorsScalarFieldEnum[] | Prisma.Tournament_sponsorsScalarFieldEnum;
    having?: Prisma.tournament_sponsorsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_sponsorsCountAggregateInputType | true;
    _avg?: Tournament_sponsorsAvgAggregateInputType;
    _sum?: Tournament_sponsorsSumAggregateInputType;
    _min?: Tournament_sponsorsMinAggregateInputType;
    _max?: Tournament_sponsorsMaxAggregateInputType;
};
export type Tournament_sponsorsGroupByOutputType = {
    tournament_id: bigint;
    sponsor_id: bigint;
    sponsorship_level: string | null;
    contribution_type: string;
    contribution_amount: runtime.Decimal | null;
    currency_code: string;
    contribution_description: string | null;
    agreement_start_date: Date | null;
    agreement_end_date: Date | null;
    status: string;
    created_at: Date;
    _count: Tournament_sponsorsCountAggregateOutputType | null;
    _avg: Tournament_sponsorsAvgAggregateOutputType | null;
    _sum: Tournament_sponsorsSumAggregateOutputType | null;
    _min: Tournament_sponsorsMinAggregateOutputType | null;
    _max: Tournament_sponsorsMaxAggregateOutputType | null;
};
export type GetTournament_sponsorsGroupByPayload<T extends tournament_sponsorsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_sponsorsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_sponsorsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_sponsorsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_sponsorsGroupByOutputType[P]>;
}>>;
export type tournament_sponsorsWhereInput = {
    AND?: Prisma.tournament_sponsorsWhereInput | Prisma.tournament_sponsorsWhereInput[];
    OR?: Prisma.tournament_sponsorsWhereInput[];
    NOT?: Prisma.tournament_sponsorsWhereInput | Prisma.tournament_sponsorsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsor_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsorship_level?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    contribution_type?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_amount?: Prisma.DecimalNullableFilter<"tournament_sponsors"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_description?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    agreement_start_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    agreement_end_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    status?: Prisma.StringFilter<"tournament_sponsors"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_sponsors"> | Date | string;
    sponsors?: Prisma.XOR<Prisma.SponsorsScalarRelationFilter, Prisma.sponsorsWhereInput>;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
};
export type tournament_sponsorsOrderByWithRelationInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    sponsorship_level?: Prisma.SortOrderInput | Prisma.SortOrder;
    contribution_type?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    contribution_description?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreement_start_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreement_end_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    sponsors?: Prisma.sponsorsOrderByWithRelationInput;
    tournaments?: Prisma.tournamentsOrderByWithRelationInput;
};
export type tournament_sponsorsWhereUniqueInput = Prisma.AtLeast<{
    tournament_id_sponsor_id?: Prisma.tournament_sponsorsTournament_idSponsor_idCompoundUniqueInput;
    AND?: Prisma.tournament_sponsorsWhereInput | Prisma.tournament_sponsorsWhereInput[];
    OR?: Prisma.tournament_sponsorsWhereInput[];
    NOT?: Prisma.tournament_sponsorsWhereInput | Prisma.tournament_sponsorsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsor_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsorship_level?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    contribution_type?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_amount?: Prisma.DecimalNullableFilter<"tournament_sponsors"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_description?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    agreement_start_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    agreement_end_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    status?: Prisma.StringFilter<"tournament_sponsors"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_sponsors"> | Date | string;
    sponsors?: Prisma.XOR<Prisma.SponsorsScalarRelationFilter, Prisma.sponsorsWhereInput>;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
}, "tournament_id_sponsor_id">;
export type tournament_sponsorsOrderByWithAggregationInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    sponsorship_level?: Prisma.SortOrderInput | Prisma.SortOrder;
    contribution_type?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    contribution_description?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreement_start_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    agreement_end_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_sponsorsCountOrderByAggregateInput;
    _avg?: Prisma.tournament_sponsorsAvgOrderByAggregateInput;
    _max?: Prisma.tournament_sponsorsMaxOrderByAggregateInput;
    _min?: Prisma.tournament_sponsorsMinOrderByAggregateInput;
    _sum?: Prisma.tournament_sponsorsSumOrderByAggregateInput;
};
export type tournament_sponsorsScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_sponsorsScalarWhereWithAggregatesInput | Prisma.tournament_sponsorsScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_sponsorsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_sponsorsScalarWhereWithAggregatesInput | Prisma.tournament_sponsorsScalarWhereWithAggregatesInput[];
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_sponsors"> | bigint | number;
    sponsor_id?: Prisma.BigIntWithAggregatesFilter<"tournament_sponsors"> | bigint | number;
    sponsorship_level?: Prisma.StringNullableWithAggregatesFilter<"tournament_sponsors"> | string | null;
    contribution_type?: Prisma.StringWithAggregatesFilter<"tournament_sponsors"> | string;
    contribution_amount?: Prisma.DecimalNullableWithAggregatesFilter<"tournament_sponsors"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringWithAggregatesFilter<"tournament_sponsors"> | string;
    contribution_description?: Prisma.StringNullableWithAggregatesFilter<"tournament_sponsors"> | string | null;
    agreement_start_date?: Prisma.DateTimeNullableWithAggregatesFilter<"tournament_sponsors"> | Date | string | null;
    agreement_end_date?: Prisma.DateTimeNullableWithAggregatesFilter<"tournament_sponsors"> | Date | string | null;
    status?: Prisma.StringWithAggregatesFilter<"tournament_sponsors"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_sponsors"> | Date | string;
};
export type tournament_sponsorsCreateInput = {
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    sponsors: Prisma.sponsorsCreateNestedOneWithoutTournament_sponsorsInput;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_sponsorsInput;
};
export type tournament_sponsorsUncheckedCreateInput = {
    tournament_id: bigint | number;
    sponsor_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsUpdateInput = {
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sponsors?: Prisma.sponsorsUpdateOneRequiredWithoutTournament_sponsorsNestedInput;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_sponsorsNestedInput;
};
export type tournament_sponsorsUncheckedUpdateInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsor_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsCreateManyInput = {
    tournament_id: bigint | number;
    sponsor_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsUpdateManyMutationInput = {
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsUncheckedUpdateManyInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsor_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_sponsorsListRelationFilter = {
    every?: Prisma.tournament_sponsorsWhereInput;
    some?: Prisma.tournament_sponsorsWhereInput;
    none?: Prisma.tournament_sponsorsWhereInput;
};
export type tournament_sponsorsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_sponsorsTournament_idSponsor_idCompoundUniqueInput = {
    tournament_id: bigint | number;
    sponsor_id: bigint | number;
};
export type tournament_sponsorsCountOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    sponsorship_level?: Prisma.SortOrder;
    contribution_type?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    contribution_description?: Prisma.SortOrder;
    agreement_start_date?: Prisma.SortOrder;
    agreement_end_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_sponsorsAvgOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrder;
};
export type tournament_sponsorsMaxOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    sponsorship_level?: Prisma.SortOrder;
    contribution_type?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    contribution_description?: Prisma.SortOrder;
    agreement_start_date?: Prisma.SortOrder;
    agreement_end_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_sponsorsMinOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    sponsorship_level?: Prisma.SortOrder;
    contribution_type?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrder;
    currency_code?: Prisma.SortOrder;
    contribution_description?: Prisma.SortOrder;
    agreement_start_date?: Prisma.SortOrder;
    agreement_end_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_sponsorsSumOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    sponsor_id?: Prisma.SortOrder;
    contribution_amount?: Prisma.SortOrder;
};
export type tournament_sponsorsCreateNestedManyWithoutSponsorsInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput> | Prisma.tournament_sponsorsCreateWithoutSponsorsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManySponsorsInputEnvelope;
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
};
export type tournament_sponsorsUncheckedCreateNestedManyWithoutSponsorsInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput> | Prisma.tournament_sponsorsCreateWithoutSponsorsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManySponsorsInputEnvelope;
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
};
export type tournament_sponsorsUpdateManyWithoutSponsorsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput> | Prisma.tournament_sponsorsCreateWithoutSponsorsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput[];
    upsert?: Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutSponsorsInput | Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutSponsorsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManySponsorsInputEnvelope;
    set?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    delete?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    update?: Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutSponsorsInput | Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutSponsorsInput[];
    updateMany?: Prisma.tournament_sponsorsUpdateManyWithWhereWithoutSponsorsInput | Prisma.tournament_sponsorsUpdateManyWithWhereWithoutSponsorsInput[];
    deleteMany?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
};
export type tournament_sponsorsUncheckedUpdateManyWithoutSponsorsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput> | Prisma.tournament_sponsorsCreateWithoutSponsorsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutSponsorsInput[];
    upsert?: Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutSponsorsInput | Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutSponsorsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManySponsorsInputEnvelope;
    set?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    delete?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    update?: Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutSponsorsInput | Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutSponsorsInput[];
    updateMany?: Prisma.tournament_sponsorsUpdateManyWithWhereWithoutSponsorsInput | Prisma.tournament_sponsorsUpdateManyWithWhereWithoutSponsorsInput[];
    deleteMany?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type tournament_sponsorsCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_sponsorsCreateWithoutTournamentsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
};
export type tournament_sponsorsUncheckedCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_sponsorsCreateWithoutTournamentsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
};
export type tournament_sponsorsUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_sponsorsCreateWithoutTournamentsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    delete?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    update?: Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_sponsorsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_sponsorsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
};
export type tournament_sponsorsUncheckedUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_sponsorsCreateWithoutTournamentsInput[] | Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_sponsorsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_sponsorsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_sponsorsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    delete?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    connect?: Prisma.tournament_sponsorsWhereUniqueInput | Prisma.tournament_sponsorsWhereUniqueInput[];
    update?: Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_sponsorsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_sponsorsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_sponsorsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
};
export type tournament_sponsorsCreateWithoutSponsorsInput = {
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_sponsorsInput;
};
export type tournament_sponsorsUncheckedCreateWithoutSponsorsInput = {
    tournament_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsCreateOrConnectWithoutSponsorsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput>;
};
export type tournament_sponsorsCreateManySponsorsInputEnvelope = {
    data: Prisma.tournament_sponsorsCreateManySponsorsInput | Prisma.tournament_sponsorsCreateManySponsorsInput[];
    skipDuplicates?: boolean;
};
export type tournament_sponsorsUpsertWithWhereUniqueWithoutSponsorsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_sponsorsUpdateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedUpdateWithoutSponsorsInput>;
    create: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutSponsorsInput>;
};
export type tournament_sponsorsUpdateWithWhereUniqueWithoutSponsorsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateWithoutSponsorsInput, Prisma.tournament_sponsorsUncheckedUpdateWithoutSponsorsInput>;
};
export type tournament_sponsorsUpdateManyWithWhereWithoutSponsorsInput = {
    where: Prisma.tournament_sponsorsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateManyMutationInput, Prisma.tournament_sponsorsUncheckedUpdateManyWithoutSponsorsInput>;
};
export type tournament_sponsorsScalarWhereInput = {
    AND?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
    OR?: Prisma.tournament_sponsorsScalarWhereInput[];
    NOT?: Prisma.tournament_sponsorsScalarWhereInput | Prisma.tournament_sponsorsScalarWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsor_id?: Prisma.BigIntFilter<"tournament_sponsors"> | bigint | number;
    sponsorship_level?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    contribution_type?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_amount?: Prisma.DecimalNullableFilter<"tournament_sponsors"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFilter<"tournament_sponsors"> | string;
    contribution_description?: Prisma.StringNullableFilter<"tournament_sponsors"> | string | null;
    agreement_start_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    agreement_end_date?: Prisma.DateTimeNullableFilter<"tournament_sponsors"> | Date | string | null;
    status?: Prisma.StringFilter<"tournament_sponsors"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_sponsors"> | Date | string;
};
export type tournament_sponsorsCreateWithoutTournamentsInput = {
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    sponsors: Prisma.sponsorsCreateNestedOneWithoutTournament_sponsorsInput;
};
export type tournament_sponsorsUncheckedCreateWithoutTournamentsInput = {
    sponsor_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_sponsorsCreateManyTournamentsInputEnvelope = {
    data: Prisma.tournament_sponsorsCreateManyTournamentsInput | Prisma.tournament_sponsorsCreateManyTournamentsInput[];
    skipDuplicates?: boolean;
};
export type tournament_sponsorsUpsertWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_sponsorsUpdateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.tournament_sponsorsCreateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_sponsorsUpdateWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateWithoutTournamentsInput, Prisma.tournament_sponsorsUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_sponsorsUpdateManyWithWhereWithoutTournamentsInput = {
    where: Prisma.tournament_sponsorsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateManyMutationInput, Prisma.tournament_sponsorsUncheckedUpdateManyWithoutTournamentsInput>;
};
export type tournament_sponsorsCreateManySponsorsInput = {
    tournament_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsUpdateWithoutSponsorsInput = {
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_sponsorsNestedInput;
};
export type tournament_sponsorsUncheckedUpdateWithoutSponsorsInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsUncheckedUpdateManyWithoutSponsorsInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsCreateManyTournamentsInput = {
    sponsor_id: bigint | number;
    sponsorship_level?: string | null;
    contribution_type?: string;
    contribution_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: string;
    contribution_description?: string | null;
    agreement_start_date?: Date | string | null;
    agreement_end_date?: Date | string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_sponsorsUpdateWithoutTournamentsInput = {
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sponsors?: Prisma.sponsorsUpdateOneRequiredWithoutTournament_sponsorsNestedInput;
};
export type tournament_sponsorsUncheckedUpdateWithoutTournamentsInput = {
    sponsor_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsUncheckedUpdateManyWithoutTournamentsInput = {
    sponsor_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    sponsorship_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contribution_type?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency_code?: Prisma.StringFieldUpdateOperationsInput | string;
    contribution_description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    agreement_start_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    agreement_end_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_sponsorsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    sponsor_id?: boolean;
    sponsorship_level?: boolean;
    contribution_type?: boolean;
    contribution_amount?: boolean;
    currency_code?: boolean;
    contribution_description?: boolean;
    agreement_start_date?: boolean;
    agreement_end_date?: boolean;
    status?: boolean;
    created_at?: boolean;
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_sponsors"]>;
export type tournament_sponsorsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    sponsor_id?: boolean;
    sponsorship_level?: boolean;
    contribution_type?: boolean;
    contribution_amount?: boolean;
    currency_code?: boolean;
    contribution_description?: boolean;
    agreement_start_date?: boolean;
    agreement_end_date?: boolean;
    status?: boolean;
    created_at?: boolean;
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_sponsors"]>;
export type tournament_sponsorsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    sponsor_id?: boolean;
    sponsorship_level?: boolean;
    contribution_type?: boolean;
    contribution_amount?: boolean;
    currency_code?: boolean;
    contribution_description?: boolean;
    agreement_start_date?: boolean;
    agreement_end_date?: boolean;
    status?: boolean;
    created_at?: boolean;
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_sponsors"]>;
export type tournament_sponsorsSelectScalar = {
    tournament_id?: boolean;
    sponsor_id?: boolean;
    sponsorship_level?: boolean;
    contribution_type?: boolean;
    contribution_amount?: boolean;
    currency_code?: boolean;
    contribution_description?: boolean;
    agreement_start_date?: boolean;
    agreement_end_date?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type tournament_sponsorsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tournament_id" | "sponsor_id" | "sponsorship_level" | "contribution_type" | "contribution_amount" | "currency_code" | "contribution_description" | "agreement_start_date" | "agreement_end_date" | "status" | "created_at", ExtArgs["result"]["tournament_sponsors"]>;
export type tournament_sponsorsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
};
export type tournament_sponsorsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
};
export type tournament_sponsorsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sponsors?: boolean | Prisma.sponsorsDefaultArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
};
export type $tournament_sponsorsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_sponsors";
    objects: {
        sponsors: Prisma.$sponsorsPayload<ExtArgs>;
        tournaments: Prisma.$tournamentsPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tournament_id: bigint;
        sponsor_id: bigint;
        sponsorship_level: string | null;
        contribution_type: string;
        contribution_amount: runtime.Decimal | null;
        currency_code: string;
        contribution_description: string | null;
        agreement_start_date: Date | null;
        agreement_end_date: Date | null;
        status: string;
        created_at: Date;
    }, ExtArgs["result"]["tournament_sponsors"]>;
    composites: {};
};
export type tournament_sponsorsGetPayload<S extends boolean | null | undefined | tournament_sponsorsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload, S>;
export type tournament_sponsorsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_sponsorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_sponsorsCountAggregateInputType | true;
};
export interface tournament_sponsorsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_sponsors'];
        meta: {
            name: 'tournament_sponsors';
        };
    };
    findUnique<T extends tournament_sponsorsFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_sponsorsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_sponsorsFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_sponsorsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_sponsorsFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_sponsorsCreateArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_sponsorsCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_sponsorsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_sponsorsDeleteArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_sponsorsUpdateArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_sponsorsDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_sponsorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_sponsorsUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_sponsorsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_sponsorsUpsertArgs>(args: Prisma.SelectSubset<T, tournament_sponsorsUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_sponsorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_sponsorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_sponsorsCountArgs>(args?: Prisma.Subset<T, tournament_sponsorsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_sponsorsCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_sponsorsAggregateArgs>(args: Prisma.Subset<T, Tournament_sponsorsAggregateArgs>): Prisma.PrismaPromise<GetTournament_sponsorsAggregateType<T>>;
    groupBy<T extends tournament_sponsorsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_sponsorsGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_sponsorsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_sponsorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_sponsorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_sponsorsFieldRefs;
}
export interface Prisma__tournament_sponsorsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sponsors<T extends Prisma.sponsorsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.sponsorsDefaultArgs<ExtArgs>>): Prisma.Prisma__sponsorsClient<runtime.Types.Result.GetResult<Prisma.$sponsorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournaments<T extends Prisma.tournamentsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournamentsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournamentsClient<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_sponsorsFieldRefs {
    readonly tournament_id: Prisma.FieldRef<"tournament_sponsors", 'BigInt'>;
    readonly sponsor_id: Prisma.FieldRef<"tournament_sponsors", 'BigInt'>;
    readonly sponsorship_level: Prisma.FieldRef<"tournament_sponsors", 'String'>;
    readonly contribution_type: Prisma.FieldRef<"tournament_sponsors", 'String'>;
    readonly contribution_amount: Prisma.FieldRef<"tournament_sponsors", 'Decimal'>;
    readonly currency_code: Prisma.FieldRef<"tournament_sponsors", 'String'>;
    readonly contribution_description: Prisma.FieldRef<"tournament_sponsors", 'String'>;
    readonly agreement_start_date: Prisma.FieldRef<"tournament_sponsors", 'DateTime'>;
    readonly agreement_end_date: Prisma.FieldRef<"tournament_sponsors", 'DateTime'>;
    readonly status: Prisma.FieldRef<"tournament_sponsors", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_sponsors", 'DateTime'>;
}
export type tournament_sponsorsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    where: Prisma.tournament_sponsorsWhereUniqueInput;
};
export type tournament_sponsorsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    where: Prisma.tournament_sponsorsWhereUniqueInput;
};
export type tournament_sponsorsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_sponsorsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_sponsorsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_sponsorsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_sponsorsCreateInput, Prisma.tournament_sponsorsUncheckedCreateInput>;
};
export type tournament_sponsorsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_sponsorsCreateManyInput | Prisma.tournament_sponsorsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_sponsorsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    data: Prisma.tournament_sponsorsCreateManyInput | Prisma.tournament_sponsorsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_sponsorsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_sponsorsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateInput, Prisma.tournament_sponsorsUncheckedUpdateInput>;
    where: Prisma.tournament_sponsorsWhereUniqueInput;
};
export type tournament_sponsorsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateManyMutationInput, Prisma.tournament_sponsorsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_sponsorsWhereInput;
    limit?: number;
};
export type tournament_sponsorsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_sponsorsUpdateManyMutationInput, Prisma.tournament_sponsorsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_sponsorsWhereInput;
    limit?: number;
    include?: Prisma.tournament_sponsorsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_sponsorsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    where: Prisma.tournament_sponsorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_sponsorsCreateInput, Prisma.tournament_sponsorsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_sponsorsUpdateInput, Prisma.tournament_sponsorsUncheckedUpdateInput>;
};
export type tournament_sponsorsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
    where: Prisma.tournament_sponsorsWhereUniqueInput;
};
export type tournament_sponsorsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_sponsorsWhereInput;
    limit?: number;
};
export type tournament_sponsorsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_sponsorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_sponsorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_sponsorsInclude<ExtArgs> | null;
};
