import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckLineIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const lineId = req.header('line-id');

    if (!lineId) {
      throw new UnauthorizedException('Header "line-id" is missing');
    }

    next();
  }
}
