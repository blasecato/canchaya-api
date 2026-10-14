import { BadRequestException } from '@nestjs/common';
import { createHash } from 'node:crypto';

export const FORMATS = [
  'league',
  'league_knockout',
  'knockout',
  'groups_knockout',
  'league_final',
  'groups_final',
] as const;
export type Format = (typeof FORMATS)[number];
export const FORMAT_LABELS: Record<Format, string> = {
  league: 'Liga',
  league_knockout: 'Mixto · Liga + eliminación directa',
  knockout: 'Eliminación directa',
  groups_knockout: 'Fase de grupos + eliminación directa',
  league_final: 'Liga + liguilla final',
  groups_final: 'Grupos + liguilla final',
};
export interface CompetitionConfig {
  format: Format;
  legs: number;
  groups: number;
  qualifiers: number; // Per group for groups; total for league.
  finalLegs: number;
  /**
   * Equipos que clasifican además de los puestos fijos, tomados por mejor
   * ubicación entre los siguientes de cada grupo (los «mejores terceros»).
   */
  extraQualifiers?: number;
  /**
   * Qué hacer con esos equipos extra: entrar directo al cuadro o disputar una
   * ronda previa de repechaje entre ellos.
   */
  extraQualifierMode?: ExtraQualifierMode;
}

export const EXTRA_QUALIFIER_MODES = ['direct', 'play_in'] as const;
export type ExtraQualifierMode = (typeof EXTRA_QUALIFIER_MODES)[number];
export interface Fixture {
  key: string;
  home: string;
  away: string;
  round: number;
  group: string;
  matchDate?: string | null;
  venue?: string | null;
  durationMinutes?: number;
}
export interface CompetitionStage {
  id: number;
  label: string;
  kind: 'points' | 'knockout';
  groups: { name: string; teams: string[] }[];
  fixtures: Fixture[];
  byes: string[];
  resolved: boolean;
}
export interface CompetitionPlan {
  version: 1 | 2;
  config: CompetitionConfig;
  seed: string;
  teamIds: string[];
  slots?: CompetitionSlot[];
  stages: CompetitionStage[];
  champion: string | null;
  createdBy: string;
  createdAt: string;
  originalType: string;
  changeReason: string | null;
}
export interface CompetitionSlot {
  id: string;
  label: string;
  teamId: string | null;
}
export interface Score {
  key: string;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
}
export interface Standing {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  drawOrder: number;
}
const fail = (message: string): never => {
  throw new BadRequestException(message);
};
export const hasGroups = (format: Format) => format.startsWith('groups_');
export const hasFinalLeague = (format: Format) => format.endsWith('_final');
export const DIRECT_KNOCKOUT_SIZES = [4, 8, 16, 32] as const;
export const GROUP_KNOCKOUT_QUALIFIER_SIZES = [2, 4, 8, 16, 32] as const;
/** Clasificados totales: los puestos fijos por grupo más los extras elegidos. */
export const advancingTeams = (config: CompetitionConfig) =>
  config.qualifiers * (hasGroups(config.format) ? config.groups : 1) +
  (config.extraQualifiers ?? 0);

export const isPowerOfTwo = (count: number) =>
  Number.isInteger(count) && count > 0 && Number.isInteger(Math.log2(count));

