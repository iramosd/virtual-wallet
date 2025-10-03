import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientService } from '../client/client.service';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}

  signUp(signUpDto: SignUpDto) {
    const { phone, ...clientData } = signUpDto;
    const client = this.clientService.create(clientData);
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
