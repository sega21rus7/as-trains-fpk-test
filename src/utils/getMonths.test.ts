import type { TTrain } from '../types/train';

import { getMonths } from './getMonths';

const createTrain = (departures: string[]): TTrain => ({
  id: departures.join('-'),
  name: 'Тестовый поезд',
  region: 'Север',
  route: ['Москва', 'Архангельск'],
  duration_days: 2,
  departures,
  price_from: 24900,
  tags: [],
  description: 'Описание',
  excursions: [],
  buy_url: 'https://example.com',
});

describe('getMonths', () => {
  it('возвращает уникальные отсортированные месяцы отправления', () => {
    const trains = [
      createTrain(['2026-10-12', '2026-09-10']),
      createTrain(['2026-10-05']),
    ];

    expect(getMonths(trains)).toEqual(['2026-09', '2026-10']);
  });
});
