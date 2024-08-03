import { Request, Response } from 'express';
import { getAllUsers, createUser, getUserById } from '../services/userService';
import { CreateUserRequestDto, ScoreDto } from '../dtos';
import { borrowBook, returnBook } from '../services/borrowedBookService';

export const handleGetAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const handleGetUserById = async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  res.json(user);
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const body: CreateUserRequestDto = req.body;
  const newUser = await createUser(body);
  res.status(201).json(newUser);
};

export const handleBorrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  await borrowBook({ userId: parseInt(userId), bookId: parseInt(bookId) });
  res.status(204).send();
};

export const handleReturnBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  const body: ScoreDto = req.body;
  await returnBook(
    { userId: parseInt(userId), bookId: parseInt(bookId) },
    body,
  );
  res.status(204).send();
};
