export interface BookResponseDto {
  id: number;
  name: string;
  /**
   * Can be -1 if the book has no reviews.
   * It's not a very good case to set the data to -1. Instead, it seems more appropriate to save it as null in the database :/.
   * I don't usually include my own comments in the code, but since this is a study case, I had to write it this way.
   */
  score: number;
}
