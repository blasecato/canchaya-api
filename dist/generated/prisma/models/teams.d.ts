import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type teamsModel = runtime.Types.Result.DefaultSelection<Prisma.$teamsPayload>;
export type AggregateTeams = {
    _count: TeamsCountAggregateOutputType | null;
    _avg: TeamsAvgAggregateOutputType | null;
    _sum: TeamsSumAggregateOutputType | null;
    _min: TeamsMinAggregateOutputType | null;
    _max: TeamsMaxAggregateOutputType | null;
};
export type TeamsAvgAggregateOutputType = {
    id: number | null;
    captain_user_id: number | null;
    created_by: number | null;
};
export type TeamsSumAggregateOutputType = {
    id: bigint | null;
    captain_user_id: bigint | null;
    created_by: bigint | null;
};
export type TeamsMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    sport_type: string | null;
    modality: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    captain_user_id: bigint | null;
    created_by: bigint | null;
    photo_url: string | null;
    photo_public_id: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type TeamsMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    sport_type: string | null;
    modality: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    captain_user_id: bigint | null;
    created_by: bigint | null;
    photo_url: string | null;
    photo_public_id: string | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type TeamsCountAggregateOutputType = {
    id: number;
    name: number;
    sport_type: number;
    modality: number;
    primary_color: number;
    secondary_color: number;
    captain_user_id: number;
    created_by: number;
    photo_url: number;
    photo_public_id: number;
    status: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type TeamsAvgAggregateInputType = {
    id?: true;
    captain_user_id?: true;
    created_by?: true;
};
export type TeamsSumAggregateInputType = {
    id?: true;
    captain_user_id?: true;
    created_by?: true;
};
export type TeamsMinAggregateInputType = {
    id?: true;
    name?: true;
    sport_type?: true;
    modality?: true;
    primary_color?: true;
    secondary_color?: true;
    captain_user_id?: true;
    created_by?: true;
    photo_url?: true;
    photo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type TeamsMaxAggregateInputType = {
    id?: true;
    name?: true;
    sport_type?: true;
    modality?: true;
    primary_color?: true;
    secondary_color?: true;
    captain_user_id?: true;
    created_by?: true;
    photo_url?: true;
    photo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
};
export type TeamsCountAggregateInputType = {
    id?: true;
    name?: true;
    sport_type?: true;
    modality?: true;
    primary_color?: true;
    secondary_color?: true;
    captain_user_id?: true;
    created_by?: true;
    photo_url?: true;
    photo_public_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type TeamsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teamsWhereInput;
    orderBy?: Prisma.teamsOrderByWithRelationInput | Prisma.teamsOrderByWithRelationInput[];
    cursor?: Prisma.teamsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TeamsCountAggregateInputType;
    _avg?: TeamsAvgAggregateInputType;
    _sum?: TeamsSumAggregateInputType;
    _min?: TeamsMinAggregateInputType;
    _max?: TeamsMaxAggregateInputType;
};
export type GetTeamsAggregateType<T extends TeamsAggregateArgs> = {
    [P in keyof T & keyof AggregateTeams]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTeams[P]> : Prisma.GetScalarType<T[P], AggregateTeams[P]>;
};
export type teamsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teamsWhereInput;
    orderBy?: Prisma.teamsOrderByWithAggregationInput | Prisma.teamsOrderByWithAggregationInput[];
    by: Prisma.TeamsScalarFieldEnum[] | Prisma.TeamsScalarFieldEnum;
    having?: Prisma.teamsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TeamsCountAggregateInputType | true;
    _avg?: TeamsAvgAggregateInputType;
    _sum?: TeamsSumAggregateInputType;
    _min?: TeamsMinAggregateInputType;
    _max?: TeamsMaxAggregateInputType;
};
export type TeamsGroupByOutputType = {
    id: bigint;
    name: string;
    sport_type: string;
    modality: string;
    primary_color: string | null;
    secondary_color: string | null;
    captain_user_id: bigint;
    created_by: bigint;
    photo_url: string | null;
    photo_public_id: string | null;
    status: string;
    created_at: Date;
    updated_at: Date;
    _count: TeamsCountAggregateOutputType | null;
    _avg: TeamsAvgAggregateOutputType | null;
    _sum: TeamsSumAggregateOutputType | null;
    _min: TeamsMinAggregateOutputType | null;
    _max: TeamsMaxAggregateOutputType | null;
};
export type GetTeamsGroupByPayload<T extends teamsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TeamsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TeamsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TeamsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TeamsGroupByOutputType[P]>;
}>>;
export type teamsWhereInput = {
    AND?: Prisma.teamsWhereInput | Prisma.teamsWhereInput[];
    OR?: Prisma.teamsWhereInput[];
    NOT?: Prisma.teamsWhereInput | Prisma.teamsWhereInput[];
    id?: Prisma.BigIntFilter<"teams"> | bigint | number;
    name?: Prisma.StringFilter<"teams"> | string;
    sport_type?: Prisma.StringFilter<"teams"> | string;
    modality?: Prisma.StringFilter<"teams"> | string;
    primary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    secondary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    captain_user_id?: Prisma.BigIntFilter<"teams"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"teams"> | bigint | number;
    photo_url?: Prisma.StringNullableFilter<"teams"> | string | null;
    photo_public_id?: Prisma.StringNullableFilter<"teams"> | string | null;
    status?: Prisma.StringFilter<"teams"> | string;
    created_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
    team_members?: Prisma.Team_membersListRelationFilter;
    users_teams_captain_user_idTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    users_teams_created_byTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_registrations?: Prisma.Tournament_team_registrationsListRelationFilter;
};
export type teamsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sport_type?: Prisma.SortOrder;
    modality?: Prisma.SortOrder;
    primary_color?: Prisma.SortOrderInput | Prisma.SortOrder;
    secondary_color?: Prisma.SortOrderInput | Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    photo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    photo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    team_members?: Prisma.team_membersOrderByRelationAggregateInput;
    users_teams_captain_user_idTousers?: Prisma.usersOrderByWithRelationInput;
    users_teams_created_byTousers?: Prisma.usersOrderByWithRelationInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsOrderByRelationAggregateInput;
};
export type teamsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.teamsWhereInput | Prisma.teamsWhereInput[];
    OR?: Prisma.teamsWhereInput[];
    NOT?: Prisma.teamsWhereInput | Prisma.teamsWhereInput[];
    name?: Prisma.StringFilter<"teams"> | string;
    sport_type?: Prisma.StringFilter<"teams"> | string;
    modality?: Prisma.StringFilter<"teams"> | string;
    primary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    secondary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    captain_user_id?: Prisma.BigIntFilter<"teams"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"teams"> | bigint | number;
    photo_url?: Prisma.StringNullableFilter<"teams"> | string | null;
    photo_public_id?: Prisma.StringNullableFilter<"teams"> | string | null;
    status?: Prisma.StringFilter<"teams"> | string;
    created_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
    team_members?: Prisma.Team_membersListRelationFilter;
    users_teams_captain_user_idTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    users_teams_created_byTousers?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    tournament_team_registrations?: Prisma.Tournament_team_registrationsListRelationFilter;
}, "id">;
export type teamsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sport_type?: Prisma.SortOrder;
    modality?: Prisma.SortOrder;
    primary_color?: Prisma.SortOrderInput | Prisma.SortOrder;
    secondary_color?: Prisma.SortOrderInput | Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    photo_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    photo_public_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.teamsCountOrderByAggregateInput;
    _avg?: Prisma.teamsAvgOrderByAggregateInput;
    _max?: Prisma.teamsMaxOrderByAggregateInput;
    _min?: Prisma.teamsMinOrderByAggregateInput;
    _sum?: Prisma.teamsSumOrderByAggregateInput;
};
export type teamsScalarWhereWithAggregatesInput = {
    AND?: Prisma.teamsScalarWhereWithAggregatesInput | Prisma.teamsScalarWhereWithAggregatesInput[];
    OR?: Prisma.teamsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.teamsScalarWhereWithAggregatesInput | Prisma.teamsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"teams"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"teams"> | string;
    sport_type?: Prisma.StringWithAggregatesFilter<"teams"> | string;
    modality?: Prisma.StringWithAggregatesFilter<"teams"> | string;
    primary_color?: Prisma.StringNullableWithAggregatesFilter<"teams"> | string | null;
    secondary_color?: Prisma.StringNullableWithAggregatesFilter<"teams"> | string | null;
    captain_user_id?: Prisma.BigIntWithAggregatesFilter<"teams"> | bigint | number;
    created_by?: Prisma.BigIntWithAggregatesFilter<"teams"> | bigint | number;
    photo_url?: Prisma.StringNullableWithAggregatesFilter<"teams"> | string | null;
    photo_public_id?: Prisma.StringNullableWithAggregatesFilter<"teams"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"teams"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"teams"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"teams"> | Date | string;
};
export type teamsCreateInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersCreateNestedManyWithoutTeamsInput;
    users_teams_captain_user_idTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_captain_user_idTousersInput;
    users_teams_created_byTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_created_byTousersInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsCreateNestedManyWithoutTeamsInput;
};
export type teamsUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersUncheckedCreateNestedManyWithoutTeamsInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedCreateNestedManyWithoutTeamsInput;
};
export type teamsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUpdateManyWithoutTeamsNestedInput;
    users_teams_captain_user_idTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_captain_user_idTousersNestedInput;
    users_teams_created_byTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_created_byTousersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedUpdateManyWithoutTeamsNestedInput;
};
export type teamsCreateManyInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type teamsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type teamsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeamsScalarRelationFilter = {
    is?: Prisma.teamsWhereInput;
    isNot?: Prisma.teamsWhereInput;
};
export type teamsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sport_type?: Prisma.SortOrder;
    modality?: Prisma.SortOrder;
    primary_color?: Prisma.SortOrder;
    secondary_color?: Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    photo_url?: Prisma.SortOrder;
    photo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teamsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type teamsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sport_type?: Prisma.SortOrder;
    modality?: Prisma.SortOrder;
    primary_color?: Prisma.SortOrder;
    secondary_color?: Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    photo_url?: Prisma.SortOrder;
    photo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teamsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    sport_type?: Prisma.SortOrder;
    modality?: Prisma.SortOrder;
    primary_color?: Prisma.SortOrder;
    secondary_color?: Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    photo_url?: Prisma.SortOrder;
    photo_public_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teamsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    captain_user_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type TeamsListRelationFilter = {
    every?: Prisma.teamsWhereInput;
    some?: Prisma.teamsWhereInput;
    none?: Prisma.teamsWhereInput;
};
export type teamsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type teamsCreateNestedOneWithoutTeam_membersInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutTeam_membersInput, Prisma.teamsUncheckedCreateWithoutTeam_membersInput>;
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutTeam_membersInput;
    connect?: Prisma.teamsWhereUniqueInput;
};
export type teamsUpdateOneRequiredWithoutTeam_membersNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutTeam_membersInput, Prisma.teamsUncheckedCreateWithoutTeam_membersInput>;
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutTeam_membersInput;
    upsert?: Prisma.teamsUpsertWithoutTeam_membersInput;
    connect?: Prisma.teamsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.teamsUpdateToOneWithWhereWithoutTeam_membersInput, Prisma.teamsUpdateWithoutTeam_membersInput>, Prisma.teamsUncheckedUpdateWithoutTeam_membersInput>;
};
export type teamsCreateNestedOneWithoutTournament_team_registrationsInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedCreateWithoutTournament_team_registrationsInput>;
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutTournament_team_registrationsInput;
    connect?: Prisma.teamsWhereUniqueInput;
};
export type teamsUpdateOneRequiredWithoutTournament_team_registrationsNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedCreateWithoutTournament_team_registrationsInput>;
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutTournament_team_registrationsInput;
    upsert?: Prisma.teamsUpsertWithoutTournament_team_registrationsInput;
    connect?: Prisma.teamsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.teamsUpdateToOneWithWhereWithoutTournament_team_registrationsInput, Prisma.teamsUpdateWithoutTournament_team_registrationsInput>, Prisma.teamsUncheckedUpdateWithoutTournament_team_registrationsInput>;
};
export type teamsCreateNestedManyWithoutUsers_teams_captain_user_idTousersInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput> | Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInputEnvelope;
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
};
export type teamsCreateNestedManyWithoutUsers_teams_created_byTousersInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput> | Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_created_byTousersInputEnvelope;
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
};
export type teamsUncheckedCreateNestedManyWithoutUsers_teams_captain_user_idTousersInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput> | Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInputEnvelope;
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
};
export type teamsUncheckedCreateNestedManyWithoutUsers_teams_created_byTousersInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput> | Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_created_byTousersInputEnvelope;
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
};
export type teamsUpdateManyWithoutUsers_teams_captain_user_idTousersNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput> | Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput[];
    upsert?: Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInputEnvelope;
    set?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    disconnect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    delete?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    update?: Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput[];
    updateMany?: Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_captain_user_idTousersInput[];
    deleteMany?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
};
export type teamsUpdateManyWithoutUsers_teams_created_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput> | Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput[];
    upsert?: Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_created_byTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_created_byTousersInputEnvelope;
    set?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    disconnect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    delete?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    update?: Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_created_byTousersInput[];
    updateMany?: Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_created_byTousersInput[];
    deleteMany?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
};
export type teamsUncheckedUpdateManyWithoutUsers_teams_captain_user_idTousersNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput> | Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput[];
    upsert?: Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInputEnvelope;
    set?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    disconnect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    delete?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    update?: Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput[];
    updateMany?: Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_captain_user_idTousersInput | Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_captain_user_idTousersInput[];
    deleteMany?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
};
export type teamsUncheckedUpdateManyWithoutUsers_teams_created_byTousersNestedInput = {
    create?: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput> | Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput[] | Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput[];
    connectOrCreate?: Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput | Prisma.teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput[];
    upsert?: Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpsertWithWhereUniqueWithoutUsers_teams_created_byTousersInput[];
    createMany?: Prisma.teamsCreateManyUsers_teams_created_byTousersInputEnvelope;
    set?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    disconnect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    delete?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    connect?: Prisma.teamsWhereUniqueInput | Prisma.teamsWhereUniqueInput[];
    update?: Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpdateWithWhereUniqueWithoutUsers_teams_created_byTousersInput[];
    updateMany?: Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_created_byTousersInput | Prisma.teamsUpdateManyWithWhereWithoutUsers_teams_created_byTousersInput[];
    deleteMany?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
};
export type teamsCreateWithoutTeam_membersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    users_teams_captain_user_idTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_captain_user_idTousersInput;
    users_teams_created_byTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_created_byTousersInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsCreateNestedManyWithoutTeamsInput;
};
export type teamsUncheckedCreateWithoutTeam_membersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedCreateNestedManyWithoutTeamsInput;
};
export type teamsCreateOrConnectWithoutTeam_membersInput = {
    where: Prisma.teamsWhereUniqueInput;
    create: Prisma.XOR<Prisma.teamsCreateWithoutTeam_membersInput, Prisma.teamsUncheckedCreateWithoutTeam_membersInput>;
};
export type teamsUpsertWithoutTeam_membersInput = {
    update: Prisma.XOR<Prisma.teamsUpdateWithoutTeam_membersInput, Prisma.teamsUncheckedUpdateWithoutTeam_membersInput>;
    create: Prisma.XOR<Prisma.teamsCreateWithoutTeam_membersInput, Prisma.teamsUncheckedCreateWithoutTeam_membersInput>;
    where?: Prisma.teamsWhereInput;
};
export type teamsUpdateToOneWithWhereWithoutTeam_membersInput = {
    where?: Prisma.teamsWhereInput;
    data: Prisma.XOR<Prisma.teamsUpdateWithoutTeam_membersInput, Prisma.teamsUncheckedUpdateWithoutTeam_membersInput>;
};
export type teamsUpdateWithoutTeam_membersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users_teams_captain_user_idTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_captain_user_idTousersNestedInput;
    users_teams_created_byTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_created_byTousersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateWithoutTeam_membersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedUpdateManyWithoutTeamsNestedInput;
};
export type teamsCreateWithoutTournament_team_registrationsInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersCreateNestedManyWithoutTeamsInput;
    users_teams_captain_user_idTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_captain_user_idTousersInput;
    users_teams_created_byTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_created_byTousersInput;
};
export type teamsUncheckedCreateWithoutTournament_team_registrationsInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersUncheckedCreateNestedManyWithoutTeamsInput;
};
export type teamsCreateOrConnectWithoutTournament_team_registrationsInput = {
    where: Prisma.teamsWhereUniqueInput;
    create: Prisma.XOR<Prisma.teamsCreateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedCreateWithoutTournament_team_registrationsInput>;
};
export type teamsUpsertWithoutTournament_team_registrationsInput = {
    update: Prisma.XOR<Prisma.teamsUpdateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedUpdateWithoutTournament_team_registrationsInput>;
    create: Prisma.XOR<Prisma.teamsCreateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedCreateWithoutTournament_team_registrationsInput>;
    where?: Prisma.teamsWhereInput;
};
export type teamsUpdateToOneWithWhereWithoutTournament_team_registrationsInput = {
    where?: Prisma.teamsWhereInput;
    data: Prisma.XOR<Prisma.teamsUpdateWithoutTournament_team_registrationsInput, Prisma.teamsUncheckedUpdateWithoutTournament_team_registrationsInput>;
};
export type teamsUpdateWithoutTournament_team_registrationsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUpdateManyWithoutTeamsNestedInput;
    users_teams_captain_user_idTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_captain_user_idTousersNestedInput;
    users_teams_created_byTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_created_byTousersNestedInput;
};
export type teamsUncheckedUpdateWithoutTournament_team_registrationsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput;
};
export type teamsCreateWithoutUsers_teams_captain_user_idTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersCreateNestedManyWithoutTeamsInput;
    users_teams_created_byTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_created_byTousersInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsCreateNestedManyWithoutTeamsInput;
};
export type teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersUncheckedCreateNestedManyWithoutTeamsInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedCreateNestedManyWithoutTeamsInput;
};
export type teamsCreateOrConnectWithoutUsers_teams_captain_user_idTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    create: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput>;
};
export type teamsCreateManyUsers_teams_captain_user_idTousersInputEnvelope = {
    data: Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInput | Prisma.teamsCreateManyUsers_teams_captain_user_idTousersInput[];
    skipDuplicates?: boolean;
};
export type teamsCreateWithoutUsers_teams_created_byTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersCreateNestedManyWithoutTeamsInput;
    users_teams_captain_user_idTousers: Prisma.usersCreateNestedOneWithoutTeams_teams_captain_user_idTousersInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsCreateNestedManyWithoutTeamsInput;
};
export type teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    team_members?: Prisma.team_membersUncheckedCreateNestedManyWithoutTeamsInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedCreateNestedManyWithoutTeamsInput;
};
export type teamsCreateOrConnectWithoutUsers_teams_created_byTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    create: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput>;
};
export type teamsCreateManyUsers_teams_created_byTousersInputEnvelope = {
    data: Prisma.teamsCreateManyUsers_teams_created_byTousersInput | Prisma.teamsCreateManyUsers_teams_created_byTousersInput[];
    skipDuplicates?: boolean;
};
export type teamsUpsertWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    update: Prisma.XOR<Prisma.teamsUpdateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedUpdateWithoutUsers_teams_captain_user_idTousersInput>;
    create: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_captain_user_idTousersInput>;
};
export type teamsUpdateWithWhereUniqueWithoutUsers_teams_captain_user_idTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    data: Prisma.XOR<Prisma.teamsUpdateWithoutUsers_teams_captain_user_idTousersInput, Prisma.teamsUncheckedUpdateWithoutUsers_teams_captain_user_idTousersInput>;
};
export type teamsUpdateManyWithWhereWithoutUsers_teams_captain_user_idTousersInput = {
    where: Prisma.teamsScalarWhereInput;
    data: Prisma.XOR<Prisma.teamsUpdateManyMutationInput, Prisma.teamsUncheckedUpdateManyWithoutUsers_teams_captain_user_idTousersInput>;
};
export type teamsScalarWhereInput = {
    AND?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
    OR?: Prisma.teamsScalarWhereInput[];
    NOT?: Prisma.teamsScalarWhereInput | Prisma.teamsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"teams"> | bigint | number;
    name?: Prisma.StringFilter<"teams"> | string;
    sport_type?: Prisma.StringFilter<"teams"> | string;
    modality?: Prisma.StringFilter<"teams"> | string;
    primary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    secondary_color?: Prisma.StringNullableFilter<"teams"> | string | null;
    captain_user_id?: Prisma.BigIntFilter<"teams"> | bigint | number;
    created_by?: Prisma.BigIntFilter<"teams"> | bigint | number;
    photo_url?: Prisma.StringNullableFilter<"teams"> | string | null;
    photo_public_id?: Prisma.StringNullableFilter<"teams"> | string | null;
    status?: Prisma.StringFilter<"teams"> | string;
    created_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"teams"> | Date | string;
};
export type teamsUpsertWithWhereUniqueWithoutUsers_teams_created_byTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    update: Prisma.XOR<Prisma.teamsUpdateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedUpdateWithoutUsers_teams_created_byTousersInput>;
    create: Prisma.XOR<Prisma.teamsCreateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedCreateWithoutUsers_teams_created_byTousersInput>;
};
export type teamsUpdateWithWhereUniqueWithoutUsers_teams_created_byTousersInput = {
    where: Prisma.teamsWhereUniqueInput;
    data: Prisma.XOR<Prisma.teamsUpdateWithoutUsers_teams_created_byTousersInput, Prisma.teamsUncheckedUpdateWithoutUsers_teams_created_byTousersInput>;
};
export type teamsUpdateManyWithWhereWithoutUsers_teams_created_byTousersInput = {
    where: Prisma.teamsScalarWhereInput;
    data: Prisma.XOR<Prisma.teamsUpdateManyMutationInput, Prisma.teamsUncheckedUpdateManyWithoutUsers_teams_created_byTousersInput>;
};
export type teamsCreateManyUsers_teams_captain_user_idTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    created_by: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type teamsCreateManyUsers_teams_created_byTousersInput = {
    id?: bigint | number;
    name: string;
    sport_type: string;
    modality: string;
    primary_color?: string | null;
    secondary_color?: string | null;
    captain_user_id: bigint | number;
    photo_url?: string | null;
    photo_public_id?: string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type teamsUpdateWithoutUsers_teams_captain_user_idTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUpdateManyWithoutTeamsNestedInput;
    users_teams_created_byTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_created_byTousersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateWithoutUsers_teams_captain_user_idTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateManyWithoutUsers_teams_captain_user_idTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_by?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type teamsUpdateWithoutUsers_teams_created_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUpdateManyWithoutTeamsNestedInput;
    users_teams_captain_user_idTousers?: Prisma.usersUpdateOneRequiredWithoutTeams_teams_captain_user_idTousersNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateWithoutUsers_teams_created_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team_members?: Prisma.team_membersUncheckedUpdateManyWithoutTeamsNestedInput;
    tournament_team_registrations?: Prisma.tournament_team_registrationsUncheckedUpdateManyWithoutTeamsNestedInput;
};
export type teamsUncheckedUpdateManyWithoutUsers_teams_created_byTousersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sport_type?: Prisma.StringFieldUpdateOperationsInput | string;
    modality?: Prisma.StringFieldUpdateOperationsInput | string;
    primary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secondary_color?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    captain_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    photo_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photo_public_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeamsCountOutputType = {
    team_members: number;
    tournament_team_registrations: number;
};
export type TeamsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team_members?: boolean | TeamsCountOutputTypeCountTeam_membersArgs;
    tournament_team_registrations?: boolean | TeamsCountOutputTypeCountTournament_team_registrationsArgs;
};
export type TeamsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamsCountOutputTypeSelect<ExtArgs> | null;
};
export type TeamsCountOutputTypeCountTeam_membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.team_membersWhereInput;
};
export type TeamsCountOutputTypeCountTournament_team_registrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_team_registrationsWhereInput;
};
export type teamsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sport_type?: boolean;
    modality?: boolean;
    primary_color?: boolean;
    secondary_color?: boolean;
    captain_user_id?: boolean;
    created_by?: boolean;
    photo_url?: boolean;
    photo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    team_members?: boolean | Prisma.teams$team_membersArgs<ExtArgs>;
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.teams$tournament_team_registrationsArgs<ExtArgs>;
    _count?: boolean | Prisma.TeamsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teams"]>;
