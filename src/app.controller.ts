import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Comprobar que la API está disponible' })
  @ApiOkResponse({
    description: 'La API está disponible.',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
