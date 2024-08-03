import { describe, expect, it, jest } from '@jest/globals';
import { scoreValidator } from '../../src/validators/scoreValidator';

jest.mock('../../src/config/env', () => {
  return {
    MAX_SCORE: 5,
    MIN_SCORE: 1,
  };
});

describe('scoreValidator', () => {
  it('should validate a valid score', () => {
    const validScore = {
      score: 5,
    };

    const { error } = scoreValidator.validate(validScore);

    expect(error).toBeUndefined();
  });

  it('should return an error for an empty score', () => {
    const invalidScore = {
      score: undefined,
    };

    const { error } = scoreValidator.validate(invalidScore);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Score is required.');
  });

  it('should return an error for a score below the minimum', () => {
    const invalidScore = {
      score: -1,
    };

    const { error } = scoreValidator.validate(invalidScore);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Score must be at least 1.');
  });

  it('should return an error for a score above the maximum', () => {
    const invalidScore = {
      score: 10,
    };

    const { error } = scoreValidator.validate(invalidScore);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Score must be at most 5.');
  });

  it('should return an error for a non-integer score', () => {
    const invalidScore = {
      score: 3.5,
    };

    const { error } = scoreValidator.validate(invalidScore);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Score must be an integer.');
  });
});
