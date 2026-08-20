import { toLocalIsoDate } from './toLocalIsoDate';

describe('toLocalIsoDate', () => {
  it('формирует локальную дату с ведущими нулями', () => {
    expect(toLocalIsoDate(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
  });
});
