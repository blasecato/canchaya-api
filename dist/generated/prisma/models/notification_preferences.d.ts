import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type notification_preferencesModel = runtime.Types.Result.DefaultSelection<Prisma.$notification_preferencesPayload>;
export type AggregateNotification_preferences = {
    _count: Notification_preferencesCountAggregateOutputType | null;
    _avg: Notification_preferencesAvgAggregateOutputType | null;
    _sum: Notification_preferencesSumAggregateOutputType | null;
    _min: Notification_preferencesMinAggregateOutputType | null;
    _max: Notification_preferencesMaxAggregateOutputType | null;
};
export type Notification_preferencesAvgAggregateOutputType = {
    user_id: number | null;
    reminder_hours_before: number | null;
};
export type Notification_preferencesSumAggregateOutputType = {
    user_id: bigint | null;
    reminder_hours_before: number | null;
};
export type Notification_preferencesMinAggregateOutputType = {
    user_id: bigint | null;
    match_scheduled_enabled: boolean | null;
    match_updates_enabled: boolean | null;
    match_reminders_enabled: boolean | null;
    reminder_hours_before: number | null;
    email_enabled: boolean | null;
    whatsapp_enabled: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Notification_preferencesMaxAggregateOutputType = {
    user_id: bigint | null;
    match_scheduled_enabled: boolean | null;
    match_updates_enabled: boolean | null;
    match_reminders_enabled: boolean | null;
    reminder_hours_before: number | null;
    email_enabled: boolean | null;
    whatsapp_enabled: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Notification_preferencesCountAggregateOutputType = {
    user_id: number;
    match_scheduled_enabled: number;
    match_updates_enabled: number;
    match_reminders_enabled: number;
    reminder_hours_before: number;
    email_enabled: number;
    whatsapp_enabled: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Notification_preferencesAvgAggregateInputType = {
    user_id?: true;
    reminder_hours_before?: true;
};
export type Notification_preferencesSumAggregateInputType = {
    user_id?: true;
    reminder_hours_before?: true;
};
export type Notification_preferencesMinAggregateInputType = {
    user_id?: true;
    match_scheduled_enabled?: true;
    match_updates_enabled?: true;
    match_reminders_enabled?: true;
    reminder_hours_before?: true;
    email_enabled?: true;
    whatsapp_enabled?: true;
    created_at?: true;
    updated_at?: true;
};
export type Notification_preferencesMaxAggregateInputType = {
    user_id?: true;
    match_scheduled_enabled?: true;
    match_updates_enabled?: true;
    match_reminders_enabled?: true;
    reminder_hours_before?: true;
    email_enabled?: true;
    whatsapp_enabled?: true;
    created_at?: true;
    updated_at?: true;
};
export type Notification_preferencesCountAggregateInputType = {
    user_id?: true;
    match_scheduled_enabled?: true;
    match_updates_enabled?: true;
    match_reminders_enabled?: true;
    reminder_hours_before?: true;
    email_enabled?: true;
    whatsapp_enabled?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Notification_preferencesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notification_preferencesWhereInput;
    orderBy?: Prisma.notification_preferencesOrderByWithRelationInput | Prisma.notification_preferencesOrderByWithRelationInput[];
    cursor?: Prisma.notification_preferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Notification_preferencesCountAggregateInputType;
    _avg?: Notification_preferencesAvgAggregateInputType;
    _sum?: Notification_preferencesSumAggregateInputType;
    _min?: Notification_preferencesMinAggregateInputType;
    _max?: Notification_preferencesMaxAggregateInputType;
};
export type GetNotification_preferencesAggregateType<T extends Notification_preferencesAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification_preferences]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotification_preferences[P]> : Prisma.GetScalarType<T[P], AggregateNotification_preferences[P]>;
};
export type notification_preferencesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notification_preferencesWhereInput;
    orderBy?: Prisma.notification_preferencesOrderByWithAggregationInput | Prisma.notification_preferencesOrderByWithAggregationInput[];
    by: Prisma.Notification_preferencesScalarFieldEnum[] | Prisma.Notification_preferencesScalarFieldEnum;
    having?: Prisma.notification_preferencesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Notification_preferencesCountAggregateInputType | true;
    _avg?: Notification_preferencesAvgAggregateInputType;
    _sum?: Notification_preferencesSumAggregateInputType;
    _min?: Notification_preferencesMinAggregateInputType;
    _max?: Notification_preferencesMaxAggregateInputType;
};
export type Notification_preferencesGroupByOutputType = {
    user_id: bigint;
    match_scheduled_enabled: boolean;
    match_updates_enabled: boolean;
    match_reminders_enabled: boolean;
    reminder_hours_before: number;
    email_enabled: boolean;
    whatsapp_enabled: boolean;
    created_at: Date;
    updated_at: Date;
    _count: Notification_preferencesCountAggregateOutputType | null;
    _avg: Notification_preferencesAvgAggregateOutputType | null;
    _sum: Notification_preferencesSumAggregateOutputType | null;
    _min: Notification_preferencesMinAggregateOutputType | null;
    _max: Notification_preferencesMaxAggregateOutputType | null;
};
export type GetNotification_preferencesGroupByPayload<T extends notification_preferencesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Notification_preferencesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Notification_preferencesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Notification_preferencesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Notification_preferencesGroupByOutputType[P]>;
}>>;
export type notification_preferencesWhereInput = {
    AND?: Prisma.notification_preferencesWhereInput | Prisma.notification_preferencesWhereInput[];
    OR?: Prisma.notification_preferencesWhereInput[];
    NOT?: Prisma.notification_preferencesWhereInput | Prisma.notification_preferencesWhereInput[];
    user_id?: Prisma.BigIntFilter<"notification_preferences"> | bigint | number;
    match_scheduled_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    match_updates_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    match_reminders_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    reminder_hours_before?: Prisma.IntFilter<"notification_preferences"> | number;
    email_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    whatsapp_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    created_at?: Prisma.DateTimeFilter<"notification_preferences"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"notification_preferences"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type notification_preferencesOrderByWithRelationInput = {
    user_id?: Prisma.SortOrder;
    match_scheduled_enabled?: Prisma.SortOrder;
    match_updates_enabled?: Prisma.SortOrder;
    match_reminders_enabled?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
    email_enabled?: Prisma.SortOrder;
    whatsapp_enabled?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type notification_preferencesWhereUniqueInput = Prisma.AtLeast<{
    user_id?: bigint | number;
    AND?: Prisma.notification_preferencesWhereInput | Prisma.notification_preferencesWhereInput[];
    OR?: Prisma.notification_preferencesWhereInput[];
    NOT?: Prisma.notification_preferencesWhereInput | Prisma.notification_preferencesWhereInput[];
    match_scheduled_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    match_updates_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    match_reminders_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    reminder_hours_before?: Prisma.IntFilter<"notification_preferences"> | number;
    email_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    whatsapp_enabled?: Prisma.BoolFilter<"notification_preferences"> | boolean;
    created_at?: Prisma.DateTimeFilter<"notification_preferences"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"notification_preferences"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "user_id">;
export type notification_preferencesOrderByWithAggregationInput = {
    user_id?: Prisma.SortOrder;
    match_scheduled_enabled?: Prisma.SortOrder;
    match_updates_enabled?: Prisma.SortOrder;
    match_reminders_enabled?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
    email_enabled?: Prisma.SortOrder;
    whatsapp_enabled?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.notification_preferencesCountOrderByAggregateInput;
    _avg?: Prisma.notification_preferencesAvgOrderByAggregateInput;
    _max?: Prisma.notification_preferencesMaxOrderByAggregateInput;
    _min?: Prisma.notification_preferencesMinOrderByAggregateInput;
    _sum?: Prisma.notification_preferencesSumOrderByAggregateInput;
};
export type notification_preferencesScalarWhereWithAggregatesInput = {
    AND?: Prisma.notification_preferencesScalarWhereWithAggregatesInput | Prisma.notification_preferencesScalarWhereWithAggregatesInput[];
    OR?: Prisma.notification_preferencesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.notification_preferencesScalarWhereWithAggregatesInput | Prisma.notification_preferencesScalarWhereWithAggregatesInput[];
    user_id?: Prisma.BigIntWithAggregatesFilter<"notification_preferences"> | bigint | number;
    match_scheduled_enabled?: Prisma.BoolWithAggregatesFilter<"notification_preferences"> | boolean;
    match_updates_enabled?: Prisma.BoolWithAggregatesFilter<"notification_preferences"> | boolean;
    match_reminders_enabled?: Prisma.BoolWithAggregatesFilter<"notification_preferences"> | boolean;
    reminder_hours_before?: Prisma.IntWithAggregatesFilter<"notification_preferences"> | number;
    email_enabled?: Prisma.BoolWithAggregatesFilter<"notification_preferences"> | boolean;
    whatsapp_enabled?: Prisma.BoolWithAggregatesFilter<"notification_preferences"> | boolean;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"notification_preferences"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"notification_preferences"> | Date | string;
};
export type notification_preferencesCreateInput = {
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: number;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutNotification_preferencesInput;
};
export type notification_preferencesUncheckedCreateInput = {
    user_id: bigint | number;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: number;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type notification_preferencesUpdateInput = {
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutNotification_preferencesNestedInput;
};
export type notification_preferencesUncheckedUpdateInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notification_preferencesCreateManyInput = {
    user_id: bigint | number;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: number;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type notification_preferencesUpdateManyMutationInput = {
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notification_preferencesUncheckedUpdateManyInput = {
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notification_preferencesCountOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    match_scheduled_enabled?: Prisma.SortOrder;
    match_updates_enabled?: Prisma.SortOrder;
    match_reminders_enabled?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
    email_enabled?: Prisma.SortOrder;
    whatsapp_enabled?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type notification_preferencesAvgOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
};
export type notification_preferencesMaxOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    match_scheduled_enabled?: Prisma.SortOrder;
    match_updates_enabled?: Prisma.SortOrder;
    match_reminders_enabled?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
    email_enabled?: Prisma.SortOrder;
    whatsapp_enabled?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type notification_preferencesMinOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    match_scheduled_enabled?: Prisma.SortOrder;
    match_updates_enabled?: Prisma.SortOrder;
    match_reminders_enabled?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
    email_enabled?: Prisma.SortOrder;
    whatsapp_enabled?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type notification_preferencesSumOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    reminder_hours_before?: Prisma.SortOrder;
};
export type Notification_preferencesNullableScalarRelationFilter = {
    is?: Prisma.notification_preferencesWhereInput | null;
    isNot?: Prisma.notification_preferencesWhereInput | null;
};
export type notification_preferencesCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.notification_preferencesCreateOrConnectWithoutUsersInput;
    connect?: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesUncheckedCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.notification_preferencesCreateOrConnectWithoutUsersInput;
    connect?: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.notification_preferencesCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.notification_preferencesUpsertWithoutUsersInput;
    disconnect?: Prisma.notification_preferencesWhereInput | boolean;
    delete?: Prisma.notification_preferencesWhereInput | boolean;
    connect?: Prisma.notification_preferencesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.notification_preferencesUpdateToOneWithWhereWithoutUsersInput, Prisma.notification_preferencesUpdateWithoutUsersInput>, Prisma.notification_preferencesUncheckedUpdateWithoutUsersInput>;
};
export type notification_preferencesUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.notification_preferencesCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.notification_preferencesUpsertWithoutUsersInput;
    disconnect?: Prisma.notification_preferencesWhereInput | boolean;
    delete?: Prisma.notification_preferencesWhereInput | boolean;
    connect?: Prisma.notification_preferencesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.notification_preferencesUpdateToOneWithWhereWithoutUsersInput, Prisma.notification_preferencesUpdateWithoutUsersInput>, Prisma.notification_preferencesUncheckedUpdateWithoutUsersInput>;
};
export type notification_preferencesCreateWithoutUsersInput = {
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: number;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type notification_preferencesUncheckedCreateWithoutUsersInput = {
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: number;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type notification_preferencesCreateOrConnectWithoutUsersInput = {
    where: Prisma.notification_preferencesWhereUniqueInput;
    create: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
};
export type notification_preferencesUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.notification_preferencesUpdateWithoutUsersInput, Prisma.notification_preferencesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.notification_preferencesCreateWithoutUsersInput, Prisma.notification_preferencesUncheckedCreateWithoutUsersInput>;
    where?: Prisma.notification_preferencesWhereInput;
};
export type notification_preferencesUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.notification_preferencesWhereInput;
    data: Prisma.XOR<Prisma.notification_preferencesUpdateWithoutUsersInput, Prisma.notification_preferencesUncheckedUpdateWithoutUsersInput>;
};
export type notification_preferencesUpdateWithoutUsersInput = {
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notification_preferencesUncheckedUpdateWithoutUsersInput = {
    match_scheduled_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_updates_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    match_reminders_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminder_hours_before?: Prisma.IntFieldUpdateOperationsInput | number;
    email_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    whatsapp_enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notification_preferencesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: boolean;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification_preferences"]>;
export type notification_preferencesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: boolean;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification_preferences"]>;
export type notification_preferencesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: boolean;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification_preferences"]>;
export type notification_preferencesSelectScalar = {
    user_id?: boolean;
    match_scheduled_enabled?: boolean;
    match_updates_enabled?: boolean;
    match_reminders_enabled?: boolean;
    reminder_hours_before?: boolean;
    email_enabled?: boolean;
    whatsapp_enabled?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type notification_preferencesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"user_id" | "match_scheduled_enabled" | "match_updates_enabled" | "match_reminders_enabled" | "reminder_hours_before" | "email_enabled" | "whatsapp_enabled" | "created_at" | "updated_at", ExtArgs["result"]["notification_preferences"]>;
export type notification_preferencesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type notification_preferencesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type notification_preferencesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $notification_preferencesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "notification_preferences";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        user_id: bigint;
        match_scheduled_enabled: boolean;
        match_updates_enabled: boolean;
        match_reminders_enabled: boolean;
        reminder_hours_before: number;
        email_enabled: boolean;
        whatsapp_enabled: boolean;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["notification_preferences"]>;
    composites: {};
};
export type notification_preferencesGetPayload<S extends boolean | null | undefined | notification_preferencesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload, S>;
export type notification_preferencesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<notification_preferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Notification_preferencesCountAggregateInputType | true;
};
export interface notification_preferencesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['notification_preferences'];
        meta: {
            name: 'notification_preferences';
        };
    };
    findUnique<T extends notification_preferencesFindUniqueArgs>(args: Prisma.SelectSubset<T, notification_preferencesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends notification_preferencesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, notification_preferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends notification_preferencesFindFirstArgs>(args?: Prisma.SelectSubset<T, notification_preferencesFindFirstArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends notification_preferencesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, notification_preferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends notification_preferencesFindManyArgs>(args?: Prisma.SelectSubset<T, notification_preferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends notification_preferencesCreateArgs>(args: Prisma.SelectSubset<T, notification_preferencesCreateArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends notification_preferencesCreateManyArgs>(args?: Prisma.SelectSubset<T, notification_preferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends notification_preferencesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, notification_preferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends notification_preferencesDeleteArgs>(args: Prisma.SelectSubset<T, notification_preferencesDeleteArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends notification_preferencesUpdateArgs>(args: Prisma.SelectSubset<T, notification_preferencesUpdateArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends notification_preferencesDeleteManyArgs>(args?: Prisma.SelectSubset<T, notification_preferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends notification_preferencesUpdateManyArgs>(args: Prisma.SelectSubset<T, notification_preferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends notification_preferencesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, notification_preferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends notification_preferencesUpsertArgs>(args: Prisma.SelectSubset<T, notification_preferencesUpsertArgs<ExtArgs>>): Prisma.Prisma__notification_preferencesClient<runtime.Types.Result.GetResult<Prisma.$notification_preferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends notification_preferencesCountArgs>(args?: Prisma.Subset<T, notification_preferencesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Notification_preferencesCountAggregateOutputType> : number>;
    aggregate<T extends Notification_preferencesAggregateArgs>(args: Prisma.Subset<T, Notification_preferencesAggregateArgs>): Prisma.PrismaPromise<GetNotification_preferencesAggregateType<T>>;
    groupBy<T extends notification_preferencesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: notification_preferencesGroupByArgs['orderBy'];
    } : {
        orderBy?: notification_preferencesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, notification_preferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotification_preferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: notification_preferencesFieldRefs;
}
export interface Prisma__notification_preferencesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface notification_preferencesFieldRefs {
    readonly user_id: Prisma.FieldRef<"notification_preferences", 'BigInt'>;
    readonly match_scheduled_enabled: Prisma.FieldRef<"notification_preferences", 'Boolean'>;
    readonly match_updates_enabled: Prisma.FieldRef<"notification_preferences", 'Boolean'>;
    readonly match_reminders_enabled: Prisma.FieldRef<"notification_preferences", 'Boolean'>;
    readonly reminder_hours_before: Prisma.FieldRef<"notification_preferences", 'Int'>;
    readonly email_enabled: Prisma.FieldRef<"notification_preferences", 'Boolean'>;
    readonly whatsapp_enabled: Prisma.FieldRef<"notification_preferences", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"notification_preferences", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"notification_preferences", 'DateTime'>;
}
export type notification_preferencesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where?: Prisma.notification_preferencesWhereInput;
    orderBy?: Prisma.notification_preferencesOrderByWithRelationInput | Prisma.notification_preferencesOrderByWithRelationInput[];
    cursor?: Prisma.notification_preferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notification_preferencesScalarFieldEnum | Prisma.Notification_preferencesScalarFieldEnum[];
};
export type notification_preferencesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where?: Prisma.notification_preferencesWhereInput;
    orderBy?: Prisma.notification_preferencesOrderByWithRelationInput | Prisma.notification_preferencesOrderByWithRelationInput[];
    cursor?: Prisma.notification_preferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notification_preferencesScalarFieldEnum | Prisma.Notification_preferencesScalarFieldEnum[];
};
export type notification_preferencesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where?: Prisma.notification_preferencesWhereInput;
    orderBy?: Prisma.notification_preferencesOrderByWithRelationInput | Prisma.notification_preferencesOrderByWithRelationInput[];
    cursor?: Prisma.notification_preferencesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notification_preferencesScalarFieldEnum | Prisma.Notification_preferencesScalarFieldEnum[];
};
export type notification_preferencesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notification_preferencesCreateInput, Prisma.notification_preferencesUncheckedCreateInput>;
};
export type notification_preferencesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.notification_preferencesCreateManyInput | Prisma.notification_preferencesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notification_preferencesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    data: Prisma.notification_preferencesCreateManyInput | Prisma.notification_preferencesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.notification_preferencesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type notification_preferencesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notification_preferencesUpdateInput, Prisma.notification_preferencesUncheckedUpdateInput>;
    where: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.notification_preferencesUpdateManyMutationInput, Prisma.notification_preferencesUncheckedUpdateManyInput>;
    where?: Prisma.notification_preferencesWhereInput;
    limit?: number;
};
export type notification_preferencesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notification_preferencesUpdateManyMutationInput, Prisma.notification_preferencesUncheckedUpdateManyInput>;
    where?: Prisma.notification_preferencesWhereInput;
    limit?: number;
    include?: Prisma.notification_preferencesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type notification_preferencesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where: Prisma.notification_preferencesWhereUniqueInput;
    create: Prisma.XOR<Prisma.notification_preferencesCreateInput, Prisma.notification_preferencesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.notification_preferencesUpdateInput, Prisma.notification_preferencesUncheckedUpdateInput>;
};
export type notification_preferencesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
    where: Prisma.notification_preferencesWhereUniqueInput;
};
export type notification_preferencesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notification_preferencesWhereInput;
    limit?: number;
};
export type notification_preferencesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notification_preferencesSelect<ExtArgs> | null;
    omit?: Prisma.notification_preferencesOmit<ExtArgs> | null;
    include?: Prisma.notification_preferencesInclude<ExtArgs> | null;
};
