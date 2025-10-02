import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from './entities/transaction.entity';
import { ResponseTransactionDto } from './dto/response-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<ResponseTransactionDto> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { id: createTransactionDto.walletId }
      });

      if (!wallet) {
        throw new NotFoundException(`Wallet with ID ${createTransactionDto.walletId} not found`);
      }

      if (createTransactionDto.sessionId) {
        const session = await this.prisma.session.findUnique({
          where: { id: createTransactionDto.sessionId }
        });

        if (!session) {
          throw new NotFoundException(`Session with ID ${createTransactionDto.sessionId} not found`);
        }
      }

      const result = await this.prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.create({
          data: createTransactionDto,
          include: {
            wallet: true,
            session: true
          }
        });

        let balanceChange = 0;
        if (createTransactionDto.type === 'credit') {
          balanceChange = createTransactionDto.amount;
        } else if (createTransactionDto.type === 'debit') {
          balanceChange = -createTransactionDto.amount;
        } else if (createTransactionDto.type === 'transfer') {
          balanceChange = -createTransactionDto.amount;
        }

        if (balanceChange < 0 && wallet.balance + balanceChange < 0) {
          throw new BadRequestException('Insufficient balance for this transaction');
        }

        await prisma.wallet.update({
          where: { id: createTransactionDto.walletId },
          data: {
            balance: wallet.balance + balanceChange
          }
        });

        return transaction;
      });

      return this.formatTransactionResponse(result);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ResponseTransactionDto[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        wallet: true,
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactions.map(transaction => this.formatTransactionResponse(transaction));
  }

  async findOne(id: string): Promise<ResponseTransactionDto> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        wallet: true,
        session: true
      }
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.formatTransactionResponse(transaction);
  }

  async findByWalletId(walletId: string): Promise<ResponseTransactionDto[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { walletId },
      include: {
        wallet: true,
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return transactions.map(transaction => this.formatTransactionResponse(transaction));
  }

  async findBySessionId(sessionId: string): Promise<ResponseTransactionDto[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { sessionId },
      include: {
        wallet: true,
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return transactions.map(transaction => this.formatTransactionResponse(transaction));
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<ResponseTransactionDto> {
    try {
      const transaction = await this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
        include: {
          wallet: true,
          session: true
        }
      });
      return this.formatTransactionResponse(transaction);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseTransactionDto> {
    try {
      const transaction = await this.prisma.transaction.delete({
        where: { id },
        include: {
          wallet: true,
          session: true
        }
      });
      return this.formatTransactionResponse(transaction);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }
      throw error;
    }
  }

  private formatTransactionResponse(transaction: any): ResponseTransactionDto {
    const { wallet, session, ...transactionData } = transaction;
    return transactionData;
  }
}

