-- Keep the database constraint aligned with every notification category
-- emitted by the application services.
ALTER TABLE public.notifications
  DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'tournament_registration',
    'tournament',
    'match',
    'system',
    'team',
    'team_roster',
    'association',
    'account',
    'discipline_report',
    'discipline_review',
    'discipline_decision',
    'discipline_appeal',
    'discipline_compliance'
  ));
