import {
  mapEntityToBookResponseDto,
  mapEntitiesToBooksResponseDtos,
} from '../../src/mappers/bookMapper';
import { BookResponseDto, BooksResponseDto } from '../../src/dtos';
import { describe, expect, it } from '@jest/globals';
import { Book, Prisma } from '@prisma/client';

describe('bookMapper', () => {
  describe('mapEntityToBookResponseDto', () => {
    it('should map a Book entity to a BookResponseDto', () => {
      const entity: Book = {
        id: 1,
        name: 'Book 1',
        averageScore: new Prisma.Decimal(4.5),
      };

      const expectedDto: BookResponseDto = {
        id: 1,
        name: 'Book 1',
        score: 4.5,
      };

      const result = mapEntityToBookResponseDto(entity);

      expect(result).toEqual(expectedDto);
    });

    it('should map a Book entity without averageScore to a BookResponseDto with score -1', () => {
      const entity: Book = {
        id: 2,
        name: 'Book 2',
        averageScore: null,
      };

      const expectedDto: BookResponseDto = {
        id: 2,
        name: 'Book 2',
        score: -1,
      };

      const result = mapEntityToBookResponseDto(entity);

      expect(result).toEqual(expectedDto);
    });
  });

  describe('mapEntitiesToBooksResponseDtos', () => {
    it('should map an array of Book entities to an array of BooksResponseDto', () => {
      const entities: Book[] = [
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

      const expectedDtos: BooksResponseDto[] = [
        {
          id: 1,
          name: 'Book 1',
        },
        {
          id: 2,
          name: 'Book 2',
        },
      ];

      const result = mapEntitiesToBooksResponseDtos(entities);

      expect(result).toEqual(expectedDtos);
    });
  });
});
