import express from 'express';
import { validateReqBody, validateReqParams } from '../middlewares';
import { createUserValidator } from '../validators/createUserValidator';
import { scoreValidator } from '../validators';
import { catchErrors } from '../utils';
import {
  handleBorrowBook,
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleReturnBook,
} from '../controllers/userController';

const router = express.Router();

// Get all users
router.get('', catchErrors(handleGetAllUsers));

// Get a user by ID
router.get('/:id', validateReqParams(), catchErrors(handleGetUserById));

// Create a new user
router.post(
  '',
  validateReqBody(createUserValidator),
  catchErrors(handleCreateUser),
);

// Borrow book
router.post(
  '/:userId/borrow/:bookId',
  validateReqParams(),
  catchErrors(handleBorrowBook),
);

// Return book
router.post(
  '/:userId/return/:bookId',
  validateReqParams(),
  validateReqBody(scoreValidator),
  catchErrors(handleReturnBook),
);

export default router;
