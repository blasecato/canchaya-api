"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssociationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_association_dto_1 = require("./create-association.dto");
class UpdateAssociationDto extends (0, swagger_1.PartialType)(create_association_dto_1.CreateAssociationDto, {
    skipNullProperties: false,
}) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAssociationDto = UpdateAssociationDto;
//# sourceMappingURL=update-association.dto.js.map