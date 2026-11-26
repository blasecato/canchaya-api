import { BadRequestException } from '@nestjs/common';
import {
  EXTRA_QUALIFIER_MODES,
  hasFinalLeague,
  hasGroups,
  isPowerOfTwo,
  knockoutStage,
  playInStage,
  rankAcrossGroups,
  roundRobin,
  shuffled,
  splitGroups,
  standings,
  type CompetitionConfig,
  type CompetitionPlan,
  type CompetitionStage,
  type ExtraQualifierMode,
  type Score,
} from './competition.engine';

export const ORGANIZATION_MODES = ['planned', 'on_the_fly'] as const;
export type OrganizationMode = (typeof ORGANIZATION_MODES)[number];

export const STAGE_SEEDINGS = ['snake', 'random'] as const;
export type StageSeeding = (typeof STAGE_SEEDINGS)[number];

export const KNOCKOUT_PAIRINGS = ['seeded', 'parallel', 'random'] as const;
export type KnockoutPairing = (typeof KNOCKOUT_PAIRINGS)[number];

export interface PointsStageBlueprint {
  kind: 'points';
  label?: string;
  /** 1 = Liga (todos contra todos), >= 2 = Fase de grupos. */
  groups: number;
  legs: 1 | 2 | 3;
  /** Cómo se distribuyen los equipos al entrar a esta etapa. */
  seeding?: StageSeeding;
  /**
   * Cuántos equipos clasifican por cada grupo (en liga de 1 grupo es el total).
   * Omitir o null si es etapa final o si se decide sobre la marcha.
   */
  qualifiersPerGroup?: number | null;
  /** Clasificados adicionales entre grupos (ej. mejores terceros). */
  extraQualifiers?: number;
  extraQualifierMode?: ExtraQualifierMode;
}

export interface KnockoutStageBlueprint {
  kind: 'knockout';
  label?: string;
  /** Si se juega partido por tercer puesto cuando hay semifinales. */
  thirdPlaceMatch?: boolean;
  /**
   * Cómo se emparejan los cruces iniciales:
   * - seeded: 1.º vs último (1 vs 12)
   * - parallel: dos bloques iguales A vs B (A1 vs B1, A2 vs B2...)
   * - random: sorteo aleatorio
   */
  pairing?: KnockoutPairing;
  /**
   * Si es true, es una ronda única de cruces directos (acepta cualquier cantidad
   * par >= 4, p. ej. 12 equipos -> 6 cruces) y permite sumar mejores perdedores.
   */
  singleRound?: boolean;
  /** Mejores perdedores que también clasifican (solo cuando singleRound = true). */
  luckyLosers?: number;
  /**
   * Cuántos equipos deben quedar al terminar esta etapa:
   * 1 = hasta coronar campeón (por defecto), >1 = alimenta una etapa siguiente.
   */
  stopAtTeams?: number;
}

export type StageBlueprint = PointsStageBlueprint | KnockoutStageBlueprint;

export interface StageEstimate {
  index: number;
  label: string;
  kind: 'points' | 'knockout';
  incomingTeams: number;
  outgoingTeams: number;
  groupSizes: number[];
  matches: number;
  isOpenEnded: boolean;
}

export interface PipelineEstimate {
  totalMatches: number;
  minimumMatches: number;
  groupSizes: number[];
  qualified: number;
  byes: number;
  stages: StageEstimate[];
}

export interface AdvanceResolutionOptions {
  finishTournament?: boolean;
  qualifiersPerGroup?: number;
  extraQualifiers?: number;
  extraQualifierMode?: ExtraQualifierMode;
  nextStage?: StageBlueprint;
}

const fail = (message: string): never => {
  throw new BadRequestException(message);
};

export function defaultStageLabel(
  blueprint: StageBlueprint,
  index: number,
  total: number,
): string {
  const custom = blueprint.label?.trim();
  if (custom) return custom;
  if (blueprint.kind === 'knockout') {
    if (blueprint.singleRound) return 'Cruces directos';
    return index === 0 ? 'Eliminación directa' : 'Fase eliminatoria';
  }
  if (blueprint.groups === 1) {
    if (index === 0) return total === 1 ? 'Liga' : 'Liga inicial';
    return index === total - 1 ? 'Liguilla final' : `Liga · Etapa ${index + 1}`;
  }
  return index === 0 ? 'Fase de grupos' : `Fase de grupos ${index + 1}`;
}

