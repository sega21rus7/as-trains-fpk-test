import type { TTrain } from '../types/train';

import { filterTrains } from './filterTrains';

const trains: TTrain[] = [
  {
    id: 'north',
    name: 'Северный экспресс',
    region: 'Север',
    route: ['Москва', 'Архангельск'],
    duration_days: 2,
    departures: ['2026-09-10', '2026-10-12'],
    price_from: 24900,
    tags: ['природа'],
    description: 'Описание',
    excursions: ['Экскурсия'],
    buy_url: 'https://example.com',
  },
  {
    id: 'south',
    name: 'Южная ночь',
    region: 'Юг',
    route: ['Москва', 'Сочи'],
    duration_days: 5,
    departures: ['2026-10-05'],
    price_from: 30000,
    tags: ['море'],
    description: 'Описание',
    excursions: ['Экскурсия'],
    buy_url: 'https://example.com',
  },
];

describe('filterTrains', () => {
  it('фильтрует по поиску, региону и месяцу одновременно', () => {
    expect(filterTrains(trains, { search: '  ЭКСПРЕСС ', region: 'Север', month: '2026-10' })).toEqual([
      trains[0],
    ]);
  });

  it('возвращает пустой список, когда поезд не соответствует всем фильтрам', () => {
    expect(filterTrains(trains, { search: '', region: 'Юг', month: '2026-09' })).toEqual([]);
  });
});
