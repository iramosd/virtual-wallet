import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  imports: [
       HttpModule.registerAsync({
        imports: [],
        inject: [ConfigService], 
        useFactory: async (configService: ConfigService) => ({
          baseURL: `${configService.get<string>('dataAccessApiUrl')}/sessions`, 
          headers: {
            'x-api-key': configService.get<string>('apiKey') as string,
          },
        }),
      }),
    ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
