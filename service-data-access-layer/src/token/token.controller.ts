import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto): Promise<any> {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.tokenService.findAll();
  }

  @Get('active')
  async findActiveTokens(): Promise<any> {
    return this.tokenService.findActiveTokens();
  }

  @Get('expired')
  async findExpiredTokens(): Promise<any> {
    return this.tokenService.findExpiredTokens();
  }

  @Get('session/:sessionId')
  async findBySessionId(@Param('sessionId') sessionId: string): Promise<any> {
    return this.tokenService.findBySessionId(sessionId);
  }

  @Get('validate/:tokenValue')
  async validateToken(@Param('tokenValue') tokenValue: string): Promise<any> {
    return this.tokenService.validateToken(tokenValue);
  }

  @Get('token/:tokenValue')
  async findByToken(@Param('tokenValue') tokenValue: string): Promise<any> {
    return this.tokenService.findByToken(tokenValue);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.tokenService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTokenDto: UpdateTokenDto
  ): Promise<any> {
    return this.tokenService.update(id, updateTokenDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tokenService.remove(id);
  }

  @Post('cleanup')
  @HttpCode(HttpStatus.OK)
  async cleanupExpiredTokens(): Promise<{ count: number }> {
    const count = await this.tokenService.cleanupExpiredTokens();
    return { count };
  }
}

