"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerMatchStatDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_player_match_stat_dto_1 = require("./create-player-match-stat.dto");
class UpdatePlayerMatchStatDto extends (0, swagger_1.PartialType)(create_player_match_stat_dto_1.CreatePlayerMatchStatDto, { skipNullProperties: false }) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePlayerMatchStatDto = UpdatePlayerMatchStatDto;
//# sourceMappingURL=update-player-match-stat.dto.js.map