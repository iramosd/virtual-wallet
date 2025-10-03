import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception.status && exception.status === 'error') {
      response.status(exception.code).json(exception);
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse = {
        message: this.getErrorMessage(status, exceptionResponse),
        status: 'error',
        code: status,
      };

      response.status(status).json(errorResponse);
      return;
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      message: 'Error interno del servidor',
      status: 'error',
      code: status,
    };

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(status: number, exceptionResponse: any): string {
    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      return Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message.join(', ')
        : exceptionResponse.message;
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

    return errorMessages[status] || 'Error desconocido';
  }
}
