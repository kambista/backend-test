import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		console.log('Estoy en el CusomException');
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const message =
			exception instanceof HttpException ? exception.getResponse() : exception.message || 'Error Interno';
		const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

		return response.status(statusCode).json({
			statusCode,
			error: { message }
		});
	}
}
