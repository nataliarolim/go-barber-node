import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

import redisConfig from '@config/cache';

const redisClient = redis.createClient({
    host: process.env.REDI_HOST,
    port: Number(process.env.REDI_PORT),
    password: process.env.REDI_PASS || undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 5, // quantas requisições de 1 seg por IP
    duration: 1,
});

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(req.ip);

        return next();
    } catch (err) {
        throw new AppError('Too many requests', 429);
    }
}
