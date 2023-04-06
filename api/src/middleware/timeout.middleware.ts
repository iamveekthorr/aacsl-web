import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.util';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // default Db timeout is 15000 (15sec)
    // we add an extra 5000 to it making it 25000 (30sec)
    // Timeout in milliseconds

    const timeout = 1500;

    const timer = setTimeout(() => {
      // End the request if it takes more than 5 seconds
      new AppError('Request Timeout', HttpStatus.GATEWAY_TIMEOUT);
    }, timeout);

    res.on('finish', () => clearTimeout(timer));

    next();
  }
}
