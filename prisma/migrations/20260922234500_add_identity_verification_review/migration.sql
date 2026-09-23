-- El OCR del documento ya no bloquea el registro: guarda su veredicto para que
-- un administrador pueda revisar los casos que no quedaron confirmados.
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS identity_verification_status TEXT NOT NULL DEFAULT 'pending_review',
  ADD COLUMN IF NOT EXISTS identity_verification_details JSONB,
  ADD COLUMN IF NOT EXISTS identity_verification_checked_at TIMESTAMPTZ(6);

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_identity_verification_status_check;

ALTER TABLE public.users
  ADD CONSTRAINT users_identity_verification_status_check
  CHECK (identity_verification_status IN ('verified', 'pending_review'));

-- Las cuentas creadas antes de este cambio se marcaron verificadas sin
-- comprobación real; quedan como verificadas para no invalidarlas
-- retroactivamente, pero las nuevas sí reflejan el resultado del OCR.
UPDATE public.users
SET identity_verification_status = 'verified'
WHERE identity_verified_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS users_identity_verification_status_idx
  ON public.users (identity_verification_status)
  WHERE identity_verification_status <> 'verified';
