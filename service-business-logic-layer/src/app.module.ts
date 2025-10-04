import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { appConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { WalletModule } from './wallet/wallet.module';
import { SessionModule } from './session/session.module';
import { TransactionModule } from './transaction/transaction.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      load: [() => appConfig], 
      isGlobal: true, 
      envFilePath: ['.env.local', '.env'],
    }), 
    ClientModule, 
    AuthModule, 
    WalletModule, 
    SessionModule,
    TransactionModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
