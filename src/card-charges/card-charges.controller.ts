import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CardChargesService } from './card-charges.service';
import {
  PlayerCardChargesSummaryDto,
  TeamCardChargesResponseDto,
  UpdateCardChargePaymentDto,
} from './dto/card-charge-response.dto';

@ApiTags('Cobros por tarjetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('me/card-charges')
export class MyCardChargesController {
  constructor(private readonly cardCharges: CardChargesService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar mis tarjetas pendientes de pago' })
  @ApiOkResponse({ type: PlayerCardChargesSummaryDto })
  findMine(
    @Req() request: AuthenticatedRequest,
  ): Promise<PlayerCardChargesSummaryDto> {
    return this.cardCharges.findMyCharges(request.auth.userId);
  }
}

@ApiTags('Cobros por tarjetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
@Controller('tournaments/:tournamentId/card-charges')
export class CardChargesController {
  constructor(private readonly cardCharges: CardChargesService) {}

  @Get('teams/:teamId')
  @ApiOperation({
    summary: 'Consultar las tarjetas por cobrar de un equipo en el torneo',
  })
  @ApiOkResponse({ type: TeamCardChargesResponseDto })
  findByTeam(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('teamId', ParseBigIntPipe) teamId: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TeamCardChargesResponseDto> {
    return this.cardCharges.findByTeam(
      tournamentId,
      teamId,
      request.auth.userId,
    );
  }

  @Patch('payment')
  @ApiOperation({ summary: 'Marcar cobros como pagados o devolverlos a pendiente' })
  updatePayment(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Body() dto: UpdateCardChargePaymentDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<{ updated: number }> {
    return this.cardCharges.updatePayment(
      tournamentId,
      dto.chargeIds.map((id) => BigInt(id)),
      dto.paid,
      request.auth.userId,
    );
  }
}
