import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;
  
  @IsNotEmpty()
  @IsDate()
  expiresAt: Date;
}
