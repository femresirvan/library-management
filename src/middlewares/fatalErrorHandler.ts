import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

export const fatalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`Error: ${err.name} - ${err.message}`, {
    stack: err.stack,
    location: `${req.method} ${req.originalUrl}`,
  });

  const statusCode = 500;
  const message = 'Internal Server Error';
  const timestamp = new Date().toISOString();

  return res.status(statusCode).json({ message, statusCode, timestamp });
};
