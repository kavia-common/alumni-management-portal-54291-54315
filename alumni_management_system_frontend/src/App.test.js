import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page by default when not authenticated', () => {
  localStorage.removeItem('ams_user');
  render(<App />);
  const signInText = screen.getByText(/welcome back/i);
  expect(signInText).toBeInTheDocument();
});
