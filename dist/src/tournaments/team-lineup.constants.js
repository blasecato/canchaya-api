"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORMATIONS_BY_PLAYERS = void 0;
exports.parsePlayersOnPitch = parsePlayersOnPitch;
exports.getFormationsForModality = getFormationsForModality;
exports.buildSlotKeysForFormation = buildSlotKeysForFormation;
exports.extractFirstName = extractFirstName;
exports.assignFallbackJerseyNumber = assignFallbackJerseyNumber;
const node_crypto_1 = require("node:crypto");
exports.FORMATIONS_BY_PLAYERS = {
    5: ['2-2', '1-2-1', '2-1-1', '1-1-2', '3-1'],
    6: ['2-2-1', '2-1-2', '3-1-1', '1-3-1', '1-2-2'],
    7: ['2-3-1', '3-2-1', '2-2-2', '3-1-2', '1-3-2', '2-1-3'],
    8: ['3-3-1', '3-2-2', '2-3-2', '2-4-1', '4-2-1', '3-1-3'],
    9: ['3-3-2', '3-4-1', '4-3-1', '4-2-2', '2-4-2', '3-2-3'],
    10: ['4-3-2', '3-4-2', '4-4-1', '3-3-3', '4-2-3', '3-2-4'],
    11: [
        '4-4-2',
        '4-3-3',
        '4-2-3-1',
        '3-4-3',
        '4-1-3-2',
        '4-3-1-2',
        '3-4-1-2',
        '3-3-2-2',
    ],
};
function parsePlayersOnPitch(modality) {
    if (!modality)
        return 11;
    const match = modality.match(/\b(5|6|7|8|9|10|11)\b/);
    if (!match)
        return 11;
    const parsed = Number(match[1]);
    return parsed >= 5 && parsed <= 11 ? parsed : 11;
}
function getFormationsForModality(playersOnPitch) {
    return exports.FORMATIONS_BY_PLAYERS[playersOnPitch] ?? exports.FORMATIONS_BY_PLAYERS[11];
}
function buildSlotKeysForFormation(formation) {
    const lines = formation.split('-').map((n) => Number(n));
    const keys = ['gk'];
    lines.forEach((count, lineIdx) => {
        for (let i = 0; i < count; i++) {
            keys.push(`l${lineIdx}-${i}`);
        }
    });
    return keys;
}
function extractFirstName(fullName) {
    const trimmed = fullName.trim();
    if (!trimmed)
        return 'Jugador';
    return trimmed.split(/\s+/)[0];
}
function assignFallbackJerseyNumber(seedKey, usedNumbers) {
    const digest = (0, node_crypto_1.createHash)('sha256').update(seedKey).digest();
    const start = (digest.readUInt16BE(0) % 99) + 1;
    for (let offset = 0; offset < 99; offset++) {
        const candidate = ((start - 1 + offset) % 99) + 1;
        if (!usedNumbers.has(candidate)) {
            usedNumbers.add(candidate);
            return candidate;
        }
    }
    return 99;
}
//# sourceMappingURL=team-lineup.constants.js.map