import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsNotEmpty()
  @IsDateString()
  expiresAt: string;
}

