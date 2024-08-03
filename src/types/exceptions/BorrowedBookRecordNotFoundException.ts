import { BaseException } from './BaseException';

export class BorrowedBookRecordNotFoundException extends BaseException {
  constructor() {
    super('Borrowed book record not found.', 404);
  }
}
