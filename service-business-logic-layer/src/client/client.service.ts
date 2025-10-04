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

  async update(id: string, updateClientDto: UpdateClientDto) {
     try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}`, updateClientDto)
      );

      return response.data;      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
     try {
      const response = await firstValueFrom(
        this.httpService.delete(`/${id}`)
      );

      return response.data;      
    } catch (error) {
      throw error;
    }
  }
}
