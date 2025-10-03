import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResponseClientDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  walletId?: string | null;
}
