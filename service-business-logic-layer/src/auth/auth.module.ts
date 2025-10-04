import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { ClientModule } from '../client/client.module';
import { WalletModule } from '../wallet/wallet.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [ClientModule, WalletModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
