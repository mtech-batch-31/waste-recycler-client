import React, { useState } from 'react';

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
      // Do something with the response data, e.g. store the user token in state
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <div style={{ position: "absolute", top: 0, right: 0, padding: "20px", width: "100%" }}>
        <div style={{ textAlign: "right" }}><b>
          <div style={{ position: "absolute", top: 0, right: 0, padding: "20px", display: "flex", alignItems: "center", fontSize: 15 }}>
            <a href="/Login" style={{ marginRight: "10px", color: "#000000", textDecoration: "none" }}>Login</a>
            <div style={{ width: "1px", height: "20px", backgroundColor: "white", marginRight: "10px" }}></div>
            <a href="/Register" style={{ color: "#000000", textDecoration: "none" }}>Register</a>
          </div></b></div>
      </div>
      <h1><b><div style={{ color: "#0CA789" }}>Login to iRecycle</div></b></h1>
      <form onSubmit={handleFormSubmit}>
        <div style={{ textAlign: 'left' }}>
          <div>
            {/* <label htmlFor="email">email</label><br />
             */}<div className="input-container">
              <input placeholder="enter your email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%', paddingLeft: '7px' }}
              />
            </div>
          </div>
          <div><p></p>
            {/* <label htmlFor="password">password</label><br />
             */}<div className="input-container">
              <input placeholder="enter your password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{ width: '100%', paddingLeft: '7px' }}
              />
            </div>
          </div>
        </div><div style={{ marginBottom: '10px' }}><br /></div>
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
        <div style={{ color: 'red' }}><br />
          {errorMessage && <p>{errorMessage}</p>}</div>
      </form >
    </div >
  );
};

export default LoginPage;
