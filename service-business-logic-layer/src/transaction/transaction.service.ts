import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly httpService: HttpService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/', createTransactionDto)
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

  async findByWalletId(walletId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/wallet/${walletId}`)
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

  async findByReference(reference: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/reference/${reference}`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/status/${status}`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}`, updateTransactionDto)
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

  async approveTransaction(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}/approve`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async cancelTransaction(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`/${id}/cancel`)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