export function describeBlueprints(
  blueprints: StageBlueprint[],
  mode: OrganizationMode = 'planned',
): string {
  const parts = blueprints.map((bp) => {
    if (bp.kind === 'knockout') {
      return bp.singleRound ? 'Cruces directos' : 'Eliminación directa';
    }
    if (bp.groups === 1) return bp.legs > 1 ? `Liga (${bp.legs} vueltas)` : 'Liga';
    return `${bp.groups} grupos`;
  });
  const base = parts.join(' → ');
  return mode === 'on_the_fly' ? `${base} · Por etapas` : base;
}

/** Convierte una configuración clásica (v1/v2) a su equivalente en blueprints v3. */
export function configToBlueprints(config: CompetitionConfig): StageBlueprint[] {
  if (config.format === 'league') {
    return [
      {
        kind: 'points',
        label: 'Liga',
        groups: 1,
        legs: config.legs as 1 | 2 | 3,
      },
    ];
  }
  if (config.format === 'knockout') {
    return [
      {
        kind: 'knockout',
        label: 'Eliminación directa',
        thirdPlaceMatch: true,
        pairing: 'seeded',
        stopAtTeams: 1,
      },
    ];
  }
  const first: PointsStageBlueprint = {
    kind: 'points',
    label: hasGroups(config.format) ? 'Fase de grupos' : 'Liga inicial',
    groups: hasGroups(config.format) ? config.groups : 1,
    legs: config.legs as 1 | 2 | 3,
    qualifiersPerGroup: config.qualifiers,
    ...(config.extraQualifiers
      ? {
          extraQualifiers: config.extraQualifiers,
          extraQualifierMode: config.extraQualifierMode ?? 'direct',
        }
      : {}),
  };
  if (hasFinalLeague(config.format)) {
    return [
      first,
      {
        kind: 'points',
        label: 'Liguilla final',
        groups: 1,
        legs: config.finalLegs as 1 | 2 | 3,
        seeding: 'snake',
      },
    ];
  }
  return [
    first,
    {
      kind: 'knockout',
      label: 'Eliminación directa',
      thirdPlaceMatch: true,
      pairing: 'seeded',
      stopAtTeams: 1,
    },
  ];
}

/**
 * Distribuye equipos ordenados por tabla en grupos con patrón serpentina
 * (1→G1, 2→G2, 3→G2, 4→G1...) para equilibrar el nivel entre grupos.
 */
export function splitGroupsSnake(ids: string[], count: number) {
  const groups = Array.from({ length: count }, (_, i) => ({
    name: count === 1 ? 'General' : `Grupo ${i + 1}`,
    teams: [] as string[],
  }));
  ids.forEach((id, index) => {
    const row = Math.floor(index / count);
    const col = index % count;
    const groupIndex = row % 2 === 0 ? col : count - 1 - col;
    groups[groupIndex].teams.push(id);
  });
  return groups;
}

export function groupSizesForCount(count: number, groups: number): number[] {
  return Array.from(
    { length: groups },
    (_, i) => Math.floor(count / groups) + (i < count % groups ? 1 : 0),
  );
}

function knockoutMatchesCount(
  incoming: number,
  stopAt: number,
  thirdPlaceMatch: boolean,
): number {
  let matches = 0;
  let remaining = incoming;
  while (remaining > stopAt) {
    matches += remaining / 2;
    remaining /= 2;
  }
  if (stopAt === 1 && incoming >= 4 && thirdPlaceMatch) {
    matches += 1;
  }
  return matches;
}

