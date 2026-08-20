import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('форматирует ISO-дату на русском языке', () => {
    expect(formatDate('2026-09-10')).toBe('10 сентября 2026 г.');
  });
});
