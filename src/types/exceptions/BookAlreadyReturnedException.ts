import { BaseException } from './BaseException';

export class BookAlreadyReturnedException extends BaseException {
  constructor() {
    super('Book already returned.', 400);
  }
}
