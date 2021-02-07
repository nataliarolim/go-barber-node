import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;

}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
// validation of token JWT

const authHeader = request.headers.authorization;

if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
}

const [, token] = authHeader.split(' ');
    try {
        const decode = verify(token, authConfig.jwt.secret);
        const { sub } = decode as TokenPayload; // forcing decode to be an object
        request.user = {
            id: sub
        }
        return next();

    } catch {
        throw new AppError('Invalid JWT token', 401);
    }

}
