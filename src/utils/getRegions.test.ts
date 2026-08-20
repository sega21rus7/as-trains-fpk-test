import type { TTrain } from '../types/train';

import { getRegions } from './getRegions';

const createTrain = (id: string, region: string): TTrain => ({
  id,
  name: 'Тестовый поезд',
  region,
  route: ['Москва', 'Архангельск'],
  duration_days: 2,
  departures: ['2026-09-10'],
  price_from: 24900,
  tags: [],
  description: 'Описание',
  excursions: [],
  buy_url: 'https://example.com',
});

describe('getRegions', () => {
  it('возвращает уникальные регионы в алфавитном порядке', () => {
    const trains = [
      createTrain('south', 'Юг'),
      createTrain('north', 'Север'),
      createTrain('north-second', 'Север'),
    ];

    expect(getRegions(trains)).toEqual(['Север', 'Юг']);
  });
});
