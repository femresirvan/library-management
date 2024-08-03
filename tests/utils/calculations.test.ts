import { calculateAverage } from '../../src/utils/calculations';
import { describe, expect, it } from '@jest/globals';

describe('calculateAverage', () => {
  it('should return 0 when the input array is empty', () => {
    const result = calculateAverage([]);
    expect(result).toBe(0);
  });

  it('should return the correct average for an array of numbers', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = calculateAverage(numbers);
    expect(result).toBe(3);
  });

  it('should return the correct average for an array of numbers with a decimal result', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = calculateAverage(numbers);
    expect(result).toBe(3.5);
  });
});
