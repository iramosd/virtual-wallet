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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClientDto: CreateClientDto): Promise<any> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.clientService.findAll();
  }

  @Get('document/:document')
  async findByDocument(@Param('document') document: string): Promise<any> {
    return this.clientService.findByDocument(document);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<any> {
    return this.clientService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateClientDto: UpdateClientDto
  ): Promise<any> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.clientService.remove(id);
  }
}
