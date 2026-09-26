import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AllowBlockedUser } from './decorators/allow-blocked-user.decorator';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import {
  ConfirmPasswordResetDto,
  PasswordResetConfirmationResponseDto,
  PasswordResetRequestResponseDto,
  PasswordResetVerificationResponseDto,
  RequestPasswordResetDto,
  VerifyPasswordResetCodeDto,
} from './dto/password-reset.dto';
import { PasswordResetService } from './password-reset.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con correo y contraseña' })
  @ApiOkResponse({
    description: 'Sesión iniciada correctamente.',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Formato de datos inválido.' })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas.' })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @AllowBlockedUser()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cerrar la sesión actual e invalidar su token' })
  @ApiOkResponse({
    description: 'Sesión cerrada correctamente.',
    type: LogoutResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido, expirado o revocado.',
  })
  logout(@Req() request: AuthenticatedRequest): Promise<LogoutResponseDto> {
    return this.authService.logout(request.auth);
  }
  @Post('password-reset/request')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Throttle({ default: { limit: 5, ttl: 900_000 } })
  @ApiOperation({
    summary: 'Solicitar un código para restablecer la contraseña',
  })
  @ApiAcceptedResponse({
    description: 'Solicitud registrada. La respuesta nunca revela si el correo existe.',
    type: PasswordResetRequestResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Formato de datos inválido.' })
  requestPasswordReset(
    @Body() dto: RequestPasswordResetDto,
    @Ip() ip: string,
  ): Promise<PasswordResetRequestResponseDto> {
    return this.passwordResetService.request(dto, ip);
  }

  @Post('password-reset/verify')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 900_000 } })
  @ApiOperation({ summary: 'Verificar el código recibido por correo' })
  @ApiOkResponse({
    description: 'Código válido: entrega el token para cambiar la contraseña.',
    type: PasswordResetVerificationResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Código inválido, vencido o agotado.' })
  verifyPasswordResetCode(
    @Body() dto: VerifyPasswordResetCodeDto,
  ): Promise<PasswordResetVerificationResponseDto> {
    return this.passwordResetService.verify(dto);
  }

  @Post('password-reset/confirm')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 900_000 } })
  @ApiOperation({ summary: 'Definir la nueva contraseña' })
  @ApiOkResponse({
    description: 'Contraseña actualizada y sesiones anteriores cerradas.',
    type: PasswordResetConfirmationResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Token inválido o vencido.' })
  confirmPasswordReset(
    @Body() dto: ConfirmPasswordResetDto,
  ): Promise<PasswordResetConfirmationResponseDto> {
    return this.passwordResetService.confirm(dto);
  }
}
