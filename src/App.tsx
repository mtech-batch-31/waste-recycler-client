import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Page/Login'
import RegisterAccount from './Page/Register'
import logo from './logo.svg';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/", element: <Login />
  },
  {
    path: "/register", element: <RegisterAccount />
  }
]);

function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;