import type { TTrain } from '../types/train';

import {
  filterTrains,
  formatDate,
  formatMonth,
  formatPrice,
  getMonths,
  getNearestUpcomingDeparture,
  getRegions,
  getRouteEndpoints,
  parseTrainData,
  pluralizeDays,
} from '.';

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

describe('утилиты данных поездов', () => {
  it('форматирует дату, месяц, цену, длительность и маршрут', () => {
    expect(formatDate('2026-09-10')).toBe('10 сентября 2026 г.');
    expect(formatMonth('2026-09')).toBe('сентябрь 2026 г.');
    expect(formatPrice(24900)).toMatch(/^24.900 ₽$/);
    expect(pluralizeDays(1)).toBe('1 день');
    expect(pluralizeDays(2)).toBe('2 дня');
    expect(pluralizeDays(5)).toBe('5 дней');
    expect(pluralizeDays(11)).toBe('11 дней');
    expect(getRouteEndpoints(trains[0].route)).toBe('Москва → Архангельск');
  });

  it('получает уникальные отсортированные регионы и месяцы', () => {
    expect(getRegions(trains)).toEqual(['Север', 'Юг']);
    expect(getMonths(trains)).toEqual(['2026-09', '2026-10']);
  });

  it('находит ближайшую не прошедшую дату и обрабатывает её отсутствие', () => {
    expect(getNearestUpcomingDeparture(trains[0].departures, new Date(2026, 8, 15))).toBe(
      '2026-10-12',
    );
    expect(getNearestUpcomingDeparture(trains[0].departures, new Date(2027, 0, 1))).toBeNull();
  });

  it('фильтрует по поиску, региону и месяцу одновременно', () => {
    expect(filterTrains(trains, { search: '  ЭКСПРЕСС ', region: 'Север', month: '2026-10' })).toEqual([
      trains[0],
    ]);
    expect(filterTrains(trains, { search: '', region: 'Юг', month: '2026-09' })).toEqual([]);
  });

  it('проверяет структуру входных данных', () => {
    expect(parseTrainData({ trains })).toEqual({ trains });
    expect(parseTrainData({ trains: [{ id: 'broken' }] })).toBeNull();
    expect(parseTrainData(null)).toBeNull();
  });
});
