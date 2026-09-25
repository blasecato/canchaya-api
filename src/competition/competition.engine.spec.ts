import {
  estimate,
  firstStage,
  knockoutStage,
  resolveStage,
  roundRobin,
  shuffled,
  standings,
  suggestions,
  validateConfig,
  type CompetitionConfig,
  type CompetitionPlan,
  type CompetitionStage,
  type Score,
} from './competition.engine';
import { scheduleFixtures } from './competition.service';
const ids = (n: number) => Array.from({ length: n }, (_, i) => String(i + 1));
const planFor = (config: CompetitionConfig, n: number): CompetitionPlan => ({
  version: 1,
  config,
  seed: 'test',
  teamIds: ids(n),
  stages: [firstStage(config, ids(n))],
  champion: null,
  createdAt: '',
  createdBy: '1',
  originalType: '',
  changeReason: null,
});
const scoreStage = (stage: CompetitionStage): Score[] =>
  stage.fixtures.map((f) => ({
    key: f.key,
    status: 'played',
    homeScore: 1,
    awayScore: 0,
    homePenalties: null,
    awayPenalties: null,
  }));

describe('competition formats', () => {
  it.each(Array.from({ length: 27 }, (_, i) => i + 6))(
    'includes every team and finishes all suggestions for %i teams',
    (count) => {
      for (const { config } of suggestions(count)) {
        validateConfig(config, count);
        const plan = planFor(config, count);
        expect(
          new Set(plan.stages[0].groups.flatMap((g) => g.teams)).size,
        ).toBe(count);
        expect(plan.stages[0].groups.flatMap((g) => g.teams)).toHaveLength(
          count,
        );
        let matches = 0;
        for (let step = 0; step < 15 && !plan.champion; step++) {
          const current = plan.stages.at(-1)!;
          const allTeams = current.groups.flatMap((g) => g.teams);
          expect(
            new Set(
              current.fixtures
                .flatMap((f) => [f.home, f.away])
                .concat(current.byes),
            ).size,
          ).toBe(allTeams.length);
          for (const f of current.fixtures) expect(f.home).not.toBe(f.away);
          matches += current.fixtures.length;
          const result = resolveStage(plan, scoreStage(current));
          current.resolved = true;
          if (result.next) plan.stages.push(result.next);
          plan.champion = result.champion;
        }
        expect(plan.champion).not.toBeNull();
        expect(matches).toBe(estimate(config, count).totalMatches);
      }
    },
  );
  it.each([6, 7, 9, 20, 25])(
    'round robin has no duplicate pairings or simultaneous team appearances for %i',
    (count) => {
      const fixtures = roundRobin(ids(count), 1, 1, 'A');
      expect(fixtures).toHaveLength((count * (count - 1)) / 2);
      expect(
        new Set(fixtures.map((f) => [f.home, f.away].sort().join(':'))).size,
      ).toBe(fixtures.length);
      for (const round of new Set(fixtures.map((f) => f.round))) {
        const teams = fixtures
          .filter((f) => f.round === round)
          .flatMap((f) => [f.home, f.away]);
        expect(new Set(teams).size).toBe(teams.length);
      }
      const twice = roundRobin(ids(count), 2, 1, 'A');
      expect(new Set(twice.map((f) => `${f.home}:${f.away}`)).size).toBe(
        count * (count - 1),
      );
    },
  );
  it('makes all eight entrants play the first round without byes', () => {
    const stage = knockoutStage(ids(8), 1);
    expect(stage.byes).toHaveLength(0);
    expect(stage.fixtures).toHaveLength(4);
    expect(
      new Set(stage.fixtures.flatMap(({ home, away }) => [home, away])).size,
    ).toBe(8);
  });
  it('builds a 16-team first round with eight matches split across both sides', () => {
    const stage = knockoutStage(ids(16), 1);
    expect(stage.fixtures).toHaveLength(8);
    expect(stage.byes).toHaveLength(0);
    expect(stage.groups).toEqual([
      expect.objectContaining({ name: 'Lado izquierdo' }),
      expect.objectContaining({ name: 'Lado derecho' }),
    ]);
    expect(
      stage.fixtures.filter(({ group }) => group === 'Lado izquierdo'),
    ).toHaveLength(4);
    expect(
      stage.fixtures.filter(({ group }) => group === 'Lado derecho'),
    ).toHaveLength(4);
  });
  it('finishes a 16-team bracket without automatic advances', () => {
    const plan = planFor(
      {
        format: 'knockout',
        legs: 1,
        groups: 1,
        qualifiers: 1,
        finalLegs: 1,
      },
      16,
    );
    while (!plan.champion) {
      const current = plan.stages.at(-1)!;
      expect(current.byes).toHaveLength(0);
      const result = resolveStage(plan, scoreStage(current));
      current.resolved = true;
      if (result.next) plan.stages.push(result.next);
      plan.champion = result.champion;
    }
    expect(plan.stages.map(({ fixtures }) => fixtures.length)).toEqual([
      8, 4, 2, 2,
    ]);
    expect(plan.stages.at(-1)?.groups.map(({ name }) => name)).toEqual([
      'Final',
      'Tercer puesto',
    ]);
  });
  it('only offers direct elimination for 8, 16 or 32 entrants', () => {
    const direct: CompetitionConfig = {
      format: 'knockout',
      legs: 1,
      groups: 1,
      qualifiers: 1,
      finalLegs: 1,
    };
    for (const count of [6, 7, 10, 20, 24, 30]) {
      expect(() => validateConfig(direct, count)).toThrow('8, 16 o 32');
      expect(
        suggestions(count).some(({ config }) => config.format === 'knockout'),
      ).toBe(false);
    }
    for (const count of [8, 16, 32]) {
      expect(() => validateConfig(direct, count)).not.toThrow();
      expect(
        suggestions(count).some(({ config }) => config.format === 'knockout'),
      ).toBe(true);
    }
  });
  it('requires a power of two for the mixed knockout stage', () => {
    const mixed: CompetitionConfig = {
      format: 'league_knockout',
      legs: 1,
      groups: 1,
      qualifiers: 6,
      finalLegs: 1,
    };
    expect(() => validateConfig(mixed, 20)).toThrow('potencia de dos');
    for (const qualifiers of [2, 4, 8, 16])
      expect(() => validateConfig({ ...mixed, qualifiers }, 20)).not.toThrow();
  });
  it('builds a Final Four from the top four league positions', () => {
    const plan = planFor(
      {
        format: 'league_knockout',
        legs: 1,
        groups: 1,
        qualifiers: 4,
        finalLegs: 1,
      },
      20,
    );
    const scores = scoreStage(plan.stages[0]);
    const table = standings(plan.stages[0], 'General', scores, plan.teamIds);
    const next = resolveStage(plan, scores).next!;
    expect(next.label).toBe('Semifinales');
    expect(next.fixtures).toEqual([
      expect.objectContaining({
        home: table[0].teamId,
        away: table[3].teamId,
        group: 'Lado izquierdo',
      }),
      expect.objectContaining({
        home: table[1].teamId,
        away: table[2].teamId,
        group: 'Lado derecho',
      }),
    ]);
  });
  it('creates the final and third-place match from both semifinals', () => {
    const semifinal = knockoutStage(ids(4), 2);
    const plan: CompetitionPlan = {
      ...planFor(
        {
          format: 'league_knockout',
          legs: 1,
          groups: 1,
          qualifiers: 4,
          finalLegs: 1,
        },
        8,
      ),
      stages: [semifinal],
    };

    const medalStage = resolveStage(plan, scoreStage(semifinal)).next!;

    expect(medalStage.label).toBe('Final y tercer puesto');
    expect(medalStage.fixtures).toEqual([
      expect.objectContaining({
        home: semifinal.fixtures[0].home,
        away: semifinal.fixtures[1].home,
        group: 'Final',
      }),
      expect.objectContaining({
        home: semifinal.fixtures[0].away,
        away: semifinal.fixtures[1].away,
        group: 'Tercer puesto',
      }),
    ]);

    plan.stages[0].resolved = true;
    plan.stages.push(medalStage);
    expect(() => resolveStage(plan, scoreStage(medalStage).slice(0, 1))).toThrow(
      'Finaliza',
    );
    const result = resolveStage(plan, scoreStage(medalStage));
    expect(result.next).toBeNull();
    expect(result.champion).toBe(medalStage.fixtures[0].home);
  });
  it('replays exactly the same draw regardless of source ordering', () => {
    expect(shuffled(ids(20), 'abc')).toEqual(
      shuffled(ids(20).reverse(), 'abc'),
    );
    expect(shuffled(ids(20), 'abc')).not.toEqual(shuffled(ids(20), 'other'));
  });
  it('does not advance incomplete, cancelled or tied knockout matches', () => {
    const plan = planFor(
      { format: 'knockout', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
      6,
    );
    expect(() => resolveStage(plan, [])).toThrow('Finaliza');
    const scores = scoreStage(plan.stages[0]);
    scores[0].status = 'cancelled';
    expect(() => resolveStage(plan, scores)).toThrow('Finaliza');
    scores[0].status = 'played';
    scores[0].awayScore = 1;
    expect(() => resolveStage(plan, scores)).toThrow('penaltis');
    scores[0].homePenalties = 3;
    scores[0].awayPenalties = 4;
    expect(resolveStage(plan, scores).next?.groups[0].teams).toContain(
      plan.stages[0].fixtures[0].away,
    );
  });
  it('keeps points separate between groups and resets the final league', () => {
    const plan = planFor(
      {
        format: 'groups_final',
        legs: 1,
        groups: 2,
        qualifiers: 2,
        finalLegs: 1,
      },
      8,
    );
    const scores = scoreStage(plan.stages[0]);
    const table = standings(plan.stages[0], 'Grupo 1', scores, plan.teamIds);
    expect(table.every((r) => r.played === 3)).toBe(true);
    const next = resolveStage(plan, scores).next!;
    expect(
      standings(next, 'General', scores, plan.teamIds).every(
        (r) => r.points === 0 && r.played === 0,
      ),
    ).toBe(true);
  });
  it('uses the published draw order as the final tiebreak', () => {
    const stage = firstStage(
      { format: 'league', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
      ids(6),
    );
    const scores = scoreStage(stage).map((s) => ({ ...s, awayScore: 1 }));
    expect(
      standings(stage, 'General', scores, ids(6).reverse()).map(
        (r) => r.teamId,
      ),
    ).toEqual(ids(6).reverse());
  });
  it('rejects too few teams and invalid qualifying counts', () => {
    expect(() =>
      validateConfig(
        { format: 'league', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
        5,
      ),
    ).toThrow('seis');
    expect(() =>
      validateConfig(
        {
          format: 'groups_knockout',
          legs: 1,
          groups: 3,
          qualifiers: 3,
          finalLegs: 1,
        },
        9,
      ),
    ).toThrow('eliminado');
    expect(() =>
      validateConfig(
        {
          format: 'groups_final',
          legs: 1,
          groups: 2,
          qualifiers: 1,
          finalLegs: 1,
        },
        6,
      ),
    ).toThrow('clasificados');
  });
  it('schedules one venue without overlapping matches and allows pending dates', () => {
    const stage = firstStage(
      { format: 'league', legs: 2, groups: 1, qualifiers: 1, finalLegs: 1 },
      ids(7),
    );
    const schedule = {
      startAt: '2026-10-01T14:00:00Z',
      durationMinutes: 90,
      breakMinutes: 30,
      matchesPerDay: 4,
      daysBetweenMatchDays: 7,
    };
    const fixtures = scheduleFixtures(stage, schedule);
    for (let i = 1; i < fixtures.length; i++)
      expect(
        Date.parse(fixtures[i].matchDate!) -
          Date.parse(fixtures[i - 1].matchDate!),
      ).toBeGreaterThanOrEqual(120 * 60000);
    expect(
      scheduleFixtures(stage, { ...schedule, startAt: undefined }).every(
        (f) => f.matchDate === null,
      ),
    ).toBe(true);
  });
});
