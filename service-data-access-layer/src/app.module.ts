import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { ClientModule } from './client/client.module';
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
    ClientModule
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