export function groupKnockoutConfigs(count: number): CompetitionConfig[] {
  if (!Number.isInteger(count) || count < 6) return [];

  const configs: CompetitionConfig[] = [];
  const maximumGroups = Math.min(
    Math.floor(count / 3),
    GROUP_KNOCKOUT_QUALIFIER_SIZES.at(-1)!,
  );
  for (let groups = 2; groups <= maximumGroups; groups++) {
    // Los grupos pueden quedar disparejos: manda el tamaño del más pequeño.
    const teamsPerGroup = Math.floor(count / groups);
    const maximumQualifiers = Math.min(
      teamsPerGroup - 1,
      Math.floor(GROUP_KNOCKOUT_QUALIFIER_SIZES.at(-1)! / groups),
    );
    for (let qualifiers = 1; qualifiers <= maximumQualifiers; qualifiers++) {
      const advancing = groups * qualifiers;
      if (
        !GROUP_KNOCKOUT_QUALIFIER_SIZES.includes(
          advancing as (typeof GROUP_KNOCKOUT_QUALIFIER_SIZES)[number],
        )
      )
        continue;
      configs.push({
        format: 'groups_knockout',
        legs: 1,
        groups,
        qualifiers,
        finalLegs: 1,
      });
    }
  }

  return configs.sort((a, b) => {
    const aSize = count / a.groups;
    const bSize = count / b.groups;
    return (
      Math.abs(aSize - 4) - Math.abs(bSize - 4) ||
      Math.abs(a.qualifiers - 2) - Math.abs(b.qualifiers - 2) ||
      a.groups - b.groups ||
      a.qualifiers - b.qualifiers
    );
  });
}

