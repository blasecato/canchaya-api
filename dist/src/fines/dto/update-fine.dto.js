"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFineDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_fine_dto_1 = require("./create-fine.dto");
class UpdateFineDto extends (0, swagger_1.PartialType)(create_fine_dto_1.CreateFineDto, {
    skipNullProperties: false,
}) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateFineDto = UpdateFineDto;
//# sourceMappingURL=update-fine.dto.js.map