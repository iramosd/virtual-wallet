import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== this.configService.get<string>('API_KEY')) {  
      throw new HttpException('Forbidden: Invalid API Key', HttpStatus.FORBIDDEN);
    }

    next(); 
  }  
}
