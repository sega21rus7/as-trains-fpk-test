import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('форматирует цену в рублях с разделителем разрядов', () => {
    expect(formatPrice(24900)).toMatch(/^24.900 ₽$/);
  });
});
