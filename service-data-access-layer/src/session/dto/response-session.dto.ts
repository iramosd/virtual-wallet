import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseSessionDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  expiresAt: Date;
}

