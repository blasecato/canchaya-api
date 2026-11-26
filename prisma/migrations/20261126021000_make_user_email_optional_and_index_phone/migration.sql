-- Permitir registro sin correo electrónico y acelerar el inicio de sesión por teléfono celular
ALTER TABLE "public"."users"
    ALTER COLUMN "email" DROP NOT NULL;

CREATE INDEX IF NOT EXISTS "users_phone_idx"
    ON "public"."users" ("phone");
