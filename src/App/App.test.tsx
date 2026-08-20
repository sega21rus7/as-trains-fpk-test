import { render, screen } from '@testing-library/react';

import { App } from '.';

describe('App', () => {
  it('показывает страницу каталога поездов', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Витрина туристских поездов' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