export function validateConfig(config: CompetitionConfig, count: number) {
  const minimumTeams = config.format === 'knockout' ? 4 : 6;
  if (!Number.isInteger(count) || count < minimumTeams)
    fail(
      `Se necesitan al menos ${minimumTeams} equipos aprobados para este formato.`,
    );
  if (
    !FORMATS.includes(config.format) ||
    ![1, 2, 3].includes(config.legs) ||
    ![1, 2].includes(config.finalLegs)
  )
    fail('Elige un formato válido y entre una y tres vueltas.');
  if (!Number.isInteger(config.groups) || !Number.isInteger(config.qualifiers))
    fail('Los grupos y clasificados deben ser enteros.');
  if (hasGroups(config.format)) {
    if (config.groups < 2 || config.groups > Math.floor(count / 3))
      fail('Cada grupo debe tener al menos tres equipos.');
    // Los grupos pueden quedar disparejos (21 equipos en 4 grupos: 6, 5, 5, 5).
    // Lo que no puede pasar es que el grupo más chico clasifique a todos.
    const smallestGroup = Math.floor(count / config.groups);
    if (config.qualifiers < 1 || config.qualifiers >= smallestGroup)
      fail(
        `Con ${config.groups} grupos el más pequeño tendría ${smallestGroup} equipos: debe clasificar al menos uno y quedar eliminado al menos uno.`,
      );
  } else if (config.groups !== 1) fail('Este formato utiliza un solo grupo.');
  if (
    config.format === 'knockout' &&
    !DIRECT_KNOCKOUT_SIZES.includes(
      count as (typeof DIRECT_KNOCKOUT_SIZES)[number],
    )
  )
    fail(
      'La eliminación directa necesita 4, 8, 16 o 32 equipos. Con otra cantidad usa un formato con fase de grupos o de liga.',
    );
  if (['league', 'knockout'].includes(config.format)) {
    if (config.qualifiers !== 1)
      fail('Este formato no requiere clasificación a una segunda etapa.');
  } else {
    const extras = config.extraQualifiers ?? 0;
    const advancing = advancingTeams(config);
    if (!Number.isInteger(extras) || extras < 0)
      fail('Los clasificados adicionales deben ser un número entero.');
    if (extras > 0 && !hasGroups(config.format))
      fail('Los clasificados adicionales solo aplican a los formatos por grupos.');
    // Los extras salen del siguiente puesto de cada grupo: no puede pedirse
    // más de uno por grupo.
    if (extras > config.groups)
      fail(
        `Solo puede haber ${config.groups} clasificado${config.groups === 1 ? '' : 's'} adicional${config.groups === 1 ? '' : 'es'}: uno por grupo como máximo.`,
      );
    if (
      extras > 0 &&
      !EXTRA_QUALIFIER_MODES.includes(
        (config.extraQualifierMode ?? 'direct') as ExtraQualifierMode,
      )
    )
      fail('Indica si los clasificados adicionales entran directo o por repechaje.');
    if (
      advancing < (hasFinalLeague(config.format) ? 3 : 2) ||
      advancing > count
    )
      fail('La cantidad de clasificados no es válida para la etapa final.');

    const playIn = extras > 0 && config.extraQualifierMode === 'play_in';
    // Con repechaje, la llave arranca después de la ronda previa: los extras
    // y una cantidad igual de clasificados se juegan el cupo entre ellos.
    const bracketSize = playIn ? advancing - extras : advancing;
    if (config.format === 'league_knockout' && !isPowerOfTwo(bracketSize))
      fail(
        'La fase eliminatoria del formato mixto debe clasificar una potencia de dos: 2, 4, 8, 16, 32…',
      );
    if (
      config.format === 'groups_knockout' &&
      !GROUP_KNOCKOUT_QUALIFIER_SIZES.includes(
        bracketSize as (typeof GROUP_KNOCKOUT_QUALIFIER_SIZES)[number],
      )
    )
      fail(
        `Esta configuración deja ${bracketSize} equipos en el cuadro (${config.groups} grupos × ${config.qualifiers} por grupo${extras > 0 ? ` + ${extras} adicional${extras === 1 ? '' : 'es'}` : ''}). La eliminación directa debe iniciar con 2, 4, 8, 16 o 32 equipos.`,
      );
  }
  // Bound generated work rather than imposing an arbitrary team limit.
  if (estimate(config, count).totalMatches > 10000)
    fail(
      'Esta configuración supera los 10.000 partidos. Usa grupos o eliminación directa.',
    );
}
export function shuffled(ids: string[], seed: string): string[] {
  return [...ids].sort((a, b) => {
    const hash = (id: string) =>
      createHash('sha256').update(`${seed}:${id}`).digest('hex');
    return hash(a).localeCompare(hash(b)) || a.localeCompare(b);
  });
}
export function splitGroups(ids: string[], count: number) {
  const groups = Array.from({ length: count }, (_, i) => ({
    name: count === 1 ? 'General' : `Grupo ${i + 1}`,
    teams: [] as string[],
  }));
  ids.forEach((id, i) => groups[i % count].teams.push(id));
  return groups;
}
export function roundRobin(
  ids: string[],
  legs: number,
  stageId: number,
  group: string,
): Fixture[] {
  const rotation: (string | null)[] = [...ids];
  if (rotation.length % 2) rotation.push(null);
  const rounds = rotation.length - 1;
  const first: Fixture[] = [];
  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < rotation.length / 2; i++) {
      const a = rotation[i];
      const b = rotation[rotation.length - 1 - i];
      if (a && b)
        first.push({
          key: `${stageId}:${group}:${first.length}`,
          home: r % 2 ? b : a,
          away: r % 2 ? a : b,
          round: r + 1,
          group,
        });
    }
    rotation.splice(1, 0, rotation.pop()!);
  }
  // Cada vuelta adicional invierte la localía y continúa la numeración de
  // fechas, de modo que 3 vueltas quedan ida, vuelta y desempate.
  const legFixtures = Array.from({ length: Math.max(1, legs) }, (_leg, index) =>
    index === 0
      ? first
      : first.map((fixture) => ({
          ...fixture,
          key: `${fixture.key}:leg${index + 1}`,
          home: index % 2 ? fixture.away : fixture.home,
          away: index % 2 ? fixture.home : fixture.away,
          round: fixture.round + rounds * index,
        })),
  );
  return legFixtures.flat();
}
export function pointsStage(
  ids: string[],
  groups: number,
  legs: number,
  id: number,
  label: string,
): CompetitionStage {
  const assignments = splitGroups(ids, groups);
  return {
    id,
    label,
    kind: 'points',
    groups: assignments,
    fixtures: assignments.flatMap((g) => roundRobin(g.teams, legs, id, g.name)),
    byes: [],
    resolved: false,
  };
}
export function knockoutStage(
  ids: string[],
  id: number,
  previousSides?: { name: string; teams: string[] }[],
): CompetitionStage {
  const fixtures: Fixture[] = [];
  const byes: string[] = [];
  let groups: { name: string; teams: string[] }[];

  if (ids.length === 2) {
    groups = [{ name: 'Final', teams: ids }];
    fixtures.push({
      key: `${id}:knockout:0`,
      home: ids[0],
      away: ids[1],
      round: 1,
      group: 'Final',
    });
  } else if (!previousSides) {
    const pairs = Array.from(
      { length: Math.floor(ids.length / 2) },
      (_, index) => [ids[index], ids[ids.length - 1 - index]] as const,
    );
    const leftPairCount = Math.ceil(pairs.length / 2);
    const sideNames = ['Lado izquierdo', 'Lado derecho'] as const;
    groups = sideNames.map((name) => ({ name, teams: [] }));
    pairs.forEach(([home, away], index) => {
      const sideIndex = index < leftPairCount ? 0 : 1;
      const group = groups[sideIndex];
      group.teams.push(home, away);
      fixtures.push({
        key: `${id}:knockout:${index}`,
        home,
        away,
        round: 1,
        group: group.name,
      });
    });
    if (ids.length % 2 !== 0) {
      const bye = ids[Math.floor(ids.length / 2)];
      groups[0].teams.push(bye);
      byes.push(bye);
    }
  } else {
    groups = previousSides.map((side) => ({
      name: side.name,
      teams: [...side.teams],
    }));
    for (const group of groups) {
      const playing = [...group.teams];
      if (playing.length % 2 !== 0) byes.push(playing.shift()!);
      for (let index = 0; index < playing.length / 2; index++) {
        fixtures.push({
          key: `${id}:knockout:${fixtures.length}`,
          home: playing[index],
          away: playing[playing.length - 1 - index],
          round: 1,
          group: group.name,
        });
      }
    }
  }
  const label =
    ids.length === 2
      ? 'Final'
      : ids.length === 4
        ? 'Semifinales'
        : id === 1
          ? 'Primera ronda'
          : `Ronda de ${ids.length}`;
  return {
    id,
    label,
    kind: 'knockout',
    groups,
    fixtures,
    byes,
    resolved: false,
  };
}

