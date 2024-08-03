import express from 'express';
import { createBookValidator } from '../validators';
import { validateReqBody, validateReqParams } from '../middlewares';
import { catchErrors } from '../utils';
import {
  handleCreateBook,
  handleGetAllBooks,
  handleGetBookById,
} from '../controllers/bookController';

const router = express.Router();

// Get all books
router.get('', catchErrors(handleGetAllBooks));

// Get a book by ID
router.get('/:id', validateReqParams(), catchErrors(handleGetBookById));

// Create a new book
router.post(
  '',
  validateReqBody(createBookValidator),
  catchErrors(handleCreateBook),
);

export default router;
