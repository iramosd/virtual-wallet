import { IsNotEmpty, IsString, IsNumber, isEmpty, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNumber()
  balance?: number;
}
