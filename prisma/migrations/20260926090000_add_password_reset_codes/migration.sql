CREATE TABLE public.password_reset_codes (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  code_hash CHAR(64) NOT NULL,
  expires_at TIMESTAMPTZ(6) NOT NULL,
  consumed_at TIMESTAMPTZ(6),
  attempts INTEGER NOT NULL DEFAULT 0,
  requested_ip TEXT,
  created_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT password_reset_codes_user_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE,
  CONSTRAINT password_reset_codes_attempts_check
    CHECK (attempts >= 0)
);

CREATE INDEX password_reset_codes_user_idx
  ON public.password_reset_codes (user_id, consumed_at, expires_at);

CREATE INDEX password_reset_codes_expires_idx
  ON public.password_reset_codes (expires_at);
