"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_player_dto_1 = require("./create-player.dto");
class UpdatePlayerDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_player_dto_1.CreatePlayerDto, ['password']), { skipNullProperties: false }) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePlayerDto = UpdatePlayerDto;
//# sourceMappingURL=update-player.dto.js.map