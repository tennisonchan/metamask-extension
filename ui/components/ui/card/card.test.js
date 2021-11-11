import * as React from 'react';
import { render } from '@testing-library/react';
import Card from '.';

describe('Card', () => {
  it('should render the Card without crashing', () => {
    const { getByTestId, getByText } = render(
      <Card data-testid="Card">Card content</Card>,
    );
    expect(getByTestId('Card')).toBeDefined();
    expect(getByText('Card content')).toBeDefined();
  });
});
