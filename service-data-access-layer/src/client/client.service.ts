import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Client } from './entities/client.entity';
import { ResponseClientDto } from './dto/response-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  private excludePassword(client: Client | Client[]): ResponseClientDto | ResponseClientDto[] {
    
    if (Array.isArray(client)) {
      return client.map(({ password, ...responseClient }) => responseClient);
    }

    const { password, ...responseClient } = client;
    return responseClient;
  }

  async create(createClientDto: CreateClientDto): Promise<ResponseClientDto> {
    try {
      const client = await this.prisma.client.create({
        data: createClientDto,
      });
      return this.excludePassword(client) as ResponseClientDto;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Client with this document or email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseClientDto[]> {
    const clients = await this.prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.excludePassword(clients) as ResponseClientDto[];
  }

  async findOne(id: string, withWallet: boolean = false): Promise<ResponseClientDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        wallet: withWallet, 
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.excludePassword(client) as ResponseClientDto;
  }

  async findByDocument(document: string): Promise<ResponseClientDto> {
    const client = await this.prisma.client.findUnique({
      where: { document },
    });

    if (!client) {
      throw new NotFoundException(`Client with document ${document} not found`);
    }

    return this.excludePassword(client) as ResponseClientDto;
  }

  async findByWallet(walletId: string, withWallet: boolean = false): Promise<ResponseClientDto> {
    const client = await this.prisma.client.findUnique({
      where: { walletId },
      include: {
        wallet: withWallet, 
      },
    });

    if (!client) {
      throw new NotFoundException();
    }
    
    return this.excludePassword(client) as ResponseClientDto;
  }

  async findByEmail(email: string, withWallet: boolean = false, withPassword: boolean = false): Promise<ResponseClientDto> {
    const client = await this.prisma.client.findUnique({
      where: { email },
      include: {
        wallet: withWallet, 
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with email ${email} not found`);
    }

    return withPassword ? client : this.excludePassword(client) as ResponseClientDto;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<ResponseClientDto> {
    try {
      const client = await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
      });
      return this.excludePassword(client) as ResponseClientDto;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Client with this document or email already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseClientDto> {
    try {
      const client = await this.prisma.client.delete({
        where: { id },
      });
      return this.excludePassword(client) as ResponseClientDto;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      throw error;
    }
  }
}
