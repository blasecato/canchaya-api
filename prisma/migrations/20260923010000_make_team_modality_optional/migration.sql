-- La modalidad dejó de pedirse al crear un equipo: un mismo plantel puede jugar
-- Fútbol 5, 7 u 11 según el torneo, así que fijarla al equipo no aportaba nada.
-- La columna se conserva para no perder el dato de los equipos existentes.
ALTER TABLE public.teams
  ALTER COLUMN modality DROP NOT NULL;

ALTER TABLE public.teams
  DROP CONSTRAINT IF EXISTS teams_football_modality_check;

ALTER TABLE public.teams
  ADD CONSTRAINT teams_football_modality_check
  CHECK (
    modality IS NULL
    OR modality IN ('Fútbol 5', 'Fútbol 7', 'Fútbol 11')
  );
