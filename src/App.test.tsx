import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders minesweeper title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Minesweeper/i);
  expect(linkElement).toBeInTheDocument();
});
