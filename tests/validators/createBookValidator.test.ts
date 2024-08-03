import { describe, expect, it } from '@jest/globals';
import { createBookValidator } from '../../src/validators/createBookValidator';

describe('createBookValidator', () => {
  it('should validate a valid book name', () => {
    const validBook = {
      name: 'Book 1',
    };

    const { error } = createBookValidator.validate(validBook);

    expect(error).toBeUndefined();
  });

  it('should return an error for an empty book name', () => {
    const invalidBook = {
      name: '',
    };

    const { error } = createBookValidator.validate(invalidBook);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Name is required');
  });

  it('should return an error for a missing book name', () => {
    const invalidBook = {};

    const { error } = createBookValidator.validate(invalidBook);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Name is required');
  });
});