export function validateStageBlueprint(
  blueprint: StageBlueprint,
  incoming: number,
  hasNext: boolean,
  stageNumber: number,
  mode: OrganizationMode,
): { outgoing: number; matches: number; groupSizes: number[]; minMatches: number } {
  if (!Number.isInteger(incoming) || incoming < 2) {
    fail(
      `La etapa ${stageNumber} necesita al menos 2 equipos (recibe ${incoming}).`,
    );
  }

  if (blueprint.kind === 'points') {
    if (![1, 2, 3].includes(blueprint.legs)) {
      fail(`En la etapa ${stageNumber}, elige entre 1 y 3 vueltas.`);
    }
    if (!Number.isInteger(blueprint.groups) || blueprint.groups < 1) {
      fail(`En la etapa ${stageNumber}, la cantidad de grupos debe ser un entero positivo.`);
    }
    if (blueprint.seeding && !STAGE_SEEDINGS.includes(blueprint.seeding)) {
      fail(`En la etapa ${stageNumber}, el criterio de distribución no es válido.`);
    }

    if (blueprint.groups === 1) {
      if (incoming < 3 && stageNumber === 1) {
        fail('Una liga inicial necesita al menos 3 equipos.');
      }
    } else {
      if (Math.floor(incoming / blueprint.groups) < 3) {
        fail(
          `En la etapa ${stageNumber}, con ${incoming} equipos y ${blueprint.groups} grupos cada grupo debe tener al menos 3 equipos.`,
        );
      }
    }

    const sizes = groupSizesForCount(incoming, blueprint.groups);
    const smallestGroup = Math.min(...sizes);
    const stageMatches = sizes.reduce(
      (sum, size) => sum + ((size * (size - 1)) / 2) * blueprint.legs,
      0,
    );
    const minMatches = (smallestGroup - 1) * blueprint.legs;

    if (!hasNext) {
      if (blueprint.groups > 1 && mode === 'planned') {
        fail(
          `La etapa ${stageNumber} tiene ${blueprint.groups} grupos y no puede ser la etapa final en modo planificado. Agrega una siguiente etapa o cambia a «Organizar sobre la marcha».`,
        );
      }
      return {
        outgoing: blueprint.groups === 1 ? 1 : 0,
        matches: stageMatches,
        groupSizes: sizes,
        minMatches,
      };
    }

    const rawQualifiers = blueprint.qualifiersPerGroup;
    if (
      rawQualifiers === null ||
      rawQualifiers === undefined ||
      !Number.isInteger(rawQualifiers) ||
      rawQualifiers < 1
    ) {
      return fail(
        `En la etapa ${stageNumber}, indica cuántos equipos clasifican${blueprint.groups > 1 ? ' por grupo' : ''}.`,
      );
    }
    const qualifiers: number = rawQualifiers;
    if (qualifiers > smallestGroup) {
      fail(
        `En la etapa ${stageNumber}, no pueden clasificar ${qualifiers} equipos cuando el grupo más pequeño tiene ${smallestGroup}.`,
      );
    }
    if (blueprint.groups === 1 && qualifiers === incoming) {
      // Permitimos que pasen todos si hay una siguiente etapa (ej. fase de posicionamiento),
      // pero si hay extras, no quedan equipos.
    }

    const extras = blueprint.extraQualifiers ?? 0;
    if (!Number.isInteger(extras) || extras < 0) {
      fail(`En la etapa ${stageNumber}, los clasificados adicionales deben ser un entero no negativo.`);
    }
    if (extras > 0) {
      if (blueprint.groups < 2) {
        fail(
          `En la etapa ${stageNumber}, los clasificados adicionales solo aplican cuando hay 2 o más grupos.`,
        );
      }
      if (extras > blueprint.groups) {
        fail(
          `En la etapa ${stageNumber}, solo puede haber hasta ${blueprint.groups} clasificados adicionales (uno por grupo).`,
        );
      }
      if (qualifiers >= smallestGroup) {
        fail(
          `En la etapa ${stageNumber}, no quedan equipos disponibles para clasificados adicionales.`,
        );
      }
      const extraMode = blueprint.extraQualifierMode ?? 'direct';
      if (!EXTRA_QUALIFIER_MODES.includes(extraMode)) {
        fail(`En la etapa ${stageNumber}, indica si los adicionales entran directo o por repechaje.`);
      }
    }

    const totalAdvancing = blueprint.groups * qualifiers + extras;
    const playIn = extras > 0 && blueprint.extraQualifierMode === 'play_in';
    const outgoing = playIn ? totalAdvancing - extras : totalAdvancing;
    const playInMatches = playIn ? extras : 0;

    return {
      outgoing,
      matches: stageMatches + playInMatches,
      groupSizes: sizes,
      minMatches,
    };
  }

  // Knockout (o Cruces directos de una sola ronda)
  if (blueprint.pairing && !KNOCKOUT_PAIRINGS.includes(blueprint.pairing)) {
    fail(`En la etapa ${stageNumber}, el criterio de cruces no es válido.`);
  }

  if (blueprint.singleRound) {
    if (incoming < 4 || incoming % 2 !== 0) {
      fail(
        `La etapa ${stageNumber} (cruces directos) recibe ${incoming} equipos y requiere una cantidad par de al menos 4 equipos.`,
      );
    }
    const winnersCount = incoming / 2;
    const lucky = blueprint.luckyLosers ?? 0;
    if (!Number.isInteger(lucky) || lucky < 0 || lucky >= winnersCount) {
      fail(
        `En la etapa ${stageNumber}, los mejores perdedores deben ser entre 0 y ${winnersCount - 1}.`,
      );
    }
    const outgoing = winnersCount + lucky;
    if (!hasNext && mode === 'planned' && outgoing > 1) {
      fail(
        `La etapa ${stageNumber} (cruces directos) deja ${outgoing} equipos clasificados. Agrega una siguiente etapa (por ejemplo, Eliminación directa) o cambia a «Organizar sobre la marcha».`,
      );
    }
    return {
      outgoing,
      matches: winnersCount,
      groupSizes: [],
      minMatches: 1,
    };
  }

  if (!isPowerOfTwo(incoming)) {
    fail(
      `La etapa ${stageNumber} (eliminación directa) recibe ${incoming} equipos y requiere una potencia de dos (2, 4, 8, 16, 32…). Ajusta los clasificados de la etapa anterior.`,
    );
  }
  const stopAt = blueprint.stopAtTeams ?? 1;
  if (!Number.isInteger(stopAt) || !isPowerOfTwo(stopAt) || stopAt >= incoming) {
    fail(
      `En la etapa ${stageNumber}, la cantidad de equipos que avanzan desde la eliminación directa debe ser una potencia de dos menor a ${incoming}.`,
    );
  }
  if (hasNext && stopAt < 2) {
    fail(
      `La etapa ${stageNumber} termina con un campeón y no puede tener una etapa posterior.`,
    );
  }
  if (!hasNext && mode === 'planned' && stopAt !== 1) {
    fail(
      `La etapa final de eliminación directa debe llegar hasta 1 campeón (actualmente se detiene en ${stopAt} equipos).`,
    );
  }

  const thirdPlace = blueprint.thirdPlaceMatch ?? true;
  return {
    outgoing: stopAt,
    matches: knockoutMatchesCount(incoming, stopAt, thirdPlace),
    groupSizes: [],
    minMatches: 1,
  };
}

