ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 120;

ALTER TABLE public.matches
  DROP CONSTRAINT IF EXISTS matches_duration_minutes_check;

ALTER TABLE public.matches
  ADD CONSTRAINT matches_duration_minutes_check
  CHECK (duration_minutes BETWEEN 15 AND 1440);

ALTER TABLE public.match_referees
  ADD COLUMN IF NOT EXISTS assigned_by bigint,
  ADD COLUMN IF NOT EXISTS responded_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS response_notes text,
  ADD COLUMN IF NOT EXISTS replaced_referee_id bigint,
  ADD COLUMN IF NOT EXISTS replacement_reason text,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE public.match_referees
  DROP CONSTRAINT IF EXISTS match_referees_status_check;

UPDATE public.match_referees
SET assignment_status = CASE assignment_status
  WHEN 'declined' THEN 'rejected'
  WHEN 'assigned' THEN 'accepted'
  WHEN 'confirmed' THEN 'accepted'
  WHEN 'completed' THEN 'accepted'
  ELSE assignment_status
END;

ALTER TABLE public.match_referees
  ALTER COLUMN assignment_status SET DEFAULT 'pending';

ALTER TABLE public.match_referees
  DROP CONSTRAINT IF EXISTS match_referees_assigned_by_fkey,
  DROP CONSTRAINT IF EXISTS match_referees_replaced_referee_fkey;

ALTER TABLE public.match_referees
  ADD CONSTRAINT match_referees_status_check
    CHECK (assignment_status IN ('pending', 'accepted', 'rejected', 'replaced', 'cancelled')),
  ADD CONSTRAINT match_referees_assigned_by_fkey
    FOREIGN KEY (assigned_by) REFERENCES public.users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT match_referees_replaced_referee_fkey
    FOREIGN KEY (replaced_referee_id) REFERENCES public.users(id) ON DELETE RESTRICT;

DROP INDEX IF EXISTS public.match_referees_one_main_uk;

CREATE UNIQUE INDEX match_referees_one_main_uk
  ON public.match_referees (match_id)
  WHERE referee_role = 'main'
    AND assignment_status IN ('pending', 'accepted');

CREATE INDEX match_referees_status_idx
  ON public.match_referees (assignment_status);

CREATE INDEX match_referees_assigned_by_idx
  ON public.match_referees (assigned_by);

CREATE TABLE public.referee_availability (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  referee_id bigint NOT NULL,
  starts_at timestamp with time zone NOT NULL,
  ends_at timestamp with time zone NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT referee_availability_referee_fkey
    FOREIGN KEY (referee_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT referee_availability_range_check CHECK (ends_at > starts_at),
  CONSTRAINT referee_availability_status_check CHECK (status IN ('active', 'cancelled'))
);

CREATE INDEX referee_availability_schedule_idx
  ON public.referee_availability (referee_id, starts_at, ends_at);

CREATE INDEX referee_availability_status_idx
  ON public.referee_availability (status, ends_at);

CREATE TABLE public.referee_assignment_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  match_id bigint NOT NULL,
  referee_id bigint NOT NULL,
  actor_user_id bigint NOT NULL,
  event_type text NOT NULL,
  previous_status text,
  new_status text NOT NULL,
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT referee_assignment_events_assignment_fkey
    FOREIGN KEY (match_id, referee_id)
    REFERENCES public.match_referees(match_id, referee_id) ON DELETE CASCADE,
  CONSTRAINT referee_assignment_events_match_fkey
    FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE,
  CONSTRAINT referee_assignment_events_actor_fkey
    FOREIGN KEY (actor_user_id) REFERENCES public.users(id) ON DELETE RESTRICT,
  CONSTRAINT referee_assignment_events_type_check
    CHECK (event_type IN ('assigned', 'accepted', 'rejected', 'replaced', 'cancelled', 'rescheduled')),
  CONSTRAINT referee_assignment_events_status_check
    CHECK (new_status IN ('pending', 'accepted', 'rejected', 'replaced', 'cancelled'))
);

CREATE INDEX referee_assignment_events_match_idx
  ON public.referee_assignment_events (match_id, created_at);

CREATE INDEX referee_assignment_events_referee_idx
  ON public.referee_assignment_events (referee_id, created_at);

CREATE INDEX referee_assignment_events_actor_idx
  ON public.referee_assignment_events (actor_user_id);

INSERT INTO public.referee_availability (referee_id, starts_at, ends_at, notes)
SELECT DISTINCT
  mr.referee_id,
  m.match_date,
  m.match_date + make_interval(mins => m.duration_minutes),
  'Disponibilidad migrada desde una asignación existente.'
FROM public.match_referees mr
JOIN public.matches m
  ON m.id = mr.match_id
 AND m.tournament_id = mr.tournament_id
WHERE mr.assignment_status = 'accepted'
  AND m.match_date IS NOT NULL
  AND m.match_date >= now();

INSERT INTO public.referee_assignment_events (
  match_id,
  referee_id,
  actor_user_id,
  event_type,
  previous_status,
  new_status,
  reason,
  created_at
)
SELECT
  mr.match_id,
  mr.referee_id,
  mr.referee_id,
  CASE mr.assignment_status
    WHEN 'rejected' THEN 'rejected'
    WHEN 'cancelled' THEN 'cancelled'
    ELSE 'accepted'
  END,
  NULL,
  mr.assignment_status,
  'Asignación existente migrada al flujo de gestión arbitral.',
  mr.created_at
FROM public.match_referees mr;
