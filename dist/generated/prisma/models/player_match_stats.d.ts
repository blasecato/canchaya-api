import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type player_match_statsModel = runtime.Types.Result.DefaultSelection<Prisma.$player_match_statsPayload>;
export type AggregatePlayer_match_stats = {
    _count: Player_match_statsCountAggregateOutputType | null;
    _avg: Player_match_statsAvgAggregateOutputType | null;
    _sum: Player_match_statsSumAggregateOutputType | null;
    _min: Player_match_statsMinAggregateOutputType | null;
    _max: Player_match_statsMaxAggregateOutputType | null;
};
export type Player_match_statsAvgAggregateOutputType = {
    id: number | null;
    match_id: number | null;
    tournament_id: number | null;
    team_id: number | null;
    player_id: number | null;
    goals: number | null;
    assists: number | null;
    yellow_cards: number | null;
    red_cards: number | null;
    minutes_played: number | null;
};
export type Player_match_statsSumAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    goals: number | null;
    assists: number | null;
    yellow_cards: number | null;
    red_cards: number | null;
    minutes_played: number | null;
};
export type Player_match_statsMinAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    goals: number | null;
    assists: number | null;
    yellow_cards: number | null;
    red_cards: number | null;
    minutes_played: number | null;
    created_at: Date | null;
};
export type Player_match_statsMaxAggregateOutputType = {
    id: bigint | null;
    match_id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    player_id: bigint | null;
    goals: number | null;
    assists: number | null;
    yellow_cards: number | null;
    red_cards: number | null;
    minutes_played: number | null;
    created_at: Date | null;
};
export type Player_match_statsCountAggregateOutputType = {
    id: number;
    match_id: number;
    tournament_id: number;
    team_id: number;
    player_id: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
    minutes_played: number;
    created_at: number;
    _all: number;
};
export type Player_match_statsAvgAggregateInputType = {
    id?: true;
    match_id?: true;
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    goals?: true;
    assists?: true;
    yellow_cards?: true;
    red_cards?: true;
    minutes_played?: true;
};
export type Player_match_statsSumAggregateInputType = {
    id?: true;
    match_id?: true;
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    goals?: true;
    assists?: true;
    yellow_cards?: true;
    red_cards?: true;
    minutes_played?: true;
};
export type Player_match_statsMinAggregateInputType = {
    id?: true;
    match_id?: true;
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    goals?: true;
    assists?: true;
    yellow_cards?: true;
    red_cards?: true;
    minutes_played?: true;
    created_at?: true;
};
export type Player_match_statsMaxAggregateInputType = {
    id?: true;
    match_id?: true;
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    goals?: true;
    assists?: true;
    yellow_cards?: true;
    red_cards?: true;
    minutes_played?: true;
    created_at?: true;
};
export type Player_match_statsCountAggregateInputType = {
    id?: true;
    match_id?: true;
    tournament_id?: true;
    team_id?: true;
    player_id?: true;
    goals?: true;
    assists?: true;
    yellow_cards?: true;
    red_cards?: true;
    minutes_played?: true;
    created_at?: true;
    _all?: true;
};
export type Player_match_statsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.player_match_statsWhereInput;
    orderBy?: Prisma.player_match_statsOrderByWithRelationInput | Prisma.player_match_statsOrderByWithRelationInput[];
    cursor?: Prisma.player_match_statsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Player_match_statsCountAggregateInputType;
    _avg?: Player_match_statsAvgAggregateInputType;
    _sum?: Player_match_statsSumAggregateInputType;
    _min?: Player_match_statsMinAggregateInputType;
    _max?: Player_match_statsMaxAggregateInputType;
};
export type GetPlayer_match_statsAggregateType<T extends Player_match_statsAggregateArgs> = {
    [P in keyof T & keyof AggregatePlayer_match_stats]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlayer_match_stats[P]> : Prisma.GetScalarType<T[P], AggregatePlayer_match_stats[P]>;
};
export type player_match_statsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.player_match_statsWhereInput;
    orderBy?: Prisma.player_match_statsOrderByWithAggregationInput | Prisma.player_match_statsOrderByWithAggregationInput[];
    by: Prisma.Player_match_statsScalarFieldEnum[] | Prisma.Player_match_statsScalarFieldEnum;
    having?: Prisma.player_match_statsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Player_match_statsCountAggregateInputType | true;
    _avg?: Player_match_statsAvgAggregateInputType;
    _sum?: Player_match_statsSumAggregateInputType;
    _min?: Player_match_statsMinAggregateInputType;
    _max?: Player_match_statsMaxAggregateInputType;
};
export type Player_match_statsGroupByOutputType = {
    id: bigint;
    match_id: bigint;
    tournament_id: bigint;
    team_id: bigint;
    player_id: bigint;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
    minutes_played: number;
    created_at: Date;
    _count: Player_match_statsCountAggregateOutputType | null;
    _avg: Player_match_statsAvgAggregateOutputType | null;
    _sum: Player_match_statsSumAggregateOutputType | null;
    _min: Player_match_statsMinAggregateOutputType | null;
    _max: Player_match_statsMaxAggregateOutputType | null;
};
export type GetPlayer_match_statsGroupByPayload<T extends player_match_statsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Player_match_statsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Player_match_statsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Player_match_statsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Player_match_statsGroupByOutputType[P]>;
}>>;
export type player_match_statsWhereInput = {
    AND?: Prisma.player_match_statsWhereInput | Prisma.player_match_statsWhereInput[];
    OR?: Prisma.player_match_statsWhereInput[];
    NOT?: Prisma.player_match_statsWhereInput | Prisma.player_match_statsWhereInput[];
    id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    match_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    goals?: Prisma.IntFilter<"player_match_stats"> | number;
    assists?: Prisma.IntFilter<"player_match_stats"> | number;
    yellow_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    red_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    minutes_played?: Prisma.IntFilter<"player_match_stats"> | number;
    created_at?: Prisma.DateTimeFilter<"player_match_stats"> | Date | string;
    matches?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    tournament_team_players?: Prisma.XOR<Prisma.Tournament_team_playersScalarRelationFilter, Prisma.tournament_team_playersWhereInput>;
};
export type player_match_statsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    matches?: Prisma.matchesOrderByWithRelationInput;
    tournament_team_players?: Prisma.tournament_team_playersOrderByWithRelationInput;
};
export type player_match_statsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    match_id_player_id?: Prisma.player_match_statsMatch_idPlayer_idCompoundUniqueInput;
    AND?: Prisma.player_match_statsWhereInput | Prisma.player_match_statsWhereInput[];
    OR?: Prisma.player_match_statsWhereInput[];
    NOT?: Prisma.player_match_statsWhereInput | Prisma.player_match_statsWhereInput[];
    match_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    goals?: Prisma.IntFilter<"player_match_stats"> | number;
    assists?: Prisma.IntFilter<"player_match_stats"> | number;
    yellow_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    red_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    minutes_played?: Prisma.IntFilter<"player_match_stats"> | number;
    created_at?: Prisma.DateTimeFilter<"player_match_stats"> | Date | string;
    matches?: Prisma.XOR<Prisma.MatchesScalarRelationFilter, Prisma.matchesWhereInput>;
    tournament_team_players?: Prisma.XOR<Prisma.Tournament_team_playersScalarRelationFilter, Prisma.tournament_team_playersWhereInput>;
}, "id" | "match_id_player_id">;
export type player_match_statsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.player_match_statsCountOrderByAggregateInput;
    _avg?: Prisma.player_match_statsAvgOrderByAggregateInput;
    _max?: Prisma.player_match_statsMaxOrderByAggregateInput;
    _min?: Prisma.player_match_statsMinOrderByAggregateInput;
    _sum?: Prisma.player_match_statsSumOrderByAggregateInput;
};
export type player_match_statsScalarWhereWithAggregatesInput = {
    AND?: Prisma.player_match_statsScalarWhereWithAggregatesInput | Prisma.player_match_statsScalarWhereWithAggregatesInput[];
    OR?: Prisma.player_match_statsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.player_match_statsScalarWhereWithAggregatesInput | Prisma.player_match_statsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"player_match_stats"> | bigint | number;
    match_id?: Prisma.BigIntWithAggregatesFilter<"player_match_stats"> | bigint | number;
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"player_match_stats"> | bigint | number;
    team_id?: Prisma.BigIntWithAggregatesFilter<"player_match_stats"> | bigint | number;
    player_id?: Prisma.BigIntWithAggregatesFilter<"player_match_stats"> | bigint | number;
    goals?: Prisma.IntWithAggregatesFilter<"player_match_stats"> | number;
    assists?: Prisma.IntWithAggregatesFilter<"player_match_stats"> | number;
    yellow_cards?: Prisma.IntWithAggregatesFilter<"player_match_stats"> | number;
    red_cards?: Prisma.IntWithAggregatesFilter<"player_match_stats"> | number;
    minutes_played?: Prisma.IntWithAggregatesFilter<"player_match_stats"> | number;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"player_match_stats"> | Date | string;
};
export type player_match_statsCreateInput = {
    id?: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutPlayer_match_statsInput;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutPlayer_match_statsInput;
};
export type player_match_statsUncheckedCreateInput = {
    id?: bigint | number;
    match_id: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutPlayer_match_statsNestedInput;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutPlayer_match_statsNestedInput;
};
export type player_match_statsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsCreateManyInput = {
    id?: bigint | number;
    match_id: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Player_match_statsListRelationFilter = {
    every?: Prisma.player_match_statsWhereInput;
    some?: Prisma.player_match_statsWhereInput;
    none?: Prisma.player_match_statsWhereInput;
};
export type player_match_statsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type player_match_statsMatch_idPlayer_idCompoundUniqueInput = {
    match_id: bigint | number;
    player_id: bigint | number;
};
export type player_match_statsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type player_match_statsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
};
export type player_match_statsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type player_match_statsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type player_match_statsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    match_id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    player_id?: Prisma.SortOrder;
    goals?: Prisma.SortOrder;
    assists?: Prisma.SortOrder;
    yellow_cards?: Prisma.SortOrder;
    red_cards?: Prisma.SortOrder;
    minutes_played?: Prisma.SortOrder;
};
export type player_match_statsCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput> | Prisma.player_match_statsCreateWithoutMatchesInput[] | Prisma.player_match_statsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutMatchesInput | Prisma.player_match_statsCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.player_match_statsCreateManyMatchesInputEnvelope;
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
};
export type player_match_statsUncheckedCreateNestedManyWithoutMatchesInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput> | Prisma.player_match_statsCreateWithoutMatchesInput[] | Prisma.player_match_statsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutMatchesInput | Prisma.player_match_statsCreateOrConnectWithoutMatchesInput[];
    createMany?: Prisma.player_match_statsCreateManyMatchesInputEnvelope;
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
};
export type player_match_statsUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput> | Prisma.player_match_statsCreateWithoutMatchesInput[] | Prisma.player_match_statsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutMatchesInput | Prisma.player_match_statsCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.player_match_statsUpsertWithWhereUniqueWithoutMatchesInput | Prisma.player_match_statsUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.player_match_statsCreateManyMatchesInputEnvelope;
    set?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    disconnect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    delete?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    update?: Prisma.player_match_statsUpdateWithWhereUniqueWithoutMatchesInput | Prisma.player_match_statsUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.player_match_statsUpdateManyWithWhereWithoutMatchesInput | Prisma.player_match_statsUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
};
export type player_match_statsUncheckedUpdateManyWithoutMatchesNestedInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput> | Prisma.player_match_statsCreateWithoutMatchesInput[] | Prisma.player_match_statsUncheckedCreateWithoutMatchesInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutMatchesInput | Prisma.player_match_statsCreateOrConnectWithoutMatchesInput[];
    upsert?: Prisma.player_match_statsUpsertWithWhereUniqueWithoutMatchesInput | Prisma.player_match_statsUpsertWithWhereUniqueWithoutMatchesInput[];
    createMany?: Prisma.player_match_statsCreateManyMatchesInputEnvelope;
    set?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    disconnect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    delete?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    update?: Prisma.player_match_statsUpdateWithWhereUniqueWithoutMatchesInput | Prisma.player_match_statsUpdateWithWhereUniqueWithoutMatchesInput[];
    updateMany?: Prisma.player_match_statsUpdateManyWithWhereWithoutMatchesInput | Prisma.player_match_statsUpdateManyWithWhereWithoutMatchesInput[];
    deleteMany?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type player_match_statsCreateNestedManyWithoutTournament_team_playersInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.player_match_statsCreateWithoutTournament_team_playersInput[] | Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput | Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput[];
    createMany?: Prisma.player_match_statsCreateManyTournament_team_playersInputEnvelope;
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
};
export type player_match_statsUncheckedCreateNestedManyWithoutTournament_team_playersInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.player_match_statsCreateWithoutTournament_team_playersInput[] | Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput | Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput[];
    createMany?: Prisma.player_match_statsCreateManyTournament_team_playersInputEnvelope;
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
};
export type player_match_statsUpdateManyWithoutTournament_team_playersNestedInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.player_match_statsCreateWithoutTournament_team_playersInput[] | Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput | Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput[];
    upsert?: Prisma.player_match_statsUpsertWithWhereUniqueWithoutTournament_team_playersInput | Prisma.player_match_statsUpsertWithWhereUniqueWithoutTournament_team_playersInput[];
    createMany?: Prisma.player_match_statsCreateManyTournament_team_playersInputEnvelope;
    set?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    disconnect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    delete?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    update?: Prisma.player_match_statsUpdateWithWhereUniqueWithoutTournament_team_playersInput | Prisma.player_match_statsUpdateWithWhereUniqueWithoutTournament_team_playersInput[];
    updateMany?: Prisma.player_match_statsUpdateManyWithWhereWithoutTournament_team_playersInput | Prisma.player_match_statsUpdateManyWithWhereWithoutTournament_team_playersInput[];
    deleteMany?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
};
export type player_match_statsUncheckedUpdateManyWithoutTournament_team_playersNestedInput = {
    create?: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput> | Prisma.player_match_statsCreateWithoutTournament_team_playersInput[] | Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput[];
    connectOrCreate?: Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput | Prisma.player_match_statsCreateOrConnectWithoutTournament_team_playersInput[];
    upsert?: Prisma.player_match_statsUpsertWithWhereUniqueWithoutTournament_team_playersInput | Prisma.player_match_statsUpsertWithWhereUniqueWithoutTournament_team_playersInput[];
    createMany?: Prisma.player_match_statsCreateManyTournament_team_playersInputEnvelope;
    set?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    disconnect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    delete?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    connect?: Prisma.player_match_statsWhereUniqueInput | Prisma.player_match_statsWhereUniqueInput[];
    update?: Prisma.player_match_statsUpdateWithWhereUniqueWithoutTournament_team_playersInput | Prisma.player_match_statsUpdateWithWhereUniqueWithoutTournament_team_playersInput[];
    updateMany?: Prisma.player_match_statsUpdateManyWithWhereWithoutTournament_team_playersInput | Prisma.player_match_statsUpdateManyWithWhereWithoutTournament_team_playersInput[];
    deleteMany?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
};
export type player_match_statsCreateWithoutMatchesInput = {
    id?: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
    tournament_team_players: Prisma.tournament_team_playersCreateNestedOneWithoutPlayer_match_statsInput;
};
export type player_match_statsUncheckedCreateWithoutMatchesInput = {
    id?: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsCreateOrConnectWithoutMatchesInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    create: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput>;
};
export type player_match_statsCreateManyMatchesInputEnvelope = {
    data: Prisma.player_match_statsCreateManyMatchesInput | Prisma.player_match_statsCreateManyMatchesInput[];
    skipDuplicates?: boolean;
};
export type player_match_statsUpsertWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    update: Prisma.XOR<Prisma.player_match_statsUpdateWithoutMatchesInput, Prisma.player_match_statsUncheckedUpdateWithoutMatchesInput>;
    create: Prisma.XOR<Prisma.player_match_statsCreateWithoutMatchesInput, Prisma.player_match_statsUncheckedCreateWithoutMatchesInput>;
};
export type player_match_statsUpdateWithWhereUniqueWithoutMatchesInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    data: Prisma.XOR<Prisma.player_match_statsUpdateWithoutMatchesInput, Prisma.player_match_statsUncheckedUpdateWithoutMatchesInput>;
};
export type player_match_statsUpdateManyWithWhereWithoutMatchesInput = {
    where: Prisma.player_match_statsScalarWhereInput;
    data: Prisma.XOR<Prisma.player_match_statsUpdateManyMutationInput, Prisma.player_match_statsUncheckedUpdateManyWithoutMatchesInput>;
};
export type player_match_statsScalarWhereInput = {
    AND?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
    OR?: Prisma.player_match_statsScalarWhereInput[];
    NOT?: Prisma.player_match_statsScalarWhereInput | Prisma.player_match_statsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    match_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    player_id?: Prisma.BigIntFilter<"player_match_stats"> | bigint | number;
    goals?: Prisma.IntFilter<"player_match_stats"> | number;
    assists?: Prisma.IntFilter<"player_match_stats"> | number;
    yellow_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    red_cards?: Prisma.IntFilter<"player_match_stats"> | number;
    minutes_played?: Prisma.IntFilter<"player_match_stats"> | number;
    created_at?: Prisma.DateTimeFilter<"player_match_stats"> | Date | string;
};
export type player_match_statsCreateWithoutTournament_team_playersInput = {
    id?: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
    matches: Prisma.matchesCreateNestedOneWithoutPlayer_match_statsInput;
};
export type player_match_statsUncheckedCreateWithoutTournament_team_playersInput = {
    id?: bigint | number;
    match_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsCreateOrConnectWithoutTournament_team_playersInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    create: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput>;
};
export type player_match_statsCreateManyTournament_team_playersInputEnvelope = {
    data: Prisma.player_match_statsCreateManyTournament_team_playersInput | Prisma.player_match_statsCreateManyTournament_team_playersInput[];
    skipDuplicates?: boolean;
};
export type player_match_statsUpsertWithWhereUniqueWithoutTournament_team_playersInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    update: Prisma.XOR<Prisma.player_match_statsUpdateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedUpdateWithoutTournament_team_playersInput>;
    create: Prisma.XOR<Prisma.player_match_statsCreateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedCreateWithoutTournament_team_playersInput>;
};
export type player_match_statsUpdateWithWhereUniqueWithoutTournament_team_playersInput = {
    where: Prisma.player_match_statsWhereUniqueInput;
    data: Prisma.XOR<Prisma.player_match_statsUpdateWithoutTournament_team_playersInput, Prisma.player_match_statsUncheckedUpdateWithoutTournament_team_playersInput>;
};
export type player_match_statsUpdateManyWithWhereWithoutTournament_team_playersInput = {
    where: Prisma.player_match_statsScalarWhereInput;
    data: Prisma.XOR<Prisma.player_match_statsUpdateManyMutationInput, Prisma.player_match_statsUncheckedUpdateManyWithoutTournament_team_playersInput>;
};
export type player_match_statsCreateManyMatchesInput = {
    id?: bigint | number;
    team_id: bigint | number;
    player_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsUpdateWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_team_players?: Prisma.tournament_team_playersUpdateOneRequiredWithoutPlayer_match_statsNestedInput;
};
export type player_match_statsUncheckedUpdateWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsUncheckedUpdateManyWithoutMatchesInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    player_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsCreateManyTournament_team_playersInput = {
    id?: bigint | number;
    match_id: bigint | number;
    goals?: number;
    assists?: number;
    yellow_cards?: number;
    red_cards?: number;
    minutes_played?: number;
    created_at?: Date | string;
};
export type player_match_statsUpdateWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    matches?: Prisma.matchesUpdateOneRequiredWithoutPlayer_match_statsNestedInput;
};
export type player_match_statsUncheckedUpdateWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsUncheckedUpdateManyWithoutTournament_team_playersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    goals?: Prisma.IntFieldUpdateOperationsInput | number;
    assists?: Prisma.IntFieldUpdateOperationsInput | number;
    yellow_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    red_cards?: Prisma.IntFieldUpdateOperationsInput | number;
    minutes_played?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type player_match_statsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    goals?: boolean;
    assists?: boolean;
    yellow_cards?: boolean;
    red_cards?: boolean;
    minutes_played?: boolean;
    created_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player_match_stats"]>;