function medalStage(
  finalists: string[],
  thirdPlaceTeams: string[],
  id: number,
): CompetitionStage {
  return {
    id,
    label: 'Final y tercer puesto',
    kind: 'knockout',
    groups: [
      { name: 'Final', teams: finalists },
      { name: 'Tercer puesto', teams: thirdPlaceTeams },
    ],
    fixtures: [
      {
        key: `${id}:knockout:0`,
        home: finalists[0],
        away: finalists[1],
        round: 1,
        group: 'Final',
      },
      {
        key: `${id}:third-place:0`,
        home: thirdPlaceTeams[0],
        away: thirdPlaceTeams[1],
        round: 1,
        group: 'Tercer puesto',
      },
    ],
    byes: [],
    resolved: false,
  };
}
/**
 * Ronda previa de repechaje: los clasificados adicionales y los últimos cupos
 * se juegan el pase, mientras el resto espera en el cuadro. Los que esperan
 * entran como descansos para que la etapa siguiente los arrastre.
 */
export function playInStage(
  waiting: string[],
  contenders: string[],
  id: number,
): CompetitionStage {
  const fixtures: Fixture[] = [];
  const pairs = Array.from(
    { length: Math.floor(contenders.length / 2) },
    (_item, index) =>
      [contenders[index], contenders[contenders.length - 1 - index]] as const,
  );
  const sideNames = ['Lado izquierdo', 'Lado derecho'] as const;
  const groups = sideNames.map((name) => ({ name, teams: [] as string[] }));
  const leftPairCount = Math.ceil(pairs.length / 2);

  pairs.forEach(([home, away], index) => {
    const group = groups[index < leftPairCount ? 0 : 1];
    group.teams.push(home, away);
    fixtures.push({
      key: `${id}:playin:${index}`,
      home,
      away,
      round: 1,
      group: group.name,
    });
  });

  waiting.forEach((teamId, index) => {
    groups[index % groups.length].teams.push(teamId);
  });

  return {
    id,
    label: 'Repechaje',
    kind: 'knockout',
    groups: groups.filter(({ teams }) => teams.length > 0),
    fixtures,
    byes: [...waiting],
    resolved: false,
  };
}

