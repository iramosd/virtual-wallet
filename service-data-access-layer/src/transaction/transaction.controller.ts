import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<any> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.transactionService.findAll();
  }

  @Get('wallet/:walletId')
  async findByWalletId(@Param('walletId') walletId: string): Promise<any> {
    return this.transactionService.findByWalletId(walletId);
  }

  @Get('session/:sessionId')
  async findBySessionId(@Param('sessionId') sessionId: string): Promise<any> {
    return this.transactionService.findBySessionId(sessionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ): Promise<any> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.transactionService.remove(id);
  }
}