export type player_match_statsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    goals?: boolean;
    assists?: boolean;
    yellow_cards?: boolean;
    red_cards?: boolean;
    minutes_played?: boolean;
    created_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player_match_stats"]>;
export type player_match_statsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    match_id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    goals?: boolean;
    assists?: boolean;
    yellow_cards?: boolean;
    red_cards?: boolean;
    minutes_played?: boolean;
    created_at?: boolean;
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["player_match_stats"]>;
export type player_match_statsSelectScalar = {
    id?: boolean;
    match_id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    player_id?: boolean;
    goals?: boolean;
    assists?: boolean;
    yellow_cards?: boolean;
    red_cards?: boolean;
    minutes_played?: boolean;
    created_at?: boolean;
};
export type player_match_statsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "match_id" | "tournament_id" | "team_id" | "player_id" | "goals" | "assists" | "yellow_cards" | "red_cards" | "minutes_played" | "created_at", ExtArgs["result"]["player_match_stats"]>;
export type player_match_statsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
};
export type player_match_statsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
};
export type player_match_statsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    matches?: boolean | Prisma.matchesDefaultArgs<ExtArgs>;
    tournament_team_players?: boolean | Prisma.tournament_team_playersDefaultArgs<ExtArgs>;
};
export type $player_match_statsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "player_match_stats";
    objects: {
        matches: Prisma.$matchesPayload<ExtArgs>;
        tournament_team_players: Prisma.$tournament_team_playersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        match_id: bigint;
        tournament_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
        created_at: Date;
    }, ExtArgs["result"]["player_match_stats"]>;
    composites: {};
};
export type player_match_statsGetPayload<S extends boolean | null | undefined | player_match_statsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload, S>;
export type player_match_statsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<player_match_statsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Player_match_statsCountAggregateInputType | true;
};
export interface player_match_statsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['player_match_stats'];
        meta: {
            name: 'player_match_stats';
        };
    };
    findUnique<T extends player_match_statsFindUniqueArgs>(args: Prisma.SelectSubset<T, player_match_statsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends player_match_statsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, player_match_statsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends player_match_statsFindFirstArgs>(args?: Prisma.SelectSubset<T, player_match_statsFindFirstArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends player_match_statsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, player_match_statsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends player_match_statsFindManyArgs>(args?: Prisma.SelectSubset<T, player_match_statsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends player_match_statsCreateArgs>(args: Prisma.SelectSubset<T, player_match_statsCreateArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends player_match_statsCreateManyArgs>(args?: Prisma.SelectSubset<T, player_match_statsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends player_match_statsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, player_match_statsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends player_match_statsDeleteArgs>(args: Prisma.SelectSubset<T, player_match_statsDeleteArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends player_match_statsUpdateArgs>(args: Prisma.SelectSubset<T, player_match_statsUpdateArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends player_match_statsDeleteManyArgs>(args?: Prisma.SelectSubset<T, player_match_statsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends player_match_statsUpdateManyArgs>(args: Prisma.SelectSubset<T, player_match_statsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends player_match_statsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, player_match_statsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends player_match_statsUpsertArgs>(args: Prisma.SelectSubset<T, player_match_statsUpsertArgs<ExtArgs>>): Prisma.Prisma__player_match_statsClient<runtime.Types.Result.GetResult<Prisma.$player_match_statsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends player_match_statsCountArgs>(args?: Prisma.Subset<T, player_match_statsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Player_match_statsCountAggregateOutputType> : number>;
    aggregate<T extends Player_match_statsAggregateArgs>(args: Prisma.Subset<T, Player_match_statsAggregateArgs>): Prisma.PrismaPromise<GetPlayer_match_statsAggregateType<T>>;
    groupBy<T extends player_match_statsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: player_match_statsGroupByArgs['orderBy'];
    } : {
        orderBy?: player_match_statsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, player_match_statsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayer_match_statsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: player_match_statsFieldRefs;
}
export interface Prisma__player_match_statsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    matches<T extends Prisma.matchesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.matchesDefaultArgs<ExtArgs>>): Prisma.Prisma__matchesClient<runtime.Types.Result.GetResult<Prisma.$matchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_team_players<T extends Prisma.tournament_team_playersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_playersDefaultArgs<ExtArgs>>): Prisma.Prisma__tournament_team_playersClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_playersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface player_match_statsFieldRefs {
    readonly id: Prisma.FieldRef<"player_match_stats", 'BigInt'>;
    readonly match_id: Prisma.FieldRef<"player_match_stats", 'BigInt'>;
    readonly tournament_id: Prisma.FieldRef<"player_match_stats", 'BigInt'>;
    readonly team_id: Prisma.FieldRef<"player_match_stats", 'BigInt'>;
    readonly player_id: Prisma.FieldRef<"player_match_stats", 'BigInt'>;
    readonly goals: Prisma.FieldRef<"player_match_stats", 'Int'>;
    readonly assists: Prisma.FieldRef<"player_match_stats", 'Int'>;
    readonly yellow_cards: Prisma.FieldRef<"player_match_stats", 'Int'>;
    readonly red_cards: Prisma.FieldRef<"player_match_stats", 'Int'>;
    readonly minutes_played: Prisma.FieldRef<"player_match_stats", 'Int'>;
    readonly created_at: Prisma.FieldRef<"player_match_stats", 'DateTime'>;
}
export type player_match_statsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    where: Prisma.player_match_statsWhereUniqueInput;
};
export type player_match_statsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    where: Prisma.player_match_statsWhereUniqueInput;
};
export type player_match_statsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type player_match_statsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type player_match_statsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type player_match_statsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.player_match_statsCreateInput, Prisma.player_match_statsUncheckedCreateInput>;
};
export type player_match_statsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.player_match_statsCreateManyInput | Prisma.player_match_statsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type player_match_statsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    data: Prisma.player_match_statsCreateManyInput | Prisma.player_match_statsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.player_match_statsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type player_match_statsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.player_match_statsUpdateInput, Prisma.player_match_statsUncheckedUpdateInput>;
    where: Prisma.player_match_statsWhereUniqueInput;
};
export type player_match_statsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.player_match_statsUpdateManyMutationInput, Prisma.player_match_statsUncheckedUpdateManyInput>;
    where?: Prisma.player_match_statsWhereInput;
    limit?: number;
};
export type player_match_statsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.player_match_statsUpdateManyMutationInput, Prisma.player_match_statsUncheckedUpdateManyInput>;
    where?: Prisma.player_match_statsWhereInput;
    limit?: number;
    include?: Prisma.player_match_statsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type player_match_statsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    where: Prisma.player_match_statsWhereUniqueInput;
    create: Prisma.XOR<Prisma.player_match_statsCreateInput, Prisma.player_match_statsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.player_match_statsUpdateInput, Prisma.player_match_statsUncheckedUpdateInput>;
};
export type player_match_statsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
    where: Prisma.player_match_statsWhereUniqueInput;
};
export type player_match_statsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.player_match_statsWhereInput;
    limit?: number;
};
export type player_match_statsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.player_match_statsSelect<ExtArgs> | null;
    omit?: Prisma.player_match_statsOmit<ExtArgs> | null;
    include?: Prisma.player_match_statsInclude<ExtArgs> | null;
};
