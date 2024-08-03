import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import prisma from '../../src/config/prisma';
import {
  BookResponseDto,
  BooksResponseDto,
  CreateBookRequestDto,
  ScoreWithBookIdDto,
} from '../../src/dtos';
import * as bookMapper from '../../src/mappers/bookMapper';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookScore,
  validateBookExistsOrThrow,
} from '../../src/services/bookService';
import { NotFoundException, BookNotFoundException } from '../../src/types';
import * as calculations from '../../src/utils/calculations';
import { Book, BorrowedBook, Prisma } from '@prisma/client';

describe('bookService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('should return an array of BooksResponseDto', async () => {
      const books: Book[] = [
        {
          id: 1,
          name: 'Book 1',
          averageScore: new Prisma.Decimal(4.5),
        },
        {
          id: 2,
          name: 'Book 2',
          averageScore: new Prisma.Decimal(3.5),
        },
      ];

      const expectedResponse: BooksResponseDto[] = [
        {
          id: 1,
          name: 'Book 1',
        },
        {
          id: 2,
          name: 'Book 2',
        },
      ];

      jest.spyOn(prisma.book, 'findMany').mockResolvedValueOnce(books);
      jest
        .spyOn(bookMapper, 'mapEntitiesToBooksResponseDtos')
        .mockReturnValue(expectedResponse);

      const result = await getAllBooks();

      expect(prisma.book.findMany).toHaveBeenCalledTimes(1);
      expect(bookMapper.mapEntitiesToBooksResponseDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getBookById', () => {
    it('should return a BooksResponseDto for a valid book id', async () => {
      const bookId = 1;
      const book: Book = {
        id: bookId,
        name: 'Book 1',
        averageScore: new Prisma.Decimal(4.5),
      };

      const expectedResponse: BookResponseDto = {
        id: bookId,
        name: 'Book 1',
        score: 4.5,
      };

      jest.spyOn(prisma.book, 'findUnique').mockResolvedValueOnce(book);
      jest
        .spyOn(bookMapper, 'mapEntityToBookResponseDto')
        .mockReturnValue(expectedResponse);

      const result = await getBookById(bookId);

      expect(prisma.book.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: bookId },
      });
      expect(bookMapper.mapEntityToBookResponseDto).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException for an invalid book id', async () => {
      const bookId = 1;

      jest.spyOn(prisma.book, 'findUnique').mockResolvedValueOnce(null);
      await expect(getBookById(bookId)).rejects.toThrow(NotFoundException);

      expect(prisma.book.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: bookId },
      });
      expect(bookMapper.mapEntityToBookResponseDto).not.toHaveBeenCalled();
    });
  });

  describe('createBook', () => {
    it('should create a book with the provided data', async () => {
      const dto: CreateBookRequestDto = {
        name: 'Book 1',
      };

      jest.spyOn(prisma.book, 'create').mockResolvedValueOnce(null);
      await createBook(dto);

      expect(prisma.book.create).toHaveBeenCalledTimes(1);
      expect(prisma.book.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
        },
      });
    });
  });

  describe('updateBookScore', () => {
    it('should update the average score of a book based on borrowed book scores', async () => {
      const dto: ScoreWithBookIdDto = {
        bookId: 1,
        score: 0, // Gereken score alanını ekleyin
      };

      const borrowedBooks: BorrowedBook[] = [
        {
          bookId: 1,
          score: 4,
          borrowDate: new Date(),
          id: 1,
          returnDate: new Date(),
          userId: 1,
        },
        {
          bookId: 1,
          score: 5,
          borrowDate: new Date(),
          id: 2,
          returnDate: new Date(),
          userId: 2,
        },
      ];

      const averageScore = 4.5;

      jest
        .spyOn(prisma.borrowedBook, 'findMany')
        .mockResolvedValueOnce(borrowedBooks);
      jest.spyOn(prisma.book, 'update').mockResolvedValueOnce(null);
      jest
        .spyOn(calculations, 'calculateAverage')
        .mockReturnValueOnce(averageScore);

      const result = await updateBookScore(dto);

      expect(prisma.borrowedBook.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.borrowedBook.findMany).toHaveBeenCalledWith({
        where: { bookId: dto.bookId, returnDate: { not: null } },
      });
      expect(calculations.calculateAverage).toHaveBeenCalledTimes(1);
      expect(calculations.calculateAverage).toHaveBeenCalledWith([4, 5]);
      expect(prisma.book.update).toHaveBeenCalledTimes(1);
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: dto.bookId },
        data: {
          averageScore: averageScore,
        },
      });
      expect(result).toEqual({ score: averageScore });
    });
  });

  describe('validateBookExistsOrThrow', () => {
    it('should throw BookNotFoundException for an invalid book id', async () => {
      const bookId = 1;

      jest.spyOn(prisma.book, 'findFirst').mockResolvedValueOnce(null);

      await expect(validateBookExistsOrThrow(bookId)).rejects.toThrow(
        BookNotFoundException,
      );

      expect(prisma.book.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.book.findFirst).toHaveBeenCalledWith({
        where: { id: bookId },
      });
    });

    it('should not throw an error for a valid book id', async () => {
      const bookId = 1;
      jest.spyOn(prisma.book, 'findFirst').mockResolvedValueOnce({
        averageScore: new Prisma.Decimal(4.5),
        id: bookId,
        name: 'Book 1',
      });

      await expect(validateBookExistsOrThrow(bookId)).resolves.not.toThrow();

      expect(prisma.book.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.book.findFirst).toHaveBeenCalledWith({
        where: { id: bookId },
      });
    });
  });
});
