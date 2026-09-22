import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import {
  AdvanceCompetitionDto,
  PreviewCompetitionDto,
} from './competition.dto';
import { CompetitionService } from './competition.service';

@ApiTags('Competition planning')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE')
@Controller('tournaments/:id/competition')
export class CompetitionController {
  constructor(private readonly service: CompetitionService) {}
  @Get() get(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.service.get(id, req.auth.userId);
  }
  @Get('options') @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN') options(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.service.options(id, req.auth.userId);
  }
  @Post('preview') @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN') preview(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() req: AuthenticatedRequest,
    @Body() dto: PreviewCompetitionDto,
  ) {
    return this.service.preview(id, req.auth.userId, dto);
  }
  @Post() @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN') generate(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() req: AuthenticatedRequest,
    @Body() dto: PreviewCompetitionDto,
  ) {
    return this.service.generate(id, req.auth.userId, dto);
  }
  @Post('advance') @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN') advance(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() req: AuthenticatedRequest,
    @Body() dto: AdvanceCompetitionDto,
  ) {
    return this.service.advance(id, req.auth.userId, dto);
  }
}
