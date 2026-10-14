-- El torneo nace con inscripciones abiertas y ya no existe la fase de
-- validación: de Inscripciones se pasa directamente a Programado.

-- Los torneos en borrador quedan abiertos a inscripciones; los que estaban en
-- validación ya tenían su organización lista, así que pasan a programado.
UPDATE public.tournaments SET phase = 'registration' WHERE phase = 'draft';
UPDATE public.tournaments SET phase = 'scheduled' WHERE phase = 'validation';

ALTER TABLE public.tournaments
  ALTER COLUMN phase SET DEFAULT 'registration';

ALTER TABLE public.tournaments
  DROP CONSTRAINT IF EXISTS tournaments_phase_check;

ALTER TABLE public.tournaments
  ADD CONSTRAINT tournaments_phase_check
  CHECK (
    phase IN (
      'registration',
      'scheduled',
      'in_progress',
      'finished',
      'archived',
      'cancelled'
    )
  );

-- El historial conserva lo ocurrido: las fases retiradas siguen siendo valores
-- válidos para los eventos ya registrados, pero no para los nuevos.
ALTER TABLE public.tournament_lifecycle_events
  DROP CONSTRAINT IF EXISTS tournament_lifecycle_events_from_phase_check;

ALTER TABLE public.tournament_lifecycle_events
  ADD CONSTRAINT tournament_lifecycle_events_from_phase_check
  CHECK (
    from_phase IS NULL OR from_phase IN (
      'draft', 'registration', 'validation', 'scheduled',
      'in_progress', 'finished', 'archived', 'cancelled'
    )
  );
