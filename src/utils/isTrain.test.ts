import type { TTrain } from '../types/train';

import { isTrain } from './isTrain';

const train: TTrain = {
  id: 'north',
  name: 'Северный экспресс',
  region: 'Север',
  route: ['Москва', 'Архангельск'],
  duration_days: 2,
  departures: ['2026-09-10'],
  price_from: 24900,
  tags: ['природа'],
  description: 'Описание',
  excursions: ['Экскурсия'],
  buy_url: 'https://example.com/tickets',
};

describe('isTrain', () => {
  it('принимает поезд с полной корректной структурой', () => {
    expect(isTrain(train)).toBe(true);
  });

  it('отклоняет значение, которое не является объектом', () => {
    expect(isTrain(null)).toBe(false);
  });

  it('отклоняет поезд с неполным маршрутом', () => {
    expect(isTrain({ ...train, route: ['Москва'] })).toBe(false);
  });

  it('отклоняет поезд с некорректной датой', () => {
    expect(isTrain({ ...train, departures: ['2026-02-29'] })).toBe(false);
  });

  it('отклоняет поезд с некорректной ссылкой покупки', () => {
    expect(isTrain({ ...train, buy_url: 'не ссылка' })).toBe(false);
  });
});
