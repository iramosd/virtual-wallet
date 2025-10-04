import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(private readonly httpService: HttpService) {}

  async create(createSessionDto: CreateSessionDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/', createSessionDto)
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

  async findByClientId(clientId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/client/${clientId}`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findByToken(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/token/${token}`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}`, updateSessionDto)
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

  async deactivateSession(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}/deactivate`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
