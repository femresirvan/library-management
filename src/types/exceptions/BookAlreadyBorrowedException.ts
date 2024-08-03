import { BaseException } from './BaseException';

export class BookAlreadyBorrowedException extends BaseException {
  constructor() {
    super('Book already borrowed.', 400);
  }
}
