import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Header.css'
import { Link } from "react-router-dom"
import { Fragment } from 'react';
import { FaBars, FaUserCircle } from "react-icons/fa";
import logo from '../Assets/logo512.png';

const Header = () => {
    return (
    <Navbar  className="header"  expand="lg" sticky='top'>
        <Container>
       
            <Navbar.Brand><img src={logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='nav'>
                    <Nav.Link  className='nav-item' href="/Price">Price Estimate</Nav.Link>
                    <Nav.Link  className='nav-item' href="/Register">Register</Nav.Link>
                    <Nav.Link  className='nav-item' >Logout</Nav.Link>
                    <Nav.Link  className='nav-item' href="/">Login/Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar >
    )
}

export default Header;