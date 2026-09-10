import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDisciplinaryAppealDto {
  @ApiProperty({ example: 'Solicito revisar la decisión porque...' })
  @IsString()
  @MinLength(10)
  @MaxLength(3000)
  message: string;
}
