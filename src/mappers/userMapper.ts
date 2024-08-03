import { User } from '@prisma/client';
import { UserResponseDto, UsersResponseDto } from '../dtos';
import { isBefore } from 'date-fns';
import { UserWithBook } from '../types/user';

export const mapUserEntitiesToUsersResponseDtos = async (
  users: User[],
): Promise<UsersResponseDto[]> => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
  }));
};

export const mapUserEntityToUserResponseDto = async (
  user: UserWithBook,
): Promise<UserResponseDto> => {
  const now = new Date();

  return {
    id: user.id,
    name: user.name,
    books: {
      past: user.borrowedBooks
        .filter((bb) => (bb.returnDate ? isBefore(bb.returnDate, now) : false))
        .map((bb) => {
          return {
            name: bb.book.name,
            userScore: bb.score ?? undefined,
          };
        }),
      present: user.borrowedBooks
        .filter((bb) =>
          !bb.returnDate ? !isBefore(now, bb.borrowDate) : false,
        )
        .map((bb) => {
          return {
            name: bb.book.name,
            userScore: bb.score ?? undefined,
          };
        }),
    },
  };
};
