"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPowerOfTwo = exports.DIRECT_KNOCKOUT_SIZES = exports.hasFinalLeague = exports.hasGroups = exports.FORMAT_LABELS = exports.FORMATS = void 0;
exports.validateConfig = validateConfig;
exports.shuffled = shuffled;
exports.splitGroups = splitGroups;
exports.roundRobin = roundRobin;
exports.pointsStage = pointsStage;
exports.knockoutStage = knockoutStage;
exports.firstStage = firstStage;
exports.estimate = estimate;
exports.standings = standings;
exports.resolveStage = resolveStage;
exports.suggestions = suggestions;
exports.readPlan = readPlan;
exports.competitorTeamId = competitorTeamId;
exports.assignedTeamIds = assignedTeamIds;
exports.hasUnfilledSlots = hasUnfilledSlots;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
exports.FORMATS = [
    'league',
    'league_knockout',
    'knockout',
    'groups_knockout',
    'league_final',
    'groups_final',
];
exports.FORMAT_LABELS = {
    league: 'Liga',
    league_knockout: 'Mixto · Liga + eliminación directa',
    knockout: 'Eliminación directa',
    groups_knockout: 'Grupos + eliminatorias',
    league_final: 'Liga + liguilla final',
    groups_final: 'Grupos + liguilla final',
};
const fail = (message) => {
    throw new common_1.BadRequestException(message);
};
const hasGroups = (format) => format.startsWith('groups_');
exports.hasGroups = hasGroups;
const hasFinalLeague = (format) => format.endsWith('_final');
exports.hasFinalLeague = hasFinalLeague;
exports.DIRECT_KNOCKOUT_SIZES = [8, 16, 32];
const isPowerOfTwo = (count) => Number.isInteger(count) && count > 0 && Number.isInteger(Math.log2(count));
exports.isPowerOfTwo = isPowerOfTwo;
function validateConfig(config, count) {
    if (!Number.isInteger(count) || count < 6)
        fail('Se necesitan al menos seis equipos aprobados.');
    if (!exports.FORMATS.includes(config.format) ||
        ![1, 2].includes(config.legs) ||
        ![1, 2].includes(config.finalLegs))
        fail('Elige un formato válido y una o dos vueltas.');
    if (!Number.isInteger(config.groups) || !Number.isInteger(config.qualifiers))
        fail('Los grupos y clasificados deben ser enteros.');
    if ((0, exports.hasGroups)(config.format)) {
        if (config.groups < 2 || config.groups > Math.floor(count / 3))
            fail('Cada grupo debe tener al menos tres equipos.');
        if (config.qualifiers < 1 ||
            config.qualifiers >= Math.floor(count / config.groups))
            fail('Debe clasificar al menos uno y quedar eliminado al menos uno por grupo.');
    }
    else if (config.groups !== 1)
        fail('Este formato utiliza un solo grupo.');
    if (config.format === 'knockout' &&
        !exports.DIRECT_KNOCKOUT_SIZES.includes(count))
        fail('La eliminación directa está disponible únicamente para 8, 16 o 32 equipos.');
    if (['league', 'knockout'].includes(config.format)) {
        if (config.qualifiers !== 1)
            fail('Este formato no requiere clasificación a una segunda etapa.');
    }
    else {
        const advancing = config.qualifiers * ((0, exports.hasGroups)(config.format) ? config.groups : 1);
        if (advancing < ((0, exports.hasFinalLeague)(config.format) ? 3 : 2) ||
            advancing >= count)
            fail('La cantidad de clasificados no es válida para la etapa final.');
        if (config.format === 'league_knockout' && !(0, exports.isPowerOfTwo)(advancing))
            fail('La fase eliminatoria del formato mixto debe clasificar una potencia de dos: 2, 4, 8, 16, 32…');
    }
    if (estimate(config, count).totalMatches > 10000)
        fail('Esta configuración supera los 10.000 partidos. Usa grupos o eliminación directa.');
}
function shuffled(ids, seed) {
    return [...ids].sort((a, b) => {
        const hash = (id) => (0, node_crypto_1.createHash)('sha256').update(`${seed}:${id}`).digest('hex');
        return hash(a).localeCompare(hash(b)) || a.localeCompare(b);
    });
}
function splitGroups(ids, count) {
    const groups = Array.from({ length: count }, (_, i) => ({
        name: count === 1 ? 'General' : `Grupo ${i + 1}`,
        teams: [],
    }));
    ids.forEach((id, i) => groups[i % count].teams.push(id));
    return groups;
}
function roundRobin(ids, legs, stageId, group) {
    const rotation = [...ids];
    if (rotation.length % 2)
        rotation.push(null);
    const rounds = rotation.length - 1;
    const first = [];
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
        rotation.splice(1, 0, rotation.pop());
    }
    return legs === 1
        ? first
        : [
            ...first,
            ...first.map((f) => ({
                ...f,
                key: `${f.key}:return`,
                home: f.away,
                away: f.home,
                round: f.round + rounds,
            })),
        ];
}
function pointsStage(ids, groups, legs, id, label) {
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
function knockoutStage(ids, id, previousSides) {
    const fixtures = [];
    const byes = [];
    let groups;
    if (ids.length === 2) {
        groups = [{ name: 'Final', teams: ids }];
        fixtures.push({
            key: `${id}:knockout:0`,
            home: ids[0],
            away: ids[1],
            round: 1,
            group: 'Final',
        });
    }
    else if (!previousSides) {
        const pairs = Array.from({ length: Math.floor(ids.length / 2) }, (_, index) => [ids[index], ids[ids.length - 1 - index]]);
        const leftPairCount = Math.ceil(pairs.length / 2);
        const sideNames = ['Lado izquierdo', 'Lado derecho'];
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
    }
    else {
        groups = previousSides.map((side) => ({
            name: side.name,
            teams: [...side.teams],
        }));
        for (const group of groups) {
            const playing = [...group.teams];
            if (playing.length % 2 !== 0)
                byes.push(playing.shift());
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
    const label = ids.length === 2
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
function medalStage(finalists, thirdPlaceTeams, id) {
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
function firstStage(config, ids) {
    return config.format === 'knockout'
        ? knockoutStage(ids, 1)
        : pointsStage(ids, (0, exports.hasGroups)(config.format) ? config.groups : 1, config.legs, 1, (0, exports.hasGroups)(config.format) ? 'Fase de grupos' : 'Liga inicial');
}
function estimate(config, count) {
    const sizes = Array.from({ length: (0, exports.hasGroups)(config.format) ? config.groups : 1 }, (_, i) => Math.floor(count / ((0, exports.hasGroups)(config.format) ? config.groups : 1)) +
        (i < count % ((0, exports.hasGroups)(config.format) ? config.groups : 1) ? 1 : 0));
    const initial = config.format === 'knockout'
        ? count - 1
        : sizes.reduce((sum, n) => sum + ((n * (n - 1)) / 2) * config.legs, 0);
    const qualified = config.qualifiers * ((0, exports.hasGroups)(config.format) ? config.groups : 1);
    const extra = ['league', 'knockout'].includes(config.format)
        ? 0
        : (0, exports.hasFinalLeague)(config.format)
            ? ((qualified * (qualified - 1)) / 2) * config.finalLegs
            : qualified - 1;
    const eliminationEntrants = config.format === 'knockout'
        ? count
        : config.format.endsWith('_knockout')
            ? qualified
            : 0;
    const thirdPlaceMatch = eliminationEntrants >= 4 && (0, exports.isPowerOfTwo)(eliminationEntrants) ? 1 : 0;
    return {
        totalMatches: initial + extra + thirdPlaceMatch,
        minimumMatches: config.format === 'knockout' ? 1 : (Math.min(...sizes) - 1) * config.legs,
        groupSizes: config.format === 'knockout' ? [] : sizes,
        qualified: ['league', 'knockout'].includes(config.format) ? 0 : qualified,
        byes: 0,
    };
}
function standings(stage, group, scores, drawOrder) {
    const ids = stage.groups.find((g) => g.name === group).teams;
    const rows = new Map(ids.map((id) => [
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
    ]));
    const scoreMap = new Map(scores.map((s) => [s.key, s]));
    for (const f of stage.fixtures.filter((f) => f.group === group)) {
        const s = scoreMap.get(f.key);
        if (!s ||
            s.status !== 'played' ||
            s.homeScore === null ||
            s.awayScore === null)
            continue;
        const home = rows.get(f.home);
        const away = rows.get(f.away);
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
        }
        else {
            const winner = s.homeScore > s.awayScore ? home : away;
            const loser = winner === home ? away : home;
            winner.wins++;
            winner.points += 3;
            loser.losses++;
        }
    }
    return [...rows.values()].sort((a, b) => b.points - a.points ||
        b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) ||
        b.goalsFor - a.goalsFor ||
        a.drawOrder - b.drawOrder);
}
function resolveStage(plan, scores) {
    const current = plan.stages.at(-1);
    if (current.resolved || plan.champion)
        fail('Esta etapa ya fue resuelta.');
    const map = new Map(scores.map((s) => [s.key, s]));
    if (current.fixtures.some((f) => {
        const s = map.get(f.key);
        return (!s ||
            s.status !== 'played' ||
            s.homeScore === null ||
            s.awayScore === null);
    }))
        fail('Finaliza todos los partidos de la etapa antes de avanzar. Los cancelados deben reprogramarse.');
    let qualified;
    if (current.kind === 'knockout') {
        const outcomes = current.fixtures.map((f) => {
            const s = map.get(f.key);
            if (s.homeScore !== s.awayScore) {
                const homeWins = s.homeScore > s.awayScore;
                return {
                    winner: homeWins ? f.home : f.away,
                    loser: homeWins ? f.away : f.home,
                };
            }
            if (s.homePenalties === null ||
                s.awayPenalties === null ||
                s.homePenalties === s.awayPenalties)
                return fail('Resuelve los empates de eliminación directa mediante penaltis.');
            const homeWins = s.homePenalties > s.awayPenalties;
            return {
                winner: homeWins ? f.home : f.away,
                loser: homeWins ? f.away : f.home,
            };
        });
        const winners = outcomes.map(({ winner }) => winner);
        const losers = outcomes.map(({ loser }) => loser);
        const finalIndex = current.fixtures.findIndex(({ group }) => group === 'Final');
        if (finalIndex >= 0)
            return { next: null, champion: winners[finalIndex] };
        qualified = [...winners, ...current.byes];
        if (qualified.length === 2 &&
            current.fixtures.length === 2 &&
            current.byes.length === 0)
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
    const tables = current.groups.map((g) => standings(current, g.name, scores, plan.teamIds));
    if (plan.config.format === 'league' || current.id > 1)
        return { next: null, champion: tables[0][0].teamId };
    qualified = Array.from({ length: plan.config.qualifiers }, (_, rank) => tables.map((table) => table[rank].teamId)).flat();
    return {
        next: (0, exports.hasFinalLeague)(plan.config.format)
            ? pointsStage(qualified, 1, plan.config.finalLegs, current.id + 1, 'Liguilla final')
            : knockoutStage(qualified, current.id + 1),
        champion: null,
    };
}
function suggestions(count) {
    if (count < 6)
        return [];
    const configs = [
        { format: 'league', legs: 1, groups: 1, qualifiers: 1, finalLegs: 1 },
        { format: 'league', legs: 2, groups: 1, qualifiers: 1, finalLegs: 1 },
        {
            format: 'league_knockout',
            legs: 1,
            groups: 1,
            qualifiers: 4,
            finalLegs: 1,
        },
        ...(exports.DIRECT_KNOCKOUT_SIZES.includes(count)
            ? [
                {
                    format: 'knockout',
                    legs: 1,
                    groups: 1,
                    qualifiers: 1,
                    finalLegs: 1,
                },
            ]
            : []),
    ];
    return configs
        .filter((config) => estimate(config, count).totalMatches <= 10000)
        .map((config) => ({
        config,
        label: `${exports.FORMAT_LABELS[config.format]}${(0, exports.hasGroups)(config.format) ? ` · ${config.groups} grupos` : config.format === 'league' ? ` · ${config.legs} vuelta${config.legs === 1 ? '' : 's'}` : ''}`,
        ...estimate(config, count),
    }));
}
function readPlan(value) {
    return value &&
        typeof value === 'object' &&
        'version' in value &&
        (value.version === 1 || value.version === 2)
        ? value
        : null;
}
function competitorTeamId(plan, competitorId) {
    if (plan.version === 1 || !plan.slots)
        return competitorId;
    return plan.slots.find(({ id }) => id === competitorId)?.teamId ?? null;
}
function assignedTeamIds(plan) {
    return plan.teamIds
        .map((competitorId) => competitorTeamId(plan, competitorId))
        .filter((teamId) => teamId !== null);
}
function hasUnfilledSlots(plan) {
    return (plan.version === 2 && Boolean(plan.slots?.some(({ teamId }) => !teamId)));
}
//# sourceMappingURL=competition.engine.js.map