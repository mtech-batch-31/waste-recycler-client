import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import LoginPage from './Login';

jest.mock('axios');

describe('LoginPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders the login form', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('Submits the form with the correct data when the login button is clicked', async () => {
    const mockResponse = { data: { token: '12345' } };
    const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
    mockPost.mockResolvedValueOnce(mockResponse);

    render(<LoginPage />);

    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('/api/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    // Do additional assertions as necessary, e.g. check that the user token was stored in state
  });

  it('Displays an error message when login fails', async () => {
    const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
    mockPost.mockRejectedValueOnce(new Error('Invalid email or password'));

    render(<LoginPage />);

    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
