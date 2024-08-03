import { describe, expect, it } from '@jest/globals';
import { createUserValidator } from '../../src/validators/createUserValidator';

describe('createUserValidator', () => {
  it('should validate a valid user name', () => {
    const validUser = {
      name: 'Fırat Emre ŞİRVAN',
    };

    const { error } = createUserValidator.validate(validUser);

    expect(error).toBeUndefined();
  });

  it('should return an error for an empty user name', () => {
    const invalidUser = {
      name: '',
    };

    const { error } = createUserValidator.validate(invalidUser);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Name is required');
  });

  it('should return an error for a user name less than 3 characters long', () => {
    const invalidUser = {
      name: 'Fı',
    };

    const { error } = createUserValidator.validate(invalidUser);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe(
      'Name must be at least 3 characters long',
    );
  });

  it('should return an error for a user name longer than 100 characters', () => {
    const invalidUser = {
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut dui euismod, ultricies nunc sed, aliquam nunc. Nulla facilisi. Sed nec nunc auctor, lacinia nunc id, aliquet nunc. Nulla facilisi. Sed nec nunc auctor, lacinia nunc id, aliquet nunc.',
    };

    const { error } = createUserValidator.validate(invalidUser);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe(
      'Name must be at most 100 characters long',
    );
  });
});
