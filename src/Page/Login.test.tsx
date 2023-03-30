import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import LoginPage from './Login';

jest.mock('axios');

describe('LoginPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders Login Form', () => {
    render(<LoginPage />);

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });
})