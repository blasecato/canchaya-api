ALTER TABLE public.disciplinary_actions
  ADD COLUMN IF NOT EXISTS review_started_by bigint,
  ADD COLUMN IF NOT EXISTS review_started_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS appeal_deadline timestamp with time zone,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE public.disciplinary_actions
  DROP CONSTRAINT IF EXISTS disciplinary_actions_decision_check,
  DROP CONSTRAINT IF EXISTS disciplinary_actions_decision_user_check,
  DROP CONSTRAINT IF EXISTS disciplinary_actions_review_started_by_fkey;

ALTER TABLE public.disciplinary_actions
  ADD CONSTRAINT disciplinary_actions_decision_check
    CHECK (decision_status IN ('reported', 'under_review', 'approved', 'dismissed')),
  ADD CONSTRAINT disciplinary_actions_decision_user_check
    CHECK (
      decision_status IN ('reported', 'under_review')
      OR (decided_by IS NOT NULL AND decided_at IS NOT NULL)
    ),
  ADD CONSTRAINT disciplinary_actions_review_started_by_fkey
    FOREIGN KEY (review_started_by) REFERENCES public.users(id) ON DELETE RESTRICT;

ALTER TABLE public.fines
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE public.suspensions
  ADD COLUMN IF NOT EXISTS served_matches integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS completed_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE public.suspensions
  DROP CONSTRAINT IF EXISTS suspensions_served_matches_check;

ALTER TABLE public.suspensions
  ADD CONSTRAINT suspensions_served_matches_check
    CHECK (
      served_matches >= 0
      AND (matches_count IS NULL OR served_matches <= matches_count)
    );

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS block_source_action_id bigint;

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_block_source_action_fkey;

ALTER TABLE public.users
  ADD CONSTRAINT users_block_source_action_fkey
    FOREIGN KEY (block_source_action_id)
    REFERENCES public.disciplinary_actions(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.disciplinary_appeals (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  disciplinary_action_id bigint NOT NULL UNIQUE,
  player_id bigint NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  reviewed_by bigint,
  reviewed_at timestamp with time zone,
  resolution_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT disciplinary_appeals_action_fkey
    FOREIGN KEY (disciplinary_action_id)
    REFERENCES public.disciplinary_actions(id) ON DELETE CASCADE,
  CONSTRAINT disciplinary_appeals_player_fkey
    FOREIGN KEY (player_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT disciplinary_appeals_reviewer_fkey
    FOREIGN KEY (reviewed_by) REFERENCES public.users(id) ON DELETE RESTRICT,
  CONSTRAINT disciplinary_appeals_status_check
    CHECK (status IN ('pending', 'accepted', 'rejected')),
  CONSTRAINT disciplinary_appeals_resolution_check
    CHECK (
      status = 'pending'
      OR (reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS public.disciplinary_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  disciplinary_action_id bigint NOT NULL,
  actor_user_id bigint NOT NULL,
  event_type text NOT NULL,
  message text,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT disciplinary_events_action_fkey
    FOREIGN KEY (disciplinary_action_id)
    REFERENCES public.disciplinary_actions(id) ON DELETE CASCADE,
  CONSTRAINT disciplinary_events_actor_fkey
    FOREIGN KEY (actor_user_id) REFERENCES public.users(id) ON DELETE RESTRICT,
  CONSTRAINT disciplinary_events_type_check
    CHECK (event_type IN (
      'reported', 'review_started', 'approved', 'dismissed',
      'suspension_created', 'fine_created', 'account_blocked',
      'appealed', 'appeal_accepted', 'appeal_rejected',
      'suspension_served', 'suspension_revoked',
      'fine_paid', 'fine_waived', 'fine_cancelled', 'account_unblocked'
    ))
);

CREATE INDEX IF NOT EXISTS disciplinary_actions_reviewer_idx
  ON public.disciplinary_actions (review_started_by);

CREATE INDEX IF NOT EXISTS users_block_source_action_idx
  ON public.users (block_source_action_id);

CREATE INDEX IF NOT EXISTS disciplinary_appeals_player_status_idx
  ON public.disciplinary_appeals (player_id, status);

CREATE INDEX IF NOT EXISTS disciplinary_appeals_status_idx
  ON public.disciplinary_appeals (status, created_at);

CREATE INDEX IF NOT EXISTS disciplinary_appeals_reviewer_idx
  ON public.disciplinary_appeals (reviewed_by);

CREATE INDEX IF NOT EXISTS disciplinary_events_action_idx
  ON public.disciplinary_events (disciplinary_action_id, created_at);

CREATE INDEX IF NOT EXISTS disciplinary_events_actor_idx
  ON public.disciplinary_events (actor_user_id);

CREATE INDEX IF NOT EXISTS disciplinary_events_type_idx
  ON public.disciplinary_events (event_type, created_at);

UPDATE public.disciplinary_actions
SET appeal_deadline = decided_at + interval '3 days'
WHERE decision_status = 'approved'
  AND decided_at IS NOT NULL
  AND appeal_deadline IS NULL;

INSERT INTO public.disciplinary_events (
  disciplinary_action_id,
  actor_user_id,
  event_type,
  message,
  created_at
)
SELECT
  action.id,
  COALESCE(action.decided_by, action.reported_by),
  CASE action.decision_status
    WHEN 'approved' THEN 'approved'
    WHEN 'dismissed' THEN 'dismissed'
    ELSE 'reported'
  END,
  'Evento inicial migrado desde el registro disciplinario existente.',
  COALESCE(action.decided_at, action.created_at)
FROM public.disciplinary_actions action
WHERE NOT EXISTS (
  SELECT 1
  FROM public.disciplinary_events event
  WHERE event.disciplinary_action_id = action.id
);
