import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from '../auth/auth.module';
import { SessionModule } from '../session/session.module';

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
      AuthModule, 
      SessionModule
    ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
