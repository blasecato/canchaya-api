import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { RosterImportDto } from './dto/roster-import.dto';
import { RosterImportResultDto } from './dto/roster-import-result.dto';
import { RosterImportService } from './roster-import.service';
export declare class RosterImportController {
    private readonly rosterImport;
    constructor(rosterImport: RosterImportService);
    import(tournamentId: bigint, dto: RosterImportDto, request: AuthenticatedRequest): Promise<RosterImportResultDto>;
}
