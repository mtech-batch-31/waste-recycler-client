import { Fragment } from 'react';
import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'

const Layout = () =>{
    return( 
    <Fragment>
        <Header />
        <Outlet />
    </Fragment>)
}

export default Layout;