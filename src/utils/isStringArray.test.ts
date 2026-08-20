import { isStringArray } from './isStringArray';

describe('isStringArray', () => {
  it('распознаёт массив строк', () => {
    expect(isStringArray(['Москва', 'Тула'])).toBe(true);
  });

  it('отклоняет смешанный массив и значение другого типа', () => {
    expect(isStringArray(['Москва', 1])).toBe(false);
    expect(isStringArray('Москва')).toBe(false);
  });
});