export function validatePipeline(
  blueprints: StageBlueprint[],
  teamCount: number,
  mode: OrganizationMode = 'planned',
): PipelineEstimate {
  if (!Array.isArray(blueprints) || blueprints.length === 0) {
    fail('Configura al menos una etapa para organizar el torneo.');
  }
  if (blueprints.length > 8) {
    fail('Un torneo puede tener como máximo 8 etapas encadenadas.');
  }
  if (!ORGANIZATION_MODES.includes(mode)) {
    fail('El modo de organización debe ser planificado o sobre la marcha.');
  }

  let incoming = teamCount;
  const stages: StageEstimate[] = [];
  let totalMatches = 0;

  for (let i = 0; i < blueprints.length; i++) {
    const bp = blueprints[i];
    const hasNext = i < blueprints.length - 1;
    const result = validateStageBlueprint(bp, incoming, hasNext, i + 1, mode);
    const isOpenEnded =
      !hasNext &&
      mode === 'on_the_fly' &&
      (bp.kind === 'points' ? true : (bp.stopAtTeams ?? 1) > 1);

    stages.push({
      index: i,
      label: defaultStageLabel(bp, i, blueprints.length),
      kind: bp.kind,
      incomingTeams: incoming,
      outgoingTeams: result.outgoing,
      groupSizes: result.groupSizes,
      matches: result.matches,
      isOpenEnded,
    });
    totalMatches += result.matches;
    incoming = result.outgoing;
  }

  if (totalMatches > 10000) {
    fail(
      'Esta configuración supera los 10.000 partidos. Reduce vueltas o divide en más grupos.',
    );
  }

  const first = stages[0];
  return {
    totalMatches,
    minimumMatches: first.kind === 'knockout'
      ? 1
      : (Math.min(...first.groupSizes) - 1) * (blueprints[0].kind === 'points' ? blueprints[0].legs : 1),
    groupSizes: first.groupSizes,
    qualified: blueprints.length > 1 ? first.outgoingTeams : 0,
    byes: 0,
    stages,
  };
}

