import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from './entities/session.entity';
import { ResponseSessionDto } from './dto/response-session.dto';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto): Promise<ResponseSessionDto> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { id: createSessionDto.walletId }
      });

      if (!wallet) {
        throw new NotFoundException(`Wallet with ID ${createSessionDto.walletId} not found`);
      }

      const expiresAt = new Date(createSessionDto.expiresAt);
      const now = new Date();
      
      if (expiresAt <= now) {
        throw new BadRequestException('Expiration date must be in the future');
      }

      const session = await this.prisma.session.create({
        data: {
          ...createSessionDto,
          expiresAt
        },
        include: {
          wallet: true,
          transactions: true,
          tokens: true
        }
      });

      return this.formatSessionResponse(session);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ResponseSessionDto[]> {
    const sessions = await this.prisma.session.findMany({
      include: {
        wallet: true,
        transactions: true,
        tokens: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sessions.map(session => this.formatSessionResponse(session));
  }

  async findOne(id: string): Promise<ResponseSessionDto> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        wallet: true,
        transactions: true,
        tokens: true
      }
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    return this.formatSessionResponse(session);
  }

  async findByWalletId(walletId: string): Promise<ResponseSessionDto[]> {
    const sessions = await this.prisma.session.findMany({
      where: { walletId },
      include: {
        wallet: true,
        transactions: true,
        tokens: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return sessions.map(session => this.formatSessionResponse(session));
  }

  async findActiveSessions(): Promise<ResponseSessionDto[]> {
    const now = new Date();
    const sessions = await this.prisma.session.findMany({
      where: {
        expiresAt: {
          gt: now
        }
      },
      include: {
        wallet: true,
        transactions: true,
        tokens: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return sessions.map(session => this.formatSessionResponse(session));
  }

  async findExpiredSessions(): Promise<ResponseSessionDto[]> {
    const now = new Date();
    const sessions = await this.prisma.session.findMany({
      where: {
        expiresAt: {
          lte: now
        }
      },
      include: {
        wallet: true,
        transactions: true,
        tokens: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return sessions.map(session => this.formatSessionResponse(session));
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<ResponseSessionDto> {
    try {
      const session = await this.prisma.session.update({
        where: { id },
        data: updateSessionDto,
        include: {
          wallet: true,
          transactions: true,
          tokens: true
        }
      });
      return this.formatSessionResponse(session);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseSessionDto> {
    try {
      const session = await this.prisma.session.delete({
        where: { id },
        include: {
          wallet: true,
          transactions: true,
          tokens: true
        }
      });
      return this.formatSessionResponse(session);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }
      throw error;
    }
  }

  async cleanupExpiredSessions(): Promise<number> {
    const now = new Date();
    const result = await this.prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: now
        }
      }
    });

    return result.count;
  }

  private formatSessionResponse(session: any): ResponseSessionDto {
    const { wallet, transactions, tokens, ...sessionData } = session;
    return sessionData;
  }
}

