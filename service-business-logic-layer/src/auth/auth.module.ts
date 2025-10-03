import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
