import { CreatePlayerDto } from './create-player.dto';
declare const UpdatePlayerDto_base: import("@nestjs/common").Type<Partial<Omit<CreatePlayerDto, "password">>>;
export declare class UpdatePlayerDto extends UpdatePlayerDto_base {
}
export {};
