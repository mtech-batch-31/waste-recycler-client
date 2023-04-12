import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
import './Header.css'
import { Link } from "react-router-dom"
import { Fragment } from 'react';

const Header = () => {
    return (
    <Nav className='nav-bar'>    
        <Navbar.Brand><img src='..\logo192.png' height={50} /></Navbar.Brand>
        <Nav.Link className='nav-item'>Submit Request</Nav.Link> 
        <Nav.Link className='nav-item'><Link  to="/price">Get Price Estimate</Link></Nav.Link>
   </Nav>)
}

export default Header;