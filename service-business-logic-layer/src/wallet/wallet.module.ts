import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
       HttpModule.registerAsync({
        imports: [],
        inject: [ConfigService], 
        useFactory: async (configService: ConfigService) => ({
          baseURL: `${configService.get<string>('dataAccessApiUrl')}/wallets`, 
          headers: {
            'x-api-key': configService.get<string>('apiKey') as string,
          },
        }),
      }),
    ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
