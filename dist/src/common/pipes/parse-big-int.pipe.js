"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseBigIntPipe = void 0;
const common_1 = require("@nestjs/common");
const is_big_int_string_decorator_1 = require("../decorators/is-big-int-string.decorator");
let ParseBigIntPipe = class ParseBigIntPipe {
    transform(value) {
        if (value.length > 19 ||
            !/^[1-9]\d*$/.test(value) ||
            BigInt(value) > is_big_int_string_decorator_1.POSTGRES_BIGINT_MAX) {
            throw new common_1.BadRequestException('El identificador debe ser un entero válido.');
        }
        return BigInt(value);
    }
};
exports.ParseBigIntPipe = ParseBigIntPipe;
exports.ParseBigIntPipe = ParseBigIntPipe = __decorate([
    (0, common_1.Injectable)()
], ParseBigIntPipe);
//# sourceMappingURL=parse-big-int.pipe.js.map