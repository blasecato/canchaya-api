-- Alineación táctica por equipo en cada torneo (visible solo para el equipo, editable solo por su capitán)
ALTER TABLE "tournament_team_registrations"
    ADD COLUMN IF NOT EXISTS "lineup" JSONB;