export type teamsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sport_type?: boolean;
    modality?: boolean;
    primary_color?: boolean;
    secondary_color?: boolean;
    captain_user_id?: boolean;
    created_by?: boolean;
    photo_url?: boolean;
    photo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teams"]>;
export type teamsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    sport_type?: boolean;
    modality?: boolean;
    primary_color?: boolean;
    secondary_color?: boolean;
    captain_user_id?: boolean;
    created_by?: boolean;
    photo_url?: boolean;
    photo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teams"]>;
export type teamsSelectScalar = {
    id?: boolean;
    name?: boolean;
    sport_type?: boolean;
    modality?: boolean;
    primary_color?: boolean;
    secondary_color?: boolean;
    captain_user_id?: boolean;
    created_by?: boolean;
    photo_url?: boolean;
    photo_public_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type teamsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "sport_type" | "modality" | "primary_color" | "secondary_color" | "captain_user_id" | "created_by" | "photo_url" | "photo_public_id" | "status" | "created_at" | "updated_at", ExtArgs["result"]["teams"]>;
export type teamsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team_members?: boolean | Prisma.teams$team_membersArgs<ExtArgs>;
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    tournament_team_registrations?: boolean | Prisma.teams$tournament_team_registrationsArgs<ExtArgs>;
    _count?: boolean | Prisma.TeamsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type teamsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type teamsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users_teams_captain_user_idTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    users_teams_created_byTousers?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $teamsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "teams";
    objects: {
        team_members: Prisma.$team_membersPayload<ExtArgs>[];
        users_teams_captain_user_idTousers: Prisma.$usersPayload<ExtArgs>;
        users_teams_created_byTousers: Prisma.$usersPayload<ExtArgs>;
        tournament_team_registrations: Prisma.$tournament_team_registrationsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        sport_type: string;
        modality: string;
        primary_color: string | null;
        secondary_color: string | null;
        captain_user_id: bigint;
        created_by: bigint;
        photo_url: string | null;
        photo_public_id: string | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["teams"]>;
    composites: {};
};
export type teamsGetPayload<S extends boolean | null | undefined | teamsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$teamsPayload, S>;
export type teamsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<teamsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TeamsCountAggregateInputType | true;
};
export interface teamsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['teams'];
        meta: {
            name: 'teams';
        };
    };
    findUnique<T extends teamsFindUniqueArgs>(args: Prisma.SelectSubset<T, teamsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends teamsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, teamsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends teamsFindFirstArgs>(args?: Prisma.SelectSubset<T, teamsFindFirstArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends teamsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, teamsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends teamsFindManyArgs>(args?: Prisma.SelectSubset<T, teamsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends teamsCreateArgs>(args: Prisma.SelectSubset<T, teamsCreateArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends teamsCreateManyArgs>(args?: Prisma.SelectSubset<T, teamsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends teamsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, teamsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends teamsDeleteArgs>(args: Prisma.SelectSubset<T, teamsDeleteArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends teamsUpdateArgs>(args: Prisma.SelectSubset<T, teamsUpdateArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends teamsDeleteManyArgs>(args?: Prisma.SelectSubset<T, teamsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends teamsUpdateManyArgs>(args: Prisma.SelectSubset<T, teamsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends teamsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, teamsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends teamsUpsertArgs>(args: Prisma.SelectSubset<T, teamsUpsertArgs<ExtArgs>>): Prisma.Prisma__teamsClient<runtime.Types.Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends teamsCountArgs>(args?: Prisma.Subset<T, teamsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TeamsCountAggregateOutputType> : number>;
    aggregate<T extends TeamsAggregateArgs>(args: Prisma.Subset<T, TeamsAggregateArgs>): Prisma.PrismaPromise<GetTeamsAggregateType<T>>;
    groupBy<T extends teamsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: teamsGroupByArgs['orderBy'];
    } : {
        orderBy?: teamsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, teamsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: teamsFieldRefs;
}
export interface Prisma__teamsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    team_members<T extends Prisma.teams$team_membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.teams$team_membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$team_membersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users_teams_captain_user_idTousers<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users_teams_created_byTousers<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tournament_team_registrations<T extends Prisma.teams$tournament_team_registrationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.teams$tournament_team_registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_team_registrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface teamsFieldRefs {
    readonly id: Prisma.FieldRef<"teams", 'BigInt'>;
    readonly name: Prisma.FieldRef<"teams", 'String'>;
    readonly sport_type: Prisma.FieldRef<"teams", 'String'>;
    readonly modality: Prisma.FieldRef<"teams", 'String'>;
    readonly primary_color: Prisma.FieldRef<"teams", 'String'>;
    readonly secondary_color: Prisma.FieldRef<"teams", 'String'>;
    readonly captain_user_id: Prisma.FieldRef<"teams", 'BigInt'>;
    readonly created_by: Prisma.FieldRef<"teams", 'BigInt'>;
    readonly photo_url: Prisma.FieldRef<"teams", 'String'>;
    readonly photo_public_id: Prisma.FieldRef<"teams", 'String'>;
    readonly status: Prisma.FieldRef<"teams", 'String'>;
    readonly created_at: Prisma.FieldRef<"teams", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"teams", 'DateTime'>;
}
export type teamsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where: Prisma.teamsWhereUniqueInput;
};
export type teamsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where: Prisma.teamsWhereUniqueInput;
};
export type teamsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where?: Prisma.teamsWhereInput;
    orderBy?: Prisma.teamsOrderByWithRelationInput | Prisma.teamsOrderByWithRelationInput[];
    cursor?: Prisma.teamsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamsScalarFieldEnum | Prisma.TeamsScalarFieldEnum[];
};
export type teamsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where?: Prisma.teamsWhereInput;
    orderBy?: Prisma.teamsOrderByWithRelationInput | Prisma.teamsOrderByWithRelationInput[];
    cursor?: Prisma.teamsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamsScalarFieldEnum | Prisma.TeamsScalarFieldEnum[];
};
export type teamsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where?: Prisma.teamsWhereInput;
    orderBy?: Prisma.teamsOrderByWithRelationInput | Prisma.teamsOrderByWithRelationInput[];
    cursor?: Prisma.teamsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamsScalarFieldEnum | Prisma.TeamsScalarFieldEnum[];
};
export type teamsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teamsCreateInput, Prisma.teamsUncheckedCreateInput>;
};
export type teamsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.teamsCreateManyInput | Prisma.teamsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type teamsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    data: Prisma.teamsCreateManyInput | Prisma.teamsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.teamsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type teamsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teamsUpdateInput, Prisma.teamsUncheckedUpdateInput>;
    where: Prisma.teamsWhereUniqueInput;
};
export type teamsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.teamsUpdateManyMutationInput, Prisma.teamsUncheckedUpdateManyInput>;
    where?: Prisma.teamsWhereInput;
    limit?: number;
};
export type teamsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teamsUpdateManyMutationInput, Prisma.teamsUncheckedUpdateManyInput>;
    where?: Prisma.teamsWhereInput;
    limit?: number;
    include?: Prisma.teamsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type teamsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where: Prisma.teamsWhereUniqueInput;
    create: Prisma.XOR<Prisma.teamsCreateInput, Prisma.teamsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.teamsUpdateInput, Prisma.teamsUncheckedUpdateInput>;
};
export type teamsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
    where: Prisma.teamsWhereUniqueInput;
};
export type teamsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teamsWhereInput;
    limit?: number;
};
export type teams$team_membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type teams$tournament_team_registrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_team_registrationsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_team_registrationsOmit<ExtArgs> | null;
    include?: Prisma.tournament_team_registrationsInclude<ExtArgs> | null;
    where?: Prisma.tournament_team_registrationsWhereInput;
    orderBy?: Prisma.tournament_team_registrationsOrderByWithRelationInput | Prisma.tournament_team_registrationsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_team_registrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_team_registrationsScalarFieldEnum | Prisma.Tournament_team_registrationsScalarFieldEnum[];
};
export type teamsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teamsSelect<ExtArgs> | null;
    omit?: Prisma.teamsOmit<ExtArgs> | null;
    include?: Prisma.teamsInclude<ExtArgs> | null;
};
