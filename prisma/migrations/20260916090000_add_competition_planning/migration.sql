ALTER TABLE tournaments ADD COLUMN competition_plan JSONB;
ALTER TABLE matches ADD COLUMN competition_key TEXT,
  ADD COLUMN home_penalties INTEGER,
  ADD COLUMN away_penalties INTEGER;
CREATE UNIQUE INDEX matches_competition_key_uk ON matches(tournament_id, competition_key);
ALTER TABLE matches ADD CONSTRAINT matches_penalties_check CHECK (
  (home_penalties IS NULL AND away_penalties IS NULL) OR
  (home_penalties IS NOT NULL AND away_penalties IS NOT NULL AND
   home_penalties >= 0 AND away_penalties >= 0 AND home_penalties <> away_penalties)
);
