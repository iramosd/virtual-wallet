import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { SessionService } from '../session/session.service';
import { AuthService } from '../auth/auth.service';
import { Session } from '../session/entities/session.entity';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll(@Req() request: Request) {
  const sessionResponse: any = await this.authService.extractSessionFromAuthorizationHeader(request.headers.authorization as any);
    if (!sessionResponse) {
      throw new UnauthorizedException('Session response is null');
    }

    const transactions = await this.transactionService.findByWalletId(sessionResponse?.data.walletId ?? '');

    return transactions;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }

  /*
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Get('wallet/:walletId')
  findByWalletId(@Param('walletId') walletId: string) {
    return this.transactionService.findByWalletId(walletId);
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.transactionService.findByClientId(clientId);
  }

  @Get('reference/:reference')
  findByReference(@Param('reference') reference: string) {
    return this.transactionService.findByReference(reference);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.transactionService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Patch(':id/approve')
  approveTransaction(@Param('id') id: string) {
    return this.transactionService.approveTransaction(id);
  }

  @Patch(':id/cancel')
  cancelTransaction(@Param('id') id: string) {
    return this.transactionService.cancelTransaction(id);
  }

 */
}
