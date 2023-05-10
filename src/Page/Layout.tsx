import { Fragment } from 'react';
import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import React from "react"

const Layout = () =>{
    return(
    <Fragment>
        <Header />
        <Outlet />
    </Fragment>)
}

export default Layout;
