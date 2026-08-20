import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TrainFilters } from '.';

const filters = { search: 'Карелия', region: 'Север', month: '2026-09' };

describe('TrainFilters', () => {
  it('показывает текущие фильтры, варианты выбора и число результатов', () => {
    render(
      <TrainFilters
        filters={filters}
        months={['2026-09', '2026-10']}
        regions={['Север', 'Юг']}
        resultCount={2}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('searchbox', { name: 'Название поезда' })).toHaveValue('Карелия');
    expect(screen.getByRole('combobox', { name: 'Регион' })).toHaveValue('Север');
    expect(screen.getByRole('combobox', { name: 'Месяц отправления' })).toHaveValue('2026-09');
    expect(screen.getByRole('option', { name: 'октябрь 2026 г.' })).toHaveValue('2026-10');
    expect(screen.getByText(/Найдено:/)).toHaveTextContent('Найдено: 2');
  });

  it('передаёт все значения при изменении каждого фильтра', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <TrainFilters
        filters={{ search: '', region: '', month: '' }}
        months={['2026-09']}
        regions={['Север']}
        resultCount={1}
        onChange={handleChange}
      />,
    );

    await user.type(screen.getByRole('searchbox', { name: 'Название поезда' }), 'Экспресс');
    expect(handleChange).toHaveBeenLastCalledWith({
      search: 'Экспресс',
      region: '',
      month: '',
    });

    await user.selectOptions(screen.getByRole('combobox', { name: 'Регион' }), 'Север');
    expect(handleChange).toHaveBeenLastCalledWith({
      search: 'Экспресс',
      region: 'Север',
      month: '',
    });

    await user.selectOptions(screen.getByRole('combobox', { name: 'Месяц отправления' }), '2026-09');
    expect(handleChange).toHaveBeenLastCalledWith({
      search: 'Экспресс',
      region: 'Север',
      month: '2026-09',
    });
  });

  it('очищает поля и передаёт пустые фильтры при сбросе', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <TrainFilters
        filters={filters}
        months={['2026-09']}
        regions={['Север']}
        resultCount={1}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Сбросить' }));

    expect(screen.getByRole('searchbox', { name: 'Название поезда' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Регион' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Месяц отправления' })).toHaveValue('');
    expect(handleChange).toHaveBeenLastCalledWith({ search: '', region: '', month: '' });
  });
});
