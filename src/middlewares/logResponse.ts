import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const logResponse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on('finish', () => {
    logger.info({
      message: 'Outgoing Response',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${Date.now() - req._startTime}ms`,
      headers: res.getHeaders(),
      body: res.locals.body,
    });
  });

  next();
};
