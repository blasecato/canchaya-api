import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { RosterImportDto } from './dto/roster-import.dto';
import { RosterImportResultDto } from './dto/roster-import-result.dto';
export declare class RosterImportService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    import(tournamentId: bigint, dto: RosterImportDto, actorId: bigint): Promise<RosterImportResultDto>;
    private loadTournament;
    private normalizeName;
    private findDuplicatedSheets;
    private rejectSheet;
    private toPlayerResult;
    private importSheet;
    private resolveTeam;
    private preparePlayers;
    private persistSheet;
}
