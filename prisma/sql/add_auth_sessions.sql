CREATE TABLE IF NOT EXISTS public.auth_sessions (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id bigint NOT NULL,
    jti_hash character(64) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    revoked_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT auth_sessions_jti_hash_uk UNIQUE (jti_hash),
    CONSTRAINT auth_sessions_user_fkey
        FOREIGN KEY (user_id)
        REFERENCES public.users (id)
        ON DELETE CASCADE,
    CONSTRAINT auth_sessions_expiry_ck CHECK (expires_at > created_at),
    CONSTRAINT auth_sessions_revocation_ck
        CHECK (revoked_at IS NULL OR revoked_at >= created_at)
);

CREATE INDEX IF NOT EXISTS auth_sessions_expires_at_idx
    ON public.auth_sessions (expires_at);

CREATE INDEX IF NOT EXISTS auth_sessions_user_revoked_idx
    ON public.auth_sessions (user_id, revoked_at);
