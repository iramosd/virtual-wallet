import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly httpService: HttpService) {}

  async create(createWalletDto: CreateWalletDto) {
    try {
         const response = await firstValueFrom(
           this.httpService.post('/', createWalletDto)
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
         console.log('Response Data:', response.data);
         return response.data;
       } catch (error) {
         throw error;
       };
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    try {
         const response = await firstValueFrom(
           this.httpService.patch(`/${id}`, updateWalletDto)
         );
   
         return response.data;
       } catch (error) {
         throw error;
       }
  }

  async remove(id: number) {
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
