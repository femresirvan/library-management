import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { BaseException } from '../types/exceptions/BaseException';

export const errorHandler = (
  err: BaseException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BaseException) {
    logger.error(`Error: ${err.name} - ${err.message}`, {
      statusCode: err.statusCode || 500,
      stack: err.stack,
      location: `${req.method} ${req.originalUrl}`,
    });

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const timestamp = new Date().toISOString();

    return res.status(statusCode).json({ message, statusCode, timestamp });
  }

  next(err);
};
