import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_refereesModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_refereesPayload>;
export type AggregateTournament_referees = {
    _count: Tournament_refereesCountAggregateOutputType | null;
    _avg: Tournament_refereesAvgAggregateOutputType | null;
    _sum: Tournament_refereesSumAggregateOutputType | null;
    _min: Tournament_refereesMinAggregateOutputType | null;
    _max: Tournament_refereesMaxAggregateOutputType | null;
};
export type Tournament_refereesAvgAggregateOutputType = {
    tournament_id: number | null;
    user_id: number | null;
};
export type Tournament_refereesSumAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
};
export type Tournament_refereesMinAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
    certification_number: string | null;
    category: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_refereesMaxAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
    certification_number: string | null;
    category: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_refereesCountAggregateOutputType = {
    tournament_id: number;
    user_id: number;
    certification_number: number;
    category: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Tournament_refereesAvgAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
};
export type Tournament_refereesSumAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
};
export type Tournament_refereesMinAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    certification_number?: true;
    category?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_refereesMaxAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    certification_number?: true;
    category?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_refereesCountAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    certification_number?: true;
    category?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_refereesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_refereesWhereInput;
    orderBy?: Prisma.tournament_refereesOrderByWithRelationInput | Prisma.tournament_refereesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_refereesCountAggregateInputType;
    _avg?: Tournament_refereesAvgAggregateInputType;
    _sum?: Tournament_refereesSumAggregateInputType;
    _min?: Tournament_refereesMinAggregateInputType;
    _max?: Tournament_refereesMaxAggregateInputType;
};
export type GetTournament_refereesAggregateType<T extends Tournament_refereesAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_referees]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_referees[P]> : Prisma.GetScalarType<T[P], AggregateTournament_referees[P]>;
};
export type tournament_refereesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_refereesWhereInput;
    orderBy?: Prisma.tournament_refereesOrderByWithAggregationInput | Prisma.tournament_refereesOrderByWithAggregationInput[];
    by: Prisma.Tournament_refereesScalarFieldEnum[] | Prisma.Tournament_refereesScalarFieldEnum;
    having?: Prisma.tournament_refereesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_refereesCountAggregateInputType | true;
    _avg?: Tournament_refereesAvgAggregateInputType;
    _sum?: Tournament_refereesSumAggregateInputType;
    _min?: Tournament_refereesMinAggregateInputType;
    _max?: Tournament_refereesMaxAggregateInputType;
};
export type Tournament_refereesGroupByOutputType = {
    tournament_id: bigint;
    user_id: bigint;
    certification_number: string | null;
    category: string | null;
    status: string;
    created_at: Date;
    _count: Tournament_refereesCountAggregateOutputType | null;
    _avg: Tournament_refereesAvgAggregateOutputType | null;
    _sum: Tournament_refereesSumAggregateOutputType | null;
    _min: Tournament_refereesMinAggregateOutputType | null;
    _max: Tournament_refereesMaxAggregateOutputType | null;
};
export type GetTournament_refereesGroupByPayload<T extends tournament_refereesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_refereesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_refereesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_refereesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_refereesGroupByOutputType[P]>;
}>>;
export type tournament_refereesWhereInput = {
    AND?: Prisma.tournament_refereesWhereInput | Prisma.tournament_refereesWhereInput[];
    OR?: Prisma.tournament_refereesWhereInput[];
    NOT?: Prisma.tournament_refereesWhereInput | Prisma.tournament_refereesWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    certification_number?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    category?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    status?: Prisma.StringFilter<"tournament_referees"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_referees"> | Date | string;
    match_referees?: Prisma.Match_refereesListRelationFilter;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type tournament_refereesOrderByWithRelationInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    certification_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    match_referees?: Prisma.match_refereesOrderByRelationAggregateInput;
    tournaments?: Prisma.tournamentsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type tournament_refereesWhereUniqueInput = Prisma.AtLeast<{
    tournament_id_user_id?: Prisma.tournament_refereesTournament_idUser_idCompoundUniqueInput;
    AND?: Prisma.tournament_refereesWhereInput | Prisma.tournament_refereesWhereInput[];
    OR?: Prisma.tournament_refereesWhereInput[];
    NOT?: Prisma.tournament_refereesWhereInput | Prisma.tournament_refereesWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    certification_number?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    category?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    status?: Prisma.StringFilter<"tournament_referees"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_referees"> | Date | string;
    match_referees?: Prisma.Match_refereesListRelationFilter;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "tournament_id_user_id">;
export type tournament_refereesOrderByWithAggregationInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    certification_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_refereesCountOrderByAggregateInput;
    _avg?: Prisma.tournament_refereesAvgOrderByAggregateInput;
    _max?: Prisma.tournament_refereesMaxOrderByAggregateInput;
    _min?: Prisma.tournament_refereesMinOrderByAggregateInput;
    _sum?: Prisma.tournament_refereesSumOrderByAggregateInput;
};
export type tournament_refereesScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_refereesScalarWhereWithAggregatesInput | Prisma.tournament_refereesScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_refereesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_refereesScalarWhereWithAggregatesInput | Prisma.tournament_refereesScalarWhereWithAggregatesInput[];
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_referees"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"tournament_referees"> | bigint | number;
    certification_number?: Prisma.StringNullableWithAggregatesFilter<"tournament_referees"> | string | null;
    category?: Prisma.StringNullableWithAggregatesFilter<"tournament_referees"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"tournament_referees"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_referees"> | Date | string;
};
export type tournament_refereesCreateInput = {
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesCreateNestedManyWithoutTournament_refereesInput;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_refereesInput;
    users: Prisma.usersCreateNestedOneWithoutTournament_refereesInput;
};
export type tournament_refereesUncheckedCreateInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesUncheckedCreateNestedManyWithoutTournament_refereesInput;
};
export type tournament_refereesUpdateInput = {
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUpdateManyWithoutTournament_refereesNestedInput;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_refereesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUncheckedUpdateManyWithoutTournament_refereesNestedInput;
};
export type tournament_refereesCreateManyInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_refereesUpdateManyMutationInput = {
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_refereesUncheckedUpdateManyInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_refereesScalarRelationFilter = {
    is?: Prisma.tournament_refereesWhereInput;
    isNot?: Prisma.tournament_refereesWhereInput;
};
export type tournament_refereesTournament_idUser_idCompoundUniqueInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
};
export type tournament_refereesCountOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    certification_number?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_refereesAvgOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type tournament_refereesMaxOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    certification_number?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_refereesMinOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    certification_number?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_refereesSumOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Tournament_refereesListRelationFilter = {
    every?: Prisma.tournament_refereesWhereInput;
    some?: Prisma.tournament_refereesWhereInput;
    none?: Prisma.tournament_refereesWhereInput;
};
export type tournament_refereesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_refereesCreateNestedOneWithoutMatch_refereesInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedCreateWithoutMatch_refereesInput>;
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutMatch_refereesInput;
    connect?: Prisma.tournament_refereesWhereUniqueInput;
};
export type tournament_refereesUpdateOneRequiredWithoutMatch_refereesNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedCreateWithoutMatch_refereesInput>;
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutMatch_refereesInput;
    upsert?: Prisma.tournament_refereesUpsertWithoutMatch_refereesInput;
    connect?: Prisma.tournament_refereesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.tournament_refereesUpdateToOneWithWhereWithoutMatch_refereesInput, Prisma.tournament_refereesUpdateWithoutMatch_refereesInput>, Prisma.tournament_refereesUncheckedUpdateWithoutMatch_refereesInput>;
};
export type tournament_refereesCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_refereesCreateWithoutTournamentsInput[] | Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput | Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_refereesCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
};
export type tournament_refereesUncheckedCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_refereesCreateWithoutTournamentsInput[] | Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput | Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_refereesCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
};
export type tournament_refereesUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_refereesCreateWithoutTournamentsInput[] | Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput | Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_refereesUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_refereesUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_refereesCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    disconnect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    delete?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    update?: Prisma.tournament_refereesUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_refereesUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_refereesUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_refereesUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
};
export type tournament_refereesUncheckedUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_refereesCreateWithoutTournamentsInput[] | Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput | Prisma.tournament_refereesCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_refereesUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_refereesUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_refereesCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    disconnect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    delete?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    update?: Prisma.tournament_refereesUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_refereesUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_refereesUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_refereesUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
};
export type tournament_refereesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput> | Prisma.tournament_refereesCreateWithoutUsersInput[] | Prisma.tournament_refereesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutUsersInput | Prisma.tournament_refereesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.tournament_refereesCreateManyUsersInputEnvelope;
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
};
export type tournament_refereesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput> | Prisma.tournament_refereesCreateWithoutUsersInput[] | Prisma.tournament_refereesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutUsersInput | Prisma.tournament_refereesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.tournament_refereesCreateManyUsersInputEnvelope;
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
};
export type tournament_refereesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput> | Prisma.tournament_refereesCreateWithoutUsersInput[] | Prisma.tournament_refereesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutUsersInput | Prisma.tournament_refereesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.tournament_refereesUpsertWithWhereUniqueWithoutUsersInput | Prisma.tournament_refereesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.tournament_refereesCreateManyUsersInputEnvelope;
    set?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    disconnect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    delete?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    update?: Prisma.tournament_refereesUpdateWithWhereUniqueWithoutUsersInput | Prisma.tournament_refereesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.tournament_refereesUpdateManyWithWhereWithoutUsersInput | Prisma.tournament_refereesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
};
export type tournament_refereesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput> | Prisma.tournament_refereesCreateWithoutUsersInput[] | Prisma.tournament_refereesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_refereesCreateOrConnectWithoutUsersInput | Prisma.tournament_refereesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.tournament_refereesUpsertWithWhereUniqueWithoutUsersInput | Prisma.tournament_refereesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.tournament_refereesCreateManyUsersInputEnvelope;
    set?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    disconnect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    delete?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    connect?: Prisma.tournament_refereesWhereUniqueInput | Prisma.tournament_refereesWhereUniqueInput[];
    update?: Prisma.tournament_refereesUpdateWithWhereUniqueWithoutUsersInput | Prisma.tournament_refereesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.tournament_refereesUpdateManyWithWhereWithoutUsersInput | Prisma.tournament_refereesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
};
export type tournament_refereesCreateWithoutMatch_refereesInput = {
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_refereesInput;
    users: Prisma.usersCreateNestedOneWithoutTournament_refereesInput;
};
export type tournament_refereesUncheckedCreateWithoutMatch_refereesInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_refereesCreateOrConnectWithoutMatch_refereesInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedCreateWithoutMatch_refereesInput>;
};
export type tournament_refereesUpsertWithoutMatch_refereesInput = {
    update: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedUpdateWithoutMatch_refereesInput>;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedCreateWithoutMatch_refereesInput>;
    where?: Prisma.tournament_refereesWhereInput;
};
export type tournament_refereesUpdateToOneWithWhereWithoutMatch_refereesInput = {
    where?: Prisma.tournament_refereesWhereInput;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutMatch_refereesInput, Prisma.tournament_refereesUncheckedUpdateWithoutMatch_refereesInput>;
};
export type tournament_refereesUpdateWithoutMatch_refereesInput = {
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_refereesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateWithoutMatch_refereesInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_refereesCreateWithoutTournamentsInput = {
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesCreateNestedManyWithoutTournament_refereesInput;
    users: Prisma.usersCreateNestedOneWithoutTournament_refereesInput;
};
export type tournament_refereesUncheckedCreateWithoutTournamentsInput = {
    user_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesUncheckedCreateNestedManyWithoutTournament_refereesInput;
};
export type tournament_refereesCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_refereesCreateManyTournamentsInputEnvelope = {
    data: Prisma.tournament_refereesCreateManyTournamentsInput | Prisma.tournament_refereesCreateManyTournamentsInput[];
    skipDuplicates?: boolean;
};
export type tournament_refereesUpsertWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_refereesUpdateWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutTournamentsInput, Prisma.tournament_refereesUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_refereesUpdateManyWithWhereWithoutTournamentsInput = {
    where: Prisma.tournament_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateManyMutationInput, Prisma.tournament_refereesUncheckedUpdateManyWithoutTournamentsInput>;
};
export type tournament_refereesScalarWhereInput = {
    AND?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
    OR?: Prisma.tournament_refereesScalarWhereInput[];
    NOT?: Prisma.tournament_refereesScalarWhereInput | Prisma.tournament_refereesScalarWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_referees"> | bigint | number;
    certification_number?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    category?: Prisma.StringNullableFilter<"tournament_referees"> | string | null;
    status?: Prisma.StringFilter<"tournament_referees"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_referees"> | Date | string;
};
export type tournament_refereesCreateWithoutUsersInput = {
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesCreateNestedManyWithoutTournament_refereesInput;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_refereesInput;
};
export type tournament_refereesUncheckedCreateWithoutUsersInput = {
    tournament_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
    match_referees?: Prisma.match_refereesUncheckedCreateNestedManyWithoutTournament_refereesInput;
};
export type tournament_refereesCreateOrConnectWithoutUsersInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput>;
};
export type tournament_refereesCreateManyUsersInputEnvelope = {
    data: Prisma.tournament_refereesCreateManyUsersInput | Prisma.tournament_refereesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type tournament_refereesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutUsersInput, Prisma.tournament_refereesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.tournament_refereesCreateWithoutUsersInput, Prisma.tournament_refereesUncheckedCreateWithoutUsersInput>;
};
export type tournament_refereesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.tournament_refereesWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateWithoutUsersInput, Prisma.tournament_refereesUncheckedUpdateWithoutUsersInput>;
};
export type tournament_refereesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.tournament_refereesScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateManyMutationInput, Prisma.tournament_refereesUncheckedUpdateManyWithoutUsersInput>;
};
export type tournament_refereesCreateManyTournamentsInput = {
    user_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_refereesUpdateWithoutTournamentsInput = {
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUpdateManyWithoutTournament_refereesNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateWithoutTournamentsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUncheckedUpdateManyWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateManyWithoutTournamentsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_refereesCreateManyUsersInput = {
    tournament_id: bigint | number;
    certification_number?: string | null;
    category?: string | null;
    status?: string;
    created_at?: Date | string;
};
export type tournament_refereesUpdateWithoutUsersInput = {
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUpdateManyWithoutTournament_refereesNestedInput;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateWithoutUsersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    match_referees?: Prisma.match_refereesUncheckedUpdateManyWithoutTournament_refereesNestedInput;
};
export type tournament_refereesUncheckedUpdateManyWithoutUsersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    certification_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_refereesCountOutputType = {
    match_referees: number;
};
export type Tournament_refereesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    match_referees?: boolean | Tournament_refereesCountOutputTypeCountMatch_refereesArgs;
};
export type Tournament_refereesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Tournament_refereesCountOutputTypeSelect<ExtArgs> | null;
};
export type Tournament_refereesCountOutputTypeCountMatch_refereesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.match_refereesWhereInput;
};
export type tournament_refereesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    certification_number?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
    match_referees?: boolean | Prisma.tournament_referees$match_refereesArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_refereesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_referees"]>;
