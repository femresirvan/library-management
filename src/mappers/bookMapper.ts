import { Book } from '@prisma/client';
import { BookResponseDto, BooksResponseDto } from '../dtos';

export const mapEntityToBookResponseDto = (entity: Book): BookResponseDto => {
  return {
    id: entity.id,
    name: entity.name,
    score: entity.averageScore?.toNumber() ?? -1,
  };
};

export const mapEntitiesToBooksResponseDtos = (
  entities: Book[],
): BooksResponseDto[] => {
  return entities.map((b) => {
    return {
      id: b.id,
      name: b.name,
    };
  });
};
