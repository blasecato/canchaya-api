export const USER_GENDERS = [
  'male',
  'female',
  'non_binary',
  'prefer_not_to_say',
] as const;

export type UserGender = (typeof USER_GENDERS)[number];

export const USER_GENDER_LABELS: Record<UserGender, string> = {
  male: 'Masculino',
  female: 'Femenino',
  non_binary: 'No binario',
  prefer_not_to_say: 'Prefiere no indicarlo',
};
