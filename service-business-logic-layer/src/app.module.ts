import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { appConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      load: [() => appConfig], 
      isGlobal: true, 
      envFilePath: ['.env.local', '.env'],
    }), ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
