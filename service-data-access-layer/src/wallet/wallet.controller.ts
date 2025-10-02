import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto): Promise<any> {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.walletService.findAll();
  }

  @Get('client/:clientId')
  async findByClientId(@Param('clientId') clientId: string): Promise<any> {
    return this.walletService.findByClientId(clientId);
  }

  @Get('phone/:phone')
  async findByPhone(@Param('phone') phone: string): Promise<any> {
    return this.walletService.findByPhone(phone);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateWalletDto: UpdateWalletDto
  ): Promise<any> {
    return this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.walletService.remove(id);
  }
}

