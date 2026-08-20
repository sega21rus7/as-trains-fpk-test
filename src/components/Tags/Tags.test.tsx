import { render, screen } from '@testing-library/react';

import { Tags } from '.';

describe('Tags', () => {
  it('показывает список тегов с доступным именем', () => {
    render(<Tags tags={['природа', 'Кижи']} ariaLabel="Особенности маршрута" />);

    expect(screen.getByRole('list', { name: 'Особенности маршрута' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('#природа')).toBeInTheDocument();
    expect(screen.getByText('#Кижи')).toBeInTheDocument();
  });
});