export function buildStageFromBlueprint(
  blueprint: StageBlueprint,
  ids: string[],
  stageId: number,
  blueprintIndex: number,
  seed: string,
  totalBlueprints: number,
): CompetitionStage {
  const label = defaultStageLabel(blueprint, blueprintIndex, totalBlueprints);
  if (blueprint.kind === 'knockout') {
    if (blueprint.singleRound) {
      const half = Math.floor(ids.length / 2);
      let pairs: Array<readonly [string, string]>;
      if (blueprint.pairing === 'parallel') {
        const blockA = ids.slice(0, half);
        const blockB = ids.slice(half);
        pairs = Array.from({ length: half }, (_, i) => [blockA[i], blockB[i]] as const);
      } else if (blueprint.pairing === 'random') {
        const mixed = shuffled(ids, `${seed}:stage:${stageId}`);
        pairs = Array.from(
          { length: half },
          (_, i) => [mixed[i * 2], mixed[i * 2 + 1]] as const,
        );
      } else {
        pairs = Array.from(
          { length: half },
          (_, i) => [ids[i], ids[ids.length - 1 - i]] as const,
        );
      }
      const leftCount = Math.ceil(pairs.length / 2);
      const groups = [
        { name: 'Lado izquierdo', teams: [] as string[] },
        { name: 'Lado derecho', teams: [] as string[] },
      ];
      const fixtures = pairs.map(([home, away], index) => {
        const group = groups[index < leftCount ? 0 : 1];
        group.teams.push(home, away);
        return {
          key: `${stageId}:cross:${index}`,
          home,
          away,
          round: 1,
          group: group.name,
        };
      });
      return {
        id: stageId,
        label,
        kind: 'knockout',
        groups: groups.filter((g) => g.teams.length > 0),
        fixtures,
        byes: [],
        resolved: false,
        blueprintIndex,
      };
    }

    const ordered =
      blueprint.pairing === 'random'
        ? shuffled(ids, `${seed}:stage:${stageId}`)
        : blueprint.pairing === 'parallel'
          ? (() => {
              const half = Math.floor(ids.length / 2);
              const blockA = ids.slice(0, half);
              const blockB = ids.slice(half);
              // Reordenar para que knockoutStage (que cruza i vs N-1-i) produzca A1 vs B1, A2 vs B2...
              return [...blockA, ...[...blockB].reverse()];
            })()
          : ids;
    const stage = knockoutStage(ordered, stageId);
    return {
      ...stage,
      label:
        ordered.length <= 4
          ? stage.label
          : blueprint.label?.trim()
            ? `${blueprint.label.trim()} · Ronda de ${ordered.length}`
            : stage.label,
      blueprintIndex,
    };
  }

  const ordered =
    blueprint.seeding === 'random'
      ? shuffled(ids, `${seed}:stage:${stageId}`)
      : ids;
  const groups =
    blueprint.groups === 1
      ? splitGroups(ordered, 1)
      : blueprintIndex === 0 || blueprint.seeding === 'random'
        ? splitGroups(ordered, blueprint.groups)
        : splitGroupsSnake(ordered, blueprint.groups);

  return {
    id: stageId,
    label,
    kind: 'points',
    groups,
    fixtures: groups.flatMap((g) =>
      roundRobin(g.teams, blueprint.legs, stageId, g.name),
    ),
    byes: [],
    resolved: false,
    blueprintIndex,
  };
}

