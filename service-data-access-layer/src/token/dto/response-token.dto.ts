import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseTokenDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  sessionId?: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  expiresAt: Date;
}

