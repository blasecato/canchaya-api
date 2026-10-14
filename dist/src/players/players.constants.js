"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemporaryPlayerPassword = getTemporaryPlayerPassword;
const DEFAULT_TEMPORARY_PASSWORD = 'Asprofutpi2026*';
function getTemporaryPlayerPassword() {
    const configured = process.env.BULK_PLAYER_TEMPORARY_PASSWORD?.trim();
    return configured && configured.length >= 8
        ? configured
        : DEFAULT_TEMPORARY_PASSWORD;
}
//# sourceMappingURL=players.constants.js.map