function buildMedalStage(
  finalists: string[],
  thirdPlaceTeams: string[],
  id: number,
  blueprintIndex: number,
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
    blueprintIndex,
  };
}

/**
 * Resuelve la etapa actual de un plan v3 (pipeline).
 * Soporta etapas predefinidas, edición sobre la marcha de la siguiente etapa,
 * o finalización manual cuando el torneo está en modo «sobre la marcha».
 */
export function resolvePipelineStage(
  plan: CompetitionPlan,
  scores: Score[],
  options?: AdvanceResolutionOptions,
): {
  next: CompetitionStage | null;
  champion: string | null;
  updatedBlueprints: StageBlueprint[];
} {
  const blueprints = [...(plan.blueprints ?? [])];
  const current = plan.stages.at(-1)!;
  if (current.resolved || plan.champion) {
    fail('Esta etapa ya fue resuelta.');
  }

  const scoreMap = new Map(scores.map((s) => [s.key, s]));
  if (
    current.fixtures.some((f) => {
      const s = scoreMap.get(f.key);
      return (
        !s ||
        s.status !== 'played' ||
        s.homeScore === null ||
        s.awayScore === null
      );
    })
  ) {
    fail(
      'Finaliza todos los partidos de la etapa antes de avanzar. Los cancelados deben reprogramarse.',
    );
  }

  const bpIdx = current.blueprintIndex ?? 0;
  const currentBp = blueprints[bpIdx];
  const mode: OrganizationMode = plan.organizationMode ?? 'planned';

  // --- CASO 1: ETAPA ACTUAL ES ELIMINACIÓN DIRECTA (O REPECHAJE) ---
  if (current.kind === 'knockout') {
    const outcomes = current.fixtures.map((f) => {
      const s = scoreMap.get(f.key)!;
      if (s.homeScore !== s.awayScore) {
        const homeWins = s.homeScore! > s.awayScore!;
        const loserGoalsFor = homeWins ? s.awayScore! : s.homeScore!;
        const loserGoalsAgainst = homeWins ? s.homeScore! : s.awayScore!;
        return {
          winner: homeWins ? f.home : f.away,
          loser: homeWins ? f.away : f.home,
          lostOnPenalties: false,
          loserGoalDiff: loserGoalsFor - loserGoalsAgainst,
          loserGoalsFor,
        };
      }
      if (
        s.homePenalties === null ||
        s.awayPenalties === null ||
        s.homePenalties === s.awayPenalties
      ) {
        return fail(
          'Resuelve los empates de eliminación directa mediante penaltis.',
        );
      }
      const homeWins = s.homePenalties > s.awayPenalties;
      return {
        winner: homeWins ? f.home : f.away,
        loser: homeWins ? f.away : f.home,
        lostOnPenalties: true,
        loserGoalDiff: 0,
        loserGoalsFor: s.homeScore!,
      };
    });

    const winners = outcomes.map(({ winner }) => winner);
    const losers = outcomes.map(({ loser }) => loser);
    const finalIndex = current.fixtures.findIndex(
      ({ group }) => group === 'Final',
    );
    if (finalIndex >= 0) {
      return {
        next: null,
        champion: winners[finalIndex],
        updatedBlueprints: blueprints,
      };
    }

    // Ronda única de cruces directos (ej. 12 -> 6 ganadores + 2 mejores perdedores = 8)
    if (currentBp?.kind === 'knockout' && currentBp.singleRound) {
      const luckyCount = currentBp.luckyLosers ?? 0;
      const teamOrder = current.groups.flatMap((g) => g.teams);
      const rankedLosers = [...outcomes]
        .sort(
          (a, b) =>
            Number(b.lostOnPenalties) - Number(a.lostOnPenalties) ||
            b.loserGoalDiff - a.loserGoalDiff ||
            b.loserGoalsFor - a.loserGoalsFor ||
            teamOrder.indexOf(a.loser) - teamOrder.indexOf(b.loser),
        )
        .slice(0, luckyCount)
        .map((o) => o.loser);

      const advancing = [...winners, ...rankedLosers];
      if (advancing.length === 1) {
        return {
          next: null,
          champion: advancing[0],
          updatedBlueprints: blueprints,
        };
      }
      const nextBp = options?.nextStage ?? blueprints[bpIdx + 1];
      if (!nextBp) {
        fail(
          `Clasificaron ${advancing.length} equipos de los cruces directos. Define la siguiente etapa.`,
        );
      }
      const nextList = [...blueprints];
      nextList[bpIdx + 1] = nextBp;
      validateStageBlueprint(
        nextBp,
        advancing.length,
        bpIdx + 1 < nextList.length - 1,
        bpIdx + 2,
        mode,
      );
      return {
        next: buildStageFromBlueprint(
          nextBp,
          advancing,
          current.id + 1,
          bpIdx + 1,
          plan.seed,
          nextList.length,
        ),
        champion: null,
        updatedBlueprints: nextList,
      };
    }

    const remaining = [...winners, ...current.byes];

    // Si era un repechaje (play_in), pasamos directamente al siguiente blueprint
    if (current.isPlayIn) {
      const nextBp = options?.nextStage ?? blueprints[bpIdx + 1];
      if (!nextBp) {
        fail('Configura la siguiente etapa después del repechaje.');
      }
      const nextList = [...blueprints];
      nextList[bpIdx + 1] = nextBp;
      validateStageBlueprint(
        nextBp,
        remaining.length,
        bpIdx + 1 < nextList.length - 1,
        bpIdx + 2,
        mode,
      );
      return {
        next: buildStageFromBlueprint(
          nextBp,
          remaining,
          current.id + 1,
          bpIdx + 1,
          plan.seed,
          nextList.length,
        ),
        champion: null,
        updatedBlueprints: nextList,
      };
    }

    const stopAt =
      currentBp?.kind === 'knockout' ? (currentBp.stopAtTeams ?? 1) : 1;
    const thirdPlace =
      currentBp?.kind === 'knockout'
        ? (currentBp.thirdPlaceMatch ?? true)
        : true;

    if (remaining.length === 1) {
      return { next: null, champion: remaining[0], updatedBlueprints: blueprints };
    }

    // Si la eliminatoria alcanzó su cantidad de clasificados (stopAt > 1), pasar al siguiente blueprint
    if (stopAt > 1 && remaining.length <= stopAt) {
      const nextBp = options?.nextStage ?? blueprints[bpIdx + 1];
      if (!nextBp) {
        fail(
          `Quedan ${remaining.length} equipos clasificados. Define cómo continúa la siguiente etapa.`,
        );
      }
      const nextList = [...blueprints];
      nextList[bpIdx + 1] = nextBp;
      validateStageBlueprint(
        nextBp,
        remaining.length,
        bpIdx + 1 < nextList.length - 1,
        bpIdx + 2,
        mode,
      );
      return {
        next: buildStageFromBlueprint(
          nextBp,
          remaining,
          current.id + 1,
          bpIdx + 1,
          plan.seed,
          nextList.length,
        ),
        champion: null,
        updatedBlueprints: nextList,
      };
    }

    // Continuar con la siguiente ronda de la misma llave eliminatoria
    if (
      remaining.length === 2 &&
      current.fixtures.length === 2 &&
      current.byes.length === 0 &&
      thirdPlace
    ) {
      return {
        next: buildMedalStage(winners, losers, current.id + 1, bpIdx),
        champion: null,
        updatedBlueprints: blueprints,
      };
    }

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

    const nextKo = knockoutStage(remaining, current.id + 1, nextSides);
    return {
      next: { ...nextKo, blueprintIndex: bpIdx },
      champion: null,
      updatedBlueprints: blueprints,
    };
  }

  // --- CASO 2: ETAPA ACTUAL ES DE PUNTOS (LIGA O GRUPOS) ---
  const tables = current.groups.map((g) =>
    standings(current, g.name, scores, plan.teamIds),
  );

  // El organizador eligió cerrar el torneo aquí
  if (options?.finishTournament) {
    if (current.groups.length > 1) {
      fail(
        'No puedes finalizar el torneo directamente desde varios grupos. Configura una siguiente etapa para definir el campeón.',
      );
    }
    return {
      next: null,
      champion: tables[0][0].teamId,
      updatedBlueprints: blueprints.slice(0, bpIdx + 1),
    };
  }

  const nextBp = options?.nextStage ?? blueprints[bpIdx + 1] ?? null;

  // Sin siguiente etapa definida
  if (!nextBp) {
    if (current.groups.length === 1) {
      return {
        next: null,
        champion: tables[0][0].teamId,
        updatedBlueprints: blueprints,
      };
    }
    fail(
      'Esta etapa tiene varios grupos. Configura cómo continúan los clasificados en la siguiente etapa.',
    );
  }

  // Determinar clasificados (permitiendo override al avanzar)
  const bpPoints = currentBp?.kind === 'points' ? currentBp : null;
  const rawQualifiers =
    options?.qualifiersPerGroup ?? bpPoints?.qualifiersPerGroup ?? null;
  const extras = options?.extraQualifiers ?? bpPoints?.extraQualifiers ?? 0;
  const extraMode: ExtraQualifierMode =
    options?.extraQualifierMode ?? bpPoints?.extraQualifierMode ?? 'direct';

  const smallestGroup = Math.min(...current.groups.map((g) => g.teams.length));
  if (
    rawQualifiers === null ||
    !Number.isInteger(rawQualifiers) ||
    rawQualifiers < 1 ||
    rawQualifiers > smallestGroup
  ) {
    return fail(
      `Indica una cantidad válida de clasificados por grupo (entre 1 y ${smallestGroup}).`,
    );
  }
  const qualifiers: number = rawQualifiers;
  if (extras > 0) {
    if (current.groups.length < 2 || extras > current.groups.length) {
      fail(
        `Los clasificados adicionales deben ser entre 0 y ${current.groups.length}.`,
      );
    }
    if (qualifiers >= smallestGroup) {
      fail('No quedan puestos disponibles para clasificados adicionales.');
    }
  }

  // Actualizar el blueprint actual y el siguiente si el organizador los editó/agregó
  const updatedBlueprints = [...blueprints];
  if (bpPoints) {
    updatedBlueprints[bpIdx] = {
      ...bpPoints,
      qualifiersPerGroup: qualifiers,
      ...(extras > 0
        ? { extraQualifiers: extras, extraQualifierMode: extraMode }
        : { extraQualifiers: 0 }),
    };
  }
  if (options?.nextStage) {
    updatedBlueprints[bpIdx + 1] = options.nextStage;
  }

  // Orden: primero por posición, luego por grupo (A1, B1, A2, B2...)
  const qualified = Array.from({ length: qualifiers }, (_, rank) =>
    tables.map((table) => table[rank]?.teamId).filter(Boolean),
  ).flat() as string[];

  const bestRemaining = extras
    ? rankAcrossGroups(tables, qualifiers).slice(0, extras)
    : [];

  const totalAdvancing = qualified.length + bestRemaining.length;
  const playIn = extras > 0 && extraMode === 'play_in';
  const incomingNext = playIn ? totalAdvancing - extras : totalAdvancing;

  validateStageBlueprint(
    nextBp,
    incomingNext,
    bpIdx + 1 < updatedBlueprints.length - 1,
    bpIdx + 2,
    mode,
  );

  if (playIn) {
    const defenders = qualified.slice(-extras);
    const direct = qualified.slice(0, qualified.length - extras);
    const playInRes = playInStage(
      [...direct],
      [...defenders, ...bestRemaining],
      current.id + 1,
    );
    return {
      next: { ...playInRes, blueprintIndex: bpIdx, isPlayIn: true },
      champion: null,
      updatedBlueprints,
    };
  }

  const advancing = [...qualified, ...bestRemaining];
  return {
    next: buildStageFromBlueprint(
      nextBp,
      advancing,
      current.id + 1,
      bpIdx + 1,
      plan.seed,
      updatedBlueprints.length,
    ),
    champion: null,
    updatedBlueprints,
  };
}
