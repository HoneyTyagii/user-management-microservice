import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, 'your_jwt_secret') as { id: string }; // Replace with your actual JWT secret and token structure
        req.user = decodedToken.id; // Assuming id is stored in the JWT token
      } catch (err) {
        // Handle token verification errors
        console.error('Error verifying token:', err);
      }
    }
    next();
  }
}
