import { Prisma, User } from '@prisma/client';
import { describe, expect, it } from '@jest/globals';
import {
  mapUserEntitiesToUsersResponseDtos,
  mapUserEntityToUserResponseDto,
} from '../../src/mappers/userMapper';
import { UserWithBook } from '../../src/types/user';

describe('userMapper', () => {
  describe('mapUserEntitiesToUsersResponseDtos', () => {
    it('should map user entities to users response DTOs correctly', async () => {
      const users: User[] = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      const result = await mapUserEntitiesToUsersResponseDtos(users);

      expect(result).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ]);
    });
  });

  describe('mapUserEntityToUserResponseDto', () => {
    it('should map user entity to user response DTO correctly', async () => {
      const user: UserWithBook = {
        id: 1,
        name: 'John',
        borrowedBooks: [
          {
            book: {
              name: 'Book 1',
              averageScore: new Prisma.Decimal(4),
              id: 1,
            },
            returnDate: new Date('2022-01-01'),
            score: 4,
            bookId: 1,
            borrowDate: new Date('2022-01-01'),
            id: 1,
            userId: 1,
          },
          {
            book: {
              name: 'Book 2',
              averageScore: new Prisma.Decimal(5),
              id: 2,
            },
            returnDate: new Date('2022-02-01'),
            score: 5,
            bookId: 2,
            borrowDate: new Date('2022-01-01'),
            id: 2,
            userId: 1,
          },
        ],
      };

      const result = await mapUserEntityToUserResponseDto(user);

      expect(result).toEqual({
        id: 1,
        name: 'John',
        books: {
          past: [
            { name: 'Book 1', userScore: 4 },
            { name: 'Book 2', userScore: 5 },
          ],
          present: [],
        },
      });
    });

    it('should map user entity to user response DTO correctly when there are present books', async () => {
      const user: UserWithBook = {
        id: 1,
        name: 'John',
        borrowedBooks: [
          {
            book: {
              name: 'Book 1',
              averageScore: new Prisma.Decimal(4),
              id: 1,
            },
            returnDate: null,
            score: 4,
            bookId: 1,
            borrowDate: new Date('2022-01-01'),
            id: 1,
            userId: 1,
          },
          {
            book: {
              name: 'Book 2',
              averageScore: new Prisma.Decimal(5),
              id: 2,
            },
            borrowDate: new Date('2022-02-01'),
            score: 5,
            bookId: 2,
            id: 2,
            userId: 1,
            returnDate: null,
          },
        ],
      };

      const result = await mapUserEntityToUserResponseDto(user);

      expect(result).toEqual({
        id: 1,
        name: 'John',
        books: {
          past: [],
          present: [
            { name: 'Book 1', userScore: 4 },
            { name: 'Book 2', userScore: 5 },
          ],
        },
      });
    });
  });
});
