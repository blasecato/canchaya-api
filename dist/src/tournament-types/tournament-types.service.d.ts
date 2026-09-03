import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentTypeDto } from './dto/create-tournament-type.dto';
import { TournamentTypeResponseDto } from './dto/tournament-type-response.dto';
import { UpdateTournamentTypeDto } from './dto/update-tournament-type.dto';
export declare class TournamentTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTournamentTypeDto): Promise<TournamentTypeResponseDto>;
    findAll(): Promise<TournamentTypeResponseDto[]>;
    findOne(id: bigint): Promise<TournamentTypeResponseDto>;
    update(id: bigint, dto: UpdateTournamentTypeDto): Promise<TournamentTypeResponseDto>;
    remove(id: bigint): Promise<TournamentTypeResponseDto>;
    private findRecord;
    private assertPlayerRange;
    private assertUniqueName;
    private assertExistingTournamentsFitRange;
    private toResponse;
}
