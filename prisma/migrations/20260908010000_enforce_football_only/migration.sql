BEGIN;

-- Convierte las posiciones propias de otros deportes antes de normalizar los
-- equipos. El dorsal se utiliza para asignar una posición inicial coherente.
UPDATE public.tournament_team_players AS roster
SET position = CASE
  WHEN roster.jersey_number = 1 THEN 'Portero'
  WHEN roster.jersey_number BETWEEN 2 AND 4 THEN 'Defensa'
  WHEN roster.jersey_number BETWEEN 5 AND 6 THEN 'Mediocampista'
  ELSE 'Delantero'
END
FROM public.teams AS team
WHERE roster.team_id = team.id
  AND lower(team.sport_type) NOT IN ('fútbol', 'futbol', 'football');

-- Los nombres que mencionaban explícitamente otro deporte se convierten a
-- nombres de clubes de fútbol. Los nombres neutros se conservan.
UPDATE public.teams
SET name = CASE name
    WHEN 'Halcones Basket' THEN 'Halcones FC'
    WHEN 'Cóndores Basket' THEN 'Cóndores Fútbol 5'
    WHEN 'Cafeteros Basket' THEN 'Cafeteros FC'
    WHEN 'Vóley Pitalito' THEN 'Pitalito FC'
    WHEN 'Amazonas Vóley' THEN 'Amazonas FC'
    WHEN 'Titanes Vóley' THEN 'Titanes Pitalito FC'
    WHEN 'Estrellas Vóley' THEN 'Estrellas CanchaYa FC'
    WHEN 'Fénix Vóley Club' THEN 'Fénix FC'
    WHEN 'Dunas Vóley' THEN 'Dunas FC'
    ELSE regexp_replace(
      regexp_replace(
        name,
        '(baloncesto|basketball|basket|voleibol|volleyball|volley|vóley|voley)',
        'FC',
        'gi'
      ),
      '[[:space:]]+',
      ' ',
      'g'
    )
  END,
  sport_type = 'Fútbol',
  modality = CASE
    WHEN modality ~* '11' THEN 'Fútbol 11'
    WHEN modality ~* '7' THEN 'Fútbol 7'
    ELSE 'Fútbol 5'
  END,
  updated_at = CURRENT_TIMESTAMP;

UPDATE public.tournaments
SET name = CASE name
    WHEN 'Copa Mixta de Baloncesto' THEN 'Copa Mixta de Fútbol 5'
    WHEN 'Copa Halcones 5x5' THEN 'Copa Halcones Fútbol 5'
    WHEN 'Liga Regional de Voleibol' THEN 'Liga Regional de Fútbol 5'
    WHEN 'Copa Arena Vóley Playa' THEN 'Copa Arena Fútbol 5'
    WHEN 'Torneo Formativo de Baloncesto' THEN 'Torneo Formativo de Fútbol 5'
    WHEN 'Liga CanchaYa de Voleibol' THEN 'Liga CanchaYa de Fútbol 5'
    ELSE regexp_replace(
      name,
      '(baloncesto|basketball|basket|voleibol|volleyball|volley|vóley|voley)',
      'Fútbol 5',
      'gi'
    )
  END,
  description = CASE
    WHEN description IS NULL THEN NULL
    ELSE regexp_replace(
      regexp_replace(
        description,
        '(baloncesto|basketball|basket|voleibol|volleyball|volley|vóley|voley)',
        'fútbol cinco',
        'gi'
      ),
      'fútbol cinco en sala|fútbol cinco playa',
      'fútbol cinco',
      'gi'
    )
  END,
  photo_url = CASE
    WHEN photo_url IS NULL THEN NULL
    ELSE regexp_replace(
      photo_url,
      '(Baloncesto|Basketball|Basket|Voleibol|Volleyball|Volley|Voley)(\+Playa)?',
      'Futbol+5',
      'gi'
    )
  END,
  sport_type = 'Fútbol',
  modality = CASE
    WHEN modality ~* '11' THEN 'Fútbol 11'
    WHEN modality ~* '7' THEN 'Fútbol 7'
    ELSE 'Fútbol 5'
  END,
  updated_at = CURRENT_TIMESTAMP;

ALTER TABLE public.teams
  DROP CONSTRAINT IF EXISTS teams_football_only_check,
  DROP CONSTRAINT IF EXISTS teams_football_modality_check;

ALTER TABLE public.teams
  ADD CONSTRAINT teams_football_only_check
    CHECK (sport_type = 'Fútbol'),
  ADD CONSTRAINT teams_football_modality_check
    CHECK (modality IN ('Fútbol 5', 'Fútbol 7', 'Fútbol 11'));

ALTER TABLE public.tournaments
  DROP CONSTRAINT IF EXISTS tournaments_football_only_check,
  DROP CONSTRAINT IF EXISTS tournaments_football_modality_check;

ALTER TABLE public.tournaments
  ADD CONSTRAINT tournaments_football_only_check
    CHECK (sport_type = 'Fútbol'),
  ADD CONSTRAINT tournaments_football_modality_check
    CHECK (modality IN ('Fútbol 5', 'Fútbol 7', 'Fútbol 11'));

COMMIT;
