-- Team membership operations write notifications in the same transaction.
-- Keep existing types and allow the team notifications emitted by TeamsService.
ALTER TABLE public.notifications
  DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN ('tournament_registration', 'tournament', 'match', 'system', 'team'));
