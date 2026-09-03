import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type team_membersModel = runtime.Types.Result.DefaultSelection<Prisma.$team_membersPayload>;
export type AggregateTeam_members = {
    _count: Team_membersCountAggregateOutputType | null;
    _avg: Team_membersAvgAggregateOutputType | null;
    _sum: Team_membersSumAggregateOutputType | null;
    _min: Team_membersMinAggregateOutputType | null;
    _max: Team_membersMaxAggregateOutputType | null;
};
export type Team_membersAvgAggregateOutputType = {
    team_id: number | null;
    user_id: number | null;
};
export type Team_membersSumAggregateOutputType = {
    team_id: bigint | null;
    user_id: bigint | null;
};
export type Team_membersMinAggregateOutputType = {
    team_id: bigint | null;
    user_id: bigint | null;
    member_role: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Team_membersMaxAggregateOutputType = {
    team_id: bigint | null;
    user_id: bigint | null;
    member_role: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Team_membersCountAggregateOutputType = {
    team_id: number;
    user_id: number;
    member_role: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Team_membersAvgAggregateInputType = {
    team_id?: true;
    user_id?: true;
};
export type Team_membersSumAggregateInputType = {
    team_id?: true;
    user_id?: true;
};
export type Team_membersMinAggregateInputType = {
    team_id?: true;
    user_id?: true;
    member_role?: true;
    status?: true;
    created_at?: true;
};
export type Team_membersMaxAggregateInputType = {
    team_id?: true;
    user_id?: true;
    member_role?: true;
    status?: true;
    created_at?: true;
};
export type Team_membersCountAggregateInputType = {
    team_id?: true;
    user_id?: true;
    member_role?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Team_membersAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.team_membersWhereInput;
    orderBy?: Prisma.team_membersOrderByWithRelationInput | Prisma.team_membersOrderByWithRelationInput[];
    cursor?: Prisma.team_membersWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Team_membersCountAggregateInputType;
    _avg?: Team_membersAvgAggregateInputType;
    _sum?: Team_membersSumAggregateInputType;
    _min?: Team_membersMinAggregateInputType;
    _max?: Team_membersMaxAggregateInputType;
};
export type GetTeam_membersAggregateType<T extends Team_membersAggregateArgs> = {
    [P in keyof T & keyof AggregateTeam_members]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTeam_members[P]> : Prisma.GetScalarType<T[P], AggregateTeam_members[P]>;
};
export type team_membersGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.team_membersWhereInput;
    orderBy?: Prisma.team_membersOrderByWithAggregationInput | Prisma.team_membersOrderByWithAggregationInput[];
    by: Prisma.Team_membersScalarFieldEnum[] | Prisma.Team_membersScalarFieldEnum;
    having?: Prisma.team_membersScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Team_membersCountAggregateInputType | true;
    _avg?: Team_membersAvgAggregateInputType;
    _sum?: Team_membersSumAggregateInputType;
    _min?: Team_membersMinAggregateInputType;
    _max?: Team_membersMaxAggregateInputType;
};
export type Team_membersGroupByOutputType = {
    team_id: bigint;
    user_id: bigint;
    member_role: string;
    status: string;
    created_at: Date;
    _count: Team_membersCountAggregateOutputType | null;
    _avg: Team_membersAvgAggregateOutputType | null;
    _sum: Team_membersSumAggregateOutputType | null;
    _min: Team_membersMinAggregateOutputType | null;
    _max: Team_membersMaxAggregateOutputType | null;
};
export type GetTeam_membersGroupByPayload<T extends team_membersGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Team_membersGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Team_membersGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Team_membersGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Team_membersGroupByOutputType[P]>;
}>>;
export type team_membersWhereInput = {
    AND?: Prisma.team_membersWhereInput | Prisma.team_membersWhereInput[];
    OR?: Prisma.team_membersWhereInput[];
    NOT?: Prisma.team_membersWhereInput | Prisma.team_membersWhereInput[];
    team_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    member_role?: Prisma.StringFilter<"team_members"> | string;
    status?: Prisma.StringFilter<"team_members"> | string;
    created_at?: Prisma.DateTimeFilter<"team_members"> | Date | string;
    teams?: Prisma.XOR<Prisma.TeamsScalarRelationFilter, Prisma.teamsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_players?: Prisma.Tournament_team_playersListRelationFilter;
};
export type team_membersOrderByWithRelationInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    member_role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    teams?: Prisma.teamsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
    tournament_team_players?: Prisma.tournament_team_playersOrderByRelationAggregateInput;
};
export type team_membersWhereUniqueInput = Prisma.AtLeast<{
    team_id_user_id?: Prisma.team_membersTeam_idUser_idCompoundUniqueInput;
    AND?: Prisma.team_membersWhereInput | Prisma.team_membersWhereInput[];
    OR?: Prisma.team_membersWhereInput[];
    NOT?: Prisma.team_membersWhereInput | Prisma.team_membersWhereInput[];
    team_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    member_role?: Prisma.StringFilter<"team_members"> | string;
    status?: Prisma.StringFilter<"team_members"> | string;
    created_at?: Prisma.DateTimeFilter<"team_members"> | Date | string;
    teams?: Prisma.XOR<Prisma.TeamsScalarRelationFilter, Prisma.teamsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_players?: Prisma.Tournament_team_playersListRelationFilter;
}, "team_id_user_id">;
export type team_membersOrderByWithAggregationInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    member_role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.team_membersCountOrderByAggregateInput;
    _avg?: Prisma.team_membersAvgOrderByAggregateInput;
    _max?: Prisma.team_membersMaxOrderByAggregateInput;
    _min?: Prisma.team_membersMinOrderByAggregateInput;
    _sum?: Prisma.team_membersSumOrderByAggregateInput;
};
export type team_membersScalarWhereWithAggregatesInput = {
    AND?: Prisma.team_membersScalarWhereWithAggregatesInput | Prisma.team_membersScalarWhereWithAggregatesInput[];
    OR?: Prisma.team_membersScalarWhereWithAggregatesInput[];
    NOT?: Prisma.team_membersScalarWhereWithAggregatesInput | Prisma.team_membersScalarWhereWithAggregatesInput[];
    team_id?: Prisma.BigIntWithAggregatesFilter<"team_members"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"team_members"> | bigint | number;
    member_role?: Prisma.StringWithAggregatesFilter<"team_members"> | string;
    status?: Prisma.StringWithAggregatesFilter<"team_members"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"team_members"> | Date | string;
};
export type team_membersCreateInput = {
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    teams: Prisma.teamsCreateNestedOneWithoutTeam_membersInput;
    users: Prisma.usersCreateNestedOneWithoutTeam_membersInput;
    tournament_team_players?: Prisma.tournament_team_playersCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersUncheckedCreateInput = {
    team_id: bigint | number;
    user_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersUpdateInput = {
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teams?: Prisma.teamsUpdateOneRequiredWithoutTeam_membersNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTeam_membersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateInput = {
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersCreateManyInput = {
    team_id: bigint | number;
    user_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
};
export type team_membersUpdateManyMutationInput = {
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type team_membersUncheckedUpdateManyInput = {
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type team_membersTeam_idUser_idCompoundUniqueInput = {
    team_id: bigint | number;
    user_id: bigint | number;
};
export type team_membersCountOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    member_role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type team_membersAvgOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type team_membersMaxOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    member_role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type team_membersMinOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    member_role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type team_membersSumOrderByAggregateInput = {
    team_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type Team_membersListRelationFilter = {
    every?: Prisma.team_membersWhereInput;
    some?: Prisma.team_membersWhereInput;
    none?: Prisma.team_membersWhereInput;
};
export type team_membersOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type Team_membersScalarRelationFilter = {
    is?: Prisma.team_membersWhereInput;
    isNot?: Prisma.team_membersWhereInput;
};
export type team_membersCreateNestedManyWithoutTeamsInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput> | Prisma.team_membersCreateWithoutTeamsInput[] | Prisma.team_membersUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTeamsInput | Prisma.team_membersCreateOrConnectWithoutTeamsInput[];
    createMany?: Prisma.team_membersCreateManyTeamsInputEnvelope;
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
};
export type team_membersUncheckedCreateNestedManyWithoutTeamsInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput> | Prisma.team_membersCreateWithoutTeamsInput[] | Prisma.team_membersUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTeamsInput | Prisma.team_membersCreateOrConnectWithoutTeamsInput[];
    createMany?: Prisma.team_membersCreateManyTeamsInputEnvelope;
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
};
export type team_membersUpdateManyWithoutTeamsNestedInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput> | Prisma.team_membersCreateWithoutTeamsInput[] | Prisma.team_membersUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTeamsInput | Prisma.team_membersCreateOrConnectWithoutTeamsInput[];
    upsert?: Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput | Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput[];
    createMany?: Prisma.team_membersCreateManyTeamsInputEnvelope;
    set?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    disconnect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    delete?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    update?: Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput | Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput[];
    updateMany?: Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput | Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput[];
    deleteMany?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
};
export type team_membersUncheckedUpdateManyWithoutTeamsNestedInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput> | Prisma.team_membersCreateWithoutTeamsInput[] | Prisma.team_membersUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTeamsInput | Prisma.team_membersCreateOrConnectWithoutTeamsInput[];
    upsert?: Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput | Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput[];
    createMany?: Prisma.team_membersCreateManyTeamsInputEnvelope;
    set?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    disconnect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    delete?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    update?: Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput | Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput[];
    updateMany?: Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput | Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput[];
    deleteMany?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
};
export type team_membersCreateNestedOneWithoutTournament_team_playersInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedCreateWithoutTournament_team_playersInput>;
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTournament_team_playersInput;
    connect?: Prisma.team_membersWhereUniqueInput;
};
export type team_membersUpdateOneRequiredWithoutTournament_team_playersNestedInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedCreateWithoutTournament_team_playersInput>;
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutTournament_team_playersInput;
    upsert?: Prisma.team_membersUpsertWithoutTournament_team_playersInput;
    connect?: Prisma.team_membersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.team_membersUpdateToOneWithWhereWithoutTournament_team_playersInput, Prisma.team_membersUpdateWithoutTournament_team_playersInput>, Prisma.team_membersUncheckedUpdateWithoutTournament_team_playersInput>;
};
export type team_membersCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput> | Prisma.team_membersCreateWithoutUsersInput[] | Prisma.team_membersUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutUsersInput | Prisma.team_membersCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.team_membersCreateManyUsersInputEnvelope;
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
};
export type team_membersUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput> | Prisma.team_membersCreateWithoutUsersInput[] | Prisma.team_membersUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutUsersInput | Prisma.team_membersCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.team_membersCreateManyUsersInputEnvelope;
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
};
export type team_membersUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput> | Prisma.team_membersCreateWithoutUsersInput[] | Prisma.team_membersUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutUsersInput | Prisma.team_membersCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.team_membersUpsertWithWhereUniqueWithoutUsersInput | Prisma.team_membersUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.team_membersCreateManyUsersInputEnvelope;
    set?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    disconnect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    delete?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    update?: Prisma.team_membersUpdateWithWhereUniqueWithoutUsersInput | Prisma.team_membersUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.team_membersUpdateManyWithWhereWithoutUsersInput | Prisma.team_membersUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
};
export type team_membersUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput> | Prisma.team_membersCreateWithoutUsersInput[] | Prisma.team_membersUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.team_membersCreateOrConnectWithoutUsersInput | Prisma.team_membersCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.team_membersUpsertWithWhereUniqueWithoutUsersInput | Prisma.team_membersUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.team_membersCreateManyUsersInputEnvelope;
    set?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    disconnect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    delete?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    connect?: Prisma.team_membersWhereUniqueInput | Prisma.team_membersWhereUniqueInput[];
    update?: Prisma.team_membersUpdateWithWhereUniqueWithoutUsersInput | Prisma.team_membersUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.team_membersUpdateManyWithWhereWithoutUsersInput | Prisma.team_membersUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
};
export type team_membersCreateWithoutTeamsInput = {
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutTeam_membersInput;
    tournament_team_players?: Prisma.tournament_team_playersCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersUncheckedCreateWithoutTeamsInput = {
    user_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersCreateOrConnectWithoutTeamsInput = {
    where: Prisma.team_membersWhereUniqueInput;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput>;
};
export type team_membersCreateManyTeamsInputEnvelope = {
    data: Prisma.team_membersCreateManyTeamsInput | Prisma.team_membersCreateManyTeamsInput[];
    skipDuplicates?: boolean;
};
export type team_membersUpsertWithWhereUniqueWithoutTeamsInput = {
    where: Prisma.team_membersWhereUniqueInput;
    update: Prisma.XOR<Prisma.team_membersUpdateWithoutTeamsInput, Prisma.team_membersUncheckedUpdateWithoutTeamsInput>;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutTeamsInput, Prisma.team_membersUncheckedCreateWithoutTeamsInput>;
};
export type team_membersUpdateWithWhereUniqueWithoutTeamsInput = {
    where: Prisma.team_membersWhereUniqueInput;
    data: Prisma.XOR<Prisma.team_membersUpdateWithoutTeamsInput, Prisma.team_membersUncheckedUpdateWithoutTeamsInput>;
};
export type team_membersUpdateManyWithWhereWithoutTeamsInput = {
    where: Prisma.team_membersScalarWhereInput;
    data: Prisma.XOR<Prisma.team_membersUpdateManyMutationInput, Prisma.team_membersUncheckedUpdateManyWithoutTeamsInput>;
};
export type team_membersScalarWhereInput = {
    AND?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
    OR?: Prisma.team_membersScalarWhereInput[];
    NOT?: Prisma.team_membersScalarWhereInput | Prisma.team_membersScalarWhereInput[];
    team_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"team_members"> | bigint | number;
    member_role?: Prisma.StringFilter<"team_members"> | string;
    status?: Prisma.StringFilter<"team_members"> | string;
    created_at?: Prisma.DateTimeFilter<"team_members"> | Date | string;
};
export type team_membersCreateWithoutTournament_team_playersInput = {
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    teams: Prisma.teamsCreateNestedOneWithoutTeam_membersInput;
    users: Prisma.usersCreateNestedOneWithoutTeam_membersInput;
};
export type team_membersUncheckedCreateWithoutTournament_team_playersInput = {
    team_id: bigint | number;
    user_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
};
export type team_membersCreateOrConnectWithoutTournament_team_playersInput = {
    where: Prisma.team_membersWhereUniqueInput;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedCreateWithoutTournament_team_playersInput>;
};
export type team_membersUpsertWithoutTournament_team_playersInput = {
    update: Prisma.XOR<Prisma.team_membersUpdateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedUpdateWithoutTournament_team_playersInput>;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedCreateWithoutTournament_team_playersInput>;
    where?: Prisma.team_membersWhereInput;
};
export type team_membersUpdateToOneWithWhereWithoutTournament_team_playersInput = {
    where?: Prisma.team_membersWhereInput;
    data: Prisma.XOR<Prisma.team_membersUpdateWithoutTournament_team_playersInput, Prisma.team_membersUncheckedUpdateWithoutTournament_team_playersInput>;
};
export type team_membersUpdateWithoutTournament_team_playersInput = {
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teams?: Prisma.teamsUpdateOneRequiredWithoutTeam_membersNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateWithoutTournament_team_playersInput = {
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type team_membersCreateWithoutUsersInput = {
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    teams: Prisma.teamsCreateNestedOneWithoutTeam_membersInput;
    tournament_team_players?: Prisma.tournament_team_playersCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersUncheckedCreateWithoutUsersInput = {
    team_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedCreateNestedManyWithoutTeam_membersInput;
};
export type team_membersCreateOrConnectWithoutUsersInput = {
    where: Prisma.team_membersWhereUniqueInput;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput>;
};
export type team_membersCreateManyUsersInputEnvelope = {
    data: Prisma.team_membersCreateManyUsersInput | Prisma.team_membersCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type team_membersUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.team_membersWhereUniqueInput;
    update: Prisma.XOR<Prisma.team_membersUpdateWithoutUsersInput, Prisma.team_membersUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.team_membersCreateWithoutUsersInput, Prisma.team_membersUncheckedCreateWithoutUsersInput>;
};
export type team_membersUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.team_membersWhereUniqueInput;
    data: Prisma.XOR<Prisma.team_membersUpdateWithoutUsersInput, Prisma.team_membersUncheckedUpdateWithoutUsersInput>;
};
export type team_membersUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.team_membersScalarWhereInput;
    data: Prisma.XOR<Prisma.team_membersUpdateManyMutationInput, Prisma.team_membersUncheckedUpdateManyWithoutUsersInput>;
};
export type team_membersCreateManyTeamsInput = {
    user_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
};
export type team_membersUpdateWithoutTeamsInput = {
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutTeam_membersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateWithoutTeamsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateManyWithoutTeamsInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type team_membersCreateManyUsersInput = {
    team_id: bigint | number;
    member_role?: string;
    status?: string;
    created_at?: Date | string;
};
export type team_membersUpdateWithoutUsersInput = {
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teams?: Prisma.teamsUpdateOneRequiredWithoutTeam_membersNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateWithoutUsersInput = {
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUncheckedUpdateManyWithoutTeam_membersNestedInput;
};
export type team_membersUncheckedUpdateManyWithoutUsersInput = {
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    member_role?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Team_membersCountOutputType = {
    tournament_team_players: number;
};
export type Team_membersCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournament_team_players?: boolean | Team_membersCountOutputTypeCountTournament_team_playersArgs;
};
export type Team_membersCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Team_membersCountOutputTypeSelect<ExtArgs> | null;
};
export type Team_membersCountOutputTypeCountTournament_team_playersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_team_playersWhereInput;
};
export type team_membersSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    user_id?: boolean;
    member_role?: boolean;
    status?: boolean;
    created_at?: boolean;
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.team_members$tournament_team_playersArgs<ExtArgs>;
    _count?: boolean | Prisma.Team_membersCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["team_members"]>;
export type team_membersSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    user_id?: boolean;
    member_role?: boolean;
    status?: boolean;
    created_at?: boolean;
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["team_members"]>;
export type team_membersSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    team_id?: boolean;
    user_id?: boolean;
    member_role?: boolean;
    status?: boolean;
    created_at?: boolean;
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["team_members"]>;
export type team_membersSelectScalar = {
    team_id?: boolean;
    user_id?: boolean;
    member_role?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type team_membersOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"team_id" | "user_id" | "member_role" | "status" | "created_at", ExtArgs["result"]["team_members"]>;
export type team_membersInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.team_members$tournament_team_playersArgs<ExtArgs>;
    _count?: boolean | Prisma.Team_membersCountOutputTypeDefaultArgs<ExtArgs>;
};
export type team_membersIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type team_membersIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    teams?: boolean | Prisma.teamsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $team_membersPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "team_members";
    objects: {
        teams: Prisma.$teamsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
        tournament_team_players: Prisma.$tournament_team_playersPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        team_id: bigint;
        user_id: bigint;
        member_role: string;
        status: string;
        created_at: Date;
    }, ExtArgs["result"]["team_members"]>;
    composites: {};
};
export type team_membersGetPayload<S extends boolean | null | undefined | team_membersDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$team_membersPayload, S>;
export type team_membersCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<team_membersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Team_membersCountAggregateInputType | true;
};
export interface team_membersDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['team_members'];
        meta: {
            name: 'team_members';
        };
    };
    findUnique<T extends team_membersFindUniqueArgs>(args: Prisma.SelectSubset<T, team_membersFindUniqueArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends team_membersFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, team_membersFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends team_membersFindFirstArgs>(args?: Prisma.SelectSubset<T, team_membersFindFirstArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends team_membersFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, team_membersFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends team_membersFindManyArgs>(args?: Prisma.SelectSubset<T, team_membersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends team_membersCreateArgs>(args: Prisma.SelectSubset<T, team_membersCreateArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends team_membersCreateManyArgs>(args?: Prisma.SelectSubset<T, team_membersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends team_membersCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, team_membersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends team_membersDeleteArgs>(args: Prisma.SelectSubset<T, team_membersDeleteArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends team_membersUpdateArgs>(args: Prisma.SelectSubset<T, team_membersUpdateArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends team_membersDeleteManyArgs>(args?: Prisma.SelectSubset<T, team_membersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends team_membersUpdateManyArgs>(args: Prisma.SelectSubset<T, team_membersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends team_membersUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, team_membersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends team_membersUpsertArgs>(args: Prisma.SelectSubset<T, team_membersUpsertArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends team_membersCountArgs>(args?: Prisma.Subset<T, team_membersCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Team_membersCountAggregateOutputType> : number>;
    aggregate<T extends Team_membersAggregateArgs>(args: Prisma.Subset<T, Team_membersAggregateArgs>): Prisma.PrismaPromise<GetTeam_membersAggregateType<T>>;
    groupBy<T extends team_membersGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: team_membersGroupByArgs['orderBy'];
    } : {
        orderBy?: team_membersGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, team_membersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeam_membersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: team_membersFieldRefs;
}
export interface Prisma__team_membersClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    teams<T extends Prisma.teamsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.teamsDefaultArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_team_players<T extends Prisma.team_members$tournament_team_playersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.team_members$tournament_team_playersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface team_membersFieldRefs {
    readonly team_id: Prisma.FieldRef<"team_members", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"team_members", 'BigInt'>;
    readonly member_role: Prisma.FieldRef<"team_members", 'String'>;
    readonly status: Prisma.FieldRef<"team_members", 'String'>;
    readonly created_at: Prisma.FieldRef<"team_members", 'DateTime'>;
}
export type team_membersFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where: Prisma.team_membersWhereUniqueInput;
};
export type team_membersFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where: Prisma.team_membersWhereUniqueInput;
};
export type team_membersFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where?: Prisma.team_membersWhereInput;
    orderBy?: Prisma.team_membersOrderByWithRelationInput | Prisma.team_membersOrderByWithRelationInput[];
    cursor?: Prisma.team_membersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Team_membersScalarFieldEnum | Prisma.Team_membersScalarFieldEnum[];
};
export type team_membersFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where?: Prisma.team_membersWhereInput;
    orderBy?: Prisma.team_membersOrderByWithRelationInput | Prisma.team_membersOrderByWithRelationInput[];
    cursor?: Prisma.team_membersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Team_membersScalarFieldEnum | Prisma.Team_membersScalarFieldEnum[];
};
export type team_membersFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where?: Prisma.team_membersWhereInput;
    orderBy?: Prisma.team_membersOrderByWithRelationInput | Prisma.team_membersOrderByWithRelationInput[];
    cursor?: Prisma.team_membersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Team_membersScalarFieldEnum | Prisma.Team_membersScalarFieldEnum[];
};
export type team_membersCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.team_membersCreateInput, Prisma.team_membersUncheckedCreateInput>;
};
export type team_membersCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.team_membersCreateManyInput | Prisma.team_membersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type team_membersCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    data: Prisma.team_membersCreateManyInput | Prisma.team_membersCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.team_membersIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type team_membersUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.team_membersUpdateInput, Prisma.team_membersUncheckedUpdateInput>;
    where: Prisma.team_membersWhereUniqueInput;
};
export type team_membersUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.team_membersUpdateManyMutationInput, Prisma.team_membersUncheckedUpdateManyInput>;
    where?: Prisma.team_membersWhereInput;
    limit?: number;
};
export type team_membersUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.team_membersUpdateManyMutationInput, Prisma.team_membersUncheckedUpdateManyInput>;
    where?: Prisma.team_membersWhereInput;
    limit?: number;
    include?: Prisma.team_membersIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type team_membersUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where: Prisma.team_membersWhereUniqueInput;
    create: Prisma.XOR<Prisma.team_membersCreateInput, Prisma.team_membersUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.team_membersUpdateInput, Prisma.team_membersUncheckedUpdateInput>;
};
export type team_membersDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
    where: Prisma.team_membersWhereUniqueInput;
};
export type team_membersDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.team_membersWhereInput;
    limit?: number;
};
export type team_members$tournament_team_playersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    where?: Prisma.tournament_team_playersWhereInput;
    orderBy?: Prisma.tournament_team_playersOrderByWithRelationInput | Prisma.tournament_team_playersOrderByWithRelationInput[];
    cursor?: Prisma.tournament_team_playersWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_team_playersScalarFieldEnum | Prisma.Tournament_team_playersScalarFieldEnum[];
};
export type team_membersDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.team_membersSelect<ExtArgs> | null;
    omit?: Prisma.team_membersOmit<ExtArgs> | null;
    include?: Prisma.team_membersInclude<ExtArgs> | null;
};
