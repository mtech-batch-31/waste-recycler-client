// LoginBootStrap.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('LoginBootStrap component', () => {
    beforeEach(() => {
        render(<Login />);
    });

    it('renders the login form', () => {
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');
        const registerButton = screen.getByText('Register');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    it('updates the email and password fields', () => {
        const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;

        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'testPassword');

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');
    });

    it('shows an error message when form submission fails', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
        const loginButton = screen.getByText('Login');

        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'testPassword');

        fireEvent.click(loginButton);

        const errorMessage = await screen.findByText('Invalid email or password');
        expect(errorMessage).toBeInTheDocument();
    });
});
