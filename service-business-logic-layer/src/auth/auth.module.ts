import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientModule } from '../client/client.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [ClientModule, WalletModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
