BEGIN;

ALTER TABLE public.tournament_team_registrations
  DROP CONSTRAINT IF EXISTS tournament_team_registrations_status_check;

ALTER TABLE public.tournament_team_registrations
  ADD CONSTRAINT tournament_team_registrations_status_check
  CHECK (request_status IN (
    'pending', 'changes_requested', 'approved', 'rejected', 'withdrawn'
  ));

CREATE TABLE IF NOT EXISTS public.notifications (
  id bigserial PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  entity_type text,
  entity_id text,
  metadata jsonb,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT notifications_type_check CHECK (
    type IN ('tournament_registration', 'tournament', 'match', 'system')
  )
);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx
  ON public.notifications (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_unread_idx
  ON public.notifications (user_id, read_at, created_at DESC);

CREATE TABLE IF NOT EXISTS public.tournament_registration_events (
  id bigserial PRIMARY KEY,
  tournament_id bigint NOT NULL,
  team_id bigint NOT NULL,
  actor_user_id bigint NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  event_type text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tournament_registration_events_registration_fkey
    FOREIGN KEY (tournament_id, team_id)
    REFERENCES public.tournament_team_registrations(tournament_id, team_id)
    ON DELETE CASCADE,
  CONSTRAINT tournament_registration_events_type_check CHECK (
    event_type IN (
      'submitted', 'changes_requested', 'resubmitted',
      'approved', 'rejected', 'withdrawn'
    )
  )
);

CREATE INDEX IF NOT EXISTS tournament_registration_events_registration_idx
  ON public.tournament_registration_events
  (tournament_id, team_id, created_at ASC);

COMMIT;
