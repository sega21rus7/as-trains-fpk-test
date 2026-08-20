import type { TTrain } from '../types/train';

import { parseTrainData } from './parseTrainData';

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
  buy_url: 'https://example.com',
};

describe('parseTrainData', () => {
  it('возвращает проверенные данные поездов', () => {
    expect(parseTrainData({ trains: [train] })).toEqual({ trains: [train] });
  });

  it('отклоняет набор с некорректным поездом', () => {
    expect(parseTrainData({ trains: [{ id: 'broken' }] })).toBeNull();
  });

  it('отклоняет значение без списка поездов', () => {
    expect(parseTrainData(null)).toBeNull();
  });
});
