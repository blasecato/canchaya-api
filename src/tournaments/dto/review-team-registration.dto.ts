import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReviewTeamRegistrationDto {
  @IsIn(['approved', 'rejected', 'changes_requested'])
  status!: 'approved' | 'rejected' | 'changes_requested';

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;
}
