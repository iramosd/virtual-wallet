import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Wallet } from './entities/wallet.entity';
import { ResponseWalletDto } from './dto/response-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async create(createWalletDto: CreateWalletDto): Promise<ResponseWalletDto> {
    try {
      const wallet = await this.prisma.wallet.create({
        data: createWalletDto
      });

      return this.formatWalletResponse(wallet);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Wallet with this phone number already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseWalletDto[]> {
    const wallets = await this.prisma.wallet.findMany({
      include: {
        client: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return wallets.map(wallet => this.formatWalletResponse(wallet));
  }

  async findOne(id: string): Promise<ResponseWalletDto> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: {
        client: true
      }
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }

    return this.formatWalletResponse(wallet);
  }

  async findByPhone(phone: string): Promise<ResponseWalletDto> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { phone },
      include: {
        client: true
      }
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with phone ${phone} not found`);
    }

    return this.formatWalletResponse(wallet);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<ResponseWalletDto> {
    try {
      const wallet = await this.prisma.wallet.update({
        where: { id },
        data: updateWalletDto,
        include: {
          client: true
        }
      });
      return this.formatWalletResponse(wallet);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Wallet with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Wallet with this phone number already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseWalletDto> {
    try {
      const wallet = await this.prisma.wallet.delete({
        where: { id },
        include: {
          client: true
        }
      });
      return this.formatWalletResponse(wallet);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Wallet with ID ${id} not found`);
      }
      throw error;
    }
  }

  private formatWalletResponse(wallet: any): ResponseWalletDto {
    const { client, ...walletData } = wallet;
    return walletData;
  }
}

