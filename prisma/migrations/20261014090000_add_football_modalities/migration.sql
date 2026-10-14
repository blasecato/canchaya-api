-- Se habilitan las modalidades intermedias: Fútbol 6, 8, 9 y 10.
ALTER TABLE public.teams
  DROP CONSTRAINT IF EXISTS teams_football_modality_check;

ALTER TABLE public.teams
  ADD CONSTRAINT teams_football_modality_check
    CHECK (modality IN (
      'Fútbol 5',
      'Fútbol 6',
      'Fútbol 7',
      'Fútbol 8',
      'Fútbol 9',
      'Fútbol 10',
      'Fútbol 11'
    ));

ALTER TABLE public.tournaments
  DROP CONSTRAINT IF EXISTS tournaments_football_modality_check;

ALTER TABLE public.tournaments
  ADD CONSTRAINT tournaments_football_modality_check
    CHECK (modality IN (
      'Fútbol 5',
      'Fútbol 6',
      'Fútbol 7',
      'Fútbol 8',
      'Fútbol 9',
      'Fútbol 10',
      'Fútbol 11'
    ));
