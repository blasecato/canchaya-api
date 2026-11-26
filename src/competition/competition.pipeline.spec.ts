import { BadRequestException } from '@nestjs/common';
import {
  buildStageFromBlueprint,
  configToBlueprints,
  describeBlueprints,
  resolvePipelineStage,
  validatePipeline,
  type StageBlueprint,
} from './competition.pipeline';
import { standings, type CompetitionPlan, type Score } from './competition.engine';

const makeTeams = (count: number) =>
  Array.from({ length: count }, (_, i) => `slot-${i + 1}`);

function playStageDeterministic(
  stage: CompetitionPlan['stages'][number],
): Score[] {
  return stage.fixtures.map((f) => {
    const homeNum = Number(f.home.replace('slot-', ''));
    const awayNum = Number(f.away.replace('slot-', ''));
    // Equipo con menor número siempre gana para resultados predecibles
    return {
      key: f.key,
      status: 'played',
      homeScore: homeNum < awayNum ? 2 : 0,
      awayScore: homeNum < awayNum ? 0 : 2,
      homePenalties: null,
      awayPenalties: null,
    };
  });
}

describe('competition.pipeline (v3 multi-stage engine)', () => {
  it('supports 18 teams -> League (12) -> 2 Groups of 6 (4 each) -> Knockout (8) -> Champion', () => {
    const blueprints: StageBlueprint[] = [
      {
        kind: 'points',
        label: 'Fase regular',
        groups: 1,
        legs: 1,
        qualifiersPerGroup: 12,
      },
      {
        kind: 'points',
        label: 'Cuadrangulares',
        groups: 2,
        legs: 1,
        seeding: 'snake',
        qualifiersPerGroup: 4,
      },
      {
        kind: 'knockout',
        label: 'Fase final',
        thirdPlaceMatch: true,
        pairing: 'seeded',
        stopAtTeams: 1,
      },
    ];

    const estimate = validatePipeline(blueprints, 18, 'planned');
    expect(estimate.stages).toHaveLength(3);
    expect(estimate.stages[0]).toMatchObject({
      incomingTeams: 18,
      outgoingTeams: 12,
      matches: 153,
    });
    expect(estimate.stages[1]).toMatchObject({
      incomingTeams: 12,
      outgoingTeams: 8,
      groupSizes: [6, 6],
      matches: 30,
    });
    expect(estimate.stages[2]).toMatchObject({
      incomingTeams: 8,
      outgoingTeams: 1,
      matches: 8,
    });
    expect(estimate.totalMatches).toBe(191);

    const teams = makeTeams(18);
    const stage1 = buildStageFromBlueprint(blueprints[0], teams, 1, 0, 'seed-1', 3);
    const plan: CompetitionPlan = {
      version: 3,
      config: { format: 'league', legs: 1, groups: 1, qualifiers: 12, finalLegs: 1 },
      organizationMode: 'planned',
      blueprints,
      seed: 'seed-1',
      teamIds: teams,
      stages: [stage1],
      champion: null,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      originalType: 'Liga',
      changeReason: null,
    };

    const allScores: Score[] = [];

    // Etapa 1: Liga de 18
    allScores.push(...playStageDeterministic(stage1));
    const r1 = resolvePipelineStage(plan, allScores);
    expect(r1.champion).toBeNull();
    expect(r1.next).not.toBeNull();
    expect(r1.next!.kind).toBe('points');
    expect(r1.next!.groups).toHaveLength(2);
    expect(r1.next!.groups[0].teams).toHaveLength(6);
    expect(r1.next!.groups[1].teams).toHaveLength(6);
    // Puntos reiniciados a 0 en la nueva etapa
    const stage2FreshTable = standings(r1.next!, 'Grupo 1', allScores, plan.teamIds);
    expect(stage2FreshTable.every((row) => row.points === 0 && row.played === 0)).toBe(true);

    plan.stages[0].resolved = true;
    plan.stages.push(r1.next!);

    // Etapa 2: 2 Grupos de 6 -> clasifican 4 por grupo (8)
    allScores.push(...playStageDeterministic(r1.next!));
    const r2 = resolvePipelineStage(plan, allScores);
    expect(r2.champion).toBeNull();
    expect(r2.next!.kind).toBe('knockout');
    expect(r2.next!.fixtures).toHaveLength(4); // Cuartos de final
    plan.stages[1].resolved = true;
    plan.stages.push(r2.next!);

    // Cuartos -> Semifinales
    allScores.push(...playStageDeterministic(r2.next!));
    const r3 = resolvePipelineStage(plan, allScores);
    expect(r3.next!.label).toBe('Semifinales');
    expect(r3.next!.fixtures).toHaveLength(2);
    plan.stages[2].resolved = true;
    plan.stages.push(r3.next!);

    // Semifinales -> Final y tercer puesto
    allScores.push(...playStageDeterministic(r3.next!));
    const r4 = resolvePipelineStage(plan, allScores);
    expect(r4.next!.label).toBe('Final y tercer puesto');
    expect(r4.next!.fixtures).toHaveLength(2);
    plan.stages[3].resolved = true;
    plan.stages.push(r4.next!);

    // Final -> Campeón
    allScores.push(...playStageDeterministic(r4.next!));
    const r5 = resolvePipelineStage(plan, allScores);
    expect(r5.next).toBeNull();
    expect(r5.champion).toBe('slot-1');
  });

  it('supports League -> eliminate teams -> another League -> Champion', () => {
    const blueprints: StageBlueprint[] = [
      { kind: 'points', label: 'Primera liga', groups: 1, legs: 1, qualifiersPerGroup: 6 },
      { kind: 'points', label: 'Segunda liga', groups: 1, legs: 1 },
    ];
    const estimate = validatePipeline(blueprints, 10, 'planned');
    expect(estimate.totalMatches).toBe(45 + 15);

    const teams = makeTeams(10);
    const stage1 = buildStageFromBlueprint(blueprints[0], teams, 1, 0, 'seed-2', 2);
    const plan: CompetitionPlan = {
      version: 3,
      config: { format: 'league_final', legs: 1, groups: 1, qualifiers: 6, finalLegs: 1 },
      organizationMode: 'planned',
      blueprints,
      seed: 'seed-2',
      teamIds: teams,
      stages: [stage1],
      champion: null,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      originalType: 'Liga',
      changeReason: null,
    };

    const scores = playStageDeterministic(stage1);
    const r1 = resolvePipelineStage(plan, scores);
    expect(r1.next!.kind).toBe('points');
    expect(r1.next!.groups).toHaveLength(1);
    expect(r1.next!.groups[0].teams).toHaveLength(6);

    plan.stages[0].resolved = true;
    plan.stages.push(r1.next!);

    scores.push(...playStageDeterministic(r1.next!));
    const r2 = resolvePipelineStage(plan, scores);
    expect(r2.next).toBeNull();
    expect(r2.champion).toBe('slot-1');
  });

  it('supports on_the_fly mode and overriding stage 2 when advancing', () => {
    const initialBlueprints: StageBlueprint[] = [
      { kind: 'points', label: 'Fase 1', groups: 1, legs: 1 },
    ];
    validatePipeline(initialBlueprints, 12, 'on_the_fly');

    const teams = makeTeams(12);
    const stage1 = buildStageFromBlueprint(initialBlueprints[0], teams, 1, 0, 'seed-3', 1);
    const plan: CompetitionPlan = {
      version: 3,
      config: { format: 'league', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
      organizationMode: 'on_the_fly',
      blueprints: initialBlueprints,
      seed: 'seed-3',
      teamIds: teams,
      stages: [stage1],
      champion: null,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      originalType: 'Liga',
      changeReason: null,
    };

    const scores = playStageDeterministic(stage1);

    // Al terminar la etapa 1, el organizador decide crear una etapa 2 de 2 grupos de 4 (8 clasificados)
    const r1 = resolvePipelineStage(plan, scores, {
      qualifiersPerGroup: 8,
      nextStage: {
        kind: 'points',
        label: 'Semifinales por grupos',
        groups: 2,
        legs: 1,
        seeding: 'snake',
      },
    });
    expect(r1.next!.kind).toBe('points');
    expect(r1.next!.groups).toHaveLength(2);
    expect(r1.next!.groups[0].teams).toHaveLength(4);
    expect(r1.updatedBlueprints).toHaveLength(2);
  });

  it('rejects invalid planned pipeline ending in multiple groups', () => {
    expect(() =>
      validatePipeline(
        [{ kind: 'points', groups: 2, legs: 1 }],
        8,
        'planned',
      ),
    ).toThrow(BadRequestException);
  });

  it('supports 18 teams -> League (12) -> Cross-match Blocks A vs B (6 winners + 2 lucky losers = 8) -> Knockout -> Champion', () => {
    const blueprints: StageBlueprint[] = [
      { kind: 'points', label: 'Liga regular', groups: 1, legs: 1, qualifiersPerGroup: 12 },
      {
        kind: 'knockout',
        label: 'Cruces Bloques A vs B',
        singleRound: true,
        pairing: 'parallel',
        luckyLosers: 2,
      },
      {
        kind: 'knockout',
        label: 'Cuadro final',
        thirdPlaceMatch: true,
        pairing: 'seeded',
        stopAtTeams: 1,
      },
    ];

    const estimate = validatePipeline(blueprints, 18, 'planned');
    expect(estimate.stages).toHaveLength(3);
    expect(estimate.stages[0]).toMatchObject({ incomingTeams: 18, outgoingTeams: 12, matches: 153 });
    expect(estimate.stages[1]).toMatchObject({ incomingTeams: 12, outgoingTeams: 8, matches: 6 });
    expect(estimate.stages[2]).toMatchObject({ incomingTeams: 8, outgoingTeams: 1, matches: 8 });
    expect(estimate.totalMatches).toBe(167);

    const teams = makeTeams(18);
    const stage1 = buildStageFromBlueprint(blueprints[0], teams, 1, 0, 'seed-cross', 3);
    const plan: CompetitionPlan = {
      version: 3,
      config: { format: 'league', legs: 1, groups: 1, qualifiers: 12, finalLegs: 1 },
      organizationMode: 'planned',
      blueprints,
      seed: 'seed-cross',
      teamIds: teams,
      stages: [stage1],
      champion: null,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      originalType: 'Multi-etapa personalizado',
      changeReason: null,
    };

    const allScores: Score[] = [...playStageDeterministic(stage1)];
    const r1 = resolvePipelineStage(plan, allScores);
    expect(r1.next!.fixtures).toHaveLength(6);
    // Verifica cruce paralelo A1 vs B1 (slot-1 vs slot-7), A2 vs B2 (slot-2 vs slot-8)...
    expect(r1.next!.fixtures[0]).toMatchObject({ home: 'slot-1', away: 'slot-7' });
    expect(r1.next!.fixtures[5]).toMatchObject({ home: 'slot-6', away: 'slot-12' });
    plan.stages[0].resolved = true;
    plan.stages.push(r1.next!);

    // En la ronda de cruces: slot-8 pierde en penaltis (1-1, 4-5) y slot-9 pierde 2-3 (dif -1, 2 GF) -> son los 2 mejores perdedores!
    const crossScores: Score[] = r1.next!.fixtures.map((f, idx) => {
      if (idx === 1) {
        return { key: f.key, status: 'played', homeScore: 1, awayScore: 1, homePenalties: 5, awayPenalties: 4 };
      }
      if (idx === 2) {
        return { key: f.key, status: 'played', homeScore: 3, awayScore: 2, homePenalties: null, awayPenalties: null };
      }
      return { key: f.key, status: 'played', homeScore: 3, awayScore: 0, homePenalties: null, awayPenalties: null };
    });
    allScores.push(...crossScores);

    const r2 = resolvePipelineStage(plan, allScores);
    expect(r2.next!.kind).toBe('knockout');
    expect(r2.next!.fixtures).toHaveLength(4); // Cuartos de final (8 equipos!)
    const advancingTeams = r2.next!.groups.flatMap((g) => g.teams);
    expect(advancingTeams).toHaveLength(8);
    expect(advancingTeams).toContain('slot-8'); // perdió en penaltis
    expect(advancingTeams).toContain('slot-9'); // perdió por 1 gol con 2 GF
  });

  it('converts legacy config to blueprints and describes pipeline cleanly', () => {
    const bps = configToBlueprints({
      format: 'groups_knockout',
      legs: 1,
      groups: 4,
      qualifiers: 2,
      finalLegs: 1,
    });
    expect(bps).toHaveLength(2);
    expect(describeBlueprints(bps, 'planned')).toBe(
      '4 grupos → Eliminación directa',
    );
  });
});
