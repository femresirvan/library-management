import { BaseException } from './BaseException';

export class InternalServerException extends BaseException {
  constructor() {
    super('Internal server error.', 500);
  }
}
