import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log all exceptions to ensure visibility in Render logs
    console.error(`[${request.method}] ${request.url} - Status: ${status}`, exception);

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception instanceof Error ? exception.message : 'Internal server error');
    
    const stack = exception instanceof Error ? exception.stack : undefined;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === 'object' && 'message' in (message as object)
          ? (message as { message: string }).message
          : message,
      errorDetails: stack,
    });
  }
}
