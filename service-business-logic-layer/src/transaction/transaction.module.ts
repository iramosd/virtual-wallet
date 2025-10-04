import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
       HttpModule.registerAsync({
        imports: [],
        inject: [ConfigService], 
        useFactory: async (configService: ConfigService) => ({
          baseURL: `${configService.get<string>('dataAccessApiUrl')}/transactions`, 
          headers: {
            'x-api-key': configService.get<string>('apiKey') as string,
          },
        }),
      }),
    ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
