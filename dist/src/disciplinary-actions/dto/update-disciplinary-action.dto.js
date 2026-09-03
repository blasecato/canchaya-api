"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisciplinaryActionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_disciplinary_action_dto_1 = require("./create-disciplinary-action.dto");
class UpdateDisciplinaryActionDto extends (0, swagger_1.PartialType)(create_disciplinary_action_dto_1.CreateDisciplinaryActionDto, { skipNullProperties: false }) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateDisciplinaryActionDto = UpdateDisciplinaryActionDto;
//# sourceMappingURL=update-disciplinary-action.dto.js.map