import { render, screen } from '@testing-library/react';

import type { TTrain } from '../../types/train';

import { TrainCard } from '.';

const train: TTrain = {
  id: 'karelia',
  name: 'В Карелию',
  region: 'Северо-Запад',
  route: ['Москва', 'Москва'],
  duration_days: 3,
  departures: ['2026-09-04'],
  price_from: 24900,
  tags: ['природа', 'Кижи', 'выходные'],
  description: 'Тестовое описание маршрута.',
  excursions: ['Обзорная экскурсия'],
  buy_url: 'https://example.com/karelia',
};

describe('TrainCard', () => {
  it('показывает все теги маршрута с хэштегом', () => {
    render(<TrainCard train={train} previewDeparture={train.departures[0]} onOpen={jest.fn()} />);

    expect(screen.getByText('#природа')).toBeInTheDocument();
    expect(screen.getByText('#Кижи')).toBeInTheDocument();
    expect(screen.getByText('#выходные')).toBeInTheDocument();
  });
});
