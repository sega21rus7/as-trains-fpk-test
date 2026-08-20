import { render, screen } from '@testing-library/react';

import { Tag } from '.';

describe('Tag', () => {
  it('показывает переданный тег с хэштегом', () => {
    render(<Tag>природа</Tag>);

    expect(screen.getByRole('listitem')).toHaveTextContent('#природа');
  });
});
