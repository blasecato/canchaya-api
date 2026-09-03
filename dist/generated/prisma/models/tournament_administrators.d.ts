import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_administratorsModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_administratorsPayload>;
export type AggregateTournament_administrators = {
    _count: Tournament_administratorsCountAggregateOutputType | null;
    _avg: Tournament_administratorsAvgAggregateOutputType | null;
    _sum: Tournament_administratorsSumAggregateOutputType | null;
    _min: Tournament_administratorsMinAggregateOutputType | null;
    _max: Tournament_administratorsMaxAggregateOutputType | null;
};
export type Tournament_administratorsAvgAggregateOutputType = {
    tournament_id: number | null;
    user_id: number | null;
};
export type Tournament_administratorsSumAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
};
export type Tournament_administratorsMinAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
    permission_level: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_administratorsMaxAggregateOutputType = {
    tournament_id: bigint | null;
    user_id: bigint | null;
    permission_level: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Tournament_administratorsCountAggregateOutputType = {
    tournament_id: number;
    user_id: number;
    permission_level: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Tournament_administratorsAvgAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
};
export type Tournament_administratorsSumAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
};
export type Tournament_administratorsMinAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_administratorsMaxAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
};
export type Tournament_administratorsCountAggregateInputType = {
    tournament_id?: true;
    user_id?: true;
    permission_level?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_administratorsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_administratorsWhereInput;
    orderBy?: Prisma.tournament_administratorsOrderByWithRelationInput | Prisma.tournament_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_administratorsCountAggregateInputType;
    _avg?: Tournament_administratorsAvgAggregateInputType;
    _sum?: Tournament_administratorsSumAggregateInputType;
    _min?: Tournament_administratorsMinAggregateInputType;
    _max?: Tournament_administratorsMaxAggregateInputType;
};
export type GetTournament_administratorsAggregateType<T extends Tournament_administratorsAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_administrators]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_administrators[P]> : Prisma.GetScalarType<T[P], AggregateTournament_administrators[P]>;
};
export type tournament_administratorsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_administratorsWhereInput;
    orderBy?: Prisma.tournament_administratorsOrderByWithAggregationInput | Prisma.tournament_administratorsOrderByWithAggregationInput[];
    by: Prisma.Tournament_administratorsScalarFieldEnum[] | Prisma.Tournament_administratorsScalarFieldEnum;
    having?: Prisma.tournament_administratorsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_administratorsCountAggregateInputType | true;
    _avg?: Tournament_administratorsAvgAggregateInputType;
    _sum?: Tournament_administratorsSumAggregateInputType;
    _min?: Tournament_administratorsMinAggregateInputType;
    _max?: Tournament_administratorsMaxAggregateInputType;
};
export type Tournament_administratorsGroupByOutputType = {
    tournament_id: bigint;
    user_id: bigint;
    permission_level: string;
    status: string;
    created_at: Date;
    _count: Tournament_administratorsCountAggregateOutputType | null;
    _avg: Tournament_administratorsAvgAggregateOutputType | null;
    _sum: Tournament_administratorsSumAggregateOutputType | null;
    _min: Tournament_administratorsMinAggregateOutputType | null;
    _max: Tournament_administratorsMaxAggregateOutputType | null;
};
export type GetTournament_administratorsGroupByPayload<T extends tournament_administratorsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_administratorsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_administratorsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_administratorsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_administratorsGroupByOutputType[P]>;
}>>;
export type tournament_administratorsWhereInput = {
    AND?: Prisma.tournament_administratorsWhereInput | Prisma.tournament_administratorsWhereInput[];
    OR?: Prisma.tournament_administratorsWhereInput[];
    NOT?: Prisma.tournament_administratorsWhereInput | Prisma.tournament_administratorsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"tournament_administrators"> | string;
    status?: Prisma.StringFilter<"tournament_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_administrators"> | Date | string;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type tournament_administratorsOrderByWithRelationInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    tournaments?: Prisma.tournamentsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type tournament_administratorsWhereUniqueInput = Prisma.AtLeast<{
    tournament_id_user_id?: Prisma.tournament_administratorsTournament_idUser_idCompoundUniqueInput;
    AND?: Prisma.tournament_administratorsWhereInput | Prisma.tournament_administratorsWhereInput[];
    OR?: Prisma.tournament_administratorsWhereInput[];
    NOT?: Prisma.tournament_administratorsWhereInput | Prisma.tournament_administratorsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"tournament_administrators"> | string;
    status?: Prisma.StringFilter<"tournament_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_administrators"> | Date | string;
    tournaments?: Prisma.XOR<Prisma.TournamentsScalarRelationFilter, Prisma.tournamentsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "tournament_id_user_id">;
export type tournament_administratorsOrderByWithAggregationInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_administratorsCountOrderByAggregateInput;
    _avg?: Prisma.tournament_administratorsAvgOrderByAggregateInput;
    _max?: Prisma.tournament_administratorsMaxOrderByAggregateInput;
    _min?: Prisma.tournament_administratorsMinOrderByAggregateInput;
    _sum?: Prisma.tournament_administratorsSumOrderByAggregateInput;
};
export type tournament_administratorsScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_administratorsScalarWhereWithAggregatesInput | Prisma.tournament_administratorsScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_administratorsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_administratorsScalarWhereWithAggregatesInput | Prisma.tournament_administratorsScalarWhereWithAggregatesInput[];
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_administrators"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"tournament_administrators"> | bigint | number;
    permission_level?: Prisma.StringWithAggregatesFilter<"tournament_administrators"> | string;
    status?: Prisma.StringWithAggregatesFilter<"tournament_administrators"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_administrators"> | Date | string;
};
export type tournament_administratorsCreateInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_administratorsInput;
    users: Prisma.usersCreateNestedOneWithoutTournament_administratorsInput;
};
export type tournament_administratorsUncheckedCreateInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsUpdateInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_administratorsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTournament_administratorsNestedInput;
};
export type tournament_administratorsUncheckedUpdateInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsCreateManyInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsUpdateManyMutationInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsUncheckedUpdateManyInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsTournament_idUser_idCompoundUniqueInput = {
    tournament_id: bigint | number;
    user_id: bigint | number;
};
export type tournament_administratorsCountOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_administratorsAvgOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type tournament_administratorsMaxOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_administratorsMinOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    permission_level?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_administratorsSumOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Tournament_administratorsListRelationFilter = {
    every?: Prisma.tournament_administratorsWhereInput;
    some?: Prisma.tournament_administratorsWhereInput;
    none?: Prisma.tournament_administratorsWhereInput;
};
export type tournament_administratorsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_administratorsCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_administratorsCreateWithoutTournamentsInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_administratorsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
};
export type tournament_administratorsUncheckedCreateNestedManyWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_administratorsCreateWithoutTournamentsInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput[];
    createMany?: Prisma.tournament_administratorsCreateManyTournamentsInputEnvelope;
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
};
export type tournament_administratorsUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_administratorsCreateWithoutTournamentsInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_administratorsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    delete?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    update?: Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_administratorsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_administratorsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
};
export type tournament_administratorsUncheckedUpdateManyWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput> | Prisma.tournament_administratorsCreateWithoutTournamentsInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput | Prisma.tournament_administratorsCreateOrConnectWithoutTournamentsInput[];
    upsert?: Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutTournamentsInput[];
    createMany?: Prisma.tournament_administratorsCreateManyTournamentsInputEnvelope;
    set?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    delete?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    update?: Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutTournamentsInput | Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutTournamentsInput[];
    updateMany?: Prisma.tournament_administratorsUpdateManyWithWhereWithoutTournamentsInput | Prisma.tournament_administratorsUpdateManyWithWhereWithoutTournamentsInput[];
    deleteMany?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
};
export type tournament_administratorsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput> | Prisma.tournament_administratorsCreateWithoutUsersInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput | Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.tournament_administratorsCreateManyUsersInputEnvelope;
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
};
export type tournament_administratorsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput> | Prisma.tournament_administratorsCreateWithoutUsersInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput | Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.tournament_administratorsCreateManyUsersInputEnvelope;
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
};
export type tournament_administratorsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput> | Prisma.tournament_administratorsCreateWithoutUsersInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput | Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutUsersInput | Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.tournament_administratorsCreateManyUsersInputEnvelope;
    set?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    delete?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    update?: Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutUsersInput | Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.tournament_administratorsUpdateManyWithWhereWithoutUsersInput | Prisma.tournament_administratorsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
};
export type tournament_administratorsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput> | Prisma.tournament_administratorsCreateWithoutUsersInput[] | Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput | Prisma.tournament_administratorsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutUsersInput | Prisma.tournament_administratorsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.tournament_administratorsCreateManyUsersInputEnvelope;
    set?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    disconnect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    delete?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    connect?: Prisma.tournament_administratorsWhereUniqueInput | Prisma.tournament_administratorsWhereUniqueInput[];
    update?: Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutUsersInput | Prisma.tournament_administratorsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.tournament_administratorsUpdateManyWithWhereWithoutUsersInput | Prisma.tournament_administratorsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
};
export type tournament_administratorsCreateWithoutTournamentsInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutTournament_administratorsInput;
};
export type tournament_administratorsUncheckedCreateWithoutTournamentsInput = {
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_administratorsCreateManyTournamentsInputEnvelope = {
    data: Prisma.tournament_administratorsCreateManyTournamentsInput | Prisma.tournament_administratorsCreateManyTournamentsInput[];
    skipDuplicates?: boolean;
};
export type tournament_administratorsUpsertWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_administratorsUpdateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_administratorsUpdateWithWhereUniqueWithoutTournamentsInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateWithoutTournamentsInput, Prisma.tournament_administratorsUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_administratorsUpdateManyWithWhereWithoutTournamentsInput = {
    where: Prisma.tournament_administratorsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateManyMutationInput, Prisma.tournament_administratorsUncheckedUpdateManyWithoutTournamentsInput>;
};
export type tournament_administratorsScalarWhereInput = {
    AND?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
    OR?: Prisma.tournament_administratorsScalarWhereInput[];
    NOT?: Prisma.tournament_administratorsScalarWhereInput | Prisma.tournament_administratorsScalarWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"tournament_administrators"> | bigint | number;
    permission_level?: Prisma.StringFilter<"tournament_administrators"> | string;
    status?: Prisma.StringFilter<"tournament_administrators"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_administrators"> | Date | string;
};
export type tournament_administratorsCreateWithoutUsersInput = {
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
    tournaments: Prisma.tournamentsCreateNestedOneWithoutTournament_administratorsInput;
};
export type tournament_administratorsUncheckedCreateWithoutUsersInput = {
    tournament_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsCreateOrConnectWithoutUsersInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput>;
};
export type tournament_administratorsCreateManyUsersInputEnvelope = {
    data: Prisma.tournament_administratorsCreateManyUsersInput | Prisma.tournament_administratorsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type tournament_administratorsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_administratorsUpdateWithoutUsersInput, Prisma.tournament_administratorsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.tournament_administratorsCreateWithoutUsersInput, Prisma.tournament_administratorsUncheckedCreateWithoutUsersInput>;
};
export type tournament_administratorsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.tournament_administratorsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateWithoutUsersInput, Prisma.tournament_administratorsUncheckedUpdateWithoutUsersInput>;
};
export type tournament_administratorsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.tournament_administratorsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateManyMutationInput, Prisma.tournament_administratorsUncheckedUpdateManyWithoutUsersInput>;
};
export type tournament_administratorsCreateManyTournamentsInput = {
    user_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsUpdateWithoutTournamentsInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutTournament_administratorsNestedInput;
};
export type tournament_administratorsUncheckedUpdateWithoutTournamentsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsUncheckedUpdateManyWithoutTournamentsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsCreateManyUsersInput = {
    tournament_id: bigint | number;
    permission_level?: string;
    status?: string;
    created_at?: Date | string;
};
export type tournament_administratorsUpdateWithoutUsersInput = {
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateOneRequiredWithoutTournament_administratorsNestedInput;
};
export type tournament_administratorsUncheckedUpdateWithoutUsersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsUncheckedUpdateManyWithoutUsersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    permission_level?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_administratorsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_administrators"]>;
export type tournament_administratorsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_administrators"]>;
export type tournament_administratorsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_administrators"]>;
export type tournament_administratorsSelectScalar = {
    tournament_id?: boolean;
    user_id?: boolean;
    permission_level?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type tournament_administratorsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tournament_id" | "user_id" | "permission_level" | "status" | "created_at", ExtArgs["result"]["tournament_administrators"]>;
export type tournament_administratorsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_administratorsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_administratorsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournamentsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $tournament_administratorsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_administrators";
    objects: {
        tournaments: Prisma.$tournamentsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tournament_id: bigint;
        user_id: bigint;
        permission_level: string;
        status: string;
        created_at: Date;
    }, ExtArgs["result"]["tournament_administrators"]>;
    composites: {};
};
export type tournament_administratorsGetPayload<S extends boolean | null | undefined | tournament_administratorsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload, S>;
export type tournament_administratorsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_administratorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_administratorsCountAggregateInputType | true;
};
export interface tournament_administratorsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_administrators'];
        meta: {
            name: 'tournament_administrators';
        };
    };
    findUnique<T extends tournament_administratorsFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_administratorsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_administratorsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_administratorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_administratorsFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_administratorsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_administratorsFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_administratorsCreateArgs>(args: Prisma.SelectSubset<T, tournament_administratorsCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_administratorsCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_administratorsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_administratorsDeleteArgs>(args: Prisma.SelectSubset<T, tournament_administratorsDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_administratorsUpdateArgs>(args: Prisma.SelectSubset<T, tournament_administratorsUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_administratorsDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_administratorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_administratorsUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_administratorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_administratorsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_administratorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_administratorsUpsertArgs>(args: Prisma.SelectSubset<T, tournament_administratorsUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_administratorsClient<runtime.Types.Result.GetResult<Prisma.$tournament_administratorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_administratorsCountArgs>(args?: Prisma.Subset<T, tournament_administratorsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_administratorsCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_administratorsAggregateArgs>(args: Prisma.Subset<T, Tournament_administratorsAggregateArgs>): Prisma.PrismaPromise<GetTournament_administratorsAggregateType<T>>;
    groupBy<T extends tournament_administratorsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_administratorsGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_administratorsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_administratorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_administratorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_administratorsFieldRefs;
}
export interface Prisma__tournament_administratorsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tournaments<T extends Prisma.tournamentsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournamentsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournamentsClient<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_administratorsFieldRefs {
    readonly tournament_id: Prisma.FieldRef<"tournament_administrators", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"tournament_administrators", 'BigInt'>;
    readonly permission_level: Prisma.FieldRef<"tournament_administrators", 'String'>;
    readonly status: Prisma.FieldRef<"tournament_administrators", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_administrators", 'DateTime'>;
}
export type tournament_administratorsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where: Prisma.tournament_administratorsWhereUniqueInput;
};
export type tournament_administratorsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where: Prisma.tournament_administratorsWhereUniqueInput;
};
export type tournament_administratorsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where?: Prisma.tournament_administratorsWhereInput;
    orderBy?: Prisma.tournament_administratorsOrderByWithRelationInput | Prisma.tournament_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_administratorsScalarFieldEnum | Prisma.Tournament_administratorsScalarFieldEnum[];
};
export type tournament_administratorsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where?: Prisma.tournament_administratorsWhereInput;
    orderBy?: Prisma.tournament_administratorsOrderByWithRelationInput | Prisma.tournament_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_administratorsScalarFieldEnum | Prisma.Tournament_administratorsScalarFieldEnum[];
};
export type tournament_administratorsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where?: Prisma.tournament_administratorsWhereInput;
    orderBy?: Prisma.tournament_administratorsOrderByWithRelationInput | Prisma.tournament_administratorsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_administratorsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_administratorsScalarFieldEnum | Prisma.Tournament_administratorsScalarFieldEnum[];
};
export type tournament_administratorsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_administratorsCreateInput, Prisma.tournament_administratorsUncheckedCreateInput>;
};
export type tournament_administratorsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_administratorsCreateManyInput | Prisma.tournament_administratorsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_administratorsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    data: Prisma.tournament_administratorsCreateManyInput | Prisma.tournament_administratorsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_administratorsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_administratorsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateInput, Prisma.tournament_administratorsUncheckedUpdateInput>;
    where: Prisma.tournament_administratorsWhereUniqueInput;
};
export type tournament_administratorsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateManyMutationInput, Prisma.tournament_administratorsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_administratorsWhereInput;
    limit?: number;
};
export type tournament_administratorsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_administratorsUpdateManyMutationInput, Prisma.tournament_administratorsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_administratorsWhereInput;
    limit?: number;
    include?: Prisma.tournament_administratorsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_administratorsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where: Prisma.tournament_administratorsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_administratorsCreateInput, Prisma.tournament_administratorsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_administratorsUpdateInput, Prisma.tournament_administratorsUncheckedUpdateInput>;
};
export type tournament_administratorsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
    where: Prisma.tournament_administratorsWhereUniqueInput;
};
export type tournament_administratorsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_administratorsWhereInput;
    limit?: number;
};
export type tournament_administratorsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_administratorsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_administratorsOmit<ExtArgs> | null;
    include?: Prisma.tournament_administratorsInclude<ExtArgs> | null;
};
