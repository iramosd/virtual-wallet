import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  walletId: string;
}