export function firstStage(config: CompetitionConfig, ids: string[]) {
  return config.format === 'knockout'
    ? knockoutStage(ids, 1)
    : pointsStage(
        ids,
        hasGroups(config.format) ? config.groups : 1,
        config.legs,
        1,
        hasGroups(config.format) ? 'Fase de grupos' : 'Liga inicial',
      );
}
export function estimate(config: CompetitionConfig, count: number) {
  const sizes = Array.from(
    { length: hasGroups(config.format) ? config.groups : 1 },
    (_, i) =>
      Math.floor(count / (hasGroups(config.format) ? config.groups : 1)) +
      (i < count % (hasGroups(config.format) ? config.groups : 1) ? 1 : 0),
  );
  const initial =
    config.format === 'knockout'
      ? count - 1
      : sizes.reduce((sum, n) => sum + ((n * (n - 1)) / 2) * config.legs, 0);
  const qualified = ['league', 'knockout'].includes(config.format)
    ? 0
    : advancingTeams(config);
  const extras = config.extraQualifiers ?? 0;
  const playIn = extras > 0 && config.extraQualifierMode === 'play_in';
  // Con repechaje se juega una ronda previa entre los extras y los últimos
  // cupos; después el cuadro arranca con los equipos que quedan.
  const playInMatches = playIn ? extras : 0;
  const bracketSize = playIn ? qualified - extras : qualified;
  const extra = ['league', 'knockout'].includes(config.format)
    ? 0
    : hasFinalLeague(config.format)
      ? ((qualified * (qualified - 1)) / 2) * config.finalLegs
      : Math.max(0, bracketSize - 1) + playInMatches;
  const eliminationEntrants =
    config.format === 'knockout'
      ? count
      : config.format.endsWith('_knockout')
        ? bracketSize
        : 0;
  const thirdPlaceMatch =
    eliminationEntrants >= 4 && isPowerOfTwo(eliminationEntrants) ? 1 : 0;
  return {
    totalMatches: initial + extra + thirdPlaceMatch,
    minimumMatches:
      config.format === 'knockout' ? 1 : (Math.min(...sizes) - 1) * config.legs,
    groupSizes: config.format === 'knockout' ? [] : sizes,
    qualified,
    byes: 0,
  };
}
export function standings(
  stage: CompetitionStage,
  group: string,
  scores: Score[],
  drawOrder: string[],
): Standing[] {
  const ids = stage.groups.find((g) => g.name === group)!.teams;
  const rows = new Map(
    ids.map((id) => [
      id,
      {
        teamId: id,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        drawOrder: drawOrder.indexOf(id) + 1,
      },
    ]),
  );
  const scoreMap = new Map(scores.map((s) => [s.key, s]));
  for (const f of stage.fixtures.filter((f) => f.group === group)) {
    const s = scoreMap.get(f.key);
    if (
      !s ||
      s.status !== 'played' ||
      s.homeScore === null ||
      s.awayScore === null
    )
      continue;
    const home = rows.get(f.home)!;
    const away = rows.get(f.away)!;
    home.played++;
    away.played++;
    home.goalsFor += s.homeScore;
    home.goalsAgainst += s.awayScore;
    away.goalsFor += s.awayScore;
    away.goalsAgainst += s.homeScore;
    if (s.homeScore === s.awayScore) {
      home.draws++;
      away.draws++;
      home.points++;
      away.points++;
    } else {
      const winner = s.homeScore > s.awayScore ? home : away;
      const loser = winner === home ? away : home;
      winner.wins++;
      winner.points += 3;
      loser.losses++;
    }
  }
  return [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) ||
      b.goalsFor - a.goalsFor ||
      a.drawOrder - b.drawOrder,
  );
}
export function resolveStage(
  plan: CompetitionPlan,
  scores: Score[],
): { next: CompetitionStage | null; champion: string | null } {
  const current = plan.stages.at(-1)!;
  if (current.resolved || plan.champion) fail('Esta etapa ya fue resuelta.');
  const map = new Map(scores.map((s) => [s.key, s]));
  if (
    current.fixtures.some((f) => {
      const s = map.get(f.key);
      return (
        !s ||
        s.status !== 'played' ||
        s.homeScore === null ||
        s.awayScore === null
      );
    })
  )
    fail(
      'Finaliza todos los partidos de la etapa antes de avanzar. Los cancelados deben reprogramarse.',
    );
  let qualified: string[];
  if (current.kind === 'knockout') {
    const outcomes = current.fixtures.map((f) => {
      const s = map.get(f.key)!;
      if (s.homeScore !== s.awayScore) {
        const homeWins = s.homeScore! > s.awayScore!;
        return {
          winner: homeWins ? f.home : f.away,
          loser: homeWins ? f.away : f.home,
        };
      }
      if (
        s.homePenalties === null ||
        s.awayPenalties === null ||
        s.homePenalties === s.awayPenalties
      )
        return fail(
          'Resuelve los empates de eliminación directa mediante penaltis.',
        );
      const homeWins = s.homePenalties > s.awayPenalties;
      return {
        winner: homeWins ? f.home : f.away,
        loser: homeWins ? f.away : f.home,
      };
    });
    const winners = outcomes.map(({ winner }) => winner);
    const losers = outcomes.map(({ loser }) => loser);
    const finalIndex = current.fixtures.findIndex(
      ({ group }) => group === 'Final',
    );
    if (finalIndex >= 0) return { next: null, champion: winners[finalIndex] };
    qualified = [...winners, ...current.byes];
    if (
      qualified.length === 2 &&
      current.fixtures.length === 2 &&
      current.byes.length === 0
    )
      return {
        next: medalStage(winners, losers, current.id + 1),
        champion: null,
      };
    const nextSides = current.groups
      .map((group) => ({
        name: group.name,
        teams: [
          ...current.fixtures
            .map((fixture, index) => ({ fixture, winner: winners[index] }))
            .filter(({ fixture }) => fixture.group === group.name)
            .map(({ winner }) => winner),
          ...current.byes.filter((teamId) => group.teams.includes(teamId)),
        ],
      }))
      .filter(({ teams }) => teams.length > 0);
    return qualified.length === 1
      ? { next: null, champion: qualified[0] }
      : {
          next: knockoutStage(qualified, current.id + 1, nextSides),
          champion: null,
        };
  }
  const tables = current.groups.map((g) =>
    standings(current, g.name, scores, plan.teamIds),
  );
  if (plan.config.format === 'league' || current.id > 1)
    return { next: null, champion: tables[0][0].teamId };
  // Rank first, group second: for two groups this produces A1–B2 and B1–A2.
  qualified = Array.from({ length: plan.config.qualifiers }, (_, rank) =>
    tables.map((table) => table[rank]?.teamId).filter(Boolean),
  ).flat() as string[];

  const extras = plan.config.extraQualifiers ?? 0;
  // Los adicionales salen del siguiente puesto de cada grupo, ordenados entre
  // sí: son los «mejores terceros» cuando clasifican dos por grupo.
  const bestRemaining = extras
    ? rankAcrossGroups(tables, plan.config.qualifiers).slice(0, extras)
    : [];

  if (extras > 0 && plan.config.extraQualifierMode === 'play_in') {
    // Repechaje: los adicionales y los últimos clasificados se juegan el cupo
    // en una ronda previa; el resto espera en el cuadro principal.
    const defenders = qualified.slice(-extras);
    const direct = qualified.slice(0, qualified.length - extras);
    return {
      next: playInStage([...direct], [...defenders, ...bestRemaining], current.id + 1),
      champion: null,
    };
  }

  const finalists = [...qualified, ...bestRemaining];
  return {
    next: hasFinalLeague(plan.config.format)
      ? pointsStage(
          finalists,
          1,
          plan.config.finalLegs,
          current.id + 1,
          'Liguilla final',
        )
      : knockoutStage(finalists, current.id + 1),
    champion: null,
  };
}
/**
 * Ordena entre sí a los equipos que ocupan el mismo puesto en cada grupo, para
 * elegir los «mejores terceros» con un criterio comparable: puntos, diferencia
 * de gol y goles a favor.
 */
