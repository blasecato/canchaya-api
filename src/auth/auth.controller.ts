import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
