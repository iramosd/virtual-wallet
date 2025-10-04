import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientService } from '../client/client.service';
import { WalletService } from '../wallet/wallet.service';
import { ConfigService } from '@nestjs/config';

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
