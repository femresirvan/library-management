import prisma from '../config/prisma';
import { ScoreDto, UserAndBookIdDto } from '../dtos';
import {
  BookAlreadyBorrowedException,
  BookAlreadyReturnedException,
} from '../types';
import { BorrowedBookRecordNotFoundException } from '../types/exceptions/BorrowedBookRecordNotFoundException';
import { updateBookScore, validateBookExistsOrThrow } from './bookService';
import { validateUserExistsOrThrow } from './userService';

export const borrowBook = async (dto: UserAndBookIdDto): Promise<void> => {
  validateUserExistsOrThrow(dto.userId);
  validateBookExistsOrThrow(dto.bookId);

  const borrowedBook = await prisma.borrowedBook.findFirst({
    where: {
      userId: dto.userId,
      bookId: dto.bookId,
      returnDate: null,
    },
  });

  if (borrowedBook) {
    throw new BookAlreadyBorrowedException();
  }

  await prisma.borrowedBook.create({
    data: {
      book: { connect: { id: dto.bookId } },
      user: { connect: { id: dto.userId } },
      borrowDate: new Date(),
    },
  });
};

export const returnBook = async (
  userAndBookIdDto: UserAndBookIdDto,
  scoreDto: ScoreDto,
): Promise<void> => {
  await validateUserExistsOrThrow(userAndBookIdDto.userId);
  await validateBookExistsOrThrow(userAndBookIdDto.bookId);

  const borrowedBooks = await prisma.borrowedBook.findMany({
    where: {
      userId: userAndBookIdDto.userId,
      bookId: userAndBookIdDto.bookId,
    },
  });

  if (borrowedBooks.length === 0) {
    throw new BorrowedBookRecordNotFoundException();
  }

  const borrowedBook = borrowedBooks.find((bb) => bb.returnDate === null);
  if (!borrowedBook) {
    throw new BookAlreadyReturnedException();
  }

  await prisma.borrowedBook.update({
    where: { id: borrowedBook.id },
    data: {
      returnDate: new Date(),
      score: scoreDto.score,
    },
  });

  await updateBookScore({
    bookId: userAndBookIdDto.bookId,
    score: scoreDto.score,
  });
};

export const validateBorrowedBookExistsOrThrow = async (
  id: number,
): Promise<void> => {
  const borrowedBook = await prisma.borrowedBook.findFirst({
    where: { id: id },
  });

  if (!borrowedBook) {
    throw new BorrowedBookRecordNotFoundException();
  }
};
