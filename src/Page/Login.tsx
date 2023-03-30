import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', formData);
      // Do something with the response data, e.g. store the user token in state
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <h1><b>Login to iRecycle</b></h1>
      <form onSubmit={handleFormSubmit}>
        <div style={{ textAlign: 'left' }}><div style={{ color: 'black' }}>
          <div>
            <label htmlFor="email">email</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="password">password</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{ width: '100%' }}
            />
          </div>
        </div>
        </div>
        <div style={{ color: 'red' }}>
          {errorMessage && <p>{errorMessage}</p>}</div>
        <div className="container">
          <div className="left-column">
            <div style={{ textAlign: 'left' }}>
              <button className="secondary-button">Register</button>
            </div>
          </div>
          <div className="right-column">
            <div style={{ textAlign: 'right' }}>
              <button className="primary-button">Login</button>
            </div>
          </div>
        </div>
      </form >
    </div >
  );
};

export default LoginPage;
