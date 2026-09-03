import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_team_playersModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_team_playersPayload>;
export type AggregateTournament_team_players = {
    _count: Tournament_team_playersCountAggregateOutputType | null;
    _avg: Tournament_team_playersAvgAggregateOutputType | null;
    _sum: Tournament_team_playersSumAggregateOutputType | null;
    _min: Tournament_team_playersMinAggregateOutputType | null;
    _max: Tournament_team_playersMaxAggregateOutputType | null;
};
export type Tournament_team_playersAvgAggregateOutputType = {
    tournament_id: number | null;
    team_id: number | null;
    player_id: number | null;
    jersey_number: number | null;
};
export type Tournament_team_playersSumAggregateOutputType = {
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    jersey_number: number | null;
};
export type Tournament_team_playersMinAggregateOutputType = {
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    jersey_number: number | null;
    position: string | null;
    is_captain: boolean | null;
    registration_status: string | null;
    created_at: Date | null;
};
export type Tournament_team_playersMaxAggregateOutputType = {
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    jersey_number: number | null;
    position: string | null;
    is_captain: boolean | null;
    registration_status: string | null;
    created_at: Date | null;
};
export type Tournament_team_playersCountAggregateOutputType = {
    tournament_id: number;
    team_id: number;
    player_id: number;
    jersey_number: number;
    position: number;
    is_captain: number;
    registration_status: number;
    created_at: number;
    _all: number;
};
export type Tournament_team_playersAvgAggregateInputType = {
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    jersey_number?: true;
};
export type Tournament_team_playersSumAggregateInputType = {
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    jersey_number?: true;
};
export type Tournament_team_playersMinAggregateInputType = {
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    jersey_number?: true;
    position?: true;
    is_captain?: true;
    registration_status?: true;
    created_at?: true;
};
export type Tournament_team_playersMaxAggregateInputType = {
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    jersey_number?: true;
    position?: true;
    is_captain?: true;
    registration_status?: true;
    created_at?: true;
};
export type Tournament_team_playersCountAggregateInputType = {
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    jersey_number?: true;
    position?: true;
    is_captain?: true;
    registration_status?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_team_playersAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_team_playersWhereInput;
    orderBy?: Prisma.tournament_team_playersOrderByWithRelationInput | Prisma.tournament_team_playersOrderByWithRelationInput[];
    cursor?: Prisma.tournament_team_playersWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_team_playersCountAggregateInputType;
    _avg?: Tournament_team_playersAvgAggregateInputType;
    _sum?: Tournament_team_playersSumAggregateInputType;
    _min?: Tournament_team_playersMinAggregateInputType;
    _max?: Tournament_team_playersMaxAggregateInputType;
};
export type GetTournament_team_playersAggregateType<T extends Tournament_team_playersAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_team_players]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_team_players[P]> : Prisma.GetScalarType<T[P], AggregateTournament_team_players[P]>;
};
export type tournament_team_playersGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_team_playersWhereInput;
    orderBy?: Prisma.tournament_team_playersOrderByWithAggregationInput | Prisma.tournament_team_playersOrderByWithAggregationInput[];
    by: Prisma.Tournament_team_playersScalarFieldEnum[] | Prisma.Tournament_team_playersScalarFieldEnum;
    having?: Prisma.tournament_team_playersScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_team_playersCountAggregateInputType | true;
    _avg?: Tournament_team_playersAvgAggregateInputType;
    _sum?: Tournament_team_playersSumAggregateInputType;
    _min?: Tournament_team_playersMinAggregateInputType;
    _max?: Tournament_team_playersMaxAggregateInputType;
};
export type Tournament_team_playersGroupByOutputType = {
    tournament_id: bigint;
    team_id: bigint;
    player_id: bigint;
    jersey_number: number | null;
    position: string | null;
    is_captain: boolean;
    registration_status: string;
    created_at: Date;
    _count: Tournament_team_playersCountAggregateOutputType | null;
    _avg: Tournament_team_playersAvgAggregateOutputType | null;
    _sum: Tournament_team_playersSumAggregateOutputType | null;
    _min: Tournament_team_playersMinAggregateOutputType | null;
    _max: Tournament_team_playersMaxAggregateOutputType | null;
};
export type GetTournament_team_playersGroupByPayload<T extends tournament_team_playersGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_team_playersGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_team_playersGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_team_playersGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_team_playersGroupByOutputType[P]>;
}>>;
export type tournament_team_playersWhereInput = {
    AND?: Prisma.tournament_team_playersWhereInput | Prisma.tournament_team_playersWhereInput[];
    OR?: Prisma.tournament_team_playersWhereInput[];
    NOT?: Prisma.tournament_team_playersWhereInput | Prisma.tournament_team_playersWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    jersey_number?: Prisma.IntNullableFilter<"tournament_team_players"> | number | null;
    position?: Prisma.StringNullableFilter<"tournament_team_players"> | string | null;
    is_captain?: Prisma.BoolFilter<"tournament_team_players"> | boolean;
    registration_status?: Prisma.StringFilter<"tournament_team_players"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_team_players"> | Date | string;
    disciplinary_actions?: Prisma.Disciplinary_actionsListRelationFilter;
    player_match_stats?: Prisma.Player_match_statsListRelationFilter;
    team_members?: Prisma.XOR<Prisma.Team_membersScalarRelationFilter, Prisma.team_membersWhereInput>;
    tournament_team_registrations?: Prisma.XOR<Prisma.Tournament_team_registrationsScalarRelationFilter, Prisma.tournament_team_registrationsWhereInput>;
};
export type tournament_team_playersOrderByWithRelationInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_captain?: Prisma.SortOrder;
    registration_status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    disciplinary_actions?: Prisma.disciplinary_actionsOrderByRelationAggregateInput;
    player_match_stats?: Prisma.player_match_statsOrderByRelationAggregateInput;
    team_members?: Prisma.team_membersOrderByWithRelationInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsOrderByWithRelationInput;
};
export type tournament_team_playersWhereUniqueInput = Prisma.AtLeast<{
    tournament_id_team_id_jersey_number?: Prisma.tournament_team_playersTournament_idTeam_idJersey_numberCompoundUniqueInput;
    tournament_id_player_id?: Prisma.tournament_team_playersTournament_idPlayer_idCompoundUniqueInput;
    tournament_id_team_id_player_id?: Prisma.tournament_team_playersTournament_idTeam_idPlayer_idCompoundUniqueInput;
    AND?: Prisma.tournament_team_playersWhereInput | Prisma.tournament_team_playersWhereInput[];
    OR?: Prisma.tournament_team_playersWhereInput[];
    NOT?: Prisma.tournament_team_playersWhereInput | Prisma.tournament_team_playersWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    jersey_number?: Prisma.IntNullableFilter<"tournament_team_players"> | number | null;
    position?: Prisma.StringNullableFilter<"tournament_team_players"> | string | null;
    is_captain?: Prisma.BoolFilter<"tournament_team_players"> | boolean;
    registration_status?: Prisma.StringFilter<"tournament_team_players"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_team_players"> | Date | string;
    disciplinary_actions?: Prisma.Disciplinary_actionsListRelationFilter;
    player_match_stats?: Prisma.Player_match_statsListRelationFilter;
    team_members?: Prisma.XOR<Prisma.Team_membersScalarRelationFilter, Prisma.team_membersWhereInput>;
    tournament_team_registrations?: Prisma.XOR<Prisma.Tournament_team_registrationsScalarRelationFilter, Prisma.tournament_team_registrationsWhereInput>;
}, "tournament_id_team_id_player_id" | "tournament_id_team_id_jersey_number" | "tournament_id_player_id">;
export type tournament_team_playersOrderByWithAggregationInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_captain?: Prisma.SortOrder;
    registration_status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_team_playersCountOrderByAggregateInput;
    _avg?: Prisma.tournament_team_playersAvgOrderByAggregateInput;
    _max?: Prisma.tournament_team_playersMaxOrderByAggregateInput;
    _min?: Prisma.tournament_team_playersMinOrderByAggregateInput;
    _sum?: Prisma.tournament_team_playersSumOrderByAggregateInput;
};
export type tournament_team_playersScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_team_playersScalarWhereWithAggregatesInput | Prisma.tournament_team_playersScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_team_playersScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_team_playersScalarWhereWithAggregatesInput | Prisma.tournament_team_playersScalarWhereWithAggregatesInput[];
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_team_players"> | bigint | number;
    team_id?: Prisma.BigIntWithAggregatesFilter<"tournament_team_players"> | bigint | number;
    player_id?: Prisma.BigIntWithAggregatesFilter<"tournament_team_players"> | bigint | number;
    jersey_number?: Prisma.IntNullableWithAggregatesFilter<"tournament_team_players"> | number | null;
    position?: Prisma.StringNullableWithAggregatesFilter<"tournament_team_players"> | string | null;
    is_captain?: Prisma.BoolWithAggregatesFilter<"tournament_team_players"> | boolean;
    registration_status?: Prisma.StringWithAggregatesFilter<"tournament_team_players"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_team_players"> | Date | string;
};
export type tournament_team_playersCreateInput = {
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsCreateNestedManyWithoutTournament_team_playersInput;
    team_members: Prisma.team_membersCreateNestedOneWithoutTournament_team_playersInput;
    tournament_team_registrations: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_team_playersInput;
};
export type tournament_team_playersUncheckedCreateInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
};
export type tournament_team_playersUpdateInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUpdateManyWithoutTournament_team_playersNestedInput;
    team_members?: Prisma.team_membersUpdateOneRequiredWithoutTournament_team_playersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersCreateManyInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
};
export type tournament_team_playersUpdateManyMutationInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_team_playersUncheckedUpdateManyInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_team_playersScalarRelationFilter = {
    is?: Prisma.tournament_team_playersWhereInput;
    isNot?: Prisma.tournament_team_playersWhereInput;
};
export type Tournament_team_playersListRelationFilter = {
    every?: Prisma.tournament_team_playersWhereInput;
    some?: Prisma.tournament_team_playersWhereInput;
    none?: Prisma.tournament_team_playersWhereInput;
};
export type tournament_team_playersOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_team_playersTournament_idTeam_idJersey_numberCompoundUniqueInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    jersey_number: number;
};
export type tournament_team_playersTournament_idPlayer_idCompoundUniqueInput = {
    tournament_id: bigint | number;
    player_id: bigint | number;
};
export type tournament_team_playersTournament_idTeam_idPlayer_idCompoundUniqueInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
};
export type tournament_team_playersCountOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    is_captain?: Prisma.SortOrder;
    registration_status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_team_playersAvgOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrder;
};
export type tournament_team_playersMaxOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    is_captain?: Prisma.SortOrder;
    registration_status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_team_playersMinOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    is_captain?: Prisma.SortOrder;
    registration_status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_team_playersSumOrderByAggregateInput = {
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    jersey_number?: Prisma.SortOrder;
};
export type tournament_team_playersCreateNestedOneWithoutDisciplinary_actionsInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutDisciplinary_actionsInput;
    connect?: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersUpdateOneRequiredWithoutDisciplinary_actionsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedCreateWithoutDisciplinary_actionsInput>;
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutDisciplinary_actionsInput;
    upsert?: Prisma.tournament_team_playersUpsertWithoutDisciplinary_actionsInput;
    connect?: Prisma.tournament_team_playersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.tournament_team_playersUpdateToOneWithWhereWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUpdateWithoutDisciplinary_actionsInput>, Prisma.tournament_team_playersUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type tournament_team_playersCreateNestedOneWithoutPlayer_match_statsInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedCreateWithoutPlayer_match_statsInput>;
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutPlayer_match_statsInput;
    connect?: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersUpdateOneRequiredWithoutPlayer_match_statsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedCreateWithoutPlayer_match_statsInput>;
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutPlayer_match_statsInput;
    upsert?: Prisma.tournament_team_playersUpsertWithoutPlayer_match_statsInput;
    connect?: Prisma.tournament_team_playersWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.tournament_team_playersUpdateToOneWithWhereWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUpdateWithoutPlayer_match_statsInput>, Prisma.tournament_team_playersUncheckedUpdateWithoutPlayer_match_statsInput>;
};
export type tournament_team_playersCreateNestedManyWithoutTeam_membersInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput> | Prisma.tournament_team_playersCreateWithoutTeam_membersInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput | Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTeam_membersInputEnvelope;
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
};
export type tournament_team_playersUncheckedCreateNestedManyWithoutTeam_membersInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput> | Prisma.tournament_team_playersCreateWithoutTeam_membersInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput | Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTeam_membersInputEnvelope;
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
};
export type tournament_team_playersUpdateManyWithoutTeam_membersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput> | Prisma.tournament_team_playersCreateWithoutTeam_membersInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput | Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput[];
    upsert?: Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTeam_membersInput | Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTeam_membersInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTeam_membersInputEnvelope;
    set?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    disconnect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    delete?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    update?: Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTeam_membersInput | Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTeam_membersInput[];
    updateMany?: Prisma.tournament_team_playersUpdateManyWithWhereWithoutTeam_membersInput | Prisma.tournament_team_playersUpdateManyWithWhereWithoutTeam_membersInput[];
    deleteMany?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
};
export type tournament_team_playersUncheckedUpdateManyWithoutTeam_membersNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput> | Prisma.tournament_team_playersCreateWithoutTeam_membersInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput | Prisma.tournament_team_playersCreateOrConnectWithoutTeam_membersInput[];
    upsert?: Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTeam_membersInput | Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTeam_membersInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTeam_membersInputEnvelope;
    set?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    disconnect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    delete?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    update?: Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTeam_membersInput | Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTeam_membersInput[];
    updateMany?: Prisma.tournament_team_playersUpdateManyWithWhereWithoutTeam_membersInput | Prisma.tournament_team_playersUpdateManyWithWhereWithoutTeam_membersInput[];
    deleteMany?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type tournament_team_playersCreateNestedManyWithoutTournament_team_registrationsInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput> | Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTournament_team_registrationsInputEnvelope;
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
};
export type tournament_team_playersUncheckedCreateNestedManyWithoutTournament_team_registrationsInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput> | Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTournament_team_registrationsInputEnvelope;
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
};
export type tournament_team_playersUpdateManyWithoutTournament_team_registrationsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput> | Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput[];
    upsert?: Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTournament_team_registrationsInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTournament_team_registrationsInputEnvelope;
    set?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    disconnect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    delete?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    update?: Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTournament_team_registrationsInput[];
    updateMany?: Prisma.tournament_team_playersUpdateManyWithWhereWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpdateManyWithWhereWithoutTournament_team_registrationsInput[];
    deleteMany?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
};
export type tournament_team_playersUncheckedUpdateManyWithoutTournament_team_registrationsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput> | Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput[] | Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput[];
    connectOrCreate?: Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput[];
    upsert?: Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpsertWithWhereUniqueWithoutTournament_team_registrationsInput[];
    createMany?: Prisma.tournament_team_playersCreateManyTournament_team_registrationsInputEnvelope;
    set?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    disconnect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    delete?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    connect?: Prisma.tournament_team_playersWhereUniqueInput | Prisma.tournament_team_playersWhereUniqueInput[];
    update?: Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpdateWithWhereUniqueWithoutTournament_team_registrationsInput[];
    updateMany?: Prisma.tournament_team_playersUpdateManyWithWhereWithoutTournament_team_registrationsInput | Prisma.tournament_team_playersUpdateManyWithWhereWithoutTournament_team_registrationsInput[];
    deleteMany?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
};
export type tournament_team_playersCreateWithoutDisciplinary_actionsInput = {
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    player_match_stats?: Prisma.player_match_statsCreateNestedManyWithoutTournament_team_playersInput;
    team_members: Prisma.team_membersCreateNestedOneWithoutTournament_team_playersInput;
    tournament_team_registrations: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_team_playersInput;
};
export type tournament_team_playersUncheckedCreateWithoutDisciplinary_actionsInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    player_match_stats?: Prisma.player_match_statsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
};
export type tournament_team_playersCreateOrConnectWithoutDisciplinary_actionsInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedCreateWithoutDisciplinary_actionsInput>;
};
export type tournament_team_playersUpsertWithoutDisciplinary_actionsInput = {
    update: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutDisciplinary_actionsInput>;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedCreateWithoutDisciplinary_actionsInput>;
    where?: Prisma.tournament_team_playersWhereInput;
};
export type tournament_team_playersUpdateToOneWithWhereWithoutDisciplinary_actionsInput = {
    where?: Prisma.tournament_team_playersWhereInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutDisciplinary_actionsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutDisciplinary_actionsInput>;
};
export type tournament_team_playersUpdateWithoutDisciplinary_actionsInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    player_match_stats?: Prisma.player_match_statsUpdateManyWithoutTournament_team_playersNestedInput;
    team_members?: Prisma.team_membersUpdateOneRequiredWithoutTournament_team_playersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateWithoutDisciplinary_actionsInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    player_match_stats?: Prisma.player_match_statsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersCreateWithoutPlayer_match_statsInput = {
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsCreateNestedManyWithoutTournament_team_playersInput;
    team_members: Prisma.team_membersCreateNestedOneWithoutTournament_team_playersInput;
    tournament_team_registrations: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_team_playersInput;
};
export type tournament_team_playersUncheckedCreateWithoutPlayer_match_statsInput = {
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
};
export type tournament_team_playersCreateOrConnectWithoutPlayer_match_statsInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedCreateWithoutPlayer_match_statsInput>;
};
export type tournament_team_playersUpsertWithoutPlayer_match_statsInput = {
    update: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutPlayer_match_statsInput>;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedCreateWithoutPlayer_match_statsInput>;
    where?: Prisma.tournament_team_playersWhereInput;
};
export type tournament_team_playersUpdateToOneWithWhereWithoutPlayer_match_statsInput = {
    where?: Prisma.tournament_team_playersWhereInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutPlayer_match_statsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutPlayer_match_statsInput>;
};
export type tournament_team_playersUpdateWithoutPlayer_match_statsInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateManyWithoutTournament_team_playersNestedInput;
    team_members?: Prisma.team_membersUpdateOneRequiredWithoutTournament_team_playersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateWithoutPlayer_match_statsInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersCreateWithoutTeam_membersInput = {
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsCreateNestedManyWithoutTournament_team_playersInput;
    tournament_team_registrations: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_team_playersInput;
};
export type tournament_team_playersUncheckedCreateWithoutTeam_membersInput = {
    tournament_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
};
export type tournament_team_playersCreateOrConnectWithoutTeam_membersInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput>;
};
export type tournament_team_playersCreateManyTeam_membersInputEnvelope = {
    data: Prisma.tournament_team_playersCreateManyTeam_membersInput | Prisma.tournament_team_playersCreateManyTeam_membersInput[];
    skipDuplicates?: boolean;
};
export type tournament_team_playersUpsertWithWhereUniqueWithoutTeam_membersInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedUpdateWithoutTeam_membersInput>;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedCreateWithoutTeam_membersInput>;
};
export type tournament_team_playersUpdateWithWhereUniqueWithoutTeam_membersInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutTeam_membersInput, Prisma.tournament_team_playersUncheckedUpdateWithoutTeam_membersInput>;
};
export type tournament_team_playersUpdateManyWithWhereWithoutTeam_membersInput = {
    where: Prisma.tournament_team_playersScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateManyMutationInput, Prisma.tournament_team_playersUncheckedUpdateManyWithoutTeam_membersInput>;
};
export type tournament_team_playersScalarWhereInput = {
    AND?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
    OR?: Prisma.tournament_team_playersScalarWhereInput[];
    NOT?: Prisma.tournament_team_playersScalarWhereInput | Prisma.tournament_team_playersScalarWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"tournament_team_players"> | bigint | number;
    jersey_number?: Prisma.IntNullableFilter<"tournament_team_players"> | number | null;
    position?: Prisma.StringNullableFilter<"tournament_team_players"> | string | null;
    is_captain?: Prisma.BoolFilter<"tournament_team_players"> | boolean;
    registration_status?: Prisma.StringFilter<"tournament_team_players"> | string;
    created_at?: Prisma.DateTimeFilter<"tournament_team_players"> | Date | string;
};
export type tournament_team_playersCreateWithoutTournament_team_registrationsInput = {
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsCreateNestedManyWithoutTournament_team_playersInput;
    team_members: Prisma.team_membersCreateNestedOneWithoutTournament_team_playersInput;
};
export type tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput = {
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
    player_match_stats?: Prisma.player_match_statsUncheckedCreateNestedManyWithoutTournament_team_playersInput;
};
export type tournament_team_playersCreateOrConnectWithoutTournament_team_registrationsInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput>;
};
export type tournament_team_playersCreateManyTournament_team_registrationsInputEnvelope = {
    data: Prisma.tournament_team_playersCreateManyTournament_team_registrationsInput | Prisma.tournament_team_playersCreateManyTournament_team_registrationsInput[];
    skipDuplicates?: boolean;
};
export type tournament_team_playersUpsertWithWhereUniqueWithoutTournament_team_registrationsInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutTournament_team_registrationsInput>;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedCreateWithoutTournament_team_registrationsInput>;
};
export type tournament_team_playersUpdateWithWhereUniqueWithoutTournament_team_registrationsInput = {
    where: Prisma.tournament_team_playersWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateWithoutTournament_team_registrationsInput, Prisma.tournament_team_playersUncheckedUpdateWithoutTournament_team_registrationsInput>;
};
export type tournament_team_playersUpdateManyWithWhereWithoutTournament_team_registrationsInput = {
    where: Prisma.tournament_team_playersScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateManyMutationInput, Prisma.tournament_team_playersUncheckedUpdateManyWithoutTournament_team_registrationsInput>;
};
export type tournament_team_playersCreateManyTeam_membersInput = {
    tournament_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
};
export type tournament_team_playersUpdateWithoutTeam_membersInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUpdateManyWithoutTournament_team_playersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateWithoutTeam_membersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateManyWithoutTeam_membersInput = {
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_team_playersCreateManyTournament_team_registrationsInput = {
    player_id: bigint | number;
    jersey_number?: number | null;
    position?: string | null;
    is_captain?: boolean;
    registration_status?: string;
    created_at?: Date | string;
};
export type tournament_team_playersUpdateWithoutTournament_team_registrationsInput = {
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUpdateManyWithoutTournament_team_playersNestedInput;
    team_members?: Prisma.team_membersUpdateOneRequiredWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateWithoutTournament_team_registrationsInput = {
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disciplinary_actions?: Prisma.disciplinary_actionsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
    player_match_stats?: Prisma.player_match_statsUncheckedUpdateManyWithoutTournament_team_playersNestedInput;
};
export type tournament_team_playersUncheckedUpdateManyWithoutTournament_team_registrationsInput = {
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    jersey_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_captain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    registration_status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_team_playersCountOutputType = {
    disciplinary_actions: number;
    player_match_stats: number;
};
export type Tournament_team_playersCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Tournament_team_playersCountOutputTypeCountDisciplinary_actionsArgs;
    player_match_stats?: boolean | Tournament_team_playersCountOutputTypeCountPlayer_match_statsArgs;
};
export type Tournament_team_playersCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Tournament_team_playersCountOutputTypeSelect<ExtArgs> | null;
};
export type Tournament_team_playersCountOutputTypeCountDisciplinary_actionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.disciplinary_actionsWhereInput;
};
export type Tournament_team_playersCountOutputTypeCountPlayer_match_statsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.player_match_statsWhereInput;
};
export type tournament_team_playersSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    jersey_number?: boolean;
    position?: boolean;
    is_captain?: boolean;
    registration_status?: boolean;
    created_at?: boolean;
    disciplinary_actions?: boolean | Prisma.tournament_team_players$disciplinary_actionsArgs<ExtArgs>;
    player_match_stats?: boolean | Prisma.tournament_team_players$player_match_statsArgs<ExtArgs>;
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_team_playersCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_team_players"]>;
export type tournament_team_playersSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    jersey_number?: boolean;
    position?: boolean;
    is_captain?: boolean;
    registration_status?: boolean;
    created_at?: boolean;
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_team_players"]>;
export type tournament_team_playersSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    jersey_number?: boolean;
    position?: boolean;
    is_captain?: boolean;
    registration_status?: boolean;
    created_at?: boolean;
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_team_players"]>;
export type tournament_team_playersSelectScalar = {
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    jersey_number?: boolean;
    position?: boolean;
    is_captain?: boolean;
    registration_status?: boolean;
    created_at?: boolean;
};
export type tournament_team_playersOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"tournament_id" | "team_id" | "player_id" | "jersey_number" | "position" | "is_captain" | "registration_status" | "created_at", ExtArgs["result"]["tournament_team_players"]>;
export type tournament_team_playersInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disciplinary_actions?: boolean | Prisma.tournament_team_players$disciplinary_actionsArgs<ExtArgs>;
    player_match_stats?: boolean | Prisma.tournament_team_players$player_match_statsArgs<ExtArgs>;
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_team_playersCountOutputTypeDefaultArgs<ExtArgs>;
};
export type tournament_team_playersIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
};
export type tournament_team_playersIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team_members?: boolean | Prisma.team_membersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
};
export type $tournament_team_playersPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_team_players";
    objects: {
        disciplinary_actions: Prisma.$disciplinary_actionsPayload<ExtArgs>[];
        player_match_stats: Prisma.$player_match_statsPayload<ExtArgs>[];
        team_members: Prisma.$team_membersPayload<ExtArgs>;
        tournament_team_registrations: Prisma.$tournament_team_registrationsPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        tournament_id: bigint;
        team_id: bigint;
        player_id: bigint;
        jersey_number: number | null;
        position: string | null;
        is_captain: boolean;
        registration_status: string;
        created_at: Date;
    }, ExtArgs["result"]["tournament_team_players"]>;
    composites: {};
};
export type tournament_team_playersGetPayload<S extends boolean | null | undefined | tournament_team_playersDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload, S>;
export type tournament_team_playersCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_team_playersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_team_playersCountAggregateInputType | true;
};
export interface tournament_team_playersDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_team_players'];
        meta: {
            name: 'tournament_team_players';
        };
    };
    findUnique<T extends tournament_team_playersFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_team_playersFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_team_playersFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_team_playersFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_team_playersFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_team_playersFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_team_playersFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_team_playersCreateArgs>(args: Prisma.SelectSubset<T, tournament_team_playersCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_team_playersCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_team_playersCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_team_playersDeleteArgs>(args: Prisma.SelectSubset<T, tournament_team_playersDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_team_playersUpdateArgs>(args: Prisma.SelectSubset<T, tournament_team_playersUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_team_playersDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_team_playersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_team_playersUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_team_playersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_team_playersUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_team_playersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_team_playersUpsertArgs>(args: Prisma.SelectSubset<T, tournament_team_playersUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_team_playersCountArgs>(args?: Prisma.Subset<T, tournament_team_playersCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_team_playersCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_team_playersAggregateArgs>(args: Prisma.Subset<T, Tournament_team_playersAggregateArgs>): Prisma.PrismaPromise<GetTournament_team_playersAggregateType<T>>;
    groupBy<T extends tournament_team_playersGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_team_playersGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_team_playersGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_team_playersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_team_playersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_team_playersFieldRefs;
}
export interface Prisma__tournament_team_playersClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disciplinary_actions<T extends Prisma.tournament_team_players$disciplinary_actionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_players$disciplinary_actionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$disciplinary_actionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    player_match_stats<T extends Prisma.tournament_team_players$player_match_statsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_players$player_match_statsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    team_members<T extends Prisma.team_membersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.team_membersDefaultArgs<ExtArgs>>): Prisma.Prisma__team_membersClient<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_team_registrations<T extends Prisma.tournament_team_registrationsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournament_team_registrationsClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_registrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_team_playersFieldRefs {
    readonly tournament_id: Prisma.FieldRef<"tournament_team_players", 'BigInt'>;
    readonly team_id: Prisma.FieldRef<"tournament_team_players", 'BigInt'>;
    readonly player_id: Prisma.FieldRef<"tournament_team_players", 'BigInt'>;
    readonly jersey_number: Prisma.FieldRef<"tournament_team_players", 'Int'>;
    readonly position: Prisma.FieldRef<"tournament_team_players", 'String'>;
    readonly is_captain: Prisma.FieldRef<"tournament_team_players", 'Boolean'>;
    readonly registration_status: Prisma.FieldRef<"tournament_team_players", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_team_players", 'DateTime'>;
}
export type tournament_team_playersFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    where: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    where: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_team_playersFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_team_playersFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type tournament_team_playersCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_team_playersCreateInput, Prisma.tournament_team_playersUncheckedCreateInput>;
};
export type tournament_team_playersCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_team_playersCreateManyInput | Prisma.tournament_team_playersCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_team_playersCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    data: Prisma.tournament_team_playersCreateManyInput | Prisma.tournament_team_playersCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_team_playersIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_team_playersUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateInput, Prisma.tournament_team_playersUncheckedUpdateInput>;
    where: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateManyMutationInput, Prisma.tournament_team_playersUncheckedUpdateManyInput>;
    where?: Prisma.tournament_team_playersWhereInput;
    limit?: number;
};
export type tournament_team_playersUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_team_playersUpdateManyMutationInput, Prisma.tournament_team_playersUncheckedUpdateManyInput>;
    where?: Prisma.tournament_team_playersWhereInput;
    limit?: number;
    include?: Prisma.tournament_team_playersIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_team_playersUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    where: Prisma.tournament_team_playersWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_team_playersCreateInput, Prisma.tournament_team_playersUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_team_playersUpdateInput, Prisma.tournament_team_playersUncheckedUpdateInput>;
};
export type tournament_team_playersDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
    where: Prisma.tournament_team_playersWhereUniqueInput;
};
export type tournament_team_playersDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_team_playersWhereInput;
    limit?: number;
};
export type tournament_team_players$disciplinary_actionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.disciplinary_actionsSelect<ExtArgs> | null;
    omit?: Prisma.disciplinary_actionsOmit<ExtArgs> | null;
    include?: Prisma.disciplinary_actionsInclude<ExtArgs> | null;
    where?: Prisma.disciplinary_actionsWhereInput;
    orderBy?: Prisma.disciplinary_actionsOrderByWithRelationInput | Prisma.disciplinary_actionsOrderByWithRelationInput[];
    cursor?: Prisma.disciplinary_actionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Disciplinary_actionsScalarFieldEnum | Prisma.Disciplinary_actionsScalarFieldEnum[];
};
export type tournament_team_players$player_match_statsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    where?: Prisma.player_match_statsWhereInput;
    orderBy?: Prisma.player_match_statsOrderByWithRelationInput | Prisma.player_match_statsOrderByWithRelationInput[];
    cursor?: Prisma.player_match_statsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Player_match_statsScalarFieldEnum | Prisma.Player_match_statsScalarFieldEnum[];
};
export type tournament_team_playersDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_playersSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_playersOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_playersInclude<ExtArgs> | null;
};
