import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { FairPlayResponseDto } from './dto/fair-play-response.dto';
import { FairPlayService } from './fair-play.service';

@ApiTags('Juego limpio')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tournaments/:tournamentId/fair-play')
export class FairPlayController {
  constructor(private readonly fairPlay: FairPlayService) {}

  @Get()
  @ApiOperation({
    summary: 'Tabla de juego limpio: tarjetas acumuladas por equipo',
  })
  @ApiOkResponse({ type: FairPlayResponseDto })
  findByTournament(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<FairPlayResponseDto> {
    return this.fairPlay.findByTournament(tournamentId, request.auth.userId);
  }
}
