"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRES_BIGINT_MAX = void 0;
exports.IsBigIntString = IsBigIntString;
const class_validator_1 = require("class-validator");
exports.POSTGRES_BIGINT_MAX = 9223372036854775807n;
function IsBigIntString(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBigIntString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return (typeof value === 'string' &&
                        value.length <= 19 &&
                        /^[1-9]\d*$/.test(value) &&
                        BigInt(value) <= exports.POSTGRES_BIGINT_MAX);
                },
                defaultMessage(arguments_) {
                    return `${arguments_.property} debe ser un bigint positivo válido enviado como texto`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-big-int-string.decorator.js.map