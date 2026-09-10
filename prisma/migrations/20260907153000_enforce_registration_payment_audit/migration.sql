ALTER TABLE public.tournament_team_registrations
  DROP CONSTRAINT IF EXISTS tournament_team_registrations_payment_consistency_check;

ALTER TABLE public.tournament_team_registrations
  ADD CONSTRAINT tournament_team_registrations_payment_consistency_check
    CHECK (
      (payment_status = 'unpaid' AND amount_paid = 0)
      OR (payment_status = 'partial' AND amount_paid > 0)
      OR payment_status = 'paid'
    );

ALTER TABLE public.tournament_registration_events
  DROP CONSTRAINT IF EXISTS tournament_registration_events_type_check;

ALTER TABLE public.tournament_registration_events
  ADD CONSTRAINT tournament_registration_events_type_check
    CHECK (event_type IN (
      'submitted',
      'changes_requested',
      'resubmitted',
      'approved',
      'rejected',
      'withdrawn',
      'payment_updated'
    ));
