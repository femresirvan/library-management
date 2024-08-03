import { BaseException } from './BaseException';

export class UserNotFoundException extends BaseException {
  constructor() {
    super('User not found.', 404);
  }
}
