ALTER TABLE public.tournament_team_registrations
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS amount_paid numeric(14, 2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_notes text,
  ADD COLUMN IF NOT EXISTS payment_updated_by bigint,
  ADD COLUMN IF NOT EXISTS payment_updated_at timestamp with time zone;

ALTER TABLE public.tournament_team_registrations
  DROP CONSTRAINT IF EXISTS tournament_team_registrations_payment_status_check,
  DROP CONSTRAINT IF EXISTS tournament_team_registrations_amount_paid_check,
  DROP CONSTRAINT IF EXISTS tournament_team_registrations_payment_updated_by_fkey;

ALTER TABLE public.tournament_team_registrations
  ADD CONSTRAINT tournament_team_registrations_payment_status_check
    CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  ADD CONSTRAINT tournament_team_registrations_amount_paid_check
    CHECK (amount_paid >= 0),
  ADD CONSTRAINT tournament_team_registrations_payment_updated_by_fkey
    FOREIGN KEY (payment_updated_by)
    REFERENCES public.users(id) ON DELETE RESTRICT;

UPDATE public.tournament_team_registrations registration
SET payment_status = 'paid'
FROM public.tournaments tournament
WHERE tournament.id = registration.tournament_id
  AND tournament.registration_fee = 0;

CREATE INDEX IF NOT EXISTS tournament_team_registrations_payment_updater_idx
  ON public.tournament_team_registrations (payment_updated_by);

CREATE INDEX IF NOT EXISTS tournament_team_registrations_payment_status_idx
  ON public.tournament_team_registrations (tournament_id, payment_status);
