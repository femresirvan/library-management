import { BaseException } from './BaseException';

export class BookNotFoundException extends BaseException {
  constructor() {
    super('Book not found.', 404);
  }
}
