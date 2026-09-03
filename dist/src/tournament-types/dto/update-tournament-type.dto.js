"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTournamentTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_tournament_type_dto_1 = require("./create-tournament-type.dto");
class UpdateTournamentTypeDto extends (0, swagger_1.PartialType)(create_tournament_type_dto_1.CreateTournamentTypeDto, { skipNullProperties: false }) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTournamentTypeDto = UpdateTournamentTypeDto;
//# sourceMappingURL=update-tournament-type.dto.js.map