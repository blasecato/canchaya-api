"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSuspensionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_suspension_dto_1 = require("./create-suspension.dto");
class UpdateSuspensionDto extends (0, swagger_1.PartialType)(create_suspension_dto_1.CreateSuspensionDto, {
    skipNullProperties: false,
}) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSuspensionDto = UpdateSuspensionDto;
//# sourceMappingURL=update-suspension.dto.js.map