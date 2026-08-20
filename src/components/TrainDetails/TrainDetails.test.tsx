import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TTrain } from '../../types/train';
import { TrainDetails } from './TrainDetails';

const train: TTrain = {
  id: 'test',
  name: 'Тестовый поезд',
  region: 'Центр',
  route: ['Москва', 'Тула', 'Москва'],
  duration_days: 3,
  departures: ['2026-10-02', '2026-09-01'],
  price_from: 20000,
  tags: ['история', 'выходные'],
  description: 'Полное описание поездки.',
  excursions: ['Кремль', 'Музей'],
  buy_url: 'https://example.com/tickets',
};

describe('TrainDetails', () => {
  it('показывает полную информацию и безопасную ссылку покупки', () => {
    render(<TrainDetails train={train} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog', { name: train.name })).toBeInTheDocument();
    expect(screen.getByText(train.description)).toBeInTheDocument();
    const route = screen.getByRole('list', { name: 'Маршрут путешествия' });
    expect(within(route).getAllByRole('listitem').map((item) => item.textContent)).toEqual(
      train.route,
    );
    expect(screen.getByText('Кремль')).toBeInTheDocument();
    expect(screen.getByText('#выходные')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Купить билет/ })).toHaveAttribute(
      'href',
      train.buy_url,
    );
    expect(screen.getByRole('link', { name: /Купить билет/ })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /Купить билет/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  it('закрывается кнопкой и клавишей Escape', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    const { rerender } = render(<TrainDetails train={train} onClose={handleClose} />);

    await user.click(screen.getByRole('button', { name: 'Закрыть подробности' }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    rerender(<TrainDetails train={train} onClose={handleClose} />);
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
