import { mean } from 'lodash';

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  return mean(numbers);
}
