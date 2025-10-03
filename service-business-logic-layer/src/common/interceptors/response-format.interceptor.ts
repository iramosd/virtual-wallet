import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: string;
  code: number;
}

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        return {
          data: data.data,
          status: 'éxito',
          code: statusCode,
        };
      }),
      catchError((error) => {
        const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        
        return throwError(() => ({
          message: this.getErrorMessage(statusCode, error.response),
          status: 'error',
          code: statusCode,
        }));
      }),
    );
  }

  private getErrorMessage(statusCode: number, data: any): string {
    if (data && typeof data === 'object' && data.message) {
      return data.message;
    }

    const errorMessages: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'Solicitud incorrecta',
      [HttpStatus.UNAUTHORIZED]: 'No autorizado',
      [HttpStatus.FORBIDDEN]: 'Acceso prohibido',
      [HttpStatus.NOT_FOUND]: 'Recurso no encontrado',
      [HttpStatus.METHOD_NOT_ALLOWED]: 'Método no permitido',
      [HttpStatus.CONFLICT]: 'Conflicto en la solicitud',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'Entidad no procesable',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error interno del servidor',
      [HttpStatus.BAD_GATEWAY]: 'Puerta de enlace incorrecta',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'Servicio no disponible',
      [HttpStatus.GATEWAY_TIMEOUT]: 'Tiempo de espera agotado',
    };

    return errorMessages[statusCode] || 'Error desconocido';
  }
}
