"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefereeAvailabilityDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_referee_availability_dto_1 = require("./create-referee-availability.dto");
class UpdateRefereeAvailabilityDto extends (0, swagger_1.PartialType)(create_referee_availability_dto_1.CreateRefereeAvailabilityDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRefereeAvailabilityDto = UpdateRefereeAvailabilityDto;
//# sourceMappingURL=update-referee-availability.dto.js.map