import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TrainsPage } from '.';

describe('TrainsPage', () => {
  it('первоначально показывает все пять поездов', () => {
    render(<TrainsPage />);

    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByText(/Найдено:/)).toHaveTextContent('Найдено: 5');
  });

  it('ищет по части названия без учёта регистра и сбрасывает поиск', async () => {
    const user = userEvent.setup();
    render(<TrainsPage />);

    await user.type(screen.getByRole('searchbox', { name: 'Название поезда' }), '  КАРЕЛИЮ  ');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'В Карелию' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Сбросить' }));
    expect(screen.getAllByRole('article')).toHaveLength(5);
  });

  it('совмещает фильтры региона и месяца и показывает пустое состояние', async () => {
    const user = userEvent.setup();
    render(<TrainsPage />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Регион' }), 'Сибирь');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Месяц отправления' }), '2026-10');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Байкальская сказка' })).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Месяц отправления' }), '2026-12');
    expect(screen.getByRole('heading', { name: 'Подходящих поездов не найдено' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Сбросить фильтры' }));
    expect(screen.getAllByRole('article')).toHaveLength(5);
  });

  it('открывает подробности, закрывает их по Escape и возвращает фокус', async () => {
    const user = userEvent.setup();
    render(<TrainsPage />);
    const card = screen.getByRole('heading', { name: 'В Карелию' }).closest('article');

    expect(card).not.toBeNull();
    if (!card) {
      return;
    }

    const openButton = within(card).getByRole('button', { name: /Подробнее/ });
    await user.click(openButton);

    const dialog = screen.getByRole('dialog', { name: 'В Карелию' });
    expect(dialog).toHaveTextContent('Тур выходного дня по Карелии');
    expect(within(dialog).getByText('Выборгский замок')).toBeInTheDocument();
    expect(within(dialog).getByText('#Рускеала')).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /Купить билет/ })).toHaveAttribute(
      'href',
      'https://www.rzd.ru/ru/9264',
    );

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });
});
