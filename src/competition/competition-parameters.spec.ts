import {
  pointsStage,
  rankAcrossGroups,
  validateConfig,
  type CompetitionConfig,
} from './competition.engine';

const config = (overrides: Partial<CompetitionConfig>): CompetitionConfig => ({
  format: 'league',
  legs: 1,
  groups: 1,
  qualifiers: 1,
  finalLegs: 1,
  ...overrides,
});

describe('Parámetros del torneo', () => {
  describe('liga por vueltas', () => {
    it('admite una, dos y tres vueltas', () => {
      [1, 2, 3].forEach((legs) => {
        expect(() => validateConfig(config({ legs }), 10)).not.toThrow();
      });
      expect(() => validateConfig(config({ legs: 4 }), 10)).toThrow(
        'entre una y tres vueltas',
      );
    });

    it('multiplica las fechas por cada vuelta sin repetir enfrentamientos', () => {
      const ids = ['a', 'b', 'c', 'd'];
      const unaVuelta = pointsStage(ids, 1, 1, 1, 'Liga');
      const tresVueltas = pointsStage(ids, 1, 3, 1, 'Liga');

      expect(unaVuelta.fixtures).toHaveLength(6);
      expect(tresVueltas.fixtures).toHaveLength(18);
      // Las claves son únicas: sin ellas los resultados se pisarían.
      expect(new Set(tresVueltas.fixtures.map(({ key }) => key)).size).toBe(18);
      // La segunda vuelta invierte la localía de la primera.
      const ida = tresVueltas.fixtures[0];
      const vuelta = tresVueltas.fixtures[6];
      expect(vuelta.home).toBe(ida.away);
      expect(vuelta.away).toBe(ida.home);
    });
  });

  describe('eliminación directa', () => {
    it('acepta llaves de 4, 8, 16 y 32 equipos', () => {
      [4, 8, 16, 32].forEach((count) => {
        expect(() =>
          validateConfig(config({ format: 'knockout' }), count),
        ).not.toThrow();
      });
    });

    it('rechaza una cantidad que no se reduce a uno y sugiere otro formato', () => {
      expect(() => validateConfig(config({ format: 'knockout' }), 12)).toThrow(
        'fase de grupos o de liga',
      );
    });
  });

  describe('grupos de distinto tamaño', () => {
    it('permite repartir 21 equipos en 4 grupos', () => {
      expect(() =>
        validateConfig(
          config({ format: 'groups_knockout', groups: 4, qualifiers: 2 }),
          21,
        ),
      ).not.toThrow();
    });

    it('reparte los equipos sobrantes entre los primeros grupos', () => {
      const ids = Array.from({ length: 21 }, (_item, index) => `t${index + 1}`);
      const stage = pointsStage(ids, 4, 1, 1, 'Fase de grupos');

      expect(stage.groups.map(({ teams }) => teams.length)).toEqual([6, 5, 5, 5]);
    });

    it('impide que clasifique todo el grupo más pequeño', () => {
      expect(() =>
        validateConfig(
          config({ format: 'groups_knockout', groups: 4, qualifiers: 5 }),
          21,
        ),
      ).toThrow('el más pequeño tendría 5 equipos');
    });

    it('exige que los clasificados armen una llave válida', () => {
      expect(() =>
        validateConfig(
          config({ format: 'groups_knockout', groups: 3, qualifiers: 2 }),
          21,
        ),
      ).toThrow('debe iniciar con 2, 4, 8, 16 o 32');
    });
  });
});

describe('Clasificados adicionales', () => {
  const grupos = (overrides: Partial<CompetitionConfig>): CompetitionConfig => ({
    format: 'groups_knockout',
    legs: 1,
    groups: 3,
    qualifiers: 2,
    finalLegs: 1,
    ...overrides,
  });

  it('completa el cuadro con los mejores siguientes puestos', () => {
    // 3 grupos × 2 = 6 clasificados: con 2 adicionales quedan 8 para el cuadro.
    expect(() =>
      validateConfig(
        grupos({ extraQualifiers: 2, extraQualifierMode: 'direct' }),
        18,
      ),
    ).not.toThrow();
  });

  it('permite resolverlo con una ronda de repechaje', () => {
    // 4 grupos × 2 = 8 + 2 adicionales: los 2 extras y 2 cupos juegan la previa
    // y el cuadro arranca con 8.
    expect(() =>
      validateConfig(
        grupos({
          groups: 4,
          extraQualifiers: 2,
          extraQualifierMode: 'play_in',
        }),
        24,
      ),
    ).not.toThrow();
  });

  it('no admite más adicionales que grupos', () => {
    expect(() =>
      validateConfig(
        grupos({ extraQualifiers: 4, extraQualifierMode: 'direct' }),
        18,
      ),
    ).toThrow('uno por grupo como máximo');
  });

  it('sigue exigiendo un cuadro válido con los adicionales incluidos', () => {
    expect(() =>
      validateConfig(
        grupos({ extraQualifiers: 1, extraQualifierMode: 'direct' }),
        18,
      ),
    ).toThrow('deja 7 equipos en el cuadro');
  });

  it('ordena los adicionales por puntos y diferencia de gol', () => {
    const tablas = [
      [
        { teamId: 'a1', points: 9, goalsFor: 8, goalsAgainst: 2 },
        { teamId: 'a2', points: 6, goalsFor: 5, goalsAgainst: 4 },
        { teamId: 'a3', points: 3, goalsFor: 4, goalsAgainst: 6 },
      ],
      [
        { teamId: 'b1', points: 9, goalsFor: 7, goalsAgainst: 1 },
        { teamId: 'b2', points: 6, goalsFor: 6, goalsAgainst: 3 },
        { teamId: 'b3', points: 4, goalsFor: 5, goalsAgainst: 5 },
      ],
    ] as unknown as Parameters<typeof rankAcrossGroups>[0];

    expect(rankAcrossGroups(tablas, 2)).toEqual(['b3', 'a3']);
  });
});
