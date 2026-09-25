-- Las organizaciones pueden seguir recibiendo equipos después de iniciado el
-- torneo. Esta regla ya se eliminó de la aplicación; se retira también de la
-- base de datos para que ambas capas apliquen el mismo comportamiento.
ALTER TABLE "public"."tournaments"
  DROP CONSTRAINT IF EXISTS "tournaments_registration_before_start_check";
