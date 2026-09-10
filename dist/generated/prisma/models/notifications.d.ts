import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type notificationsModel = runtime.Types.Result.DefaultSelection<Prisma.$notificationsPayload>;
export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null;
    _avg: NotificationsAvgAggregateOutputType | null;
    _sum: NotificationsSumAggregateOutputType | null;
    _min: NotificationsMinAggregateOutputType | null;
    _max: NotificationsMaxAggregateOutputType | null;
};
export type NotificationsAvgAggregateOutputType = {
    id: number | null;
    user_id: number | null;
};
export type NotificationsSumAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
};
export type NotificationsMinAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    type: string | null;
    event_code: string | null;
    deduplication_key: string | null;
    title: string | null;
    message: string | null;
    entity_type: string | null;
    entity_id: string | null;
    scheduled_for: Date | null;
    read_at: Date | null;
    created_at: Date | null;
};
export type NotificationsMaxAggregateOutputType = {
    id: bigint | null;
    user_id: bigint | null;
    type: string | null;
    event_code: string | null;
    deduplication_key: string | null;
    title: string | null;
    message: string | null;
    entity_type: string | null;
    entity_id: string | null;
    scheduled_for: Date | null;
    read_at: Date | null;
    created_at: Date | null;
};
export type NotificationsCountAggregateOutputType = {
    id: number;
    user_id: number;
    type: number;
    event_code: number;
    deduplication_key: number;
    title: number;
    message: number;
    entity_type: number;
    entity_id: number;
    metadata: number;
    scheduled_for: number;
    read_at: number;
    created_at: number;
    _all: number;
};
export type NotificationsAvgAggregateInputType = {
    id?: true;
    user_id?: true;
};
export type NotificationsSumAggregateInputType = {
    id?: true;
    user_id?: true;
};
export type NotificationsMinAggregateInputType = {
    id?: true;
    user_id?: true;
    type?: true;
    event_code?: true;
    deduplication_key?: true;
    title?: true;
    message?: true;
    entity_type?: true;
    entity_id?: true;
    scheduled_for?: true;
    read_at?: true;
    created_at?: true;
};
export type NotificationsMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    type?: true;
    event_code?: true;
    deduplication_key?: true;
    title?: true;
    message?: true;
    entity_type?: true;
    entity_id?: true;
    scheduled_for?: true;
    read_at?: true;
    created_at?: true;
};
export type NotificationsCountAggregateInputType = {
    id?: true;
    user_id?: true;
    type?: true;
    event_code?: true;
    deduplication_key?: true;
    title?: true;
    message?: true;
    entity_type?: true;
    entity_id?: true;
    metadata?: true;
    scheduled_for?: true;
    read_at?: true;
    created_at?: true;
    _all?: true;
};
export type NotificationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationsCountAggregateInputType;
    _avg?: NotificationsAvgAggregateInputType;
    _sum?: NotificationsSumAggregateInputType;
    _min?: NotificationsMinAggregateInputType;
    _max?: NotificationsMaxAggregateInputType;
};
export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
    [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotifications[P]> : Prisma.GetScalarType<T[P], AggregateNotifications[P]>;
};
export type notificationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithAggregationInput | Prisma.notificationsOrderByWithAggregationInput[];
    by: Prisma.NotificationsScalarFieldEnum[] | Prisma.NotificationsScalarFieldEnum;
    having?: Prisma.notificationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationsCountAggregateInputType | true;
    _avg?: NotificationsAvgAggregateInputType;
    _sum?: NotificationsSumAggregateInputType;
    _min?: NotificationsMinAggregateInputType;
    _max?: NotificationsMaxAggregateInputType;
};
export type NotificationsGroupByOutputType = {
    id: bigint;
    user_id: bigint;
    type: string;
    event_code: string | null;
    deduplication_key: string | null;
    title: string;
    message: string;
    entity_type: string | null;
    entity_id: string | null;
    metadata: runtime.JsonValue | null;
    scheduled_for: Date | null;
    read_at: Date | null;
    created_at: Date;
    _count: NotificationsCountAggregateOutputType | null;
    _avg: NotificationsAvgAggregateOutputType | null;
    _sum: NotificationsSumAggregateOutputType | null;
    _min: NotificationsMinAggregateOutputType | null;
    _max: NotificationsMaxAggregateOutputType | null;
};
export type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationsGroupByOutputType[P]>;
}>>;
export type notificationsWhereInput = {
    AND?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    OR?: Prisma.notificationsWhereInput[];
    NOT?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    id?: Prisma.BigIntFilter<"notifications"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"notifications"> | bigint | number;
    type?: Prisma.StringFilter<"notifications"> | string;
    event_code?: Prisma.StringNullableFilter<"notifications"> | string | null;
    deduplication_key?: Prisma.StringNullableFilter<"notifications"> | string | null;
    title?: Prisma.StringFilter<"notifications"> | string;
    message?: Prisma.StringFilter<"notifications"> | string;
    entity_type?: Prisma.StringNullableFilter<"notifications"> | string | null;
    entity_id?: Prisma.StringNullableFilter<"notifications"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"notifications">;
    scheduled_for?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    read_at?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"notifications"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type notificationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    event_code?: Prisma.SortOrderInput | Prisma.SortOrder;
    deduplication_key?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    entity_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    entity_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduled_for?: Prisma.SortOrderInput | Prisma.SortOrder;
    read_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    user_id_deduplication_key?: Prisma.notificationsUser_idDeduplication_keyCompoundUniqueInput;
    AND?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    OR?: Prisma.notificationsWhereInput[];
    NOT?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    user_id?: Prisma.BigIntFilter<"notifications"> | bigint | number;
    type?: Prisma.StringFilter<"notifications"> | string;
    event_code?: Prisma.StringNullableFilter<"notifications"> | string | null;
    deduplication_key?: Prisma.StringNullableFilter<"notifications"> | string | null;
    title?: Prisma.StringFilter<"notifications"> | string;
    message?: Prisma.StringFilter<"notifications"> | string;
    entity_type?: Prisma.StringNullableFilter<"notifications"> | string | null;
    entity_id?: Prisma.StringNullableFilter<"notifications"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"notifications">;
    scheduled_for?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    read_at?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"notifications"> | Date | string;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "user_id_deduplication_key">;
export type notificationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    event_code?: Prisma.SortOrderInput | Prisma.SortOrder;
    deduplication_key?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    entity_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    entity_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduled_for?: Prisma.SortOrderInput | Prisma.SortOrder;
    read_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.notificationsCountOrderByAggregateInput;
    _avg?: Prisma.notificationsAvgOrderByAggregateInput;
    _max?: Prisma.notificationsMaxOrderByAggregateInput;
    _min?: Prisma.notificationsMinOrderByAggregateInput;
    _sum?: Prisma.notificationsSumOrderByAggregateInput;
};
export type notificationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.notificationsScalarWhereWithAggregatesInput | Prisma.notificationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.notificationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.notificationsScalarWhereWithAggregatesInput | Prisma.notificationsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"notifications"> | bigint | number;
    user_id?: Prisma.BigIntWithAggregatesFilter<"notifications"> | bigint | number;
    type?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    event_code?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    deduplication_key?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    message?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    entity_type?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    entity_id?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"notifications">;
    scheduled_for?: Prisma.DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null;
    read_at?: Prisma.DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"notifications"> | Date | string;
};
export type notificationsCreateInput = {
    id?: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
    users: Prisma.usersCreateNestedOneWithoutNotificationsInput;
};
export type notificationsUncheckedCreateInput = {
    id?: bigint | number;
    user_id: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
};
export type notificationsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.usersUpdateOneRequiredWithoutNotificationsNestedInput;
};
export type notificationsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsCreateManyInput = {
    id?: bigint | number;
    user_id: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
};
export type notificationsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsUser_idDeduplication_keyCompoundUniqueInput = {
    user_id: bigint | number;
    deduplication_key: string;
};
export type notificationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    event_code?: Prisma.SortOrder;
    deduplication_key?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    entity_type?: Prisma.SortOrder;
    entity_id?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    scheduled_for?: Prisma.SortOrder;
    read_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type notificationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    event_code?: Prisma.SortOrder;
    deduplication_key?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    entity_type?: Prisma.SortOrder;
    entity_id?: Prisma.SortOrder;
    scheduled_for?: Prisma.SortOrder;
    read_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    event_code?: Prisma.SortOrder;
    deduplication_key?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    entity_type?: Prisma.SortOrder;
    entity_id?: Prisma.SortOrder;
    scheduled_for?: Prisma.SortOrder;
    read_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type NotificationsListRelationFilter = {
    every?: Prisma.notificationsWhereInput;
    some?: Prisma.notificationsWhereInput;
    none?: Prisma.notificationsWhereInput;
};
export type notificationsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type notificationsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput> | Prisma.notificationsCreateWithoutUsersInput[] | Prisma.notificationsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.notificationsCreateOrConnectWithoutUsersInput | Prisma.notificationsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.notificationsCreateManyUsersInputEnvelope;
    connect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
};
export type notificationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput> | Prisma.notificationsCreateWithoutUsersInput[] | Prisma.notificationsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.notificationsCreateOrConnectWithoutUsersInput | Prisma.notificationsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.notificationsCreateManyUsersInputEnvelope;
    connect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
};
export type notificationsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput> | Prisma.notificationsCreateWithoutUsersInput[] | Prisma.notificationsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.notificationsCreateOrConnectWithoutUsersInput | Prisma.notificationsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.notificationsUpsertWithWhereUniqueWithoutUsersInput | Prisma.notificationsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.notificationsCreateManyUsersInputEnvelope;
    set?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    disconnect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    delete?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    connect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    update?: Prisma.notificationsUpdateWithWhereUniqueWithoutUsersInput | Prisma.notificationsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.notificationsUpdateManyWithWhereWithoutUsersInput | Prisma.notificationsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.notificationsScalarWhereInput | Prisma.notificationsScalarWhereInput[];
};
export type notificationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput> | Prisma.notificationsCreateWithoutUsersInput[] | Prisma.notificationsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.notificationsCreateOrConnectWithoutUsersInput | Prisma.notificationsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.notificationsUpsertWithWhereUniqueWithoutUsersInput | Prisma.notificationsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.notificationsCreateManyUsersInputEnvelope;
    set?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    disconnect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    delete?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    connect?: Prisma.notificationsWhereUniqueInput | Prisma.notificationsWhereUniqueInput[];
    update?: Prisma.notificationsUpdateWithWhereUniqueWithoutUsersInput | Prisma.notificationsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.notificationsUpdateManyWithWhereWithoutUsersInput | Prisma.notificationsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.notificationsScalarWhereInput | Prisma.notificationsScalarWhereInput[];
};
export type notificationsCreateWithoutUsersInput = {
    id?: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
};
export type notificationsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
};
export type notificationsCreateOrConnectWithoutUsersInput = {
    where: Prisma.notificationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput>;
};
export type notificationsCreateManyUsersInputEnvelope = {
    data: Prisma.notificationsCreateManyUsersInput | Prisma.notificationsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type notificationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.notificationsWhereUniqueInput;
    update: Prisma.XOR<Prisma.notificationsUpdateWithoutUsersInput, Prisma.notificationsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.notificationsCreateWithoutUsersInput, Prisma.notificationsUncheckedCreateWithoutUsersInput>;
};
export type notificationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.notificationsWhereUniqueInput;
    data: Prisma.XOR<Prisma.notificationsUpdateWithoutUsersInput, Prisma.notificationsUncheckedUpdateWithoutUsersInput>;
};
export type notificationsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.notificationsScalarWhereInput;
    data: Prisma.XOR<Prisma.notificationsUpdateManyMutationInput, Prisma.notificationsUncheckedUpdateManyWithoutUsersInput>;
};
export type notificationsScalarWhereInput = {
    AND?: Prisma.notificationsScalarWhereInput | Prisma.notificationsScalarWhereInput[];
    OR?: Prisma.notificationsScalarWhereInput[];
    NOT?: Prisma.notificationsScalarWhereInput | Prisma.notificationsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"notifications"> | bigint | number;
    user_id?: Prisma.BigIntFilter<"notifications"> | bigint | number;
    type?: Prisma.StringFilter<"notifications"> | string;
    event_code?: Prisma.StringNullableFilter<"notifications"> | string | null;
    deduplication_key?: Prisma.StringNullableFilter<"notifications"> | string | null;
    title?: Prisma.StringFilter<"notifications"> | string;
    message?: Prisma.StringFilter<"notifications"> | string;
    entity_type?: Prisma.StringNullableFilter<"notifications"> | string | null;
    entity_id?: Prisma.StringNullableFilter<"notifications"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"notifications">;
    scheduled_for?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    read_at?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"notifications"> | Date | string;
};
export type notificationsCreateManyUsersInput = {
    id?: bigint | number;
    type: string;
    event_code?: string | null;
    deduplication_key?: string | null;
    title: string;
    message: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Date | string | null;
    read_at?: Date | string | null;
    created_at?: Date | string;
};
export type notificationsUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    event_code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deduplication_key?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    entity_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    scheduled_for?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    read_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type notificationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    type?: boolean;
    event_code?: boolean;
    deduplication_key?: boolean;
    title?: boolean;
    message?: boolean;
    entity_type?: boolean;
    entity_id?: boolean;
    metadata?: boolean;
    scheduled_for?: boolean;
    read_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    type?: boolean;
    event_code?: boolean;
    deduplication_key?: boolean;
    title?: boolean;
    message?: boolean;
    entity_type?: boolean;
    entity_id?: boolean;
    metadata?: boolean;
    scheduled_for?: boolean;
    read_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    type?: boolean;
    event_code?: boolean;
    deduplication_key?: boolean;
    title?: boolean;
    message?: boolean;
    entity_type?: boolean;
    entity_id?: boolean;
    metadata?: boolean;
    scheduled_for?: boolean;
    read_at?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    type?: boolean;
    event_code?: boolean;
    deduplication_key?: boolean;
    title?: boolean;
    message?: boolean;
    entity_type?: boolean;
    entity_id?: boolean;
    metadata?: boolean;
    scheduled_for?: boolean;
    read_at?: boolean;
    created_at?: boolean;
};
export type notificationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "type" | "event_code" | "deduplication_key" | "title" | "message" | "entity_type" | "entity_id" | "metadata" | "scheduled_for" | "read_at" | "created_at", ExtArgs["result"]["notifications"]>;
export type notificationsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type notificationsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type notificationsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $notificationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "notifications";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        user_id: bigint;
        type: string;
        event_code: string | null;
        deduplication_key: string | null;
        title: string;
        message: string;
        entity_type: string | null;
        entity_id: string | null;
        metadata: runtime.JsonValue | null;
        scheduled_for: Date | null;
        read_at: Date | null;
        created_at: Date;
    }, ExtArgs["result"]["notifications"]>;
    composites: {};
};
export type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$notificationsPayload, S>;
export type notificationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationsCountAggregateInputType | true;
};
export interface notificationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['notifications'];
        meta: {
            name: 'notifications';
        };
    };
    findUnique<T extends notificationsFindUniqueArgs>(args: Prisma.SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends notificationsFindFirstArgs>(args?: Prisma.SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends notificationsFindManyArgs>(args?: Prisma.SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends notificationsCreateArgs>(args: Prisma.SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends notificationsCreateManyArgs>(args?: Prisma.SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends notificationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends notificationsDeleteArgs>(args: Prisma.SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends notificationsUpdateArgs>(args: Prisma.SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends notificationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends notificationsUpdateManyArgs>(args: Prisma.SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends notificationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends notificationsUpsertArgs>(args: Prisma.SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends notificationsCountArgs>(args?: Prisma.Subset<T, notificationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationsCountAggregateOutputType> : number>;
    aggregate<T extends NotificationsAggregateArgs>(args: Prisma.Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>;
    groupBy<T extends notificationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: notificationsGroupByArgs['orderBy'];
    } : {
        orderBy?: notificationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: notificationsFieldRefs;
}
export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface notificationsFieldRefs {
    readonly id: Prisma.FieldRef<"notifications", 'BigInt'>;
    readonly user_id: Prisma.FieldRef<"notifications", 'BigInt'>;
    readonly type: Prisma.FieldRef<"notifications", 'String'>;
    readonly event_code: Prisma.FieldRef<"notifications", 'String'>;
    readonly deduplication_key: Prisma.FieldRef<"notifications", 'String'>;
    readonly title: Prisma.FieldRef<"notifications", 'String'>;
    readonly message: Prisma.FieldRef<"notifications", 'String'>;
    readonly entity_type: Prisma.FieldRef<"notifications", 'String'>;
    readonly entity_id: Prisma.FieldRef<"notifications", 'String'>;
    readonly metadata: Prisma.FieldRef<"notifications", 'Json'>;
    readonly scheduled_for: Prisma.FieldRef<"notifications", 'DateTime'>;
    readonly read_at: Prisma.FieldRef<"notifications", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"notifications", 'DateTime'>;
}
export type notificationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsCreateInput, Prisma.notificationsUncheckedCreateInput>;
};
export type notificationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.notificationsCreateManyInput | Prisma.notificationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notificationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.notificationsCreateManyInput | Prisma.notificationsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.notificationsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type notificationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsUpdateInput, Prisma.notificationsUncheckedUpdateInput>;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.notificationsUpdateManyMutationInput, Prisma.notificationsUncheckedUpdateManyInput>;
    where?: Prisma.notificationsWhereInput;
    limit?: number;
};
export type notificationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsUpdateManyMutationInput, Prisma.notificationsUncheckedUpdateManyInput>;
    where?: Prisma.notificationsWhereInput;
    limit?: number;
    include?: Prisma.notificationsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type notificationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.notificationsCreateInput, Prisma.notificationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.notificationsUpdateInput, Prisma.notificationsUncheckedUpdateInput>;
};
export type notificationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    limit?: number;
};
export type notificationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    include?: Prisma.notificationsInclude<ExtArgs> | null;
};
