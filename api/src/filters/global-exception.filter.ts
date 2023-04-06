import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ValidationError } from 'class-validator';

import { Environment } from '../env.validate';
import { ErrorMessage } from '../enums/error-messages.enum';
import { ValidationException } from './validation-exception.filter';
import { AppError } from '../utils/appError.util';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost): Response<JSON> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    let status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

    let message: { [x: string]: any } | string =
      ErrorMessage.CUSTOM_SERVER_ERROR;

    let data: { [x: string]: any } | undefined = undefined;

    const errCode: string = err.code || false;

    if (err instanceof AppError) {
      switch (err.status) {
        case HttpStatus.BAD_REQUEST:
          message = err.message;
          break;
        case HttpStatus.GATEWAY_TIMEOUT:
          message = err.message;
          break;
      }
    }

    switch (errCode) {
      case ErrorMessage.UNIQUE_CONSTRAINT_VIOLATION:
        status = HttpStatus.CONFLICT;
        break;
      case ErrorMessage.MSSQL_EREQUEST:
        status = HttpStatus.CONFLICT;
        break;
    }

    if (errCode && errCode.startsWith('SMTP')) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ErrorMessage.FAILED_TO_SEND_EMAIL;
    } else if (err.message === ErrorMessage.JWT_EXPIRED) {
      status = HttpStatus.BAD_REQUEST;
    }

    if (typeof err.message === 'string') {
      message = err.message;
    }

    if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
      data = {
        message: err.message,
        stack: err.stack,
      };
    }

    if (err instanceof ValidationException) {
      data = err.errors.map((err: ValidationError) => ({
        property: err.property,
        constraints: Object.values(err.constraints),
      }));
    }

    if (err instanceof AxiosError) {
      status = err.response.status;
      message = err.response.statusText;
      data = err.response.data;
    }

    if (err instanceof JsonWebTokenError) {
      status = HttpStatus.UNAUTHORIZED;
    }

    return res.status(status).json({
      status,
      message,
      data,
    });
  }
}
