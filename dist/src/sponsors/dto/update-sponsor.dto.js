"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSponsorDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_sponsor_dto_1 = require("./create-sponsor.dto");
class UpdateSponsorDto extends (0, swagger_1.PartialType)(create_sponsor_dto_1.CreateSponsorDto, {
    skipNullProperties: false,
}) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSponsorDto = UpdateSponsorDto;
//# sourceMappingURL=update-sponsor.dto.js.map