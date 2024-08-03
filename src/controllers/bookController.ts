import { Request, Response } from 'express';
import { createBook, getAllBooks, getBookById } from '../services/bookService';
import { CreateBookRequestDto } from '../dtos';

export const handleGetAllBooks = async (req: Request, res: Response) => {
  const books = await getAllBooks();
  res.json(books);
};

export const handleGetBookById = async (req: Request, res: Response) => {
  const book = await getBookById(parseInt(req.params.id));
  res.json(book);
};

export const handleCreateBook = async (req: Request, res: Response) => {
  const body: CreateBookRequestDto = req.body;
  const newBook = await createBook(body);
  res.status(201).json(newBook);
};
