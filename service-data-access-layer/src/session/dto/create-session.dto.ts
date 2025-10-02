import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsNotEmpty()
  @IsDateString()
  expiresAt: string;
}

