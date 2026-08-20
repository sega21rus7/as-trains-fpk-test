import { isRecord } from './isRecord';

describe('isRecord', () => {
  it('распознаёт объект', () => {
    expect(isRecord({ value: 1 })).toBe(true);
  });

  it('отклоняет null и примитивы', () => {
    expect(isRecord(null)).toBe(false);
    expect(isRecord('value')).toBe(false);
  });
});
