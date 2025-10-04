import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.tokenService.findByClientId(clientId);
  }

  @Get('token/:token')
  findByToken(@Param('token') token: string) {
    return this.tokenService.findByToken(token);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.tokenService.findByType(type);
  }

  @Get('client/:clientId/active')
  findActiveTokens(@Param('clientId') clientId: string) {
    return this.tokenService.findActiveTokens(clientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(id, updateTokenDto);
  }

  @Patch(':id/deactivate')
  deactivateToken(@Param('id') id: string) {
    return this.tokenService.deactivateToken(id);
  }

  @Patch(':id/use')
  useToken(@Param('id') id: string) {
    return this.tokenService.useToken(id);
  }

  @Patch('client/:clientId/revoke-all')
  revokeAllClientTokens(@Param('clientId') clientId: string) {
    return this.tokenService.revokeAllClientTokens(clientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}
