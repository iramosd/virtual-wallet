import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      if (status === HttpStatus.BAD_REQUEST && Array.isArray((res as any).message)) {
        const validationMessages = (res as any).message as any[];
        const mapped = validationMessages.map((m) => (typeof m === 'string' ? m : JSON.stringify(m)));
        return response.status(status).json({ status: 'error', message: mapped.join('; ') });
      }

      const message = (res && (res as any).message) ? (res as any).message : (exception as any).message;
      return response.status(status).json({ status: 'error', message });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: 'Internal server error' });
  }
}
