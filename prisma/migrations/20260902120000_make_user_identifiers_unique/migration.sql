ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_document_uk;

CREATE UNIQUE INDEX IF NOT EXISTS users_id_number_uk
  ON public.users (id_number);

-- El correo se normaliza en la aplicación, y este índice también evita
-- duplicados que solo cambien mayúsculas o minúsculas.
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_uk
  ON public.users (lower(email));
