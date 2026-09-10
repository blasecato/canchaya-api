export const TOURNAMENT_CATEGORY_GENDERS = [
  'open',
  'male',
  'female',
  'mixed',
] as const;

export type TournamentCategoryGender =
  (typeof TOURNAMENT_CATEGORY_GENDERS)[number];

export const TOURNAMENT_CATEGORY_GENDER_LABELS: Record<
  TournamentCategoryGender,
  string
> = {
  open: 'Abierta',
  male: 'Masculina',
  female: 'Femenina',
  mixed: 'Mixta',
};
