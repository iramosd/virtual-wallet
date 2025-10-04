import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(private readonly httpService: HttpService) {}

  async create(createTokenDto: CreateTokenDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/', createTokenDto)
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

  async findByType(type: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/type/${type}`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findActiveTokens(clientId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/client/${clientId}/active`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}`, updateTokenDto)
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

  async deactivateToken(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}/deactivate`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async useToken(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}/use`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async revokeAllClientTokens(clientId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/client/${clientId}/revoke-all`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
