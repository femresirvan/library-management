import express from 'express';
import bodyParser from 'body-parser';
import {
  errorHandler,
  fatalErrorHandler,
  logRequest,
  logResponse,
} from './middlewares';
import userRouter from './routers/userRouter';
import bookRouter from './routers/bookRouter';
import logger from './config/logger';
import ENV from './config/env';
import prisma, { checkPrismaConnection } from './config/prisma';

const app = express();
logger.info('Express app instance created.');

app.use(bodyParser.json());
logger.info('Body parser middleware added.');

app.use(logRequest);
app.use(logResponse);

app.use('/users', userRouter);
logger.info('User router added.');

app.use('/books', bookRouter);
logger.info('Book router added.');

// Handle unsupported HTTP methods on existing paths
app.use('*', (req, res) => {
  logger.warn(`Unsupported method: ${req.method} on path: ${req.originalUrl}`);
  res.status(405).send('Path and method not allowed.');
});

app.use(errorHandler);
logger.info('Error handling middleware added.');

app.use(fatalErrorHandler);
logger.info('Fatal error handling middleware added.');

const startServer = async () => {
  await checkPrismaConnection();

  app.listen(ENV.PORT, () => {
    logger.info(`Server is running on port ${ENV.PORT}`);
    logger.info('Application has started and is ready to handle requests.');
  });
};

startServer();

const handleShutdown = async () => {
  logger.info('Server is shutting down...');
  await prisma.$disconnect();

  process.exit(0);
};

process.on('SIGINT', handleShutdown); // For CTRL+C
process.on('SIGTERM', handleShutdown); // For Docker

export default app;
