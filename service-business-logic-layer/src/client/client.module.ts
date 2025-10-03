import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [
     HttpModule.registerAsync({
      imports: [],
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        baseURL: `${configService.get<string>('dataAccessApiUrl')}/clients`, 
        headers: {
          'x-api-key': configService.get<string>('apiKey') as string,
        },
      }),
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
