import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { ClientModule } from './client/client.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { SessionModule } from './session/session.module';
import { TokenModule } from './token/token.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApiKeyMiddleware } from './middlewares/api-key/api-key.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig], 
      isGlobal: true, 
      envFilePath: ['.env.local', '.env'],
    }), 
    PrismaModule,
    ClientModule,
    WalletModule,
    TransactionModule,
    SessionModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes('*');
  }
}
