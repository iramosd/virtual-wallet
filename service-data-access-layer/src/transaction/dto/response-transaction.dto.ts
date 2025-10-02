import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ResponseTransactionDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  description?: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  sessionId: string;
}

