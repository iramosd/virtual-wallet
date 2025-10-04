import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionService } from '../../session/session.service';
import { ClientService } from '../../client/client.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly clientService: ClientService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    /**
     * Por simplicidad, el token es el id de session generado en el login.
     */
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autorización no proporcionado');
    }

    try {
      const sessionResponse = await this.sessionService.findOne(token);

      if (sessionResponse?.status !== 'success' || !sessionResponse.data) {
        throw new UnauthorizedException('Sesión no válida');
      }

      const session = sessionResponse.data;
      const now = new Date();

      if (new Date(session.expiresAt) < now) {
        throw new UnauthorizedException('Sesión expirada');
      }

      const clientResponse = await this.clientService.findOneByWallet(session.walletId, true);
      
      if (clientResponse?.status !== 'success' || !clientResponse.data) {
        throw new UnauthorizedException('Cliente no encontrado');
      }

      request.user = {
        id: clientResponse.data.id,
        email: clientResponse.data.email,
        walletId: session.walletId,
        sessionId: session.id,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Error al validar la autenticación');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
