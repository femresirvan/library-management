import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor() {
    super('Not found.', 404);
  }
}
