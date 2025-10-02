import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const client = await this.prisma.client.create({
        data: createClientDto,
      });
      return client;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Client with this document or email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async findByDocument(document: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { document },
    });

    if (!client) {
      throw new NotFoundException(`Client with document ${document} not found`);
    }

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!client) {
      throw new NotFoundException(`Client with email ${email} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
      });
      return client;
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

  async remove(id: string): Promise<Client> {
    try {
      const client = await this.prisma.client.delete({
        where: { id },
      });
      return client;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      throw error;
    }
  }
}
