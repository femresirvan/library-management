import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    message: 'Incoming Request',
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  });

  req._startTime = Date.now();

  next();
};
