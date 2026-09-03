"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBcryptPassword = IsBcryptPassword;
const bcryptjs_1 = require("bcryptjs");
const class_validator_1 = require("class-validator");
function IsBcryptPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBcryptPassword',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && !(0, bcryptjs_1.truncates)(value);
                },
                defaultMessage(arguments_) {
                    return `${arguments_.property} no puede superar 72 bytes en UTF-8`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-bcrypt-password.decorator.js.map