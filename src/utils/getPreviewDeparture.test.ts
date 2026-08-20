import type { TTrain } from '../types/train';

import { getPreviewDeparture } from './getPreviewDeparture';

const train: TTrain = {
  id: 'north',
  name: 'Северный экспресс',
  region: 'Север',
  route: ['Москва', 'Архангельск'],
  duration_days: 2,
  departures: ['2026-10-12', '2026-09-10'],
  price_from: 24900,
  tags: ['природа'],
  description: 'Описание',
  excursions: ['Экскурсия'],
  buy_url: 'https://example.com/tickets',
};

describe('getPreviewDeparture', () => {
  it('выбирает первую дату выбранного месяца независимо от порядка дат', () => {
    expect(getPreviewDeparture(train, '2026-09', new Date(2026, 0, 1))).toBe('2026-09-10');
  });

  it('возвращает null, если в выбранном месяце нет отправлений', () => {
    expect(getPreviewDeparture(train, '2026-11', new Date(2026, 0, 1))).toBeNull();
  });

  it('без выбранного месяца возвращает ближайшее предстоящее отправление', () => {
    expect(getPreviewDeparture(train, '', new Date(2026, 8, 11))).toBe('2026-10-12');
  });
});
