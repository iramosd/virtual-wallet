import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  Query,
  HttpException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  private success(payload: any) {
    return { status: 'success', data: payload };
  }

  private throwError(error: any) {
    const message = error && error.message ? error.message : 'Internal server error';
    const status = error && error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException({ status: 'error', message }, status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClientDto: CreateClientDto): Promise<any> {
    try {
      const created = await this.clientService.create(createClientDto);
      return this.success(created);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Get()
  async findAll(): Promise<any> {
    try {
      const clients = await this.clientService.findAll();
      return this.success(clients);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Get('document/:document')
  async findByDocument(@Param('document') document: string): Promise<any> {
    try {
      const client = await this.clientService.findByDocument(document);
      return this.success(client);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<any> {
    try {
      const client = await this.clientService.findByEmail(email);
      return this.success(client);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const client = await this.clientService.findOne(id);
      return this.success(client);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateClientDto: UpdateClientDto
  ): Promise<any> {
    try {
      const updated = await this.clientService.update(id, updateClientDto);
      return this.success(updated);
    } catch (error) {
      this.throwError(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<any> {
    try {
      await this.clientService.remove(id);
      // return empty array as data for delete success
      return this.success([]);
    } catch (error) {
      this.throwError(error);
    }
  }
}
