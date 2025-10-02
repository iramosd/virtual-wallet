import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Token } from './entities/token.entity';
import { ResponseTokenDto } from './dto/response-token.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async create(createTokenDto: CreateTokenDto): Promise<ResponseTokenDto> {
    try {
      if (createTokenDto.sessionId) {
        const session = await this.prisma.session.findUnique({
          where: { id: createTokenDto.sessionId }
        });

        if (!session) {
          throw new NotFoundException(`Session with ID ${createTokenDto.sessionId} not found`);
        }
      }

      const expiresAt = new Date(createTokenDto.expiresAt);
      const now = new Date();
      
      if (expiresAt <= now) {
        throw new BadRequestException('Expiration date must be in the future');
      }

      const token = await this.prisma.token.create({
        data: {
          ...createTokenDto,
          expiresAt
        },
        include: {
          session: true
        }
      });

      return this.formatTokenResponse(token);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Token already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseTokenDto[]> {
    const tokens = await this.prisma.token.findMany({
      include: {
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tokens.map(token => this.formatTokenResponse(token));
  }

  async findOne(id: string): Promise<ResponseTokenDto> {
    const token = await this.prisma.token.findUnique({
      where: { id },
      include: {
        session: true
      }
    });

    if (!token) {
      throw new NotFoundException(`Token with ID ${id} not found`);
    }

    return this.formatTokenResponse(token);
  }

  async findByToken(tokenValue: string): Promise<ResponseTokenDto> {
    const token = await this.prisma.token.findUnique({
      where: { token: tokenValue },
      include: {
        session: true
      }
    });

    if (!token) {
      throw new NotFoundException(`Token ${tokenValue} not found`);
    }

    return this.formatTokenResponse(token);
  }

  async findBySessionId(sessionId: string): Promise<ResponseTokenDto[]> {
    const tokens = await this.prisma.token.findMany({
      where: { sessionId },
      include: {
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return tokens.map(token => this.formatTokenResponse(token));
  }

  async findActiveTokens(): Promise<ResponseTokenDto[]> {
    const now = new Date();
    const tokens = await this.prisma.token.findMany({
      where: {
        expiresAt: {
          gt: now
        }
      },
      include: {
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return tokens.map(token => this.formatTokenResponse(token));
  }

  async findExpiredTokens(): Promise<ResponseTokenDto[]> {
    const now = new Date();
    const tokens = await this.prisma.token.findMany({
      where: {
        expiresAt: {
          lte: now
        }
      },
      include: {
        session: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return tokens.map(token => this.formatTokenResponse(token));
  }

  async update(id: string, updateTokenDto: UpdateTokenDto): Promise<ResponseTokenDto> {
    try {
      const token = await this.prisma.token.update({
        where: { id },
        data: updateTokenDto,
        include: {
          session: true
        }
      });
      return this.formatTokenResponse(token);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Token with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Token already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseTokenDto> {
    try {
      const token = await this.prisma.token.delete({
        where: { id },
        include: {
          session: true
        }
      });
      return this.formatTokenResponse(token);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Token with ID ${id} not found`);
      }
      throw error;
    }
  }

  async cleanupExpiredTokens(): Promise<number> {
    const now = new Date();
    const result = await this.prisma.token.deleteMany({
      where: {
        expiresAt: {
          lte: now
        }
      }
    });

    return result.count;
  }

  async validateToken(tokenValue: string): Promise<{ valid: boolean; token?: ResponseTokenDto }> {
    try {
      const token = await this.findByToken(tokenValue);
      const now = new Date();
      
      if (token.expiresAt > now) {
        return { valid: true, token };
      } else {
        return { valid: false };
      }
    } catch (error) {
      return { valid: false };
    }
  }

  private formatTokenResponse(token: any): ResponseTokenDto {
    const { session, ...tokenData } = token;
    return tokenData;
  }
}