export function rankAcrossGroups(
  tables: Standing[][],
  position: number,
): string[] {
  return tables
    .map((table) => table[position])
    .filter((standing): standing is Standing => Boolean(standing))
    .sort(
      (left, right) =>
        right.points - left.points ||
        right.goalsFor - right.goalsAgainst - (left.goalsFor - left.goalsAgainst) ||
        right.goalsFor - left.goalsFor,
    )
    .map(({ teamId }) => teamId);
}

export function suggestions(count: number) {
  if (count < 6) return [];
  const configs: CompetitionConfig[] = [
    { format: 'league', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
    { format: 'league', legs: 2, groups: 1, qualifiers: 1, finalLegs: 1 },
    {
      format: 'league_knockout',
      legs: 1,
      groups: 1,
      qualifiers: 4,
      finalLegs: 1,
    },
    ...groupKnockoutConfigs(count),
    ...(DIRECT_KNOCKOUT_SIZES.includes(
      count as (typeof DIRECT_KNOCKOUT_SIZES)[number],
    )
      ? ([
          {
            format: 'knockout',
            legs: 1,
            groups: 1,
            qualifiers: 1,
            finalLegs: 1,
          },
        ] satisfies CompetitionConfig[])
      : []),
  ];
  return configs
    .filter((config) => estimate(config, count).totalMatches <= 10000)
    .map((config) => ({
      config,
      label: `${FORMAT_LABELS[config.format]}${config.format === 'groups_knockout' ? ` · ${config.groups} grupos · pasan ${config.qualifiers} por grupo` : hasGroups(config.format) ? ` · ${config.groups} grupos` : config.format === 'league' ? ` · ${config.legs} vuelta${config.legs === 1 ? '' : 's'}` : ''}`,
      ...estimate(config, count),
    }));
}

export function readPlan(value: unknown): CompetitionPlan | null {
  return value &&
    typeof value === 'object' &&
    'version' in value &&
    (value.version === 1 || value.version === 2)
    ? (value as CompetitionPlan)
    : null;
}

export function competitorTeamId(
  plan: CompetitionPlan,
  competitorId: string,
): string | null {
  if (plan.version === 1 || !plan.slots) return competitorId;
  return plan.slots.find(({ id }) => id === competitorId)?.teamId ?? null;
}

export function assignedTeamIds(plan: CompetitionPlan): string[] {
  return plan.teamIds
    .map((competitorId) => competitorTeamId(plan, competitorId))
    .filter((teamId): teamId is string => teamId !== null);
}

export function hasUnfilledSlots(plan: CompetitionPlan): boolean {
  return (
    plan.version === 2 && Boolean(plan.slots?.some(({ teamId }) => !teamId))
  );
}
