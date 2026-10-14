export const FOOTBALL_SPORT_TYPE = 'Fútbol' as const;

export const FOOTBALL_MODALITIES = [
  'Fútbol 5',
  'Fútbol 6',
  'Fútbol 7',
  'Fútbol 8',
  'Fútbol 9',
  'Fútbol 10',
  'Fútbol 11',
] as const;

export type FootballModality = (typeof FOOTBALL_MODALITIES)[number];
