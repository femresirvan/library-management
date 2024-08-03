import { Prisma } from '@prisma/client';

export type UserWithBook = Prisma.UserGetPayload<{
  include: {
    borrowedBooks: {
      include: { book: true };
    };
  };
}>;
