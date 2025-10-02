import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto): Promise<any> {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.sessionService.findAll();
  }

  @Get('active')
  async findActiveSessions(): Promise<any> {
    return this.sessionService.findActiveSessions();
  }

  @Get('expired')
  async findExpiredSessions(): Promise<any> {
    return this.sessionService.findExpiredSessions();
  }

  @Get('wallet/:walletId')
  async findByWalletId(@Param('walletId') walletId: string): Promise<any> {
    return this.sessionService.findByWalletId(walletId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.sessionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateSessionDto: UpdateSessionDto
  ): Promise<any> {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.sessionService.remove(id);
  }

  @Post('cleanup')
  @HttpCode(HttpStatus.OK)
  async cleanupExpiredSessions(): Promise<{ count: number }> {
    const count = await this.sessionService.cleanupExpiredSessions();
    return { count };
  }
}

