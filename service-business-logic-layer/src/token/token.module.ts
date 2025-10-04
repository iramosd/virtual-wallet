import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
   imports: [
       HttpModule.registerAsync({
        imports: [],
        inject: [ConfigService], 
        useFactory: async (configService: ConfigService) => ({
          baseURL: `${configService.get<string>('dataAccessApiUrl')}/tokens`, 
          headers: {
            'x-api-key': configService.get<string>('apiKey') as string,
          },
        }),
      }),
    ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
