import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientService } from '../client/client.service';
import { WalletService } from '../wallet/wallet.service';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly clientService: ClientService, 
    private readonly walletService: WalletService, 
    private readonly configService: ConfigService) {}

  async signUp(signUpDto: SignUpDto) {
    let client;
    
    const { phone, ...clientData } = signUpDto;
    clientData.password = await bcrypt.hash(clientData.password, this.configService.get<number>('saltOrRounds') as number);
    const clientResponse = await this.clientService.create(clientData);

    if ( (clientResponse?.status ?? '') === 'success' && typeof clientResponse.data?.id === 'string') {
      const walletResponse = await this.walletService.create({ phone, balance: 0 });

      if ( (walletResponse?.status ?? '') === 'success' && typeof walletResponse.data?.id === 'string') {
        client = this.clientService.update(clientResponse.data.id, { walletId: walletResponse.data.id });
      }  
    }
  
    return client;
  }

  async login(loginAuthDto: LoginAuthDto) {
    let isMatch: boolean = false;

    const clientResponse = await this.clientService.findOneByEmail(loginAuthDto.email, true, true);

    if (clientResponse.status === 'success' && clientResponse.data) {
      isMatch = await bcrypt.compare(loginAuthDto.password, clientResponse.data.password);
    }
    
    if (isMatch) {
      delete clientResponse.data.password;
      return clientResponse;
    } else {
      throw new UnauthorizedException('Los datos no son correctos');
    }
  }

}
