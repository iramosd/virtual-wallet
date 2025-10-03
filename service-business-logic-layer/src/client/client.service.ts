import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientService {

  constructor(private readonly httpService: HttpService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/', createClientDto)
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/')
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/${id}`)
      );

      return response.data;      
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: string) {
    return `This action removes a #${id} client`;
  }
}
