import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Page/Layout';
import Login from './Page/Login';
import Price from './Page/Price'
import Home from './Page/Home'
import SubmitRequest  from './Page/SubmitRequest';
import RegisterAccount from './Page/Register'
import RegistrationConfirm from './Page/RegisterationConfirm'
import { isLogin } from './utilities/auth'
import React from "react"


import './App.css';

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />,
    children: [
      { index: true, element: <Login />},
      { path: "/register", element: <RegisterAccount />},
      { path: "/home", element: <Home />, loader: isLogin},
      { path: "/price", element: <Price />, loader: isLogin},
      { path: "/submitRequest", element: <SubmitRequest />, loader: isLogin},
      { path: "/registrationConfirm", element: <RegistrationConfirm />},
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;
