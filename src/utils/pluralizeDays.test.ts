import { pluralizeDays } from './pluralizeDays';

describe('pluralizeDays', () => {
  it.each([
    [1, '1 день'],
    [2, '2 дня'],
    [5, '5 дней'],
    [11, '11 дней'],
  ])('склоняет длительность %i', (days, expected) => {
    expect(pluralizeDays(days)).toBe(expected);
  });
});