export type tournament_refereesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    certification_number?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_referees"]>;
export type tournament_refereesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    certification_number?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_referees"]>;
export type tournament_refereesSelectScalar = {
    tournament_id?: boolean;
    user_id?: boolean;
    certification_number?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type tournament_refereesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tournament_id" | "user_id" | "certification_number" | "category" | "status" | "created_at", ExtArgs["result"]["tournament_referees"]>;
export type tournament_refereesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    match_referees?: boolean | Prisma.tournament_referees$match_refereesArgs<ExtArgs>;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_refereesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type tournament_refereesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_refereesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $tournament_refereesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_referees";
    objects: {
        match_referees: Prisma.$match_refereesPayload<ExtArgs>[];
        tournaments: Prisma.$tournamentsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tournament_id: bigint;
        user_id: bigint;
        certification_number: string | null;
        category: string | null;
        status: string;
        created_at: Date;
    }, ExtArgs["result"]["tournament_referees"]>;
    composites: {};
};
export type tournament_refereesGetPayload<S extends boolean | null | undefined | tournament_refereesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload, S>;
export type tournament_refereesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_refereesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_refereesCountAggregateInputType | true;
};
export interface tournament_refereesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_referees'];
        meta: {
            name: 'tournament_referees';
        };
    };
    findUnique<T extends tournament_refereesFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_refereesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_refereesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_refereesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_refereesFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_refereesFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_refereesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_refereesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_refereesFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_refereesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_refereesCreateArgs>(args: Prisma.SelectSubset<T, tournament_refereesCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_refereesCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_refereesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_refereesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_refereesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_refereesDeleteArgs>(args: Prisma.SelectSubset<T, tournament_refereesDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_refereesUpdateArgs>(args: Prisma.SelectSubset<T, tournament_refereesUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_refereesDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_refereesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_refereesUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_refereesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_refereesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_refereesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_refereesUpsertArgs>(args: Prisma.SelectSubset<T, tournament_refereesUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_refereesClient<runtime.Types.Result.GetResult<Prisma.$tournament_refereesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_refereesCountArgs>(args?: Prisma.Subset<T, tournament_refereesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_refereesCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_refereesAggregateArgs>(args: Prisma.Subset<T, Tournament_refereesAggregateArgs>): Prisma.PrismaPromise<GetTournament_refereesAggregateType<T>>;
    groupBy<T extends tournament_refereesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_refereesGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_refereesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_refereesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_refereesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_refereesFieldRefs;
}
export interface Prisma__tournament_refereesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    match_referees<T extends Prisma.tournament_referees$match_refereesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_referees$match_refereesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$match_refereesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tournaments<T extends Prisma.tournamentsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournamentsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournamentsClient<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_refereesFieldRefs {
    readonly tournament_id: Prisma.FieldRef<"tournament_referees", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"tournament_referees", 'BigInt'>;
    readonly certification_number: Prisma.FieldRef<"tournament_referees", 'String'>;
    readonly category: Prisma.FieldRef<"tournament_referees", 'String'>;
    readonly status: Prisma.FieldRef<"tournament_referees", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_referees", 'DateTime'>;
}
export type tournament_refereesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where: Prisma.tournament_refereesWhereUniqueInput;
};
export type tournament_refereesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where: Prisma.tournament_refereesWhereUniqueInput;
};
export type tournament_refereesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where?: Prisma.tournament_refereesWhereInput;
    orderBy?: Prisma.tournament_refereesOrderByWithRelationInput | Prisma.tournament_refereesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_refereesScalarFieldEnum | Prisma.Tournament_refereesScalarFieldEnum[];
};
export type tournament_refereesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where?: Prisma.tournament_refereesWhereInput;
    orderBy?: Prisma.tournament_refereesOrderByWithRelationInput | Prisma.tournament_refereesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_refereesScalarFieldEnum | Prisma.Tournament_refereesScalarFieldEnum[];
};
export type tournament_refereesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where?: Prisma.tournament_refereesWhereInput;
    orderBy?: Prisma.tournament_refereesOrderByWithRelationInput | Prisma.tournament_refereesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_refereesScalarFieldEnum | Prisma.Tournament_refereesScalarFieldEnum[];
};
export type tournament_refereesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_refereesCreateInput, Prisma.tournament_refereesUncheckedCreateInput>;
};
export type tournament_refereesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_refereesCreateManyInput | Prisma.tournament_refereesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_refereesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    data: Prisma.tournament_refereesCreateManyInput | Prisma.tournament_refereesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_refereesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_refereesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateInput, Prisma.tournament_refereesUncheckedUpdateInput>;
    where: Prisma.tournament_refereesWhereUniqueInput;
};
export type tournament_refereesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_refereesUpdateManyMutationInput, Prisma.tournament_refereesUncheckedUpdateManyInput>;
    where?: Prisma.tournament_refereesWhereInput;
    limit?: number;
};
export type tournament_refereesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_refereesUpdateManyMutationInput, Prisma.tournament_refereesUncheckedUpdateManyInput>;
    where?: Prisma.tournament_refereesWhereInput;
    limit?: number;
    include?: Prisma.tournament_refereesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_refereesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where: Prisma.tournament_refereesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_refereesCreateInput, Prisma.tournament_refereesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_refereesUpdateInput, Prisma.tournament_refereesUncheckedUpdateInput>;
};
export type tournament_refereesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
    where: Prisma.tournament_refereesWhereUniqueInput;
};
export type tournament_refereesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_refereesWhereInput;
    limit?: number;
};
export type tournament_referees$match_refereesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.match_refereesSelect<ExtArgs> | null;
    omit?: Prisma.match_refereesOmit<ExtArgs> | null;
    include?: Prisma.match_refereesInclude<ExtArgs> | null;
    where?: Prisma.match_refereesWhereInput;
    orderBy?: Prisma.match_refereesOrderByWithRelationInput | Prisma.match_refereesOrderByWithRelationInput[];
    cursor?: Prisma.match_refereesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Match_refereesScalarFieldEnum | Prisma.Match_refereesScalarFieldEnum[];
};
export type tournament_refereesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_refereesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_refereesOmit<ExtArgs> | null;
    include?: Prisma.tournament_refereesInclude<ExtArgs> | null;
};
