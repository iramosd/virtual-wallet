import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
