"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOptionalNonNullable = IsOptionalNonNullable;
const class_validator_1 = require("class-validator");
function IsOptionalNonNullable(validationOptions) {
    return (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined, validationOptions);
}
//# sourceMappingURL=is-optional-non-nullable.decorator.js.map