import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound.jsx';

describe('NotFound page', () => {
  it('shows a 404 message and link back to Home', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Heading text
    expect(
      screen.getByText(/404 - Page Not Found/i)
    ).toBeInTheDocument();

    // Link back to Home
    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
