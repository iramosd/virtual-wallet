import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientService } from '../client/client.service';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}

  async signUp(signUpDto: SignUpDto) {
    let client = null;
    const { phone, ...clientData } = signUpDto;
    const { status, data } = await this.clientService.create(clientData);
    
    if (status === 'success' && typeof data?.id === 'string' && data?.id.length > 0) {
      client = data;

      
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
