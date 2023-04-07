import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders email and password form inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
});
