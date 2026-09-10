import { ApiProperty } from '@nestjs/swagger';
import { USER_GENDERS, type UserGender } from '../user-gender.constants';

export class PublicUserResponseDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: '1020304050' })
  idNumber!: string;

  @ApiProperty({ example: 'CC' })
  documentType!: string;

  @ApiProperty({ example: 'María Pérez' })
  fullName!: string;

  @ApiProperty({ example: '1995-06-20', format: 'date' })
  birthDate!: string;

  @ApiProperty({ example: 'Pitalito', nullable: true })
  birthCity!: string | null;

  @ApiProperty({ enum: USER_GENDERS, nullable: true })
  gender!: UserGender | null;

  @ApiProperty({ example: 'maria@example.com', format: 'email' })
  email!: string;

  @ApiProperty({ example: '+573001234567', nullable: true })
  phone!: string | null;

  @ApiProperty({
    example: '/uploads/users/550e8400-e29b-41d4-a716-446655440000.webp',
    nullable: true,
  })
  photoUrl!: string | null;

  @ApiProperty({ example: 'active' })
  status!: string;

  @ApiProperty({
    example: 'Incumplimiento reiterado del reglamento.',
    nullable: true,
  })
  blockReason!: string | null;

  @ApiProperty({
    example: '2026-09-09T18:00:00.000Z',
    format: 'date-time',
    nullable: true,
  })
  blockedUntil!: string | null;

  @ApiProperty({ example: ['PLAYER'], type: [String] })
  roles!: string[];

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  updatedAt!: string;
}
