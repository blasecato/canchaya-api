BEGIN;

ALTER TABLE public.associations
ADD COLUMN IF NOT EXISTS cover_url text;

UPDATE public.associations
SET cover_url = logo_url
WHERE cover_url IS NULL;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM public.associations
        WHERE cover_url IS NULL
    ) THEN
        RAISE EXCEPTION
            'No se puede exigir cover_url: existen asociaciones sin logo_url para usar como portada inicial.';
    END IF;
END
$$;

ALTER TABLE public.associations
ALTER COLUMN cover_url SET NOT NULL;

COMMIT;
