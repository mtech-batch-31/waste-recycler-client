import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter,Route, BrowserRouter  as Router } from 'react-router-dom';
import Layout from './Page/Layout';
import Login from './Page/Login';
import Price from './Page/Price'
import RegisterAccount from './Page/Register'
import logo from './logo.svg';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />,
    children: [
      { index: true, element: <Login />},
      { path: "/register", element: <RegisterAccount />},
      { path: "/price", element: <Price />}
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;