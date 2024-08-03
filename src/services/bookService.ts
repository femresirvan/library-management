import prisma from '../config/prisma';
import {
  BooksResponseDto,
  CreateBookRequestDto,
  ScoreDto,
  ScoreWithBookIdDto,
} from '../dtos';
import {
  mapEntitiesToBooksResponseDtos,
  mapEntityToBookResponseDto,
} from '../mappers/bookMapper';
import { BookNotFoundException, NotFoundException } from '../types';
import { calculateAverage } from '../utils';

export const getAllBooks = async (): Promise<BooksResponseDto[]> => {
  const books = await prisma.book.findMany();
  return mapEntitiesToBooksResponseDtos(books);
};

export const getBookById = async (id: number): Promise<BooksResponseDto> => {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new NotFoundException();
  }

  return mapEntityToBookResponseDto(book);
};

export const createBook = async (dto: CreateBookRequestDto): Promise<void> => {
  await prisma.book.create({
    data: {
      name: dto.name,
    },
  });
};

export const updateBookScore = async (
  dto: ScoreWithBookIdDto,
): Promise<ScoreDto> => {
  const borrowedBooks = await prisma.borrowedBook.findMany({
    where: { bookId: dto.bookId, returnDate: { not: null } },
  });

  const scores = borrowedBooks
    .map((item) => item.score)
    .filter((num): num is number => num !== null);
  const averageScore = calculateAverage(scores);

  await prisma.book.update({
    where: { id: dto.bookId },
    data: {
      averageScore: averageScore,
    },
  });

  return { score: averageScore };
};

export const validateBookExistsOrThrow = async (id: number): Promise<void> => {
  const book = await prisma.book.findFirst({
    where: { id: id },
  });
  if (!book) {
    throw new BookNotFoundException();
  }
};
