import { isValidIsoDate } from './isValidIsoDate';

describe('isValidIsoDate', () => {
  it('принимает существующую ISO-дату', () => {
    expect(isValidIsoDate('2028-02-29')).toBe(true);
  });

  it('отклоняет значение в другом формате', () => {
    expect(isValidIsoDate('2026/09/10')).toBe(false);
  });

  it('отклоняет несуществующую календарную дату', () => {
    expect(isValidIsoDate('2026-02-29')).toBe(false);
  });
});
