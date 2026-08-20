import { formatMonth } from './formatMonth';

describe('formatMonth', () => {
  it('форматирует месяц на русском языке', () => {
    expect(formatMonth('2026-09')).toBe('сентябрь 2026 г.');
  });

  it('возвращает исходное значение для некорректного формата', () => {
    expect(formatMonth('сентябрь')).toBe('сентябрь');
  });
});
