import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('показывает приветствие', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
  });
});
